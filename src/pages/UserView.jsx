import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { QueryClient, useMutation, useQuery } from "react-query";
import PageTitle from "../ui/PageTitle";
import Loader from "../components/UI/Loader";
import { getById, getByIdAdmin, updateOrder } from "../services/authServices";
import { FiZoomIn } from "react-icons/fi";
import { Pagination } from "antd";
import Table from "../components/table/Table";
import { toast } from "react-toastify";

const UserView = () => {
  const parems = useParams();
  const itemID = parems.id;
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  let itemsPerPage = 10;

  const {
    data,
    refetch,
    isLoading,
  } = useQuery(["order", itemID], () => getByIdAdmin(itemID,searchQuery));

  const update = useMutation(updateOrder, {
    onSuccess: (data) => {
      // Invalidate and refetch
      toast.success("Order update success");
      refetch()
    },
    onError: () => {
      toast.error("error ");
    },
  });

  const handelChance = (e, id) => {
    const data = {
      value: e.target.value,
      id: id,
    };

    update.mutate(data);
  };

  console.log(data);

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
  ];

  const PagenationChange = (page, pageSiz) => {
    setPage(page);
  };

  return (
    <div className="dasbord_laout">
      <div>
        <PageTitle title={"Customer Order List"} />

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
  );
};

export default UserView;
