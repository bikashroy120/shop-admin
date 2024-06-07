import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Table from "../components/table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getOrder, updateOrder } from "../services/authServices";
import Loader from "../components/UI/Loader";
import { Pagination } from "antd";
import { useDebounce } from "use-debounce";
import { FiZoomIn } from "react-icons/fi";

const Order = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [page, setPage] = useState(1);

  let itemsPerPage = 10;

  const { data, isLoading } = useQuery(["order", searchQuery], () =>
    getOrder(searchQuery)
  );

  console.log("orthor", dateRange);

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

  const generateQuery = (searchValue, filter, dateRange) => {
    const queryParams = [];

    if (searchValue) {
      queryParams.push(`search=${searchValue}`);
      setPage(1);
    }

    if (filter !== "") {
      queryParams.push(`orderStatus=${filter}`);
      setPage(1);
    } else {
      queryParams.push(``);
      setPage(1);
    }

    if (dateRange !== "") {
      queryParams.push(`dateRange=${dateRange}`);
      setPage(1);
    } else {
      queryParams.push(``);
      setPage(1);
    }

    return queryParams.join("&");
  };

  useEffect(() => {
    const query = generateQuery(searchValue, filter, dateRange);
    setSearchQuery(`${query}&page=${page}&limit=${itemsPerPage}`);
  }, [searchValue, page, filter, dateRange, itemsPerPage]);

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
          src={`${row?.orderby.image ? row?.orderby.image : "/user.jpg"}`}
          className={"w-[45px] h-[45px] rounded-md "}
          alt="user"
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
      name: "Total",
      selector: (row) => (
        <span className=" font-bold text-[18px]">৳ {row?.totle}</span>
      ),
      width: "150px",
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
          className={` py-[3px] px-3 text-[16px] font-semibold rounded-full ${
            row?.orderStatus === "Pending" && "bg-yellow-100 text-yellow-700 "
          } ${
            row?.orderStatus === "Processing" && " bg-blue-100 text-blue-700"
          } ${
            row?.orderStatus === "Complete" && "bg-green-100 text-green-700"
          } ${row?.orderStatus === "Cancel" && "bg-red-100 text-red-700"}`}
        >
          {row?.orderStatus}
        </p>
      ),
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <div className=" flex flex-row items-center gap-2">
            <select
              onChange={(e) => handelChance(e, row?._id)}
              value={row.orderStatus}
              className=" w-full bg-inputBg text-gray-700 border border-gray-200 py-2 text-[18px] outline-none focus:bg-white px-2 rounded-lg"
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
              <option className="" value="Cancel">
                Cancel
              </option>
            </select>
          </div>
        </>
      ),
      width: "180px",
    },
    {
      name: "Invoice",
      selector: (row) => (
        <div className="w-[80px] flex items-center justify-center">
          {" "}
          <button
            onClick={() => navigate(`/order/${row._id}`)}
            className=" text-[25px] w-full flex items-center justify-center"
          >
            <FiZoomIn size={23} />
          </button>
        </div>
      ),
      width: "120px",
    },
  ];

  const PagenationChange = (page, pageSiz) => {
    setPage(page);
  };

  // add-category
  return (
    <div className="dasbord_laout bgpr">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-[23px] font-semibold">All Order</h2>
        </div>

        <div className="  py-2 mt-4 rounded-lg">
          <div className=" bg-white shadow-sm rounded-lg p-5 w-full flex items-center justify-between gap-5 px-5">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className=" w-full bg-inputBg text-gray-700 border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
              placeholder="Search By Name email phone"
            />
            <select
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="w-full bg-inputBg text-gray-700 border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
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
            <select
              onChange={(e) => setDateRange(e.target.value)}
              value={dateRange}
              className="w-full bg-inputBg text-gray-700 border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
            >
              <option className="" value="">
                Order Limits{" "}
              </option>
              <option className="" value="last7days">
                Last 7 Days
              </option>
              <option className="" value="last15days">
                Last 15 Days
              </option>
              <option className="" value="last30days">
                Last 30 Days
              </option>
            </select>
            <button
              onClick={() => {
                setFilter("");
                setDateRange("");
              }}
              className="py-[15px] px-5 bg-yellow-500 text-white text-[18px] font-bold rounded-lg"
            >
              Clear
            </button>
          </div>

          <div className=" border rounded-lg bg-white overflow-hidden mt-5 shadow-sm">
            {isLoading ? (
              <>
                <Loader />
              </>
            ) : (
              <div className=" border-b border-b-gray-200">
                <Table columns={columns} data={data.order} />
              </div>
            )}

            {isLoading ? (
              <> </>
            ) : (
              <div className="flex items-center text-gray-700 justify-between py-5 px-5">
                <div>
                  <h2>
                    SHOWING {page === 1 ? page : page * itemsPerPage - 9} -{" "}
                    {page * itemsPerPage - 10 + data?.order?.length} OF{" "}
                    {data?.item}
                  </h2>
                </div>
                <Pagination
                  defaultCurrent={page}
                  total={data?.item}
                  pageSize={itemsPerPage}
                  onChange={PagenationChange}
                  showSizeChanger={false}
                />
              </div>
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
