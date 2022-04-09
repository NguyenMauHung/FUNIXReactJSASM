import { combineReducers } from "redux";
import staffList from "./stafflist"
import search from "./search"
import sort from "./sort"
import department from "./department"

const myReducer = combineReducers({
    staffList: staffList,
    search: search,
    sort: sort,
    department: department,
})

export default myReducer