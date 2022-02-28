import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap'

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }



  render() {
    const menu = this.props.staffs.map(staff => {
      return (
        <div key={staff.id} className="col-12 col-md-5 m-1">
          <Card>
            <CardImg width="100%" src={staff.image} alt={staff.name} />
            <CardImgOverlay>
              <CardTitle>{staff.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          {menu}
        </div>
      </div>
    );
  }
}

export default Menu;