import React, { Component, Fragment } from 'react';
import axios from 'axios';

class Edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
            std_name:"",
            std_roll_no:"",
            std_result:"",
            std_percent:0
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.UpdateStd = this.UpdateStd.bind(this);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        const id = params.id;
        const url = `http://localhost:5555/students/${id}`;
        axios.get(url)
            .then((res) => {
                console.log(res.data);
                const { id,std_name,std_roll_no,std_result,std_percent } = res.data;
                this.setState({
                    id,std_name,std_roll_no,std_result,std_percent
                })
            })
            .catch(err => console.log(err));
    }

    handleInputChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
        //  name validation
        if (e.target.name === 'std_name') {
            if (e.target.value === '' || e.target.value === null) {
                this.setState({
                    std_nameError: true
                });
            } else {
                this.setState({
                    std_nameError: false,
                    std_name: e.target.value
                });
            }
        }
    }

    UpdateStd(e) {
        e.preventDefault();
        const students = {
            
            std_name:this.state.std_name,
            std_roll_no:this.state.std_roll_no,
            std_result:this.state.std_result,
            std_percent:this.state.std_percent
           
        }
        const url = `http://localhost:5555/students/${this.state.id}`;
        axios.put(url, students)
            .then(() => {
                window.alert("student updated successfully!");
                this.props.history.push("/");
            }).catch((err) => {
                console.log(err);
            })
    }

    render() {
        return (
            <Fragment>
                <h3>Edit student</h3>
                <div className="row">
                    <div className="col-lg-12 container">
                        <form onSubmit={this.UpdateStd}>
                            <div>
                                <label className="font-weight-bold">Student Name</label><br/>
                                <input type="text"  
                                name="std_name" placeholder="Enter Name"
                                 value={this.state.std_name} onChange={(e)=>this.handleInputChange(e)} />
                                  <div>
                                {this.state.std_nameError ? 'First Name Required' : ''}
                            </div>
                            </div>
                            <div >
                                <label className="font-weight-bold">Roll No:</label><br/>
                                <input type="text"  
                                name="std_roll_no" placeholder="Enter Roll No:" 
                                value={this.state.std_roll_no} onChange={this.handleInputChange} />
                            </div>
                            <div >
                                <label className="font-weight-bold">Result</label><br />
                                <input type="radio" name="std_result" value="Pass" 
                                checked={this.state.std_result === 'Pass'}
                                 onChange={this.handleInputChange} />Pass&nbsp;&nbsp;
                                <input type="radio" name="std_result" value="Fail"
                                 checked={this.state.std_result === 'Fail'}
                                  onChange={this.handleInputChange} />Fail
                            </div>
                            <div>
                                <label className="font-weight-bold">Percentage</label><br></br>
                                <input type="number" 
                                name="std_percent" placeholder="Enter Percentage" 
                                value={this.state.std_percent} onChange={this.handleInputChange} />
                            </div><br/>
                            <div>
                                <button type="submit" className="btn btn-primary btn-sm">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }

}

export default Edit;