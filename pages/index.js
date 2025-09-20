import React from 'react'
import Link from 'next/link'
import HeaderNav from "../components/landing/HeaderNav";
import HeroSection from "../components/landing/HeroSection";
import FeaturesSection from "../components/landing/FeaturesSection";
import AnalyticsPreview from "../components/landing/AnalyticsPreview";
import Footer from "../components/landing/Footer";

export default function LandingPage(){
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav />
      <main className="">
        <HeroSection />
        <FeaturesSection />
        <AnalyticsPreview />
      </main>
      <Footer />
    </div>
  )
}
