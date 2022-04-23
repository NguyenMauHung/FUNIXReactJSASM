import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Col, Button, Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { DEPARTMENTS } from '../shared/staffs';
import { connect } from "react-redux";
import * as actions from "./../actions/index";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import RenderStaff from './RenderStaffComponent';
import { FadeTransform } from 'react-animation-components';




const required = (val) => val && val.length; //value > 0
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);
const validsalaryScale = (val) => /^[1-2]\.\d$|^3.0$|^1$|^3$|^2$/i.test(val);
const validannualLeave = (val) => /^\d\.[05]$|^\d$/.test(val);
const validoverTime = (val) => /^[012]?\d$|30/.test(val);

const mapStateToProps = (state) => {

  return {
    staffList: state.staffList.staffList,
    isLoading: state.staffList.isLoading,
    errMess: state.staffList.errMess,
    keyword: state.search
  }

}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAddStaffs: (staff) => {
      dispatch(actions.fetchAddStaffs(staff))
    },
    onSearch: (keyword) => {
      dispatch(actions.searchStaff(keyword))
    },

  }

}

class Staff extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      id: 0,
      name: "",
      doB: "",
      salaryScale: 1,
      startDate: "",
      department: DEPARTMENTS[0],
      annualLeave: 0,
      overTime: 0,
      keyword: "",
    };

  }


  //Toggle Modal
  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  //Add Staff
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (name === "department") {
      this.setState({
        department: DEPARTMENTS[value]
      });

    } else {
      this.setState({
        [name]: value
      });
    }
  }


  handleSubmit = (values, event) => {
    var newstaffList = {

      name: this.state.name,
      doB: this.state.doB,
      salaryScale: this.state.salaryScale,
      startDate: this.state.startDate,
      departmentId: this.state.department.id,
      annualLeave: this.state.annualLeave,
      overTime: this.state.overTime,
      image: '/assets/images/alberto.png',
    }

    this.props.fetchAddStaffs(newstaffList)

    this.setState({
      isModalOpen: !this.state.isModalOpen
    });

  }

  //Search
  handleSearch = () => {
    this.props.onSearch(this.state.keyword)

  }

  render() {

    var { staffList, isLoading, errMess, keyword } = this.props;
    console.log(isLoading)
    if (isLoading) {
      return (
        <div className="container">
          <div className="row">
            <Loading />
          </div>
        </div>
      );
    } else if (errMess) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 center">
              <h4>{errMess}</h4>
            </div>

          </div>
        </div>

      );
    }
    else {
      // Search Name Staff

      staffList = staffList.filter((staff) => {
        return staff.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
      })

      return (

        <div className="container" >
          <div className="row">
            <div className="col-12 col-md-3 col-lg-2 ">
              <h3>Nhân Viên</h3>
            </div>

            <div className="col-12 col-md-4 col-lg-5 ">
              <Button outline onClick={this.toggleModal}><span className="fa fa-plus fa-lg"></span> Thêm Nhân viên</Button>
            </div>

            <div className="col-12 col-md-5 col-lg-5 ">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  name="keyword"
                  onChange={this.handleInputChange}
                  onKeyUp={(event) => {
                    var keycode = (event.keyCode ? event.keyCode : event.which);
                    if (keycode == '13') {

                      this.handleSearch()
                    }
                  }}

                  placeholder="Nhập tên nhân viên" />

                <span className="Control.text-group-btn">
                  <button className="btn btn-primary" type="button" onClick={this.handleSearch}>
                    <span className="fa fa-search mr-1"></span>Tìm kiếm
                  </button>
                </span>

              </div>

              <hr />
            </div>

          </div>

          {/* Animation */}
          <FadeTransform
            in
            transformProps={{
              exitTransform: 'scale(0.5) translateX(-50%) translateY(-50%)'
            }}>
            <RenderStaff staffList={staffList} />
          </FadeTransform>




          <div>Bấm vào tên nhân viên để xem thông tin</div>

          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Add Staff</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={(values, event) => this.handleSubmit(values, event)}>
                <Row className="form-group">
                  <Label sm={3}>
                    Tên
                  </Label>
                  <Col sm={9}>
                    <Control.text
                      model=".name"
                      className="form-control"
                      name="name"
                      validators={{
                        required, minLength: minLength(2), maxLength: maxLength(25)
                      }}
                      onChange={this.handleInputChange}
                    />
                    <Errors
                      className="text-danger"
                      model=".name"
                      show="touched"
                      messages={{
                        required: 'Yêu Cầu Nhập - ',
                        minLength: 'Yêu cầu nhiều hơn 2 ký tự',
                        maxLength: 'Yêu cầu ít hơn 25 ký tự'
                      }}
                    />
                  </Col>

                </Row>

                <Row className="form-group">
                  <Label sm={3}>
                    Ngày Sinh
                  </Label>
                  <Col sm={9}>
                    <Control
                      type="date"
                      model=".doB"
                      className="form-control"
                      name="doB"
                      validators={{
                        required
                      }}
                      onChange={this.handleInputChange}
                    />
                    <Errors
                      className="text-danger"
                      model=".doB"
                      show="touched"
                      messages={{
                        required: 'Yêu Cầu Nhập',
                      }}
                    />

                  </Col>
                </Row>

                <Row className="form-group">
                  <Label sm={3}>
                    Ngày Vào Công Ty
                  </Label>
                  <Col sm={9}>
                    <Control
                      type="date"
                      model=".starDate"
                      className="form-control"
                      name="startDate"
                      validators={{
                        required
                      }}
                      onChange={this.handleInputChange}
                    />
                    <Errors
                      className="text-danger"
                      model=".starDate"
                      show="touched"
                      messages={{
                        required: 'Yêu Cầu Nhập',

                      }}
                    />

                  </Col>
                </Row>

                <Row className="form-group">
                  <Label sm={3}>
                    Phòng Ban
                  </Label>
                  <Col sm={9}>
                    <Control.select
                      model=".department"
                      className="form-control"
                      name="department"
                      onChange={this.handleInputChange}
                    >
                      <option value={0}>
                        Sale
                      </option>
                      <option value={1}>
                        HR
                      </option>
                      <option value={2}>
                        Marketing
                      </option>
                      <option value={3}>
                        IT
                      </option>
                      <option value={4}>
                        Finance
                      </option>
                    </Control.select>

                  </Col>
                </Row>

                <Row className="form-group">
                  <Label sm={5}>
                    Hệ Số Lương
                  </Label>
                  <Col sm={7}>
                    <Control.text
                      model=".salaryScale"
                      className="form-control"
                      name="salaryScale"
                      validators={{
                        required, validsalaryScale
                      }}
                      onChange={this.handleInputChange}
                    />
                    <Errors
                      className="text-danger"
                      model=".salaryScale"
                      show="touched"
                      messages={{
                        required: 'Yêu Cầu Nhập - ',
                        validsalaryScale: "Hệ số lương chỉ từ 1.0 đến 3.0"
                      }}
                    />


                  </Col>
                </Row>

                <Row className="form-group">
                  <Label sm={5}>
                    Số Ngày Nghỉ Còn lại
                  </Label>
                  <Col sm={7}>
                    <Control.text
                      model=".annualLeave"
                      className="form-control"
                      name="annualLeave"
                      validators={{
                        required, validannualLeave
                      }}
                      onChange={this.handleInputChange}
                    />
                    <Errors
                      className="text-danger"
                      model=".annualLeave"
                      show="touched"
                      messages={{
                        required: 'Yêu Cầu Nhập - ',
                        validannualLeave: "Số ngày nghỉ còn lại phải là bội số của 0.5 như 1 hoặc 1.5 và không quá 9 ngày"
                      }}
                    />


                  </Col>
                </Row>

                <Row className="form-group">
                  <Label sm={5}>
                    Số Ngày Đã Làm Thêm
                  </Label>
                  <Col sm={7}>
                    <Control.text
                      model=".overTime"
                      className="form-control"
                      name="overTime"
                      validators={{
                        required, validoverTime
                      }}
                      onChange={this.handleInputChange}
                    />
                    <Errors
                      className="text-danger"
                      model=".overTime"
                      show="touched"
                      messages={{
                        required: 'Yêu Cầu Nhập - ',
                        validoverTime: "Số ngày làm thêm phải là số nguyên và không quá 30 ngày"
                      }}
                    />
                  </Col>
                </Row>

                <Row className="form-group">
                  <Col
                    sm={{
                      offset: 2,
                      size: 10
                    }}
                  >
                    <Button type="submit" color="primary">
                      Thêm
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </ModalBody>
          </Modal >

        </div >
      )
    }

  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Staff));


