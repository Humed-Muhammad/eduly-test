import { useState } from "react";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Container,
  Link as ChakraLink,
  InputGroup,
  InputRightElement,
  useToast,
  CircularProgress,
  Alert,
  Image,
} from "@chakra-ui/react";
import { Unlock } from "react-feather";
import { Formik, Field } from "formik";

import { LoginTypes } from "./types";
import { loginValidation } from "./validation";

import { pb, setToLocalStorage } from "@/utils";
import { Link, useNavigate } from "react-router-dom";

import { AuthLogin } from "../AuthLogin";

export const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const route = useNavigate();

  const handleLogin = async (values: LoginTypes) => {
    try {
      setLoading(true);
      const record = await pb
        .collection("users")
        .authWithPassword(values.username, values.password);

      if (record) {
        toast({
          description: "Logged in successfully!.",
          status: "success",
        });
        setLoading(false);
        route("/");
        setToLocalStorage(record.token);
      }
    } catch (error: any) {
      setLoading(false);

      if (error?.message) {
        return setError("Wrong email or password");
      }

      toast({
        description: "Something went wrong!.",
        status: "error",
      });
    }
  };

  return (
    <>
      <Flex
        bg="white"
        rounded="md"
        w={["100%", "70%", "90%", "75%", "60%", "50%"]}
        h={["auto", "50%"]}
        justify="space-around"
        align="center"
        p={["0", "12"]}
        mx={2}
        shadow="md"
        py="5"
        border="1px"
        borderColor="gray.100"
      >
        <Container
          display={["none", null, "flex"]}
          alignItems="center"
          h="full"
          width="50%"
        >
          <Image src={"/login.webp"} alt="login pic" width={"auto"} />
        </Container>

        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={handleLogin}
          validationSchema={loginValidation}
        >
          {({ handleSubmit, errors, touched, handleChange }) => (
            <form
              onSubmit={handleSubmit}
              style={{
                flexGrow: 1,
                marginRight: "5px",
                marginLeft: "5px",
                height: "auto",
              }}
            >
              <Container
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                width="full"
                mb="6"
              >
                <Unlock size={37} />
                <AuthLogin signInText="Login" />
              </Container>
              <VStack spacing={4} align="flex-start">
                {error && (
                  <Alert variant="left-accent" colorScheme="red" fontSize="sm">
                    {error}
                  </Alert>
                )}
                <FormControl isInvalid={!!errors.username && touched.username}>
                  <FormLabel htmlFor="username">Email Address</FormLabel>
                  <Field as={Input} id="username" name="username" />
                  <FormErrorMessage>{errors.username}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.password && touched.password}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup size="md">
                    <Input
                      onChange={handleChange}
                      id="password"
                      name="password"
                      type={show ? "text" : "password"}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        color="gray.500"
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                      >
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                </FormControl>

                <Flex wrap="wrap" w="full" justify="flex-end">
                  <ChakraLink fontSize={["xs", "sm"]} color="text">
                    <Link to="/register">Create Account!</Link>
                  </ChakraLink>
                </Flex>

                <Button
                  isDisabled={loading}
                  bg="primary"
                  color="white"
                  type="submit"
                  w="full"
                >
                  {loading ? (
                    <CircularProgress
                      isIndeterminate
                      color="green.300"
                      size={25}
                    />
                  ) : (
                    "Login"
                  )}
                </Button>
              </VStack>
            </form>
          )}
        </Formik>
      </Flex>
    </>
  );
};
