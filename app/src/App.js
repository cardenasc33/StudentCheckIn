import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import Upload from './upload/Upload'
import UploadCSV from './upload/UploadCSV'
import FileUploader from './upload/FileUploader'
import Display from './Display'

class App extends Component {
  render() {
    return (
        <div className="App">
          <div className="Card">
         
          <FileUploader/>
           
        
          <Display/> 
        
          </div>
        </div>
    )
  }
}

export default App;
