
const ADD_ENDPOINT = 'charts/ADD_ENDPOINT'
// const UPDATE_ENDPOINT = 'charts/UPDATE_ENDPOINT'

const addEndpoint = (endpoint) => ({
    type: ADD_ENDPOINT,
    payload: endpoint
})

// const updateEndpoint = (endpoint) => ({
//     type: UPDATE_ENDPOINT,
//     payload: endpoint
// })

const initialState = {}

export const setEndpoint = (endpoint) => async(dispatch) => {
    dispatch(addEndpoint(endpoint))
}


export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ENDPOINT:
            return {'endpoint': action.payload}
        default:
            return state
    }
}
