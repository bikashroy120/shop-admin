import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "../components/table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getOrder, updateOrder } from "../services/authServices";
import Loader from "../components/UI/Loader";
import { Pagination } from "antd";
import { useDebounce } from "use-debounce";

const Order = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  let itemsPerPage = 10;


  const { data, isLoading } = useQuery(["order",searchQuery], ()=>getOrder(searchQuery));

  const update = useMutation(updateOrder, {
    onSuccess: (data) => {
      // Invalidate and refetch
      toast.success("Order update success");
      queryClient.invalidateQueries(["order"]);
    },
    onError: () => {
      toast.error("error ");
    },
  });

  const generateQuery = (searchValue,filter) => {
    const queryParams = [];

    if (searchValue) {
      queryParams.push(`search=${searchValue}`);
      setPage(1);
    }

    if (filter !== "") {
        queryParams.push(`orderStatus=${filter}`);
        setPage(1);
    }else{
        queryParams.push(``);
        setPage(1); 
    }
    return queryParams.join("&");
  };

  useEffect(() => {
    const query = generateQuery(searchValue,filter);
    setSearchQuery(`${query}&page=${page}&limit=${itemsPerPage}`);
  }, [searchValue, page,filter,itemsPerPage]);

  const handelChance = (e, id) => {
    const data = {
      value: e.target.value,
      id: id,
    };

    update.mutate(data);
  };

  const columns = [
    {
      name: "Img",
      selector: (row) => (
        <img
          src={`${row?.orderby.image}`}
          className={"w-[45px] h-[45px] rounded-md "} alt="user"
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
      width: "100px",
    },

    {
      name: "Order Status",
      selector: (row) => (
        <p
          className={` py-[2px] px-2 text-sm rounded-full ${
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
      width: "100px",
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <div className=" flex flex-row items-center gap-2">
              <select
                onChange={(e) => handelChance(e, row?._id)}
                value={row.orderStatus}
                className=" bg-primary border border-white py-1 rounded-md px-1"
              >
                <option className="" value="Pending">
                  Pending
                </option>
                <option className="" value="Processing">
                  Processing
                </option>
                <option className="" value="Complete">
                  Complete
                </option>
              </select>
          </div>
        </>
      ),
      width:"140px"
    },
    {
        name: "Invoice",
        selector: (row) => (
             <button></button>
        ),
        width:"120px"
      },
  ];

  const PagenationChange = (page, pageSiz) => {
    setPage(page);
  };

  // add-category
  return (
    <div className="dasbord_laout text-white bgpr">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-[23px] font-semibold">All Order</h2>
        </div>

        <div className=" bg-primary text-white py-2 mt-8 rounded-lg">
          <div className=" w-full pt-4 flex items-center justify-between gap-5 px-5">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className=" w-full bg-transparent border border-[#808191] outline-none py-3 px-5 rounded-lg"
              placeholder="Search By Name email phone"
            />
            <select
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="  w-full bg-primary border border-[#808191] py-3 px-5 rounded-lg"
            >
              <option className="" value="">
                All{" "}
              </option>
              <option className="" value="Pending">
                Pending
              </option>
              <option className="" value="Processing">
                Processing
              </option>
              <option className="" value="Complete">
                Complete
              </option>
            </select>
          </div>

          {isLoading ? (
            <>
              <Loader />
            </>
          ) : (
            <div className=" mt-5 border-b border-b-gray-500">
              <Table columns={columns} data={data?.order} />
            </div>
          )}
          <div className="flex items-center justify-end py-2 pt-3 px-5">
            {isLoading ? (
              <> </>
            ) : (
              <Pagination
                defaultCurrent={page}
                total={data?.item}
                pageSize={itemsPerPage}
                onChange={PagenationChange}
                showSizeChanger={false}
              />
            )}
          </div>
        </div>

      </div>

      {show ? (
        <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500/75 z-[99999999]">
          <div className=" bg-white w-[400px] text-primary h-[200px] flex flex-col justify-center items-center rounded-lg">
            <h2 className=" text-[20px] mb-3">Are you Delete the item</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShow(false)}
                className=" flex items-center gap-2 py-3 px-10 rounded-lg bg-green-500 hover:bg-green-700 duration-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  toast.error("দুঃখিত অর্ডার পেইজের কাজ এখনো শেষ হয়নি")
                }
                className=" flex items-center gap-2 py-3 px-10 rounded-lg bg-red-500 hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Order;
