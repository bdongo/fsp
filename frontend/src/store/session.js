import csrfFetch from "./csrf"

export const REMOVECURRENTUSER = 'session/REMOVECURRENTUSER'
export const CURRENT_USER = 'session/CURRENTUSER'

// {:username, :password}

export const currentUser = ({user}) => ({
    type: CURRENT_USER,
    user
})

export const removeCurrentUser = () => ({
    type: REMOVECURRENTUSER
})

export const getCurrentUser = (state) => (
    state?.session?.currentUser ? state.session.currentUser : null
)

export const storeCurrentUser = ({user}) => {
    if (user) {
        const userJSON = JSON.stringify(user)
        sessionStorage.setItem('CurrentUser', userJSON)
    }
    console.log( "in sessionstorage currentuser")
}

export const storeCSRFtoken = (res) => {
    const token = res.headers.get('X-CSRF-Token');
    console.log("in store token")
    if (token) {
        sessionStorage.setItem('X-CSRF-Token', token);
        // TEST
        console.log(token)
    }
}

export const showCurrentUser = () => async (dispatch) => {
    const res = await csrfFetch('api/session')
    console.log("in showCurrentUser")
    if (res.ok) {
        const user = await res.json()
        dispatch(currentUser(user))
        storeCSRFtoken(res)
        storeCurrentUser(user)
        return res
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
        storeCurrentUser(user)
        dispatch(currentUser(user)) 
        return res
    }
}


export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
        method: 'DELETE'
    })

    if (res.ok) {
        sessionStorage.removeItem('CurrentUser')
        dispatch(removeCurrentUser())
        return res
    }
}

const previousSession = {
    currentUser: JSON.parse(sessionStorage.getItem('CurrentUser'))
}


const sessionReducer = (state = previousSession, action) => {
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