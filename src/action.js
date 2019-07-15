export const getServiceData = (movies) => dispatch => {
    dispatch({
        type: 'BASE_SAVE_SERVICES_DATA',
        payload: {
            movies,
        }
    })
}

export const getServiceCategories = (categories) => dispatch => {
    dispatch({
        type: 'BASE_SAVE_CATEGORIES',
        payload: {
            categories,
        }
    })
}

export const setVisibleCategories = (visibleCategories) => dispatch => {
    dispatch({
        type: 'SET_VISIBLE_CATEGORIES',
        payload: {
            visibleCategories,
        }
    })
}

export const setView = (nbr) => dispatch => {
    dispatch({
        type: 'SET_VIEW',
        payload: {
            nbr,
        }
    })
}
