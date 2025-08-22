import React from 'react'
import { useCart } from '../store/cart'

export default function ProductCard({ product, type = 'book' }) {
  const addToCart = useCart((state) => state.addToCart)

  const handleAddToCart = () => {
    addToCart(product)
  }

  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN')}`
  }

  const getImageUrl = (product, type) => {
    // Use placeholder images based on product type and ID
    if (type === 'book') {
      const imageIndex = (product.id % 5) + 1
      return `/section/NewArrivals/${imageIndex}.jpeg`
    } else if (type === 'stationery') {
      const imageIndex = (product.id % 3) + 1
      return `/section/PromoBanners/${imageIndex}.jpeg`
    } else if (type === 'school') {
      const imageIndex = (product.id % 4) + 1
      return `/section/FeaturedCollections/${imageIndex}.jpeg`
    }
    return `/section/NewArrivals/1.jpeg`
  }

  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-gray-50">
        <img
          src={getImageUrl(product, type)}
          alt={product.title || product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-bold rounded-full ${
            product.badge === 'Bestseller' ? 'bg-yellow-400 text-yellow-900' :
            product.badge === 'New' ? 'bg-green-500 text-white' :
            product.badge === 'Sale' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100">
          <i className="fa-regular fa-heart text-sm" />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 transform translate-y-4 group-hover:translate-y-0">
            <i className="fa-regular fa-eye mr-2" />
            Quick View
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-red-500 font-medium uppercase tracking-wide mb-1">
          {product.category}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2 group-hover:text-red-600 transition-colors duration-200">
          {product.title || product.name}
        </h3>

        {/* Author/Brand */}
        {product.author && (
          <p className="text-sm text-gray-600 mb-2">by {product.author}</p>
        )}
        {product.brand && (
          <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
        )}

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`fa-solid fa-star text-xs ${
                    i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-800">
              {formatPrice(product.price)}
            </span>
            {product.listPrice && product.listPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.listPrice)}
              </span>
            )}
          </div>
          
          {/* Discount Badge */}
          {product.listPrice && product.listPrice > product.price && (
            <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-medium">
              {Math.round(((product.listPrice - product.price) / product.listPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <i className="fa-solid fa-cart-plus mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
