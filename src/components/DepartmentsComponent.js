import React, { Component } from 'react';
import { connect } from "react-redux";
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { FadeTransform } from 'react-animation-components';

const mapStateToProps = (state) => {
    return {
        departmentList: state.departmentList.departmentList,
        isLoading: state.departmentList.isLoading,
        errMess: state.departmentList.errMess,
    }
}

class Departments extends Component {

    render() {
        var { departmentList, isLoading, errMess } = this.props;
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
                <h4>{errMess}</h4>
            );
        }
        else {
            return (
                <div className="container" >
                    <div className="row text-center">
                        <h3 className="col-12">Danh sách phòng ban</h3>
                    </div>
                    <FadeTransform
                        in
                        transformProps={{
                            exitTransform: 'scale(0.5) translateX(-50%) translateY(-50%)'
                        }}>
                        <div className="row">
                            {departmentList.map((depart) => (
                                <div key={depart.id} className="col-12 col-md-6 col-lg-4 " style={{ margin: "15px 0px" }} >
                                    <Link to={`/departments/${depart.id}`}>
                                        <div>
                                            <h3>{depart.name}</h3>
                                            <div style={{ paddingLeft: "25px" }}>Số lượng nhân viên : {depart.numberOfStaff}</div>
                                        </div >
                                    </Link>
                                </div >
                            ))
                            }
                        </div>
                    </FadeTransform>
                </div>
            );
        }
    }
}

export default connect(mapStateToProps, null)(Departments);
