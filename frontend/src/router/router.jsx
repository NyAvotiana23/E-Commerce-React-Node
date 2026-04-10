import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/public/ErrorPage";

import { productRouter } from "./product-router";
import { authRouter } from "./auth-router";
import { adminRouter } from "./admin-router";
import Home from "../pages/public/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Un Layout qui englobe tout
    errorElement: <ErrorPage />, // Page affichée si ça plante

    children: [
      { index: true, element: <Home /> },
      productRouter,
      authRouter,
      adminRouter,
    ],
  },
]);
