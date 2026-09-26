import { useSearchParams } from "react-router-dom";

function CategoryBar() {

    const [searchParams, setSearchParams] = useSearchParams();

    const selectedCategory = searchParams.get("category") || "All";

    const categories = [
        "All",
        "Ethiopian",
        "Pizza",
        "Burgers",
        "Drinks"
    ];

    function handleCategory(category) {

        if (category === "All") {
            setSearchParams({});
        } else {
            setSearchParams({
                category: category
            });
        }
    }

    return (
        <div className="category-bar">

            {categories.map((category) => (

                <button
                    key={category}
                    onClick={() => handleCategory(category)}
                    className={
                        selectedCategory === category
                            ? "active"
                            : ""
                    }
                >
                    {category}
                </button>

            ))}

        </div>
    );
}

export default CategoryBar;