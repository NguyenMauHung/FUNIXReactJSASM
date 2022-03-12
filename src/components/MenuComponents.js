import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card, CardImg, CardImgOverlay,
  CardTitle, Breadcrumb, BreadcrumbItem
} from 'reactstrap';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import StaffDetail from './StaffDetailComponent';

Menu.propTypes = {
  staffList: PropTypes.array,

};

Menu.defaultProps = {
  staffList: [],

}


function Menu(props) {
  const { staffList } = props;

  return (
    <div className="container" >
      <div className="row">
        <div className="col-12">
          <h3>Nhân Viên</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        {staffList.map((staff) => (
          <div key={staff.id} className="col-6 col-md-4 col-lg-2 ">
            <Link to={`/staffs/${staff.id}`}>
              <div style={{ margin: "5px" }} >
                <img src={staff.image} alt={staff.name} />
                <div>{staff.name}</div>
              </div >
            </Link>
          </div >

        ))
        }
      </div>
      <div>Bấm vào tên nhân viên để xem thông tin</div>



    </div>
  )

}

export default Menu;


