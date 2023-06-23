import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FiUploadCloud} from "react-icons/fi"
import * as yup from "yup";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { ColorRing } from 'react-loader-spinner';
import { addBrand } from '../services/barndServices';
import { addCoupon } from '../services/couponServices';


let schema = yup.object().shape({
    name: yup.string().required("Coupon Name is Required"),
    expiry: yup.date().required("Expiry Date is Required"),
    discount: yup.number().required("Discount Percentage is Required"),
  });

const AddCoupon = () => {
  const navgate =  useNavigate()

  const {mutate, isLoading} = useMutation(addCoupon, {
    onSuccess: (data) => {
      // Invalidate and refetch
      formik.resetForm()
      toast.success("Add Coupon success")
    },
    onError:()=>{
      toast.error("error ")
    }
  })

    const formik = useFormik({
      initialValues: {
        name: "",
        expiry: "",
        discount: "",
      },
      validationSchema: schema,
      onSubmit: (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);

        mutate(values)
      },
    });

  return (
    <div className='dasbord_laout text-white' >
        <div className='pb-5'>
        <h2 className=' font-semibold text-[23px]'>Add Coupon</h2>
          <p>Add your Coupon and necessary information from here</p>
        </div>

        <form onSubmit={formik.handleSubmit} className=" bg-primary py-8 rounded-lg px-5">
            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Name</label>
                <div className='w-[70%]'>
                    <input type="text" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Coupon Name' 
                      onChange={formik.handleChange("name")}
                      onBlur={formik.handleBlur("name")}
                      value={formik.values.name}  
                    
                    />
                    <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.name && formik.errors.name}
                      </div>
                </div>
            </div>

            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Expiry Date</label>
                <div className='w-[70%]'>
                    <input type="Date" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg '
                      onChange={formik.handleChange("expiry")}
                      onBlur={formik.handleBlur("expiry")}
                      value={formik.values.expiry}  
                    
                    />
                    <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.expiry && formik.errors.expiry}
                      </div>
                </div>
            </div>

            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Discount</label>
                <div className='w-[70%]'>
                    <input type="number" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Diacount' 
                      onChange={formik.handleChange("discount")}
                      onBlur={formik.handleBlur("discount")}
                      value={formik.values.discount}  
                    
                    />
                    <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.discount && formik.errors.discount}
                      </div>
                </div>
            </div>

            
            <div className=' flex items-center justify-center gap-6 py-5 '>
                <button onClick={()=>navgate("/coupon")} className=' py-3 px-10 rounded-lg bg-gray-600 text-white '>Cancel</button>
                <button type='submit' className=' py-3 px-10 rounded-lg bg-green-600 hover:bg-green-700 duration-300'>{isLoading ? ( 
                        <ColorRing
                          visible={true}
                          height="30"
                          width="30"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        /> ) : "Add Coupon"}</button>
            </div>

        </form>
    </div>
  )
}

export default AddCoupon
