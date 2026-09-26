import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Layout from "./Layout";

import Home from "./pages/Home";
import Menu from "./menu/Menu";
import DishDetail from "./pages/DishDetail";
import Cart from "./cart/Cart";
import Checkout from "./checkout/Checkout";
import Orders from "./pages/Orders";
import Favorites from "./pages/Favorites";
import OrderConfirmation from "./pages/OrderConfirmation";

import Register from "./auth/Register";
import Login from "./auth/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout";
import Admin from "./admin/Admin";
import MenuManagement from "./admin/MenuManagement";
import OrderManagement from "./admin/OrderManagement";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public & Customer Layout Routes */}
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/menu/:name" element={<DishDetail />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    
                    {/* Cart and favorites */}
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/favorites" element={<Favorites />} />

                    {/* Protected customer pages */}
                    <Route
                        path="/checkout"
                        element={
                            <ProtectedRoute>
                                <Checkout />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute>
                                <Orders />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/order-confirmation/:id"
                        element={
                            <ProtectedRoute>
                                <OrderConfirmation />
                            </ProtectedRoute>
                        }
                    />
                </Route>

                {/* Unified Admin Nested Routes */}
                <Route 
                    path="/admin" 
                    element={
                        <ProtectedRoute adminOnly={true}>
                            <AdminLayout />
                        </ProtectedRoute>
                    }
                >
                    {/* Renders at /admin */}
                    <Route index element={<Admin />} />

                    {/* Renders at /admin/menu */}
                    <Route path="menu" element={<MenuManagement />} />

                    {/* Renders at /admin/orders */}
                    <Route path="orders" element={<OrderManagement />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;