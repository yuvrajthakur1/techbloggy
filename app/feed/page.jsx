
import Feed from "./FeedPage";

// app/page.tsx
export const metadata = {
  title: "TechBloggy | Explore Latest Tech Insights & Developer Blogs",
  description:
    "Stay updated with the latest tech trends, tutorials, and developer stories. TechBloggy offers high-quality blogs on React, Next.js, JavaScript, and more.",
  keywords: [
    "Tech Blog",
    "React Tutorials",
    "Next.js Blogs",
    "Frontend Development",
    "JavaScript Guides",
    "Web Development",
  ],
  openGraph: {
    title: "TechBloggy – Modern Tech Blogs for Developers",
    description:
      "Dive into tutorials, coding guides, and developer articles about React, Next.js, and modern web tech.",
    url: "https://techbloggy-steel.vercel.app",
    siteName: "TechBloggy",
    images: [
      {
        url: "/default.jpg", // 🧠 use your real OG image path
        width: 1200,
        height: 630,
        alt: "TechBloggy – Explore Tech Blogs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechBloggy | Latest Tech Blogs & Tutorials",
    description:
      "Learn modern web development through React, Next.js, and JavaScript blogs.",
    images: ["https://techbloggy-steel.vercel.app/og-image.png"],
    creator: "@techbloggy",
  },
};

const FeedPage = ()=>{
 return <Feed/>
}

export default FeedPage;