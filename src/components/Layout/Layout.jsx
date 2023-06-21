import React, { useState } from "react";
import Router from "../../routes/Router";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";

const Layout = () => {
  const [open, setOpen] = useState(true);
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
