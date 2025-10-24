import api from "./axios/axios";
import Home from "./components/Home/Home"

const fetchLatestBlogs = async () => {
  try {
    const res = await api.get("/blogs/home/latest");
    return res.data;
  } catch (error) {
    console.error("Error fetching latest blogs:", error);
    return [];
  }
};

export default async function HomePage() {
  const blogs = await fetchLatestBlogs(); // SSR fetch
  return <Home blogs={blogs} />;
}