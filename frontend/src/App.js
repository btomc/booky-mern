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
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'


const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path='/order/:id' component={OrderScreen}  />
        <Route path='/shipping' component={ShippingScreen}  />
        <Route path='/payment' component={PaymentScreen}  />
        <Route path='/placeorder' component={PlaceOrderScreen}  />
        <Route path='/login' component={LoginScreen}  />
        <Route path='/register' component={RegisterScreen}  />
        <Route path='/profile' component={ProfileScreen}  />
        <Route path='/products' component={OfferedProductsScreen}  />
        <Route path='/search/:keyword' component={OfferedProductsScreen}  />
        <Route path='/product/:id' component={ProductScreen}  />
        <Route path='/cart/:id?' component={CartScreen}  />
        <Route path='/' component={HomeScreen} exact />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App;
