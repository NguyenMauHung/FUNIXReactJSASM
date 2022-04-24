import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';
import {
    Card, CardImg, CardText, CardTitle, CardBody, Row, Col, Breadcrumb, BreadcrumbItem,
    Label, Button, FormGroup, Input, FormFeedback, Form
} from 'reactstrap';
import { DEPARTMENTS } from '../shared/staffs';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import { FetchEditStaffDetail, FetchUpdateStaffDetail } from "./../actions/index";

class StaffDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            doB: "",
            salaryScale: 1,
            startDate: "",
            department: DEPARTMENTS[0],
            annualLeave: 0,
            overTime: 0,
            isDisplay: true,
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

    componentDidMount() {
        var { match } = this.props;
        if (match) {
            var id = match.params.staffId;
            this.props.EditStaffDetail(id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.staffDetail) {
            var { staffDetail } = nextProps;
            this.setState({
                name: staffDetail.name,
                doB: moment(staffDetail.doB).format('YYYY-MM-DD'),
                salaryScale: staffDetail.salaryScale,
                startDate: moment(staffDetail.startDate).format('YYYY-MM-DD'),
                department: staffDetail.departmentId,
                annualLeave: staffDetail.annualLeave,
                overTime: staffDetail.overTime,
            })
        }
    }

    toggleForm = () => {
        this.setState({
            isDisplay: !this.state.isDisplay
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
            errors.annualLeave = 'Số ngày nghỉ còn lại phải là bội số của 0.5 như 1 hoặc 1.5 và không quá 9 ngày';
        if (this.state.touched.overTime && !reg2.test(overTime))
            errors.overTime = 'Số ngày làm thêm phải là số nguyên và không quá 30 ngày';
        return errors
    }

    //Add Staff
    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var { match } = this.props;
        if (match) {
            var id = match.params.staffId;
            var newstaffList = {
                id: id,
                name: this.state.name,
                doB: this.state.doB,
                salaryScale: this.state.salaryScale,
                startDate: this.state.startDate,
                departmentId: this.state.department,
                annualLeave: this.state.annualLeave,
                overTime: this.state.overTime,
                image: '/assets/images/alberto.png',
            }
            this.props.UpdateStaffDetail(newstaffList, id)
            this.setState({
                isDisplay: !this.state.isDisplay
            });
        }
    }

    render() {
        var { staffDetail } = this.props
        const errors = this.validate(this.state.name, this.state.department, this.state.salaryScale, this.state.annualLeave, this.state.overTime);
        if (staffDetail != null) {
            for (let i = 0; i < DEPARTMENTS.length; i++) {
                if (staffDetail.departmentId == DEPARTMENTS[i].id) {
                    var department_name = DEPARTMENTS[i].name
                }
            }

            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/staffs">Nhân Viên</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{staffDetail.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>

                    <Row style={{ margin: "15px 0px" }} className={this.state.isDisplay ? "" : "ToggleForm"}>
                        <Col>
                            <Card>
                                <Row className="no-gutters">
                                    <Col md="4">
                                        <CardImg
                                            top
                                            width="100%"
                                            src={staffDetail.image}
                                            alt={staffDetail.name}
                                        />
                                    </Col>
                                    <Col md="8">
                                        <CardBody>
                                            <CardTitle>Họ và Tên : {staffDetail.name}</CardTitle>

                                            <CardText>
                                                <p>Ngày sinh:  <Moment format="DD/MM/YYYY">
                                                    {staffDetail.doB}
                                                </Moment> </p>
                                                <p>Ngày vào công ty:  <Moment format="DD/MM/YYYY">
                                                    {staffDetail.startDate}
                                                </Moment></p>
                                                <p>Phòng ban: {department_name}</p>
                                                <p>Hệ số lương: {staffDetail.salaryScale}</p>
                                                <p>Số ngày nghỉ còn lại: {staffDetail.annualLeave}</p>
                                                <p>Số ngày đã làm thêm: {staffDetail.overTime}</p>

                                                <button type="button" class="btn btn-primary" onClick={this.toggleForm} >Update Thông Tin</button>
                                            </CardText>
                                        </CardBody>
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>
                    <div className={this.state.isDisplay ? "ToggleForm" : ""}>

                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup row>
                                <Label sm={2}>
                                    Tên
                                </Label>
                                <Col sm={5}>
                                    <Input
                                        value={this.state.name}
                                        valid={errors.name === ''}
                                        invalid={errors.name !== ''}
                                        onBlur={this.handleBlur('name')}
                                        onChange={this.handleInputChange}
                                        name="name" />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>
                                    Ngày Sinh
                                </Label>
                                <Col sm={5}>
                                    <Input
                                        type="date"
                                        name="doB"
                                        value={this.state.doB}
                                        onBlur={this.handleBlur('doB')}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>
                                    Ngày Vào Công Ty
                                </Label>
                                <Col sm={5}>
                                    <Input
                                        type="date"
                                        name="startDate"
                                        value={this.state.startDate}
                                        onBlur={this.handleBlur('startDate')}
                                        onChange={this.handleInputChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>
                                    Phòng Ban
                                </Label>
                                <Col sm={5}>
                                    <Input
                                        name="department"
                                        type="select"
                                        valid={errors.department === ''}
                                        invalid={errors.department !== ''}
                                        value={this.state.department}
                                        onBlur={this.handleBlur('department')}
                                        onChange={this.handleInputChange}>
                                        <option value="Dept01">
                                            Sale
                                        </option>
                                        <option value="Dept02">
                                            HR
                                        </option>
                                        <option value="Dept03">
                                            Marketing
                                        </option>
                                        <option value="Dept04">
                                            IT
                                        </option>
                                        <option value="Dept05">
                                            Finance
                                        </option>
                                    </Input>
                                    <FormFeedback>{errors.department}</FormFeedback>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>
                                    Hệ Số Lương
                                </Label>
                                <Col sm={5}>
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
                                <Label sm={2}>
                                    Số Ngày Nghỉ Còn lại
                                </Label>
                                <Col sm={5}>
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
                                <Label sm={2}>
                                    Số Ngày Đã Làm Thêm
                                </Label>
                                <Col sm={5}>
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
                                    <Button type="button" color="primary" style={{ margin: "0px 10px" }} onClick={this.toggleForm}>
                                        Trở Lại
                                    </Button>
                                    <Button type="submit" color="primary">
                                        Lưu
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        staffDetail: state.staffList.staffDetail[0]
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        EditStaffDetail: (id) => {
            dispatch(FetchEditStaffDetail(id))
        },
        UpdateStaffDetail: (newstaff, id) => {
            dispatch(FetchUpdateStaffDetail(newstaff, id))
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StaffDetail));