function CartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove
}) {

    return (
        <article className="cart-item">

            <img
                src={item.image}
                alt={item.name}
            />

            <div>

                <h3>{item.name}</h3>

                <p>
                    {item.price} ETB
                </p>


                <div className="quantity-controls">

                    <button
                        onClick={() =>
                            onDecrease(item.id)
                        }
                    >
                        -
                    </button>


                    <span>
                        {item.quantity}
                    </span>


                    <button 
                        onClick={() =>
                            onIncrease(item.id)
                        }
                    >
                        +
                    </button>

                </div>


                <button className="remove_butt"
                    onClick={() =>
                        onRemove(item.id)
                    }
                >
                    Remove
                </button>

            </div>

        </article>
    );
}

export default CartItem;