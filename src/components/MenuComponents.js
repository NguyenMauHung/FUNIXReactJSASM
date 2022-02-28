import React, { Component } from 'react';
import { Media } from 'reactstrap'

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }



  render() {
    const menu = this.props.staffs.map(staff => {
      return (
        <div key={staff.id} className="col-12 mt-5">
          <Media tag="li">
            <Media left middle>
              <Media object src={staff.image} alt={staff.name} />
            </Media>
            <Media body className="ml-5">
              <Media heading>{staff.name}</Media>
              <p>{staff.doB}</p>

            </Media>
          </Media>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <Media list>
            {menu}
          </Media>
        </div>

      </div>
    );
  }
}

export default Menu;