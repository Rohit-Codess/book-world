import React from 'react'

export default function Footer() {
    const currentYear = new Date().getFullYear()
    
    return (
        <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-16 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full" />
                <div className="absolute bottom-20 right-20 w-16 h-16 border border-white transform rotate-45" />
                <div className="absolute top-1/2 left-1/4 w-12 h-12 border border-white rounded-full" />
                <div className="absolute bottom-10 left-1/3 w-8 h-8 border border-white transform rotate-45" />
            </div>
            
            <div className="mx-auto max-w-7xl px-4 py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Section */}
                    <div className="lg:col-span-1 animate-slide-in-left">
                        <div className="flex items-center gap-3 mb-4 group">
                            <div className="gradient-bg text-white p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 glow">
                                <i className="fa-solid fa-book text-xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Book World</h3>
                                <p className="text-sm text-gray-300">Your Literary Universe</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            Discover, explore, and immerse yourself in the world of books. 
                            Your journey to knowledge starts here.
                        </p>
                        
                        {/* Social Media Links */}
                        <div className="flex gap-3">
                            {['facebook', 'twitter', 'instagram', 'linkedin'].map((social, index) => (
                                <a 
                                    key={social}
                                    href="#" 
                                    className={`w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 micro-bounce stagger-item`}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <i className={`fa-brands fa-${social} text-sm`} />
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    {/* Quick Links */}
                    <div className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
                        <h4 className="font-semibold mb-4 text-lg border-b border-gray-700 pb-2">Quick Links</h4>
                        <ul className="space-y-3 text-gray-300">
                            {['About Us', 'Contact Us', 'Careers', 'Blog', 'Sitemap'].map((link) => (
                                <li key={link}>
                                    <a 
                                        href="#" 
                                        className="hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <i className="fa-solid fa-chevron-right text-xs text-blue-400 group-hover:text-blue-300" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Customer Service */}
                    <div className="animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
                        <h4 className="font-semibold mb-4 text-lg border-b border-gray-700 pb-2">Customer Service</h4>
                        <ul className="space-y-3 text-gray-300">
                            {['Help Center', 'Returns & Exchanges', 'Shipping Info', 'Track Your Order', 'FAQs'].map((link) => (
                                <li key={link}>
                                    <a 
                                        href="#" 
                                        className="hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <i className="fa-solid fa-chevron-right text-xs text-green-400 group-hover:text-green-300" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Legal & Newsletter */}
                    <div className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
                        <h4 className="font-semibold mb-4 text-lg border-b border-gray-700 pb-2">Legal</h4>
                        <ul className="space-y-3 text-gray-300 mb-6">
                            {['Terms & Conditions', 'Privacy Policy', 'Cookie Policy', 'Refund Policy'].map((link) => (
                                <li key={link}>
                                    <a 
                                        href="#" 
                                        className="hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group"
                                    >
                                        <i className="fa-solid fa-chevron-right text-xs text-purple-400 group-hover:text-purple-300" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Newsletter Signup */}
                        <div className="bg-gray-800 p-4 rounded-xl">
                            <h5 className="font-medium mb-2">Stay Updated</h5>
                            <p className="text-sm text-gray-400 mb-3">Get latest book releases & offers</p>
                            <div className="flex gap-2">
                                <input 
                                    type="email" 
                                    placeholder="Your email" 
                                    className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all duration-300"
                                />
                                <button className="btn-primary px-3 py-2 text-sm">
                                    <i className="fa-solid fa-paper-plane" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Bottom Section */}
                <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between animate-fade-in">
                    <div className="text-center md:text-left mb-4 md:mb-0">
                        <p className="text-gray-400 text-sm">
                            © {currentYear} Book World. All rights reserved.
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                            Made with <i className="fa-solid fa-heart text-red-500 animate-pulse" /> for book lovers
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-2">
                            <i className="fa-solid fa-shield-alt text-green-400" />
                            Secure Shopping
                        </span>
                        <span className="flex items-center gap-2">
                            <i className="fa-solid fa-truck text-blue-400" />
                            Fast Delivery
                        </span>
                        <span className="flex items-center gap-2">
                            <i className="fa-solid fa-headset text-purple-400" />
                            24/7 Support
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}