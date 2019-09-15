import React from 'react';
import './App.css';
import Generator from '../Generator/Generator';

function App() {
  return (
    <div className="container">
      <h1 className="heading"> Word Generator </h1>
      <Generator/>

      <button className="button" type="button"> Zapisz </button>
    </div>
  );
}

export default App;
