import React from "react";

function CheckBox({ continents, checkedContinents, onFilters }) {
  // MainPage.js의 CheckBox에서 props해주는과정 (인자값에넣어준거)
  // 얘네 다 프롭스잖아요

  const handleToggle = (continentsId) => {
    const currentIndex = checkedContinents.indexOf(continentsId);
    // indexOf 내장함수 .... 비어있으면... [].. -1을 반환한다고 함.....-.-?????

    const newChecked = [...checkedContinents];
    if (currentIndex === -1) {
      newChecked.push(continentsId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    onFilters(newChecked);
    // MainPage로 신호쏴줌
  };

  return (
    <div className="grid grid-cols-3 gap-4 sm:grid-cols-5">
      {
        // continents&&continents.map(()=>{return})
        continents?.map((continents) => {
          // 있으면 .map실행하고, 없으면 null?? 하태민이 아마도라고함;
          return (
            <div className=" bg-blue-100 px-2 py-4" key={continents._id}>
              <input
                type="checkbox"
                id={continents._id}
                onChange={() => {
                  handleToggle(continents._id);
                }}
                checked={
                  checkedContinents.indexOf(continents._id) === -1
                    ? false
                    : true
                  // 삼항연산자
                }
              />
              <label htmlFor={continents._id}> {continents.name}</label>
            </div>
          );
        })
      }
    </div>
  );
}

export default CheckBox;
