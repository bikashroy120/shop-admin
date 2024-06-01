import React, { useEffect, useState } from "react";

import Table from "../components/table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { toast } from "react-toastify";
import { deleteProduct } from "../services/productServices";
import { getUser } from "../services/authServices";
import Loader from "../components/UI/Loader";
import { useDebounce } from "use-debounce";
import { Pagination } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaSearchPlus } from "react-icons/fa";

const User = () => {
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  
  let itemsPerPage = 10;

  const { data, isLoading } = useQuery(["user", searchQuery], () =>
    getUser(searchQuery)
  );

  const { mutate } = useMutation(deleteProduct, {
    onSuccess: (data) => {
      // Invalidate and refetch
      toast.success("Delete success");
      queryClient.invalidateQueries(["product"]);
      setShow(false);
    },
    onError: () => {
      toast.error("error ");
    },
  });

  console.log(data);

  const generateQuery = () => {
    const queryParams = [];

    if (search) {
      queryParams.push(`search=${searchValue}`);
      setPage(1);
    }

    return queryParams.join("&");
  };

  useEffect(() => {
    const query = generateQuery();
    setSearchQuery(`${query}&page=${page}&limit=${itemsPerPage}`);
  }, [searchValue, page]);

  const columns = [
    {
      name: "Img",
      selector: (row) => (
        <img
          src={`${row?.image ? row?.image : "/user.jpg"}`}
          className={"w-[45px] h-[45px] rounded-md "}
          alt="user"
        />
      ),
      width: "100px",
    },
    {
      name: "Name",
      selector: (row) => row?.fastname + " " + row?.lastname,
    },

    {
      name: "Email",
      selector: (row) => row?.email,
    },
    {
      name: "Phone",
      selector: (row) => row?.mobile,
    },
    {
      name: "City",
      selector: (row) => row?.city,
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <div className=" flex flex-row items-center gap-4">
            <button onClick={() => navigate(`/user/view/${row._id}`)} className=" text-[22px] hover:text-green-500"><FaSearchPlus /></button>
            <button
              onClick={() => navigate(`/user/${row._id}`)}
              className=" text-[23px] hover:text-green-500"
            >
              <FiEdit />
            </button>
            <button
              onClick={() =>
                toast.error("দুঃখিত ইউজার পেইজের কাজ এখনো শেষ হয়নি")
              }
              className=" text-[28px] hover:text-red-500"
            >
              <RiDeleteBinLine />
            </button>
          </div>
        </>
      ),
      width: "150px",
    },
  ];

  const getId = (id) => {
    setShow(true);
    setDeleteId(id);
  };

  const PagenationChange = (page, pageSiz) => {
    setPage(page);
  };

  // add-category
  return (
    <div className="dasbord_laout bgpr">
      <div>
        <div className=" py-2 mt-8 rounded-lg">
          <div className=" flex items-center gap-4 bg-white rounded-md shadow-sm py-4 mb-5 px-5 justify-between">
            <div className=" w-full">
              <h2 className="text-[23px] font-semibold">All User</h2>
            </div>
            <div className="w-full">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                className=" w-full bg-transparent border border-gray-200 outline-none py-3 px-5 rounded-lg"
                placeholder="Search By user Name Phone Email"
              />
            </div>
          </div>
          <div className=" border rounded-lg bg-white overflow-hidden shadow-sm">
            {isLoading ? (
              <>
                <Loader />
              </>
            ) : (
              <div className=" border-b border-b-gray-200">
                <Table columns={columns} data={data?.user} />
              </div>
            )}

            {isLoading ? (
              <> </>
            ) : (
              <div className="flex items-center justify-between py-5 px-5">
                <div>
                  <h2>
                    SHOWING {page === 1 ? page : page * itemsPerPage - 100} -{" "}
                    {page * data?.user.length} OF {data?.item}
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
                onClick={() => mutate(deleteId)}
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

export default User;
