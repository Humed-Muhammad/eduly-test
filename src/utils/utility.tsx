import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { getFromLocalStorage } from ".";

interface Props {
  redirectPath?: string;
  children: ReactNode | null | undefined;
}

export const ProtectedRoute = ({
  redirectPath = "/login",
  children,
}: Props) => {
  const token = getFromLocalStorage();

  if (!token) {
    return (
      <>
        <Navigate to={redirectPath} replace />
      </>
    );
  }

  return children;
};
