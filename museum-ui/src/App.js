import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthPageLayout from "./components/auth/AuthPageLayout";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Dashboard from "./components/dashboard";
import ErrorPage from "./components/ErrorPage";
import Exhibitions from "./components/exhibitions";
import Home from "./components/home";
import Orders from "./components/orders";
import PageNotFound from "./components/PageNotFound";
import RootLayout from "./components/RootLayout";
import RouteLayout from "./components/RouteLayout";
import TicketsCheckoutLayout, { Tickets } from "./components/tickets";
import Checkout from "./components/tickets/checkout";
import Visit from "./components/visit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        element: <RouteLayout />,
        hasErrorBoundary: true, // todo
        children: [
          {
            element: <AuthPageLayout />,
            children: [
              {
                path: "login",
                element: <Login />
              },
              {
                path: "signup",
                element: <Signup />
              }
            ]
          },
          {
            path: "visit",
            element: <Visit />
          },
          {
            path: "exhibitions",
            element: <Exhibitions />
          },
          {
            path: "exhibitions/:id/tickets",
            element: <TicketsCheckoutLayout />,
            children: [
              {
                index: true,
                element: <Tickets />
              },
              {
                path: "checkout",
                element: <Checkout />
              }
            ]
          },
          {
            path: "orders",
            element: <Orders />
          },
          {
            path: "dashboard",
            element: <Dashboard />
          },
          {
            path: "*",
            element: <PageNotFound />
          }
        ]
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
