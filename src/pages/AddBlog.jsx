import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FiUploadCloud} from "react-icons/fi"
import * as yup from "yup";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { addCategory } from '../services/categoryServices';
import { ColorRing } from 'react-loader-spinner';
import { addBlog } from '../services/blogServices';


let schema = yup.object().shape({
  title: yup.string().required("title is Required"),
  description:yup.string().required("description is Required"),
  category:yup.string().required("category is Required"),
});

const AddBlog = () => {
  const [file,setfile] = useState()
  const navgate =  useNavigate()

  const {mutate, isLoading} = useMutation(addBlog, {
    onSuccess: (data) => {
      // Invalidate and refetch
      formik.resetForm()
      toast.success("Add Category success")
    },
    onError:()=>{
      toast.error("error ")
    }
  })

    useEffect(()=>{
      formik.values.image = file
    },[file])

    const formik = useFormik({
      initialValues: {
        title: "",
        description:"",
        category:"",
        image:{}
      },
      validationSchema: schema,
      onSubmit: (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('image', values.image);

        mutate(values)
      },
    });

  return (
    <div className='dasbord_laout text-white' >
        <div className='pb-5'>
        <h2 className=' font-semibold text-[23px]'>Add Blog</h2>
          <p>Add your Blog and necessary information from here</p>
        </div>

        <form onSubmit={formik.handleSubmit} className=" bg-primary py-8 rounded-lg px-5">
            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Name</label>
                <div className='w-[70%]'>
                    <input type="text" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Blog Title' 
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
                <label className=' text-[18px] font-medium' htmlFor="">Category</label>
                <div className='w-[70%]'>
                    <input type="text" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Blog Category' 
                      onChange={formik.handleChange("category")}
                      onBlur={formik.handleBlur("category")}
                      value={formik.values.category}  
                    
                    />
                    <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.category && formik.errors.category}
                      </div>
                </div>
            </div>
            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Description</label>
                <div className='w-[70%]'>
                  <textarea name="" id="" cols="10" rows="10" className=' w-full h-[200px] bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Description'
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    value={formik.values.description}    
                  ></textarea>
                  <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.description && formik.errors.description}
                  </div>
                </div>
            </div>

            <div className=' flex items-start justify-between mt-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Image</label>
                <label htmlFor="id" className=' flex flex-col items-center gap-2 justify-center py-5 w-[70%] cursor-pointer border border-dashed rounded-lg border-gray-400'>
                    <FiUploadCloud className=' text-[45px] text-green-600' />
                    <h2 className='text-[20px] font-medium'>Drag your images here</h2>
                    <p>(Only *.jpeg, *.webp and *.png images will be accepted)</p>
                    <input id='id' type="file" onChange={(e)=>setfile(e.target.files[0])} className=' hidden' />
                </label>
            </div>
            <div className=' h-[70px] flex items-start justify-between'>
                <div>

                </div>
                <div className='w-[70%]'>
                    {
                      file ? <img src={URL.createObjectURL(file)} alt="" className='w-[80px] h-[50px]' /> : null
                    }
                </div>
            </div>
            
            <div className=' flex items-center justify-center gap-6 py-5 '>
                <button onClick={()=>navgate("/blog")} className=' py-3 px-10 rounded-lg bg-gray-600 text-white '>Cancel</button>
                <button type='submit' className=' py-3 px-10 rounded-lg bg-green-600 hover:bg-green-700 duration-300'>{isLoading ? ( 
                        <ColorRing
                          visible={true}
                          height="80"
                          width="80"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        /> ) : "Add Category"}</button>
            </div>

        </form>
    </div>
  )
}

export default AddBlog
