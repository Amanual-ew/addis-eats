
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import useCartStore from "../store/cartStore";

function Checkout() {
    const { user } = useAuth();

    const items = useCartStore((state) => state.items);
    const clearCart = useCartStore((state) => state.clearCart);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        area: "",
        instructions: ""
    });

    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const deliveryFee = 50;
    const grandTotal = subtotal + deliveryFee;

    function validateField(name, value) {
        if (name === "name") {
            if (!value.trim()) {
                return "Name is required";
            }
        }

        if (name === "phone") {
            if (!value.trim()) {
                return "Phone number is required";
            }

            if (!/^09\d{8}$/.test(value)) {
                return "Phone must be 10 digits and start with 09";
            }
        }

        if (name === "area") {
            if (!value.trim()) {
                return "Delivery area is required";
            }
        }

        return "";
    }

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setTouched((prev) => ({
            ...prev,
            [name]: true
        }));

        const error = validateField(name, value);

        setErrors((prev) => ({
            ...prev,
            [name]: error
        }));
    }

    function getInputClass(name) {
        if (!touched[name]) return "";

        return errors[name]
            ? "input-invalid"
            : "input-valid";
    }

    function validate() {
        const newErrors = {};

        Object.keys(formData).forEach((name) => {
            const error = validateField(name, formData[name]);

            if (error) {
                newErrors[name] = error;
            }
        });

        return newErrors;
    }

    function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validate();

        setErrors(validationErrors);
        setTouched({
            name: true,
            phone: true,
            area: true
        });

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        const order = {
            id: Date.now(),
            userId: user.id,
            items: items,
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            total: grandTotal,

            customer: {
                name: formData.name,
                phone: formData.phone,
                area: formData.area,
                instructions: formData.instructions
            },

            status: "Pending",
            date: new Date().toLocaleString()
        };

        const existingOrders =
            JSON.parse(
                localStorage.getItem("addis-eats-orders")
            ) || [];

        localStorage.setItem(
            "addis-eats-orders",
            JSON.stringify([...existingOrders, order])
        );

        clearCart();

        navigate(`/order-confirmation/${order.id}`);
    }

    if (items.length === 0) {
        return (
            <section className="checkout-page">
                <h2>Checkout</h2>

                <p>Your cart is empty.</p>

                <Link to="/menu">
                    Browse Menu
                </Link>
            </section>
        );
    }

    return (
        <section className="checkout-page">
            <h2>Checkout</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Full Name</label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={getInputClass("name")}
                        placeholder="Enter your full name"
                    />

                    {errors.name && (
                        <p className="form-error">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>

                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={getInputClass("phone")}
                        placeholder="09XXXXXXXX"
                    />

                    {errors.phone && (
                        <p className="form-error">
                            {errors.phone}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="area">Delivery Area</label>

                    <input
                        id="area"
                        name="area"
                        type="text"
                        value={formData.area}
                        onChange={handleChange}
                        className={getInputClass("area")}
                        placeholder="e.g. Bole"
                    />

                    {errors.area && (
                        <p className="form-error">
                            {errors.area}
                        </p>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="instructions">
                        Special Instructions
                    </label>

                    <textarea
                        id="instructions"
                        name="instructions"
                        value={formData.instructions}
                        onChange={handleChange}
                        placeholder="Any special delivery instructions?"
                    />
                </div>

                <div className="checkout-summary">
                    <h3>Order Summary</h3>

                    <p>
                        Subtotal: <strong>{subtotal} ETB</strong>
                    </p>

                    <p>
                        Delivery Fee: <strong>{deliveryFee} ETB</strong>
                    </p>

                    <h3>Total: {grandTotal} ETB</h3>

                    <p>Estimated delivery: 30–45 minutes</p>
                </div>

                <button type="submit">
                    Confirm Order
                </button>
            </form>
        </section>
    );
}

export default Checkout;