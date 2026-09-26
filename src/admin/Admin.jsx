import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


function Admin() {
    const [orders, setOrders] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [dishes, setDishes] = useState([]);
   

    useEffect(() => {
        const savedOrders = JSON.parse(localStorage.getItem("addis-eats-orders")) || [];
        const savedCustomers = JSON.parse(localStorage.getItem("addis-eats-users")) || [];
        const savedMenu = localStorage.getItem("addis-eats-menu");

        setOrders(savedOrders);
        setCustomers(savedCustomers.filter(user => user.role !== "admin"));

        async function loadDishes() {
            try {
                const response = await fetch("/menu-data.json");
                if (!response.ok) throw new Error("Could not load dishes");
                const data = await response.json();

                setDishes(
                    savedMenu
                        ? JSON.parse(savedMenu)
                        : data.map(dish => ({ ...dish, status: "Active" }))
                );
            } catch (error) {
                console.error("Failed to load menu:", error);
            }
        }

        loadDishes();
    }, []);

    // Statistics Calculations
    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => (o.status || "Pending") === "Pending").length;
    const deliveredOrders = orders.filter(o => o.status === "Delivered").length;
    
    const totalRevenue = orders
        .filter(o => o.status === "Delivered")
        .reduce((sum, o) => sum + Number(o.total || 0), 0);

    return (
        <div className="admin-dashboard">
            
            {/* Top Metric Cards */}
            <div className="admin-stats">
                <div className="admin-stat-card">
                    <div className="stat-icon">🍽️</div>
                    <div>
                        <p>Total Dishes</p>
                        <h3>{dishes.length}</h3>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="stat-icon">📦</div>
                    <div>
                        <p>Total Orders</p>
                        <h3>{totalOrders}</h3>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="stat-icon">👥</div>
                    <div>
                        <p>Customers</p>
                        <h3>{customers.length}</h3>
                    </div>
                </div>

                <div className="admin-stat-card">
                    <div className="stat-icon">💰</div>
                    <div>
                        <p>Delivered Revenue</p>
                        <h3>{totalRevenue.toLocaleString()} ETB</h3>
                    </div>
                </div>
            </div>

            {/* Quick Status Overview Section */}
            <div className="admin-section">
                <div className="section-header">
                    <h2>Order Summary</h2>
                    <Link to="/admin/orders">Manage Orders →</Link>
                </div>

                <div className="order-status-grid">
                    <div className="status-card">
                        <span>⏳</span>
                        <p>Pending</p>
                        <strong>{pendingOrders}</strong>
                    </div>

                    <div className="status-card">
                        <span>✅</span>
                        <p>Delivered</p>
                        <strong>{deliveredOrders}</strong>
                    </div>
                </div>
            </div>

            {/* Quick Links */}
            <div className="admin-section">
                <div className="section-header">
                    <h2>Quick Management</h2>
                </div>
                <div className="admin-quick-links">
                    <Link to="/admin/menu" className="admin-quick-link">
                        <span>🍽️</span>
                        <div>
                            <h3>Menu Management</h3>
                            <p>Add, edit, and toggle dish availability.</p>
                        </div>
                        <strong>→</strong>
                    </Link>

                    <Link to="/admin/orders" className="admin-quick-link">
                        <span>📦</span>
                        <div>
                            <h3>Order Management</h3>
                            <p>Review customer orders and update statuses.</p>
                        </div>
                        <strong>→</strong>
                    </Link>
                </div>
            </div>

        </div>
    );
}

export default Admin;