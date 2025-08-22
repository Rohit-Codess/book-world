import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'

// Mock data for school items
const generateMockSchoolItems = () => {
  const categories = ['bags', 'uniforms', 'textbooks', 'accessories']
  const brands = ['VIP', 'American Tourister', 'Wildcraft', 'Skybags', 'Fastrack', 'Puma', 'Adidas', 'Nike']
  const items = []

  const itemNames = {
    bags: ['School Backpack', 'Travel Bag', 'Laptop Bag', 'Sports Bag', 'Trolley Bag'],
    uniforms: ['School Shirt', 'School Pants', 'School Dress', 'Sports Uniform', 'Winter Sweater'],
    textbooks: ['Mathematics Book', 'Science Textbook', 'English Literature', 'History Book', 'Geography Atlas'],
    accessories: ['Water Bottle', 'Lunch Box', 'Pencil Case', 'School Shoes', 'ID Card Holder']
  }

  for (let i = 1; i <= 36; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const brand = brands[Math.floor(Math.random() * brands.length)]
    const basePrice = Math.floor(Math.random() * 1500) + 100
    const listPrice = basePrice + Math.floor(Math.random() * 300) + 50
    const names = itemNames[category]
    const name = names[Math.floor(Math.random() * names.length)]
    
    items.push({
      id: i,
      name: `${name} ${i}`,
      brand: brand,
      price: basePrice,
      listPrice: listPrice,
      category: category,
      rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
      badge: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'Back to School' : 'New') : null,
    })
  }
  
  return items
}

export default function SchoolView() {
  const [schoolItems] = useState(generateMockSchoolItems())
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSort, setSelectedSort] = useState('popular')
  const [priceRange, setPriceRange] = useState({ min: 100, max: 2000, current: 2000 })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const categories = ['bags', 'uniforms', 'textbooks', 'accessories']
  
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'name', label: 'Name A-Z' },
  ]

  useEffect(() => {
    let filtered = schoolItems.filter(item => {
      const categoryMatch = selectedCategory === '' || item.category === selectedCategory
      const priceMatch = item.price <= priceRange.current
      return categoryMatch && priceMatch
    })

    // Sort items
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        case 'name':
          return a.name.localeCompare(b.name)
        case 'newest':
          return b.id - a.id
        default: // popular
          return b.rating * 0.7 + (b.listPrice - b.price) * 0.3 - (a.rating * 0.7 + (a.listPrice - a.price) * 0.3)
      }
    })

    setFilteredItems(filtered)
    setCurrentPage(1)
  }, [schoolItems, selectedCategory, selectedSort, priceRange])

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)

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
                  <i className="fa-solid fa-graduation-cap mr-3 text-red-500" />
                  School Essentials
                </h1>
                <p className="text-gray-600 mt-1">
                  Everything you need for a successful school year
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
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredItems.length)} of {filteredItems.length} items
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

            {/* Featured Banner */}
            <div className="mt-6 bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold mb-2">🎒 Back to School Collection</h2>
                  <p className="text-red-100">Get everything ready for the new academic year</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">Up to 40% OFF</div>
                  <div className="text-red-100 text-sm">on school essentials</div>
                </div>
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
              {filteredItems.length === 0 ? (
                <div className="text-center py-12">
                  <i className="fa-solid fa-backpack text-6xl text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-500 mb-2">No school items found</h3>
                  <p className="text-gray-400">Try adjusting your filters to see more results</p>
                </div>
              ) : (
                <>
                  {/* Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentItems.map((item) => (
                      <ProductCard key={item.id} product={item} type="school" />
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
