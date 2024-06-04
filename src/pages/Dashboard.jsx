import React, { useState } from "react";
import "../styles/dashboard.css";
import SingleCard from "../components/reuseable/SingleCard";
import { IoSearchOutline } from "react-icons/io5";
import MileChart from "../charts/MileChart";
import CarStatsChart from "../charts/CarStatsChart";
import { useQuery } from "react-query";
import {
  getDashbordData,
  getDashbordDataToday,
} from "../services/authServices";
import Table from "../components/table/Table";
import DashboardCardDesign from "../ui/DashboardCardDesign";
import OrderChart from "../charts/OrderChart";
import BestCategroySellChart from "../charts/BestCategroySellChart";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [queryFilter, setQueryFilter] = useState("");

  const { data, isLoading, refetch } = useQuery("order", () =>
    getDashbordData(queryFilter)
  );
  const { data: today } = useQuery("order", getDashbordDataToday);

  const dashboard = [
    {
      color: "bg-red-900",
      value: `${today?.data?.totalTodayOrderAmount}Tk.`,
      subTitle: `Total ${today?.data?.todayOrderItems} Orders`,
      title: "Today Order",
    },
    {
      color: "bg-blue-700",
      value: `${data?.data?.totalOrderAmount?.totalAmount}Tk.`,
      title: "Total Order Amount",
      subTitle: `Total ${data?.data?.totalOrderAmount?.totalOrders} Orders.`,
    },

    {
      color: "bg-orange-700",
      value: `${data?.data?.totalOrderAmount?.totalShippingPrice}Tk.`,
      title: "Total Shipping Price",
    },
    // {
    //   color: "bg-green-700",
    //   value: `${profit?.data?.totalProfit}Tk.`,
    //   title: "Profit (after delivery)",
    //   subTitle: "Excluded discount and shipping cost",
    // },

    {
      color: "bg-lime-700",
      value: `${data?.data?.totalOrderAmount?.pendingOrdersTotalAmount}Tk.`,
      subTitle: `Total ${data?.data?.totalOrderAmount?.pendingOrders} Orders.`,
      title: "Total Pending Order",
    },
    {
      color: "bg-pink-700",
      value: `${data?.data?.totalOrderAmount?.processingOrdersTotalAmount}Tk.`,
      subTitle: `total ${data?.data?.totalOrderAmount?.processingOrders} Orders.`,
      title: "Total Processing Order",
    },
    {
      color: "bg-indigo-700",
      value: `${data?.data?.totalOrderAmount?.deliveredOrdersTotalAmount}Tk.`,
      subTitle: `total ${data?.data?.totalOrderAmount?.deliveredOrders} Orders.`,
      title: "Total Delivered Order",
    },
    // {
    //   color: "bg-red-600",
    //   value: `${data?.data?.totalOrderAmount?.cancelledOrdersTotalAmount}Tk.`,
    //   subTitle: `total ${data?.data?.totalOrderAmount?.cancelledOrders} Orders.`,
    //   title: "Total Cancelled Orders",
    // },
  ];

  const handleOrderDateFilter = () => {
    if (!startDate || !endDate) {
      return alert("please select date");
    }

    if (new Date(startDate) > new Date(endDate)) {
      return alert("invalid date input");
    }
    setQueryFilter(`startDate=${startDate}&endDate=${endDate}`);
    refetch();
  };

  console.log(data);

  return (
    <div className="dashboard w-full">
      <div className="dashboard__wrapper">
        <div className="sm:flex items-center gap-4 justify-between mb-5 bg-white shadow-md p-2 md:px-4 rounded-md">
          <h3 className="text-xl md:text-2xl font-bold uppercase my-2 md:my-6 font-serif text-center md:text-start">
            Dashboard Overview
          </h3>
          <div className="grid grid-cols-1 md:flex gap-2 justify-end items-center p-2 flex-wrap ">
            <div className="">
              <input
                onChange={(e) => setStartDate(e.target.value)}
                type={"date"}
                className="bg-inputBg border border-gray-200 py-3 text-[18px] outline-none focus:bg-white px-5 rounded-lg w-full "
                placeholder="MM/DD/YYYY"
              />
            </div>
            <span className="hidden md:block"> to</span>
            <div className="">
              <input
                onChange={(e) => setEndDate(e.target.value)}
                type="date"
                placeholder="MM/DD/YYYY"
                className="bg-inputBg border border-gray-200 py-3 text-[18px] outline-none focus:bg-white px-5 rounded-lg w-full"
              />
            </div>
            <span
              onClick={handleOrderDateFilter}
              className=" bg-primary py-4 cursor-pointer hover:bg-green-500 duration-300 px-5 rounded-lg"
            >
              {/* <Icon
                icon="fa:search"
                className=" text-white text-lg text-[24px] "
              /> */}
              <IoSearchOutline className=" text-white text-[24px] " />
              <span className="md:hidden block">Search</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 flex-wrap">
          {dashboard.map((dash, index) => (
            <DashboardCardDesign
              key={index}
              customStyle={{
                topBg: "hsl(195, 74%, 62%)",
                mainBg: dash.color,
              }}
              title={dash.title}
              value={dash.value}
              subTitle={dash?.subTitle}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-2 xl:gap-6 my-8 items-start ">
          <div className="col-span-5 xl:col-span-3 h-full ">
            <OrderChart />
          </div>
          <div className="col-span-5 xl:col-span-2 h-full">
            <BestCategroySellChart />
          </div>
        </div>

        <div className=" flex items-center w-full justify-between flex-col lg:flex-row gap-5 mt-8 ">

          <div className="stats p-5">
            <h3 className="stats__title">Last 7 days Order </h3>
            <div className="h-[400px]">
              <CarStatsChart />
            </div>
          </div>
        </div>

        {/* <div className="recommend__cars-wrapper">
          {recommendCarsData.map((item) => (
            <RecommendCarCard item={item} key={item.id} />
          ))}
        </div> */}

        <div className=" text-white mt-7 ">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-[23px] font-semibold">Recent Order</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
