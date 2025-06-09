export const calculateTotalPrice = (cart) => {
  return cart.reduce((total, item) => {
    const itemPrice = item.card.info.price
      ? item.card.info.price / 100
      : item.card.info.defaultPrice / 100;
    return total + itemPrice * item.quantity;
  }, 0);
};

export const updateLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateCartState = (state) => {
  updateLocalStorage(state.cart);
  state.totalPrice = calculateTotalPrice(state.cart);
};
