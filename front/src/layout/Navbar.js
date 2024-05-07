import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <nav className="flex justify-between h-[50px]">
        <h1>로고</h1>
        <div className="flex h-[100%]">
          <ul className="flex justify-center items-center px-5">
            <li>
              <Link to="/">리스트</Link>
            </li>
            <li>
              <Link to="/postwrite">글작성</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
