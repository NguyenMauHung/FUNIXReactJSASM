import * as types from "./../constants/ActionTypes"

var initialState = {
    isLoading: true,
    errMess: null,
    staffList: [],
    staffDetail: [],
}
var myReducer = (state = initialState, action) => {
    console.log(action)

    switch (action.type) {
        case types.STAFF_LIST:
            return { ...state, isLoading: false, errMess: null, staffList: action.stafflist };
        case types.STAFF_LOADING:
            return { ...state, isLoading: true, errMess: null, staffList: [] };
        case types.STAFF_FAILED:
            return { ...state, isLoading: false, errMess: action.errmess };
        case types.EDIT_STAFF:
            var staffDetail = state.staffList.filter((staff) => staff.id == action.staff)
            return { ...state, isLoading: false, errMess: action.errMess, staffDetail: staffDetail };
        default: return state
    }

}



export default myReducer