import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./theme/ThemeContext";
import App from "./App";
import "./index.css";
import { FavoriteProvider } from "./favorites/FavoriteContext";
import { AuthProvider } from "./auth/AuthContext";

ReactDOM.createRoot(
        document.getElementById("root")
    ).render(

    <React.StrictMode>

        <ThemeProvider>
            <FavoriteProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </FavoriteProvider>
        </ThemeProvider>

    </React.StrictMode>
);