import React, { Component } from 'react';
import { connect } from "react-redux";


class Departments extends Component {

    render() {
        var { departmentList } = this.props;
        return (
            <div className="container" >
                <div className="row text-center">
                    <h3 className="col-12">Danh sách phòng ban</h3>
                </div>
                <div className="row">
                    {departmentList.map((depart) => (
                        <div key={depart.id} className="col-12 col-md-6 col-lg-4 " style={{ margin: "15px 0px" }} >
                            <div>
                                <h3>{depart.name}</h3>
                                <div style={{ paddingLeft: "25px" }}>Số lượng nhân viên : {depart.numberOfStaff}</div>
                            </div >
                        </div >
                    ))}
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        departmentList: state.department,
    }
}

export default connect(mapStateToProps, null)(Departments);
