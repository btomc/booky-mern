import React from 'react'
import Faq from './components/Faq'
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
    </>
  )
}

export default App;
