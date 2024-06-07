import React from "react";

import { useQuery } from "react-query";
import { singalProduct } from "../services/productServices";

import "react-quill/dist/quill.snow.css";
import PageTitle from "../ui/PageTitle";
import Loader from "../components/UI/Loader";
import { useNavigate, useParams } from "react-router-dom";

const ViewProduct = () => {
  const params = useParams();
  const itemID = params.id;
  const navigate = useNavigate()

  const { data, isLoading } = useQuery(["product1", itemID], () =>
    singalProduct(itemID)
  );

  console.log(data);

  return (
    <div className="dasbord_laout">
      <PageTitle title={"Product Details"} />

      <div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className=" my-5 bg-white shadow-sm rounded-lg p-10">
            <div className=" flex items-start justify-between gap-6">
              <div className=" w-[450px]">
                <img
                  src={data?.images[0]}
                  className=" w-full h-full rounded-lg"
                  alt=""
                />
              </div>
              <div className=" w-full">
                <h2 className=" text-[25px] font-bold">{data?.title}</h2>
                <div className=" mt-4 flex items-center gap-3">
                  <h3 className=" text-[25px] font-bold">
                    <span className=" line-through">৳ {data.bprice}</span>
                  </h3>
                  <h3 className=" text-[25px] font-bold">৳ {data.price}</h3>
                </div>
                <div>
                  <div className="h-[30px] flex mt-2 gap-3 items-center ">
                    <span
                      className={`py-1 px-3 text-[18px] font-bold rounded-full ${
                        data.quantity > 0 ? " bg-primary/20 text-green-700 " : ""
                      }`}
                    >
                      {data.quantity > 0 ? "In Stack" : "Out Stock"}
                    </span>
                    <span className=" font-semibold text-xl">QUANTITY : {data.quantity}</span>
                  </div>
                </div>
                <div className=" mt-4">
                  <h3 className=" text-[20px]">
                    Product Category :{" "}
                    <span className=" font-bold">{data?.category}</span>
                  </h3>
                  <h3 className=" text-[20px]">
                    Product Brand :{" "}
                    <span className=" font-bold">{data?.brand}</span>
                  </h3>
                </div>
                <div className=" mt-8">
                  <button onClick={()=>navigate(`/update-product/${data._id}`)} className=" py-2 px-5 hover:bg-green-600 duration-300 font-semibold text-[18px] rounded-md bg-primary text-white">Edit Product</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewProduct;
