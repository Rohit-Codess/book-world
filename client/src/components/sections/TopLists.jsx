import React, { useState } from 'react'
import { useCart } from '../../store/cart'

export default function TopLists() {
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

    const topFiction = [
        { 
            id: 'top-fic-1',
            rank: 1, 
            title: 'The Silent Patient', 
            author: 'Alex Michaelides', 
            price: 399, 
            rating: 4.8,
            image: '/src/assets/section/TopLists/topFiction/1.png'
        },
        { 
            id: 'top-fic-2',
            rank: 2, 
            title: 'Where the Crawdads Sing', 
            author: 'Delia Owens', 
            price: 449, 
            rating: 4.7,
            image: '/src/assets/section/TopLists/topFiction/2.png'
        },
        { 
            id: 'top-fic-3',
            rank: 3, 
            title: 'The Thursday Murder Club', 
            author: 'Richard Osman', 
            price: 379, 
            rating: 4.6,
            image: '/src/assets/section/TopLists/topFiction/3.png'
        },
        { 
            id: 'top-fic-4',
            rank: 4, 
            title: 'The Midnight Library', 
            author: 'Matt Haig', 
            price: 419, 
            rating: 4.5,
            image: '/src/assets/section/TopLists/topFiction/4.png'
        },
        { 
            id: 'top-fic-5',
            rank: 5, 
            title: 'Educated', 
            author: 'Tara Westover', 
            price: 459, 
            rating: 4.4,
            image: '/src/assets/section/TopLists/topFiction/5.png'
        },
    ]
    
    const young = [
        { 
            id: 'young-1',
            title: 'The Fault in Our Stars', 
            author: 'John Green', 
            price: 329,
            image: '/src/assets/section/TopLists/young/1.png'
        },
        { 
            id: 'young-2',
            title: 'The Hunger Games', 
            author: 'Suzanne Collins', 
            price: 349,
            image: '/src/assets/section/TopLists/young/2.png'
        },
        { 
            id: 'young-3',
            title: 'Divergent', 
            author: 'Veronica Roth', 
            price: 299,
            image: '/src/assets/section/TopLists/young/3.png'
        },
        { 
            id: 'young-4',
            title: 'Eleanor & Park', 
            author: 'Rainbow Rowell', 
            price: 309,
            image: '/src/assets/section/TopLists/young/4.png'
        },
        { 
            id: 'young-5',
            title: 'The Perks of Being a Wallflower', 
            author: 'Stephen Chbosky', 
            price: 319,
            image: '/src/assets/section/TopLists/young/5.png'
        },
    ]
    
    const kids = [
        { 
            id: 'kids-1',
            title: 'Harry Potter Series', 
            author: 'J.K. Rowling', 
            price: 1999, 
            tag: 'Complete Set',
            image: '/src/assets/section/TopLists/kids/1.png'
        },
        { 
            id: 'kids-2',
            title: 'The Cat in the Hat', 
            author: 'Dr. Seuss', 
            price: 199,
            image: '/src/assets/section/TopLists/kids/2.png'
        },
        { 
            id: 'kids-3',
            title: 'Where the Wild Things Are', 
            author: 'Maurice Sendak', 
            price: 249,
            image: '/src/assets/section/TopLists/kids/3.png'
        },
        { 
            id: 'kids-4',
            title: 'Goodnight Moon', 
            author: 'Margaret Wise Brown', 
            price: 179,
            image: '/src/assets/section/TopLists/kids/4.png'
        },
        { 
            id: 'kids-5',
            title: 'The Giving Tree', 
            author: 'Shel Silverstein', 
            price: 229,
            image: '/src/assets/section/TopLists/kids/5.png'
        },
    ]

    const BookCard = ({ book, showRank = false, borderColor = '' }) => (
        <div className={`book-card p-4 bg-white ${borderColor} relative overflow-hidden stagger-item`}>
            <div className="book-cover h-52 rounded-xl mb-4 overflow-hidden relative group bg-white shadow-sm">
                <img 
                    src={book.image} 
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                    }}
                />
                <div className="hidden w-full h-full items-center justify-center bg-gray-100">
                    <i className="fa-solid fa-book text-4xl text-gray-400" />
                </div>
                {showRank && (
                    <span className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded-full text-xs font-bold z-10">
                        #{book.rank}
                    </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            
            <div className="book-card-content">
                <div className="space-y-2 flex-1">
                    <h3 className="book-title line-clamp-2 hover:text-blue-600 transition-colors duration-300">
                        {book.title}
                    </h3>
                    <p className="book-author line-clamp-1">{book.author}</p>
                    
                    {book.rating && (
                        <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <i 
                                    key={i}
                                    className={`fa-solid fa-star text-xs ${
                                        i < Math.floor(book.rating) ? 'text-yellow-400' : 'text-gray-300'
                                    }`} 
                                />
                            ))}
                            <span className="text-xs text-gray-600 ml-1">({book.rating})</span>
                        </div>
                    )}
                    
                    <div className="flex items-center justify-between mb-3">
                        <div className="book-price">₹{book.price}</div>
                        {book.tag && (
                            <span className="book-tag text-rose-600 bg-rose-100">
                                {book.tag}
                            </span>
                        )}
                    </div>
                </div>
                
                <div className="book-card-button">
                    <button 
                        onClick={() => handleAddToCart(book)} 
                        disabled={addingItems.has(book.id)}
                        className={`w-full py-2.5 rounded-xl font-medium transition-all duration-300 transform ${
                            addingItems.has(book.id)
                                ? 'bg-green-500 text-white scale-95'
                                : 'bg-red-600 text-white hover:bg-red-700 hover:scale-105 hover:shadow-lg'
                        } micro-bounce focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
                    >
                        {addingItems.has(book.id) ? (
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
    )

    return (
        <>
            <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex items-center justify-between mb-10 animate-slide-in-up">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-black bg-clip-text text-transparent">
                                Top 20 Fiction
                            </h2>
                            <p className="text-gray-600">Most loved fiction books by our readers</p>
                        </div>
                        <a className="btn-view-all hover:gap-3 transition-all duration-300" href="#">
                            View All 
                            <i className="fa-solid fa-arrow-right" />
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {topFiction.map((book, index) => (
                            <div key={book.id} style={{ animationDelay: `${index * 0.1}s` }}>
                                <BookCard book={book} showRank={true} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex items-center justify-between mb-10 animate-slide-in-up">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-black bg-clip-text text-transparent">
                                Top 10 Young Adult
                            </h2>
                            <p className="text-gray-600">Coming-of-age stories that resonate with teens</p>
                        </div>
                        <a className="btn-view-all hover:gap-3 transition-all duration-300" href="#">
                            View All 
                            <i className="fa-solid fa-arrow-right" />
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {young.map((book, index) => (
                            <div key={book.id} style={{ animationDelay: `${index * 0.1}s` }}>
                                <BookCard book={book} borderColor="border-2 border-purple-200" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-gradient-to-br from-pink-50 to-orange-50">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex items-center justify-between mb-10 animate-slide-in-up">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-black bg-clip-text text-transparent">
                                Top 20 Children's Books
                            </h2>
                            <p className="text-gray-600">Magical stories that spark imagination in young minds</p>
                        </div>
                        <a className="btn-view-all hover:gap-3 transition-all duration-300" href="#">
                            View All 
                            <i className="fa-solid fa-arrow-right" />
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                        {kids.map((book, index) => (
                            <div key={book.id} style={{ animationDelay: `${index * 0.1}s` }}>
                                <BookCard book={book} borderColor="border-2 border-pink-200" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}