import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constant";
import { addItem, decrementItemQuantity, deleteItem } from "./cart/cartSlice";

function ItemList({ items, setNotification }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);

  const getItemQuantity = (id) =>
    cartItems.find((item) => item.card.info.id === id)?.quantity || 0;

  const addHandler = (item) => {
    dispatch(addItem(item));
    setNotification({ type: "add", message: "Item added to cart!" });
    setTimeout(() => setNotification(null), 1000);
  };

  const deleteHandler = (item) => {
    const itemId = item.card.info.id;
    const quantity = getItemQuantity(itemId);

    if (quantity > 1) {
      dispatch(decrementItemQuantity(itemId));
    } else if (quantity === 1) {
      dispatch(deleteItem(itemId));
    }

    setNotification({ type: "delete", message: "Item removed from cart!" });
    setTimeout(() => setNotification(null), 1000);
  };

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {items?.map((item) => {
        const itemId = item.card.info.id;
        const quantity = getItemQuantity(itemId);

        return (
          <div
            className="relative flex flex-col items-center justify-between rounded-lg p-4"
            key={itemId}
          >
            <img
              className="mb-3 h-48 w-full rounded-md object-cover"
              src={CDN_URL + item?.card?.info?.imageId}
              alt={item?.card?.info?.name}
              loading="lazy"
            />
            <div className="w-full text-left">
              <h3 className="text-lg font-semibold text-gray-800">
                {item?.card?.info?.name}
              </h3>
              <div className="mt-1 flex items-center justify-between text-base">
                <span className="font-bold text-gray-700">
                  ₹
                  {item.card.info.price
                    ? item.card.info.price / 100
                    : item.card.info.defaultPrice / 100}
                </span>
                {item.card.info.ratings?.aggregatedRating?.rating && (
                  <span className="flex items-center rounded-md bg-green-500 px-2 py-1 text-xs text-white">
                    ✭ {item.card.info.ratings.aggregatedRating.rating}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity Control */}
            <div className="mt-3 flex w-full items-center justify-center">
              {quantity > 0 && (
                <button
                  className="flex-1 rounded-l-md bg-red-500 py-2 font-semibold text-white hover:bg-red-600"
                  onClick={() => deleteHandler(item)}
                >
                  -
                </button>
              )}
              {quantity > 0 && (
                <span className="px-3 text-lg font-semibold">{quantity}</span>
              )}
              <button
                className={`flex-1 py-2 ${
                  quantity > 0 ? "rounded-r-md" : "rounded-md"
                } bg-green-500 font-semibold text-white hover:bg-green-600`}
                onClick={() => addHandler(item)}
              >
                +
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ItemList;
