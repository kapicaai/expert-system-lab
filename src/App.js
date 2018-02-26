import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ExpertSystem from './components/expert-system-container';
import NeuralNetwork from './components/neural-network';
import PatternRecognition from './components/pattern-recognition';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Artificial Intelligence Labs</h1>
        </header>
        <ExpertSystem />
        <hr />
        <NeuralNetwork />
        <hr />
        <PatternRecognition />
      </div>
    );
  }
}

export default App;
