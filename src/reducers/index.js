import { combineReducers } from "redux";
import staffList from "./stafflist"
import search from "./search"
import sort from "./sort"
import departmentList from "./department"
import salaryList from "./salary"

const myReducer = combineReducers({
    staffList: staffList,
    search: search,
    sort: sort,
    departmentList: departmentList,
    salaryList: salaryList,
})

export default myReducer