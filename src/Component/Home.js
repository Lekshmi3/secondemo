import React, { Component } from 'react';
import axios from 'axios';
 

class Home extends Component {

    constructor() {
        super();
        this.state = {
            students: []
        }
    }

    render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Student Name</th>
                            <th>Roll No:</th>
                            <th>Result</th>
                            <th>Percentage</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.students && this.state.students.map((std) => {
                                return (
                                    <tr key={std.id}>
                                        <td>{std.id}</td>
                                        <td>{std.std_name}</td>
                                        <td>{std.std_roll_no}</td>
                                        <td>{std.std_result}</td>
                                        <td>{std.std_percent}</td>
                                        <td>
                                            <a href={`/edit-std/${std.id}`}>Edit</a> |&nbsp;
                                            <a href="javascript:void(0)" onClick={() => this.deletestudent(std.id)}>Delete</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }

    componentDidMount() {
        this.fetchstudents();
    }

    fetchstudents() {
        // api integration from get students
        axios.get("http://localhost:5555/students")
            .then((res) => {
                console.log(res);
                this.setState({
                    students: res.data
                });
            }).catch((err) => {
                console.log(err);
            });
    }

    deletestudent(id) {
        if (window.confirm('Are you sure you want to delete?')) {
            console.log("Delete student where id is", id);
            
            const url = `http://localhost:5555/students/${id}`; // tstdlate literal syntax
            axios.delete(url)
                .then(() => {
                    console.log("deleted successfully");
                    this.fetchstudents();
                })
        }

    }

}

export default Home