import React from 'react'

export default function FilterSidebar({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  sortOptions, 
  selectedSort, 
  onSortChange,
  priceRange,
  onPriceRangeChange,
  isOpen,
  onClose
}) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky lg:top-24 left-0 h-full lg:h-auto w-80 lg:w-64 bg-white z-50 lg:z-auto
        transform transition-transform duration-300 lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        border-r lg:border-r-0 lg:border border-gray-200 rounded-lg lg:rounded-lg
        overflow-y-auto
      `}>
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-red-500 text-white">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={onClose} className="text-white hover:text-red-200">
            <i className="fa-solid fa-times text-xl" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          {/* Categories Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
              <i className="fa-solid fa-filter mr-2 text-red-500" />
              Categories
            </h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={selectedCategory === ''}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="mr-3 text-red-500 focus:ring-red-500"
                />
                <span className="text-gray-700">All Categories</span>
              </label>
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="mr-3 text-red-500 focus:ring-red-500"
                  />
                  <span className="text-gray-700 capitalize">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          {priceRange && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <i className="fa-solid fa-rupee-sign mr-2 text-red-500" />
                Price Range
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>₹{priceRange.min.toLocaleString('en-IN')}</span>
                  <span>₹{priceRange.max.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  value={priceRange.current}
                  onChange={(e) => onPriceRangeChange(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center">
                  <span className="text-sm font-medium text-red-600">
                    Up to ₹{priceRange.current.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Sort Options */}
          <div>
            <h3 className="text-lg font-semibold text-black mb-3 flex items-center">
              <i className="fa-solid fa-sort mr-2 text-red-500" />
              Sort By
            </h3>
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full p-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={() => {
              onCategoryChange('')
              onSortChange('popular')
              if (priceRange) {
                onPriceRangeChange(priceRange.max)
              }
            }}
            className="w-full bg-gray-100 hover:bg-gray-200 text-black py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Clear All Filters
          </button>
        </div>
      </div>

    </>
  )
}
