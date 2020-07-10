import React, { Component } from "react";
import axios from "axios";
import moment from "moment";
import { GoogleMap, LoadScript, Polygon } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const DriversList = (props) => (
  <li
    onClick={() => {
      props.onDriverChange(props.driver._id);
    }}
    className="list-group-item"
  >
    {props.driver.driver_username.toUpperCase()}
  </li>
);

const TripsList = (props) => (
  <div className="list-group-item">
    <label>Trip: {props.index + 1} </label>
    <br />
    <label>Start Time:</label>
    {moment(props.trip.start_time).format(" h:mm a - MM-DD-YYYY")} <br />
    <label>End Time:</label>
    {moment(props.trip.end_time).format(" h:mm a - MM-DD-YYYY")} <br />
    <label>Kilometers:</label>
    {props.trip.kilometers}km
    <label
      className="btn btn-warning btn-sm"
      data-toggle="modal"
      data-target="#mapModal"
      onClick={props.onMapClick(props.trip.drivepaths)}
    >
      View this trip on a map
    </label>
    <div className="modal" id="mapModal" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Map View</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <LoadScript googleMapsApiKey="AIzaSyBwxyQTz_O_Glz94XLRLbKaTXAWSA2bDeg">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={props.trip.drivepaths[0]}
                zoom={10}
              >
                <Polygon paths={props.trip.drivepaths}></Polygon>
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default class Driver extends Component {
  constructor(props) {
    super(props);

    this.onDriverChange = this.onDriverChange.bind(this);
    this.onMapClick = this.onMapClick.bind(this);

    this.state = {
      drivers: [],
      trips: [],
      selectedDriver: {}
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/drivers/")
      .then((response) => {
        this.setState({ drivers: response.data });
        console.log(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }

  onDriverChange(key) {
    const selectedDriver = this.state.drivers.filter((driver) => {
      if (driver._id === key) return driver;
    });
    //console.log(selectedDriver[0].trips);
    this.setState({
      trips: selectedDriver[0].trips,
      selectedDriver: selectedDriver
    });
  }
  onMapClick = (paths) => () => {
    //console.log(paths);
  };

  driversList() {
    if (this.state.drivers == null) {
      return <div> Loading... </div>;
    }
    return this.state.drivers.map((driver) => {
      return (
        <DriversList
          driver={driver}
          key={driver._id}
          onDriverChange={this.onDriverChange}
        />
      );
    });
  }

  tripsList() {
    if (this.state.trips.length != 0) {
      return this.state.trips.map((trip, index) => {
        return (
          <TripsList
            trip={trip}
            index={index}
            key={trip._id}
            driver={this.state.selectedDriver}
            onMapClick={this.onMapClick}
          />
        );
      });
    } else {
      return <div> No Trips for this driver </div>;
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row row-cols-2">
          <div className="col">
            <label className="col-sm-5 col-form-label col-form-label-lg">
              Drivers List
            </label>
            <ul className="list-group">{this.driversList()}</ul>
          </div>
          <div className="col">
            <label className="col-sm-5 col-form-label col-form-label-lg">
              Trips List
            </label>
            {this.tripsList()}
          </div>
        </div>
      </div>
    );
  }
}
