import { useRouteError, useNavigate } from "react-router-dom";

const Error = () => {
  const err = useRouteError();
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 py-5">
      <div className="max-w-md rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-4xl font-bold text-red-600">Oops!!!</h1>
        <h2 className="mb-4 text-2xl font-semibold">Something went wrong!</h2>
        <p className="mb-4 text-gray-700">
          We&apos;re sorry, but we encountered an unexpected error.
        </p>
        <p className="text-lg font-bold text-gray-800">
          Error {err.status}: {err.statusText}
        </p>
        <button
          onClick={handleGoHome} // Navigate to the home page
          className="mt-6 rounded bg-blue-600 px-4 py-2 text-white transition duration-200 hover:bg-blue-700"
        >
          Go to Restaurants
        </button>
      </div>
    </div>
  );
};

export default Error;
