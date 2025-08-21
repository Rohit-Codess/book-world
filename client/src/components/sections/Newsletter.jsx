import React, { useState } from 'react'

export default function Newsletter() {
    const [email, setEmail] = useState('')
    const [isSubscribed, setIsSubscribed] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleSubscribe = async (e) => {
        e.preventDefault()
        if (!email) return

        setIsLoading(true)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setIsSubscribed(true)
        setIsLoading(false)
        setEmail('')
        
        // Reset after 3 seconds
        setTimeout(() => setIsSubscribed(false), 3000)
    }

    return (
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-600 text-white text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full animate-pulse" />
                <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-white transform rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }} />
                <div className="absolute bottom-1/4 right-1/4 w-8 h-8 border border-white rounded-full animate-pulse" style={{ animationDelay: '1.5s' }} />
            </div>

            <div className="mx-auto max-w-4xl px-4 relative z-10">
                <div className="animate-slide-in-up">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                        <i className="fa-solid fa-envelope text-2xl animate-bounce" />
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                        Stay Updated with Latest Books
                    </h2>
                    <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        Subscribe to our newsletter for exclusive deals, new releases, author interviews, and personalized book recommendations
                    </p>
                </div>

                <form onSubmit={handleSubscribe} className="mx-auto max-w-md animate-scale-in" style={{ animationDelay: '0.4s' }}>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address" 
                            className="flex-1 bg-white px-4 py-3 rounded-xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 transition-all duration-300 placeholder-gray-500"
                            disabled={isLoading || isSubscribed}
                            required
                        />
                        <button 
                            type="submit"
                            disabled={isLoading || isSubscribed}
                            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 micro-bounce focus:outline-none focus:ring-4 focus:ring-white/30 ${
                                isSubscribed 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-white text-blue-600 hover:bg-gray-100'
                            } ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <div className="spinner" />
                                    Subscribing...
                                </span>
                            ) : isSubscribed ? (
                                <span className="flex items-center gap-2">
                                    <i className="fa-solid fa-check animate-scale-in" />
                                    Subscribed!
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <i className="fa-solid fa-paper-plane" />
                                    Subscribe
                                </span>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm opacity-80 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    <span className="flex items-center gap-2">
                        <i className="fa-solid fa-gift text-yellow-300" />
                        Exclusive Deals
                    </span>
                    <span className="flex items-center gap-2">
                        <i className="fa-solid fa-book-open text-green-300" />
                        New Releases
                    </span>
                    <span className="flex items-center gap-2">
                        <i className="fa-solid fa-user-friends text-pink-300" />
                        Author Interviews
                    </span>
                    <span className="flex items-center gap-2">
                        <i className="fa-solid fa-star text-orange-300" />
                        Book Reviews
                    </span>
                </div>

                <p className="text-xs opacity-70 mt-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                    No spam, unsubscribe anytime. We respect your privacy.
                </p>
            </div>
        </section>
    )
}