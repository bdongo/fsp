import csrfFetch from "./csrf";

export const RECEIVEBUSINESS = 'businessPages/RECEIVEBUSINESS';
export const RECEIVEALLBUSINESSES = 'businessPages/RECEIVEALLBUSINESSES';

export const receiveBusiness = (payload) => ({
    type: RECEIVEBUSINESS,
    payload
})

export const receiveAllBusiness = (payload) => ({
    type: RECEIVEALLBUSINESSES,
    payload
})

export const getBusiness = (id) => state => (
    state?.businessPages ? state.businessPages[id] : null
)

export const getAllBusinesses = (state) => (
    state?.businessPages ? Object.values(state.businessPages) : []
)

export const showState = (state) => (
    state ? Object.values(state) : []
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

export const searchBusinesses = (query) => async (dispatch) => {
    const res = await csrfFetch(`/api/business_pages?query=${query}`)
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
            newState[action.payload.business.id] = action.payload.business
            return newState;
        case RECEIVEALLBUSINESSES:
            return  {...action.payload.businesses}
        default:
            return state;
    }
}

export default businessPagesReducer;