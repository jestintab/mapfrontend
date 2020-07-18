import React, { Component } from "react";
import axios from "axios";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import PubNubReact from 'pubnub-react';

export default class MapComponent extends Component {
  constructor(props) {
    super(props);

    this.sendNotice = this.sendNotice.bind(this);

    this.state = {
      drivers: [],
      onlineDrivers: [],
      newCoordinate:''
      
    };
    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-97a9ef79-a871-474c-987f-46ba162a9d65',
      subscribeKey: 'sub-c-fa1d39c8-c020-11ea-8089-3ec3506d555b',
    });
    this.pubnub.init(this);
  }

  componentDidMount() {
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

      this.pubnub.subscribe({
        channels: ['location'],
        withPresence: true,
      });
      this.pubnub.getMessage('location', msg => {
        const { coordinate } = this.state;
        const { latitude, longitude } = msg.message;
        const newCoordinate = { lat:latitude, lng:longitude };
        console.log(newCoordinate);
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
            <Marker position={this.state.newCoordinate} label="Ali Real Time" ></Marker>

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
