import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./components/cart/cartSlice";
import userReducer from "./components/user/userSlice";

const store = configureStore({
  reducer: { cart: cartReducer, user: userReducer },
});

export default store;
