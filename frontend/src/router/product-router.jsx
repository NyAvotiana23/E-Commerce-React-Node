import ProductForm from "../components/admin/ProductForm";
import ProductTableList from "../components/admin/ProductTableList";
import ProductDetailComponent from "../components/product/ProductDetailComponent";
import ProductListComponent from "../components/product/ProductListComponent";
import ProductCrudPage from "../pages/admin/ProductCrudPage";
import ProductPage from "../pages/public/ProductPage";

export const productRouter = {
  path: "/products",
  element: <ProductPage />,
  children: [
    { index: true, element: <ProductListComponent /> },
    {
      path: ":id/:summary",
      element: <ProductDetailComponent />,
    },
  ],
};

export const productCrudRouter = {
  path: "/admin/products",
  element: <ProductCrudPage />,
  children: [
    { index: true, element: <ProductTableList /> },
    { path: "add", element: <ProductForm /> },
    {
      path: ":id/:summary/update",
      element: <ProductForm />,
    },
    {
      path: ":id/:summary/delete",
      element: <ProductDetailComponent />,
    },
  ],
};
