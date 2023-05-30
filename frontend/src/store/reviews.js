import { RECEIVEALLBUSINESSES, RECEIVEBUSINESS } from "./businessPages";
import csrfFetch from "./csrf";


export const ADDREVIEW = "reviews/ADDREVIEW"
export const EDITREVIEW = "reviews/EDITREVIEWS"
export const REMOVEREVIEW = "review/REMOVEREVIEW"

export const addReview = (payload) => ({
    type: ADDREVIEW,
    payload
})

export const editReview = (payload) => ({
    type: EDITREVIEW,
    payload
})

export const removeReview = (reviewId, payload) => ({
    type: REMOVEREVIEW,
    reviewId,
    payload
})

export const getReviews = (state) => (
    state?.reviews ? Object.values(state.reviews) : []
)

export const createReview = (formData) => async (dispatch) => {
    const res = await csrfFetch('/api/reviews', {
        method: 'POST',
        body: formData
    })
    if (res.ok) {
        const newReview = await res.json();
        dispatch(addReview(newReview));
        return res;
    }
}

export const updateReview = (reviewId, formData) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'PATCH',
        body: formData
    })
    if (res.ok) {
        const updatedReview = await res.json();
        dispatch(editReview(updatedReview));
        return res;
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        const payload = await res.json();
        dispatch(removeReview(reviewId, payload));
        return res;
    }
}

const reviewReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type){
        case RECEIVEALLBUSINESSES:
            return { ...action.payload.reviews };
        case RECEIVEBUSINESS:
            return {...action.payload.reviews};
        case ADDREVIEW:
            return { ...action.payload.reviews };
        case REMOVEREVIEW:
            delete newState[action.reviewId];
            return newState;
        case EDITREVIEW:
            return { ...action.payload.reviews };
        default:
            return state;
    }
}

export default reviewReducer



