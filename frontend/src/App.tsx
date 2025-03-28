import './App.css'
import { CartProvider } from './context/CartContext';
import BooksPage from './pages/BooksPage';
import BuyPage from './pages/BuyPage';
import CartPage from './pages/CartPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (
    <>
    <CartProvider>

      <Router>
        <Routes>
            <Route path="/" element={<BooksPage />} /> 
            <Route path="/books" element={<BooksPage />} />
            <Route path="/buy/:title/:bookID" element={<BuyPage />} />
            <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
      
    </CartProvider>
      

    </>
  )
}

export default App
