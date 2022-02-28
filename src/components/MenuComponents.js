import React, { useEffect, useState, Component } from 'react';
import Moment from 'react-moment';
import { Button } from 'reactstrap';



function ColChange(props) {
  const [col, setCol] = useState("1");
  return (
    <div>
      {col}
      <button onClick={() => setCol("black")}>Change to black</button>
      <button onClick={() => setCol("white")}>Change to white</button>
    </div>
  )
}
class Menu extends Component {
  constructor(props) {

    super(props);
    this.state = {
      selectedStaff: null,
      col: "col-12 col-md-2"
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

        <div key={staff.id} className={this.state.col}>

          <div onClick={() => this.onStaffSelect(staff)}>
            <div>{staff.name}</div>
          </div >
        </div >
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">Danh sách nhân viên đang hiển thị 2 cột, Click nút phía dưới để đối số lượng cột</div>
          <div className="col-12 col-md-6">
            <Button onClick={() => this.setState({ col: "col-12" })}>Đổi thành 1 cột</Button>
            <Button onClick={() => this.setState({ col: "col-12 col-md-6" })}>Đổi thành 2 cột</Button>
            <Button onClick={() => this.setState({ col: "col-12 col-md-4" })}>Đổi thành 3 cột</Button>
            <Button onClick={() => this.setState({ col: "col-12 col-md-2" })}>Đổi thành 6 cột</Button>
          </div>
        </div>
        <div className="row">
          <div>

          </div>
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
