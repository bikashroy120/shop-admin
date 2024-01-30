import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HiOutlineUpload, HiOutlineDownload } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import Table from "../components/table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { deleteCoupon, getCoupon } from "../services/couponServices";
import { useDebounce } from "use-debounce";
import Loader from "../components/UI/Loader";
import { Pagination } from "antd";

const Copun = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  let itemsPerPage = 10;

  const { data, isLoading } = useQuery(["coupon", searchQuery], () =>
    getCoupon(searchQuery)
  );

  const { mutate } = useMutation(deleteCoupon, {
    onSuccess: (data) => {
      // Invalidate and refetch
      toast.success("Delete success");
      queryClient.invalidateQueries(["coupon"]);
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
  }, [searchValue,page]);

  const PagenationChange = (page, pageSiz) => {
    setPage(page);
  };

  const columns = [
    {
      name: "Img",
      selector: (row) => (
        <img
          src={row?.image}
          className={"w-[45px] h-[45px] rounded-md "}
          alt="coupon"
        />
      ),
      width: "100px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Code",
      selector: (row) => row.name,
    },

    {
      name: "Expiry Date",
      selector: (row) => row.expiry.slice(0, 10),
    },

    {
      name: "Discount",
      selector: (row) => row.discount,
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <div className=" flex flex-row items-center gap-2">
            {/* <button><HiOutlineViewfinderCircle /></button> */}
            <button
              onClick={() => navigate(`/update-coupon/${row._id}`)}
              className=" text-[20px] hover:text-green-500"
            >
              <FiEdit />
            </button>
            <button
              onClick={() => getId(row._id)}
              className=" text-[20px] hover:text-red-500"
            >
              <AiTwotoneDelete />
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
    <div className="dasbord_laout text-white bgpr">
      <div>
        <div className=" bg-primary text-white py-6 px-5 rounded-xl flex items-center justify-between ">
          <h2 className="text-[23px] font-semibold">Coupon</h2>
          <div className=" flex items-center gap-3">
            <button
              onClick={() => navigate("/add-coupon")}
              className=" flex items-center gap-2 py-3 px-10 rounded-lg bg-green-500 hover:bg-green-700 duration-300 transition-all"
            >
              <FaRegEdit style={{ fontSize: "20px" }} />
              Add Coupon
            </button>
          </div>
        </div>

        <div className=" bg-primary text-white py-2  mt-8 rounded-lg">
          <div className="md:w-[50%] w-full pt-4 px-5">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className=" w-full bg-transparent border border-[#808191] outline-none py-3 px-5 rounded-lg"
              placeholder="Search By Coupon title code and discount"
            />
          </div>
          {isLoading ? (
            <>
              <Loader />
            </>
          ) : (
            <div className=" mt-5 border-b border-b-gray-500">
              <Table columns={columns} data={data?.coupon} />
            </div>
          )}
          <div className="flex items-center justify-end  py-2 pt-3 px-5">
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

export default Copun;
