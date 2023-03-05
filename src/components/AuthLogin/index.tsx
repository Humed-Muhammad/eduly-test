import { pb } from "@/utils";
import { redirectUrl } from "@/utils/constant";
import { Card, Center, Flex, Image, Text } from "@chakra-ui/react";

import { AuthProviderInfo } from "pocketbase";
import { useEffect, useCallback, useState } from "react";
import { GitHub } from "react-feather";

export const AuthLogin = ({ signInText }: { signInText: string }) => {
  const [providers, setProviders] = useState<AuthProviderInfo[]>();
  const fetchProviders = useCallback(async () => {
    const providers = await pb.collection("users").listAuthMethods();
    setProviders(providers.authProviders);
  }, []);

  useEffect(() => {
    fetchProviders();
  }, []);
  console.log(redirectUrl);
  const loginWithAuth = (prov: AuthProviderInfo) => {
    localStorage.setItem("provider", JSON.stringify(prov));
    const url = prov.authUrl + redirectUrl;

    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };
  const iconSet: { [key: string]: any } = {
    github: <GitHub size={20} />,
    google: <Image src="/G.png" alt="Google logo" width={5} height={5} />,
  };
  return (
    <Flex flexWrap={["wrap", "nowrap"]} my="2" justify="center" width="full">
      {providers?.map((item, key) => (
        <Card
          m="2"
          cursor="pointer"
          _hover={{
            shadow: "lg",
            background: "gray.600",
            color: "white",
          }}
          width="full"
          height="10"
          display="flex"
          justifyContent="center"
          onClick={() => {
            loginWithAuth(item);
          }}
          mr="3"
          key={key}
        >
          <Center>
            <Text color="inherit" mr="2">
              {item?.name?.toUpperCase()}
            </Text>
            {iconSet[item?.name]}
          </Center>
        </Card>
      ))}
    </Flex>
  );
};
