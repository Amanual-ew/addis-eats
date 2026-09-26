import DishCard from "./DishCard";

function DishList({ dishes }) {

    if (dishes.length === 0) {
        return (
            <p className="empty-message">
                No dishes found.
            </p>
        );
    }

    return (
        <section className="dish-grid">

            {dishes.map((dish) => (
                <DishCard
                    key={dish.id}
                    dish={dish}
                />
            ))}

        </section>
    );
}

export default DishList;