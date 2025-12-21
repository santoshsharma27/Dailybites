import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "./components/AppLayout";
import Error from "./components/Error/Error";
import Restaurants from "./components/restaurant/Restaurants";
import Loader from "./components/Loader";
const RestaurantMenu = lazy(
  () => import("./components/restaurant/RestaurantMenu"),
);
const Cart = lazy(() => import("./components/cart/Cart"));
const Address = lazy(() => import("./components/Address"));
const PaymentPage = lazy(() => import("./components/PaymentPage"));
const OrderSuccess = lazy(() => import("./components/OrderSuccess"));
const Contact = lazy(() => import("./components/Contact"));
const Help = lazy(() => import("./components/Help"));
const SignIn = lazy(() => import("./components/SignIn"));

const withSuspense = (Component) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Restaurants />,
      },
      {
        path: "restaurants/:resId",
        element: withSuspense(RestaurantMenu),
      },
      {
        path: "cart",
        element: withSuspense(Cart),
      },
      {
        path: "checkout",
        element: withSuspense(Address),
      },
      {
        path: "payment",
        element: withSuspense(PaymentPage),
      },
      {
        path: "order-success",
        element: withSuspense(OrderSuccess),
      },
      {
        path: "contact",
        element: withSuspense(Contact),
      },
      {
        path: "help",
        element: withSuspense(Help),
      },
      {
        path: "signin",
        element: withSuspense(() => <SignIn mode="signin" />),
      },
      {
        path: "signup",
        element: withSuspense(() => <SignIn mode="signup" />),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
