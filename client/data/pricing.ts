import { IPricing } from "@/types";

export const pricingData: IPricing[] = [
    {
        name: "Starter",
        price: 10,
        period: "100 credits",
        features: [
            "50 Premium AI Thumbnails",
            "Best for starters",
            "No watermark on downloads",
            "High-quality",
            "Commercial usage allowed",
            "Credits never expire"
            
        ],
        mostPopular: false
    },
    {
        name: "Pro",
        price: 40,
        period: "500 credits",
        features: [
            "110 Premium AI Thumbnails",
            "Best for intermediate",
            "No watermark on downloads",
            "Course completion certificate",
            "High-quality",
            "Commercial usage allowed",
            "Credits never expire"
        ],
        mostPopular: true
    },
    {
        name: "Ultra",
        price: 90,
        period: "1100 credits",
        features: [
           "280 Premium AI Thumbnails",
            "Best for Professionals",
            "No watermark on downloads",
            "Course completion certificate",
            "High-quality",
            "Commercial usage allowed",
            "Credits never expire",
            "Access to all AI models"
        ],
        mostPopular: false
    }
];