import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import ProductPage from "../Pages/ProductPage/ProductPage";
import DesignPage from "../Pages/DesignPage/DesignPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import CartItemPage from "../Pages/CartItemPage/CartItemPage";
import CategoryPage from "../Pages/CategoryPage/CategoryPage";
import OrderPage from "../Pages/OrderPage/OrderPage";
import SupplierPage from "../Pages/SupplierPage/SupplierPage";
import OrderDetailsPage from "../Pages/OrderDetailsPage/OrderDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        { path: "", element: <HomePage /> },
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
        { path: "design-guide", element: <DesignPage /> },
        { path: "product/:something", element: <ProtectedRoute><ProductPage /> </ProtectedRoute>},
        { path: "product", element: <ProtectedRoute><ProductPage /> </ProtectedRoute>},
        { path: "cartItem", element: <ProtectedRoute><CartItemPage /> </ProtectedRoute>},
        { path: "category", element: <ProtectedRoute><CategoryPage /> </ProtectedRoute>},
        { path: "order", element: <ProtectedRoute><OrderPage /> </ProtectedRoute>},
        { path: "orderDetails/:orderId", element: <ProtectedRoute><OrderDetailsPage /> </ProtectedRoute>},
        { path: "supplier", element: <ProtectedRoute><SupplierPage /> </ProtectedRoute>}
    ],
  },
]);
