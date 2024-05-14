// import React from "react";
// import Dropzone from "react-dropzone";
// import axiosInstance from "../utils/axios";

// function FileUpload({ images, onImageChange }) {
//   // images를 props로 받아왔음
//   async function handleDrop(files) {
//     console.log(files);
//     let formData = new FormData();
//     formData.append("image", files[0]);

//     const config = {
//       header: { "content-type": "multipart/form-data" },
//     };

//     try {
//       const res = await axiosInstance.post("/products/image", formData, config);
//       console.log(res.data);
//       //   alert("upload finished");
//       onImageChange(...images, res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   function handleDelete(image) {
//     const currentIndex = images.indexOf(image);
//     let newImages = [...images];
//     newImages.splice(currentIndex, 1);
//     onImageChange(newImages);
//   }

//   return (
//     <div>
//       <h2>file</h2>
//       <div className="flex gap-4">
//         <div className="w-[100px] h-[100px] flex justify-center items-center bg-blue-300 rounded-md overflow-hidden">
//           {/* npm 사이트에서 긁어온거!! */}
//           <Dropzone onDrop={handleDrop}>
//             {({ getRootProps, getInputProps }) => (
//               <div {...getRootProps()} className="w-full h-[100%]">
//                 <input {...getInputProps()} />
//                 <p className="border bg-slate-300 w-full h-full flex justify-center items-center">
//                   +
//                 </p>
//                 {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
//               </div>
//             )}
//           </Dropzone>
//         </div>
//         <div className="flex items-center">
//           {images.map((image) => {
//             return (
//               <div key={image} className="w-[90px] relative">
//                 <div
//                   onClick={() => {
//                     handleDelete(image);
//                   }}
//                   className="w-[20px] h-[20px] flex justify-center items-center bg-red-300 absolute rounded-[50%] right-[-10px] top-[-10px]"
//                 >
//                   {" "}
//                   X{" "}
//                 </div>
//                 <img
//                   src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`}
//                   alt=""
//                 />
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FileUpload;

import React from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

function FileUpload({ images, onImageChange }) {
  async function handleDrop(files) {
    console.log(files);
    let formData = new FormData();
    formData.append("image", files[0]);

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    try {
      const res = await axiosInstance.post("/products/image", formData, config);
      console.log(res.data);
      alert("upload finish");
      onImageChange([...images, res.data]);
    } catch (error) {
      console.log(error);
    }
  }
  function handleDelete(image) {
    const currentIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currentIndex, 1);
    onImageChange(newImages);
  }
  return (
    <div>
      <h2>file</h2>
      <div className="flex gap-4">
        <div className="w-[100px] h-[100px] flex justify-center items-center bg-blue-300 rounded-md overflow-hidden">
          <Dropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()} className="w-full h-[100%]">
                <input {...getInputProps()} />
                <p className="border bg-slate-300 w-full h-[100%] flex justify-center items-center">
                  +
                </p>
              </div>
            )}
          </Dropzone>
        </div>
        <div className="flex items-center gap-4">
          {images.map((image) => {
            return (
              <div key={image} className="w-[90px] relative ">
                <div
                  onClick={() => {
                    handleDelete(image);
                  }}
                  className="w-[20px] h-[20px] flex justify-center items-center bg-red-300 absolute rounded-[50%] right-[-10px] top-[-10px]"
                >
                  X
                </div>
                <img
                  src={`${process.env.REACT_APP_NODE_SERVER_URL}/uploads/${image}`}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
