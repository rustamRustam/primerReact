import React from "react";
import './App.css.scss';
import './listHeader.css.scss';

import {
  Switch,
  Routes,
  Route,
  NavLink,
  HashRouter as Router
} from "react-router-dom";


import CatatologKartochek from '../CatatologKartochek/CatatologKartochek';
import KartochkaView from '../KartochkaView/KartochkaView';
import CollectionKartochek from '../CollectionKartochek/CollectionKartochek';

import Authors from '../../store/Authors';
import Locations from '../../store/Locations';

class App extends React.Component {
  render() {
    return (
      <div className="container-App">
        <Router>
          <div className="container-header" >
            <div className="container-listHeader">
              <ul className="listHeader">
                <li key="ul_li_home">
                  <NavLink to="/" >
                      <span className="normal">Католог</span>
                      <span className="bold">Католог</span>
                  </NavLink>
                </li>
                <li key="ul_li_test">
                  <NavLink to="/collection" >
                      <span className="normal">Коллекция</span>
                      <span className="bold">Коллекция</span>
                  </NavLink>
                </li>
                <li>
                  <div className="tema-sun" onClick={this.props.darkTema} >☀</div>
                </li>
              </ul>
            </div>
          </div>
          <Routes>
            <Route path="/" element={
              <CatatologKartochek
                authors = {Authors}
                locations = {Locations}
              />
            } />
            <Route path="/kartochka/:id" element={<KartochkaView />} />
            <Route path="/collection" element={<CollectionKartochek />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;
