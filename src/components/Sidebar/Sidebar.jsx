import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbBrandBlogger, TbLogicOr } from "react-icons/tb";
import { TbReportAnalytics, TbBrandAdonisJs } from "react-icons/tb";
import { AiOutlineUser } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { GrProductHunt } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import { useSelector } from "react-redux";

const Sidebar = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.auth);

  const path = useLocation();
  const isActive = (href) => {
    return path.pathname.includes(href);
  };

  // const active = includes("/admin")

  const menus = [
    {
      name: "Dashboard",
      link: "/",
      active: "dashboard",
      icon: MdOutlineDashboard,
    },
    { name: "Customer", link: "/user", active: "user", icon: AiOutlineUser },
    {
      name: "Category",
      link: "/category",
      active: "category",
      icon: BiCategory,
    },
    { name: "Brand", link: "/brand", active: "brand", icon: TbBrandAdonisJs },
    {
      name: "Product",
      link: "/product",
      active: "product",
      icon: GrProductHunt,
    },
    {
      name: "Order",
      link: "/order",
      active: "order",
      icon: TbReportAnalytics,
      margin: true,
    },
    { name: "Coupon", link: "/coupon", active: "coupon", icon: TbLogicOr },
    { name: "Blog", link: "/blog", active: "blog", icon: TbBrandBlogger },
    {
      name: "Profile",
      link: "/profile",
      active: "profile",
      icon: CgProfile,
      margin: true,
    },
    {
      name: "Setting",
      link: "/settings",
      active: "settings",
      icon: RiSettings4Line,
    },
  ];

  return (
    <>
      <div
        className={`sidebar min-h-screen border-r pb-10 shadow-sm overflow-y-auto overflow-x-hidden ${
          open ? "w-[250px]" : "w-[75px]"
        } duration-500 text-gray-800 px-2`}
      >
        <div className="py-3 flex justify-center border-b w-full items-center my-4">
          <h2
            style={{
              transitionDelay: `${3}00ms`,
            }}
            className={`whitespace-pre duration-500 text-[30px] font-bold ${
              !open && "opacity-0 -translate-x-28 overflow-hidden"
            }`}
          >
            BikConner
          </h2>

          {!open && (
            <h2
              className={` opacity-1 duration-500 text-[30px] translate-x-28 font-bold ${
                !open && "opacity-1 -translate-x-2  whitespace-pre"
              }`}
            >
              Bik
            </h2>
          )}
        </div>
        {/* {
          <div
            className={`flex items-center gap-2 bg-gray-700 overflow-hidden py-2 rounded-md relative ${
              open ? "px-3" : "px-2"
            }`}
          >
            <img
              src={user?.image}
              alt="user"
              className={` ${
                open
                  ? "w-[50px] h-[50px] rounded-full"
                  : "w-[40px] h-[40px] rounded-full"
              }`}
            />
            <div className="">
              <h2
                style={{
                  transitionDelay: `${0 + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 text-[18px] ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {user?.firstname} {user?.lastname}
              </h2>
              <h2
                style={{
                  transitionDelay: `${0 + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 text-[18px] ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {" "}
                Role : Admin
              </h2>
            </div>
          </div>
        } */}
        <div className="mt-5 flex flex-col gap-2 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium py-2 duration-200 px-4 hover:bg-primary  rounded-md ${
                isActive(menu?.active) ? " bg-primary text-white" : ""
              }`}
            >
              <div>{React.createElement(menu?.icon, { size: "25" })}</div>
              <h2
                // style={{
                //   transitionDelay: `${i + 3}00ms`,
                // }}
                className={`whitespace-pre duration-500 font-semibold text-[18px] ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-[70px] group-hover:duration-300 group-hover:w-fit  `}
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
