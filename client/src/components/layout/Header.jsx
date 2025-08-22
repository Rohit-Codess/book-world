import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../store/cart'


export default function Header() {
    const cartCount = useCart((s) => s.count())
    const [isScrolled, setIsScrolled] = useState(false)
    const [searchFocused, setSearchFocused] = useState(false)
    const [activeNav, setActiveNav] = useState('Home') // Track active navigation
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        let ticking = false

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY
                    
                    // Set background blur based on scroll position
                    setIsScrolled(currentScrollY > 100)
                    
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.mobile-sidebar')) {
                setIsMobileMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [isMobileMenuOpen])

    // Lock body scroll when sidebar is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        
        // Cleanup function to ensure scroll is restored
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    // Navigation items with their corresponding sections
    const navItems = [
        { name: 'Home', href: '/', type: 'link' },
        { name: 'Books', href: '/books', type: 'link' },
        { name: 'Stationery', href: '/stationery', type: 'link' },
        { name: 'School', href: '/school', type: 'link' },
        { name: 'Authors', href: '/authors', type: 'link' },
        { name: 'Publishers', href: '/publishers', type: 'link' },
        { name: 'New Arrivals', href: '/new-arrivals', type: 'anchor' }
    ]

    return (
        <header className={`sticky top-0 z-100 transition-all duration-1000 ${
            isScrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-lg' 
                : 'bg-white/90 backdrop-blur shadow'
        }`}>
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200/70">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group animate-slide-in-left">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-2 rounded-lg group-hover:scale-110 transition-transform duration-300 shadow-lg">
                            <i className="fa-solid fa-book text-xl" />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                                Book World
                            </h1>
                            <p className="text-xs text-gray-500 -mt-1">Your Literary Universe</p>
                        </div>
                    </Link>

                    {/* Search */}
                    <div className="hidden md:block flex-1 max-w-xl mx-8 animate-fade-in">
                        <div className={`relative transition-all duration-300 ${
                            searchFocused ? 'scale-105' : 'scale-100'
                        }`}>
                        <input 
                            type="text" 
                            placeholder="Search books, authors, publishers..." 
                            className="w-full text-black px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 focus:shadow-lg"
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                            <button className="absolute right-1 top-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition-all duration-300 hover:scale-105 shadow-md">
                                <i className="fa-solid fa-search" />
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 animate-slide-in-up">
                        {/* Mobile Menu Button */}
                        <button 
                            className="lg:hidden text-gray-700 hover:text-red-500 p-2 transition-all duration-300 hover:scale-105"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`} />
                        </button>

                        <button className="text-gray-700 hover:text-red-500 hidden sm:inline-flex items-center gap-1 transition-all duration-300 hover:scale-105 micro-bounce">
                            <i className="fa-regular fa-heart" /> 
                            <span className="hidden md:inline">Wishlist</span>
                        </button>
                        
                        <Link 
                            to="/" 
                            className="text-gray-700 hover:text-red-500 hidden sm:inline-flex transition-all duration-300 hover:scale-105 micro-bounce"
                        >
                            Catalog
                        </Link>
                        
                        <button className="relative text-gray-700 hover:text-red-500 inline-flex items-center gap-1 transition-all duration-300 hover:scale-105 micro-bounce">
                            <i className="fa-solid fa-cart-shopping" />
                            <span className="hidden md:inline">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce shadow-lg">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        
                        <Link 
                            to="/login" 
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-md"
                        >
                            <i className="fa-regular fa-user mr-2" />
                            <span className="hidden sm:inline">Login</span>
                        </Link>
                    </div>
                </div>

                {/* Desktop Nav - Always visible */}
                <nav className="hidden lg:flex items-center justify-between text-sm transition-all duration-300 ease-in-out">
                    <div className="py-3 w-full flex items-center justify-between">
                        <div className="flex flex-wrap gap-x-3 gap-y-2">
                            {navItems.map((item) => {
                                const isActive = activeNav === item.name
                                const baseClasses = "px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 relative"
                                const activeClasses = isActive 
                                    ? "bg-red-500 text-white shadow-md" 
                                    : "text-gray-700 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200"
                                
                                if (item.type === 'link') {
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={`${baseClasses} ${activeClasses}`}
                                            onClick={() => setActiveNav(item.name)}
                                        >
                                            {item.name}
                                            {isActive && (
                                                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-500 rounded-full"></span>
                                            )}
                                        </Link>
                                    )
                                } else {
                                    return (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={`${baseClasses} ${activeClasses}`}
                                            onClick={() => setActiveNav(item.name)}
                                        >
                                            {item.name}
                                            {item.name === 'New Arrivals' && !isActive && (
                                                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold text-[10px]">
                                                    New
                                                </span>
                                            )}
                                            {isActive && (
                                                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full"></span>
                                            )}
                                        </Link>
                                    )
                                }
                            })}
                        </div>
                        <div className="text-red-500 font-medium bg-red-50 px-4 py-2 rounded-full border border-red-200 shadow-sm">
                            <i className="fa-solid fa-truck mr-2" />
                            Free Shipping on orders above ₹499
                        </div>
                    </div>
                </nav>
            </div>

            {/* Mobile Sidebar */}
            <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
                isMobileMenuOpen ? 'visible' : 'invisible'
            }`}>
                {/* Backdrop - Solid overlay to completely hide background content */}
                <div 
                    className={`absolute inset-0 bg-black transition-all duration-300 ${
                        isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
                
                {/* Sidebar */}
                <div className={`mobile-sidebar absolute left-0 top-0 h-full w-80 bg-white shadow-2xl transform transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-95'
                } border-r border-gray-300 z-10`}>
                    {/* Sidebar Header with Red Background */}
                    <div className="flex items-center justify-between p-4 bg-red-500 text-white">
                        <div className="flex items-center gap-3">
                            <div className="bg-white text-red-500 p-2 rounded-lg shadow-lg">
                                <i className="fa-solid fa-book text-lg" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-black">Book World</h2>
                                <p className="text-xs text-black">Your Literary Universe</p>
                            </div>
                        </div>
                        <button 
                            className="text-white hover:text-red-200 p-2 transition-colors duration-300 hover:bg-red-600 rounded-lg"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <i className="fa-solid fa-times text-xl" />
                        </button>
                    </div>

                    {/* Mobile Search */}
                    <div className="p-4 border-b border-gray-200">
                        <div className="relative">
                            <input 
                                type="text" 
                                placeholder="Search books..." 
                                className="w-full text-black px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300"
                            />
                            <button className="absolute right-1 top-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md transition-all duration-300">
                                <i className="fa-solid fa-search" />
                            </button>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="p-4 space-y-2">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">Navigation</h3>
                        {navItems.map((item) => {
                            const isActive = activeNav === item.name
                            const baseClasses = "flex items-center justify-between w-full px-4 py-3 rounded-lg font-medium transition-all duration-300 text-left"
                            const activeClasses = isActive 
                                ? "bg-red-500 text-white shadow-lg border-l-4 border-red-600" 
                                : "text-gray-700 hover:text-red-500 hover:bg-red-50 border border-transparent hover:border-red-200"
                            
                            if (item.type === 'link') {
                                return (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={`${baseClasses} ${activeClasses} ${isActive ? 'sidebar-nav-active' : 'sidebar-nav-item'}`}
                                        onClick={() => {
                                            setActiveNav(item.name)
                                            setIsMobileMenuOpen(false)
                                        }}
                                    >
                                        <span className="flex items-center gap-3">
                                            <i className={`fa-solid ${
                                                item.name === 'Home' ? 'fa-home' :
                                                item.name === 'Books' ? 'fa-book' :
                                                item.name === 'Stationery' ? 'fa-pen' :
                                                item.name === 'School' ? 'fa-graduation-cap' :
                                                item.name === 'Authors' ? 'fa-user-edit' :
                                                item.name === 'Publishers' ? 'fa-building' :
                                                'fa-star'
                                            } w-5`} />
                                            {item.name}
                                        </span>
                                        {isActive && <i className="fa-solid fa-chevron-right text-white" />}
                                    </Link>
                                )
                            } else {
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={`${baseClasses} ${activeClasses} ${isActive ? 'sidebar-nav-active' : 'sidebar-nav-item'}`}
                                        onClick={() => {
                                            setActiveNav(item.name)
                                            setIsMobileMenuOpen(false)
                                        }}
                                    >
                                        <span className="flex items-center gap-3">
                                            <i className="fa-solid fa-star w-5" />
                                            {item.name}
                                            {item.name === 'New Arrivals' && !isActive && (
                                                <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold ml-2">
                                                    New
                                                </span>
                                            )}
                                            {item.name === 'New Arrivals' && isActive && (
                                                <span className="bg-white text-red-500 text-xs px-2 py-0.5 rounded-full font-bold ml-2">
                                                    New
                                                </span>
                                            )}
                                        </span>
                                        {isActive && <i className="fa-solid fa-chevron-right text-white" />}
                                    </a>
                                )
                            }
                        })}
                    </div>

                    {/* Quick Actions */}
                    <div className="p-4 border-t border-gray-200 space-y-2">
                        <button className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300">
                            <i className="fa-regular fa-heart w-5" />
                            Wishlist
                        </button>
                        <Link 
                            to="/catalog" 
                            className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <i className="fa-solid fa-list w-5" />
                            Catalog
                        </Link>
                        <button className="flex items-center justify-between w-full px-4 py-3 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-300">
                            <span className="flex items-center gap-3">
                                <i className="fa-solid fa-cart-shopping w-5" />
                                Cart
                            </span>
                            {cartCount > 0 && (
                                <span className="bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Login Button */}
                    <div className="p-4 border-t border-gray-200">
                        <Link 
                            to="/login" 
                            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <i className="fa-regular fa-user" />
                            Login / Sign Up
                        </Link>
                    </div>

                    {/* Shipping Info */}
                    <div className="p-4 bg-red-50 text-center">
                        <div className="text-red-500 font-medium text-sm">
                            <i className="fa-solid fa-truck mr-2" />
                            Free Shipping on orders above ₹499
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}