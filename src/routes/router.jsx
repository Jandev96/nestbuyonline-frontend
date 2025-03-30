import About from "../pages/user/About";
import Contact from "../pages/user/Contact";
import Home from "../pages/user/Home";

import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/user/Login";
import RootLayout from "../layout/RootLayout";
import SignUp from "../pages/user/SignUp";
import Profile from "../pages/user/ProfilePage";
import Payment from "../pages/user/Payment";
import Cart from "../pages/user/Cart";
import ProtectRoutes from "./ProtectRoutes";
import ErrorPage from "../pages/shared/ErrorPage";
import Products from "../pages/user/Products";
import Api from "../components/user/multipleCarosel";
import ProductDetails from "../pages/user/ProductDetails";
import LoginPage from "../pages/shared/LoginPage";
import ProfilePage from "../pages/user/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignUp/>,
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path:"test",
        element: <Api />
      },
      {
        path:"/productDetails/:id",
        element: <ProductDetails />
      },
      
      

      {
        element: <ProtectRoutes />,
        children: [
          {
            path:'profile',
            element: <ProfilePage />
          },
          {
            path:'payment',
            element: <Payment />
          },
          {
            path:'cart',
            element: <Cart /> 
          },



        ]
      }

     

    ],
  },
]);
