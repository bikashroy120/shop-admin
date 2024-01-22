import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { addCategory } from "../services/categoryServices";
import PageTitle from "../ui/PageTitle";

let schema = yup.object().shape({
  title: yup.string().required("title is Required"),
  description: yup.string().required("description is Required"),
});

const AddCategory = () => {
  const [file, setFile] = useState();
  const navgate = useNavigate();

  const { mutate, isLoading } = useMutation(addCategory, {
    onSuccess: (data) => {
      // Invalidate and refetch
      formik.resetForm();
      toast.success("Add Category success");
    },
    onError: () => {
      toast.error("error ");
    },
  });

  const imgUrl = `https://api.imgbb.com/1/upload?key=8afa748431eb08431e4d3e8918c75005`;
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
    <div className="dasbord_laout text-white">
      <PageTitle title={"Add Category"} />

      <form
        onSubmit={formik.handleSubmit}
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
          <label className=" text-[18px] font-medium" htmlFor="">
            Image
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
                      alt="category image"
                      className="w-full h-full object-contain "
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className=" flex items-center flex-col md:flex-row justify-center gap-6 py-5 ">
          <button
            onClick={() => navgate("/category")}
            className=" py-3 px-10 rounded-lg bg-gray-600 w-full md:w-auto text-white "
          >
            Cancel
          </button>
          <button
            type="submit"
            className=" py-3 px-10 w-full md:w-auto rounded-lg bg-green-600 hover:bg-green-700 duration-300"
          >
            {isLoading ? (
                "Loading..."
            ) : (
              "Add Category"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
