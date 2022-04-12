import React, { Component } from 'react';
import Footer from './FooterComponent';
import Header from './HeaderComponents';
import Staff from './StaffComponents';
import Departments from './DepartmentsComponent';
import Salary from './SalaryComponent';
import StaffDetail from './StaffDetailComponent';
import { DEPARTMENTS, STAFFS } from '../shared/staffs'
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffList: STAFFS,
            departmentList: DEPARTMENTS,
            keyword: '',
            required: true,
            check: "",
            checkSalary: "",
            staffListinit: "",

        };
    }
    componentWillMount() {
        if (localStorage && localStorage.getItem('staffList')) {
            var staffList = JSON.parse(localStorage.getItem('staffList'));
            this.setState({
                staffList: staffList,
                staffListinit: staffList,
            });
        } else {
            this.setState({
                staffList: STAFFS
            });
        }
    }



    StaffWithId = ({ match }) => {
        var { staffList } = this.state
        return (
            <StaffDetail staffDetail={staffList.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
            />
        );

    }

    onSubmit = (data) => {
        var { staffList } = this.state
        var newstaffList = {
            id: staffList.length,
            name: data.name,
            doB: data.doB,
            salaryScale: data.salaryScale,
            startDate: data.startDate,
            department: data.department,
            annualLeave: data.annualLeave,
            overTime: data.overTime,
            image: '/assets/images/alberto.png',
        }
        if (newstaffList.name !== "" && newstaffList.doB !== "" && newstaffList.startDate !== "" && newstaffList.department !== "") {
            staffList.push(newstaffList)

            this.setState({
                staffList: staffList
            })

            localStorage.setItem('staffList', JSON.stringify(staffList));
        }


    }

    // Search Name Staff
    onSearch = (keyword) => {

        const newstaffList = this.state.staffListinit.filter((staff) => {
            return staff.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
        })

        if (keyword === "") {
            this.setState({
                staffList: this.state.staffListinit
            });
        } else {
            this.setState({
                staffList: newstaffList
            });
        }
    }

    onRequired = (value) => {
        this.setState({
            required: value
        });


    }

    // Sort SalaryId Staff
    onSortSalaryId = (value) => {
        const newstaffList = this.state.staffList.sort((a, b) => {
            if (a.id > b.id) return value;
            else if (a.id < b.id) return -value;
            else return 0;
        })
        this.setState({
            staffList: newstaffList
        });

        if (value === 1) {
            this.setState({
                checkSalary: "name1"
            });
        } else {
            this.setState({
                checkSalary: "name-1"
            });
        }
    }

    // Sort Salary Staff
    onSortSalary = (value) => {
        const newstaffList = this.state.staffList.sort((a, b) => {
            if (a.salary > b.salary) return value;
            else if (a.salary < b.salary) return -value;
            else return 0;
        })
        this.setState({
            staffList: newstaffList
        });

        if (value === 1) {
            this.setState({
                checkSalary: "salary1"
            });
        } else {
            this.setState({
                checkSalary: "salary-1"
            });
        }
    }


    render() {

        var { staffList } = this.state
        // Add Salary to Object Staffs
        staffList.map((staff) => {
            let salary = staff.salaryScale * 3000000 + staff.overTime * 200000;
            staff.salary = salary

        })

        // Render Staff Detail

        return (
            <div>
                <div className="App">
                    <Header />
                    <Switch>
                        <Route exact path='/' component={() => <Staff staffList={staffList} onSubmit={this.onSubmit} onSearch={this.onSearch} onRequired={this.onRequired} required={this.state.required} />} />
                        <Route path="/staffs" component={() => <Staff staffList={staffList} onSubmit={this.onSubmit} onSearch={this.onSearch} onRequired={this.onRequired} required={this.state.required} />} exact />
                        <Route path="/staffs/:staffId" component={this.StaffWithId} />
                        <Route path="/departments" component={() => <Departments departmentList={this.state.departmentList} />} exact />
                        <Route path="/salary" component={() => <Salary salaryList={staffList} onSortSalary={this.onSortSalary} onSortSalaryId={this.onSortSalaryId} onCheckSalary={this.state.checkSalary} />} exact />
                        <Redirect from="/home" to="/" exact />
                    </Switch>
                    <Footer />
                </div>
            </div >
        );
    }
}



