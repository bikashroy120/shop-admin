import React from "react";
import "../styles/dashboard.css";
import SingleCard from "../components/reuseable/SingleCard";

import MileChart from "../charts/MileChart";
import CarStatsChart from "../charts/CarStatsChart";
import RecommendCarCard from "../components/UI/RecommendCarCard";

import recommendCarsData from "../assets/dummy-data/recommendCars";
import { useQuery } from "react-query";
import { getDashbordData, getOrder } from "../services/authServices";
import { toast } from "react-toastify";
import Table from "../components/table/Table";
import { base_url } from "../utils/base_url";


const Dashboard = () => {
  const { data, isLoading, error } = useQuery('order', getDashbordData);


  const columns = [
    {
        name: 'Img',
        selector: row => <img src={`${base_url  }uploads/${row?.orderby.image}`} className={"w-[45px] h-[45px] rounded-full "}/>,
        width:"100px"
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
        selector: row => <span className={`p-1 rounded-2xl ${row?.orderStatus ==="Pending" && "bg-red-500"} ${row?.orderStatus ==="Processing" && "bg-yellow-500"} ${row?.orderStatus ==="Complete" && "bg-green-500"}`}>{row?.orderStatus}</span>,
    },

    {
        name: 'Totle',
        selector: row => row?.totle,
    },
];

console.log(data)

  return (
    <div className="dashboard w-full">
      <div className="dashboard__wrapper">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
          <SingleCard title={"Totle Order"} totalNumber={data?.totalOrder} icon={"ri-shopping-cart-line"} />
          <SingleCard title={"Pending Order"} totalNumber={data?.paddingOrder} icon={"ri-loader-3-fill"} />
          <SingleCard title={"Processing Orde"} totalNumber={data?.ProcessingOrder} icon={"ri-truck-line"} />
          <SingleCard title={"Complete Order"} totalNumber={data?.CompleteOrder} icon={"ri-check-line"} />
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
                        <Table columns={columns} data={data.order}/>
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
