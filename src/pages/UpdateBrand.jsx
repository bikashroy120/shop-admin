import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ColorRing } from "react-loader-spinner";
import { singalBrand, updateBrand } from "../services/barndServices";
import Loader from "../components/UI/Loader";
import PageTitle from "../ui/PageTitle";

let schema = yup.object().shape({
  title: yup.string().required("title is Required"),
  description: yup.string().required("description is Required"),
});

const UpdateBrand = () => {
  const parems = useParams();
  const itemID = parems.id;
  const queryClient = useQueryClient();
  const navgate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  const {
    data,
    isSuccess,
    isLoading: pageLoading,
  } = useQuery(["brand1", itemID], () => singalBrand(itemID));
  const { mutate, isLoading } = useMutation(
    (data) => updateBrand(data, itemID),
    {
      onSuccess: (data) => {
        // Invalidate and refetch
        toast.success("Update Category success");
        queryClient.invalidateQueries(["brand1"]);
        navgate("/brand");
      },
      onError: () => {
        toast.error("error ");
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
    };
    mutate(data);
  };

  useEffect(() => {

    if(isSuccess){
      setTitle(data?.title);
      setdescription(data?.description);
    }
  }, [isSuccess,data]);

  return (
    <div className="dasbord_laout text-white">

    <PageTitle title={"Update Brand"} />

      {pageLoading ? (
        <><Loader /></>
      ) : (
        <>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className=" bg-primary py-8 rounded-lg px-5"
          >
            <div className=" flex items-start flex-col md:flex-row justify-between my-10">
              <label className=" text-[18px] font-medium" htmlFor="">
                Name
              </label>
              <div className="md:w-[70%] w-full">
                <input
                  type="text"
                  className=" w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg "
                  placeholder="Category Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
            </div>
            <div className=" flex items-start flex-col md:flex-row  justify-between my-10">
              <label className=" text-[18px] font-medium" htmlFor="">
                Description
              </label>
              <div className="md:w-[70%] w-full">
                <textarea
                  name=""
                  id=""
                  cols="10"
                  rows="10"
                  className=" w-full h-[200px] bg-transparent border border-[#808191] py-3 px-5 rounded-lg "
                  placeholder="Category Description"
                  onChange={(e) => setdescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>
            </div>

            <div className=" flex items-center flex-col md:flex-row  justify-center gap-6 py-5 ">
              <button
                onClick={() => navgate("/brand")}
                className=" py-3 px-10 rounded-lg w-full md:w-auto bg-gray-600 text-white "
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" py-3 px-10 rounded-lg w-full md:w-auto bg-green-600 hover:bg-green-700 duration-300"
              >
                {isLoading ? (
                  "Loading..."
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateBrand;
