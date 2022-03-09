import React from 'react';
import Moment from 'react-moment';

function StaffDetail(props) {
    const { staffDetail } = props;
    if (staffDetail != null) {
        return (
            <div className="col-12 m-3">
                <h4>Họ và tên: {staffDetail.name}</h4>
                <p>Ngày sinh:  <Moment format="DD/MM/YYYY">
                    {staffDetail.doB}
                </Moment> </p>
                <p>Ngày vào công ty:  <Moment format="DD/MM/YYYY">
                    {staffDetail.startDate}
                </Moment></p>
                <p>Phòng ban: {staffDetail.department.name}</p>
                <p>Số ngày nghỉ còn lại: {staffDetail.annualLeave}</p>
                <p>Số ngày đã làm thêm: {staffDetail.overTime}</p>
            </div>
        );
    } else {
        return (
            <div></div>
        );
    }


}

export default StaffDetail;