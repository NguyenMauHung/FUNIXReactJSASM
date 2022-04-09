import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import * as actions from "./../actions/index";


const RenderSalary = ({ staff }) => {

    return (
        <div key={staff.id} className="col-12 col-md-6 col-lg-4" style={{ margin: "15px 0px" }}>
            <h5>{staff.name}</h5>
            <div style={{ paddingLeft: "25px", margin: "15px 0px" }}>Mã nhân viên : {staff.id}</div>
            <div style={{ paddingLeft: "25px", margin: "15px 0px" }}>Hệ số lương : {staff.salaryScale}</div>
            <div style={{ paddingLeft: "25px", margin: "15px 0px" }}>Số giờ làm thêm : {staff.overTime}</div>
            <div style={{ paddingLeft: "35px", margin: "15px 0px" }}> <NumberFormat
                value={staff.salary}
                displayType="text"
                thousandSeparator="."
                decimalSeparator=","
                decimalScale={0}
            />
            </div>
        </div >

    );
};

class Salary extends Component {

    onClick = (Id, Salary) => {
        this.props.onSort({
            sortById: Id,
            sortBySalary: Salary
        })
    }

    render() {
        var { staffList, sort } = this.props;

        // Sort Salary Staff

        if (sort.sortById === 1) {
            staffList.sort((a, b) => {
                if (a.id > b.id) return sort.sortBySalary;
                else if (a.id < b.id) return -sort.sortBySalary;
                else return 0;
            })
        }
        else {
            staffList.sort((a, b) => {
                if (a.salary > b.salary) return sort.sortBySalary;
                else if (a.salary < b.salary) return -sort.sortBySalary;
                else return 0;
            })
        }

        return (
            <div className="container" >
                <div className="row text-center">
                    <h3 className="col-12">Bảng Lương Nhân Viên</h3>
                    <div className="col-12">
                        <ButtonGroup style={{ margin: "10px auto" }}>
                            <div style={{ marginLeft: "55px" }}>Sắp xếp theo Mã nhân viên :</div>
                            <Button style={{ marginLeft: "35px" }} color={this.props.sort.sortById === 1 && this.props.sort.sortBySalary === 1 ? "success" : "primary"} onClick={() => this.onClick(1, 1)}>
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Mã Nhân Viên Từ Thấp Đến Cao
                                </span>
                            </Button>

                            <Button color={this.props.sort.sortById === 1 && this.props.sort.sortBySalary === -1 ? "success" : "primary"} onClick={() => this.onClick(1, -1)}>
                                <span className="fa fa-sort-alpha-desc pr-5">
                                    Mã Nhân Viên Từ Cao Xuống Thấp
                                </span>
                            </Button>
                        </ButtonGroup>
                    </div>
                    <div className="col-12">
                        <ButtonGroup style={{ margin: "10px auto" }}>
                            <div style={{ margin: "10px 10px" }}>Sắp xếp theo Lương Nhân Viên :</div>
                            <Button color={this.props.sort.sortById === -1 && this.props.sort.sortBySalary === 1 ? "success" : "primary"} onClick={() => this.onClick(-1, 1)}>
                                <span className="fa fa-sort-amount-asc">Lương Nhân Viên Từ Thấp Đến Cao</span>
                            </Button>
                            <Button color={this.props.sort.sortById === -1 && this.props.sort.sortBySalary === -1 ? "success" : "primary"} onClick={() => this.onClick(-1, -1)}>
                                <span className="fa fa-sort-amount-desc">Lương Nhân Viên Từ Cao Xuống Thấp</span>
                            </Button>
                        </ButtonGroup>
                    </div>

                </div>
                <div className="row">
                    {staffList.map((staff) => (
                        <RenderSalary staff={staff} />
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        staffList: state.staffList,
        sort: state.sort,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSort: (sort) => {
            dispatch(actions.sortStaff(sort))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Salary);

