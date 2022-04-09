import * as types from "./../constants/ActionTypes"

export const listAll = () => {
    return {
        type: types.LIST_ALL
    }
}

export const addStaff = (staff) => {
    return {
        type: types.ADD_STAFF,
        staff: staff
    }
}

export const searchStaff = (keyword) => {
    return {
        type: types.SEARCH,
        keyword: keyword
    }
}

export const sortStaff = (sort) => {
    return {
        type: types.SORT,
        sort: sort
    }
}

export const listDepartment = (department) => {
    return {
        type: types.DEPARTMENTS,
        department: department
    }
}