import React, { useState } from 'react';
import PropTypes from 'prop-types';
import StaffDetail from './StaffDetailComponent';

Menu.propTypes = {
  staffList: PropTypes.array,

};

Menu.defaultProps = {
  staffList: [],

}


function Menu(props) {
  const { staffList } = props;
  const [staffclick, setStaffClick] = useState(null)

  const StaffSelect = (staff) => {
    setStaffClick(staff);
  }
  return (
    <div className="container" >
      <div className="row text-center">
        <h3 className="col-12">Danh sách nhân viên</h3>
      </div>
      <div className="row">
        {staffList.map((staff) => (
          <div key={staff.id} className="col-6 col-md-4 col-lg-2 ">
            <div onClick={() => StaffSelect(staff)} style={{ margin: "5px" }} >
              <img src={staff.image} alt={staff.name} />
              <div>{staff.name}</div>
            </div >

          </div >

        ))
        }
      </div>
      <div>Bấm vào tên nhân viên để xem thông tin</div>

      <StaffDetail staffDetail={staffclick} />

    </div>
  )

}

export default Menu;


