import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, Outlet, useLocation } from "react-router-dom";
import './admin.css';

function AdminLayout() {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();

    // Get dynamic header title based on current path
    const getPageTitle = (pathname) => {
        if (pathname === "/admin") return "Dashboard";
        if (pathname.startsWith("/admin/menu")) return "Menu Management";
        if (pathname.startsWith("/admin/orders")) return "Order Management";
        return "Admin Panel";
    };

    return (
        <div className="admin-layout">
            
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div className="admin-overlay" onClick={() => setSidebarOpen(false)} />
            )}

            {/* SIDEBAR */}
            <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="admin-logo">
                    <div className="admin-logo-icon">🍴</div>
                    <div>
                        <h2>Addis Eats</h2>
                        <span>ADMIN PANEL</span>
                    </div>
                </div>

                <nav className="admin-nav" onClick={() => setSidebarOpen(false)}>
                    <p className="admin-nav-title">MAIN MENU</p>

                    <Link
                        to="/admin"
                        className={location.pathname === "/admin" ? "admin-nav-link active" : "admin-nav-link"}
                    >
                        <span>📊</span> Dashboard
                    </Link>

                    <Link
                        to="/admin/menu"
                        className={location.pathname.startsWith("/admin/menu") ? "admin-nav-link active" : "admin-nav-link"}
                    >
                        <span>🍽️</span> Menu Management
                    </Link>

                    <Link
                        to="/admin/orders"
                        className={location.pathname.startsWith("/admin/orders") ? "admin-nav-link active" : "admin-nav-link"}
                    >
                        <span>📦</span> Order Management
                    </Link>

                    <p className="admin-nav-title">WEBSITE</p>
                    <Link to="/" className="admin-nav-link">
                        <span>🏠</span> Back to Website
                    </Link>
                </nav>

                <div className="admin-sidebar-bottom">
                    <div className="admin-online">
                        <span></span> System Online
                    </div>
                    <button className="admin-logout" onClick={logout}>🚪 Logout</button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <main className="admin-main">
                <header className="admin-topbar">
                    <div className="admin-topbar-left">
                        <button className="admin-menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                            ☰
                        </button>
                        <div>
                            <p>Admin Panel</p>
                            <h1>{getPageTitle(location.pathname)}</h1>
                        </div>
                    </div>

                    <div className="admin-user">
                        <div className="admin-avatar">A</div>
                        <div>
                            <strong>Aman</strong>
                            <span>Administrator</span>
                        </div>
                    </div>
                </header>

                <section className="admin-content">
                    <Outlet />
                </section>
            </main>

        </div>
    );
}

export default AdminLayout;