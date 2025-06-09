import { createSlice } from "@reduxjs/toolkit";

import {
  calculateTotalPrice,
  updateCartState,
  updateLocalStorage,
} from "../../utils/helper.js";

const storedCart = localStorage.getItem("cart");
const initialCart = storedCart ? JSON.parse(storedCart) : [];

const initialState = {
  cart: initialCart,
  totalPrice: calculateTotalPrice(initialCart),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.cart.find(
        (item) => item.card.info.id === action.payload.card.info.id,
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      updateCartState(state);
    },

    incrementItemQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.card.info.id === action.payload,
      );
      if (item) {
        item.quantity += 1;
      }

      updateLocalStorage(state.cart);
      state.totalPrice = calculateTotalPrice(state.cart);
    },

    decrementItemQuantity: (state, action) => {
      const item = state.cart.find(
        (item) => item.card.info.id === action.payload,
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cart = state.cart.filter(
          (item) => item.card.info.id !== action.payload,
        );
      }
      updateLocalStorage(state.cart);
      state.totalPrice = calculateTotalPrice(state.cart);
    },

    deleteItem: (state, action) => {
      state.cart = state.cart.filter(
        (item) => item.card.info.id !== action.payload,
      );

      updateLocalStorage(state.cart);
      state.totalPrice = calculateTotalPrice(state.cart);
    },

    clearCart: (state) => {
      state.cart.length = 0;
      state.totalPrice = 0;
      updateLocalStorage(state.cart);
    },
  },
});

export const {
  addItem,
  incrementItemQuantity,
  decrementItemQuantity,
  deleteItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// Selector to get total count of items in cart
export const getCartCount = (state) =>
  state.cart.cart.reduce((total, item) => total + item.quantity, 0);

// Selector to get total amount of items in cart
export const getTotalPrice = (state) => state.cart.totalPrice;
