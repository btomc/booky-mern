import React from 'react'
import Faq from './components/Faq'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import GlobalStyle from './globalStyles'


const App = () => {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <Hero />
      <Faq />
      <Footer />
    </>
  )
}

export default App;
