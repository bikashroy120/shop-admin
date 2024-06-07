import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import { key } from "../utils/base_url";
import { updateUser } from "../services/authServices";

const Profile = () => {
  const [file, setFile] = useState();
  const [uploadLoading, setuploadLoading] = useState(false);
  const [fastname, setfastname] = useState("");
  const [lastname, setlastname] = useState("");
  const [mobile, setmobilet] = useState("");
  const [city, setcityt] = useState("");

  const { user } = useSelector((state) => state.auth);

  console.log(user);

  useEffect(() => {
    if (user) {
      setfastname(user?.firstname);
      setlastname(user?.lastname);
      setmobilet(user?.mobile);
      setcityt(user?.city);
      setFile(user?.image);
    }
  }, [user]);

  const { mutate, isLoading } = useMutation((data) => updateUser(data), {
    onSuccess: (data) => {
      // Invalidate and refetch
      toast.success("Profile update success");
      localStorage.setItem("Admin", JSON.stringify(data));
      localStorage.setItem("jwtToken", JSON.stringify(data.token));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      firstname: fastname,
      lastname,
      mobile,
      city,
      image: file,
    };
    mutate(data);
  };

  //   useEffect(()=>{
  //     setName(data?.name)
  //     setexpiry(changeDateFormet(data?.expiry))
  //     setdiscount(data?.discount)
  //   },[data])

  //   console.log(data)

  return (
    <div className="dasbord_laout">
      <div className="pb-5">
        <h2 className=" font-semibold text-[23px]">Update Profile</h2>
      </div>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className=" bg-white shadow-sm py-8 rounded-lg px-5"
      >
        <div className=" flex items-start flex-col md:flex-row  justify-between my-10">
          <label className=" text-[18px] text-gray-700 font-medium" htmlFor="">
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

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] text-gray-700 font-medium" htmlFor="">
            First Name
          </label>
          <div className="w-full md:w-[70%]">
            <input
              type="text"
              className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
              placeholder="First Name"
              onChange={(e) => setfastname(e.target.value)}
              value={fastname}
            />
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] text-gray-700 font-medium" htmlFor="">
            Last Name
          </label>
          <div className="w-full md:w-[70%]">
            <input
              type="text"
              className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
              placeholder="Last Name"
              onChange={(e) => setlastname(e.target.value)}
              value={lastname}
            />
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] text-gray-700 font-medium" htmlFor="">
            Phone
          </label>
          <div className="w-full md:w-[70%]">
            <input
              type="text"
              className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
              placeholder="Phone"
              onChange={(e) => setmobilet(e.target.value)}
              value={mobile}
            />
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] text-gray-700 font-medium" htmlFor="">
            Address
          </label>
          <div className="w-full md:w-[70%]">
            <input
              type="text"
              className=" w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
              placeholder="City"
              onChange={(e) => setcityt(e.target.value)}
              value={city}
            />
          </div>
        </div>

        <div className=" flex items-center">
          <div className="md:w-[30%] w-full"></div>
          <div className=" md:w-[70%] w-full flex items-center justify-center gap-6 py-5 ">
            <button
              type="submit"
              className=" py-3 px-10 rounded-lg bg-primary text-white w-full hover:bg-green-700 duration-300"
            >
              {isLoading ? "Loading..." : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
