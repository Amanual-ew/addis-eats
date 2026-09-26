import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import useCartStore from "../store/cartStore";
import { FavoriteContext } from "../favorites/FavoriteContext";

function DishCard({ dish }) {
    const [added, setAdded] = useState(false);

    const navigate = useNavigate();

    const addItem = useCartStore(
        (state) => state.addItem
    );

    const {
        state: favoriteState,
        dispatch: favoriteDispatch
    } = useContext(FavoriteContext);

    // Check if the dish is in favorites
    const isFavorite = favoriteState.favorites.some(
        (item) => item.id === dish.id
    );

    // Check if admin deactivated the dish
    const isInactive = dish.status === "Inactive";

    function handleAdd(e) {
        e.stopPropagation();

        // Do not allow inactive dishes
        if (isInactive) return;

        addItem(dish);

        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 2000);
    }

    function handleFavorite(e) {
        e.stopPropagation();

        favoriteDispatch({
            type: "TOGGLE",
            payload: dish
        });
    }

    function handleCardClick() {
        navigate(`/menu/${dish.name}`);
    }

    return (
        <article
            className={`dish-card clickable-card ${
                isInactive ? "inactive-dish-card" : ""
            }`}
            onClick={handleCardClick}
        >

            {/* IMAGE */}
            <div className="dish-image-container">

                <img
                    src={dish.image}
                    alt={dish.name}
                />

                {/* FAVORITE */}
                <button
                    type="button"
                    className="favorite-button"
                    onClick={handleFavorite}
                    aria-label={
                        isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                >
                    {isFavorite ? "❤️" : "🤍"}
                </button>

                {/* SOLD OUT */}
                {isInactive && (
                    <div className="sold-out-banner">
                        SOLD OUT
                    </div>
                )}

            </div>

            {/* CONTENT */}
            <div className="dish-card-content">

                <h3>{dish.name}</h3>

                <p>{dish.description}</p>

                <strong>
                    {dish.price} ETB
                </strong>

                {/* ADD TO CART */}
                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={isInactive}
                    className={
                        isInactive
                            ? "disabled-btn"
                            : ""
                    }
                >
                    {isInactive
                        ? "Sold Out"
                        : added
                        ? "Added ✓"
                        : "Add to Cart"}
                </button>

            </div>

        </article>
    );
}

export default DishCard;

