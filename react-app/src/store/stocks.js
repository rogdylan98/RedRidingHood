const ADD_STOCK = 'stocks/ADD_STOCK';
const GET_STOCKS = 'stocks/GET_STOCKS';
const ADD_STOCK_LIST = 'stocks/ADD_STOCK_LIST';

const addStock = (stock) => ({
    type: ADD_STOCK,
    payload: stock
});

const getStocks = (data, listid) => ({
    type: GET_STOCKS,
    payload: data,
    listid
})


const initialState = {};

export const getStock = (ticker) => async(dispatch) => {
    const response = await fetch (`/api/stocks/${ticker}`);
    if (response.ok) {
        const stock = await response.json();
        dispatch(addStock(stock))
    }
}

export const getAllStocks = () => async() => {
    const response = await fetch (`/api/stocks`);
    if (response.ok){
        const stocks = await response.json();
        return stocks
    }
}

export const getStocksinList = (listid) => async(dispatch) => {
    const response = await fetch(`/api/lists/${listid}/stocks`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getStocks(data, listid));
    }
}

export const deleteStockinList = (stockid, listid) => async() => {
    const response = await fetch(`/api/lists/${listid}/${stockid}`, {
        method: "DELETE",
    })

    if (response.ok) {
        return
    } else {
        return ['An error occured. Please try again']
    }
}

export const searchStocks = (substring) => async() => {
    const response = await fetch(`/api/stocks/search/${substring}`);
    if (response.ok){
        const stocklist = await response.json();
        return stocklist
    } else {
        return {}
    }
}


export default function reducer(state = initialState, action) {
    const newState = {...state};

    switch (action.type) {
        case ADD_STOCK:
        case ADD_STOCK_LIST:
            newState[action.payload.ticker] = action.payload;
            return newState;
        case GET_STOCKS:
            newState[action.listid] = action.payload;
            return newState;
        default:
            return state;
    }
}
