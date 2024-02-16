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


  console.log(singalOrder)

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
      selector: (row) => row.amount_item,
      center: true,
    },
    {
      name: "AMOUNT",
      selector: (row) => row.total_price,
      center: true,
    },
  ];

  return (
    <div className="dasbord_laout text-white bgpr">
       <PageTitle title={"Invoice"} />
      <div className=" bg-primary text-white rounded-xl ">
        {isLoading ? (
          <><Loader /></>
        ) : (
          <>
            <div>
              <div className="w-full flex flex-col p-8" ref={componentRef}>
                <div className="">
                  <div className="flex items-start justify-between border-b border-gray-500 pb-5">
                    <div>
                      <h3 className=" text-[25px] font-semibold">INVOICE</h3>
                      <p>
                        Status :{" "}
                        <span
                          className={
                            (singalOrder?.orderStatus === "Pending" &&
                              " text-red-500") ||
                            (singalOrder?.orderStatus === "Processing" &&
                              " text-yellow-500") ||
                            (singalOrder?.orderStatus === "Complete" &&
                              " text-green-500")
                          }
                          style={{ margin: "0", padding: "0" }}
                        >
                          {singalOrder?.orderStatus}
                        </span>
                      </p>
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
                      <h5 className=" text-[23px] font-semibold">INVOICE NO.</h5>
                      <p>#10142</p>
                    </div>
                    <div>
                      <h5 className=" text-[23px] font-semibold">INVOICE TO.</h5>
                      <p>dfdf Bikash</p>
                    </div>
                  </div>
                </div>

                <div className=" border mt-8 ">
                  <div className=" bg-transparent">
                    <Table columns={columns} data={singalOrder.products} />
                  </div>
                </div>

                <div className=" flex items-center justify-between  mt-10">
                  <div>
                    <h5 className=" text-[20px] font-semibold">PAYMENT METHOD</h5>
                    <p className=" text-[20px]">{singalOrder.method}</p>
                  </div>
                  <div>
                    <h5 className=" text-[20px] font-semibold">SHIPPING COST</h5>
                    <p className=" text-[20px]">{singalOrder.shipping === "FedEx" ? "60" : "20"}</p>
                  </div>
                  <div>
                    <h5 className=" text-[20px] font-semibold">DISCOUNT</h5>
                    <p className=" text-[20px]">$ {singalOrder.discount}</p>
                  </div>
                  <div>
                    <h5 className=" text-[20px] font-semibold">TOTAL AMOUNT</h5>
                    <h5 className=" text-[22px]" style={{ color: "red" }}>$ {singalOrder.totle}</h5>
                  </div>
                </div>
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
                        <AiFillPrinter size={18} className="mr-1" />{" "}
                        Print/Download
                      </button>
                    )}
                    content={() => componentRef.current}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Invoice;
