import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'

export default function Signup() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignup = async (formData) => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      console.log('Signup attempt:', {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      })
      
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // TODO: Replace with actual authentication logic
      // const response = await api.signup({
      //   fullName: formData.fullName,
      //   email: formData.email,
      //   password: formData.password
      // })
      
      // Simulate successful signup
      const mockUser = {
        id: 1,
        name: formData.fullName,
        email: formData.email,
        token: 'mock-jwt-token'
      }
      
      // Store user data (you might want to use a proper state management solution)
      localStorage.setItem('user', JSON.stringify(mockUser))
      localStorage.setItem('token', mockUser.token)
      
      // Show success message (you can use a toast library here)
      console.log('Signup successful!')
      
      // Redirect to home page or show welcome message
      navigate('/')
      
    } catch (error) {
      console.error('Signup failed:', error)
      // Handle signup error (show error message to user)
      if (error.message === 'EMAIL_EXISTS') {
        alert('An account with this email already exists. Please try logging in instead.')
      } else {
        alert('Signup failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthForm 
      type="signup" 
      onSubmit={handleSignup} 
      isLoading={isLoading} 
    />
  )
}
