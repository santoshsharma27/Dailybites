import { useSelector } from "react-redux";
import { getTotalPrice } from "./cartSlice";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function HoverCart({ setIsCartHovered }) {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalPrice = useSelector(getTotalPrice);
  const navigate = useNavigate();
  const location = useLocation();

  function handleCheckout() {
    navigate("/checkout");
  }

  // Close hover cart automatically when on checkout page
  useEffect(() => {
    if (
      location.pathname === "/checkout" ||
      location.pathname === "/payment" ||
      location.pathname === "/cart" ||
      location.pathname === "/grocery" ||
      location.pathname === "/contact"
    ) {
      setIsCartHovered(false); // Ensure cart is hidden on this route
    }
  }, [location, setIsCartHovered]);

  return (
    <div className="space-y-6 p-2 pt-4">
      {cartItems.map((item) => {
        const itemId = item.card.info.id;
        const itemQuantity = item[itemId] || 1;
        const itemPrice =
          (item.card.info.price || item.card.info.defaultPrice) / 100;

        return (
          <div
            className="flex items-center justify-between rounded-lg"
            key={itemId}
          >
            <div className="flex w-full items-center">
              {/* <img
                className="mr-4 h-16 w-16 rounded-md object-cover shadow-sm"
                src={CDN_URL + item.card.info.imageId}
                alt={item.card.info.name}
              /> */}
              <div className="flex flex-1 items-center justify-between gap-12 text-xs">
                <div>
                  {item.card.info.name} x {itemQuantity}
                </div>
                <div className="font-semibold">
                  ₹{(itemPrice * itemQuantity).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="mt-6 border-t pt-2">
        {cartItems.length > 0 && (
          <>
            <div className="flex items-center justify-between text-gray-800">
              <span>Sub total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex justify-center">
              <button
                className="rounded-md bg-orange-500 px-32 py-2 uppercase text-white transition-colors hover:bg-orange-600"
                onClick={handleCheckout}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HoverCart;
