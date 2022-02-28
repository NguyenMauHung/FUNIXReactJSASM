import React, { Component } from 'react';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponents'
import { DEPARTMENTS, ROLE, STAFFS } from './shared/staffs'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      departments: DEPARTMENTS,
      role: ROLE,
      staffs: STAFFS,
    };
  }



  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className='container'>
            <NavbarBrand href="/">Ứng dụng quản lý nhân sự 1.0</NavbarBrand>
          </div>
        </Navbar>
        <Menu staffs={this.state.staffs} />
      </div>
    );
  }
}

export default App;