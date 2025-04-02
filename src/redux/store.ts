import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import cartReducer from "./slices/cartSlice";
import cartModalReducer from "./slices/cartModalSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    openCartModal: cartModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
