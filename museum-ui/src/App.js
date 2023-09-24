import { createBrowserRouter, RouterProvider } from "react-router-dom";

import About from "./components/about";
import AuthPageLayout from "./components/auth/AuthPageLayout";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Collection from "./components/collection";
import Dashboard from "./components/dashboard";
import ExhibitionsLayout, { Exhibitions } from "./components/exhibitions";
import Home from "./components/home";
import Layout, {
  PageNotFound,
  RouteLayout,
  ErrorPage
} from "./components/layout";
import Orders from "./components/orders";
import TicketsCheckoutLayout, { Tickets } from "./components/tickets";
import Checkout from "./components/tickets/checkout";
import Visit from "./components/visit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
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
            path: "about",
            element: <About />
          },
          {
            path: "visit",
            element: <Visit />
          },
          {
            path: "collection",
            element: <Collection />
          },
          {
            path: "exhibitions",
            element: <ExhibitionsLayout />,
            children: [
              {
                index: true,
                element: <Exhibitions />
              },
              {
                path: ":id/tickets",
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
