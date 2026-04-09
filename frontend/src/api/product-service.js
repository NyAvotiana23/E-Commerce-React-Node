import apiFetch from "./api-calls.js";

export async function getProducts() {
  try {
    const result = await apiFetch("/product");
    console.log("Test endpoint response:", result);
    return result;
  } catch (error) {
    console.error("Test endpoint failed:", error.message);
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const result = await apiFetch(`/product/${id}`);
    console.log("Test endpoint response:", result);
    return result;
  } catch (error) {
    console.error("Test endpoint failed:", error.message);
    throw error;
  }
}
