import React from 'react'

export default function PromoBanners() {
    const promoBanners = [
        {
            id: 1,
            title: "Learn in Leaps Series",
            subtitle: "Accelerate your learning journey",
            buttonText: "Explore Series",
            gradient: "from-indigo-500 to-purple-600",
            image: "/section/PromoBanners/1.jpeg"
        },
        {
            id: 2,
            title: "Teensome Classics",
            subtitle: "Timeless stories for young readers",
            buttonText: "Browse Classics",
            gradient: "from-green-500 to-teal-600",
            image: "/section/PromoBanners/2.jpeg"
        },
        {
            id: 3,
            title: "Action & Adventure Collection",
            subtitle: "Thrilling tales await",
            buttonText: "Discover Adventures",
            gradient: "from-rose-600 to-pink-600",
            image: "/section/PromoBanners/3.jpeg",
            fullWidth: true
        }
    ]

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="mx-auto max-w-7xl px-4">
                <div className="text-center mb-12 animate-slide-in-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-black bg-clip-text text-transparent">
                        Unique Collections
                    </h2>
                    <p className="text-gray-600 text-lg">Discover our curated book collections</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {promoBanners.slice(0, 2).map((banner, index) => (
                        <div 
                            key={banner.id} 
                            className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 stagger-item"
                            style={{ animationDelay: `${index * 0.2}s` }}
                        >
                            <div className="bg-black/20 p-8 text-white relative overflow-hidden min-h-[200px] flex items-center">
                                <div className="relative z-10 flex-1">
                                    <h3 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in text-shadow-lg">{banner.title}</h3>
                                    <p className="mb-6 text-lg animate-slide-in-up text-shadow">{banner.subtitle}</p>
                                    <button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                                        {banner.buttonText}
                                    </button>
                                </div>
                                
                                <div className="absolute inset-0">
                                    <img 
                                        src={banner.image} 
                                        alt={banner.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />
                                </div>
                                
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Full width banner */}
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 stagger-item animate-slide-in-up">
                    <div className="bg-black/20 p-8 md:p-12 text-white relative overflow-hidden min-h-[250px] flex items-center">
                        <div className="relative z-10 flex-1 text-center md:text-left">
                            <h3 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in text-shadow-lg">{promoBanners[2].title}</h3>
                            <p className="text-xl mb-6 animate-slide-in-up text-shadow">{promoBanners[2].subtitle}</p>
                            <button className="bg-white text-black hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                                {promoBanners[2].buttonText}
                            </button>
                        </div>
                        
                        <div className="absolute inset-0">
                            <img 
                                src={promoBanners[2].image} 
                                alt={promoBanners[2].title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                }}
                            />
                        </div>
                        
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
                    </div>
                </div>
            </div>
        </section>
    )
}