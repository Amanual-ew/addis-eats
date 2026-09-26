import { createContext, useEffect, useReducer } from "react";

const initialState = {
    favorites: []
};


function favoriteReducer(state, action) {

    switch (action.type) {

        case "TOGGLE": {

            const dish = action.payload;

            const exists = state.favorites.some(
                (item) => item.id === dish.id
            );

            if (exists) {
                return {
                    ...state,
                    favorites: state.favorites.filter(
                        (item) => item.id !== dish.id
                    )
                };
            }

            return {
                ...state,
                favorites: [
                    ...state.favorites,
                    dish
                ]
            };
        }


        case "CLEAR":

            return initialState;


        default:
            return state;
    }
}


function getInitialState() {

    const savedFavorites =
        localStorage.getItem("addis-eats-favorites");

    if (!savedFavorites) {
        return initialState;
    }

    try {
        return JSON.parse(savedFavorites);
    } catch (error) {
        console.log("Could not load favorites");
        return initialState;
    }
}


export const FavoriteContext =
    createContext(null);


export function FavoriteProvider({ children }) {

    const [state, dispatch] = useReducer(
        favoriteReducer,
        initialState,
        getInitialState
    );


    useEffect(() => {

        localStorage.setItem(
            "addis-eats-favorites",
            JSON.stringify(state)
        );

    }, [state]);


    return (
        <FavoriteContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </FavoriteContext.Provider>
    );
}