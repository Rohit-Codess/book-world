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
            bgImage: "/src/assets/section/Hero/1.png"
        },
        {
            title: "Academic Excellence",
            subtitle: "Comprehensive collection of textbooks, reference materials, and study guides for all levels",
            cta: "Academic Books",
            link: "#academic",
            bgImage: "/src/assets/section/Hero/2.png"
        },
        {
            title: "Learning Made Easy",
            subtitle: "Quality educational content designed to support students and educators in their journey",
            cta: "Explore Resources",
            link: "#new-arrivals",
            bgImage: "/src/assets/section/Hero/3.png"
        }
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 8000) // Slower transition for better readability
        return () => clearInterval(timer)
    }, [slides.length])

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-50">
            {/* Sliding Background Container */}
            <div className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
                 style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className="min-w-full h-full relative"
                    >
                        {/* Background Image - Full visibility */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                            style={{
                                backgroundImage: `url(${slide.bgImage})`
                            }}
                        />
                        
                        {/* Light overlay for text readability */}
                        <div className="absolute inset-0 bg-black/45"></div>
                    </div>
                ))}
            </div>

            {/* Simple Educational Icons */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute top-[15%] left-[5%] text-blue-400 text-6xl">
                    <i className="fa-solid fa-graduation-cap" />
                </div>
                <div className="absolute bottom-[20%] right-[8%] text-indigo-400 text-5xl">
                    <i className="fa-solid fa-book-open" />
                </div>
                <div className="absolute top-[25%] right-[15%] text-blue-300 text-4xl">
                    <i className="fa-solid fa-pencil" />
                </div>
                <div className="absolute bottom-[35%] left-[10%] text-indigo-300 text-4xl">
                    <i className="fa-solid fa-lightbulb" />
                </div>
            </div>

            {/* Main Content - Clean and Professional */}
            <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pb-20">
                <div>
                    {/* Educational Badge */}
                    <div className="group inline-flex items-center bg-blue-100 hover:bg-blue-200 rounded-full m-3 px-6 py-3 mb-8 border border-blue-200 hover:border-blue-300 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg">
                        <i className="fa-solid fa-award text-blue-600 mr-2 group-hover:animate-spin group-hover:text-blue-700 transition-colors duration-300" />
                        <span className="text-sm font-semibold text-blue-800 tracking-wide group-hover:text-blue-900 transition-colors duration-300">TRUSTED BY EDUCATORS</span>
                        <i className="fa-solid fa-star text-blue-600 ml-2 group-hover:animate-pulse group-hover:text-blue-700 transition-colors duration-300" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-white hover:text-white transition-colors duration-300">
                        {slides[currentSlide].title}
                    </h1>
                    
                    <p className="text-lg sm:text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-white font-medium hover:text-white transition-colors duration-300">
                        {slides[currentSlide].subtitle}
                    </p>
                    
                    {/* Clean Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                        <Link
                            to={slides[currentSlide].link}
                            className="group inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-10 py-4 rounded-lg transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <i className="fa-solid fa-book mr-3 relative z-10 group-hover:animate-pulse"></i>
                            <span className="relative z-10">{slides[currentSlide].cta}</span>
                        </Link>

                        <Link
                            to="#"
                            className="group inline-flex items-center justify-center bg-white hover:bg-white text-black text-lg font-semibold px-10 py-4 rounded-lg transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <i className="fa-solid fa-book mr-3 relative z-10 group-hover:animate-pulse"></i>
                            <span className="relative z-10">View All Books</span>
                        </Link>
                    </div>
                </div>

                {/* Educational Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
                    <div className="group text-center bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="text-4xl sm:text-5xl font-bold mb-4 text-red-600 group-hover:text-red-700 transition-colors duration-300 group-hover:animate-pulse">
                                10,000+
                            </div>
                            <div className="text-base sm:text-lg text-gray-700 font-semibold group-hover:text-gray-800 transition-colors duration-300">Academic Books</div>
                            <div className="mt-3 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                                <i className="fa-solid fa-book text-red-500 text-2xl group-hover:text-red-600" />
                            </div>
                        </div>
                    </div>
                    <div className="group text-center bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="text-4xl sm:text-5xl font-bold mb-4 text-red-600 group-hover:text-red-600 transition-colors duration-300 group-hover:animate-pulse">
                                50,000+
                            </div>
                            <div className="text-base sm:text-lg text-gray-700 font-semibold group-hover:text-gray-800 transition-colors duration-300">Happy Students</div>
                            <div className="mt-3 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                                <i className="fa-solid fa-user-graduate text-red-500 text-2xl group-hover:text-red-600" />
                            </div>
                        </div>
                    </div>
                    <div className="group text-center bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative z-10">
                            <div className="text-4xl sm:text-5xl font-bold mb-4 text-red-600 group-hover:text-red-600 transition-colors duration-300 group-hover:animate-pulse">
                                500+
                            </div>
                            <div className="text-base sm:text-lg text-gray-700 font-semibold group-hover:text-gray-800 transition-colors duration-300">Expert Authors</div>
                            <div className="mt-3 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                                <i className="fa-solid fa-chalkboard-teacher text-red-500 text-2xl group-hover:text-red-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Simple Navigation Dots */}
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-white/90 px-6 py-3 rounded-full shadow-lg border border-gray-200 backdrop-blur-sm">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`transition-all duration-500 hover:scale-125 ${
                            index === currentSlide 
                                ? 'w-8 h-3 bg-red-600 shadow-md' 
                                : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                        } rounded-full transform hover:-translate-y-0.5`}
                    />
                ))}
            </div>

            {/* Simple Navigation Arrows */}
            <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                className="group absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-110 hover:-translate-x-1"
            >
                <i className="fa-solid fa-chevron-left group-hover:-translate-x-0.5 transition-transform duration-300" />
            </button>
            <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                className="group absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white hover:bg-gray-50 rounded-full flex items-center justify-center text-gray-600 transition-all duration-300 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-110 hover:translate-x-1"
            >
                <i className="fa-solid fa-chevron-right group-hover:translate-x-0.5 transition-transform duration-300" />
            </button>

            {/* Educational Features Banner */}
            <div className="absolute bottom-0 left-0 right-0 bg-red-600 hover:bg-red-700 text-white py-4 transition-colors duration-500 cursor-pointer group">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-wrap justify-center items-center space-x-8 text-sm font-medium">
                        <div className="flex items-center transform group-hover:scale-105 transition-transform duration-300">
                            <i className="fa-solid fa-truck mr-2 group-hover:animate-bounce" />
                            <span>Free Shipping on Orders ₹500+</span>
                        </div>
                        <div className="flex items-center transform group-hover:scale-105 transition-transform duration-300">
                            <i className="fa-solid fa-shield-check mr-2 group-hover:animate-pulse" />
                            <span>Authentic Books Guaranteed</span>
                        </div>
                        <div className="flex items-center transform group-hover:scale-105 transition-transform duration-300">
                            <i className="fa-solid fa-headset mr-2 group-hover:animate-pulse" />
                            <span>24/7 Student Support</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
