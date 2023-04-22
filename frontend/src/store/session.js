import csrfFetch from "./csrf"

export const REMOVECURRENTUSER = 'session/REMOVECURRENTUSER'
export const CURRENT_USER = 'session/CURRENTUSER'

// {:username, :password}

export const currentUser = ({currentUserId, users}) => ({
    type: CURRENT_USER,
    currentUserId,
    users
})

export const removeCurrentUser = () => ({
    type: REMOVECURRENTUSER
})

export const getCurrentUserId = (state) => (
    state?.session?.currentUserId ? state.session.currentUserId : null
)

export const showCurrentUser = () => async (dispatch) => {
    const res = await fetch('api/session')

    if (res.ok) {
        const user = await res.json()
        return dispatch(currentUser(user))
    }
}

export const login = (credentials) => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
    if (res.ok) {
        const user = await res.json()
        return dispatch(currentUser(user))
    }
}

export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    })

    if (res.ok) {
       return dispatch(removeCurrentUser)
    }
}

const sessionReducer = (state = {currentUserId: null}, action) => {
    const newState = {...state}

    switch (action.type) {
        case CURRENT_USER:
            newState.currentUserId = action.currentUserId;
            return newState;
        case REMOVECURRENTUSER:
            newState.currentUserId = null
            return newState
        default:
            return state;
    }
}

export default sessionReducer;