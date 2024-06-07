import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import PageTitle from "../ui/PageTitle";
import Loader from "../components/UI/Loader";
import { key } from "../utils/base_url";
import { getById, updateUserAdmin } from "../services/authServices";

let schema = yup.object().shape({
  fastname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
});

const UserEdit = () => {
  const parems = useParams();
  const itemID = parems.id;
  const queryClient = useQueryClient();
  const [file, setFile] = useState();
  const navgate = useNavigate();
  const {
    data,
    isSuccess,
    isLoading: pageLoading,
  } = useQuery(["category1", itemID], () => getById(itemID));

  const { mutate, isLoading } = useMutation(
    (data) => updateUserAdmin(data, itemID),
    {
      onSuccess: (data) => {
        // Invalidate and refetch
        formik.resetForm();
        toast.success("User update success");
        queryClient.invalidateQueries(["category1"]);
        navgate("/user");
      },
      onError: () => {
        toast.error("error ");
      },
    }
  );

  console.log(data);

  const imgUrl = `https://api.imgbb.com/1/upload?key=${key}`;
  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    fetch(imgUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setFile(result.data?.url);
      });
  };

  const formik = useFormik({
    initialValues: {
      fastname: "",
      lastname: "",
      image: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = {
        fastname: values.fastname,
        lastname: values.lastname,
        mobile: values.mobile,
        city: values.city,
        image: file,
      };
      mutate(data);
    },
  });

  useEffect(() => {
      formik.values.fastname = data?.user?.fastname;
      formik.values.lastname = data?.user?.lastname;
      formik.values.mobile = data?.user?.mobile;
      formik.values.city = data?.user?.city;
      setFile(data?.user?.image);
  }, [isSuccess, data]);

  return (
    <div className="dasbord_laout">
      <div>
        <PageTitle title={"Update Category"} />
        {pageLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {" "}
            <form
              onSubmit={formik.handleSubmit}
              className=" bg-white py-8 rounded-lg text-gray-700 px-5"
            >
              <div className=" flex items-start flex-col md:flex-row  justify-between my-10">
                <label
                  className=" text-[18px] font-medium text-gray-700"
                  htmlFor=""
                >
                  First Name
                </label>
                <div className="md:w-[70%] w-full">
                  <input
                    type="text"
                    className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg "
                    placeholder="Enter First Name"
                    onChange={formik.handleChange("fastname")}
                    onBlur={formik.handleBlur("fastname")}
                    value={formik.values.fastname}
                  />
                  <div
                    className="error text-red-500"
                    style={{ height: "5px", marginLeft: "5px" }}
                  >
                    {formik.touched.fastname && formik.errors.fastname}
                  </div>
                </div>
              </div>

              <div className=" flex items-start flex-col md:flex-row  justify-between my-10">
                <label
                  className=" text-[18px] font-medium text-gray-700"
                  htmlFor=""
                >
                  Last Name
                </label>
                <div className="md:w-[70%] w-full">
                  <input
                    type="text"
                    className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg  "
                    placeholder="Enter Last Name"
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                    value={formik.values.lastname}
                  />
                  <div
                    className="error text-red-500"
                    style={{ height: "5px", marginLeft: "5px" }}
                  >
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
              </div>

              <div className=" flex items-start flex-col md:flex-row  justify-between my-10">
                <label
                  className=" text-[18px] font-medium text-gray-700"
                  htmlFor=""
                >
                  Phone Number
                </label>
                <div className="md:w-[70%] w-full">
                  <input
                    type="text"
                    className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg "
                    placeholder="Enter Phone Number"
                    onChange={formik.handleChange("mobile")}
                    onBlur={formik.handleBlur("mobile")}
                    value={formik.values.mobile}
                  />
                  <div
                    className="error text-red-500"
                    style={{ height: "5px", marginLeft: "5px" }}
                  >
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                </div>
              </div>
              <div className=" flex items-start flex-col md:flex-row  justify-between my-10">
                <label
                  className=" text-[18px] font-medium text-gray-700"
                  htmlFor=""
                >
                  Address
                </label>
                <div className="md:w-[70%] w-full">
                  <input
                    type="text"
                    className=" w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg "
                    placeholder="Enter Address"
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                    value={formik.values.city}
                  />
                  <div
                    className="error text-red-500"
                    style={{ height: "5px", marginLeft: "5px" }}
                  >
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
              </div>

              <div className=" flex items-start flex-col md:flex-row  justify-between my-10">
                <label
                  className=" text-[18px] text-gray-700 font-medium"
                  htmlFor=""
                >
                  User Image
                </label>
                <div className="md:w-[70%] w-full">
                  <div className="w-full my-3">
                    <div className="md:flex items-center gap-2">
                      {/* <p className="text-info text-lg font-bold">Icon:</p> */}
                      <div className="relative border-2 rounded-lg border-gray-400 border-dashed w-full h-[100px]  text-center flex items-center justify-center flex-col">
                        <p className="text-xl font-bold  ">
                          Drag your image here
                        </p>
                        <span className="text-xs font-bold ">
                          (Only *.jpeg and *.png images will be accepted)
                        </span>
                        <input
                          type="file"
                          onChange={handleImageUpload}
                          className="opacity-0 absolute top-0 left-0 bottom-0 right-0 w-full h-full cursor-pointer"
                        />
                      </div>
                    </div>
                    {file && (
                      <div className="flex justify-center sm:justify-start ">
                        <div className="  w-[200px] h-auto p-1 bg-white shadow-md rounded-md mt-3 ">
                          <img
                            src={file}
                            alt="category"
                            className="w-full h-full object-contain "
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className=" flex items-center justify-between">
                <div></div>
                <div className=" md:w-[70%] w-full flex items-center flex-col md:flex-row justify-between md:gap-6 py-5 ">
                  <button
                    onClick={() => navgate("/user")}
                    className=" py-3 px-10 rounded-lg bg-gray-600 hover:bg-red-500 w-full text-white "
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className=" py-3 px-10 rounded-lg w-full bg-primary text-white hover:bg-green-700 duration-300"
                  >
                    {isLoading ? "Loading..." : "Add Category"}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default UserEdit;
