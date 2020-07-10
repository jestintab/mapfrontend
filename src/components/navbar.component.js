import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <Link to="/" className="navbar-brand" href="#">
          Map Track
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/drivers" className="nav-link" href="#">
                Drivers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/map" className="nav-link" href="#">
                Map
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
