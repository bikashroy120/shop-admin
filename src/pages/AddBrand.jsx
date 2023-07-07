import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FiUploadCloud} from "react-icons/fi"
import * as yup from "yup";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { ColorRing } from 'react-loader-spinner';
import { addBrand } from '../services/barndServices';


let schema = yup.object().shape({
  title: yup.string().required("title is Required"),
  description:yup.string().required("description is Required"),
});

const AddBrand = () => {
  const navgate =  useNavigate()

  const {mutate, isLoading} = useMutation(addBrand, {
    onSuccess: (data) => {
      // Invalidate and refetch
      formik.resetForm()
      toast.success("Add Brand success")
    },
    onError:()=>{
      toast.error("error ")
    }
  })

    const formik = useFormik({
      initialValues: {
        title: "",
        description:"",
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
        <h2 className=' font-semibold text-[23px]'>Add Brand</h2>
          <p>Add your Product Brand and necessary information from here</p>
        </div>

        <form onSubmit={formik.handleSubmit} className=" bg-primary py-8 rounded-lg px-5">
            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Name</label>
                <div className='w-[70%]'>
                    <input type="text" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Brand Title' 
                      onChange={formik.handleChange("title")}
                      onBlur={formik.handleBlur("title")}
                      value={formik.values.title}  
                    
                    />
                    <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.title && formik.errors.title}
                      </div>
                </div>
            </div>
            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Description</label>
                <div className='w-[70%]'>
                  <textarea name="" id="" cols="10" rows="10" className=' w-full h-[200px] bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Brand Description'
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    value={formik.values.description}    
                  ></textarea>
                  <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.description && formik.errors.description}
                  </div>
                </div>
            </div>
            
            <div className=' flex items-center justify-center gap-6 py-5 '>
                <button onClick={()=>navgate("/brand")} className=' py-3 px-10 rounded-lg bg-gray-600 text-white '>Cancel</button>
                <button type='submit' className=' py-3 px-10 rounded-lg bg-green-600 hover:bg-green-700 duration-300'>{isLoading ? ( 
                        <ColorRing
                          visible={true}
                          height="30"
                          width="30"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        /> ) : "Add Brand"}</button>
            </div>

        </form>
    </div>
  )
}

export default AddBrand
