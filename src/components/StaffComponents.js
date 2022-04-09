import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Col, FormText, FormFeedback,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label
} from 'reactstrap';
import { DEPARTMENTS } from '../shared/staffs'

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
      touched: {
        name: false,
        doB: false,
        startDate: false,
        department: false,
        salaryScale: false,
        annualLeave: false,
        overTime: false
      },

    };

  }

  //Toggle Modal
  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  // Validate Form

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });

  }

  validate = (name, department, salaryScale, annualLeave, overTime) => {
    const errors = {
      name: '',
      department: "",
      salaryScale: '',
      annualLeave: '',
      overTime: ''
    };

    if (this.state.touched.name && name.length < 3) {
      errors.name = 'Yêu cầu nhiều hơn 2 ký tự';
    } else if (this.state.touched.name && name.length > 30) {
      errors.name = 'Yêu cầu ít hơn 30 ký tự';
    }

    if (this.state.department === "") {
      errors.department = 'Yêu cầu chọn phòng ban';
    }

    const reg = /^[1-2]\.\d$|^3.0$|^1$|^3$|^2$/;
    const reg1 = /^\d\.[05]$|^\d$/;
    const reg2 = /^[012]?\d$|30/;

    if (this.state.touched.salaryScale && !reg.test(salaryScale))
      errors.salaryScale = 'Hệ số lương chỉ từ 1.0 đến 3.0';
    if (this.state.touched.annualLeave && !reg1.test(annualLeave))
      errors.annualLeave = 'Số ngày nghỉ còn lại phải là bội số của 0.5 như 1 hoặc 1.5';
    if (this.state.touched.overTime && !reg2.test(overTime))
      errors.overTime = 'Số ngày làm thêm phải là số nguyên và không quá 30 ngày';
    return errors
  }

  // Get Value Form
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


  handleSubmit = (event) => {
    this.props.onSubmit(this.state)
    if ((!this.state.touched.name) || (!this.state.touched.doB) || (!this.state.touched.startDate)) {
      this.props.onRequired(false)
    }
    else {
      this.props.onRequired(true)
    }
    event.preventDefault();
  }

  handleSearch = () => {
    this.props.onSearch(this.state.keyword)

  }

  render() {
    var { staffList } = this.props;
    var { keyword } = this.state;
    const errors = this.validate(this.state.name, this.state.department, this.state.salaryScale, this.state.annualLeave, this.state.overTime);

    //Toggle Modal
    var openform = false;
    var formtextname = false;
    var formtextdoB = false;
    var formtextstartDate = false;

    if ((this.state.isModalOpen && this.props.required) || (!this.state.isModalOpen && !this.props.required)) {
      openform = true
    } else {
      openform = false
    }

    //Toggle Validate Form
    if ((this.props.required && !this.state.touched.name) || (!this.props.required && this.state.touched.name)
      || (this.props.required && this.state.touched.name)
    ) {
      formtextname = false
    } else {
      formtextname = true
    }

    if ((this.props.required && !this.state.touched.doB) || (!this.props.required && this.state.touched.doB)
      || (this.props.required && this.state.touched.doB)
    ) {
      formtextdoB = false
    } else {
      formtextdoB = true
    }

    if ((this.props.required && !this.state.touched.startDate) || (!this.props.required && this.state.touched.startDate)
      || (this.props.required && this.state.touched.startDate)
    ) {
      formtextstartDate = false
    } else {
      formtextstartDate = true
    }

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
                value={keyword}
                onChange={this.handleInputChange}
                onKeyUp={(event) => {
                  var keycode = (event.keyCode ? event.keyCode : event.which);
                  if (keycode == '13') {
                    this.setState({
                      keyword: event.target.value
                    });
                    this.handleSearch()
                  }
                }}

                placeholder="Nhập tên nhân viên" />

              <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={this.handleSearch}>
                  <span className="fa fa-search mr-1"></span>Tìm kiếm
                </button>
              </span>

            </div>

            <hr />
          </div>

        </div>

        <div className="row">
          {staffList.map((staff) => (
            <div key={staff.id} className="col-6 col-md-4 col-lg-2 ">
              <Link to={`/staffs/${staff.id}`}>
                <div style={{ margin: "5px" }} >
                  <img src={staff.image} alt={staff.name} />
                  <div>{staff.name}</div>
                </div >
              </Link>
            </div >

          ))
          }
        </div>
        <div>Bấm vào tên nhân viên để xem thông tin</div>

        <Modal isOpen={openform} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Add Staff</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label sm={3}>
                  Tên
                </Label>
                <Col sm={9}>
                  <Input
                    value={this.state.name}
                    valid={errors.name === ''}
                    invalid={errors.name !== ''}
                    onBlur={this.handleBlur('name')}
                    onChange={this.handleInputChange}
                    name="name" />
                  <FormFeedback>{errors.name}</FormFeedback>
                  <FormText className={formtextname ? "required" : "none"}>Yêu Cầu Nhập</FormText>

                </Col>

              </FormGroup>

              <FormGroup row>
                <Label sm={3}>
                  Ngày Sinh
                </Label>
                <Col sm={9}>
                  <Input
                    type="date"
                    name="doB"
                    onBlur={this.handleBlur('doB')}
                    onChange={this.handleInputChange} />

                  <FormText className={formtextdoB ? "required" : "none"}>Yêu Cầu Nhập</FormText>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>
                  Ngày Vào Công Ty
                </Label>
                <Col sm={9}>
                  <Input
                    type="date"
                    name="startDate"
                    onBlur={this.handleBlur('startDate')}
                    onChange={this.handleInputChange} />

                  <FormText className={formtextstartDate ? "required" : "none"}>Yêu Cầu Nhập</FormText>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={3}>
                  Phòng Ban
                </Label>
                <Col sm={9}>
                  <Input
                    name="department"
                    type="select"
                    valid={errors.department === ''}
                    invalid={errors.department !== ''}
                    onBlur={this.handleBlur('department')}
                    onChange={this.handleInputChange}>
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
                  </Input>
                  <FormFeedback>{errors.department}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={5}>
                  Hệ Số Lương
                </Label>
                <Col sm={7}>
                  <Input
                    name="salaryScale"
                    value={this.state.salaryScale}
                    valid={errors.salaryScale === ''}
                    invalid={errors.salaryScale !== ''}
                    onBlur={this.handleBlur('salaryScale')}
                    onChange={this.handleInputChange} />
                  <FormFeedback>{errors.salaryScale}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={5}>
                  Số Ngày Nghỉ Còn lại
                </Label>
                <Col sm={7}>
                  <Input
                    name="annualLeave"
                    value={this.state.annualLeave}
                    valid={errors.annualLeave === ''}
                    invalid={errors.annualLeave !== ''}
                    onBlur={this.handleBlur('annualLeave')}
                    onChange={this.handleInputChange} />
                  <FormFeedback>{errors.annualLeave}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label sm={5}>
                  Số Ngày Đã Làm Thêm
                </Label>
                <Col sm={7}>
                  <Input
                    name="overTime"
                    value={this.state.overTime}
                    valid={errors.overTime === ''}
                    invalid={errors.overTime !== ''}
                    onBlur={this.handleBlur('overTime')}
                    onChange={this.handleInputChange} />
                  <FormFeedback>{errors.overTime}</FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup
                check
                row
              >
                <Col
                  sm={{
                    offset: 2,
                    size: 10
                  }}
                >
                  <Button>
                    Thêm
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal >
      </div >
    )

  }
}

export default Staff;


