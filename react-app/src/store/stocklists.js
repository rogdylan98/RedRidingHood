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

export const addStockList = (stockid, listid) => async(dispatch) => {
    const response = await fetch (`/api/lists/${listid}/${stockid}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            stockid
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getStockList(data));
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
          return ['Something went wrong, please try again']
      }
}

const initialState = {}

export default function reducer(state = initialState, action) {
    const newState = {...state}
    switch (action.type) {
        case GET_LISTS:
            newState['lists'] = action.data.lists
            return newState;
        default:
             return state
    }
}
