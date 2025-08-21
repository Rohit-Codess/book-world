import React, { useState } from 'react'
import { useCart } from '../../store/cart'

const pres = [
    { 
        id: 'pre-1',
        title: 'The Winds of Winter', 
        author: 'George R.R. Martin', 
        eta: 'Dec 2024', 
        price: 599,
        image: '/section/PreOrder/1.jpeg'
    },
    { 
        id: 'pre-2',
        title: 'Atomic Habits', 
        author: 'James Clear', 
        eta: 'Jan 2025', 
        price: 449,
        image: '/section/PreOrder/2.jpeg'
    },
    { 
        id: 'pre-3',
        title: 'The Next Age', 
        author: 'Yuval Noah Harari', 
        eta: 'Feb 2025', 
        price: 699,
        image: '/section/PreOrder/3.jpeg'
    },
    { 
        id: 'pre-4',
        title: 'Digital Minimalism', 
        author: 'Cal Newport', 
        eta: 'Mar 2025', 
        price: 529,
        image: '/section/PreOrder/4.jpeg'
    },
]

export default function PreOrder() {
    const add = useCart((s) => s.add)
    const [addingItems, setAddingItems] = useState(new Set())

    const handlePreOrder = async (book) => {
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
        <section className="py-16 bg-gradient-to-br from-yellow-50 to-orange-50">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex items-center justify-between mb-10 animate-slide-in-up">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-black bg-clip-text text-transparent">
                            Pre-Order Books
                        </h2>
                        <p className="text-gray-600">Reserve your copy of upcoming bestsellers</p>
                    </div>
                    <a className="btn-view-all hover:gap-3 transition-all duration-300" href="#">
                        View All 
                        <i className="fa-solid fa-arrow-right" />
                    </a>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pres.map((b, index) => (
                        <div 
                            key={b.id} 
                            className="book-card p-4 bg-white border-2 border-yellow-200 relative overflow-hidden stagger-item"
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
                                <span className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold animate-pulse z-10">
                                    PRE-ORDER
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            
                            <div className="book-card-content">
                                <div className="space-y-2 flex-1">
                                    <h3 className="book-title line-clamp-2 hover:text-yellow-600 transition-colors duration-300">
                                        {b.title}
                                    </h3>
                                    <p className="book-author line-clamp-1">{b.author}</p>
                                    <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block truncate-ellipsis max-w-full">
                                        Expected: {b.eta}
                                    </p>
                                    
                                    <div className="book-price text-yellow-600 mb-3">₹{b.price}</div>
                                </div>
                                
                                <div className="book-card-button">
                                    <button 
                                        onClick={() => handlePreOrder(b)} 
                                        disabled={addingItems.has(b.id)}
                                        className={`w-full py-2.5 rounded-xl font-medium transition-all duration-300 transform ${
                                            addingItems.has(b.id)
                                                ? 'bg-green-500 text-white scale-95'
                                                : 'bg-red-500 text-white hover:bg-red-600 hover:scale-105 hover:shadow-lg'
                                        } micro-bounce focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                                    >
                                        {addingItems.has(b.id) ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <i className="fa-solid fa-check animate-scale-in" />
                                                Pre-Ordered!
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                <i className="fa-solid fa-clock" />
                                                Pre-Order Now
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