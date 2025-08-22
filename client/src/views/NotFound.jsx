import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
            <div className="text-center max-w-lg mx-auto animate-fade-in">
                {/* 404 Animation */}
                <div className="mb-8 relative">
                    <div className="text-8xl md:text-9xl font-bold text-gray-200 mb-4 animate-pulse">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <i className="fa-solid fa-book-open text-6xl text-blue-400 animate-bounce" />
                    </div>
                </div>

                {/* Content */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-slide-in-up">
                    Page Not Found
                </h1>
                <p className="text-gray-600 mb-8 leading-relaxed animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                    Oops! It looks like this page has wandered off into another chapter.
                    The story you're looking for doesn't exist in our library.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
                    <Link
                        to="/"
                        className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 micro-bounce"
                    >
                        <i className="fa-solid fa-home" />
                        Back to Home
                    </Link>

                    <Link
                        to="/catalog"
                        className="btn-secondary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 micro-bounce"
                    >
                        <i className="fa-solid fa-book" />
                        Browse Books
                    </Link>
                </div>

                {/* Suggestions */}
                <div className="mt-12 p-6 bg-white rounded-2xl shadow-soft animate-scale-in" style={{ animationDelay: '0.6s' }}>
                    <h3 className="font-semibold text-gray-800 mb-3">While you're here, you might enjoy:</h3>
                    <div className="flex flex-wrap justify-center gap-3 text-sm">
                        <Link to="/books" className="text-blue-600 hover:text-blue-800 transition-colors">Popular Books</Link>
                        <span className="text-gray-300">•</span>
                        <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">New Arrivals</Link>
                        <span className="text-gray-300">•</span>
                        <Link to="/books" className="text-blue-600 hover:text-blue-800 transition-colors">Special Deals</Link>
                    </div>
                </div>

                {/* Fun Elements */}
                <div className="mt-8 text-gray-400 text-sm animate-fade-in" style={{ animationDelay: '0.8s' }}>
                    <p>📚 "Not all those who wander are lost" - but this page definitely is!</p>
                </div>
            </div>

            {/* Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-20 left-10 text-blue-200 text-4xl animate-float">
                    <i className="fa-solid fa-book" />
                </div>
                <div className="absolute bottom-20 right-10 text-purple-200 text-5xl animate-float" style={{ animationDelay: '1s' }}>
                    <i className="fa-solid fa-bookmark" />
                </div>
                <div className="absolute top-1/3 right-20 text-green-200 text-3xl animate-float" style={{ animationDelay: '2s' }}>
                    <i className="fa-solid fa-feather" />
                </div>
                <div className="absolute bottom-1/3 left-20 text-orange-200 text-4xl animate-float" style={{ animationDelay: '0.5s' }}>
                    <i className="fa-solid fa-scroll" />
                </div>
            </div>
        </div>
    )
}