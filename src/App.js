import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { BrowserRouter } from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
          <Layout/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App; 
