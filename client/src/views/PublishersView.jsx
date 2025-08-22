import React, { useState, useEffect } from 'react'

// Mock data for publishers
const generateMockPublishers = () => {
  const publishers = []
  
  const publisherData = [
    { name: 'Penguin Random House', specialty: 'Fiction & Literature', founded: 1927 },
    { name: 'HarperCollins Publishers', specialty: 'General Publishing', founded: 1817 },
    { name: 'Macmillan Publishers', specialty: 'Academic & Trade', founded: 1843 },
    { name: 'Simon & Schuster', specialty: 'Popular Fiction', founded: 1924 },
    { name: 'Hachette Book Group', specialty: 'Trade Publishing', founded: 1826 },
    { name: 'Scholastic Corporation', specialty: 'Educational', founded: 1920 },
    { name: 'Wiley Publishing', specialty: 'Professional & Academic', founded: 1807 },
    { name: 'Oxford University Press', specialty: 'Academic & Reference', founded: 1586 },
    { name: 'Cambridge University Press', specialty: 'Academic Research', founded: 1534 },
    { name: 'McGraw-Hill Education', specialty: 'Educational', founded: 1888 },
    { name: 'Pearson Education', specialty: 'Educational Technology', founded: 1844 },
    { name: 'Bloomsbury Publishing', specialty: 'Literary Fiction', founded: 1986 },
    { name: 'Faber & Faber', specialty: 'Poetry & Drama', founded: 1929 },
    { name: 'Vintage Books', specialty: 'Classic Literature', founded: 1954 },
    { name: 'Tor Books', specialty: 'Science Fiction', founded: 1980 },
    { name: 'Romance Publishers', specialty: 'Romance Novels', founded: 1995 },
    { name: 'Mystery House Books', specialty: 'Mystery & Thriller', founded: 1988 },
    { name: 'Tech Publications', specialty: 'Technology', founded: 2001 },
    { name: 'Health & Wellness Press', specialty: 'Self-Help', founded: 1992 },
    { name: 'Kids World Publishing', specialty: 'Children\'s Books', founded: 1985 }
  ]

  for (let i = 1; i <= 20; i++) {
    const pub = publisherData[i - 1]
    const booksCount = Math.floor(Math.random() * 500) + 50
    const authorsCount = Math.floor(Math.random() * 100) + 10
    const rating = (Math.random() * 1.5 + 3.5).toFixed(1)
    
    publishers.push({
      id: i,
      name: pub.name,
      specialty: pub.specialty,
      founded: pub.founded,
      booksCount: booksCount,
      authorsCount: authorsCount,
      rating: parseFloat(rating),
      description: `Leading publisher specializing in ${pub.specialty.toLowerCase()}. Established in ${pub.founded}, we have been bringing quality content to readers worldwide.`,
      imageUrl: `/section/AuthorsPublishers/publishers/${((i - 1) % 6) + 1}.jpeg`,
      isPremium: Math.random() > 0.7,
      totalSales: Math.floor(Math.random() * 2000000) + 100000,
      location: ['New York', 'London', 'Mumbai', 'Toronto', 'Sydney'][Math.floor(Math.random() * 5)]
    })
  }
  
  return publishers
}

