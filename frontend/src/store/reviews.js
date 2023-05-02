import { RECEIVEALLBUSINESSES, RECEIVEBUSINESS } from "./businessPages";
import csrfFetch from "./csrf";


export const ADDREVIEW = "reviews/ADDREVIEW"
export const EDITREVIEW = "reviews/EDITREVIEWS"
export const REMOVEREVIEW = "review/REMOVEREVIEW"

export const addReview = (review) => ({
    type: ADDREVIEW,
    review
})

export const editReview = (review) => ({
    type: EDITREVIEW,
    review
})

export const removeReview = (reviewId) => ({
    type: REMOVEREVIEW,
    reviewId
})

export const getReviews = (state) => (
    state?.reviews ? Object.values(state.reviews) : []
)

export const createReview = (review) => async (dispatch) => {
    const {authorId, businessId, body, rating} = review
    const res = await csrfFetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ review: {
            authorId,
            businessId,
            body,
            rating
        }})
    })
    if (res.ok) {
        const newReview = await res.json();
        dispatch(addReview(newReview));
        return res;
    }
}

export const updateReview = (review) => async (dispatch) => {
    const { authorId, businessId, body, rating } = review
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            review: {
            authorId,
            businessId,
            body,
            rating
        }
        })
    })
    if (res.ok) {
        const updatedReview = await res.json();
        dispatch(editReview(updateReview));
        return res;
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })

    if (res.ok) {
        dispatch(removeReview(reviewId));
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

        case REMOVEREVIEW:
            delete newState[action.reviewId];
            return newState;
        case EDITREVIEW:

        default:
            return state;
    }
}

export default reviewReducer



