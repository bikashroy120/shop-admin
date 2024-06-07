import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HiOutlineUpload, HiOutlineDownload } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import Table from "../components/table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { deleteBrand, getBrand } from "../services/barndServices";
import { useDebounce } from "use-debounce";
import Loader from "../components/UI/Loader";
import { IoIosAddCircle } from "react-icons/io";
import { Pagination } from "antd";
import { RiDeleteBinLine } from "react-icons/ri";

const Brand = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  let itemsPerPage = 10;

  const { data, isLoading } = useQuery(["brand", searchQuery], () =>
    getBrand(searchQuery)
  );
  const { mutate } = useMutation(deleteBrand, {
    onSuccess: (data) => {
      // Invalidate and refetch
      toast.success("Delete success");
      queryClient.invalidateQueries(["brand", searchQuery]);
      setShow(false);
    },
    onError: () => {
      toast.error("error ");
    },
  });

  const generateQuery = () => {
    const queryParams = [];

    if (search) {
      queryParams.push(`search=${searchValue}`);
    }

    return queryParams.join("&");
  };

  useEffect(() => {
    const query = generateQuery();
    setSearchQuery(`${query}&page=${page}&limit=${itemsPerPage}`);
  }, [searchValue, page]);

  const PagenationChange = (page, pageSiz) => {
    setPage(page);
  };

  const columns = [
    {
      name: "S/N",
      selector: (row, index) => <span>{index + 1}</span>,
      width: "130px",
    },
    {
      name: "Image",
      selector: (row) => (
        <>
          {row?.image ? (
            <img
              src={row?.image}
              className={"w-[45px] h-[45px] rounded-md "}
              alt="category"
            />
          ) : (
            <span>No Image</span>
          )}
        </>
      ),
      width: "150px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },

    {
      name: "Description",
      selector: (row) => row.description,
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <div className=" flex flex-row items-center gap-3">
            {/* <button><HiOutlineViewfinderCircle /></button> */}
            <button
              onClick={() => navigate(`/update-brand/${row._id}`)}
              className=" text-[22px] hover:text-green-500"
            >
              <FiEdit />
            </button>
            <button
              onClick={() => getId(row._id)}
              className=" text-[25px] hover:text-red-500"
            >
              <RiDeleteBinLine />
            </button>
          </div>
        </>
      ),
      width: "130px",
    },
  ];

  const getId = (id) => {
    setShow(true);
    setDeleteId(id);
  };

  // add-category
  return (
    <div className="dasbord_laout bgpr">
      <div>
        <div className=" px-5 rounded-xl flex items-center flex-col md:flex-row gap-2 justify-between ">
          <div className="flex items-center gap-3">
            <h2 className="text-[23px] font-semibold">Product Brand</h2>
          </div>
        </div>

        <div className=" py-2 mt-4 rounded-lg">
          <div className=" flex items-center bg-white shadow-sm py-4 px-5 rounded-lg mb-5 justify-between gap-2">
            <div className="md:w-[50%] w-full">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                className=" w-full bg-inputBg border border-gray-200 py-3 text-[18px] outline-none focus:bg-white px-5 rounded-lg "
                placeholder="Search By Brand title"
              />
            </div>
            <div className=" flex items-center gap-3">
              <button
                onClick={() => navigate("/add-brand")}
                className=" flex items-center gap-2 text-white text-[18px] py-3 px-10 rounded-lg bg-primary hover:bg-green-700 duration-300 transition-all"
              >
                {/* <FaRegEdit style={{ fontSize: "20px" }} /> */}
                <IoIosAddCircle style={{ fontSize: "25px" }} />
                Add Brand
              </button>
            </div>
          </div>

          <div className=" border rounded-lg bg-white overflow-hidden shadow-sm">
            {isLoading ? (
              <>
                <Loader />
              </>
            ) : (
              <div className=" border-b border-b-gray-200">
                <Table columns={columns} data={data.data} />
              </div>
            )}

            {isLoading ? (
              <> </>
            ) : (
              <div className="flex items-center justify-between py-5 px-5">
                <div>
                  <h2>
                    SHOWING {page === 1 ? page : page * itemsPerPage - 9} -{" "}
                    {(page * itemsPerPage-10 ) + data?.data?.length} OF {data?.item}
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

export default Brand;
