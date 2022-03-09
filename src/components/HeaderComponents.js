import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

function Header() {
    return (
        <React.Fragment>
            <Navbar dark>
                <div className="container">
                    <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                </div>
            </Navbar>
        </React.Fragment>
    );

}

export default Header;