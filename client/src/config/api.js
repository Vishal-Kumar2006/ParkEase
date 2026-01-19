const API_URL = import.meta.env.VITE_BACKEND_API_URL;

if (!API_URL) {
  throw new Error("VITE_BACKEND_API_URL is not defined");
}

export default API_URL;
