import React from "react";

import { Link, useNavigate } from "react-router-dom";
import "./top-nav.css";
import { useSelector } from "react-redux";

const TopNav = ({ open }) => {
  const { user } = useSelector((state) => state.auth);
  const navegate = useNavigate()

  const logoutFun = ()=>{
    localStorage.clear()
    navegate("/")
  }

  return (
    <div className={open ? "top__nav duration-500" : "top__nav2 duration-500"}>
      <div className="top__nav-wrapper">
        <div className="search__box">
          <input type="text" placeholder="search or type" />
          <span>
            <i class="ri-search-line"></i>
          </span>
        </div>
        <div className="top__nav-right">
          {/* <span className="notification">
            <i class="ri-notification-3-line"></i>
            <span className="badge">1</span>
          </span> */}
          <div className=" relative">
            <Link to="/profile">
              <img
                src={user?.image}
                alt=""
                className="w-[50px] h-[50px] rounded-full"
              />
            </Link>
          </div>
          <div className="h-full">
            <span onClick={()=>logoutFun()} className=" bg-red-600 py-2 px-5 text-[18px] font-semibold text-white rounded-md cursor-pointer hover:bg-red-700">logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNav;
