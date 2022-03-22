import React, { useState } from 'react';
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

function Header() {
    const [isNavOpen, setisNavOpen] = useState(false);
    const toggleNav = () => {
        setisNavOpen(true)
    }
    return (
        <React.Fragment>
            <Navbar dark expand="md">
                <div className="container">
                    <NavbarToggler onClick={toggleNav} />
                    <NavbarBrand className="mr-auto" href="/"><img src='assets/images/logo.png' height="30" width="41" alt='Ristorante Con Fusion' /></NavbarBrand>
                    <Collapse isOpen={isNavOpen} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink className="nav-link" to='/staffs'><span className="fa fa-users fa-lg"></span> Nhân Viên</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/departments'><span className="fa fa-address-card fa-lg"></span> Phòng Ban</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/salary'><span className="fa fa-money fa-lg"></span> Bảng Lương</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </div>
            </Navbar>

        </React.Fragment>
    );

}

export default Header;