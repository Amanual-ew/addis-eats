import { useContext } from "react";
import { NavLink } from "react-router-dom";

import { FavoriteContext } from "./FavoriteContext";


function FavoriteBadge() {

    const { state } =
        useContext(FavoriteContext);


    const count =
        state.favorites.length;


    return (
        <NavLink
            to="/favorites"
            className={({ isActive }) =>
                `fav ${isActive ? "activeNav" : ""}`
            }
        >
            Favorites <span className="favSpan">{count}</span>
        </NavLink>
    );
}


export default FavoriteBadge;
