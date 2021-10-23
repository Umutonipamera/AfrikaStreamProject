import axios from 'axios';
 
import React from 'react';

import { Videos } from './videos';
 
function UploadPage({mainPhone}) {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [videos, setVideos] = React.useState([]);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const onFileUpload = async () => {
        
      // Create FormData
      const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "myFile",
        selectedFile,
        selectedFile.name
      );
    
      // Send formData 
      const { data, status } = await axios.post(`http://localhost:4001/upload/${mainPhone}`, formData);
      if(status === 400) {
        return null;
      } else {
        console.log('Response', data, status);
        console.log('Videos', data.videos);
        setVideos(data.videos);
      }

  }

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {selectedFile.lastModifiedDate.toDateString()}
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
  }

  return (
    <div>
      <h2>Upload Video</h2>
        <div>
            <input type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>
              Upload!
            </button>
        </div>
      {fileData()}
      <Videos videos={videos}/>
    </div>
  );
}
    // state = {
    //    selectedFile: null,
    //    videos: [],
    // };
    
    // On file select (from the pop up)
    // onFileChange = event => {
    
    //   // Update the state
    //   this.setState({ selectedFile: event.target.files[0] });
    
    // };
    
    // On file upload (click the upload button)
    // onFileUpload = async () => {
    
    //   // Create an object of formData
    //   const formData = new FormData();
    
    //   // Update the formData object
    //   formData.append(
    //     "myFile",
    //     this.state.selectedFile,
    //     this.state.selectedFile.name
    //   );
    
    //   // Details of the uploaded file
    //   console.log(this.state.selectedFile);
    
    //   // Request made to the backend api
    //   // Send formData object
    //   const { mainPhone } = this.props;
    //   const { data, status } = await axios.post(`http://localhost:4001/upload/${mainPhone}`, formData);
    //   console.log('Response', data, status);
    //   console.log('Videos', data.videos);
    //   this.setState({videos: data.videos});
    // };
    
    // File content to be displayed after
    // file upload is complete
//     fileData = () => {
    
//       if (this.state.selectedFile) {
         
//         return (
//           <div>
//             <h2>File Details:</h2>
             
// <p>File Name: {this.state.selectedFile.name}</p>
 
             
// <p>File Type: {this.state.selectedFile.type}</p>
 
             
// <p>
//               Last Modified:{" "}
//               {this.state.selectedFile.lastModifiedDate.toDateString()}
//             </p>
 
//           </div>
//         );
//       } else {
//         return (
//           <div>
//             <br />
//             <h4>Choose before Pressing the Upload button</h4>
//           </div>
//         );
//       }
//     };
    
  //   render() {
    
  //     return (
  //       <div>
  //         <h2>Upload Video</h2>
  //           <div>
  //               <input type="file" onChange={onFileChange} />
  //               <button onClick={onFileUpload}>
  //                 Upload!
  //               </button>
  //           </div>
  //         {fileData()}
  //         <Videos videos={videos}/>
  //       </div>
  //     );
  //   }
  // }
 
  export {
      UploadPage,
  } 