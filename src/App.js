import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js';
import Navbar from './components/navbar.component';
import Dashboard from './components/dashboard.component';
import Driver from './components/driver.component';
import DriverAdd from './components/driver_add.component';
import MapComponent from './components/map.component';

import { ProtectedRoute }  from './protected.route';





function App() {
  return (
    <Router> 
     <Navbar/>
     <ProtectedRoute path="/map"  component={MapComponent}/>
      <div className="container">
      <Switch>
      <Route path="/dashboard"  component={Dashboard}/>
      <ProtectedRoute path="/drivers"  component={Driver}/>
      <ProtectedRoute path="/driver/add"  component={DriverAdd}/>
      <Route path="*" component ={() => "PLEASE LOGIN TO ACCESS THIS PAGE"} />
        </Switch>
      </div>
     </Router>
  );
} 

export default App;