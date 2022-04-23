import * as types from "./../constants/ActionTypes"

var initialState = {
    isLoading: true,
    errMess: null,
    departmentList: [],
    staffDetail: [],
}
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.DEPARTMENT_LIST:
            return { ...state, isLoading: false, errMess: null, departmentList: action.departmentList };
        case types.DEPARTMENT_LOADING:
            return { ...state, isLoading: true, errMess: null, departmentList: [] };
        case types.DEPARTMENT_FAILED:
            return { ...state, isLoading: false, errMess: action.errmess };
        case types.DEPARTMENT_STAFF:
            return { ...state, isLoading: false, errMess: action.errMess, departmentStaff: action.departmentStaff };
        default: return state
    }

}

export default myReducer