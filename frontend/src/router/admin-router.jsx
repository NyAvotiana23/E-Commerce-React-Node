import AdminLayout from "../layouts/AdminLayout";
import { productCrudRouter } from "./product-router";

export const adminRouter = {
  path: "/admin",
  element: <AdminLayout />,
  children: [productCrudRouter],
};
