import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { singalBrand, updateBrand } from "../services/barndServices";
import Loader from "../components/UI/Loader";
import PageTitle from "../ui/PageTitle";
import { key } from "../utils/base_url";

const UpdateBrand = () => {
  const parems = useParams();
  const itemID = parems.id;
  const queryClient = useQueryClient();
  const navgate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [uploadLoading, setuploadLoading] = useState(false);
  const [file, setFile] = useState();

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
        toast.success("Update Brand success");
        queryClient.invalidateQueries(["brand1"]);
        navgate("/brand");
      },
      onError: () => {
        toast.error("error ");
      },
    }
  );

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      image:file
    };
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle(data?.title);
      setdescription(data?.description);
    }
  }, [isSuccess, data]);

  return (
    <div className="dasbord_laout">
      <PageTitle title={"Update Brand"} />

      {pageLoading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className=" bg-white shadow-sm py-8 rounded-lg px-5"
          >
            <div className=" flex items-start flex-col md:flex-row justify-between my-10">
              <label
                className=" text-[18px] text-gray-700 font-medium"
                htmlFor=""
              >
                Title
              </label>
              <div className="md:w-[70%] w-full">
                <input
                  type="text"
                  className=" w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
                  placeholder="Category Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
            </div>
            <div className=" flex items-start flex-col md:flex-row  justify-between my-10">
              <label
                className=" text-gray-700 text-[18px] font-medium"
                htmlFor=""
              >
                Description
              </label>
              <div className="md:w-[70%] w-full">
                <textarea
                  name=""
                  id=""
                  cols="10"
                  rows="10"
                  className=" w-full h-[200px] bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
                  placeholder="Category Description"
                  onChange={(e) => setdescription(e.target.value)}
                  value={description}
                ></textarea>
              </div>
            </div>

            <div className=" flex items-start flex-col md:flex-row  justify-between my-10">
              <label
                className=" text-[18px] font-medium text-gray-700"
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

            <div className="flex items-center">
              <div className="md:w-[30%] w-full"></div>
              <div className=" md:w-[70%] w-full flex items-center flex-col md:flex-row  justify-center gap-6 py-5 ">
                <button
                  onClick={() => navgate("/brand")}
                  className=" py-3 px-10 rounded-lg hover:bg-red-500 w-full bg-gray-600 text-white "
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className=" py-3 px-10 rounded-lg w-full bg-primary text-white hover:bg-green-700 duration-300"
                >
                  {isLoading ? "Loading..." : "Update"}
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateBrand;
