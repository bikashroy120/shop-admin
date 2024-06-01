import React, { useRef } from "react";
import { AiFillPrinter } from "react-icons/ai";
import { useQuery } from "react-query";
import { getSingleOrder } from "../services/authServices";
import { useParams } from "react-router-dom";
import ReactToPrint from "react-to-print";
import Table from "../components/table/Table";
import Loader from "../components/UI/Loader";
import PageTitle from "../ui/PageTitle";

const Invoice = () => {
  const componentRef = useRef();
  const parems = useParams();
  const itemID = parems.id;

  const { data: singalOrder, isLoading } = useQuery(["order", itemID], () =>
    getSingleOrder(itemID)
  );

  console.log(singalOrder);

  const columns = [
    {
      name: "SR.",
      selector: (row) => (
        <img
          src={`${row.feature_image}`}
          className=""
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          alt="product"
        ></img>
      ),
      center: true,
      width: "150px",
    },
    {
      name: "PRODUCT NAME",
      selector: (row) => row.productname,
      width: "200px",
    },
    {
      name: "QUANTITY",
      selector: (row) => row.quantity,
      center: true,
    },
    {
      name: "ITEM PRICE",
      selector: (row) => <span>৳ {row.amount_item}</span>,
      center: true,
    },
    {
      name: "AMOUNT",
      selector: (row) => <span>৳ {row.total_price}</span>,
      center: true,
    },
  ];

  return (
    <div className="dasbord_laout bgpr">
      <PageTitle title={"Invoice"} />
      <div className=" bg-white shadow-sm rounded-xl ">
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            <div>
              <div className="w-full flex flex-col p-10" ref={componentRef}>
                <div className="">
                  <div className="flex items-start justify-between border-b border-gray-500 pb-5">
                    <div>
                      <h3 className=" text-[25px] font-semibold">INVOICE</h3>
                      <div className=" flex items-center gap-2">
                        <p className=" text-[18px] font-medium">STATUS</p>
                        <p
                          className={` py-[3px] px-3 text-[16px] font-semibold rounded-full ${
                            singalOrder?.orderStatus === "Pending" &&
                            "bg-yellow-100 text-yellow-700 "
                          } ${
                            singalOrder?.orderStatus === "Processing" &&
                            " bg-blue-100 text-blue-700"
                          } ${
                            singalOrder?.orderStatus === "Complete" &&
                            "bg-green-100 text-green-700"
                          } ${
                            singalOrder?.orderStatus === "Cancel" &&
                            "bg-red-100 text-red-700"
                          }`}
                        >
                          {singalOrder?.orderStatus}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className=" text-[30px] font-semibold">Bik Corner</h3>
                      <p>Dhaka,bangladesh</p>
                      <p>01773372120</p>
                    </div>
                  </div>
                  <div className=" flex items-center justify-between mt-5 mb-5">
                    <div>
                      <h5 className=" text-[23px] font-semibold">Date</h5>
                      <p>{singalOrder?.createdAt?.slice(0, 10)}</p>
                    </div>
                    <div className="">
                      <h5 className=" text-[23px] font-semibold">
                        INVOICE NO.
                      </h5>
                      <p>#10142</p>
                    </div>
                    <div>
                      <h5 className=" text-[23px] font-semibold">
                        INVOICE TO.
                      </h5>
                      <p>{singalOrder?.FirstName} {singalOrder?.FirstName}</p>
                      <p>{singalOrder?.address}</p>
                      <p>{singalOrder?.phone}</p>
                    </div>
                  </div>
                </div>

                <div className=" border mt-8 rounded-lg ">
                  <div className=" bg-transparent">
                    <Table columns={columns} data={singalOrder.products} />
                  </div>
                </div>

                <div className=" flex items-center justify-between  bg-inputBg p-8 rounded-lg mt-10">
                  <div>
                    <h5 className=" text-[20px] font-semibold">
                      PAYMENT METHOD
                    </h5>
                    <p className=" text-[20px]">{singalOrder.method}</p>
                  </div>
                  <div>
                    <h5 className=" text-[20px] font-semibold">
                      SHIPPING COST
                    </h5>
                    <p className=" text-[20px]">
                    ৳ {singalOrder.shipping === "FedEx" ? "60" : "20"}
                    </p>
                  </div>
                  <div>
                    <h5 className=" text-[20px] font-semibold">DISCOUNT</h5>
                    <p className=" text-[20px]">৳ {singalOrder.discount}</p>
                  </div>
                  <div>
                    <h5 className=" text-[20px] font-semibold">TOTAL AMOUNT</h5>
                    <h5 className=" text-[22px]" style={{ color: "red" }}>
                    ৳ {singalOrder.totle}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div
        className="mt-8 pb-8"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="">
          <ReactToPrint
            trigger={() => (
              <button className="  text-white bg-green-500 py-3 rounded-md px-5 flex items-center">
                <AiFillPrinter size={18} className="mr-1" /> Print/Download
              </button>
            )}
            content={() => componentRef.current}
          />
        </div>
      </div>
    </div>
  );
};

export default Invoice;
