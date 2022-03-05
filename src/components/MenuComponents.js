import React, { useEffect, useState, Component } from 'react';
import Moment from 'react-moment';


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStaff: null,

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

        <div key={staff.id} className="col-6 col-md-4 col-lg-2 ">
          <div onClick={() => this.onStaffSelect(staff)} style={{ margin: "5px" }} >
            <img src={staff.image} alt={staff.name} />
            <div>{staff.name}</div>
          </div >
        </div >
      );
    });
    return (
      <div className="container" >
        <div className="row text-center">
          <h3 className="col-12">Danh sách nhân viên</h3>

        </div>
        <div className="row">
          {menu}
        </div>
        <div className="row">
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
