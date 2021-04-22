import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './MainRouter';
import "./App.css";
const App = () => (
  <div className="image">
  <BrowserRouter>
      <MainRouter />
  </BrowserRouter>
  </div>
)

export default App;