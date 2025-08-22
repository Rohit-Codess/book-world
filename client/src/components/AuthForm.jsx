import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function AuthForm({ 
  type = 'login', 
  onSubmit, 
  isLoading = false 
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const isLogin = type === 'login'

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    // Full name validation (only for signup)
    if (!isLogin && !formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (!isLogin && formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    // Confirm password validation (only for signup)
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit && onSubmit(formData)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in">
          {/* Logo */}
          <Link to="/" className="inline-flex items-center gap-3 group mb-6">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <i className="fa-solid fa-book text-2xl" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-800 group-hover:text-red-600 transition-colors">
                Book World
              </h1>
              <p className="text-sm text-gray-500 -mt-1">Your Literary Universe</p>
            </div>
          </Link>

          <div className="mt-6">
            <h2 className="text-3xl font-bold text-gray-900">
              {isLogin ? 'Welcome back!' : 'Join Book World'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin 
                ? 'Sign in to your account to continue your literary journey' 
                : 'Create your account and discover your next favorite book'
              }
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-scale-in">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name (Signup only) */}
            {!isLogin && (
              <div className="animate-slide-in-up">
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full text-black px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 ${
                      errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  <i className="fa-solid fa-user absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <i className="fa-solid fa-exclamation-circle" />
                    {errors.fullName}
                  </p>
                )}
              </div>
            )}

            {/* Email */}
            <div className="animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full text-black px-4 py-3 pl-12 border rounded-xl focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <i className="fa-solid fa-exclamation-circle" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full text-black px-4 py-3 pl-12 pr-12 border rounded-xl focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <i className="fa-solid fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <i className="fa-solid fa-exclamation-circle" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password (Signup only) */}
            {!isLogin && (
              <div className="animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full text-black px-4 py-3 pl-12 pr-12 border rounded-xl focus:ring-2 focus:ring-red-500/30 focus:border-red-500 transition-all duration-300 ${
                      errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Confirm your password"
                  />
                  <i className="fa-solid fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <i className="fa-solid fa-exclamation-circle" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Forgot Password Link (Login only) */}
            {isLogin && (
              <div className="flex items-center justify-between text-sm animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                  />
                  <span className="ml-2 text-gray-600">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="font-medium text-red-600 hover:text-red-500 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <div className="animate-slide-in-up" style={{ animationDelay: '0.4s' }}>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                    Processing...
                  </>
                ) : (
                  <>
                    <i className={`fa-solid ${isLogin ? 'fa-sign-in-alt' : 'fa-user-plus'}`} />
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6 animate-slide-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Social Login */}
          <div className="mt-6 grid grid-cols-2 gap-3 animate-slide-in-up" style={{ animationDelay: '0.6s' }}>
            <button
              type="button"
              className="w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all duration-300 hover:scale-105"
            >
              <i className="fab fa-google text-red-500" />
              Google
            </button>
            <button
              type="button"
              className="w-full inline-flex justify-center items-center gap-2 py-2.5 px-4 border border-gray-300 rounded-xl bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-all duration-300 hover:scale-105"
            >
              <i className="fab fa-facebook text-blue-600" />
              Facebook
            </button>
          </div>

          {/* Switch Form Link */}
          <div className="mt-6 text-center animate-slide-in-up" style={{ animationDelay: '0.7s' }}>
            <p className="text-sm text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <Link
                to={isLogin ? '/signup' : '/login'}
                className="font-medium text-red-600 hover:text-red-500 transition-colors"
              >
                {isLogin ? 'Sign up here' : 'Sign in here'}
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <p>
            By {isLogin ? 'signing in' : 'signing up'}, you agree to our{' '}
            <Link to="/terms" className="text-red-600 hover:text-red-500">Terms of Service</Link>
            {' '}and{' '}
            <Link to="/privacy" className="text-red-600 hover:text-red-500">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
