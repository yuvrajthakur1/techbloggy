"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import BlogCard from "../BlogCard";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Testimonials from "./Testimonials/Testimonials";
import LatestBlogs from  "./LatestBlog"
import "swiper/css";
import "swiper/css/pagination";
import Hero from "./Hero";
import AboutPreview from "./About"
import NewsLetter from "./Letter"
import CategorySection from "./Tags"
import SectionDivider from "./SectionDivider"

export default function Home({ blogs }) {
  const loading = !blogs || blogs.length === 0;
  return (
    <div className="bg-[#E7F2EF] min-h-screen flex flex-col">
       <Hero/>
       <SectionDivider/>
      <LatestBlogs loading={loading} blogs ={blogs}/>
       <SectionDivider/>
      <AboutPreview/>
       <SectionDivider/>
      <Testimonials />
       <SectionDivider/>
      <NewsLetter/>
       <SectionDivider/>
      <CategorySection/>
    </div>
  );
}
