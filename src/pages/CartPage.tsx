import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../store";

import { fetchCart, updateCartItem } from "../cart/cartThunk";

function CartPage() {
  const dispatch = useDispatch<AppDispatch>();

  const { cartItems, total, quantity, status, error } = useSelector(
    (state: RootState) => state.cart,
  );

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // =========================
  // LOADING
  // =========================

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl">Loading cart...</h2>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-red-500 text-xl">{error}</h2>
      </div>
    );
  }

  // =========================
  // CART
  // =========================

  return (
    <div className="min-h-screen bg-olive-400 p-8">
      <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

      {/* TOTAL QUANTITY */}

      <p className="text-white mb-6">Total Items: {quantity}</p>

      {/* EMPTY CART */}

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg p-8">
          <h2 className="text-xl font-semibold">Your cart is empty.</h2>
        </div>
      ) : (
        <div className="grid gap-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-5 flex items-center gap-6"
            >
              {/* IMAGE */}

              {item.product.image_url && (
                <img
                  src={item.product.image_url}
                  alt={item.product.product_name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}

              {/* PRODUCT INFO */}

              <div className="flex-1">
                <h2 className="font-bold text-lg">
                  {item.product.product_name}
                </h2>

                <p>Price: ${item.product.price}</p>

                {/* QUANTITY */}

                <div className="flex items-center gap-3 mt-3">
                  {/* DECREASE */}

                  <button
                    onClick={() => {
                      dispatch(
                        updateCartItem({
                          itemId: item.id,
                          quantity: item.quantity - 1,
                        }),
                      );
                    }}
                    disabled={item.quantity <= 0}
                    className="w-8 h-8 rounded bg-gray-200 font-bold disabled:opacity-50"
                  >
                    −
                  </button>

                  {/* QUANTITY */}

                  <span className="font-semibold min-w-6 text-center">
                    {item.quantity}
                  </span>

                  {/* INCREASE */}

                  <button
                    onClick={() => {
                      dispatch(
                        updateCartItem({
                          itemId: item.id,
                          quantity: item.quantity + 1,
                        }),
                      );
                    }}
                    disabled={item.quantity >= item.product.stock}
                    className="w-8 h-8 rounded bg-gray-200 font-bold disabled:opacity-50"
                  >
                    +
                  </button>
                </div>

                {/* SUBTOTAL */}

                <p className="font-semibold mt-2">
                  Subtotal: ${item.product.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TOTAL */}

      <div className="bg-white rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-bold">Total: ${total}</h2>
      </div>
    </div>
  );
}

export default CartPage;
