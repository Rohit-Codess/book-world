import React from 'react'

export default function AuthorsPublishers() {
    const authors = [
        { name: 'Stephen King', role: 'Horror Fiction', image: '/section/AuthorsPublishers/authors/1.png' },
        { name: 'J.K. Rowling', role: 'Fantasy', image: '/section/AuthorsPublishers/authors/2.png' },
        { name: 'Dan Brown', role: 'Thriller', image: '/section/AuthorsPublishers/authors/3.png' },
        { name: 'Paulo Coelho', role: 'Philosophy', image: '/section/AuthorsPublishers/authors/4.png' },
        { name: 'Agatha Christie', role: 'Mystery', image: '/section/AuthorsPublishers/authors/5.png' },
        { name: 'Malcolm Gladwell', role: 'Non-Fiction', image: '/section/AuthorsPublishers/authors/6.png' },
    ]
    
    const publishers = [
        { name: 'PENGUIN', sub: 'Random House', image: '/section/AuthorsPublishers/publishers/1.png' },
        { name: 'HARPER', sub: 'Collins Publishers', image: '/section/AuthorsPublishers/publishers/2.png' },
        { name: 'RUPA', sub: 'Publications', image: '/section/AuthorsPublishers/publishers/3.png' },
        { name: 'MACMILLAN', sub: 'Publishers', image: '/section/AuthorsPublishers/publishers/4.png' },
        { name: 'OXFORD', sub: 'University Press', image: '/section/AuthorsPublishers/publishers/5.png' },
        { name: 'BLOOMSBURY', sub: 'Publishing', image: '/section/AuthorsPublishers/publishers/6.png' },
    ]
    
    return (
        <section id="authors" className="py-16 bg-gradient-to-br from-gray-50 to-white">
            <div className="mx-auto max-w-7xl px-4 grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div className="animate-slide-in-left">
                    <div className="text-center lg:text-left mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-black bg-clip-text text-transparent">
                            Featured Authors
                        </h2>
                        <p className="text-gray-600">Meet the brilliant minds behind your favorite books</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {authors.map((a, index) => (
                            <div 
                                key={a.name} 
                                className="text-center group cursor-pointer stagger-item"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden group-hover:scale-110 transition-transform duration-300 shadow-md hover:shadow-lg">
                                    <img 
                                        src={a.image} 
                                        alt={a.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="hidden w-full h-full items-center justify-center bg-gray-200">
                                        <i className="fa-regular fa-user text-2xl text-gray-500" />
                                    </div>
                                </div>
                                <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
                                    {a.name}
                                </h3>
                                <p className="text-sm text-gray-500 line-clamp-1">{a.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
                
                <div id="publishers" className="animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
                    <div className="text-center lg:text-left mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-black bg-clip-text text-transparent">
                            Featured Publishers
                        </h2>
                        <p className="text-gray-600">Trusted partners bringing quality content to readers</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {publishers.map((p, index) => (
                            <div 
                                key={p.name} 
                                className="group cursor-pointer stagger-item"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:scale-105 transition-all duration-300 card-interactive">
                                    <div className="h-16 flex items-center justify-center mb-3 overflow-hidden rounded-lg">
                                        <img 
                                            src={p.image} 
                                            alt={p.name}
                                            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                            }}
                                        />
                                        <span className="hidden font-bold text-blue-600 text-lg">{p.name}</span>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{p.name}</h3>
                                        <p className="text-xs text-gray-500 line-clamp-1">{p.sub}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}