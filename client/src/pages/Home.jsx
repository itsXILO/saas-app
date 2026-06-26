import React from 'react'
import { Navbar } from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import AiTools from '../components/AiTools.jsx'
import Testimonial from '../components/Testimonial.jsx'

export const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <AiTools />
      <Testimonial />
    </>
  )
}

export default Home
