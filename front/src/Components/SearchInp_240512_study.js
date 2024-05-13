import React from "react";

function SearchInp({ searchForm, onSearch }) {
  //MainPage.js에서 props해온거
  return (
    <input
      type="text"
      placeholder="검색하기"
      onChange={onSearch}
      value={searchForm}
      className="p-2 border border-gray-100 rounded-md"
    />
  );
}

export default SearchInp;
