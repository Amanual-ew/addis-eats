import { Link ,NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../theme/ThemeContext";
import { Sun, Moon } from "lucide-react";
import CartBadge from "../cart/CartBadge";
import FavoriteBadge from "../favorites/FavoriteBadge";
import { useState } from "react";
import AdminLayout from "../admin/AdminLayout";

export function Header() {
    const [showUser, setShowUser] = useState(false);
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="site-header">
            <div className="header-container">

                <Link to="/" className="logo">
                    🍴 Addis Eats
                </Link>

                {user?.role === "admin" ? (

                    <><div>
                    <Link to="./admin" className="dashboard-link">Dashboard</Link>
                    <button
                        onClick={logout}
                        className="logout-button"
                    >
                        Logout
                    </button>
                    </div>
                    </>

                ) : (

                    /* Customer / guest navigation */
                    <nav className="main-nav">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive ? "activeNav" : ""
                            }
                        >
                            Home
                        </NavLink>

                        <NavLink
                            to="/menu"
                            className={({ isActive }) =>
                                isActive ? "activeNav" : ""
                            }
                        >
                            Menu
                        </NavLink>

                        <FavoriteBadge />

                       <NavLink
                            to="/orders"
                            className={({ isActive }) =>
                                isActive ? "activeNav" : ""
                            }
                        >
                            Orders
                        </NavLink>

                        <CartBadge />
                    <button
                        type="button"
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {theme === "light" ? (
                            <Moon className="theme-icon" />
                        ) : (
                            <Sun className="theme-icon" />
                        )}
                    </button>

                        <div className="account-area">
                            {user ? (
                                <span className="user-name">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowUser(!showUser)
                                        }
                                    >
                                        👤
                                    </button>

                                    {showUser && (
                                        <div className="user-name-container">
                                            {user.name}
                                            <button
                                                onClick={logout}
                                                className="logout-button"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </span>
                            ) : (
                                <>
                                    <NavLink
                                        to="/login"
                                        className={({ isActive }) =>
                                        isActive ? "activeNav" : ""}
                            
                                    >
                                        Login
                                    </NavLink>

                                    <NavLink
                                        to="/register"
                                        className={({ isActive }) =>
                                            isActive ? "activeNav" : ""
                                        }  >
                                        Register
                                    </NavLink>
                                </>
                            )}
                        </div>

                    </nav>
                )}

            </div>
        </header>
    );
}