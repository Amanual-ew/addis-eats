
import { useEffect, useState } from "react";

function OrderManagement() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders =
            JSON.parse(localStorage.getItem("addis-eats-orders")) || [];

        setOrders(savedOrders);
    }, []);

    function updateOrderStatus(orderId, newStatus) {
        const updatedOrders = orders.map(order =>
            order.id === orderId
                ? { ...order, status: newStatus }
                : order
        );

        setOrders(updatedOrders);

        localStorage.setItem(
            "addis-eats-orders",
            JSON.stringify(updatedOrders)
        );
    }

    return (
        <section className="admin-page">
            <h2>Order Management</h2>

            <div className="admin-card">
                <h3>All Customer Orders ({orders.length})</h3>

                {orders.length === 0 ? (
                    <p>No orders have been placed yet.</p>
                ) : (
                    <div className="admin-orders-list">
                        {orders
                            .slice()
                            .reverse()
                            .map(order => (
                                <article
                                    className="admin-order"
                                    key={order.id}
                                >
                                    <div>
                                        <strong>Order #{order.id}</strong>

                                        <p>
                                            Customer:{" "}
                                            {order.customer?.name || "Unknown"}
                                        </p>

                                        <p>
                                            Phone:{" "}
                                            {order.customer?.phone || "N/A"}
                                        </p>

                                        <p>
                                            Area:{" "}
                                            {order.customer?.area || "N/A"}
                                        </p>

                                        <p>
                                            Total: {order.total} ETB
                                        </p>

                                        <p>
                                            Status: {order.status || "Pending"}
                                        </p>

                                        <p>
                                            Date: {order.date || "N/A"}
                                        </p>
                                    </div>

                                    <label>
                                        Update Status

                                        <select
                                            value={order.status || "Pending"}
                                            onChange={event =>
                                                updateOrderStatus(
                                                    order.id,
                                                    event.target.value
                                                )
                                            }
                                        >
                                            <option value="Pending">
                                                Pending
                                            </option>

                                            <option value="Confirmed">
                                                Confirmed
                                            </option>

                                            <option value="Preparing">
                                                Preparing
                                            </option>

                                            <option value="Ready">
                                                Ready
                                            </option>

                                            <option value="Out for Delivery">
                                                Out for Delivery
                                            </option>

                                            <option value="Delivered">
                                                Delivered
                                            </option>

                                            <option value="Cancelled">
                                                Cancelled
                                            </option>
                                        </select>
                                    </label>
                                </article>
                            ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default OrderManagement;