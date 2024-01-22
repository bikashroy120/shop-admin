import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import Table from "../components/table/Table";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteCategory, getCategory } from "../services/categoryServices";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Loader from "../components/UI/Loader";
import { useDebounce } from "use-debounce";

const Category = () => {
  const navigate = useNavigate();
  
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchValue] = useDebounce(search, 1000);

  const { data, isLoading } = useQuery(["category",searchQuery], ()=>getCategory(searchQuery));

  const { mutate } = useMutation(deleteCategory, {
    onSuccess: (data) => {
      // Invalidate and refetch
      toast.success("Delete success");
      queryClient.invalidateQueries(["category",searchQuery]);
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
    setSearchQuery(`${query}`);
  }, [searchValue]);


  const columns = [
    {
      name: "Img",
      selector: (row) => (
        <img src={row?.image} className={"w-[45px] h-[45px] rounded-md "} />
      ),
    },
    {
      name: "Id",
      selector: (row) => row._id?.slice(10, 16),
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
          <div className=" flex flex-row items-center gap-2">
            {/* <button><HiOutlineViewfinderCircle /></button> */}
            <button
              onClick={() => navigate(`/update-category/${row._id}`)}
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
        <div className=" bg-primary text-white py-6 px-5 rounded-xl flex items-center flex-col md:flex-row gap-2 justify-between ">
          <div className="flex items-center gap-3">
            <h2 className="text-[23px] font-semibold">Product Category</h2>
          </div>
          <div className=" flex items-center gap-3">
            <button
              onClick={() => navigate("/add-category")}
              className=" flex items-center gap-2 py-3 px-10 rounded-lg bg-green-500 hover:bg-green-700 duration-300 transition-all"
            >
              <FaRegEdit style={{ fontSize: "20px" }} />
              Add Category
            </button>
          </div>
        </div>

        <div className=" bg-primary text-white py-2 mt-8 rounded-lg">
          <div className="w-[50%] pt-4 px-5">
            <input
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              className=" w-full bg-transparent border border-[#808191] outline-none py-3 px-5 rounded-lg"
              placeholder="Search By Category Name"
            />
          </div>
          {isLoading ? (
            <>
              <Loader />
            </>
          ) : (
            <div className=" mt-5">
              <Table columns={columns} data={data} />
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

export default Category;
