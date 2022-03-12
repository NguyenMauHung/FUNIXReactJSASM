import React, { useState } from 'react';
import Footer from './FooterComponent';
import Header from './HeaderComponents';
import Menu from './MenuComponents';
import Departments from './DepartmentsComponent';
import Salary from './SalaryComponent';
import StaffDetail from './StaffDetailComponent';
import { DEPARTMENTS, STAFFS } from '../shared/staffs'
import { Link, Switch, Route, Redirect } from 'react-router-dom';

function Main(props) {
    const [staffList, setStaffList] = useState(STAFFS)
    const [departmentList, setDepartmentList] = useState(DEPARTMENTS)
    const StaffWithId = ({ match }) => {
        return (
            <StaffDetail staffDetail={staffList.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
            />
        );

    }

    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact path='/' component={() => <Menu staffList={staffList} />} />
                <Route path="/staffs" component={() => <Menu staffList={staffList} />} exact />
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