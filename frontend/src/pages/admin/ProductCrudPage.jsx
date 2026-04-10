import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

function ProductCrudPage(props) {
  const navigate = useNavigate();
  function navigateToProductForm() {
    navigate("/admin/products/add");
  }
  return (
    <div>
      Product Crud Page
      <h1 className="text-3xl font-bold text-blue-500 underline">
        Hello Tailwind v3!
      </h1>
      <button onClick={navigateToProductForm}>
        Ajouter un nouveau produit +{" "}
      </button>
      <Outlet />
    </div>
  );
}

export default ProductCrudPage;
