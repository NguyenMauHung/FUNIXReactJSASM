import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardText, Jumbotron } from "reactstrap";

Salary.propTypes = {
    salaryList: PropTypes.array
};

Salary.defaultProps = {
    salaryList: [],

}

const RenderSalary = ({ staff }) => {
    const formatDecimal = require("format-decimal");
    let salary = staff.salaryScale * 3000000 + staff.overTime * 200000;
    return (
        <div key={staff.id} className="col-12 col-md-6 col-lg-4" style={{ margin: "15px 0px" }}>
            <h5>{staff.name}</h5>
            <div style={{ paddingLeft: "25px", margin: "15px 0px" }}>Mã nhân viên : {staff.id}</div>
            <div style={{ paddingLeft: "25px", margin: "15px 0px" }}>Hệ số lương : {staff.salaryScale}</div>
            <div style={{ paddingLeft: "25px", margin: "15px 0px" }}>Số giờ làm thêm : {staff.overTime}</div>
            <div style={{ paddingLeft: "35px", margin: "15px 0px" }}>   Lương:{" "}
                {formatDecimal(salary, {
                    decimal: ".",
                    thousands: ",",
                    precision: 0,
                })}{" "}</div>
        </div >

    );

};


function Salary(props) {
    const { salaryList } = props;

    return (
        <div className="container" >
            <div className="row text-center">
                <h3 className="col-12">Bảng Lương Nhân Viên</h3>
            </div>

            <div id="sort" className="row">
                <div className="col-12">
                    <h5 style={{ float: "left" }} >Sắp Xếp Theo Mã Nhân Viên </h5>
                    <Button style={{ float: "left", marginLeft: "15px" }} >
                        <span class="fa fa-sort-amount-asc"></span> Mã Nhân Viên Từ Thấp Đến Cao
                    </Button>

                    <Button>
                        <span class="fa fa-sort-amount-desc"></span> Mã Nhân Viên Từ Cao Xuống Thấp
                    </Button>
                </div>
                <div className="col-12" style={{ marginTop: "10px" }}>
                    <h5 style={{ float: "left" }} >Sắp Xếp Theo Lương </h5>
                    <Button style={{ float: "left", marginLeft: "50px" }} >
                        <span class="fa fa-sort-amount-asc"></span> Lương Nhân Viên Từ Thấp Đến Cao
                    </Button>

                    <Button>
                        <span class="fa fa-sort-amount-desc"></span> Lương Nhân Viên Từ Cao Xuống Thấp
                    </Button>
                </div>

            </div>

            <div className="row">
                {salaryList.map((staff) => (
                    <RenderSalary
                        staff={staff}
                    />
                ))}
            </div>
        </div>


    );
}

export default Salary;