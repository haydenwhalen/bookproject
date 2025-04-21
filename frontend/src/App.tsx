import './App.css'
import { CartProvider } from './context/CartContext';
import AdminBooksPage from './pages/AdminBooksPage';
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
            <Route path="/admin" element={<AdminBooksPage />} />
        </Routes>
      </Router>
      
    </CartProvider>
      

    </>
  )
}

export default App
