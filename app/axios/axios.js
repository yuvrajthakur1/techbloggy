import axios from "axios";
const url = `${process.env.NEXT_PUBLIC_API_URL}/api`

// Create instance
const api = axios.create({
  baseURL: url,
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
