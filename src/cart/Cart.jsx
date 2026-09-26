
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import CartItem from "./CartItem";

function Cart() {
    const items = useCartStore((state) => state.items);
    const increase = useCartStore((state) => state.increase);
    const decrease = useCartStore((state) => state.decrease);
    const removeItem = useCartStore((state) => state.removeItem);
    const clearCart = useCartStore((state) => state.clearCart);

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (items.length === 0) {
        return (
            <section className="cart-page">
                <h2>Your Cart 🛒</h2>
                <p>Your cart is empty.</p>

                <Link to="/menu">
                    Browse Menu
                </Link>
            </section>
        );
    }

    return (
        <section className="cart-page">
            <h2>Your Cart 🛒</h2>

            <div className="cart-items">
                {items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onIncrease={increase}
                        onDecrease={decrease}
                        onRemove={removeItem}
                    />
                ))}
            </div>

            <div className="cart-summary">
                <h3>Total: {total} ETB</h3>

                <Link to="/checkout">
                    <button>
                        Proceed to Checkout
                    </button>
                </Link>

                <button onClick={clearCart}>
                    Clear Cart
                </button>
            </div>
        </section>
    );
}

export default Cart;