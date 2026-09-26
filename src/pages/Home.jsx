import { Link } from "react-router-dom";
import { useMemo } from "react";
import useFetch from "../hooks/useFetch";
import DishCard from "../menu/DishCard";

function Home() {
    const {
        data: dishes = [],
        loading,
        error
    } = useFetch("/menu-data.json");

    // Get the 4 dishes with the shortest cooking times
    const fastestDishes = useMemo(() => {
        return [...dishes]
            .filter(
                (dish) =>
                    dish.cookingTime != null &&
                    Number(dish.cookingTime) > 0 &&
                    dish.status !== "Inactive"
            )
            .sort(
                (a, b) =>
                    Number(a.cookingTime) -
                    Number(b.cookingTime)
            )
            .slice(0, 3);
    }, [dishes]);

    return (
        <div className="home-page">

            {/* Hero */}
            <section className="hero">
                <div className="hero-content">
                    <p className="hero-label">
                        Welcome to Addis Eats 🍴
                    </p>

                    <h1>
                        Delicious food,
                        <br />
                        delivered to you.
                    </h1>

                    <p>
                        Discover your favorite Ethiopian
                        dishes and more, all in one place.
                    </p>

                    <Link to="/menu" className="hero-button">
                        Explore Menu
                    </Link>
                </div>

                <div className="hero-image">
                    <img
                        src="home-image.png"
                        alt="Delicious Ethiopian food"
                    />
                </div>
            </section>

            {/* Categories */}
            <section className="home-section">
                <div className="section-heading">
                    <h2>Explore Categories</h2>

                    <Link to="/menu">
                        View all
                    </Link>
                </div>

                <div className="category-cards">
                    <Link
                        to="/menu?category=Ethiopian"
                        className="category-card"
                    >
                        <span>🍛</span>
                        <h3>Ethiopian</h3>
                        <p>Traditional favorites</p>
                    </Link>

                    <Link
                        to="/menu?category=Pizza"
                        className="category-card"
                    >
                        <span>🍕</span>
                        <h3>Pizza</h3>
                        <p>Hot and delicious</p>
                    </Link>

                    <Link
                        to="/menu?category=Burgers"
                        className="category-card"
                    >
                        <span>🍔</span>
                        <h3>Burgers</h3>
                        <p>Fresh and tasty</p>
                    </Link>

                    <Link
                        to="/menu?category=Drinks"
                        className="category-card"
                    >
                        <span>🥤</span>
                        <h3>Drinks</h3>
                        <p>Refresh yourself</p>
                    </Link>
                </div>
            </section>

            {/* Why Addis Eats */}
            <section className="why-section">
                <h2>Why Addis Eats?</h2>

                <div className="feature-grid">
                    <div className="feature-card">
                        <span>🚀</span>
                        <h3>Fast Delivery</h3>
                        <p>
                            Get your food delivered
                            quickly and conveniently.
                        </p>
                    </div>

                    <div className="feature-card">
                        <span>🍴</span>
                        <h3>Great Food</h3>
                        <p>
                            Enjoy delicious meals from
                            your favorite categories.
                        </p>
                    </div>

                    <div className="feature-card">
                        <span>❤️</span>
                        <h3>Easy Ordering</h3>
                        <p>
                            Find your food, add it to
                            your cart and order easily.
                        </p>
                    </div>
                </div>
            </section>

            {/* Quickest Cooking Time Cards */}
            <section className="home-cta">
                <div className="section-heading">
                    <div>
                        <h2>⚡ Quick Bites</h2>
                        <p>
                            Delicious dishes ready in less time!
                        </p>
                    </div>

                    <Link to="/menu">
                        View all
                    </Link>
                </div>

                {loading && (
                    <p>Loading quick bites...</p>
                )}

                {error && (
                    <p>Couldn't load dishes right now.</p>
                )}

                {!loading &&
                    !error &&
                    fastestDishes.length === 0 && (
                        <p>
                            No dishes with cooking times available yet.
                        </p>
                    )}

                {!loading &&
                    !error &&
                    fastestDishes.length > 0 && (
                        <div className="dish-grid">
                            {fastestDishes.map((dish) => (
                                <div
                                    className="quick-dish-card"
                                    key={dish.id}
                                >
                                    <DishCard dish={dish} />

                                    <p className="cooking-time">
                                        ⏱️ Ready in{" "}
                                        {dish.cookingTime} min
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                <Link
                    to="/menu"
                    className="hero-button"
                >
                    Explore Menu
                </Link>
            </section>

        </div>
    );
}

export default Home;