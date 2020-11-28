
import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Add extends Component {

    constructor() {
        super();
        this.state = {
            std_name:"",
            std_roll_no:"",
            std_result:"",
            std_percent:0
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.AddStd = this.AddStd.bind(this);
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });

        
    }


    AddStd(e) {
        e.preventDefault();
        const Student = {
            std_name:this.state.std_name,
            std_roll_no:this.state.std_roll_no,
            std_result:this.state.std_result,
            std_percent:this.state.std_percent
        }
        axios.post("http://localhost:5555/Students", Student)
            .then(() => {
                window.alert("Student added successfully!");
                this.setState({
                    std_name:"",
                    std_roll_no:"",
                    std_result:"",
                    std_percent:0
                })
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <Fragment>
                <h3 className="text-center">Add Student</h3>
                <div className="row">
                    <div className="col-lg-6 container">
                        <form onSubmit={this.AddStd}>
                        <div className="form-group">
                                <label className="font-weight-bold">Student Name</label><br/>
                                <input type="text"  
                                name="std_name" placeholder="Enter Name"
                                 value={this.state.std_name} onChange={this.handleInputChange} />
                            </div>
                            <div>
                                <label className="font-weight-bold">Roll No:</label><br/>
                                <input type="text" 
                                name="std_roll_no" placeholder="Enter Roll No:" 
                                value={this.state.std_roll_no} onChange={this.handleInputChange} />
                            </div>
                            <div>
                                <label className="font-weight-bold">Result</label><br />
                                <input type="radio" name="std_result" value="Pass" 
                                checked={this.state.std_result === 'Pass'}
                                 onChange={this.handleInputChange} />Pass&nbsp;&nbsp;
                                <input type="radio" name="std_result" value="Fail"
                                 checked={this.state.std_result === 'Fail'}
                                  onChange={this.handleInputChange} />Fail
                            </div>
                            <div>
                                <label className="font-weight-bold">Percentage</label><br/>
                                <input type="number" 
                                name="std_percent" placeholder="Enter Percentage" 
                                value={this.state.std_percent} onChange={this.handleInputChange} />
                            </div><br/>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

            </Fragment>
        )
    }

}

export default Add;

