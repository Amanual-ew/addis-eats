import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import useFetch from "../hooks/useFetch";
import DishList from "./DishList";
import CategoryBar from "./CategoryBar";
import Loading from "../ui/Loading";


function Menu() {

    const {
        data: dishes,
        loading,
        error
    } = useFetch("/menu-data.json");


    const [searchParams] = useSearchParams();

    const [searchTerm, setSearchTerm] = useState("");

    const [menuDishes, setMenuDishes] = useState([]);


    // Load saved menu
    useEffect(() => {

        if (!dishes) return;

        const savedMenu =
            localStorage.getItem("addis-eats-menu");


        setMenuDishes(
    savedMenu
        ? JSON.parse(savedMenu)
        : dishes
);

    }, [dishes]);


    const selectedCategory =
        searchParams.get("category") || "All";


    // Loading
    if (loading) {
        return (
            <section>
                <h2>Our Menu</h2>

                <Loading
                    message="Loading delicious food..."
                />
            </section>
        );
    }


    // Error
    if (error) {
        return (
            <section className="error-state">

                <h2>Oops! 😕</h2>

                <p>
                    We couldn't load the menu.
                </p>

                <small>
                    {error}
                </small>

            </section>
        );
    }


    // Category filter
    // IMPORTANT:
    // Do NOT remove inactive dishes here.
    // DishCard will show SOLD OUT.
    const categoryDishes =
        selectedCategory === "All"
            ? menuDishes
            : menuDishes.filter(
                dish =>
                    dish.category === selectedCategory
            );


    // Search filter
    const filteredDishes =
        categoryDishes.filter((dish) =>
            dish.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );


    return (
        <section className="menu-page">

            <div className="lower-header">

                <h2>Our Menu</h2>


                {/* Search */}
                <div className="search-box">

                    <input
                        type="text"
                        placeholder="Search for food..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                    />

                </div>

            </div>


            {/* Categories */}
            <CategoryBar />


            {/* Results */}
            <DishList
                dishes={filteredDishes}
            />

        </section>
    );
}


export default Menu;