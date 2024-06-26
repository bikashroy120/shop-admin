import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { singalBlog, updateBlog } from "../services/blogServices";
import PageTitle from "../ui/PageTitle";
import { key } from "../utils/base_url";
import Loader from "../components/UI/Loader";

let schema = yup.object().shape({
  title: yup.string().required("title is Required"),
  description: yup.string().required("description is Required"),
  category: yup.string().required("category is Required"),
});

const UpdateBlog = () => {
  const navgate = useNavigate();
  const parems = useParams();
  const itemID = parems.id;
  const queryClient = useQueryClient();
  const [uploadLoading, setuploadLoading] = useState(false);
  const [file, setFile] = useState();

  const {
    data,
    isSuccess,
    isLoading: pageLoading,
  } = useQuery(["blog", itemID], () => singalBlog(itemID));

  const { mutate, isLoading } = useMutation(
    (data) => updateBlog(data, itemID),
    {
      onSuccess: (data) => {
        // Invalidate and refetch
        formik.resetForm();
        setFile("");
        queryClient.invalidateQueries(["blog"]);
        toast.success("Add Category success");
      },
      onError: () => {
        toast.error("error ");
      },
    }
  );

  useEffect(() => {
    if (isSuccess) {
      formik.values.title = data?.title;
      formik.values.category = data?.category;
      formik.values.description = data?.description;
      setFile(data?.image);
    }
  }, [isSuccess, data]);

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
      category: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = {
        title: values.title,
        description: values.description,
        category: values.category,
        image: file,
      };

      mutate(data);
    },
  });

  return (
    <div className="dasbord_laout">
      <PageTitle title={"Update Blog"} />
      {pageLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          {" "}
          <form
            onSubmit={formik.handleSubmit}
            className=" bg-white shadow-sm py-8 rounded-lg px-5"
          >
            <div className=" flex items-start flex-col md:flex-row justify-between my-10">
              <label
                className=" text-[18px] text-gray-700 font-medium"
                htmlFor=""
              >
                Name
              </label>
              <div className="w-full md:w-[70%]">
                <input
                  type="text"
                  className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
                  placeholder="Blog Title"
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
              <label
                className=" text-[18px] text-gray-700 font-medium"
                htmlFor=""
              >
                Category
              </label>
              <div className="w-full md:w-[70%]">
                <input
                  type="text"
                  className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
                  placeholder="Blog Category"
                  onChange={formik.handleChange("category")}
                  onBlur={formik.handleBlur("category")}
                  value={formik.values.category}
                />
                <div
                  className="error text-red-500"
                  style={{ height: "5px", marginLeft: "5px" }}
                >
                  {formik.touched.category && formik.errors.category}
                </div>
              </div>
            </div>
            <div className=" flex items-start flex-col md:flex-row justify-between my-10">
              <label
                className=" text-[18px] text-gray-700 font-medium"
                htmlFor=""
              >
                Description
              </label>
              <div className="w-full md:w-[70%]">
                <textarea
                  name=""
                  id=""
                  cols="10"
                  rows="10"
                  className=" w-full h-[200px] bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
                  placeholder="Description"
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
              <label
                className=" text-[18px] text-gray-700 font-medium"
                htmlFor=""
              >
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

            <div className=" flex items-center">
              <div className=" md:w-[30%] w-full"></div>
              <div className=" md:w-[70%] w-full flex items-center flex-col md:flex-row justify-center gap-6 py-5 ">
                <button
                  onClick={() => navgate("/blog")}
                  className=" py-3 px-10 rounded-lg w-full hover:bg-red-500 bg-gray-600 text-white "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" py-3 px-10 rounded-lg w-full bg-primary text-white hover:bg-green-700 duration-300"
                >
                  {isLoading ? "Loading..." : "Update Blog"}
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateBlog;
