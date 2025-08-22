import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'

// Mock data for books
const generateMockBooks = () => {
  const categories = ['Fiction', 'Non-Fiction', 'Academic', 'Comics', 'Romance', 'Mystery', 'Science', 'History']
  const authors = ['J.K. Rowling', 'Stephen King', 'Agatha Christie', 'Dan Brown', 'Ruskin Bond', 'Chetan Bhagat', 'Amish Tripathi', 'Sudha Murthy']
  const books = []

  for (let i = 1; i <= 48; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const author = authors[Math.floor(Math.random() * authors.length)]
    const basePrice = Math.floor(Math.random() * 800) + 200
    const listPrice = basePrice + Math.floor(Math.random() * 200) + 50
    
    books.push({
      id: i,
      title: `Book Title ${i}`,
      author: author,
      price: basePrice,
      listPrice: listPrice,
      category: category.toLowerCase(),
      rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
      badge: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'Bestseller' : 'New') : null,
    })
  }
  
  return books
}

export default function BooksView() {
  const [books] = useState(generateMockBooks())
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSort, setSelectedSort] = useState('popular')
  const [priceRange, setPriceRange] = useState({ min: 200, max: 1000, current: 1000 })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const booksPerPage = 12

  const categories = ['fiction', 'non-fiction', 'academic', 'comics', 'romance', 'mystery', 'science', 'history']
  
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'title', label: 'Title A-Z' },
  ]

  useEffect(() => {
    let filtered = books.filter(book => {
      const categoryMatch = selectedCategory === '' || book.category === selectedCategory
      const priceMatch = book.price <= priceRange.current
      return categoryMatch && priceMatch
    })

    // Sort books
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'title':
          return a.title.localeCompare(b.title)
        case 'newest':
          return b.id - a.id
        default: // popular
          return b.rating * 0.7 + (b.listPrice - b.price) * 0.3 - (a.rating * 0.7 + (a.listPrice - a.price) * 0.3)
      }
    })

    setFilteredBooks(filtered)
    setCurrentPage(1)
  }, [books, selectedCategory, selectedSort, priceRange])

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage
  const indexOfFirstBook = indexOfLastBook - booksPerPage
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook)
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 flex items-center">
                  <i className="fa-solid fa-book mr-3 text-red-500" />
                  Books Collection
                </h1>
                <p className="text-gray-600 mt-1">
                  Discover amazing books from various genres and authors
                </p>
              </div>
              
              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
              >
                <i className="fa-solid fa-filter mr-2" />
                Filters
              </button>
            </div>
            
            {/* Results Count */}
            <div className="mt-4 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {indexOfFirstBook + 1}-{Math.min(indexOfLastBook, filteredBooks.length)} of {filteredBooks.length} books
              </p>
              
              {/* Quick Sort (Desktop) */}
              <div className="hidden md:flex items-center gap-2">
                <span className="text-gray-600">Sort by:</span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="border text-black border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-6">
            {/* Sidebar */}
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              sortOptions={sortOptions}
              selectedSort={selectedSort}
              onSortChange={setSelectedSort}
              priceRange={priceRange}
              onPriceRangeChange={(value) => setPriceRange(prev => ({ ...prev, current: value }))}
              isOpen={isFilterOpen}
              onClose={() => setIsFilterOpen(false)}
            />

            {/* Products Grid */}
            <div className="flex-1">
              {filteredBooks.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fa-solid fa-book-open text-6xl text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-500 mb-2">No books found</h3>
                  <p className="text-gray-400">Try adjusting your filters to see more results</p>
                </div>
              ) : (
                <>
                  {/* Books Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentBooks.map((book) => (
                      <ProductCard key={book.id} product={book} type="book" />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => paginate(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="px-3 py-2 text-gray-500 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <i className="fa-solid fa-chevron-left" />
                        </button>
                        
                        {[...Array(totalPages)].map((_, index) => {
                          const pageNumber = index + 1
                          if (
                            pageNumber === 1 ||
                            pageNumber === totalPages ||
                            (pageNumber >= currentPage - 2 && pageNumber <= currentPage + 2)
                          ) {
                            return (
                              <button
                                key={pageNumber}
                                onClick={() => paginate(pageNumber)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                                  currentPage === pageNumber
                                    ? 'bg-red-500 text-white'
                                    : 'text-gray-700 hover:bg-red-50 hover:text-red-500'
                                }`}
                              >
                                {pageNumber}
                              </button>
                            )
                          } else if (
                            pageNumber === currentPage - 3 ||
                            pageNumber === currentPage + 3
                          ) {
                            return <span key={pageNumber} className="px-2 text-gray-400">...</span>
                          }
                          return null
                        })}
                        
                        <button
                          onClick={() => paginate(currentPage + 1)}
                          disabled={currentPage === totalPages}
                          className="px-3 py-2 text-gray-500 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <i className="fa-solid fa-chevron-right" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
  )
}
