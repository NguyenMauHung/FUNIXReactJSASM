import * as types from "./../constants/ActionTypes"

var initialState = {
    sortById: 0,
    sortBySalary: 0
};

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SORT:
            return {
                sortById: action.sort.sortById,
                sortBySalary: action.sort.sortBySalary
            }
        default: return state
    }

}

export default myReducer