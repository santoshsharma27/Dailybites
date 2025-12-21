import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { clearCart } from "./cart/cartSlice";

const OrderSuccess = () => {
  const dispatch = useDispatch();

  // Generate a random order ID (e.g., a 6-digit number)
  const orderId = Math.floor(100000 + Math.random() * 900000);

  // Clear the cart on component mount
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="mt-8 p-6 pt-32 text-center">
      <FaCheckCircle className="mx-auto mb-4 text-5xl text-green-600" />
      <h2 className="text-3xl font-bold text-green-600">
        Order Placed Successfully!
      </h2>
      <p className="mt-4 text-lg font-medium">
        Thank you for your order, Santosh
      </p>
      <p className="mt-2">Your Order will be delivered to your address</p>
      <p className="mt-2">
        Expect your order to arrive in approximately 45 minutes.
      </p>
      <p className="mt-4 font-medium">
        Order ID: <span className="text-orange-500">{orderId}</span>
      </p>
      <p className="mt-4 text-sm text-gray-600">
        If you have any questions, feel free to contact us at 1800-800-800.
      </p>
      <p className="mt-4 text-sm text-gray-500">
        You can also track your order status in the app.
      </p>
      <div className="mt-6">
        <Link
          className="rounded bg-orange-500 px-4 py-3 font-semibold text-white hover:bg-orange-600"
          to="/"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
