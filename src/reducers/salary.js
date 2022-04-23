import * as types from "./../constants/ActionTypes"

var initialState = []

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SALARY_LIST:
            return action.salaryList

        default: return state
    }

}

export default myReducer