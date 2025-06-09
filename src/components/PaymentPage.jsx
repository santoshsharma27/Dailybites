import { useEffect, useState } from "react";
import { FaCcVisa, FaCcMastercard, FaCcDiscover } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getTotalPrice } from "./cart/cartSlice";

const PaymentPage = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const totalPrice = useSelector(getTotalPrice);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      // Format card number to include spaces every four digits
      let formattedValue =
        value
          .replace(/[^0-9]/g, "")
          .match(/.{1,4}/g)
          ?.join(" ") || "";
      setFormData({ ...formData, [name]: formattedValue });
    } else if (name === "expiryDate") {
      // Automatically add a slash after MM
      let formattedValue = value.replace(/[^0-9]/g, "");
      if (formattedValue.length > 2) {
        formattedValue = `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}`;
      }
      setFormData({ ...formData, [name]: formattedValue });
    } else if (name === "cvv") {
      // Allow only numeric input for CVV
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData({ ...formData, [name]: numericValue });
    } else {
      // For cardholder name, set value directly
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing (replace this with actual payment logic)
    setTimeout(() => {
      setLoading(false);
      navigate("/order-success");
    }, 2000); // Simulate a 2-second processing time
  };

  return (
    <div className="min-h-screen bg-gray-100 px-5 py-16">
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-3xl font-bold">
          Payment Information
        </h2>

        <div className="mb-6 flex justify-center">
          <FaCcVisa className="mx-2 text-4xl text-blue-600" />
          <FaCcMastercard className="mx-2 text-4xl text-red-600" />
          <FaCcDiscover className="mx-2 text-4xl text-orange-600" />
        </div>

        <div className="mb-4 text-center">
          <span className="text-lg font-semibold">Total Amount: </span>
          <span className="text-xl font-bold"> ₹{totalPrice}</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="mb-1 block font-semibold text-gray-700"
              htmlFor="cardNumber"
            >
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength="19" // For 16 digits + 3 spaces
              required
              className="w-full rounded border border-gray-300 p-3 focus:outline-none"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="mb-4">
            <label
              className="mb-1 block font-semibold text-gray-700"
              htmlFor="cardName"
            >
              Cardholder Name
            </label>
            <input
              type="text"
              name="cardName"
              id="cardName"
              value={formData.cardName}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 p-3 focus:outline-none"
              placeholder="John Doe"
            />
          </div>
          <div className="mb-4 flex flex-col sm:flex-row">
            <div className="mb-4 pr-2 sm:mb-0 sm:w-1/2">
              <label
                className="mb-1 block font-semibold text-gray-700"
                htmlFor="expiryDate"
              >
                Expiry Date (MM/YY)
              </label>
              <input
                type="text"
                name="expiryDate"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                maxLength="5" // For MM/YY
                required
                className="w-full rounded border border-gray-300 p-3 focus:outline-none"
                placeholder="MM/YY"
              />
            </div>
            <div className="pl-2 sm:w-1/2">
              <label
                className="mb-1 block font-semibold text-gray-700"
                htmlFor="cvv"
              >
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                id="cvv"
                value={formData.cvv}
                onChange={handleChange}
                maxLength="3"
                required
                className="w-full rounded border border-gray-300 p-3 focus:outline-none"
                placeholder="123"
              />
            </div>
          </div>
          <button
            type="submit"
            className={`w-full rounded bg-blue-600 py-3 text-center font-bold text-white transition duration-200 hover:bg-blue-700 ${
              loading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading} // Disable button when loading
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="mr-3 h-5 w-5 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12c0-4.418 3.582-8 8-8s8 3.582 8 8H4z"
                  />
                </svg>
                Processing...
              </div>
            ) : (
              "Pay Now"
            )}
          </button>
        </form>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">Order Summary</h3>
          <div className="flex justify-between">
            <span>Product Price</span>
            <span> ₹{totalPrice}</span>
          </div>
          <div className="my-2 flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
