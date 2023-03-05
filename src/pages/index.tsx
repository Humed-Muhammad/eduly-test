import { Button, Center, Heading } from "@chakra-ui/react";
import { clearLocalStorage } from "@/utils";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const route = useNavigate();

  return (
    <>
      <main>
        <Heading>Welcome to your page.</Heading>
        <Center my="5">
          <Button
            onClick={() => {
              clearLocalStorage();
              route("/login");
            }}
            colorScheme="red"
          >
            Logout
          </Button>
        </Center>
      </main>
    </>
  );
}
