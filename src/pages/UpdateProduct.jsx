import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {FiUploadCloud} from "react-icons/fi"
import * as yup from "yup";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from 'react-query';
import {  getCategory } from '../services/categoryServices';
import { ColorRing } from 'react-loader-spinner';
import { singalProduct, updateProduct } from '../services/productServices';
import { getBrand } from '../services/barndServices';



const UpdateProduct = () => {
  const navgate =  useNavigate()
  const brands = useQuery('brand', getBrand);
  const categorys = useQuery('category', getCategory);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [title,settitle] = useState()
  const [description,setdescription] = useState()
  const [bprice,setbprice] = useState()
  const [price,setprice] = useState()
  const [category,setcategory] = useState()
  const [brand,setbrand] = useState()
  const [quantity,setquantity] = useState()
  const parems = useParams()
  const itemID = parems.id

//   const handleFileChange = (event) => {
//     const file = Array.from(event.target.files)
//     setSelectedFiles((pre)=>[...pre,...file])
//   };


const { data} = useQuery(["product1",itemID],()=>singalProduct(itemID));
  const {mutate, isLoading} = useMutation((data)=>updateProduct(data,itemID), {
    onSuccess: (data) => {
      // Invalidate and refetch
      setSelectedFiles([])
      toast.success("Update Product success")
      navgate('/product')
    },
    onError:()=>{
      toast.error("error ")
    }
  })

    // useEffect(()=>{
    //   formik.values.image = selectedFiles
    // },[selectedFiles])

    // const formik = useFormik({
    //   initialValues: {
    //     title: "",
    //     description:"",
    //     image:[],
    //     bprice:"",
    //     price:"",
    //     category:"",
    //     brand:"",
    //     quantity:"",
    //   },
    //   validationSchema: schema,
    //   onSubmit: (values) => {
    //     const formData = new FormData();
    //     formData.append('title', values.title);
    //     formData.append('description', values.description);
    //     formData.append('bprice', values.bprice);
    //     formData.append('price', values.price);
    //     formData.append('category', values.category);
    //     formData.append('brand', values.brand);
    //     formData.append('quantity', values.quantity);
    //     values.image.forEach((file) => {
    //         formData.append('image', file);
    //       });

    //     mutate(formData)
    //   },
    // });

    const handleSubmit = (e)=>{
        e.preventDefault()
        const data= {
        title,
        description,
        bprice,
        price,
        category,
        brand,
        quantity,
        }
        mutate(data)
      }


      useEffect(()=>{
        settitle(data?.title)
        setdescription(data?.description)
        setbprice(data?.bprice)
        setprice(data?.price)
        setbrand(data?.brand._id)
        setcategory(data?.category._id)
        setquantity(data?.quantity)
      },[data])


  return (
    <div className='dasbord_laout text-white' >
        <div className='pb-5'>
        <h2 className=' font-semibold text-[23px]'>Update Product</h2>
          <p>Update your Product and necessary information from here</p>
        </div>

        <form onSubmit={(e)=>handleSubmit(e)} className=" bg-primary py-8 rounded-lg px-5">
            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Name</label>
                <div className='w-[70%]'>
                    <input type="text" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Category Title' 
                      onChange={(e)=>settitle(e.target.value)}
                      value={title}  
                    
                    />
                </div>
            </div>
            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Description</label>
                <div className='w-[70%]'>
                  <textarea name="" id="" cols="10" rows="10" className=' w-full h-[200px] bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Category Description'
                    onChange={(e)=>setdescription(e.target.value)}
                    value={description}    
                  ></textarea>
                </div>
            </div>
            
            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Buy Price</label>
                <div className='w-[70%]'>
                    <input type="number" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Buy Price...' 
                      onChange={(e)=>setbprice(e.target.value)}
                      value={bprice}  
                    />
                </div>
            </div>

            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Sale Price</label>
                <div className='w-[70%]'>
                    <input type="number" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Price...' 
                      onChange={(e)=>setprice(e.target.value)}
                      value={price}         
                    />
                </div>
            </div>

            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Product Category</label>
                <div className='w-[70%]'>
                    <select  className=' w-full bg-primary border border-[#808191] py-3 px-5 rounded-lg ' name="cars" id="cars"     
                    onChange={(e)=>setcategory(e.target.value)}
                    value={category} 
                    >
                        <option className='' value="">Select Category</option>
                        {
                            categorys.data?.map((item,i)=>{
                                return(
                                    <option key={i} className='' value={item._id}>{item.title}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>

            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Product Brand</label>
                <div className='w-[70%]'>
                    <select  className=' w-full bg-primary border border-[#808191] py-3 px-5 rounded-lg ' name="cars" id="cars"     
                    onChange={(e)=>setbrand(e.target.value)}
                    value={brand} 
                    >
                        <option className='' value="">Select Brand</option>
                        {
                            brands.data?.map((item,i)=>{
                                return(
                                    <option key={i} className='' value={item._id}>{item.title}</option>
                                )
                            })
                        }
                    </select>
                </div>
            </div>


            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Quantity</label>
                <div className='w-[70%]'>
                    <input type="number" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Buy Price...' 
                      onChange={(e)=>setquantity(e.target.value)}
                      value={quantity}  
                    
                    />
                </div>
            </div>


            <div className=' flex items-start justify-between mt-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Image</label>
                {/* <label htmlFor="id" className=' flex flex-col items-center gap-2 justify-center py-5 w-[70%] cursor-pointer border border-dashed rounded-lg border-gray-400'>
                    <FiUploadCloud className=' text-[45px] text-green-600' />
                    <h2 className='text-[20px] font-medium'>Drag your images here</h2>
                    <p>(Only *.jpeg, *.webp and *.png images will be accepted)</p>
                    <input id='id' type="file" multiple onChange={handleFileChange} className=' hidden' />
                </label> */}
            <div className='w-[70%] flex items-center gap-3'>
                    {
                      data ? <>
                        {
                            data.images.map((item,i)=>{
                                return(
                                    <img key={i} src={`http://localhost:5000/uploads/${item}`} alt="" className='w-[80px] h-[50px]' />
                                )
                            })
                            
                        }
                      
                      </> : null
                    }
                </div>
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
                        /> ) : "Update Product"}</button>
            </div>

        </form>
    </div>
  )
}

export default UpdateProduct
