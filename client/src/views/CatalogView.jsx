import React, { useState } from 'react'
import useCatalogController from '../controllers/useCatalogController'
import { useCart } from '../store/cart'


export default function CatalogView() {
    const { loading, items, q, setQ } = useCatalogController()
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
        <section className="py-10 min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex items-end justify-between gap-4 mb-8 animate-slide-in-up">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Catalog</h2>
                        <p className="text-gray-600">Browse our curated selection of {items.length} books</p>
                    </div>
                    <div className="relative w-full max-w-sm">
                        <input 
                            value={q} 
                            onChange={(e) => setQ(e.target.value)} 
                            placeholder="Search title or author" 
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 focus:shadow-lg"
                        />
                        <i className="fa-solid fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20 animate-fade-in">
                        <div className="text-center">
                            <div className="spinner mx-auto mb-4"></div>
                            <p className="text-gray-500 animate-pulse">Loading amazing books...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {items.map((b, index) => (
                            <div 
                                key={b.id} 
                                className="book-card p-4 stagger-item"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="book-cover h-48 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden group">
                                    <i className="fa-solid fa-book text-4xl text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    {b.badge && (
                                        <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                                            {b.badge}
                                        </span>
                                    )}
                                </div>
                                
                                <div className="book-card-content">
                                    <div className="space-y-2 flex-1">
                                        <h3 className="book-title line-clamp-2 hover:text-blue-600 transition-colors duration-300">
                                            {b.title}
                                        </h3>
                                        <p className="book-author line-clamp-1">{b.author}</p>
                                        
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="book-price">₹{b.price}</span>
                                                {b.listPrice && (
                                                    <span className="text-sm text-gray-500 line-through">₹{b.listPrice}</span>
                                                )}
                                            </div>
                                            {b.rating && (
                                                <div className="flex items-center gap-1">
                                                    <i className="fa-solid fa-star text-yellow-400 text-xs" />
                                                    <span className="text-xs text-gray-600">{b.rating}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="book-card-button">
                                        <button 
                                            onClick={() => handleAddToCart(b)} 
                                            disabled={addingItems.has(b.id)}
                                            className={`w-full py-2.5 rounded-xl font-medium transition-all duration-300 transform ${
                                                addingItems.has(b.id)
                                                    ? 'bg-green-500 text-white scale-95'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 hover:shadow-lg'
                                            } micro-bounce focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
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
                )}

                {!loading && items.length === 0 && (
                    <div className="text-center py-20 animate-fade-in">
                        <div className="text-6xl text-gray-300 mb-4">
                            <i className="fa-solid fa-book-open" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No books found</h3>
                        <p className="text-gray-500">Try adjusting your search terms</p>
                    </div>
                )}
            </div>
        </section>
    )
}