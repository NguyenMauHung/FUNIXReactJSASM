import React from 'react';
import PropTypes from 'prop-types';

Salary.propTypes = {
    salaryList: PropTypes.array
};

Salary.defaultProps = {
    salaryList: [],

}

function Salary(props) {
    const { salaryList } = props;

    return (
        <div className="container" >
            <div className="row text-center">
                <h3 className="col-12">Danh sách phòng ban</h3>
            </div>
            <div className="row">
                {salaryList.map((staff) => (
                    <div key={staff.id} className="col-12 col-md-6 col-lg-4" style={{ margin: "15px 0px" }}>
                        <h5>{staff.name}</h5>
                        <div style={{ paddingLeft: "25px", margin: "15px 0px" }}>Mã nhân viên : {staff.id}</div>
                        <div style={{ paddingLeft: "25px", margin: "15px 0px" }}>Hệ số lương : {staff.salaryScale}</div>
                        <div style={{ paddingLeft: "25px", margin: "15px 0px" }}>Số giờ làm thêm : {staff.overTime}</div>
                        <div style={{ paddingLeft: "35px", margin: "15px 0px" }}>Lương :{staff.salaryScale * 3000000 + staff.overTime * 200000}  </div>
                    </div >


                ))}
            </div>
        </div>


    );
}

export default Salary;