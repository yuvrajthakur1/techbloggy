// import Footer from "./components/Footer";
// import Navbar from "./components/NavBar";
// import BottomNav from  "./components/BottomNav"
// import "./globals.css";

// import { Playfair_Display, Lora } from "next/font/google";
// import "./globals.css";

// export const metadata = {
//   title: "TechBloggy",
//   description: "TechBloggy – a modern blogging platform to share and read the latest tech articles.",
// };

// // Fonts
// const playfair = Playfair_Display({
//   subsets: ["latin"],
//   weight: ["400","500","600","700"],
//   variable: "--font-heading",
// });

// const lora = Lora({
//   subsets: ["latin"],
//   weight: ["400","500","600","700"],
//   variable: "--font-body",
// });


// export default function RootLayout({
//   children,
// }) {
//   return (
//     <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
//       <head>
//       </head>
//       <body >
        
//         <Navbar />
//         <main>
//           {children}
//         </main>
//         <Footer/>
//         <BottomNav/>
//       </body>
//     </html>
//   );
// }


import "./globals.css";
import Navbar from "./components/NavBar"
import Footer from "./components/Footer";
import BottomNav from "./components/BottomNav";

import { Playfair_Display, Lora } from "next/font/google";

export const metadata = {
  title: "TechBloggy",
  description:
    "TechBloggy – a modern blogging platform to share and read the latest tech articles.",
};

// ✅ Load Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
      <body className="min-h-screen flex flex-col">
        {/* 🧭 Top Navbar */}
        <Navbar />

        {/* 📄 Page Content */}
        <main className="flex-grow">{children}</main>

        {/* 🦶 Footer (hidden on mobile if you want) */}
        <Footer />

        {/* 📱 Mobile Bottom Navigation */}
        <BottomNav />
      </body>
    </html>
  );
}

