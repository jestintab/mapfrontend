import React, { Component } from 'react';

import auth from "../auth.js";
import {
    Link
} from "react-router-dom";


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container text-center mt-5 " >
                <div className="mb-5">
                   <Link to="/driver/add" className="btn  btn-primary mr-1" href="#">Add new driver</Link>
                </div>
                <button className="btn btn-lg btn-success"
                    onClick={
                        () => {
                            auth.login(() => {
                                this.props.history.push("/drivers")
                            })
                        }
                    }>View Drivers</button>
            </div>
        );
    }
}