import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUploadCloud } from "react-icons/fi";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { ColorRing } from "react-loader-spinner";
import { addBrand } from "../services/barndServices";
import PageTitle from "../ui/PageTitle";

let schema = yup.object().shape({
  title: yup.string().required("title is Required"),
  description: yup.string().required("description is Required"),
});

const AddBrand = () => {
  const navgate = useNavigate();

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

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      mutate(values);
    },
  });

  return (
    <div className="dasbord_laout text-white">
      <PageTitle title={"Add Brand"} />

      <form
        onSubmit={formik.handleSubmit}
        className=" bg-primary py-8 rounded-lg px-5"
      >
        <div className=" flex flex-col md:flex-row items-start justify-between my-10">
          <label className=" text-[18px] font-medium" htmlFor="">
            Name
          </label>
          <div className="md:w-[70%] w-full">
            <input
              type="text"
              className=" w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg "
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

        <div className=" flex items-center flex-col md:flex-row justify-center gap-6 py-5 ">
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
              "Add Brand"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBrand;
