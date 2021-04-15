export const initialState = {
    basket: [],
    user: null,
};

export const getBasketTotal = (basket) => {
    return basket?.reduce((total, item) => total = total + item.price, 0);
};

export const getUserName = (user) => {
    const email = user?.email ?? "Guest";
    const firstName = email.split("@")[0];
    return firstName || "Guest";
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        case 'EMPTY_BASKET':
            return {
                ...state,
                basket: [], 
            };
        case 'REMOVE_FROM_BASKET':
            let newBasket = [...state.basket];
            newBasket.splice(action.item, 1);
            return {
                ...state,
                basket: newBasket,
            };
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        default:
            return state;
    }
};

export default reducer;