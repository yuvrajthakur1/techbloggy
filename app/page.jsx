// import api from "./axios/axios";
// import Home from "./components/Home/Home"

// const fetchLatestBlogs = async () => {
//   try {
//     const res = await api.get("/blogs/home/latest");
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching latest blogs:", error);
//     return [];
//   }
// };

// export default async function HomePage() {
//   const blogs = await fetchLatestBlogs(); // SSR fetch
//   return <Home blogs={blogs} />;
// }


import api from "./axios/axios";
import Home from "./components/Home/Home";

export const metadata = {
  title: "TechBloggy | Explore Latest Tech Insights & Developer Blogs",
  description:
    "Stay updated with the latest tech trends, tutorials, and developer stories on TechBloggy — your source for React, Next.js, and modern web tech blogs.",
  openGraph: {
    title: "TechBloggy | Explore Latest Tech Insights",
    description:
      "Stay updated with the latest tech trends, tutorials, and developer stories on TechBloggy.",
    url: "https://techbloggy.vercel.app",
    siteName: "TechBloggy",
    images: [
      {
        url: "/blog-lifestyle.jpg",
        width: 1200,
        height: 630,
        alt: "TechBloggy Homepage Preview",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechBloggy | Explore Latest Tech Insights",
    description:
      "Stay updated with the latest tech trends, tutorials, and developer stories on TechBloggy.",
    images: ["/og-image.jpg"],
  },
};

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
  const blogs = await fetchLatestBlogs();
  return <Home blogs={blogs} />;
}