// function Main(props) {

//     // Add Salary to Object Staffs
//     var [staffList, setStaffList] = useState(STAFFS)
//     staffList.map((staff) => {
//         let salary = staff.salaryScale * 3000000 + staff.overTime * 200000;
//         staff.salary = salary

//     })

//     const [departmentList, setDepartmentList] = useState(DEPARTMENTS)
//     const [check, setCheck] = useState("");
//     const [checkSalary, setCheckSalary] = useState("");
//     const [isRender, setIsRender] = useState(true);

//     // Render Staff Detail
//     const StaffWithId = ({ match }) => {
//         return (
//             <StaffDetail staffDetail={staffList.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
//             />
//         );

//     }

//     // Search Name Staff
//     const onSearch = (keyword) => {
//         const newstaffListS = staffList.filter((staff) => {
//             return staff.name.toLowerCase().indexOf(keyword.toLowerCase()) !== -1;
//         })
//         if (keyword === "") {
//             setStaffList(STAFFS)
//         } else {
//             setStaffList(newstaffListS)
//         }
//     }

//     // Sort Name Staff
//     const onSort = (value) => {
//         const newstaffList = staffList.sort((a, b) => {
//             if (a.name > b.name) return value;
//             else if (a.name < b.name) return -value;
//             else return 0;
//         })
//         setStaffList(newstaffList)
//         setIsRender(!isRender)
//         setCheck(value)
//         console.log(isRender)

//     }

//     // Reset Staff
//     const onReset = () => {
//         setStaffList(STAFFS)
//     }

//     // Life Cycle

//     useEffect(() => {
//     }, [staffList, setIsRender])

//     // Sort SalaryId Staff
//     const onSortSalaryId = (value) => {
//         const newstaffList = staffList.sort((a, b) => {
//             if (a.id > b.id) return value;
//             else if (a.id < b.id) return -value;
//             else return 0;
//         })
//         setStaffList(newstaffList)
//         setIsRender(!isRender)
//         if (value === 1) {
//             setCheckSalary("name1")
//         } else {
//             setCheckSalary("name-1")
//         }
//     }

//     // Sort Salary Staff
//     const onSortSalary = (value) => {
//         const newstaffList = staffList.sort((a, b) => {
//             if (a.salary > b.salary) return value;
//             else if (a.salary < b.salary) return -value;
//             else return 0;
//         })
//         setStaffList(newstaffList)
//         setIsRender(!isRender)
//         if (value === 1) {
//             setCheckSalary("salary1")
//         } else {
//             setCheckSalary("salary-1")
//         }
//     }

//     return (
//         <div className="App">
//             <Header />
//             <Switch>
//                 <Route exact path='/' component={() => <Staff staffList={staffList} onSearch={onSearch} onSort={onSort} onCheck={check} onReset={onReset} />} />
//                 <Route path="/staffs" component={() => <Staff staffList={staffList} onSearch={onSearch} onSort={onSort} onCheck={check} onReset={onReset} />} exact />
//                 <Route path="/staffs/:staffId" component={StaffWithId} />
//                 <Route path="/departments" component={() => <Departments departmentList={departmentList} />} exact />
//                 <Route path="/salary" component={() => <Salary salaryList={staffList} onSortSalary={onSortSalary} onSortSalaryId={onSortSalaryId} onCheckSalary={checkSalary} />} exact />
//                 <Redirect from="/home" to="/" exact />
//             </Switch>

//             <Footer />
//         </div>
//     );
// }

export default Main;