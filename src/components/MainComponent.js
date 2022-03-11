import React, { useState } from 'react';
import Footer from './FooterComponent';
import Header from './HeaderComponents';
import Menu from './MenuComponents';
import Departments from './DepartmentsComponent';
import { DEPARTMENTS, ROLE, STAFFS } from '../shared/staffs'
import { Link, Switch, Route, Redirect } from 'react-router-dom';

function Main(props) {
    const [staffList, setStaffList] = useState(STAFFS)
    const [departmentList, setDepartmentList] = useState(DEPARTMENTS)
    const [role, setRole] = useState(ROLE)

    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact path='/' component={() => <Menu staffList={staffList} />} />
                <Route path="/nhanvien" component={() => <Menu staffList={staffList} />} exact />
                <Route path="/phongban" component={() => <Departments departmentList={departmentList} />} exact />
                <Redirect from="/home" to="/" exact />
            </Switch>

            <Footer />



        </div>
    );
}

export default Main;