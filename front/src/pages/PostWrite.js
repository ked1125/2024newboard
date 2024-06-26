// import React, { useState } from "react";
// import axiosInstance from "../utils/axios";
// import { useNavigate } from "react-router-dom";
// import FileUpload from "../Components/FileUpload";
// // const continents = []
// const continents = [
//   { key: 1, value: "seoul" },
//   { key: 2, value: "pusan" },
//   { key: 3, value: "kangwon" },
//   { key: 4, value: "suwon" },
//   { key: 5, value: "daegu" },
// ];

// function PostWrite() {
//   // useStateSnippet
//   // const [product, setProduct] = useState({});
//   const [product, setProduct] = useState({
//     title: "",
//     description: "",
//     price: 0,
//     continents: 1,
//     images: [],
//   });

//   const navigate = useNavigate();

//   function handleChange(e) {
//     // e대신 event로도 자주 쓰임
//     // event.target.value , e.target.value
//     // e.target.value 자체가 input창에 입력되는 모든 text들을 의미함.
//     const { name, value } = e.target;
//     console.log(value, name);
//     // console.log(e.target.value, e.target.name);
//     setProduct((prevState) => {
//       return {
//         // ...prevState,[name]: value
//         ...prevState,
//         [name]: value,
//       };
//     });
//     // setProduct(()=>{return})
//   }

//   // function handleSubmit(){}
//   async function handleSubmit(e) {
//     // e대신 event로도 자주 쓰임
//     // event.target.value , e.target.value
//     // e.target.value 자체가 input창에 입력되는 모든 text들을 의미함.
//     e.preventDefault(); // handleSubmit이 엔터치는순간 새창으로 이동하는 기본값을 가지고있음...? 그걸 막아주는 역할 (페이지가 이동하지 않고 새로고침만 되도록?)
//     alert("입력");
//     const body = {
//       ...product,
//     };
//     try {
//       await axiosInstance.post("/products", body);
//       navigate("/");
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   function handleImage(newImages) {
//     setProduct((prevState) => ({
//       ...prevState,
//       images: newImages,
//     }));
//   }

//   return (
//     <section>
//       <h2>자료입력</h2>
//       {product.title} / {product.description}
//       {/* <form action="request.php"></form>
//       => 페이지가 바뀌는 형식임???
//       */}
//       <form onSubmit={handleSubmit}>
//         {/* label은 inline tag임 -> block처리 해줘야 함, tailwind css cheat sheet가서 block처리하는방법 확인하기 */}
//         <div className="mb-4">
//           <label htmlFor="title" className="mb-3 block">
//             제목
//           </label>
//         </div>
//         <input
//           type="text"
//           id="title" // htmlFor랑 id값을 매치해줘야함! label값하고 id값을 매치해줘야함
//           name="title" // name값은 for문서에서 값을 담아서 전달해주는거라고..?:/??
//           className="w-full px-4 py-2 border rounded-md"
//           onChange={handleChange}
//           value={product.title}
//           // value는 나중에 작성해줬음.. 이부분 다시한번 짚고 넘어가보기
//         />

//         <div className="mb-4">
//           {/* label은 inline tag임 -> block처리 해줘야 함, tailwind css cheat sheet가서 block처리하는방법 확인하기 */}
//           <label htmlFor="description" className="mb-3 block">
//             설명
//           </label>
//           <input
//             type="text"
//             id="description" // htmlFor랑 id값을 매치해줘야함!
//             name="description"
//             className="w-full px-4 py-2 border rounded-md"
//             onChange={handleChange}
//             value={product.description}
//             // value는 나중에 작성해줬음.. 이부분 다시한번 짚고 넘어가보기
//           />
//         </div>
//         <div className="mb-4">
//           {/* label은 inline tag임 -> block처리 해줘야 함, tailwind css cheat sheet가서 block처리하는방법 확인하기 */}
//           <label htmlFor="price" className="mb-3 block">
//             {/* htmlFor = id값이 같아야 글씨 클릭햇을때 인풋태그로 감 */}
//             가격
//           </label>
//           <input
//             type="text"
//             id="price" // htmlFor랑 id값을 매치해줘야함!
//             name="price"
//             className="w-full px-4 py-2 border rounded-md"
//             onChange={handleChange}
//             value={product.price}
//             // value는 나중에 작성해줬음.. 이부분 다시한번 짚고 넘어가보기
//           />
//         </div>
//         <div className="mb-4">
//           {/* label은 inline tag임 -> block처리 해줘야 함, tailwind css cheat sheet가서 block처리하는방법 확인하기 */}
//           <label htmlFor="continents" className="mb-3 block">
//             지역
//           </label>
//           <select
//             className="w-full px-4 py-2 border rounded-md"
//             name="continents"
//             id="continents"
//             onChange={handleChange}
//             value={product.continents}
//           >
//             {
//               // continents.map(()=>{return()})
//               continents.map((item) => {
//                 return (
//                   <option value={item.key} key={item.key}>
//                     {item.value}
//                   </option>
//                 ); // 여기서 말하는 key={item.key}는 그냥 warning안뜨게하려고  // value에있는  key는 상단의 key
//               })
//             }
//           </select>
//         </div>

//         <FileUpload images={product.images} onImageChange={handleImage} />

//         <div>
//           <button className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
//             글 작성 완료
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// }

// export default PostWrite;
import React, { useState } from "react";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../Components/FileUpload";
const continents = [
  { key: 1, value: "seoul" },
  { key: 2, value: "pusan" },
  { key: 3, value: "kangwon" },
  { key: 4, value: "suwon" },
  { key: 5, value: "daegu" },
];

function PostWrite() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    continents: 1,
    images: [],
  });

  const navigate = useNavigate();

  function handelChange(e) {
    const { name, value } = e.target;
    console.log(value, name);
    setProduct((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  async function handelSubmit(e) {
    e.preventDefault();
    // 엔터 막는거임. 기본기능 막음
    const body = {
      ...product,
    };
    try {
      await axiosInstance.post("/products", body);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  function handelImage(newImages) {
    setProduct((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  }

  return (
    <section>
      <h2 className="my-5">자료입력</h2>

      <form onSubmit={handelSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-3">
            제목
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handelChange}
            value={product.title}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-3">
            설명
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handelChange}
            value={product.description}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-3">
            가격
          </label>
          <input
            type="text"
            id="price"
            name="price"
            className="w-full px-4 py-2 border rounded-md"
            onChange={handelChange}
            value={product.price}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="continents" className="block mb-3">
            지역
          </label>
          <select
            className="w-full px-4 py-2 border rounded-md"
            name="continents"
            id="continents"
            onChange={handelChange}
            value={product.continents}
          >
            {continents.map((item) => {
              return (
                <option value={item.key} key={item.key}>
                  {item.value}
                </option>
              );
            })}
          </select>
        </div>

        <FileUpload images={product.images} onImageChange={handelImage} />

        <div>
          <button className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700">
            글작성완료
          </button>
        </div>
      </form>
    </section>
  );
}

export default PostWrite;
