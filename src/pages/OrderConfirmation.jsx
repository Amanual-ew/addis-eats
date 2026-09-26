import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

function OrderConfirmation() {

    const { id } = useParams();

    

    return (
        <section className="confirmation-page">

            <div className="confirmation-card">

                <h2>🎉 Order Confirmed!</h2>

                <p>
                    Thank you for ordering from Addis Eats.
                </p>

                <p>
                    Your order number is:
                </p>

                <strong>
                    #{id}
                </strong>

                <p>
                    Estimated delivery time:
                    <br />
                    30–45 minutes
                </p>

                <div className="confirmation-links">

                    <Link
                        to="/orders"
                        className="confirm-link"
                    >
                        View My Orders
                    </Link>

                    <Link
                        to="/menu"
                        className="confirm-link"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>

        </section>
    );
}

export default OrderConfirmation;