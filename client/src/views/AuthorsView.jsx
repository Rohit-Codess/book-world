import React, { useState, useEffect } from 'react'

// Mock data for authors
const generateMockAuthors = () => {
  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Biography', 'History', 'Self-Help']
  const authors = []
  
  const authorNames = [
    'Amelia Richardson', 'James Patterson', 'Sarah Williams', 'David Thompson', 'Emily Chen',
    'Michael Rodriguez', 'Jessica Brown', 'Robert Johnson', 'Amanda Davis', 'Christopher Lee',
    'Sophie Miller', 'Daniel Wilson', 'Olivia Taylor', 'Matthew Anderson', 'Isabella Garcia',
    'William Martinez', 'Ava Thomas', 'Benjamin Jackson', 'Mia White', 'Alexander Harris',
    'Charlotte Martin', 'Jacob Clark', 'Abigail Lewis', 'Ethan Walker', 'Emma Hall'
  ]

  for (let i = 1; i <= 25; i++) {
    const genre = genres[Math.floor(Math.random() * genres.length)]
    const booksCount = Math.floor(Math.random() * 15) + 3
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1)
    
    authors.push({
      id: i,
      name: authorNames[i - 1],
      genre: genre,
      booksCount: booksCount,
      rating: parseFloat(rating),
      bio: `Award-winning ${genre.toLowerCase()} author with ${booksCount} published books. Known for compelling narratives and unique storytelling style.`,
      imageUrl: `/section/AuthorsPublishers/authors/${((i - 1) % 6) + 1}.jpeg`,
      isPopular: Math.random() > 0.7,
      totalSales: Math.floor(Math.random() * 500000) + 10000
    })
  }
  
  return authors
}

export default function AuthorsView() {
  const [authors] = useState(generateMockAuthors())
  const [filteredAuthors, setFilteredAuthors] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedSort, setSelectedSort] = useState('popular')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const authorsPerPage = 12

  const genres = ['Fiction', 'Non-Fiction', 'Mystery', 'Romance', 'Science Fiction', 'Biography', 'History', 'Self-Help']
  
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'books', label: 'Most Books' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'sales', label: 'Best Selling' },
  ]

  useEffect(() => {
    let filtered = authors.filter(author => {
      const genreMatch = selectedGenre === '' || author.genre === selectedGenre
      const searchMatch = searchTerm === '' || 
        author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.genre.toLowerCase().includes(searchTerm.toLowerCase())
      return genreMatch && searchMatch
    })

    // Sort authors
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'books':
          return b.booksCount - a.booksCount
        case 'rating':
          return b.rating - a.rating
        case 'sales':
          return b.totalSales - a.totalSales
        default: // popular
          return (b.rating * 0.4 + b.booksCount * 0.3 + b.totalSales / 10000 * 0.3) - 
                 (a.rating * 0.4 + a.booksCount * 0.3 + a.totalSales / 10000 * 0.3)
      }
    })

    setFilteredAuthors(filtered)
    setCurrentPage(1)
  }, [authors, selectedGenre, selectedSort, searchTerm])

  // Pagination
  const indexOfLastAuthor = currentPage * authorsPerPage
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage
  const currentAuthors = filteredAuthors.slice(indexOfFirstAuthor, indexOfLastAuthor)
  const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAuthorClick = (author) => {
    // In a real app, this would navigate to author detail page
    alert(`Viewing books by ${author.name}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center mb-4">
                <i className="fa-solid fa-user-edit mr-3 text-red-500" />
                Featured Authors
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Discover amazing authors from various genres. Click on any author to explore their collection of books.
              </p>
            </div>
            
            {/* Search and Filters */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search authors by name or genre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full text-black pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">All Genres</option>
                  {genres.map((genre) => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>

                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Showing {indexOfFirstAuthor + 1}-{Math.min(indexOfLastAuthor, filteredAuthors.length)} of {filteredAuthors.length} authors
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {filteredAuthors.length === 0 ? (
            <div className="text-center py-12">
              <i className="fa-solid fa-user-slash text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">No authors found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              {/* Authors Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {currentAuthors.map((author) => (
                  <div
                    key={author.id}
                    onClick={() => handleAuthorClick(author)}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200 transform hover:-translate-y-1 cursor-pointer group"
                  >
                    {/* Author Image */}
                    <div className="relative">
                      <img
                        src={author.imageUrl}
                        alt={author.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      
                      {/* Popular Badge */}
                      {author.isPopular && (
                        <span className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded-full">
                          Popular
                        </span>
                      )}

                      {/* Genre Badge */}
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 text-xs font-medium rounded-full">
                        {author.genre}
                      </span>
                    </div>

                    {/* Author Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">
                        {author.name}
                      </h3>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {author.bio}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <i className="fa-solid fa-star" />
                          <span className="text-gray-700 ml-1">{author.rating}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-gray-600">
                          <i className="fa-solid fa-book" />
                          <span>{author.booksCount} books</span>
                        </div>
                      </div>

                      {/* Sales Info */}
                      <div className="mt-2 text-xs text-gray-500">
                        {author.totalSales.toLocaleString('en-IN')}+ copies sold
                      </div>

                      {/* View Books Button */}
                      <button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 transform group-hover:scale-[1.02]">
                        <i className="fa-solid fa-eye mr-2" />
                        View Books
                      </button>
                    </div>
                  </div>
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
  )
}
