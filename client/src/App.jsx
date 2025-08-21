import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomeView from './views/HomeView'
import CatalogView from './views/CatalogView'
import NotFound from './views/NotFound'


export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomeView />} />
        <Route path="/catalog" element={<CatalogView />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}