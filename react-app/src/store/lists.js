const ADD_LIST = 'lists/ADD_LIST';
const REMOVE_LIST = 'lists/REMOVE_LIST';
const GET_LISTS = 'lists/GET_LISTS'

const addList = (list) => ({
  type: ADD_LIST,
  payload: list
});

const getLists = (lists) => ({
    type: GET_LISTS,
    payload: lists
})

const removeList = () => ({
  type: REMOVE_LIST
})


const initialState = {};

export const makeList = (userid, listname) => async(dispatch) => {
    const response = await fetch (`/api/lists/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userid,
            listname
        })
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(addList(data));
        return null;
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }

}

export const getUserLists = (userid) => async(dispatch) => {
    const response = await fetch(`/api/lists/${userid}`)

    if (response.ok) {
        const data = await response.json();
        dispatch(getLists(data));
        return null
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ["An error occurred. Please try again."];
      }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_LISTS:
            const newState = {...state, ...action.payload}
            return newState
        case ADD_LIST:
            const listId = action.payload.id;
            state[listId] = action.payload;
            return state;
        case REMOVE_LIST:
            return { user: null }
        default:
            return state;
    }
  }