export default function PublishersView() {
  const [publishers] = useState(generateMockPublishers())
  const [filteredPublishers, setFilteredPublishers] = useState([])
  const [selectedSpecialty, setSelectedSpecialty] = useState('')
  const [selectedSort, setSelectedSort] = useState('popular')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const publishersPerPage = 12

  const specialties = [
    'Fiction & Literature', 'General Publishing', 'Academic & Trade', 'Popular Fiction',
    'Trade Publishing', 'Educational', 'Professional & Academic', 'Academic & Reference',
    'Academic Research', 'Educational Technology', 'Literary Fiction', 'Poetry & Drama',
    'Classic Literature', 'Science Fiction', 'Romance Novels', 'Mystery & Thriller',
    'Technology', 'Self-Help', 'Children\'s Books'
  ]
  
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'books', label: 'Most Books' },
    { value: 'authors', label: 'Most Authors' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'founded', label: 'Oldest First' },
  ]

  useEffect(() => {
    let filtered = publishers.filter(publisher => {
      const specialtyMatch = selectedSpecialty === '' || publisher.specialty === selectedSpecialty
      const searchMatch = searchTerm === '' || 
        publisher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publisher.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        publisher.location.toLowerCase().includes(searchTerm.toLowerCase())
      return specialtyMatch && searchMatch
    })

    // Sort publishers
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'books':
          return b.booksCount - a.booksCount
        case 'authors':
          return b.authorsCount - a.authorsCount
        case 'rating':
          return b.rating - a.rating
        case 'founded':
          return a.founded - b.founded
        default: // popular
          return (b.rating * 0.3 + b.booksCount * 0.4 + b.authorsCount * 0.3) - 
                 (a.rating * 0.3 + a.booksCount * 0.4 + a.authorsCount * 0.3)
      }
    })

    setFilteredPublishers(filtered)
    setCurrentPage(1)
  }, [publishers, selectedSpecialty, selectedSort, searchTerm])

  // Pagination
  const indexOfLastPublisher = currentPage * publishersPerPage
  const indexOfFirstPublisher = indexOfLastPublisher - publishersPerPage
  const currentPublishers = filteredPublishers.slice(indexOfFirstPublisher, indexOfLastPublisher)
  const totalPages = Math.ceil(filteredPublishers.length / publishersPerPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePublisherClick = (publisher) => {
    // In a real app, this would navigate to publisher detail page
    alert(`Viewing books from ${publisher.name}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center mb-4">
                <i className="fa-solid fa-building mr-3 text-red-500" />
                Publishers Directory
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore books from renowned publishers worldwide. Each publisher brings unique expertise in their specialty areas.
              </p>
            </div>
            
            {/* Search and Filters */}
            <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search publishers by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <i className="fa-solid fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>

              {/* Filters */}
              <div className="flex gap-4">
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="border text-black border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                >
                  <option value="">All Specialties</option>
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
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
                Showing {indexOfFirstPublisher + 1}-{Math.min(indexOfLastPublisher, filteredPublishers.length)} of {filteredPublishers.length} publishers
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {filteredPublishers.length === 0 ? (
            <div className="text-center py-12">
              <i className="fa-solid fa-building-slash text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-500 mb-2">No publishers found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              {/* Publishers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentPublishers.map((publisher) => (
                  <div
                    key={publisher.id}
                    onClick={() => handlePublisherClick(publisher)}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200 transform hover:-translate-y-1 cursor-pointer group"
                  >
                    {/* Publisher Image */}
                    <div className="relative">
                      <img
                        src={publisher.imageUrl}
                        alt={publisher.name}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      
                      {/* Premium Badge */}
                      {publisher.isPremium && (
                        <span className="absolute top-3 left-3 bg-yellow-500 text-yellow-900 px-2 py-1 text-xs font-bold rounded-full">
                          Premium
                        </span>
                      )}

                      {/* Location Badge */}
                      <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 text-xs font-medium rounded-full">
                        {publisher.location}
                      </span>
                    </div>

                    {/* Publisher Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-red-600 transition-colors">
                        {publisher.name}
                      </h3>
                      
                      <p className="text-sm text-red-600 font-medium mb-2">
                        {publisher.specialty}
                      </p>
                      
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {publisher.description}
                      </p>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="text-center bg-gray-50 rounded-lg p-2">
                          <div className="text-lg font-bold text-gray-800">{publisher.booksCount}</div>
                          <div className="text-xs text-gray-600">Books</div>
                        </div>
                        <div className="text-center bg-gray-50 rounded-lg p-2">
                          <div className="text-lg font-bold text-gray-800">{publisher.authorsCount}</div>
                          <div className="text-xs text-gray-600">Authors</div>
                        </div>
                      </div>

                      {/* Rating and Founded */}
                      <div className="flex items-center justify-between text-sm mb-3">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <i className="fa-solid fa-star" />
                          <span className="text-gray-700 ml-1">{publisher.rating}</span>
                        </div>
                        
                        <div className="text-gray-600">
                          Est. {publisher.founded}
                        </div>
                      </div>

                      {/* Sales Info */}
                      <div className="text-xs text-gray-500 mb-3">
                        {publisher.totalSales.toLocaleString('en-IN')}+ copies sold
                      </div>

                      {/* View Books Button */}
                      <button className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 transform group-hover:scale-[1.02]">
                        <i className="fa-solid fa-eye mr-2" />
                        View Catalog
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
