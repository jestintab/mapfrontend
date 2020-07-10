import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      username: '',
      password: '',
      alertmsg: ''
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    })
  }



  onSubmit(e) {
    e.preventDefault();

    const driver = {
      driver_username: this.state.username,
      password: this.state.password

    }

    console.log(driver);

    axios.post('http://localhost:5000/drivers/add', driver)
      .then(res => {
     
        this.setState({ alertmsg: res.data.alertmsg });
        console.log(this.state.alertmsg)
      });

    this.setState({
      username: '',
      password:''
    })
  }

  render() {

    let alert= '';
    if(this.state.alertmsg){
      alert = <div className="alert alert-info alert-dismissible fade show"
        role="alert">
        <strong>{this.state.alertmsg}</strong>
      </div>
    }else {
      alert = '';
    }


    return (

      <div>
        {alert}
        <h3>Create New Driver</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Driver username: </label>
            <input type="text"
              required 
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Password: </label>
            <input type="password"
              required
              className="form-control"
              value={this.state.password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}