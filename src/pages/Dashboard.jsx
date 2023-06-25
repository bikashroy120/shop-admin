import React from "react";
import "../styles/dashboard.css";
import SingleCard from "../components/reuseable/SingleCard";

import MileChart from "../charts/MileChart";
import CarStatsChart from "../charts/CarStatsChart";
import RecommendCarCard from "../components/UI/RecommendCarCard";

import recommendCarsData from "../assets/dummy-data/recommendCars";
import { useQuery } from "react-query";
import { getOrder } from "../services/authServices";
import { toast } from "react-toastify";
import Table from "../components/table/Table";
import { base_url } from "../utils/base_url";

const carObj = {
  title: "Total Cars",
  totalNumber: 750,
  icon: "ri-police-car-line",
};

const tripObj = {
  title: "Daily Trips",
  totalNumber: 1697,
  icon: "ri-steering-2-line",
};

const clientObj = {
  title: "Clients Annually",
  totalNumber: "85k",
  icon: "ri-user-line",
};

const distanceObj = {
  title: "Kilometers Daily",
  totalNumber: 2167,
  icon: "ri-timer-flash-line",
};

const Dashboard = () => {
  const { data, isLoading, error } = useQuery('order', getOrder);


  const columns = [
    {
        name: 'Img',
        selector: row => <img src={`${base_url  }uploads/${row?.orderby.image}`} className={"w-[45px] h-[45px] rounded-full "}/>,
        width:"100px"
    },
    {
        name: 'id',
        selector: row => row?._id.slice(12,20),
    },
    {
        name: 'Name',
        selector: row => row?.FirstName + " "+ row?.LastName,
    },

    {
        name: 'Email',
        selector: row => row?.email,
    },
    {
        name: 'Phone',
        selector: row => row?.phone,
    },
    {
        name: 'Shipping',
        selector: row => row?.shipping,
    },

    {
        name: 'Order Status',
        selector: row => row?.orderStatus,
    },

    {
        name: 'Totle',
        selector: row => row?.totle,
    },
];

  return (
    <div className="dashboard w-full">
      <div className="dashboard__wrapper">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
          <SingleCard item={carObj} />
          <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
        </div>

        <div className="w-full grid lg:grid-cols-2 md:grid-cols-1 gap-5 mt-8 ">
          <div className="stats">
            <h3 className="stats__title">Miles Statistics</h3>
            <MileChart />
          </div>

          <div className="stats">
            <h3 className="stats__title">Car Statistics</h3>
            <CarStatsChart />
          </div>
        </div>

        {/* <div className="recommend__cars-wrapper">
          {recommendCarsData.map((item) => (
            <RecommendCarCard item={item} key={item.id} />
          ))}
        </div> */}

      <div className=' text-white mt-7 '>
        <div>
            <div className='flex items-center justify-between mb-3'>
                <h2 className='text-[23px] font-semibold'>Recent Order</h2>
            </div>


            {
                isLoading ? (<h2>Lodding...</h2>) :(
                    <div className=' mt-2'>
                        <Table columns={columns} data={data}/>
                     </div>
                )
            }
        </div>



    </div>

      </div>
    </div>
  );
};

export default Dashboard;
