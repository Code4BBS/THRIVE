import axios from "axios";

import React, { Component } from "react";
import Header from "components/Headers/Header.js";
import { Button } from "@material-ui/core";

class File extends Component {
  state = {
    // Initially, no file is selected
    selectedFile: null,
    showButton: false,
    fileName: "",
  };

  // On file select (from the pop up)
  onFileChange = (event) => {
    // Update the state
    this.setState({ selectedFile: event.target.files[0] });
  };

  // On file upload (click the upload button)
  onFileUpload = () => {
    // Create an object of formData
    const formData = new FormData();

    // Update the formData object
    formData.append(
      "file",
      this.state.selectedFile,
      this.state.selectedFile.name
    );

    // Details of the uploaded file
    console.log(this.state.selectedFile);

    // Request made to the backend api
    // Send formData object
    axios
      .post("/api/v1/course/file", formData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        this.setState({
          fileName: response.data.filename,
          showButton: true,
        });
      });
  };

  // File content to be displayed after
  // file upload is complete
  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>

          <p>File Name: {this.state.selectedFile.name}</p>

          <p>File Type: {this.state.selectedFile.type}</p>

          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  //   base64ToArrayBuffer = (base64) => {
  //     base64 = base64.replace(/^data\:([^\;]+)\;base64,/gim, "");
  //     var binaryString = window.atob(base64);
  //     var len = binaryString.length;
  //     var bytes = new Uint8Array(len);
  //     for (var i = 0; i < len; i++) {
  //       bytes[i] = binaryString.charCodeAt(i);
  //     }
  //     return bytes.buffer;
  //   };

  openFile = () => {
    axios
      .get(`/api/v1/course/file/${this.state.fileName}`, {
        withCredentials: true,
        responseType: "arraybuffer",
      })
      .then((response) => {
        console.log(response.data);
        // var arrBuffer = this.base64ToArrayBuffer(response.data);
        const file = new Blob([response.data], {
          type: "application/pdf",
        });
        //Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        //Open the URL on new Window
        window.open(fileURL);
      });
  };

  render() {
    return (
      <div>
        <Header />
        <h1>Testing File Upload</h1>
        <div>
          <input type="file" name="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>Upload!</button>
        </div>
        {this.fileData()}
        {this.state.showButton ? (
          <Button onClick={this.openFile}>View</Button>
        ) : null}
      </div>
    );
  }
}

export default File;
