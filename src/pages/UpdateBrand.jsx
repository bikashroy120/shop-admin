import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {FiUploadCloud} from "react-icons/fi"
import * as yup from "yup";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ColorRing } from 'react-loader-spinner';
import { singalBrand, updateBrand } from '../services/barndServices';


let schema = yup.object().shape({
  title: yup.string().required("title is Required"),
  description:yup.string().required("description is Required"),
});

const UpdateBrand = () => {
   const parems = useParams()
   const itemID = parems.id
   const queryClient = useQueryClient()
  const navgate =  useNavigate()
  const [title,setTitle] = useState("")
  const [description,setdescription] = useState("")
  const { data, error } = useQuery(["brand1",itemID],()=>singalBrand(itemID));
  const {mutate, isLoading} = useMutation((data)=>updateBrand(data,itemID), {
    onSuccess: (data) => {
      // Invalidate and refetch
      toast.success("Update Category success")
      queryClient.invalidateQueries(['brand1'])
      navgate("/brand")
    },
    onError:()=>{
      toast.error("error ")
    }
  })

  const handleSubmit = (e)=>{
    e.preventDefault()
    const data= {
        title,
        description
    }
    mutate(data)
  }

  useEffect(()=>{
    setTitle(data?.title)
    setdescription(data?.description)
  },[data])

  return (
    <div className='dasbord_laout text-white' >
        <div className='pb-5'>
        <h2 className=' font-semibold text-[23px]'>Update Brand</h2>
          <p>Update your Product category and necessary information from here</p>
        </div>

        <form onSubmit={(e)=>handleSubmit(e)} className=" bg-primary py-8 rounded-lg px-5">
            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Name</label>
                <div className='w-[70%]'>
                    <input type="text" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Category Title' 
                      onChange={(e)=>setTitle(e.target.value)}
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
                        /> ) : "Update"}</button>
            </div>

        </form>
    </div>
  )
}

export default UpdateBrand
