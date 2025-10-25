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

export default function Home({ blogs }) {
  const loading = !blogs || blogs.length === 0;
  return (
    <div className="bg-gradient-to-br from-[#19183B] via-[#708993] to-[#E7F2EF] min-h-screen flex flex-col">
       <Hero/>
      <LatestBlogs loading={loading} blogs ={blogs}/>
      <AboutPreview/>
      <Testimonials />
    </div>
  );
}
