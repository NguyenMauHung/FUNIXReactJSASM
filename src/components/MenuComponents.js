import React, { Component } from 'react';
import Moment from 'react-moment';

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
        <div className="col-12 m-3">
          <h4>Họ và tên: {staff.name}</h4>
          <p>Ngày sinh:  <Moment format="DD/MM/YYYY">
            {staff.doB}
          </Moment> </p>
          <p>Ngày vào công ty:  <Moment format="DD/MM/YYYY">
            {staff.startDate}
          </Moment></p>
          <p>Phòng ban: {staff.department.name}</p>
          <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
          <p>Số ngày đã làm thêm: {staff.overTime}</p>
        </div>
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
        <div key={staff.id} className="col-12 col-md-5 m-3">
          <div onClick={() => this.onStaffSelect(staff)}>
            <div>{staff.name}</div>

          </div>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          {menu}
          <div>Bấm vào tên nhân viên để xem thông tin</div>
        </div>
        <div className="row">
          {this.renderStaff(this.state.selectedStaff)}
        </div>
      </div>
    );
  }
}

export default Menu;