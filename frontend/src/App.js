import React from 'react';
// as is used as ALIAS for BrowserRouter library
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'


function App() {
  return (
    // surround Router around the components.
    // exact => meaning 
    <Router>
    <Header />
      <main className="py-3">
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/product/:id' component={ProductScreen}></Route>
          {/* id is optional on cart component */}
          <Route path='/cart/:id?' component={CartScreen}></Route>
        </Container>
      </main>
    <Footer />
    </Router>
  );
}

export default App;
