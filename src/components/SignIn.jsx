import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";

const SigIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  // Determine the current form mode based on URL
  const isSignin = location.pathname === "/signin";

  // Formik configurations for login and signup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "", // Used only in Signup
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
      ...(isSignin
        ? {} // Skip confirmPassword validation for login
        : {
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password"), null], "Passwords must match")
              .required("Required"),
          }),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      setError("");
      try {
        // Simulate login/signup API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/"); // Redirect on success
      } catch (err) {
        setError(`Invalid ${isSignin ? "login" : "signup"} attempt`);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleToggleForm = () => {
    // Toggle between login and signup routes
    navigate(isSignin ? "/signup" : "/signin");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
          {isSignin ? "Sign to Your Account" : "Create an Account"}
        </h2>

        <form onSubmit={formik.handleSubmit}>
          {error && (
            <div className="mb-4 text-center font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <label
              className="mb-2 block font-semibold text-gray-600"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label
              className="mb-2 block font-semibold text-gray-600"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password Input for Signup */}
          {!isSignin && (
            <div className="mb-6">
              <label
                className="mb-2 block font-semibold text-gray-600"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 ${
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                placeholder="Re-enter your password"
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.confirmPassword}
                  </p>
                )}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full rounded-md bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              isLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading
              ? isSignin
                ? "Logging in..."
                : "Signing up..."
              : isSignin
                ? "Login"
                : "Sign Up"}
          </button>
        </form>

        {/* Link to Toggle Between Login and Signup */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {isSignin ? "Don’t have an account?" : "Already have an account?"}{" "}
            <button
              className="text-blue-600 hover:underline"
              onClick={handleToggleForm}
            >
              {isSignin ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SigIn;
