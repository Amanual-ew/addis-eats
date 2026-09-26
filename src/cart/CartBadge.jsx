import { NavLink } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import useCartStore from "../store/cartStore";

function CartBadge() {
    const items = useCartStore((state) => state.items);

    const count = items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <NavLink
            to="/cart"
            className={({ isActive }) =>
                `fav ${isActive ? "activeNav" : ""}`
            }
        >
            <ShoppingCart className="cart-icon" />

            <span className="favSpan">
                {count}
            </span>
        </NavLink>
    );
}

export default CartBadge;