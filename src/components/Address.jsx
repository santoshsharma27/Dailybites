import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddress } from "./user/userSlice";

const Address = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [localAddress, setLocalAddress] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    userName,
    position,
    status: addressStatus,
    address,
  } = useSelector((state) => state.user);

  const isLoadingAddress = addressStatus === "loading";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    setLocalAddress(address);
  }, [address]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => {
      navigate("/payment");
      resetForm();
    }, 1000);
  };

  const resetForm = () => {
    setPhoneNumber("");
    setLocalAddress("");
  };

  return (
    <div className="mx-auto mt-12 max-w-lg rounded-lg p-8">
      <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
        Ready to order? Let&apos;s go!
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            defaultValue={userName}
            placeholder="Enter your name"
            className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phoneNumber"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            minLength="10"
            maxLength="10"
            required
            placeholder="Enter your phone number"
            className="mt-1 block w-full rounded-lg border border-gray-300 p-3 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />
        </div>

        {/* Delivery Address */}
        <div className="relative w-full max-w-xl">
          <label
            htmlFor="address"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Delivery Address
          </label>
          <input
            type="text"
            id="address"
            value={localAddress}
            onChange={(e) => setLocalAddress(e.target.value)}
            disabled={isLoadingAddress}
            required
            placeholder="Enter your delivery address"
            className="mt-1 block w-full rounded-lg border border-gray-300 p-3 pr-32 text-gray-900 shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
          />

          {!position.latitude && !position.longitude && (
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
              type="button"
              className="absolute right-3 top-[35px] rounded-full bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              Get Position
            </button>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-orange-500 py-3 font-bold text-white shadow-md transition-all duration-200 ease-in-out hover:bg-orange-600 focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50"
        >
          SAVE ADDRESS & PROCEED TO PAY
        </button>
      </form>
    </div>
  );
};

export default Address;
