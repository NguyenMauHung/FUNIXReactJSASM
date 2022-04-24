import callAPI from "../utils/APICaller"
import * as types from "./../constants/ActionTypes"

//Tinh Huong 1

export const fetchStaffs = () => (dispatch) => {
    dispatch(staffLoading(true));
    return callAPI("staffs", "GET", null)
        .then(response => {
            if (response.statusText === "OK") {
                return response
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => {
            dispatch(staffList(response.data))
        })
        .catch(error => dispatch(staffFailed(error.message)));
}

export const staffLoading = () => {
    return {
        type: types.STAFF_LOADING
    }
};

export const staffFailed = (errmess) => {
    return {
        type: types.STAFF_FAILED,
        errmess: errmess
    }

};

export const staffList = (stafflist) => {
    return {
        type: types.STAFF_LIST,
        stafflist: stafflist
    }
};

//Tinh Huong 2 
export const fetchDepartments = () => (dispatch) => {
    dispatch(departmentLoading(true));
    return callAPI("departments", "GET", null)
        .then(response => {
            if (response.statusText === "OK") {
                return response
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
        .then(res => {
            dispatch(departmentList(res.data))
        })
        .catch(error => dispatch(departmentFailed(error.message)));
}

export const departmentLoading = () => {
    return {
        type: types.DEPARTMENT_LOADING
    }

};

export const departmentFailed = (errmess) => {
    return {
        type: types.DEPARTMENT_FAILED,
        errmess: errmess
    }

};

export const departmentList = (departmentList) => {
    return {
        type: types.DEPARTMENT_LIST,
        departmentList: departmentList
    }

};

//Tinh Huong 3

export const fetchDepartmentStaff = (id) => {
    return dispatch => {
        return callAPI(`departments/${id}`, "GET", null)
            .then(res => {
                dispatch(DepartmentStaff(res.data))
            })

    }
}

export const DepartmentStaff = (departmentStaff) => {
    return {
        type: types.DEPARTMENT_STAFF,
        departmentStaff: departmentStaff
    }

};

//Tinh Huong 4

export const fetchSalaryList = () => {
    return dispatch => {
        return callAPI("staffsSalary", "GET", null)
            .then(res => {
                dispatch(salaryList(res.data))

            })

    }
}

export const salaryList = (salaryList) => {
    return {
        type: types.SALARY_LIST,
        salaryList: salaryList
    }

};


//Tinh Huong 5

//Tinh Huong 5.1 : Them Nhan Vien

export const fetchAddStaffs = (staff) => (dispatch) => {
    console.log(staff)
    return callAPI("staffs", "POST", staff)
        .then(res => {
            dispatch(staffList(res.data))
        })
        .then(res => {
            dispatch(fetchDepartments())
        })
}

//Tinh Huong 5.2 : Cap Nhat Nhan Vien

export const FetchEditStaffDetail = (id) => {
    return dispatch => {
        return callAPI("staffs", "GET", null)
            .then(res => {
                dispatch(staffList(res.data))

            })
            .then(res => {
                dispatch(EditStaff(id))
            })

    }
}

export const EditStaff = (staff) => {
    return {
        type: types.EDIT_STAFF,
        staff: staff
    }
}

export const FetchUpdateStaffDetail = (staff, id) => (dispatch) => {
    console.log(staff)
    return callAPI("staffs", "PATCH", staff)
        .then(res => {
            dispatch(staffList(res.data))
        })
        .then(res => {
            dispatch(fetchDepartments())
        })
        .then(res => {
            dispatch(EditStaff(id))
        })

}

//Tinh Huong 5.3 : Xoa Nhan Vien

export const fetchDeleteStaff = (id) => {
    return dispatch => {
        return callAPI(`staffs/${id}`, "DELETE", null)
            .then(res => {
                dispatch(staffList(res.data))
            })
            .then(res => {
                dispatch(fetchDepartments())
            })
    }
}

// Tim Kiem Nhan Vien

export const searchStaff = (keyword) => {
    return {
        type: types.SEARCH,
        keyword: keyword
    }
}

// Sap Xep Nhan Vien

export const sortStaff = (sort) => {
    return {
        type: types.SORT,
        sort: sort
    }
}

