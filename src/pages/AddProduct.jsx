import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FiUploadCloud} from "react-icons/fi"
import * as yup from "yup";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'react-query';
import { addCategory, getCategory } from '../services/categoryServices';
import { ColorRing } from 'react-loader-spinner';
import { addProduct } from '../services/productServices';
import { getBrand } from '../services/barndServices';


let schema = yup.object().shape({
  title: yup.string().required("title is Required"),
  description:yup.string().required("description is Required"),
  bprice:yup.number().required("buy price is Required"),
  price:yup.number().required(" price is Required"),
  category:yup.string().required("category is Required"),
  brand:yup.string().required("brand is Required"),
  quantity:yup.number().required("quantity is Required"),
});

const AddProduct = () => {
  const navgate =  useNavigate()
  const brand = useQuery('brand', getBrand);
  const category = useQuery('category', getCategory);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    const file = Array.from(event.target.files)
    setSelectedFiles((pre)=>[...pre,...file])
  };



  const {mutate, isLoading} = useMutation(addProduct, {
    onSuccess: (data) => {
      // Invalidate and refetch
      formik.resetForm()
      setSelectedFiles([])
      toast.success("Add Product success")
    },
    onError:()=>{
      toast.error("error ")
    }
  })

    useEffect(()=>{
      formik.values.image = selectedFiles
    },[selectedFiles])

    const formik = useFormik({
      initialValues: {
        title: "",
        description:"",
        image:[],
        bprice:"",
        price:"",
        category:"",
        brand:"",
        quantity:"",
      },
      validationSchema: schema,
      onSubmit: (values) => {
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('bprice', values.bprice);
        formData.append('price', values.price);
        formData.append('category', values.category);
        formData.append('brand', values.brand);
        formData.append('quantity', values.quantity);
        values.image.forEach((file) => {
            formData.append('image', file);
          });

        mutate(formData)
      },
    });


  return (
    <div className='dasbord_laout text-white' >
        <div className='pb-5'>
        <h2 className=' font-semibold text-[23px]'>Add Category</h2>
          <p>Add your Product category and necessary information from here</p>
        </div>

        <form onSubmit={formik.handleSubmit} className=" bg-primary py-8 rounded-lg px-5">
            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Name</label>
                <div className='w-[70%]'>
                    <input type="text" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Category Title' 
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
                  <textarea name="" id="" cols="10" rows="10" className=' w-full h-[200px] bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Category Description'
                    onChange={formik.handleChange("description")}
                    onBlur={formik.handleBlur("description")}
                    value={formik.values.description}    
                  ></textarea>
                  <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.description && formik.errors.description}
                  </div>
                </div>
            </div>
            
            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Buy Price</label>
                <div className='w-[70%]'>
                    <input type="number" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Buy Price...' 
                      onChange={formik.handleChange("bprice")}
                      onBlur={formik.handleBlur("bprice")}
                      value={formik.values.bprice}  
                    
                    />
                    <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.bprice && formik.errors.bprice}
                      </div>
                </div>
            </div>

            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Sale Price</label>
                <div className='w-[70%]'>
                    <input type="number" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Price...' 
                      onChange={formik.handleChange("price")}
                      onBlur={formik.handleBlur("price")}
                      value={formik.values.price}  
                    
                    />
                    <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.price && formik.errors.price}
                      </div>
                </div>
            </div>

            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Product Category</label>
                <div className='w-[70%]'>
                    <select  className=' w-full bg-primary border border-[#808191] py-3 px-5 rounded-lg ' name="cars" id="cars"     
                    onChange={formik.handleChange("category")}
                    onBlur={formik.handleBlur("category")}
                    value={formik.values.category} 
                    >
                        <option className='' value="">Select Category</option>
                        {
                            category.data?.map((item,i)=>{
                                return(
                                    <option key={i} className='' value={item._id}>{item.title}</option>
                                )
                            })
                        }
                    </select>
                    <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.category && formik.errors.category}
                      </div>
                </div>
            </div>

            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Product Brand</label>
                <div className='w-[70%]'>
                    <select  className=' w-full bg-primary border border-[#808191] py-3 px-5 rounded-lg ' name="cars" id="cars"     
                    onChange={formik.handleChange("brand")}
                    onBlur={formik.handleBlur("brand")}
                    value={formik.values.brand} 
                    >
                        <option className='' value="">Select Brand</option>
                        {
                            brand.data?.map((item,i)=>{
                                return(
                                    <option key={i} className='' value={item._id}>{item.title}</option>
                                )
                            })
                        }
                    </select>
                    <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.brand && formik.errors.brand}
                      </div>
                </div>
            </div>


            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Quantity</label>
                <div className='w-[70%]'>
                    <input type="number" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Buy Price...' 
                      onChange={formik.handleChange("quantity")}
                      onBlur={formik.handleBlur("quantity")}
                      value={formik.values.quantity}  
                    
                    />
                    <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.quantity && formik.errors.quantity}
                      </div>
                </div>
            </div>


            <div className=' flex items-start justify-between mt-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Image</label>
                <label htmlFor="id" className=' flex flex-col items-center gap-2 justify-center py-5 w-[70%] cursor-pointer border border-dashed rounded-lg border-gray-400'>
                    <FiUploadCloud className=' text-[45px] text-green-600' />
                    <h2 className='text-[20px] font-medium'>Drag your images here</h2>
                    <p>(Only *.jpeg, *.webp and *.png images will be accepted)</p>
                    <input id='id' type="file" multiple onChange={handleFileChange} className=' hidden' />
                </label>
            </div>
            <div className=' h-[70px] flex items-start justify-between'>
                <div>

                </div>
                <div className='w-[70%] flex items-center gap-3'>
                    {
                      selectedFiles ? <>
                        {
                            selectedFiles.map((item,i)=>{
                                return(
                                    <img key={i} src={URL.createObjectURL(item)} alt="" className='w-[80px] h-[50px]' />
                                )
                            })
                            
                        }
                      
                      </> : null
                    }
                </div>
            </div>
            
            <div className=' flex items-center justify-center gap-6 py-5 '>
                <button onClick={()=>navgate("/product")} className=' py-3 px-10 rounded-lg bg-gray-600 text-white '>Cancel</button>
                <button type='submit' className=' py-3 px-10 rounded-lg bg-green-600 hover:bg-green-700 duration-300'>{isLoading ? ( 
                        <ColorRing
                          visible={true}
                          height="30"
                          width="30"
                          ariaLabel="blocks-loading"
                          wrapperStyle={{}}
                          wrapperClass="blocks-wrapper"
                          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        /> ) : "Add Product"}</button>
            </div>

        </form>
    </div>
  )
}

export default AddProduct
