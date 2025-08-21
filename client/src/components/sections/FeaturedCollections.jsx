import React from 'react'

export default function FeaturedCollections() {
    const cards = [
        { 
            title: 'School Textbooks', 
            sub: 'CBSE, ICSE & State Boards', 
            icon: 'fa-school', 
            from: 'from-indigo-500', 
            to: 'to-purple-600', 
            btn: 'Shop Now',
            items: '500+ Books',
            image: '/section/FeaturedCollections/1.jpeg'
        },
        { 
            title: 'Stationery', 
            sub: 'Complete Office Supplies', 
            icon: 'fa-pen', 
            from: 'from-green-400', 
            to: 'to-blue-600', 
            btn: 'Shop Now',
            items: '200+ Items',
            image: '/section/FeaturedCollections/2.jpeg'
        },
        { 
            title: 'Activity Books', 
            sub: 'Fun Learning Resources', 
            icon: 'fa-puzzle-piece', 
            from: 'from-yellow-400', 
            to: 'to-orange-600', 
            btn: 'Shop Now',
            items: '150+ Activities',
            image: '/section/FeaturedCollections/3.jpeg'
        },
        { 
            title: "Children's Books", 
            sub: 'Stories & Picture Books', 
            icon: 'fa-baby', 
            from: 'from-pink-400', 
            to: 'to-rose-600', 
            btn: 'Shop Now',
            items: '300+ Stories',
            image: '/section/FeaturedCollections/4.jpeg'
        },
    ]

    return (
        <section className="py-16 bg-gray-100">
            <div className="mx-auto max-w-7xl px-4">
                <div className="text-center mb-12 animate-slide-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-black bg-clip-text text-transparent">
                        Featured Collections
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our specially curated collections for every learning need
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cards.map((c, index) => (
                        <div 
                            key={c.title} 
                            className="relative overflow-hidden rounded-2xl group cursor-pointer card-interactive stagger-item transform hover:scale-105 transition-all duration-500"
                            style={{ animationDelay: `${index * 0.15}s` }}
                        >
                            <div className="bg-black/20 h-64 flex flex-col items-center justify-center text-white relative overflow-hidden">
                                {/* Background Image */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-700"
                                    style={{
                                        backgroundImage: `url(${c.image})`
                                    }}
                                />
                                
                                {/* Dark overlay for text readability */}
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300" />
                                
                                {/* Background Pattern */}
                                <div className="absolute inset-0 opacity-10">
                                    <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full" />
                                    <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-white rounded-full" />
                                    <div className="absolute top-1/2 right-8 w-4 h-4 border border-white transform rotate-45" />
                                </div>
                                
                                <div className="text-center z-10 p-4 pb-16">
                                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300 backdrop-blur-sm">
                                        <i className={`fa-solid ${c.icon} text-2xl group-hover:animate-bounce`} />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:scale-105 transition-transform duration-300 text-shadow-lg">
                                        {c.title}
                                    </h3>
                                    <p className="text-sm mb-1 text-shadow">{c.sub}</p>
                                    <p className="text-xs font-medium text-shadow">{c.items}</p>
                                </div>
                                
                                {/* Animated background elements */}
                                <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
                                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700 delay-100" />
                            </div>
                            
                            <button className="absolute bottom-4 left-4 right-4 bg-white text-gray-800 py-2.5 rounded-xl font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 micro-bounce shadow-lg">
                                {c.btn}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}