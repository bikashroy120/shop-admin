import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { addBrand } from "../services/barndServices";
import PageTitle from "../ui/PageTitle";
import { key } from "../utils/base_url";

let schema = yup.object().shape({
  title: yup.string().required("title is Required"),
  description: yup.string().required("description is Required"),
});

const AddBrand = () => {
  const navgate = useNavigate();
  const [uploadLoading, setuploadLoading] = useState(false);
  const [file, setFile] = useState();
  const { mutate, isLoading } = useMutation(addBrand, {
    onSuccess: (data) => {
      // Invalidate and refetch
      formik.resetForm();
      toast.success("Add Brand success");
    },
    onError: () => {
      toast.error("error ");
    },
  });

  const imgUrl = `https://api.imgbb.com/1/upload?key=${key}`;
  const handleImageUpload = (e) => {
    setuploadLoading(true);
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
        setuploadLoading(false);
      })
      .catch((error) => {
        setuploadLoading(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = {
        title: values.title,
        description: values.description,
        image: file,
      };

      mutate(data);
    },
  });

  return (
    <div className="dasbord_laout">
      <PageTitle title={"Add Brand"} />

      <form
        onSubmit={formik.handleSubmit}
        className=" bg-white shadow-sm py-8 rounded-lg px-5"
      >
        <div className=" flex flex-col md:flex-row items-start justify-between my-10">
          <label className=" text-[18px] text-gray-700 font-medium" htmlFor="">
            Title
          </label>
          <div className="md:w-[70%] w-full">
            <input
              type="text"
              className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg "
              placeholder="Brand Title"
              onChange={formik.handleChange("title")}
              onBlur={formik.handleBlur("title")}
              value={formik.values.title}
            />
            <div
              className="error text-red-500"
              style={{ height: "5px", marginLeft: "5px" }}
            >
              {formik.touched.title && formik.errors.title}
            </div>
          </div>
        </div>
        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] text-gray-700 font-medium" htmlFor="">
            Description
          </label>
          <div className="md:w-[70%] w-full">
            <textarea
              name=""
              id=""
              cols="10"
              rows="10"
              className="  h-[200px] w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg "
              placeholder="Brand Description"
              onChange={formik.handleChange("description")}
              onBlur={formik.handleBlur("description")}
              value={formik.values.description}
            ></textarea>
            <div
              className="error text-red-500"
              style={{ height: "5px", marginLeft: "5px" }}
            >
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row  justify-between my-10">
          <label className=" text-[18px] font-medium text-gray-700" htmlFor="">
            Image
          </label>
          <div className="md:w-[70%] w-full">
            <div className="w-full my-3">
              <div className="md:flex items-center gap-2">
                {/* <p className="text-info text-lg font-bold">Icon:</p> */}
                <div className="relative border-2 rounded-lg border-gray-400 border-dashed w-full h-[100px]  text-center flex items-center justify-center flex-col">
                  <p className="text-xl font-bold  ">Drag your image here</p>
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
              {uploadLoading && (
                <div>
                  <h2>Image Uploading...</h2>
                </div>
              )}
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
          <div className="md:w-[30%] w-full"></div>
          <div className=" md:w-[70%] w-full flex items-center flex-col md:flex-row justify-center gap-6 py-5 ">
            <button
              onClick={() => navgate("/brand")}
              className=" py-3 px-10 rounded-lg w-full hover:bg-red-500 bg-gray-600 text-white "
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" py-3 px-10 rounded-lg w-full bg-primary text-white hover:bg-green-700 duration-300"
            >
              {isLoading ? "Loading..." : "Add Brand"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddBrand;
