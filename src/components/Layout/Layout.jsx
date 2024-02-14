import React, { useEffect, useState } from "react";
import Router from "../../routes/Router";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";
import { useMediaQuery } from "@react-hook/media-query";

const Layout = () => {
  const [open, setOpen] = useState(true);
  const isSmallScreen = useMediaQuery("(max-width: 1000px)");

  useEffect(() => {
    if (isSmallScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallScreen]);


  return (
    <div className="layout">
      <Sidebar setOpen={setOpen} open={open}/>
      <div className={open ? "main__layout duration-500" :"main__layout2 duration-500"}>
        <TopNav open={open}/>

        <div className="content">
          <Router />
        </div>
      </div>
    </div>
  );
};

export default Layout;
