import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getTotalPrice } from "./cart/cartSlice";
import { useSelector } from "react-redux";
import { loadRazorpay } from "../utils/loadRazorpay";
import Loader from "./Loader";

const PaymentPage = () => {
  const navigate = useNavigate();
  const totalPrice = useSelector(getTotalPrice);
  const hasOpened = useRef(false);

  useEffect(() => {
    if (!hasOpened.current && totalPrice > 0) {
      hasOpened.current = true;
      openRazorpay();
    }
  }, []);

  const openRazorpay = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const orderRes = await fetch("http://localhost:5050/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: totalPrice }),
    });

    const order = await orderRes.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: order.amount,
      currency: "INR",
      name: "Dailybites",
      description: "Payment",
      prefill: {
        contact: "9876543210",
        email: "test@dailybites.com",
      },

      handler: async function (response) {
        // 3️⃣ Verify Payment
        const verifyRes = await fetch("http://localhost:5050/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        });

        const result = await verifyRes.json();

        if (result.success) {
          navigate("/order-success", { replace: true });
        } else {
          alert("Payment verification failed");
        }
      },

      modal: {
        ondismiss: () => navigate("/cart"),
      },
    };

    new window.Razorpay(options).open();
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  );
};

export default PaymentPage;
