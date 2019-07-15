const initialState = {
    categories: [],
    movies: [],
    visiblesCategories: []
}

const base = (state = initialState, action) => {
    switch (action.type) {
        case 'BASE_SAVE_SERVICES_DATA':
            const { movies } = action.payload
            return { ...state, movies: movies }

        case 'BASE_SAVE_CATEGORIES':
            const { categories } = action.payload
            return { ...state, categories: categories }

        case 'SET_VISIBLE_CATEGORIES':
            const { visibleCategories } = action.payload
            return { ...state, visiblesCategories: visibleCategories }

        case 'SET_VIEW':
            const { nbr } = action.payload
            return { ...state, nbrView: nbr }

        default:
            return state
    }
}

export default base
