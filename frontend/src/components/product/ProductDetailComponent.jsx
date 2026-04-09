import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../api/product-service";
import Loading from "../shared/Loading";
import { Helmet } from "react-helmet-async";

function ProductDetailComponent(props) {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Loading... | Kit'n Alika");

  useEffect(() => {
    // 1. Define the async logic inside
    const fetchProduct = async () => {
      setLoading(true);

      try {
        const result = await getProductById(id);

        if (result.status === "ok") {
          setProduct(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    // 2. Call it
    fetchProduct();

    // 3. Add 'id' to the dependency array
  }, [id]);

  useEffect(() => {
    if (product) {
      setTitle(`${product.name} | Kit'n Alika`);
    }
  }, [product]);

  if (loading) {
    return (
      <>
        <Helmet>
          <title>{title}</title>
          <meta name="description" />
        </Helmet>
        <Loading>Chargement du detail du produit !</Loading>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={product.name} />
      </Helmet>
      <div>
        <h2>Detail du produit</h2>

        <div className="productCard">
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
      </div>
    </>
  );
}

export default ProductDetailComponent;
