import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Hero() {
    const [currentSlide, setCurrentSlide] = useState(0)
    
    const slides = [
        {
            title: "Welcome to Book World",
            subtitle: "Your trusted partner for academic books, educational resources, and learning materials",
            cta: "Browse Books",
            link: "/catalog",
            bgImage: "/section/Hero/1.jpeg"
        },
        {
            title: "Academic Excellence",
            subtitle: "Comprehensive collection of textbooks, reference materials, and study guides for all levels",
            cta: "Academic Books",
            link: "#academic",
            bgImage: "/section/Hero/2.jpeg"
        },
        {
            title: "Learning Made Easy",
            subtitle: "Quality educational content designed to support students and educators in their journey",
            cta: "Explore Resources",
            link: "#new-arrivals",
            bgImage: "/section/Hero/3.jpeg"
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 8000) // Slower transition for better readability
        return () => clearInterval(timer)
    }, [slides.length])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Sliding Background Container */}
            <div className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="min-w-full h-full relative"
                    >
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${slide.bgImage})`
                            }}
                        />
                        
                        {/* Professional dark overlay for better text readability */}
                        <div className="absolute inset-0 bg-black/70"></div>
                    </div>
                ))}
            </div>

            {/* Main Content - Professional Mobile Design */}
            <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
                <div className="space-y-6 sm:space-y-8">
                    {/* Professional Trust Badge */}
                    <div className="inline-flex items-center bg-blue-600 text-white rounded-full px-4 sm:px-6 py-2 sm:py-3 shadow-lg">
                        <i className="fa-solid fa-star text-yellow-400 mr-2 text-sm sm:text-base"></i>
                        <span className="text-xs sm:text-sm font-semibold tracking-wide">TRUSTED BY EDUCATORS</span>
                        <i className="fa-solid fa-star text-yellow-400 ml-2 text-sm sm:text-base"></i>
                    </div>

                    {/* Professional Typography */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                        {slides[currentSlide].title}
                    </h1>
                    
                    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-white/90 max-w-2xl mx-auto font-light">
                        {slides[currentSlide].subtitle}
                    </p>
                    
                    {/* Professional Action Buttons - Mobile Optimized */}
                    <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
                        <Link
                            to={slides[currentSlide].link}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
                        >
                            <i className="fa-solid fa-book text-lg"></i>
                            <span className="text-lg">{slides[currentSlide].cta}</span>
                        </Link>

                        <Link
                            to="/catalog"
                            className="w-full bg-white/90 hover:bg-white text-gray-800 font-semibold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
                        >
                            <i className="fa-solid fa-list text-lg"></i>
                            <span className="text-lg">View Catalog</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Professional Slide Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-300 rounded-full ${
                            index === currentSlide 
                                ? 'w-8 h-3 bg-white' 
                                : 'w-3 h-3 bg-white/50 hover:bg-white/70'
                        }`}
                    />
                ))}
            </div>
        </section>
    )
}
