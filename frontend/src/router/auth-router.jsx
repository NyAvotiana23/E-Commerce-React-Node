import LoginComponent from "../pages/auth/LoginPage";
import SignUpComponent from "../pages/auth/SignUpPage";
import AuthLayout from "../layouts/AuthLayout";

export const authRouter = {
  path: "/auth",
  element: <AuthLayout />,
  children: [
    { path: "/auth/login", element: <LoginComponent /> },
    { path: "/auth/sign-up", element: <SignUpComponent /> },
  ],
};
