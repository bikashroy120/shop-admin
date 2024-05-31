import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaRegEdit, FaSearchPlus } from "react-icons/fa";
import Table from "../components/table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import { deleteProduct, getProduct } from "../services/productServices";
import { Pagination } from "antd";
import Loader from "../components/UI/Loader";
import { useDebounce } from "use-debounce";
import { getBrand, getBrand2 } from "../services/barndServices";
import { getCategory, getCategory2 } from "../services/categoryServices";
import { IoIosAddCircle } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

const Product = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [searchValue] = useDebounce(search, 1000);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  let itemsPerPage = 10;

  const { data, isLoading } = useQuery(["product", searchQuery], () =>
    getProduct(searchQuery)
  );
  const brandItem = useQuery("brand", getBrand2);
  const categoryItem = useQuery("category", getCategory2);

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

  const generateQuery = () => {
    const queryParams = [];

    if (search) {
      queryParams.push(`search=${searchValue}`);
      setPage(1);
    }

    if (category) {
      queryParams.push(`category=${category}`);
      setPage(1);
    }

    if (brand) {
      queryParams.push(`brand=${brand}`);
      setPage(1);
    }

    return queryParams.join("&");
  };

  useEffect(() => {
    const query = generateQuery();
    setSearchQuery(`${query}&page=${page}&limit=${itemsPerPage}`);
  }, [searchValue, page, category, brand]);

  const columns = [
    {
      name: "Img",
      selector: (row) => (
        <img
          src={`${row.images[0]}`}
          className={"w-[45px] h-[45px] rounded-md "}
          alt="product"
        />
      ),
      width: "100px",
    },
    {
      name: "Title",
      selector: (row) => row.title,
      width: "250px",
    },

    {
      name: "Category",
      selector: (row) => row.category,
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
    },
    {
      name: "Price",
      selector: (row) => <span className=" font-bold"> ৳ {row.bprice}</span>,
    },
    {
      name: "Sale Price",
      selector: (row) => <span className=" font-bold"> ৳ {row.price}</span>,
    },
    {
      name: "Stock",
      selector: (row) => row.quantity,
      width:"100px"
    },

    {
      name: "Status",
      selector: (row) => (
        <div className="h-[30px] flex items-center justify-center">
          <span
            className={`py-1 px-2 text-[15px] rounded-full ${
              row.quantity > 0 ? " bg-primary/20 text-green-700 " : ""
            }`}
          >
            {row.quantity > 0 ? "Selling" : "Out Stock"}
          </span>
        </div>
      ),
    },

    {
      name: "View",
      selector: (row) => (
        <div className="h-[30px] w-full flex items-center justify-center">
          <button
            onClick={() => navigate(`/view-product/${row._id}`)}
            className=" text-[20px] hover:text-green-500"
          >
            <FaSearchPlus />
          </button>
        </div>
      ),
      width: "90px",
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <div className=" flex flex-row items-center gap-2">
            {/* <button><HiOutlineViewfinderCircle /></button> */}
            <button
              onClick={() => navigate(`/update-product/${row._id}`)}
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

  const PagenationChange = (page, pageSiz) => {
    setPage(page);
  };

  console.log(data);

  // add-category
  return (
    <div className="dasbord_laout text-white bgpr">
      <div>
        <div className=" bg-white shadow-sm py-6 px-5 rounded-xl flex items-center justify-between ">
          <h2 className="text-[23px] text-gray-700 font-semibold">Product</h2>
          <div className=" flex items-center gap-3">
            <button
              onClick={() => navigate("/add-product")}
              className=" flex items-center gap-2 py-3 px-10 rounded-lg bg-green-500 hover:bg-green-700 duration-300 transition-all"
            >
              <IoIosAddCircle style={{ fontSize: "20px" }} />
              Add Product
            </button>
          </div>
        </div>

        <div className=" bg-white shadow-sm py-4 mt-5 rounded-lg">
          <div className=" w-full flex items-center justify-between gap-5 px-5">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className=" w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
              placeholder="Search By Name Category Brand"
            />
            <select
              className="w-full bg-inputBg text-gray-700 border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg "
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option className="" value="">
                Category
              </option>
              {categoryItem.data?.map((item, i) => {
                return (
                  <option key={i} className="" value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <select
              className=" w-full bg-inputBg text-gray-700 border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option className="" value="">
                Brand
              </option>
              {brandItem.data?.map((item, i) => {
                return (
                  <option key={i} className="" value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <button
              onClick={() => {
                setCategory("");
                setBrand("");
              }}
              className="py-[10px] px-5 bg-yellow-500 text-white text-[18px] font-bold rounded-lg"
            >
              Clear
            </button>
          </div>
        </div>

        <div className=" border rounded-lg bg-white overflow-hidden mt-5 shadow-sm">
          {isLoading ? (
            <>
              <Loader />
            </>
          ) : (
            <div className=" border-b border-b-gray-200">
              <Table columns={columns} data={data.products} />
            </div>
          )}

          {isLoading ? (
            <> </>
          ) : (
            <div className="flex items-center text-gray-700 justify-between py-5 px-5">
              <div>
                <h2>
                  SHOWING {page === 1 ? page : page * itemsPerPage - 9} -{" "}
                    {(page * itemsPerPage-10 ) + data?.products?.length} OF {data?.item}
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

export default Product;
