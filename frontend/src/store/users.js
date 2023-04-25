import { CURRENT_USER, currentUser } from "./session";

export const getUser = (userId) => (state) => (
    state?.users ? state.users[userId] : null
)

const usersReducer = (state = {}, action) => {
    const newState = {...state}

    switch(action.type) {
        // case CURRENT_USER:
        //     newState[action.user.id] = action.user
        //     return newState;
        default: 
        return state;
    }
}

export default usersReducer;