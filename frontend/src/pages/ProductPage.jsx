import React from "react";
import { Outlet } from "react-router-dom";

function ProductPage(props) {
  return (
    <div>
        <h1>Nos offrans des produits variés ! </h1>
      <Outlet />
    </div>
  );
}

export default ProductPage;
