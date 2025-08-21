import React, { useState } from 'react'
import { useCart } from '../../store/cart'

const deals = [
    { 
        id: 'deal-1', 
        title: 'The Great Gatsby', 
        author: 'F. Scott Fitzgerald', 
        price: 299, 
        listPrice: 399, 
        off: '25% OFF', 
        rating: 4.8,
        image: '/section/Deals/1.jpeg'
    },
    { 
        id: 'deal-2', 
        title: 'To Kill a Mockingbird', 
        author: 'Harper Lee', 
        price: 349, 
        listPrice: 449, 
        off: '22% OFF', 
        rating: 4.7,
        image: '/section/Deals/2.jpeg'
    },
    { 
        id: 'deal-3', 
        title: '1984', 
        author: 'George Orwell', 
        price: 279, 
        listPrice: 359, 
        off: '20% OFF', 
        rating: 4.9,
        image: '/section/Deals/3.jpeg'
    },
    { 
        id: 'deal-4', 
        title: 'Pride and Prejudice', 
        author: 'Jane Austen', 
        price: 319, 
        listPrice: 399, 
        off: '20% OFF', 
        rating: 4.6,
        image: '/section/Deals/4.jpeg'
    },
    { 
        id: 'deal-5', 
        title: 'The Catcher in the Rye', 
        author: 'J.D. Salinger', 
        price: 289, 
        listPrice: 369, 
        off: '22% OFF', 
        rating: 4.5,
        image: '/section/Deals/5.jpeg'
    }
]

export default function Deals() {
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
        <section id='deals' className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex items-center justify-between mb-10 animate-slide-in-up">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-black bg-clip-text text-transparent">
                            Deals of the Week
                        </h2>
                        <p className="text-gray-600">Limited time offers on bestselling books</p>
                    </div>
                    <a href="#" className="btn-view-all hover:gap-3 transition-all duration-300">
                        View All 
                        <i className="fa-solid fa-arrow-right" />
                    </a>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {deals.map((b, index) => (
                        <div 
                            key={b.id} 
                            className="book-card bg-white relative overflow-hidden stagger-item"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Deal Ribbon */}
                            <div className="absolute -top-0 -right-8 bg-red-500 text-white px-8 py-1 text-xs font-bold transform rotate-45 z-10">
                                DEAL
                            </div>
                            
                            <div className="book-cover rounded-xl overflow-hidden relative group bg-white shadow-sm">
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
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            
                            <div className="book-card-content">
                                <div className="flex-1">
                                    <h3 className="book-title hover:text-red-600 transition-colors duration-300">
                                        {b.title}
                                    </h3>
                                    <p className="book-author">{b.author}</p>
                                    
                                    <div className="book-card-rating-container">
                                        <div className="book-card-rating">
                                            {[...Array(5)].map((_, i) => (
                                                <i 
                                                    key={i}
                                                    className={`fa-solid fa-star text-xs ${
                                                        i < Math.floor(b.rating) ? 'text-yellow-400' : 'text-gray-300'
                                                    }`} 
                                                />
                                            ))}
                                            <span className="book-card-rating-text">({b.rating})</span>
                                        </div>
                                        <span className="book-tag bg-red-100 text-red-600 animate-pulse font-bold">
                                            {b.off}
                                        </span>
                                    </div>
                                    
                                    <div className="book-card-price-section">
                                        <div className="flex items-center gap-2">
                                            <span className="book-price text-red-600">₹{b.price}</span>
                                            <span className="text-sm text-gray-500 line-through">₹{b.listPrice}</span>
                                        </div>
                                        <span className="text-xs text-green-600 font-medium">
                                            Save ₹{b.listPrice - b.price}
                                        </span>
                                    </div>
                                </div>
                                
                                <div className="book-card-button">
                                    <button 
                                        onClick={() => handleAddToCart(b)} 
                                        disabled={addingItems.has(b.id)}
                                        className={`${
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