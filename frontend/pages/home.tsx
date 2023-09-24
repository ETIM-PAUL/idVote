import React from "react";
import HomeNav from "../components/HomeNav";
import HeroSection from "../components/HeroSection";
import AppCards from "@/components/AppCards";
import WhyUs from "@/components/WhyUs";
import Footer from "@/components/Footer";

const HomePage = () => {
  return (
    <div>
      <HomeNav />
      <HeroSection />
      <AppCards />
      <WhyUs />
      <Footer />
    </div>
  );
};

export default HomePage;
