import { CURRENT_USER, currentUser } from "./session";

export const getUser = (userId) => (state) => (
    state?.users ? state.users[userId] : null
)

// const usersPreviousState = sessionStorage.getItem('currentUser')
// console.log(JSON.parse(usersPreviousState), 'outside user reducer')
const usersReducer = (state = {}, action) => {
    const newState = {...state}
    console.log("in users reducer")

    switch(action.type) {
        // case CURRENT_USER:
        //     newState[action.user.id] = action.user
        //     return newState;
        default: 
        return state;
    }
}

export default usersReducer;