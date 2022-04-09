import * as types from "./../constants/ActionTypes"
import { DEPARTMENTS } from '../shared/staffs';

var initialState = DEPARTMENTS;
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.DEPARTMENTS:
            return state;
        default: return state
    }

}

export default myReducer