//jsx file (js file with html in a function)
//html must all be within one <>
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Footer from "./componets/Footer";
import Header from "./componets/Header";
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import ShippingScreen from './screens/Shipping';


/*function App() {
  return (
    <></>
  );
}*/

//es7 (standards for js syntax) has a different way to write a function
// arrow function uses =>
const App = () => {
  return(
    <>
    <Router>
    <Header />
      <main>
        <Container>
          <Routes>
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/shipping" element={<ShippingScreen/>} />
          </Routes>
        </Container>
      </main>
    <Footer />
    </Router>
    </>
  );
}


export default App;
