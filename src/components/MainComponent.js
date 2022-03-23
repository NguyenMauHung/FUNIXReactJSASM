import React, { useState, useEffect } from 'react';
import Footer from './FooterComponent';
import Header from './HeaderComponents';
import Menu from './MenuComponents';
import Departments from './DepartmentsComponent';
import Salary from './SalaryComponent';
import StaffDetail from './StaffDetailComponent';
import { DEPARTMENTS, STAFFS } from '../shared/staffs'
import { Switch, Route, Redirect } from 'react-router-dom';

function Main(props) {
    var [staffList, setStaffList] = useState(STAFFS)
    staffList.map((staff) => {
        let salary = staff.salaryScale * 3000000 + staff.overTime * 200000;
        staff.salary = salary

    })

    const [departmentList, setDepartmentList] = useState(DEPARTMENTS)
    const [check, setCheck] = useState("");
    const [checkSalary, setCheckSalary] = useState("");
    const [isRender, setIsRender] = useState(true);
    const StaffWithId = ({ match }) => {
        return (
            <StaffDetail staffDetail={staffList.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
            />
        );

    }


    const onSearch = (keyword) => {
        const newstaffList = staffList.filter((staff) => {
            return staff.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        })
        if (keyword === "") {
            setStaffList(STAFFS)
        } else {
            setStaffList(newstaffList)

        }
    }

    const onSort = (value) => {
        const newstaffList = staffList.sort((a, b) => {
            if (a.name > b.name) return value;
            else if (a.name < b.name) return -value;
            else return 0;
        })
        setStaffList(newstaffList)
        setIsRender(!isRender)
        setCheck(value)
    }
    useEffect(() => {
    }, [staffList, setIsRender])
    const onSortSalaryName = (value) => {
        const newstaffList = staffList.sort((a, b) => {
            if (a.name > b.name) return value;
            else if (a.name < b.name) return -value;
            else return 0;
        })
        setStaffList(newstaffList)
        setIsRender(!isRender)
        if (value === 1) {
            setCheckSalary("name1")
        } else {
            setCheckSalary("name-1")
        }


    }
    const onSortSalary = (value) => {
        const newstaffList = staffList.sort((a, b) => {
            if (a.salary > b.salary) return value;
            else if (a.salary < b.salary) return -value;
            else return 0;
        })
        setStaffList(newstaffList)
        setIsRender(!isRender)
        if (value === 1) {
            setCheckSalary("salary1")
        } else {
            setCheckSalary("salary-1")
        }

    }
    console.log(checkSalary)
    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact path='/' component={() => <Menu staffList={staffList} onSearch={onSearch} onSort={onSort} onCheck={check} />} />
                <Route path="/staffs" component={() => <Menu staffList={staffList} onSearch={onSearch} onSort={onSort} onCheck={check} />} exact />
                <Route path="/staffs/:staffId" component={StaffWithId} />
                <Route path="/departments" component={() => <Departments departmentList={departmentList} />} exact />
                <Route path="/salary" component={() => <Salary salaryList={staffList} onSortSalary={onSortSalary} onSortSalaryName={onSortSalaryName} onCheckSalary={checkSalary} />} exact />
                <Redirect from="/home" to="/" exact />
            </Switch>

            <Footer />



        </div>
    );
}

export default Main;