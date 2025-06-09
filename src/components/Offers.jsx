import { useEffect } from "react";
import { Link } from "react-router-dom";

const Offers = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12 md:px-12 lg:px-24">
      <div className="rounded-lg bg-white p-10 text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-800 sm:text-4xl">
          Currently, we don&apos;t have any active offers
        </h2>
        <p className="mb-6 text-gray-600">
          We&apos;re sorry, but there are no special offers running at the
          moment. Please check back later for exciting deals and discounts!
        </p>
        <p className="mb-8 text-sm text-gray-500">
          In the meantime, why not explore our delicious menu?
        </p>
        <Link
          to="/"
          className="rounded bg-orange-600 px-6 py-4 font-semibold text-white transition duration-300 hover:bg-orange-500"
        >
          Browse Menu
        </Link>
        <div className="mt-6 text-sm text-gray-500">
          <p>Need assistance? Contact our support team.</p>
          <p>
            Email:{" "}
            <a
              href="mailto:santosh37kr@gmail.com"
              className="text-blue-500 underline"
            >
              santosh37kr@gmail.com
            </a>
          </p>
          <p>
            Phone: <span className="text-blue-500">+91 7003189453</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Offers;
