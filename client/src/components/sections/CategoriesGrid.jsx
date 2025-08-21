import React from 'react'

const categories = [
    { 
        name: 'Fiction', 
        icon: 'fa-solid fa-magic', 
        bgColor: 'bg-purple-100', 
        iconColor: 'text-purple-600',
        hoverBg: 'hover:bg-purple-200'
    },
    { 
        name: 'Science', 
        icon: 'fa-solid fa-flask', 
        bgColor: 'bg-blue-100', 
        iconColor: 'text-blue-600',
        hoverBg: 'hover:bg-blue-200'
    },
    { 
        name: 'Romance', 
        icon: 'fa-solid fa-heart', 
        bgColor: 'bg-pink-100', 
        iconColor: 'text-pink-600',
        hoverBg: 'hover:bg-pink-200'
    },
    { 
        name: 'History', 
        icon: 'fa-solid fa-landmark', 
        bgColor: 'bg-amber-100', 
        iconColor: 'text-amber-600',
        hoverBg: 'hover:bg-amber-200'
    },
    { 
        name: 'Children', 
        icon: 'fa-solid fa-child', 
        bgColor: 'bg-green-100', 
        iconColor: 'text-green-600',
        hoverBg: 'hover:bg-green-200'
    },
    { 
        name: 'Education', 
        icon: 'fa-solid fa-graduation-cap', 
        bgColor: 'bg-indigo-100', 
        iconColor: 'text-indigo-600',
        hoverBg: 'hover:bg-indigo-200'
    },
    { 
        name: 'Business', 
        icon: 'fa-solid fa-briefcase', 
        bgColor: 'bg-gray-100', 
        iconColor: 'text-gray-600',
        hoverBg: 'hover:bg-gray-200'
    },
    { 
        name: 'Health', 
        icon: 'fa-solid fa-heart-pulse', 
        bgColor: 'bg-red-100', 
        iconColor: 'text-red-600',
        hoverBg: 'hover:bg-red-200'
    },
    { 
        name: 'Art', 
        icon: 'fa-solid fa-palette', 
        bgColor: 'bg-orange-100', 
        iconColor: 'text-orange-600',
        hoverBg: 'hover:bg-orange-200'
    },
    { 
        name: 'Cooking', 
        icon: 'fa-solid fa-utensils', 
        bgColor: 'bg-yellow-100', 
        iconColor: 'text-yellow-600',
        hoverBg: 'hover:bg-yellow-200'
    },
    { 
        name: 'Travel', 
        icon: 'fa-solid fa-plane', 
        bgColor: 'bg-teal-100', 
        iconColor: 'text-teal-600',
        hoverBg: 'hover:bg-teal-200'
    },
    { 
        name: 'Self-Help', 
        icon: 'fa-solid fa-lightbulb', 
        bgColor: 'bg-cyan-100', 
        iconColor: 'text-cyan-600',
        hoverBg: 'hover:bg-cyan-200'
    }
]

export default function CategoriesGrid() {
    return (
        <section className="py-14 bg-gradient-to-br from-gray-50 to-white">
            <div className="mx-auto max-w-7xl px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        Shop by Categories
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Discover your next favorite book from our carefully curated categories
                    </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                    {categories.map((category, index) => (
                        <div 
                            key={category.name} 
                            className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                            style={{
                                animationDelay: `${index * 100}ms`
                            }}
                        >
                            <div className={`
                                ${category.bgColor} ${category.hoverBg}
                                p-8 rounded-2xl shadow-md hover:shadow-xl 
                                transition-all duration-300 text-center
                                border border-white/50 backdrop-blur-sm
                                group-hover:border-white
                            `}>
                                <div className={`
                                    ${category.iconColor} mb-4 text-3xl
                                    transform transition-transform duration-300
                                    group-hover:scale-110 group-hover:rotate-12
                                `}>
                                    <i className={category.icon} />
                                </div>
                                <h3 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-gray-900 transition-colors">
                                    {category.name}
                                </h3>
                                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-xs text-gray-500">Explore →</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Floating background elements for visual appeal */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-10 w-20 h-20 bg-primary/5 rounded-full blur-xl"></div>
                    <div className="absolute bottom-20 right-10 w-32 h-32 bg-secondary/5 rounded-full blur-xl"></div>
                    <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-accent/5 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
            </div>
        </section>
    )
}