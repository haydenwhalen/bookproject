import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <button onClick={() => navigate("/books")} className="btn btn-outline-primary">
            ← Continue Shopping
          </button>
        </>
      ) : (
        <>
          <table className="table table-bordered table-striped">
            <thead className="table-primary">
              <tr>
                <th>Title</th>
                <th>Quantity</th>
                <th>Price Each</th>
                <th>Subtotal</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.bookID}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.bookID)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="text-end">
            <h5>
              Total: <span className="text-success">${total.toFixed(2)}</span>
            </h5>
            <button className="btn btn-success mt-2">Checkout</button>
          </div>

          <div className="mt-3">
            <button onClick={() => navigate("/books")} className="btn btn-outline-primary">
              ← Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;



