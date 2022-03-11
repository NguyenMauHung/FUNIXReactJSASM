import React, { useState } from 'react';
import Footer from './FooterComponent';
import Header from './HeaderComponents';
import Menu from './MenuComponents';
import Departments from './DepartmentsComponent';
import Salary from './SalaryComponent';
import { DEPARTMENTS, STAFFS } from '../shared/staffs'
import { Link, Switch, Route, Redirect } from 'react-router-dom';

function Main(props) {
    const [staffList, setStaffList] = useState(STAFFS)
    const [departmentList, setDepartmentList] = useState(DEPARTMENTS)


    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact path='/' component={() => <Menu staffList={staffList} />} />
                <Route path="/nhanvien" component={() => <Menu staffList={staffList} />} exact />
                <Route path="/phongban" component={() => <Departments departmentList={departmentList} />} exact />
                <Route path="/bangluong" component={() => <Salary salaryList={staffList} />} exact />
                <Redirect from="/home" to="/" exact />
            </Switch>

            <Footer />



        </div>
    );
}

export default Main;