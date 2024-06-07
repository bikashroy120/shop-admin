import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import { getCategory, getCategory2 } from "../services/categoryServices";
import { singalProduct, updateProduct } from "../services/productServices";
import { getBrand, getBrand2 } from "../services/barndServices";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PageTitle from "../ui/PageTitle";
import { key } from "../utils/base_url";
import { MdDeleteForever } from "react-icons/md";

const UpdateProduct = () => {
  const navgate = useNavigate();
  const brands = useQuery("brand", getBrand2);
  const categorys = useQuery("category", getCategory2);
  const [title, settitle] = useState();
  const [description, setdescription] = useState();
  const [bprice, setbprice] = useState();
  const [price, setprice] = useState();
  const [category, setcategory] = useState();
  const [brand, setbrand] = useState();
  const [quantity, setquantity] = useState();
  const [sku,setSku] = useState()
  const [imageUrl, setImageUrl] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);
  const parems = useParams();
  const itemID = parems.id;

  const { data, isSuccess } = useQuery(["product1", itemID], () =>
    singalProduct(itemID)
  );
  const { mutate, isLoading } = useMutation(
    (data) => updateProduct(data, itemID),
    {
      onSuccess: (data) => {
        // Invalidate and refetch
        toast.success("Update Product success");
        navgate("/product");
      },
      onError: () => {
        toast.error("error ");
      },
    }
  );

  const imgUrl = `https://api.imgbb.com/1/upload?key=${key}`;
  const handleImageUpload = (e) => {
    setImageLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    fetch(imgUrl, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        let newImageUrls = [...imageUrl];
        newImageUrls.push(result.data?.url);
        setImageUrl(newImageUrls);
        toast.success("Image upload success!");
        setImageLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Image upload file");
        setImageLoading(false);
      });
  };

  // ------------------------remove image-----------------------------
  const handleRemoveImage = (index) => {
    const updateImage = imageUrl?.filter((item) => item !== index);
    setImageUrl(updateImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      bprice,
      price,
      category,
      brand,
      quantity,
      images: imageUrl,
    };
    mutate(data);
  };

  useEffect(() => {
    settitle(data?.title);
    setdescription(data?.description);
    setbprice(data?.bprice);
    setprice(data?.price);
    setbrand(data?.brand);
    setcategory(data?.category);
    setquantity(data?.quantity);
    setSku(data?.sku)
    setImageUrl(data?.images);
  }, [isSuccess, data]);

  return (
    <div className="dasbord_laout">
      <PageTitle title={"Update Product"} />

      <form
        onSubmit={(e) => handleSubmit(e)}
        className=" bg-white shadow-sm py-8 rounded-lg px-5"
      >
        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] text-gray-700 font-medium" htmlFor="">
            Name
          </label>
          <div className="md:w-[70%] w-full">
            <input
              type="text"
              className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg "
              placeholder="Category Title"
              onChange={(e) => settitle(e.target.value)}
              value={title}
            />
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] text-gray-700 font-medium" htmlFor="">
            Description
          </label>
          <div className="md:w-[70%] w-full bg-inputBg border border-gray-200  text-[18px] outline-none focus:bg-white rounded-lg">
            <ReactQuill
              //   theme="snow"
              value={description}
              onChange={setdescription}
              style={{
                height: 200,
                marginBottom: 50,
                borderRadius: 10,
                border: "none",
              }}
            />
          </div>
        </div>
        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] text-gray-700 font-medium" htmlFor="">
            Product SKU
          </label>
          <div className="md:w-[70%] w-full">
            <input
              type="text"
              className=" w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
              placeholder="Enter sku..."
              value={sku}
              onChange={(e)=>setSku(e.target.value)}
            />
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] text-gray-700 font-medium" htmlFor="">
            Buy Price
          </label>
          <div className="md:w-[70%] w-full">
            <input
              type="number"
              className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg "
              placeholder="Buy Price..."
              onChange={(e) => setbprice(e.target.value)}
              value={bprice}
            />
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] text-gray-700 font-medium" htmlFor="">
            Sale Price
          </label>
          <div className="md:w-[70%] w-full">
            <input
              type="number"
              className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
              placeholder="Price..."
              onChange={(e) => setprice(e.target.value)}
              value={price}
            />
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] text-gray-700 font-medium" htmlFor="">
            Product Category
          </label>
          <div className="w-full md:w-[70%]">
            <select
              className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
              name="cars"
              id="cars"
              onChange={(e) => setcategory(e.target.value)}
              value={category}
            >
              <option className="" value="">
                Select Category
              </option>
              {categorys.data?.map((item, i) => {
                return (
                  <option key={i} className="" value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] text-gray-700 font-medium" htmlFor="">
            Product Brand
          </label>
          <div className="md:w-[70%] w-full">
            <select
              className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg"
              name="cars"
              id="cars"
              onChange={(e) => setbrand(e.target.value)}
              value={brand}
            >
              <option className="" value="">
                Select Brand
              </option>
              {brands.data?.map((item, i) => {
                return (
                  <option key={i} className="" value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] font-medium text-gray-700" htmlFor="">
            Quantity
          </label>
          <div className="md:w-[70%] w-full">
            <input
              type="number"
              className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg "
              placeholder="Buy Price..."
              onChange={(e) => setquantity(e.target.value)}
              value={quantity}
            />
          </div>
        </div>

        <div className=" flex items-start  flex-col md:flex-row  justify-between my-10">
          <label className=" text-[18px] font-medium" htmlFor="">
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
              {imageLoading && (
                <div>
                  <h2>uploading...</h2>
                </div>
              )}
              {imageUrl && (
                <div className="flex justify-center gap-2 sm:justify-start ">
                  {imageUrl.map((file, index) => (
                    <div
                      key={index}
                      className=" group relative w-[100px] h-[60px] rounded-lg   shadow-md overflow-hidden mt-3 "
                    >
                      <img
                        src={file}
                        alt="product"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(file)}
                        className="text-[20px] group-hover:flex  absolute top-0 right-0  hidden duration-300 items-center justify-center w-full h-full bg-black/30 text-red-500"
                      >
                        <MdDeleteForever />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="md:w-[30%] w-full"></div>
          <div className=" md:w-[70%] w-full flex items-center flex-col md:flex-row justify-center gap-6 py-5 ">
            <button
              onClick={() => navgate("/product")}
              className=" py-3 px-10 rounded-lg w-full hover:bg-red-500 bg-gray-600 text-white "
            >
              Cancel
            </button>
            <button
              type="submit"
              className=" py-3 px-10 w-full rounded-lg bg-primary text-white hover:bg-green-700 duration-300"
            >
              {isLoading ? "Loading..." : "Update Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
