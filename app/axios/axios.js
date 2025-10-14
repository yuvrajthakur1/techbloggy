import axios from "axios";

// Create instance
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL }/api`|| "http://localhost:5000/api",
});


// Add request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);



export default api;
