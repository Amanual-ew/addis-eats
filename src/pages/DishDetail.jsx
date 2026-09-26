import { Link, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useCartStore from "../store/cartStore";
import { useState, useEffect } from "react";

function DishDetail() {
    const addItem = useCartStore((state) => state.addItem);

    const { name } = useParams();

    const [added, setAdded] = useState(false);
    const [menuDishes, setMenuDishes] = useState([]);

    const {
        data: dishes,
        loading,
        error
    } = useFetch("/menu-data.json");

    useEffect(() => {
        if (!dishes) return;

        const savedMenu =
            localStorage.getItem("addis-eats-menu");

        setMenuDishes(
            savedMenu
                ? JSON.parse(savedMenu)
                : dishes.map((dish) => ({
                    ...dish,
                    status: "Active"
                }))
        );
    }, [dishes]);

    if (loading) {
        return (
            <section>
                <p>Loading dish...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section>
                <h2>Something went wrong</h2>
                <p>{error}</p>

                <Link to="/menu">
                    Back to Menu
                </Link>
            </section>
        );
    }

    const dish = menuDishes.find(
        (item) => item.name === name
    );

    if (!dish) {
        return (
            <section>
                <h2>Dish Not Found</h2>

                <p>
                    We couldn't find that dish.
                </p>

                <Link to="/menu">
                    Back to Menu
                </Link>
            </section>
        );
    }

    const isInactive = dish.status === "Inactive";

    function handleAdd() {
        if (isInactive) return;

        addItem(dish);
        setAdded(true);

        setTimeout(() => {
            setAdded(false);
        }, 2000);
    }

    return (
        <section className="dish-detail">

            <div className="dish-detail-image">

                <img
                    src={dish.image}
                    alt={dish.name}
                />

                {isInactive && (
                    <div className="sold-out-detail">
                        SOLD OUT
                    </div>
                )}

            </div>

            <div className="dish-detail-content">

                <p className="dish-category">
                    {dish.category}
                </p>

                <h2>{dish.name}</h2>

                <p>{dish.description}</p>

                <div className="dish-cooking-time">
                    <p>⏱️ Estimated cooking time</p>

                    <strong>
                        {dish.cookingTime ?? "Not available"}

                        {dish.cookingTime != null
                            ? " min"
                            : ""}
                    </strong>
                </div>

                <h3>
                    {dish.price} ETB
                </h3>

                <div>

                    <h3>Ingredients</h3>

                    <ul>
                        {(dish.ingredients || []).map(
                            (ingredient) => (
                                <li key={ingredient}>
                                    {ingredient}
                                </li>
                            )
                        )}
                    </ul>

                </div>

                <button
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

                <br />

                <Link to="/menu">
                    ← Back to Menu
                </Link>

            </div>

        </section>
    );
}

export default DishDetail;