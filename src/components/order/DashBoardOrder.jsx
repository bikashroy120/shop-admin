import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";
import { FiZoomIn } from "react-icons/fi";
import Table from "../table/Table";
import Loader from "../UI/Loader";
import { getOrder, updateOrder } from "../../services/authServices";

const DashBoardOrder = () => {
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
  ];

  // add-category
  return (
    <div className="  py-2  rounded-lg">
      <div className=" border rounded-lg bg-white overflow-hidden shadow-lg">
        {isLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <div className=" border-b border-b-gray-200">
            <Table columns={columns} data={data.order} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoardOrder;
