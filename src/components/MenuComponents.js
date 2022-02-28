import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap'

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null
    }
  }

  onStaffSelect(staff) {
    this.setState({ selectedStaff: staff })
  }

  renderStaff(staff) {
    if (staff != null) {
      return (
        <Card>
          <CardImg width="100%" src={staff.image} alt={staff.name} />
          <CardBody>
            <CardTitle>{staff.name}</CardTitle>
            <CardText>{staff.doB}</CardText>
          </CardBody>
        </Card>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
  render() {
    const menu = this.props.staffs.map(staff => {
      return (
        <div key={staff.id} className="col-12 col-md-5 m-1">
          <Card onClick={() => this.onStaffSelect(staff)}>
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
        <div className="row">
          {this.renderStaff(this.state.selectedStaff)}
        </div>
      </div>
    );
  }
}

export default Menu;