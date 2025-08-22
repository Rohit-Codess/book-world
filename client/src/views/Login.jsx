import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthForm from '../components/AuthForm'

export default function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (formData) => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      console.log('Login attempt:', { email: formData.email, password: formData.password })
      
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // TODO: Replace with actual authentication logic
      // const response = await api.login({ email: formData.email, password: formData.password })
      
      // Simulate successful login
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: formData.email,
        token: 'mock-jwt-token'
      }
      
      // Store user data (you might want to use a proper state management solution)
      localStorage.setItem('user', JSON.stringify(mockUser))
      localStorage.setItem('token', mockUser.token)
      
      // Show success message (you can use a toast library here)
      console.log('Login successful!')
      
      // Redirect to home page
      navigate('/')
      
    } catch (error) {
      console.error('Login failed:', error)
      // Handle login error (show error message to user)
      alert('Login failed. Please check your credentials and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthForm 
      type="login" 
      onSubmit={handleLogin} 
      isLoading={isLoading} 
    />
  )
}
