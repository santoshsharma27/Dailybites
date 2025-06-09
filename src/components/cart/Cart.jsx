import { useEffect, useState } from "react";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import ConfirmModal from "../ConfirmModal";
import { Link } from "react-router-dom";
import { clearCart } from "./cartSlice";
import CartItems from "./CartItems";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cart);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleClearCart() {
    setIsModalOpen(true);
  }

  function confirmClearCart() {
    dispatch(clearCart());
    setIsModalOpen(false);
  }

  function cancelClearCart() {
    setIsModalOpen(false);
  }

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  if (!cartItems.length) return <EmptyCart />;

  return (
    <div className="relative">
      {/* Apply blur to the background content when modal is open */}
      <div
        className={`${isModalOpen ? "blur-sm" : ""} mx-auto mt-10 w-full max-w-3xl rounded-lg p-6 pt-16`}
      >
        <div className="divide-y divide-gray-300">
          <CartItems />
        </div>

        <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <button
            className="w-full rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition-colors duration-200 hover:bg-red-600 sm:w-auto"
            onClick={handleClearCart}
          >
            Clear Cart
          </button>
          <Link
            to="/checkout"
            className="w-full rounded-lg bg-blue-500 px-6 py-3 text-center font-semibold text-white transition-colors duration-200 hover:bg-blue-600 sm:w-auto"
          >
            Order Now
          </Link>
        </div>
      </div>

      {/* Modal for confirmation */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <ConfirmModal
            isOpen={isModalOpen}
            onClose={cancelClearCart}
            onConfirm={confirmClearCart}
          />
        </div>
      )}
    </div>
  );
}

export default Cart;
