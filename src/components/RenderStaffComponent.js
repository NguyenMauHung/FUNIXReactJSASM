import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "./../actions/index";
import { Link, withRouter } from 'react-router-dom';

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchDeleteStaff: (id) => {
            dispatch(actions.fetchDeleteStaff(id))

        },
    }

}

class RenderStaff extends Component {
    constructor(props) {
        super(props);
    }
    onDeleteStaff = (id) => {
        if (confirm("Bạn chắc chắn muốn xóa hay không")) { // eslint-disable-line

            this.props.fetchDeleteStaff(id)
        }
    }
    render() {
        var { staffList } = this.props
        return (
            <div className="row">

                {staffList.map((staff) => (
                    <div key={staff.id} className="col-6 col-md-4 col-lg-2 ">
                        <Link to={`/staffs/${staff.id}`}>
                            <div style={{ margin: "5px" }} >
                                <img src={staff.image} alt={staff.name} />
                                <div>{staff.name}</div>
                            </div >
                        </Link>

                        <button type="button" class="btn-danger" style={{ margin: "5px" }} onClick={() => this.onDeleteStaff(staff.id)}>Delete</button>

                    </div >

                ))
                }
            </div>
        )
    }
}
export default withRouter(connect(null, mapDispatchToProps)(RenderStaff));