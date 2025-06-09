import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  decrementItemQuantity,
  deleteItem,
  getTotalPrice,
} from "./cartSlice";

function CartItems() {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector(getTotalPrice);
  const dispatch = useDispatch();

  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.card.info.id === id)?.quantity || 0;
  };

  const addHandler = (item) => {
    dispatch(addItem(item));
  };

  const deleteHandler = (item) => {
    const itemId = item.card.info.id;
    const quantity = getItemQuantity(itemId);

    if (quantity > 1) {
      dispatch(decrementItemQuantity(itemId));
    } else if (quantity === 1) {
      dispatch(deleteItem(itemId));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="mb-6 text-2xl font-semibold text-gray-700">
        Your Cart Items
      </h2>
      {cartItems?.map((item) => {
        const itemId = item.card.info.id;
        const quantity = getItemQuantity(itemId);

        return (
          <div
            className="flex items-center justify-between rounded-lg transition-all"
            key={itemId}
          >
            {/* Item Details */}
            <div className="flex-1 text-left">
              <h3 className="font-medium text-gray-800">
                {item?.card?.info?.name}
              </h3>
              <div className="mt-1 text-sm text-gray-600">
                ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center space-x-3">
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 font-bold text-white hover:bg-red-600"
                onClick={() => deleteHandler(item)}
              >
                -
              </button>
              <span className="text-lg font-semibold text-gray-800">
                {quantity}
              </span>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-bold text-white hover:bg-green-600"
                onClick={() => addHandler(item)}
              >
                +
              </button>
            </div>
          </div>
        );
      })}

      {/* Total Price Display */}
      <div className="mt-6 border-t border-black bg-white p-4 text-right">
        <div className="text-base font-bold text-gray-800">
          TO PAY: ₹{totalPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export default CartItems;
