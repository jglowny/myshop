import React from "react";
import { RootState } from "../redux/store";
import { toggleCartModal } from "../redux/slices/cartModalSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <header className="bg-gray-800 text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold no-underline">
          My Shop
        </Link>
        <button
          className={`${
            cartItems.length > 0
              ? "bg-red-500 hover:bg-red-600"
              : "bg-slate-500 hover:bg-slate-600"
          } text-white font-semibold py-2 px-4 rounded`}
          onClick={() => dispatch(toggleCartModal())}
        >
          Cart ({cartItems.length})
        </button>
      </div>
    </header>
  );
};

export default Header;
