import React, { useState } from "react";
import "../styles/settings.css";
import { key } from "../utils/base_url";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addBanner, deleteBanner, getBanner } from "../services/blogServices";
import Loader from "../components/UI/Loader";
import { toast } from "react-toastify";
import { AiTwotoneDelete } from "react-icons/ai";
import Table from "../components/table/Table";
import { RiDeleteBinLine } from "react-icons/ri";
import SiteBammer from "../components/banner/SiteBammer";

const Settings = () => {
  const [file, setFile] = useState();
  const [uploadLoading, setuploadLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading: mainLoading } = useQuery(["banner"], getBanner);

  const { mutate: deleteMutate } = useMutation(deleteBanner, {
    onSuccess: (data) => {
      // Invalidate and refetch
      toast.success("Delete success");
      queryClient.invalidateQueries(["banner"]);
    },
    onError: () => {
      toast.error("error ");
    },
  });

  const { mutate: addMutate, isLoading } = useMutation(addBanner, {
    onSuccess: (data) => {
      // Invalidate and refetch
      toast.success("banner add success");
      setFile("");
      queryClient.invalidateQueries(["banner"]);
    },
    onError: (error) => {
      toast.error("error");
      console.log(error);
    },
  });

  console.log("banner data===", data);

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
        console.log(error);
      });
  };

  const handelSubmit = (type) => {
    const data = {
      image: file,
      category: type,
    };
    addMutate(data);
  };

  console.log("======", data);

  return (
    <div className="dasbord_laout">
      <div>
        {mainLoading ? (
          <>
            <Loader />
          </>
        ) : (
          <>
            {" "}
            <div className=" bg-white shadow-sm py-8 rounded-lg px-10">
              <div className="">
                <div className="w-full">
                  <h2 className=" text-[20px] font-semibold">Main Banner</h2>
                  <div className=" flex items-start justify-between my-10">
                    <label
                      className=" md:w-[30%] w-full text-[18px] text-gray-700 font-medium"
                      htmlFor=""
                    >
                      Banner Image
                    </label>
                    <div className=" md:w-[70%] w-full">
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
                  <div className=" flex items-center md:flex-row flex-col ">
                    <div className="md:w-[30%] w-full"></div>
                    <div className=" md:w-[70%] w-full flex items-center justify-center gap-6">
                      <button
                        onClick={() => handelSubmit("main")}
                        className=" py-3 px-10 w-full text-white rounded-lg bg-primary hover:bg-green-700 duration-300"
                      >
                        {isLoading ? "Loading..." : " Add Banner"}
                      </button>
                    </div>
                  </div>
                  <div className=" flex items-start mt-10 md:flex-row flex-col">
                    <label
                      className=" md:w-[30%] w-full text-[18px] text-gray-700 font-medium"
                      htmlFor=""
                    >
                      Banner Image List
                    </label>
                    <div className=" w-full md:w-[70%]">
                      <div className=" grid md:grid-cols-3 gap-5 grid-cols-2 ">
                        {data?.banner
                          ?.filter((item) => item.category === "main")
                          .map((ban, index) => (
                            <div className=" w-full h-full relative group rounded-xl overflow-hidden">
                              <img
                                src={ban.image}
                                alt=""
                                className=" w-full h-full object-cover"
                              />
                              <div className=" bg-black/40 flex items-center opacity-0 group-hover:opacity-100 duration-300  justify-center w-full h-full absolute top-0 left-0 ">
                                <button
                                  onClick={() => deleteMutate(ban?._id)}
                                  className=" text-[25px] text-white"
                                >
                                  {" "}
                                  <RiDeleteBinLine />
                                </button>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" border mt-8"></div>

              <SiteBammer />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Settings;
