const ADD_LIST = 'lists/ADD_LIST';
const REMOVE_LIST = 'lists/REMOVE_LIST';
const GET_LISTS = 'lists/GET_LISTS';
const GET_LIST = 'lists/GET_LIST';

const addList = (list) => ({
  type: ADD_LIST,
  payload: list
});

const getLists = (lists) => ({
    type: GET_LISTS,
    payload: lists
})

const getList = (list) => ({
  type: GET_LIST,
  payload: list
})

const removeList = (id) => ({
  type: REMOVE_LIST,
  payload: id
})

const initialState = {};

export const editList = (listid, name) => async(dispatch) => {
    const list = { listname: name}
    const response = await fetch(`/api/lists/${listid}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(list)
    });

    if (response.ok) {
        const list = await response.json();
        dispatch(addList(list))
    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data.errors;
      }
    } else {
      return ["The list name can not be blank"]
    }
}

export const deleteList = (listid) => async(dispatch) => {
    const response = await fetch(`/api/lists/${listid}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await dispatch(removeList(listid));
        return null;
      } else {
        return ["An error occurred. Please try again."];
      }
}

export const getListbyId = (listid) => async(dispatch) => {
  const response = await fetch(`/api/lists/${listid}`)
  if (response.ok) {
    const list = await response.json()
    await dispatch(getList(list));
    return null;
  } else {
    return ['An error occured. Please try again']
  }
}

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
    const response = await fetch(`/api/lists/${userid}/all`)

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
            const newState = {...action.payload}
            return newState
        case GET_LIST:
            const list_state = {}
            const list_id = action.payload.id;
            list_state[list_id] = action.payload;
            return list_state;
        case ADD_LIST:
            const listId = action.payload.id;
            state[listId] = action.payload;
            return state;
        case REMOVE_LIST:
            const updateState = {...state}
            const listid = action.payload
            delete updateState[listid];
            return updateState;
        default:
            return state;
    }
  }
