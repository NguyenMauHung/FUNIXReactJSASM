import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom';
import { fetchDepartmentStaff } from '../actions';
import { FadeTransform } from 'react-animation-components';

class DepartmentDetail extends Component {

    constructor(props) {
        super(props);
        var { match } = this.props;
        if (match) {
            var departmentsId = match.params.departmentsId;
            this.props.DepartmentStaff(departmentsId)
        }
    }

    render() {
        var { staffList, match } = this.props;
        if (match) {
            var departmentsId = match.params.departmentsId;
        }

        const findname_department = (departmentsId) => {
            switch (departmentsId) {
                case "Dept01":
                    return name_department = "Sale"
                case "Dept02":
                    return name_department = "HR"
                case "Dept03":
                    return name_department = "Marketing"
                case "Dept04":
                    return name_department = "IT"
                case "Dept05":
                    return name_department = "Finance"
                default:
                    return departmentsId
            }
        }

        var name_department = findname_department(departmentsId);
        if (staffList.length > 0) {
            staffList = staffList.filter((staff) => {
                return staff.departmentId === departmentsId;
            })
        }

        return (
            <div className="container" >
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/departments">Phòng Ban</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{name_department}</BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div className="row">
                    {staffList.map((staff) => (
                        <div key={staff.id} className="col-6 col-md-4 col-lg-2 ">
                            <FadeTransform
                                in
                                transformProps={{
                                    exitTransform: 'scale(0.5) translateX(-50%) translateY(-50%)'
                                }}>
                                <Link to={`/staffs/${staff.id}`}>
                                    <div style={{ margin: "5px" }} >
                                        <img src={staff.image} alt={staff.name} />
                                        <div>{staff.name}</div>
                                    </div >
                                </Link>
                            </FadeTransform>
                        </div >
                    ))
                    }
                </div>
            </div >
        )
    }
}

const mapStateToProps = (state) => {

    return {
        staffList: state.departmentList.departmentStaff
    }

}

const mapDispatchToProps = (dispatch, props) => {
    return {
        DepartmentStaff: (id) => {
            dispatch(fetchDepartmentStaff(id))
        },
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DepartmentDetail));
