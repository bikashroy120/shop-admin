import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "react-query";
import {
  addShippingCost,
  getShippingCost,
  updateShippingCost,
} from "../../services/categoryServices";
import Loader from "../UI/Loader";

let schema = yup.object().shape({
  inDhaka: yup.string().required("inDhaka is Required"),
  outDhaka: yup.string().required("outDhaka is Required"),
});

const ShippingCost = () => {
  const [id,setId]=useState()

  const {
    data,
    isSuccess,
    isLoading: pageLoading,
    refetch
  } = useQuery(["shippingCost"], () => getShippingCost());

  console.log(data)

  const { mutate, isLoading } = useMutation((value)=>updateShippingCost(id,value), {
    onSuccess: (data) => {
      formik.resetForm();
      toast.success("Update Shipping Cost success");
      refetch(["shippingCost"])
    },
    onError: () => {
      toast.error("error ");
    },
  });


  useEffect(() => {
    if (isSuccess) {
      formik.values.inDhaka = data[0]?.inDhaka;
      formik.values.outDhaka = data[0]?.outDhaka;
      setId(data[0]?._id)
    }
  }, [isSuccess, data]);

  const formik = useFormik({
    initialValues: {
      inDhaka: "",
      outDhaka: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = {
        inDhaka: values.inDhaka,
        outDhaka: values.outDhaka,
      };
      mutate(data);
    },
  });

  return (
    <div>
      <h2 className=" text-[25px] mt-8 font-semibold">Shipping Cost</h2>
      {pageLoading ? (
        <Loader></Loader>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className=" bg-white shadow-sm rounded-lg px-5"
        >
          <div className=" flex items-start flex-col md:flex-row justify-between my-10">
            <label
              className=" text-[18px] text-gray-700 font-medium"
              htmlFor=""
            >
              In Dhaka Shipping Cost
            </label>
            <div className="md:w-[70%] w-full">
              <input
                type="number"
                className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg  "
                placeholder="In dhaka"
                onChange={formik.handleChange("inDhaka")}
                onBlur={formik.handleBlur("inDhaka")}
                value={formik.values.inDhaka}
              />
              <div
                className="error text-red-500"
                style={{ height: "5px", marginLeft: "5px" }}
              >
                {formik.touched.inDhaka && formik.errors.inDhaka}
              </div>
            </div>
          </div>

          <div className=" flex items-start flex-col md:flex-row justify-between my-10">
            <label
              className=" text-[18px] text-gray-700 font-medium"
              htmlFor=""
            >
              Out of Dhaka Shipping Cost
            </label>
            <div className="md:w-[70%] w-full">
              <input
                type="number"
                className="w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg  "
                placeholder="Out Dhaka"
                onChange={formik.handleChange("outDhaka")}
                onBlur={formik.handleBlur("outDhaka")}
                value={formik.values.outDhaka}
              />
              <div
                className="error text-red-500"
                style={{ height: "5px", marginLeft: "5px" }}
              >
                {formik.touched.outDhaka && formik.errors.outDhaka}
              </div>
            </div>
          </div>

          <div className=" flex items-center justify-between">
            <div className="md:w-[30%] w-full"></div>
            <div className="md:w-[70%] w-full flex items-center flex-col md:flex-row justify-center gap-6 py-5 ">
              <button
                type="submit"
                className=" py-3 px-10 w-full rounded-lg bg-primary text-white hover:bg-green-700 duration-300"
              >
                {isLoading ? "Loading..." : "Update Shipping Cost"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ShippingCost;
