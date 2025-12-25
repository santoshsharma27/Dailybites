import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppLayout from "./components/AppLayout";
import Error from "./components/Error/Error";
import Restaurants from "./components/restaurant/Restaurants";
import Loader from "./components/Loader";
import Cart from "./components/cart/Cart";
import Address from "./components/Address";
import OrderSuccess from "./components/OrderSuccess";
import Contact from "./components/Contact";
import Help from "./components/Help";
import SignIn from "./components/SignIn";
const PaymentPage = lazy(() => import("./components/PaymentPage"));
const RestaurantMenu = lazy(
  () => import("./components/restaurant/RestaurantMenu"),
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
        element: (
          <Suspense fallback={<Loader />}>
            <RestaurantMenu />
          </Suspense>
        ),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Address />,
      },
      {
        path: "payment",
        element: (
          <Suspense fallback={<Loader />}>
            <PaymentPage />
          </Suspense>
        ),
      },
      {
        path: "order-success",
        element: <OrderSuccess />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "signin",
        element: <SignIn mode="signin" />,
      },
      {
        path: "signup",
        element: <SignIn mode="signup" />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
