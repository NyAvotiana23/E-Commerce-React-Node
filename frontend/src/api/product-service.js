import apiFetch from "./api-calls.js";

export async function getProducts() {
  try {
    const result = await apiFetch("/product");
    return result;
  } catch (error) {
    console.error("getProducts failed:", error.message);
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const result = await apiFetch(`/product/${id}`);
    return result;
  } catch (error) {
    console.error("getProductById failed:", error.message);
    throw error;
  }
}

export async function addProduct(data) {
  try {
    const result = await apiFetch("/product", {
      method: "POST",
      body: JSON.stringify(data), // 👈 send as JSON
    });
    return result;
  } catch (error) {
    console.error("addProduct failed:", error.message);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    const result = await apiFetch(`/product/${id}`, {
      method: "DELETE",
    });
    return result;
  } catch (error) {
    console.error("deleteProduct failed:", error.message);
    throw error;
  }
}
