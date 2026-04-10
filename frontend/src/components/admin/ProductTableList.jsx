import React, { useState, useEffect, useCallback } from "react"; // 👈 useCallback added
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../../api/product-service"; // 👈 deleteProduct added
import { Helmet } from "react-helmet-async";
import Loading from "../shared/Loading";

function ProductTableList(props) {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Loading... | Kit'n Alika");
  const [productToDelete, setProductToDelete] = useState(null); // 👈 added

  function navigateToProductUpdate(product) {
    navigate(`/admin/products/${product.id}/${product.name}/update`);
  }

  // 👇 extracted fetch logic
  const fetchProducts = useCallback(async () => {
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
  }, []);

  // 👇 handles confirmed deletion
  async function handleDeleteConfirm() {
    try {
      await deleteProduct(productToDelete.id);
      setProductToDelete(null);
      fetchProducts(); // re-fetch after delete
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
    <div>
      {/* 👇 Confirm modal */}
      {productToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <p>
              Voulez-vous vraiment supprimer{" "}
              <strong>{productToDelete.name}</strong> ?
            </p>
            <button onClick={handleDeleteConfirm}>Oui, supprimer</button>
            <button onClick={() => setProductToDelete(null)}>Annuler</button>
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Category</th>
            <th>Animal</th>
            <th>Prix</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.animal}</td>
              <td style={{ color: product.price >= 2000 ? "red" : "green" }}>
                {product.price}
              </td>
              <td>
                <button onClick={() => navigateToProductUpdate(product)}>
                  Modifier
                </button>
                <button onClick={() => setProductToDelete(product)}>
                  {" "}
                  {/* 👈 */}
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTableList;
