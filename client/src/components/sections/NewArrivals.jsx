import React, { useState } from 'react'
import { useCart } from '../../store/cart'

const items = [
    { 
        id: 'new-1', 
        title: 'A Court of Thorns and Roses', 
        author: 'Sarah J. Maas', 
        price: 499, 
        rating: 4.9,
        image: '/section/NewArrivals/1.jpeg'
    },
    { 
        id: 'new-2', 
        title: 'Digital Ethics', 
        author: 'Tech Author', 
        price: 399, 
        rating: 4.6,
        image: '/section/NewArrivals/2.jpeg'
    },
    { 
        id: 'new-3', 
        title: 'Modern Psychology', 
        author: 'Dr. Mind', 
        price: 549, 
        rating: 4.8,
        image: '/section/NewArrivals/3.jpeg'
    },
    { 
        id: 'new-4', 
        title: 'Climate Solutions', 
        author: 'Environmental Expert', 
        price: 429, 
        rating: 4.7,
        image: '/section/NewArrivals/4.jpeg'
    },
    { 
        id: 'new-5', 
        title: 'Space Exploration', 
        author: 'NASA Scientists', 
        price: 599, 
        rating: 4.9,
        image: '/section/NewArrivals/5.jpeg'
    },
]

export default function NewArrivals() {
    const add = useCart((s) => s.add)
    const [addingItems, setAddingItems] = useState(new Set())

    const handleAddToCart = async (book) => {
        setAddingItems(prev => new Set(prev).add(book.id))
        
        // Simulate a brief loading state for better UX
        await new Promise(resolve => setTimeout(resolve, 300))
        
        add(book)
        setAddingItems(prev => {
            const newSet = new Set(prev)
            newSet.delete(book.id)
            return newSet
        })
    }

    return (
        <section id="new-arrivals" className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex items-center justify-between mb-10 animate-slide-in-up">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-black bg-clip-text text-transparent">
                            New Arrivals
                        </h2>
                        <p className="text-gray-600">Fresh books just landed on our shelves</p>
                    </div>
                    <a href="#" className="btn-view-all hover:gap-3 transition-all duration-300">
                        View All 
                        <i className="fa-solid fa-arrow-right" />
                    </a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {items.map((b, index) => (
                        <div 
                            key={b.id} 
                            className="book-card p-4 bg-white border-2 border-green-200 relative overflow-hidden stagger-item"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="book-cover h-52 rounded-xl mb-4 overflow-hidden relative group bg-white shadow-sm">
                                <img 
                                    src={b.image} 
                                    alt={b.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="hidden w-full h-full items-center justify-center bg-gray-100">
                                    <i className="fa-solid fa-book text-4xl text-gray-400" />
                                </div>
                                <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse glow z-10">
                                    NEW
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            
                            <div className="book-card-content">
                                <div className="space-y-2 flex-1">
                                    <h3 className="book-title line-clamp-2 hover:text-green-600 transition-colors duration-300">
                                        {b.title}
                                    </h3>
                                    <p className="book-author line-clamp-1">{b.author}</p>
                                    
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <i 
                                                    key={i}
                                                    className={`fa-solid fa-star text-xs ${
                                                        i < Math.floor(b.rating) ? 'text-yellow-400' : 'text-gray-300'
                                                    }`} 
                                                />
                                            ))}
                                            <span className="text-xs text-gray-600 ml-1">({b.rating})</span>
                                        </div>
                                        <span className="book-tag text-green-600 bg-green-100 font-bold">
                                            FRESH
                                        </span>
                                    </div>
                                    
                                    <div className="book-price text-green-600 mb-3">₹{b.price}</div>
                                </div>
                                
                                <div className="book-card-button">
                                    <button 
                                        onClick={() => handleAddToCart(b)} 
                                        disabled={addingItems.has(b.id)}
                                        className={`w-full py-2.5 rounded-xl font-medium transition-all duration-300 transform ${
                                            addingItems.has(b.id)
                                                ? 'bg-green-500 text-white scale-95'
                                                : 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 hover:shadow-lg'
                                        } micro-bounce focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                                    >
                                        {addingItems.has(b.id) ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <i className="fa-solid fa-check animate-scale-in" />
                                                Added!
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                <i className="fa-solid fa-cart-plus" />
                                                Add to Cart
                                            </span>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}