import React, { Component } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import io from 'socket.io-client';

export default class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.sendNotice = this.sendNotice.bind(this);

    this.state = {
      drivers: [],
      onlineDrivers: [],
      newCoordinate:''
      
    };
   
  }

  componentDidMount() {
    this.socket = io.connect('http://localhost:5100'); 

    axios
      .get("http://localhost:5000/drivers/")
      .then((response) => {
        const onlineDrivers = response.data.filter((driver) => {
          if (driver.online_status === 1) {
            return driver;
          }
        });
        this.setState({
          drivers: response.data,
          onlineDrivers: onlineDrivers,
        });
        console.log(response.data);
        console.log(onlineDrivers);
      })

      .catch((error) => {
        console.log(error);
      });

      this.socket.on('location', d => { 
       // console.log(d);
        const newCoordinate = { lat:d.data.latitude, lng: d.data.longitude };
        const driver_id = d.data.driver_id;
        
        
        this.setState({
              newCoordinate: newCoordinate
            })
    });

   
  }
  sendNotice(driver) {
    console.log("Send PushNotification"+driver.driver_username);
  }
  render() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyBwxyQTz_O_Glz94XLRLbKaTXAWSA2bDeg">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
          {this.state.onlineDrivers.map((driver) => (
            <Marker
              position={driver.location}
              label={driver.driver_username}
              onClick={() => {
                this.sendNotice(driver);
              }}
            >
              {" "}
            </Marker>
          ))}
            <Marker position={this.state.newCoordinate} label="Real Time" ></Marker>

        </GoogleMap>
      </LoadScript>
    );
  }
}


const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 25.3252981,
  lng: 51.5261059,
};
