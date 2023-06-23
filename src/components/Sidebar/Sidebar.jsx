import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import {TbBrandBlogger,TbLogicOr} from "react-icons/tb"
import { TbReportAnalytics,TbBrandAdonisJs } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import {CgProfile} from "react-icons/cg"
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import {GrProductHunt} from "react-icons/gr"
import {BiCategory} from "react-icons/bi"
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({open,setOpen}) => {

  const menus = [
    { name: "Dashboard", link: "/", icon: MdOutlineDashboard },
    { name: "User", link: "/", icon: AiOutlineUser },
    { name: "Category", link: "/category", icon: BiCategory },
    { name: "Brand", link: "/brand", icon: TbBrandAdonisJs },
    { name: "Product", link: "/product", icon: GrProductHunt },
    { name: "Order", link: "/order", icon: TbReportAnalytics, margin: true },
    { name: "Coupon", link: "/coupon", icon: TbLogicOr },
    { name: "Blog", link: "/blog", icon: TbBrandBlogger },
    { name: "Profile", link: "/profile", icon: CgProfile, margin: true },
    { name: "Setting", link: "/settings", icon: RiSettings4Line },
  ];
  

  return (
    // <div className="sidebar">
    //   <div className="sidebar__top">
    //     <h2>
    //       <span>
    //         <i class="ri-taxi-line"></i>
    //       </span>{" "}
    //       UberX
    //     </h2>
    //   </div>

    //   <div className="sidebar__content">
    //     <div className="menu">
    //       <div className="nav__list">
    //         {navLinks.map((item, index) => (
    //           <li className="nav__item" key={index}>
    //             <NavLink
    //               to={item.path}
    //               className={(navClass) =>
    //                 navClass.isActive ? "nav__active nav__link" : "nav__link"
    //               }
    //             >
    //               <i className={item.icon}></i>

    //               {item.display}
    //             </NavLink>
    //           </li>
    //         ))}
    //       </div>
    //     </div>

    //     <div className="sidebar__bottom">
    //       <span>
    //         <i class="ri-logout-circle-r-line"></i> Logout
    //       </span>
    //     </div>
    //   </div>
    // </div>
    <>
          
      <div
        className={`sidebar min-h-screen ${
          open ? "w-[250px]" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        <div className="mt-7 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "25" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 text-[18px] ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
      </div>
    
    </>
  );
};

export default Sidebar;
