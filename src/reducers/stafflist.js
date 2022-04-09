import * as types from "./../constants/ActionTypes"
import { STAFFS } from '../shared/staffs'

var staffList = JSON.parse(localStorage.getItem('staffList'));
var initialState = staffList ? staffList : STAFFS;
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;
        case types.ADD_STAFF:
            var newstaffList = {
                id: state.length,
                name: action.staff.name,
                doB: action.staff.doB,
                salaryScale: action.staff.salaryScale,
                startDate: action.staff.startDate,
                department: action.staff.department,
                annualLeave: action.staff.annualLeave,
                overTime: action.staff.overTime,
                image: '/assets/images/alberto.png',
            }
            state.push(newstaffList);
            console.log(state, newstaffList)
            localStorage.setItem('staffList', JSON.stringify(state));
            return state;
        default: return state
    }

}

export default myReducer