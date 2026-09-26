import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Orders() {

    const [orders, setOrders] = useState([]);

    const { user } = useAuth();

    useEffect(() => {

        const allOrders =
            JSON.parse(
                localStorage.getItem("addis-eats-orders")
            ) || [];

        const userOrders = allOrders.filter(
            order => order.userId === user.id
        );

        setOrders(userOrders);

    }, [user]);


    if (orders.length === 0) {

        return (
            <section className="orders-page">

                <h2>My Orders</h2>

                <p>
                    You haven't placed any orders yet.
                </p>

                <Link to="/menu">
                    Browse Menu
                </Link>

            </section>
        );
    }


    return (
        <section className="orders-page">

            <h2>My Orders</h2>

            <div className="orders-list">

                {orders
                    .slice()
                    .reverse()
                    .map((order) => (

                        <article
                            className="order-card"
                            key={order.id}
                        >

                            <div className="order-header">

                                <h3>
                                    Order #{order.id}
                                </h3>

                                <span className="status-span">
                                    {order.status}
                                </span>

                            </div>


                            <p>
                                <strong>
                                    Customer:
                                </strong>{" "}
                                {order.customer.name}
                            </p>


                            <p>
                                <strong>
                                    Delivery Area:
                                </strong>{" "}
                                {order.customer.area}
                            </p>


                            <p>
                                <strong>
                                    Phone:
                                </strong>{" "}
                                {order.customer.phone}
                            </p>


                            <div className="order-items">

                                <h4>Items</h4>

                                {order.items.map((item) => (

                                    <p key={item.id}>

                                        {item.name} × {item.quantity}

                                        {" — "}

                                        {item.price * item.quantity} ETB

                                    </p>

                                ))}

                            </div>


                            <div className="order-total">

                                <strong>
                                    Subtotal:
                                </strong>

                                <span>
                                    {order.subtotal} ETB
                                </span>


                                <strong>
                                    Delivery:
                                </strong>

                                <span>
                                    {order.deliveryFee} ETB
                                </span>


                                <strong>
                                    Total:
                                </strong>

                                <span>
                                    {order.total} ETB
                                </span>

                            </div>

                        </article>

                    ))}

            </div>

        </section>
    );
}

export default Orders;