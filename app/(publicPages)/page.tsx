'use client'
import ContactSection from "@/sections/ContactSection";
import CTASection from "@/sections/CTASection";
import FeaturesSection from "@/sections/FeaturesSection";
import HeroSection from "@/sections/HeroSection";
import PricingSection from "@/sections/PricingSection";
import TestimonialSection from "@/sections/TestimonialSection";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
 
 const pathname = usePathname()

  useEffect(() => {
    // It will place us at the top of page whenever path will get change
    window.scrollTo(0,0)
  },[pathname])
    return (
        <>
            <HeroSection />
            <FeaturesSection />
            <TestimonialSection />
            <PricingSection />
            <ContactSection />
            <CTASection />
        </>
    );
}