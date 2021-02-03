import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import GlobalStyle from './globalStyles'
import HomeScreen from './screens/HomeScreen'
import OfferedProductsScreen from './screens/OfferedProductsScreen'



const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Switch>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/products' component={OfferedProductsScreen} exact />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App;
