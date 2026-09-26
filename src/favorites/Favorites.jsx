import { useContext } from "react";
import { Link } from "react-router-dom";

import { FavoriteContext } from "../favorites/FavoriteContext";
import DishCard from "../menu/DishCard";


function Favorites() {

    const { state, dispatch } =
        useContext(FavoriteContext);


    function clearFavorites() {

        dispatch({
            type: "CLEAR"
        });

    }


    if (state.favorites.length === 0) {

        return (
            <section className="favorites-page">

                <h2>My Favorites ❤️</h2>

                <p>
                    You haven't added any favorites yet.
                </p>

                <Link to="/menu">
                    Browse Menu
                </Link>

            </section>
        );
    }
    // const filterFav=state.favorites.map((dish)=>{
    //     dish.stau
    // })
    return (
        <section className="favorites-page">

            <div className="favorites-header">

                <h2>My Favorites ❤️</h2>

                <button   onClick={clearFavorites}>
                    Clear Favorites
                </button>

            </div>


            <div className="dish-grid">

                {state.favorites.map((dish) => (

                    <DishCard
                        key={dish.id}
                        dish={dish}
                    />

                ))}

            </div>

        </section>
    );
}


export default Favorites;