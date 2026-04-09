import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../../api/product-service";
import { Helmet } from "react-helmet-async";
import Loading from "../shared/Loading";

export default function ProductListComponent() {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("Loading... | Kit'n Alika");

  function navigateToProductDetail(product) {
    navigate(`/products/${product.id}/${product.name}`);
  }
  useEffect(() => {
    async function setProducts() {
      setLoading(true);

      try {
        const resultFetch = await getProducts();
        if (resultFetch.status === "ok") {
          setProductList(resultFetch.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    setProducts();
  }, []);

  useEffect(() => {
    if (productList) {
      setTitle(`Liste des produits | Kit'n Alika`);
    }
  }, [productList]);

  if (loading) {
    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" />
        </Helmet>
        <Loading>Chargement de la liste de produits !</Loading>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" />
      </Helmet>
      <div className="productList">
        {productList.map((product) => (
          <div
            key={product.id}
            onClick={() => navigateToProductDetail(product)}
            className="productCard"
          >
            <p>Product Name : {product.name}</p>
            <p>Product Category : {product.category}</p>
            <p>Product Animal : {product.animal}</p>
            <p>
              Product Price :{" "}
              <b style={{ color: product.price >= 2000 ? "red" : "green" }}>
                {" "}
                {product.price}
              </b>
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
