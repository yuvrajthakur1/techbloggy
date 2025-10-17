// app/blog/[id]/page.jsx
import BlogDetailClient from "./BlogClientComponent";
import api from "../../axios/axios"; // adjust path if needed

// 🧠 Ye function Next.js automatically call karta hai har blog page ke liye
export async function generateMetadata({ params }) {
  const getParams = await params;
  const id = getParams.id;
  try {

    const res = await api.get(`/blogs/${id}`);
    const blog = res.data;

    return {
      title: `${blog.title} | TechBloggy`,
      description: blog.description.slice(0, 150),
      openGraph: {
        title: `${blog.title} | TechBloggy`,
        description: blog.description.slice(0, 150),
        url: `https://techbloggy-steel.vercel.app/blog/${id}`,
        type: "article",
        images: [
          {
            url: blog.image?.url || "https://techbloggy-steel.vercel.app/default-og.png",
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${blog.title} | TechBloggy`,
        description: blog.description.slice(0, 150),
        images: [blog.image?.url],
      },
      whatsapp: {
        card: "summary_large_image",
        title: `${blog.title} | TechBloggy`,
        description: blog.description.slice(0, 150),
        images: [blog.image?.url],
      },
    };
  } catch (err) {
    console.error("Metadata fetch error:", err);
    return {
      title: "Blog | TechBloggy",
      description: "Read detailed blog articles on TechBloggy.",
    };
  }
}


export  default async function BlogPage({ params }) {
  
  const getParams = async(params)=>{
    const params1 = await params;
    return params1.id;
  }
  const id = await getParams(params);

  return <BlogDetailClient id={id} />;
}
