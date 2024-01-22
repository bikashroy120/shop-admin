import React from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md"

const PageTitle = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="pb-5 flex items-center gap-3">
      <button
        className="py-2 px-3 bg-yellow-500 flex items-center gap-2 text-white rounded-lg"
        onClick={() => navigate(-1)}
      >
        <MdOutlineKeyboardBackspace className="text-[25px]"/>
        back
      </button>
      <h2 className=" font-semibold text-[23px]">{title}</h2>
    </div>
  );
};

export default PageTitle;
