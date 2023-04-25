import csrfFetch from "./csrf";

export const RECEIVEBUSINESS = 'businessPages/RECEIVEBUSINESS';
export const RECEIVEALLBUSINESSES = 'businessPages/RECEIVEALLBUSINESSES';

export const receiveBusiness = (businessPage) => ({
    type: RECEIVEBUSINESS,
    businessPage
})

export const receiveAllBusiness = (businessPages) => ({
    type: RECEIVEALLBUSINESSES,
    businessPages
})

export const getBusiness = (id) => state => (
    state?.businessPages ? state.businessPages[id] : null
)

export const showBusiness = (id) => async (dispatch)=> {
    const res = await csrfFetch(`/api/business_pages/${id}`)

    if (res.ok) {
        const businessPage = await res.json()
        dispatch(receiveBusiness(businessPage))
        return res
    }
}

export const indexBusiness = () => async (dispatch) => {
    const res = await csrfFetch('/api/business_pages')

    if (res.ok) {
        const businessPages = await res.json()
        dispatch(receiveAllBusiness(businessPages))
        return res
    }
}

const businessPagesReducer = (state = {}, action) => {
    const newState = {...state}

    switch(action.type) {
        case RECEIVEBUSINESS:
            newState[action.businessPage.id] = action.businessPage
            return newState;
        case RECEIVEALLBUSINESSES:
            return  {...state, ...action.businessPages}
        default:
            return state;
    }
}

export default businessPagesReducer;