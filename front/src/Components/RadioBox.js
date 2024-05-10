import React from "react";

function RadioBox({ prices, checkedPrice, onFilters }) {
  return (
    <div>
      <h2>금액</h2>
      <div className="flex">
        {prices?.map((price) => {
          return (
            <div key={price._id} className="py-4 px-2">
              <input type="radio" id={`raiod${price._id}`} name="radio" />
              {/* name 설정해주니까 하나만 선택됨 중복선택 안되고 */}
              {/* {"  "} */}
              {"  "}
              <label htmlFor={`raiod${price._id}`}>{price.name}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RadioBox;
