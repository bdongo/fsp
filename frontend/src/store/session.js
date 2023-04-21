import csrfFetch from "./csrf"

export const REMOVECURRENTUSER = 'session/REMOVECURRENTUSER'
export const CURRENT_USER = 'session/CURRENTUSER'

// {credentials:{:username, :password}}

export const currentUser = (user) => ({
    type: CURRENT_USER,
    user
})

export const removeCurrentUser = () => ({
    type: REMOVECURRENTUSER
})

export const getCurrentUser = (state) => (
    state?.session?.currentUser ? state.session.currentUser : null
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

const sessionReducer = (state = {currentUser: null}, action) => {
    const newState = {...state}

    switch (action.type) {
        case CURRENT_USER:
            newState.currentUser = action.user;
            return newState;
        case REMOVECURRENTUSER:
            newState.currentUser = null
            return newState
        default:
            return state;
    }
}

export default sessionReducer;