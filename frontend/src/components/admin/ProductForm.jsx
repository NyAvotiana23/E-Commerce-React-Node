import React, { useState } from "react";
import { addProduct } from "../../api/product-service";

function ProductForm(props) {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleFormAdd(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));

    // Convert price to number since inputs return strings
    data.price = Number(data.price);

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await addProduct(data);
      setSuccess(true);
      e.target.reset(); // 👈 clears the form fields after success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <form method="post" onSubmit={handleFormAdd}>
        <h1>Product form</h1>

        <label>Product name : </label>
        <input type="text" name="name" required />

        <label>Product category : </label>
        <input type="text" name="category" required />

        <label>Product animal : </label>
        <input type="text" name="animal" required />

        <label>Product price : </label>
        <input type="number" name="price" min="0" required />

        {/* Feedback */}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && (
          <p style={{ color: "green" }}>Produit ajouté avec succès !</p>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Ajout en cours..." : "Ajouter le produit"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
