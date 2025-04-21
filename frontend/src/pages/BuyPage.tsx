import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function BuyPage() {
  const navigate = useNavigate();
  const { title, bookID } = useParams();
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState<boolean>(false);

  const handleAddToCart = () => {
    const newItem = {
      bookID: Number(bookID),
      title: title || "Unknown Title",
      price: 14.99,
      quantity: 1,
    };
  
    addToCart(newItem);
    setShowToast(true);
  
    setTimeout(() => {
      setShowToast(false);
      navigate("/cart");
    }, 2000); 
  };
  

  return (
    <div className="container mt-4 position-relative">
      <h2 className="mb-4">Book</h2>

      {/* Cart Items Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th>Title</th>
            <th>Quantity</th>
            <th>Price Each</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{title}</td>
            <td>1</td>
            <td>$14.99</td>
            <td>$14.99</td>
          </tr>
        </tbody>
      </table>

      {/* Total Summary */}
      <div className="text-end">
        <h5>
          Total: <span className="text-success">$14.99</span>
        </h5>
        <button onClick={handleAddToCart} className="btn btn-success mt-2">
          Add To Cart
        </button>
      </div>

      {/* Toast */}
      {showToast && (
        <div
          className="toast show position-absolute top-0 end-0 m-3"
          style={{ zIndex: 9999 }}
        >
          <div className="toast-header bg-success text-white">
            <strong className="me-auto">Cart Updated</strong>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowToast(false)}
            ></button>
          </div>
          <div className="toast-body">✅ "{title}" added to cart!</div>
        </div>
      )}

      {/* Continue Shopping */}
      <div className="mt-3">
        <button onClick={() => navigate("/books")} className="btn btn-outline-primary">
          ← Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default BuyPage;


