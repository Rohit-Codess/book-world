import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'
import FilterSidebar from '../components/FilterSidebar'

// Mock data for stationery items
const generateMockStationery = () => {
  const categories = ['writing', 'art', 'office', 'school']
  const brands = ['Parker', 'Pilot', 'Faber-Castell', 'Staedtler', 'Camlin', 'Reynolds', 'Cello', 'Apsara']
  const items = []

  const itemNames = {
    writing: ['Premium Pen Set', 'Fountain Pen', 'Ballpoint Pen', 'Gel Pen Set', 'Marker Set'],
    art: ['Watercolor Set', 'Sketch Pad', 'Colored Pencils', 'Paint Brushes', 'Canvas Board'],
    office: ['Notebook Set', 'File Organizer', 'Desk Organizer', 'Calculator', 'Paper Clips'],
    school: ['School Bag', 'Pencil Box', 'Ruler Set', 'Eraser Pack', 'Sharpener Set']
  }

  for (let i = 1; i <= 40; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const brand = brands[Math.floor(Math.random() * brands.length)]
    const basePrice = Math.floor(Math.random() * 500) + 50
    const listPrice = basePrice + Math.floor(Math.random() * 100) + 20
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
      badge: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'Best Seller' : 'New') : null,
    })
  }
  
  return items
}

export default function StationeryView() {
  const [stationery] = useState(generateMockStationery())
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedSort, setSelectedSort] = useState('popular')
  const [priceRange, setPriceRange] = useState({ min: 50, max: 650, current: 650 })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const categories = ['writing', 'art', 'office', 'school']
  
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' },
    { value: 'name', label: 'Name A-Z' },
  ]

  useEffect(() => {
    let filtered = stationery.filter(item => {
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
  }, [stationery, selectedCategory, selectedSort, priceRange])

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
                  <i className="fa-solid fa-pen mr-3 text-red-500" />
                  Stationery Collection
                </h1>
                <p className="text-gray-600 mt-1">
                  High-quality stationery for all your writing and creative needs
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
                  <i className="fa-solid fa-pen-nib text-6xl text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-500 mb-2">No stationery items found</h3>
                  <p className="text-gray-400">Try adjusting your filters to see more results</p>
                </div>
              ) : (
                <>
                  {/* Items Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {currentItems.map((item) => (
                      <ProductCard key={item.id} product={item} type="stationery" />
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
