import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import Upload from './upload/Upload'
//import UploadCSV from './upload/UploadCSV'
import FileUploader from './upload/FileUploader'
import Display_Two from './Display_Two'

import { Provider } from 'react-redux';
import Display from './components/Display';

import store from './store';

class App extends Component {
  render() {
    return (

        <Provider store={store}> 
        <div className="App">
          <div className="Card">
         
          <FileUploader/>
        
          <Display/>
        
          </div>
        </div>
        </Provider>     
    )
  }
}

export default App;
