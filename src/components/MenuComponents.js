import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Menu({ staffList, onSearch, onSort, onCheck, onReset }) {
  const [keyword, setKeyword] = useState("")
  const Search = () => {
    onSearch(keyword)
  }

  const Reset = () => {
    onReset()
  }

  return (
    <div className="container" >
      <div className="row">
        <div className="col-12">
          <h3>Nhân Viên</h3>
          <hr />
        </div>
        <div className="row">
          <div className="col-12">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                onChange={(event) => {
                  setKeyword(event.target.value)
                }}
                onKeyUp={(event) => {
                  var keycode = (event.keyCode ? event.keyCode : event.which);
                  if (keycode == '13') {
                    setKeyword(event.target.value)
                    Search()
                  }
                }}

                placeholder="Nhập tên nhân viên" />

              <span className="input-group-btn">
                <button className="btn btn-primary" type="button" onClick={Search}>
                  <span className="fa fa-search mr-5"></span>Tìm kiếm
                </button>
              </span>
              <span className="input-group-btn" style={{ marginLeft: "5px" }}>
                <button className="btn btn-primary" type="button" onClick={Reset}>
                  <span className="fa fa-refresh mr-5"></span>Reset
                </button>
              </span>
              <div className="dropdown" style={{ marginLeft: "5px" }}>
                <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                  Sắp Xếp <span className="fa fa-caret-square-o-down ml-5"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <li onClick={() => {

                    onSort(1)

                  }}>
                    <a role="button" className={onCheck === 1 ? "sort_selected" : ""}>
                      <span className="fa fa-sort-alpha-asc pr-5">
                        Tên A-Z
                      </span>
                    </a>
                  </li>
                  <li onClick={() => {

                    onSort(-1)

                  }}>
                    <a role="button" className={onCheck === -1 ? "sort_selected" : ""}>
                      <span className="fa fa-sort-alpha-desc pr-5">
                        Tên Z-A
                      </span>
                    </a>
                  </li>
                </ul >
              </div >

            </div>
          </div>

          <hr />
        </div>
      </div >
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
    </div >
  )

}

export default Menu;


