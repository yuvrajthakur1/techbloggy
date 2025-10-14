import Footer from "./components/Footer";
import Navbar from "./components/NavBar";
import "./globals.css";
import GlobalLoader from "./components/global/GlobalIndicator"
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";

// Fonts
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  variable: "--font-heading",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400","500","600","700"],
  variable: "--font-body",
});


export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable}`}>
      <head>
        <title>My Blog App</title>
      </head>
      <body >
        <GlobalLoader/>
        <Navbar />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
