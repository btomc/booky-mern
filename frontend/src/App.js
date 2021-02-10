import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import OfferedProductsScreen from './screens/OfferedProductsScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'


const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/login' component={LoginScreen}  />
        <Route path='/register' component={RegisterScreen}  />
        <Route path='/profile' component={ProfileScreen}  />
        <Route path='/products' component={OfferedProductsScreen}  />
        <Route path='/product/:id' component={ProductScreen}  />
        <Route path='/cart/:id?' component={CartScreen}  />
        <Route path='/' component={HomeScreen} exact />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App;
