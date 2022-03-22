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
    const [departmentList, setDepartmentList] = useState(DEPARTMENTS)
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
    }
    useEffect(() => {
    }, [staffList, setIsRender])

    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact path='/' component={() => <Menu staffList={staffList} onSearch={onSearch} onSort={onSort} />} />
                <Route path="/staffs" component={() => <Menu staffList={staffList} onSearch={onSearch} onSort={onSort} />} exact />
                <Route path="/staffs/:staffId" component={StaffWithId} />
                <Route path="/departments" component={() => <Departments departmentList={departmentList} />} exact />
                <Route path="/salary" component={() => <Salary salaryList={staffList} />} exact />
                <Redirect from="/home" to="/" exact />
            </Switch>

            <Footer />



        </div>
    );
}

export default Main;