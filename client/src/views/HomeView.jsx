import React from 'react'
import Hero from '../components/sections/Hero'
import TopCategories from '../components/sections/TopCategories'
import Deals from '../components/sections/Deals'
import PreOrder from '../components/sections/PreOrder'
import CategoriesGrid from '../components/sections/CategoriesGrid'
import FeaturedCollections from '../components/sections/FeaturedCollections'
import PromoBanners from '../components/sections/PromoBanners'
import NewArrivals from '../components/sections/NewArrivals'
import TopLists from '../components/sections/TopLists'
import AuthorsPublishers from '../components/sections/AuthorsPublishers'
import Newsletter from '../components/sections/Newsletter'


export default function HomeView() {
    return (
        <div className="min-h-screen">
            <Hero />
            <TopCategories />
            <Deals />
            <PreOrder />
            <CategoriesGrid />
            <FeaturedCollections />
            <PromoBanners />
            <NewArrivals />
            <TopLists />
            <AuthorsPublishers />
            <Newsletter />
        </div>
    )
}