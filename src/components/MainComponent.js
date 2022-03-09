import React, { useState } from 'react';
import Footer from './FooterComponent';
import Header from './HeaderComponents';
import Menu from './MenuComponents';
import { DEPARTMENTS, ROLE, STAFFS } from '../shared/staffs'

function Main(props) {
    const [staffList, setStaffList] = useState(STAFFS)

    return (
        <div className="App">
            <Header />
            <Menu staffList={staffList} />
            <Footer />

        </div>
    );
}

export default Main;