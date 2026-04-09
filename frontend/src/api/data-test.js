import apiFetch from "./api-calls.js";

export async function testBackend() {
  try {
    const data = await apiFetch("/test");
    console.log("Test endpoint response:", data);
    return data;
  } catch (error) {
    console.error("Test endpoint failed:", error.message);
    throw error;
  }
}
