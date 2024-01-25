import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import { getCategory } from "../services/categoryServices";
import { ColorRing } from "react-loader-spinner";
import { addProduct } from "../services/productServices";
import { getBrand } from "../services/barndServices";
import PageTitle from "../ui/PageTitle";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { key } from "../utils/base_url";
import { MdDeleteForever } from "react-icons/md";

let schema = yup.object().shape({
  title: yup.string().required("title is Required"),
  sku: yup.string().required("sku is Required"),
  bprice: yup.number().required("buy price is Required"),
  price: yup.number().required(" price is Required"),
  category: yup.string().required("category is Required"),
  brand: yup.string().required("brand is Required"),
  quantity: yup.number().required("quantity is Required"),
});

const AddProduct = () => {
  const navgate = useNavigate();
  const brand = useQuery("brand", getBrand);
  const category = useQuery("category", getCategory);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [imageLoading, setImageLoading] = useState(false);


  const { mutate, isLoading } = useMutation(addProduct, {
    onSuccess: (data) => {
      // Invalidate and refetch
      formik.resetForm();
      setDescription("")
      setImageUrl([])
      toast.success("Add Product success");
    },
    onError: () => {
      toast.error("error ");
    },
  });


  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      image: [],
      bprice: "",
      price: "",
      category: "",
      brand: "",
      quantity: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      // const formData = new FormData();
      // formData.append("title", values.title);
      // formData.append("description", values.description);
      // formData.append("bprice", values.bprice);
      // formData.append("price", values.price);
      // formData.append("category", values.category);
      // formData.append("brand", values.brand);
      // formData.append("quantity", values.quantity);
      // values.image.forEach((file) => {
      //   formData.append("image", file);
      // });

      const data = {
        title:values.title,
        description:description,
        bprice:values.bprice,
        price:values.price,
        category:values.category,
        brand:values.brand,
        quantity:values.quantity,
        sku:values.sku,
        image:imageUrl,
      }

      mutate(data);
    },
  });

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
        toast.error("Image upload file");
        setImageLoading(false);
      });
  };


  console.log("============================",imageUrl)
  // ------------------------remove image-----------------------------
  const handleRemoveImage = (index) => {
    imageUrl.splice(index, 1);
  };

  return (
    <div className="dasbord_laout text-white">
      <PageTitle title={"Add Product"} />
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
              placeholder="Product Title"
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
            {/* <textarea name="" id="" cols="10" rows="10" className=' w-full h-[200px] bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Product Description'
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    value={formik.values.description}    
                  ></textarea>
                  <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.description && formik.errors.description}
                  </div> */}
            <ReactQuill
              //   theme="snow"
              value={description}
              onChange={setDescription}
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
          <label className=" text-[18px] font-medium" htmlFor="">
            Buy Price
          </label>
          <div className="md:w-[70%] w-full">
            <input
              type="text"
              className=" w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg "
              placeholder="Enter sku..."
              onChange={formik.handleChange("sku")}
              onBlur={formik.handleBlur("sku")}
              value={formik.values.sku}
            />
            <div
              className="error text-red-500"
              style={{ height: "5px", marginLeft: "5px" }}
            >
              {formik.touched.sku && formik.errors.sku}
            </div>
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] font-medium" htmlFor="">
            Buy Price
          </label>
          <div className="md:w-[70%] w-full">
            <input
              type="number"
              className=" w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg "
              placeholder="Buy Price..."
              onChange={formik.handleChange("bprice")}
              onBlur={formik.handleBlur("bprice")}
              value={formik.values.bprice}
            />
            <div
              className="error text-red-500"
              style={{ height: "5px", marginLeft: "5px" }}
            >
              {formik.touched.bprice && formik.errors.bprice}
            </div>
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] font-medium" htmlFor="">
            Sale Price
          </label>
          <div className="md:w-[70%] w-full">
            <input
              type="number"
              className=" w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg "
              placeholder="Price..."
              onChange={formik.handleChange("price")}
              onBlur={formik.handleBlur("price")}
              value={formik.values.price}
            />
            <div
              className="error text-red-500"
              style={{ height: "5px", marginLeft: "5px" }}
            >
              {formik.touched.price && formik.errors.price}
            </div>
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] font-medium" htmlFor="">
            Product Category
          </label>
          <div className="md:w-[70%] w-full">
            <select
              className=" w-full bg-primary border border-[#808191] py-3 px-5 rounded-lg "
              name="cars"
              id="cars"
              onChange={formik.handleChange("category")}
              onBlur={formik.handleBlur("category")}
              value={formik.values.category}
            >
              <option className="" value="">
                Select Category
              </option>
              {category.data?.map((item, i) => {
                return (
                  <option key={i} className="" value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <div
              className="error text-red-500"
              style={{ height: "5px", marginLeft: "5px" }}
            >
              {formik.touched.category && formik.errors.category}
            </div>
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] font-medium" htmlFor="">
            Product Brand
          </label>
          <div className="md:w-[70%] w-full">
            <select
              className=" w-full bg-primary border border-[#808191] py-3 px-5 rounded-lg "
              name="cars"
              id="cars"
              onChange={formik.handleChange("brand")}
              onBlur={formik.handleBlur("brand")}
              value={formik.values.brand}
            >
              <option className="" value="">
                Select Brand
              </option>
              {brand.data?.map((item, i) => {
                return (
                  <option key={i} className="" value={item.title}>
                    {item.title}
                  </option>
                );
              })}
            </select>
            <div
              className="error text-red-500"
              style={{ height: "5px", marginLeft: "5px" }}
            >
              {formik.touched.brand && formik.errors.brand}
            </div>
          </div>
        </div>

        <div className=" flex items-start flex-col md:flex-row justify-between my-10">
          <label className=" text-[18px] font-medium" htmlFor="">
            Quantity
          </label>
          <div className="md:w-[70%] w-full">
            <input
              type="number"
              className=" w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg "
              placeholder="Buy Price..."
              onChange={formik.handleChange("quantity")}
              onBlur={formik.handleBlur("quantity")}
              value={formik.values.quantity}
            />
            <div
              className="error text-red-500"
              style={{ height: "5px", marginLeft: "5px" }}
            >
              {formik.touched.quantity && formik.errors.quantity}
            </div>
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
                {
                  imageLoading &&  <div>
                  <h2>uploading...</h2>
                </div>
                }
              {imageUrl && (
                <div className="flex justify-center gap-2 sm:justify-start ">
                  {
                    imageUrl.map((file,index)=>(
                      <div key={index} className=" group relative w-[100px] h-[60px] rounded-lg   shadow-md overflow-hidden mt-3 ">
                      <img
                        src={file}
                        alt="product"
                        className="w-full h-full object-cover"
                      />
                        <button type="button" onClick={()=>handleRemoveImage(index)} className="text-[20px] group-hover:flex  absolute top-0 right-0  hidden duration-300 items-center justify-center w-full h-full bg-black/30 text-red-500"><MdDeleteForever /></button>
                    </div>
                    ))
                  }
                </div>
              )}
            </div>
          </div>
        </div>

        <div className=" flex items-center flex-col md:flex-row justify-center gap-6 py-5 ">
          <button
            onClick={() => navgate("/product")}
            className=" py-3 px-10 w-full md:w-auto rounded-lg bg-gray-600 text-white "
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
              "Add Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
