import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React from "react";

export const metadata = {
    title: "Thumblify",
    description: "Thumblify is an free AI based platform where you can make valuable thubmnails in seconds.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}