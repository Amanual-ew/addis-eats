
import { useEffect, useState } from "react";


function MenuManagement() {
    const [dishes, setDishes] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "",
        image: "",
        description: ""
    });

    // Load menu data
    useEffect(() => {
        async function loadMenu() {
            try {
                const response = await fetch("/menu-data.json");

                if (!response.ok) {
                    throw new Error("Failed to load menu");
                }

                const data = await response.json();
                const savedMenu = localStorage.getItem("addis-eats-menu");

                setDishes(
                    savedMenu
                        ? JSON.parse(savedMenu)
                        : data.map(dish => ({
                              ...dish,
                              status: "Active"
                          }))
                );
            } catch (error) {
                console.error(error);
            }
        }

        loadMenu();
    }, []);

    // Save menu to localStorage
    function saveMenu(updatedDishes) {
        setDishes(updatedDishes);

        localStorage.setItem(
            "addis-eats-menu",
            JSON.stringify(updatedDishes)
        );
    }

    // Handle form input changes
    function handleChange(event) {
        const { name, value } = event.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    // Reset and close form
    function resetForm() {
        setFormData({
            name: "",
            price: "",
            category: "",
            image: "",
            description: ""
        });

        setEditingId(null);
        setShowForm(false);
    }

    // Add or update dish
    function handleSubmit(event) {
        event.preventDefault();

        if (
            !formData.name.trim() ||
            !formData.category.trim() ||
            !formData.price ||
            Number(formData.price) <= 0
        ) {
            alert("Enter a name, category, and valid price.");
            return;
        }

        let updatedDishes;

        if (editingId !== null) {
            // Update existing dish
            updatedDishes = dishes.map(dish =>
                dish.id === editingId
                    ? {
                          ...dish,
                          ...formData,
                          price: Number(formData.price)
                      }
                    : dish
            );
        } else {
            // Create new dish
            const newDish = {
                ...formData,
                id: Date.now(),
                price: Number(formData.price),
                status: "Active"
            };

            updatedDishes = [...dishes, newDish];
        }

        saveMenu(updatedDishes);
        resetForm();
    }

    // Open form with dish information
    function editDish(dish) {
        setEditingId(dish.id);

        setFormData({
            name: dish.name || "",
            price: String(dish.price ?? ""),
            category: dish.category || "",
            image: dish.image || "",
            description: dish.description || ""
        });

        setShowForm(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Delete dish
    function deleteDish(id) {
        if (!window.confirm("Delete this dish?")) return;

        saveMenu(dishes.filter(dish => dish.id !== id));

        if (editingId === id) {
            resetForm();
        }
    }

    // Activate or deactivate dish
    function toggleStatus(dish) {
        const updatedDishes = dishes.map(item =>
            item.id === dish.id
                ? {
                      ...item,
                      status:
                          item.status === "Inactive"
                              ? "Active"
                              : "Inactive"
                  }
                : item
        );

        saveMenu(updatedDishes);
    }

    return (
        <section className="admin-page">
            <h2>Menu Management</h2>

            {/* Add Dish Form Card */}
            <div className="admin-card">
                <div className="admin-card-header">
                    <h3>
                        {editingId !== null
                            ? "Edit Dish"
                            : "Menu Actions"}
                    </h3>

                    <button
                        type="button"
                        className="add-dish-button"
                        onClick={() => {
                            if (showForm) {
                                resetForm();
                            } else {
                                setShowForm(true);
                            }
                        }}
                    >
                        {showForm ? "Close Form" : "+ Add Dish"}
                    </button>
                </div>

                {/* Form appears only when showForm is true */}
                {showForm && (
                    <form
                        onSubmit={handleSubmit}
                        className="admin-dish-form"
                    >
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Dish name"
                            required
                        />

                        <input
                            name="price"
                            type="number"
                            min="1"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Price (ETB)"
                            required
                        />

                        <input
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Category"
                            required
                        />

                        <input
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Image URL (optional)"
                        />

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Description (optional)"
                        />

                        <button type="submit">
                            {editingId !== null
                                ? "Save Changes"
                                : "Add Dish"}
                        </button>

                        <button
                            type="button"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </div>

            {/* All Dishes */}
            <div className="admin-card">
                <h3>All Dishes ({dishes.length})</h3>

                {dishes.length === 0 ? (
                    <p>No dishes found.</p>
                ) : (
                    <div className="admin-orders-list">
                        {dishes.map(dish => (
                            <article
                                className="admin-order"
                                key={dish.id}
                            >
                                <div>
                                    <strong>{dish.name}</strong>

                                    <p>
                                        Price: {dish.price} ETB
                                    </p>

                                    <p>
                                        Category: {dish.category}
                                    </p>

                                    <p>
                                        Status: {dish.status || "Active"}
                                    </p>
                                </div>

                                <div className="admin-dish-actions">
                                    <button
                                        type="button"
                                        onClick={() => editDish(dish)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => toggleStatus(dish)}
                                    >
                                        {dish.status === "Inactive"
                                            ? "Activate"
                                            : "Deactivate"}
                                    </button>

                                    <button
                                        type="button"
                                        className="delete-dish-button"
                                        onClick={() => deleteDish(dish.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default MenuManagement;