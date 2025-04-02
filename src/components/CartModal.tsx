import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../redux/slices/cartSlice";
import { closeCartModal } from "../redux/slices/cartModalSlice";

const CartModal = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const roundPrice = (price: number): number => {
    return Math.round(price * 100) / 100;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="border-b p-4 flex justify-between items-center">
          <h5 className="text-lg font-bold">Cart</h5>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={() => dispatch(closeCartModal())}
          >
            ✕
          </button>
        </div>
        <div className="p-4">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <h6 className="font-medium">{item.title}</h6>
                  <p className="text-sm text-gray-500">${item.price}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    className="w-16 border border-gray-300 rounded px-2 py-1"
                    value={item.quantity}
                    min="1"
                    onChange={(e) =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: Number(e.target.value),
                        })
                      )
                    }
                  />
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}
        </div>
        <div className="border-t p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-green-500">
              ${roundPrice(totalPrice)}
            </span>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
              onClick={() => {
                dispatch(clearCart());
                dispatch(closeCartModal());
              }}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
