import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";

const AboutUsPage = () => {
  return (
    <>
      <Header />
      <main className="about-us-page">
        <AboutUs />
      </main>
      <Footer />
    </>
  );
};

export default AboutUsPage;
