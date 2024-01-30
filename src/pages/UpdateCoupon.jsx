import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { singalCoupon, updateCoupon } from "../services/couponServices";
import { key } from "../utils/base_url";
import Loader from "../components/UI/Loader";
import PageTitle from "../ui/PageTitle";

const UpdateCoupon = () => {
  const parems = useParams();
  const itemID = parems.id;
  const queryClient = useQueryClient();
  const navgate = useNavigate();
  const [name, setName] = useState("");
  const [expiry, setexpiry] = useState("");
  const [discount, setdiscount] = useState("");
  const [title, setTitle] = useState("");
  const [uploadLoading, setuploadLoading] = useState(false);
  const [file, setFile] = useState();

  const {
    data,
    isLoading: pageLoading,
    isSuccess,
  } = useQuery(["coupon1", itemID], () => singalCoupon(itemID));
  const { mutate, isLoading } = useMutation(
    (data) => updateCoupon(data, itemID),
    {
      onSuccess: (data) => {
        // Invalidate and refetch
        toast.success("Update Coupon success");
        queryClient.invalidateQueries(["coupon1"]);
        navgate("/coupon");
      },
      onError: () => {
        toast.error("error ");
      },
    }
  );

  console.log(expiry);

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

  // const changeDateFormet = (date) => {
  //   const newDate = new Date(date).toLocaleDateString();
  //   const [month, day, year] = newDate.split("/");
  //   return [year, month, day].join("-");
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      name,
      expiry,
      discount,
      image: file,
    };
    mutate(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle(data?.title);
      setName(data?.name);
      setexpiry(data?.expiry.slice(0,10));
      setdiscount(data?.discount);
      setFile(data?.image);
    }
  }, [data, isSuccess]);

  console.log(data);

  return (
    <div className="dasbord_laout text-white">
    <PageTitle title={"Update Coupon"} />

      {pageLoading ? (
        <><Loader/></>
      ) : (
        <>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className=" bg-primary py-8 rounded-lg px-5"
          >
            <div className=" flex items-start flex-col md:flex-row justify-between my-10">
              <label className=" text-[18px] font-medium" htmlFor="">
                Coupon title
              </label>
              <div className="w-full md:w-[70%]">
                <input
                  type="text"
                  className=" w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg "
                  placeholder="Category Title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
            </div>

            <div className=" flex items-start flex-col md:flex-row justify-between my-10">
              <label className=" text-[18px] font-medium" htmlFor="">
                Coupon Code
              </label>
              <div className="w-full md:w-[70%]">
                <input
                  type="text"
                  className=" w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg "
                  placeholder="Category Title"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            </div>

            <div className=" flex items-start flex-col md:flex-row justify-between my-10">
              <label className=" text-[18px] font-medium" htmlFor="">
                Name
              </label>
              <div className="w-full md:w-[70%]">
                <input
                  type="Date"
                  className=" w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg "
                  placeholder="Category Title"
                  value={expiry}
                  onChange={(e) => setexpiry(e.target.value)}
                />
              </div>
            </div>

            <div className=" flex items-start flex-col md:flex-row justify-between my-10">
              <label className=" text-[18px] font-medium" htmlFor="">
                Name
              </label>
              <div className="w-full md:w-[70%]">
                <input
                  type="number"
                  className=" w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg "
                  placeholder="Category Title"
                  onChange={(e) => setdiscount(e.target.value)}
                  value={discount}
                />
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

            <div className=" flex items-center flex-col md:flex-row justify-center gap-6 py-5 ">
              <button
                onClick={() => navgate("/coupon")}
                className=" py-3 px-10 rounded-lg w-full md:w-auto bg-gray-600 text-white "
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" py-3 px-10 rounded-lg w-full md:w-auto bg-green-600 hover:bg-green-700 duration-300"
              >
                {isLoading ? "Loading..." : "Update"}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateCoupon;
