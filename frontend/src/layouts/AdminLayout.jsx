import React from "react";
import { Outlet, Link } from "react-router-dom";

function AdminLayout(props) {
  return (
    <div>
      <nav>
        <Link to="/admin">Admin</Link>
        <Link to="/admin/products">Products Crud</Link>
      </nav>
      Admin Layout
      <Outlet />
    </div>
  );
}

export default AdminLayout;
