import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";

import CartBadge from "./cart/CartBadge";
import FavoriteBadge from "./favorites/FavoriteBadge";
import { useState } from "react";


import { Header } from "./Header/Header";


function Layout() {
    const[showUser, setShowUser]=useState(false);
    const { user, logout } = useAuth();

    
    return (
        <>
            
           <Header></Header>

            <main>
                <Outlet />
            </main>

            <footer className="footer">

                <div className="footer-content">

                    <div>
                        <h2>🍴 Addis Eats</h2>
                        <p>
                            Delicious food, delivered to you.
                        </p>
                    </div>

                    <div>
                        <h3>Quick Links</h3>

                        <Link to="/">
                            Home
                        </Link>

                        <Link to="/menu">
                            Menu
                        </Link>

                        <Link to="/favorites">
                            Favorites
                        </Link>

                        <Link to="/orders">
                            Orders
                        </Link>
                    </div>

                    <div>
                        <h3>Contact</h3>

                        <p>📍 Addis Ababa, Ethiopia</p>
                        <p>📞 +251 900 000 000</p>
                        <p>✉️ support@addiseats.com</p>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>
                        © 2026 Addis Eats. All rights reserved.
                    </p>
                </div>

            </footer>
        </>
    );
}

export default Layout;