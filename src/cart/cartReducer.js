const initialState = {
    items: [],
    total: 0
};

function calculateTotal(items) {
    return items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
}

export function cartReducer(state, action) {

    switch (action.type) {

        case "ADD": {
            const dish = action.payload;

            const existingItem = state.items.find(
                (item) => item.id === dish.id
            );

            let updatedItems;

            if (existingItem) {

                updatedItems = state.items.map((item) =>
                    item.id === dish.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1
                        }
                        : item
                );

            } else {

                updatedItems = [
                    ...state.items,
                    {
                        ...dish,
                        quantity: 1
                    }
                ];

            }

            return {
                ...state,
                items: updatedItems,
                total: calculateTotal(updatedItems)
            };
        }


        case "INCREASE": {

            const updatedItems = state.items.map((item) =>
                item.id === action.payload
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            );

            return {
                ...state,
                items: updatedItems,
                total: calculateTotal(updatedItems)
            };
        }


        case "DECREASE": {

            const updatedItems = state.items
                .map((item) =>
                    item.id === action.payload
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item
                )
                .filter((item) => item.quantity > 0);

            return {
                ...state,
                items: updatedItems,
                total: calculateTotal(updatedItems)
            };
        }


        case "REMOVE": {

            const updatedItems = state.items.filter(
                (item) => item.id !== action.payload
            );

            return {
                ...state,
                items: updatedItems,
                total: calculateTotal(updatedItems)
            };
        }


        case "CLEAR":

            return {
                items: [],
                total: 0
            };


        default:
            return state;
    }
}

export { initialState };