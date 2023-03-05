import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import { Layout } from "../Layout";
import LoginPage from "./pages/login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/register";
import Redirect from "./pages/redirect";
import Home from "./pages";
import { ProtectedRoute } from "./utils/utility";

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/redirect" element={<Redirect />} />

            <Route
              path="/"
              element={
                //@ts-ignore
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
