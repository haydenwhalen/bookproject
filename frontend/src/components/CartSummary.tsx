import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function CartSummary() {
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart
    .reduce((sum, item) => sum + item.quantity * item.price, 0)
    .toFixed(2);

  if (cart.length === 0) return null;

  return (
    <div className="alert alert-info mt-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          🛒 <strong>{totalItems}</strong>{" "}
          <span className="badge bg-primary">{totalItems} items</span> — Total:{" "}
          <strong>${totalPrice}</strong>
        </div>
        <button className="btn btn-sm btn-outline-primary" onClick={() => navigate("/cart")}>
          View Cart
        </button>
      </div>

      {/* Bootstrap Progress Bar */}
      <div className="progress" style={{ height: "6px" }}>
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${Math.min(totalItems * 10, 100)}%` }}
          aria-valuenow={totalItems * 10}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </div>
  );
}

export default CartSummary;

