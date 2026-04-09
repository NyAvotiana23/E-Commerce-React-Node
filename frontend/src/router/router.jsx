import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ProductPage from "../pages/ProductPage";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import ProductListComponent from "../components/product/ProductListComponent";
import ProductDetailComponent from "../components/product/ProductDetailComponent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Un Layout qui englobe tout
    errorElement: <ErrorPage />, // Page affichée si ça plante
    children: [
      { index: true, element: <Home /> }, // ou { index: true, element: <Home /> }
      {
        path: "/products",
        element: <ProductPage />,
        children: [
          { index: true, element: <ProductListComponent /> },
          { path: "/products/:id/:summary", element: <ProductDetailComponent /> },
        ],
      },
    ],
  },
]);
