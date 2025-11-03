import logo from './logo.svg';
import './App.css';
import Header from './Components/Header';
import Banner from './Components/Banner';
import Grid from './Components/Grid';
import Footer from './Components/Footer';
import Icon from './Components/Icon';
import Contaccts from './Components/Contaccts';
import Collections from './Pages/Collections';
import Simple from './Components/Simple';
import Product from './Pages/Product';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home  from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact' 
import Signup from './Pages/Signup';
import Cart from './Components/Cart';
import Delivery from './Components/Delivery';
import Myorder from './Components/Myorder';
import { ToastContainer } from 'react-toastify';
import { ShopContextProvider } from './Components/Context/ShopContext';






function App() {
  return (
    <>
    <ShopContextProvider>
<BrowserRouter>
<Header />
<ToastContainer />
<Routes>
  <Route path='/' element={<Home />} ></Route>
  <Route path='/Collection' element={<Collections />}></Route>
  <Route path='/About' element={<About />}></Route>
  <Route path='/Contact' element={<Contact />}></Route>
  
  <Route path='/login' element={<Signup />}></Route>
  <Route path='/Product'element={<Product />}></Route>
  <Route path='/Cart' element={<Cart />}></Route>
  <Route path='/Delivery' element={<Delivery />}></Route>
  <Route path='/Myorder' element={<Myorder />}></Route>
  <Route path="/product/:id" element={<Product />} />

  
</Routes>
  
  
<Contaccts />

</BrowserRouter>
</ShopContextProvider> 
    </>
  )
}

export default App;
