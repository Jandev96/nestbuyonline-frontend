import { createBrowserRouter } from "react-router-dom";
import{RootLayout} from "../layout/RootLayout";
import AdminLayout from "../layout/AdminLayout"; // ✅ Import Admin Layout
import AdminProtectedRoute from "./adminProtectedRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageUsers from "../pages/admin/ManageUsers";
import ErrorPage from "../pages/shared/ErrorPage";
import Home from "../pages/user/Home";
import About from "../pages/user/About";
import Contact from "../pages/user/Contact";
import LoginPage from "../pages/shared/LoginPage";
import SignUp from "../pages/user/SignUp";
import Products from "../pages/user/Products";
import ProductDetails from "../pages/user/ProductDetails";
import ProtectRoutes from "./ProtectRoutes";
import ProfilePage from "../pages/user/ProfilePage";
import Payment from "../pages/user/Payment";
import Cart from "../pages/user/Cart";
import PaymentSuccess from "../pages/user/PaymentSucess";
import AddProduct from "../components/admin/AddProduct";
import AdminProductList from "../pages/admin/AdminProductList";
import AdminEditProduct from "../pages/admin/AdminEditProduct";
import OrderDetailsPage from "../pages/user/OrderDetailsPage";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUp /> },
      { path: "products", element: <Products /> },
      { path: "/productDetails/:id", element: <ProductDetails /> },

      {
        element: <ProtectRoutes />,
        children: [
          { path: "profile", element: <ProfilePage /> },
          { path: "payment", element: <Payment /> },
          { path: "cart", element: <Cart /> },
          {
            path: "payment",
            element: <h1>payment</h1>,
        },
        {
            path: "user/payment/success",
            element: <PaymentSuccess />,
        },
        {
            path: "payment/cancel",
            element: <h1>Payment Cancelled </h1>,
        },
        {
          path: "orders/:id",
          element: <OrderDetailsPage />, // ✅ ADD THIS LINE
        },
        ],
      },
    ],
  },

  {
    path: "admin/login",
    element: <LoginPage />,
  },

  {
    path: "/admin",
    element: <AdminProtectedRoute />,
    children: [
      {
        element: <AdminLayout />, // ✅ Wrap admin routes with AdminLayout
        children: [
          { path: "dashboard", element: <AdminDashboard /> },
          { path: "manage-users", element: <ManageUsers /> },
          { path: "/admin/add-product", element: <AddProduct /> },
          {path:"/admin/edit-products", element: <AdminProductList />  },
          {path:"/admin/edit-product/:productId", element: <AdminEditProduct />  }

        ],
      },
    ],
  },
]);
