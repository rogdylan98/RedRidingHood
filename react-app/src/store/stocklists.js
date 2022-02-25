const GET_LISTS = 'stocklists/GET_STOCKS';


const getStockList = (data) => ({
    type: GET_LISTS,
    data
})

export const getStockLists = (ticker) => async(dispatch) => {
    const response = await fetch (`/api/lists/${ticker}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getStockList(data))
    }
}

const initialState = {}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case GET_LISTS:
            state['lists'] = action.data.lists
            return state;
        default:
             return state
    }
}
