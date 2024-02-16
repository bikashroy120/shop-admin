import React from "react";
import "../styles/dashboard.css";
import SingleCard from "../components/reuseable/SingleCard";

import MileChart from "../charts/MileChart";
import CarStatsChart from "../charts/CarStatsChart";
import { useQuery } from "react-query";
import { getDashbordData } from "../services/authServices";
import Table from "../components/table/Table";

const Dashboard = () => {
  const { data, isLoading } = useQuery("order", getDashbordData);

  const columns = [
    {
      name: "Img",
      selector: (row) => (
        <img
          src={`${row?.orderby.image? row?.orderby.image: "/user.jpg"}`}
          alt="order"
          className={"w-[45px] h-[45px] rounded-md "}
        />
      ),
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row?.FirstName + " " + row?.LastName,
    },

    {
      name: "Email",
      selector: (row) => row?.email,
    },
    {
      name: "Phone",
      selector: (row) => row?.phone,
    },
    {
      name: "Shipping",
      selector: (row) => row?.shipping,
    },

    {
      name: "Order Status",
      selector: (row) => (
        <p
          className={`py-1 px-3 rounded-full ${
            row?.orderStatus === "Pending" && "bg-red-500"
          } ${row?.orderStatus === "Processing" && "bg-yellow-500"} ${
            row?.orderStatus === "Complete" && "bg-green-500"
          }`}
        >
          {row?.orderStatus}
        </p>
      ),
    },

    {
      name: "Totle",
      selector: (row) => row?.totle,
    },
  ];

  console.log(data);

  return (
    <div className="dashboard w-full">
      <div className="dashboard__wrapper">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
          <SingleCard
            title={"Totle Order"}
            totalNumber={data?.totalOrder}
            icon={"ri-shopping-cart-line"}
          />
          <SingleCard
            title={"Pending Order"}
            totalNumber={data?.paddingOrder}
            icon={"ri-loader-3-fill"}
          />
          <SingleCard
            title={"Processing Orde"}
            totalNumber={data?.ProcessingOrder}
            icon={"ri-truck-line"}
          />
          <SingleCard
            title={"Complete Order"}
            totalNumber={data?.CompleteOrder}
            icon={"ri-check-line"}
          />
        </div>

        <div className=" flex items-center w-full justify-between flex-col lg:flex-row gap-5 mt-8 ">
          <div className="stats p-5">
            <h3 className="stats__title">Last 7 days user</h3>
            <div className="h-[400px]">
              <MileChart />
            </div>
          </div>

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

            {isLoading ? (
              <h2>Lodding...</h2>
            ) : (
              <div className=" mt-2">
                <Table columns={columns} data={data?.order?.slice(0,7)} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
