const ADD_STOCK = 'stocks/ADD_STOCK';

const addStock = (stock) => ({
    type: ADD_STOCK,
    payload: stock
});

const initialState = {};

export const getStock = (ticker) => async(dispatch) => {
    const response = await fetch (`/api/stocks/${ticker}`);
    if (response.ok) {
        const stock = await response.json();
        dispatch(addStock(stock))
    }
}

export default function reducer(state = initialState, action) {
    const newState = {...state};

    switch (action.type) {
        case ADD_STOCK:
            newState[action.payload.ticker] = action.payload;
            return newState;
        default:
            return state
    }
}
