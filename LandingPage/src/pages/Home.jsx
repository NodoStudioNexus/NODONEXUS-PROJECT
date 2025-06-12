import React from "react";
import CarrouselButtons from "../components/common/CarrouselButtons";
import Footer from "../components/layout/Footer";
import HeroSection from "../components/sections/HeroSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ServiceSection from "../components/sections/ServiceSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <ServiceSection />
      <CarrouselButtons />
      <ProjectsSection />
      <Footer />
    </>
  );
};

export default Home;
