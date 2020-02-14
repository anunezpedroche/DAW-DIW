import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          Bienvenido a este HolaMundo de ReactJS <code>if(holamundo==OK)nota=10;</code>
        </p>
      </div>
    );
  }
}

export default App;
