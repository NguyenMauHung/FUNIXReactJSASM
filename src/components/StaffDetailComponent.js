import React from 'react';
import Moment from 'react-moment';
import {
    Card, CardImg, CardText,
    CardTitle, CardBody, Row, Col, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link } from 'react-router-dom';

function StaffDetail({ staffDetail }) {

    if (staffDetail != null) {
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/staffs">Nhân Viên</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{staffDetail.name}</BreadcrumbItem>
                    </Breadcrumb>

                </div>
                <Row style={{ margin: "15px 0px" }}>
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
                                            <p>Phòng ban: {staffDetail.department.name}</p>
                                            <p>Số ngày nghỉ còn lại: {staffDetail.annualLeave}</p>
                                            <p>Số ngày đã làm thêm: {staffDetail.overTime}</p>
                                        </CardText>

                                    </CardBody>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

            </div>
        );
    } else {
        return (
            <div></div>
        );
    }


}

export default StaffDetail;