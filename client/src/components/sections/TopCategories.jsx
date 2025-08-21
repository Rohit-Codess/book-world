import React from 'react'

const items = [
    { icon: 'fa-book-open', label: 'Fiction', color: 'from-purple-400 to-pink-400' },
    { icon: 'fa-language', label: 'Kannada Books', color: 'from-blue-400 to-indigo-500' },
    { icon: 'fa-child', label: 'Youth Books', color: 'from-green-400 to-blue-500' },
    { icon: 'fa-graduation-cap', label: 'Academic', color: 'from-yellow-400 to-orange-500' },
]

export default function TopCategories() {
    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="mx-auto max-w-7xl px-4">
                <div className="text-center mb-12 animate-slide-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-black bg-clip-text text-transparent">
                        Top Categories
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover your next favorite book from our carefully curated categories
                    </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {items.map((c, index) => (
                        <div 
                            key={c.label} 
                            className="text-center group cursor-pointer stagger-item"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-tr ${c.color} group-hover:scale-110 transition-all duration-500 hover:rotate-6 shadow-lg hover:shadow-xl glow`}>
                                <i className={`fa-solid ${c.icon} text-white text-2xl group-hover:animate-bounce`} />
                            </div>
                            <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                                {c.label}
                            </h3>
                            <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 transition-all duration-500"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}