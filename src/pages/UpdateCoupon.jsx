import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {FiUploadCloud} from "react-icons/fi"
import * as yup from "yup";
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { ColorRing } from 'react-loader-spinner';
import { singalBrand, updateBrand } from '../services/barndServices';
import { singalCoupon, updateCoupon } from '../services/couponServices';


let schema = yup.object().shape({
  title: yup.string().required("title is Required"),
  description:yup.string().required("description is Required"),
});

const UpdateCoupon = () => {
   const parems = useParams()
   const itemID = parems.id
   const queryClient = useQueryClient()
  const navgate =  useNavigate()
  const [name,setName] = useState("")
  const [expiry,setexpiry] = useState("")
  const [discount,setdiscount] = useState("")
  const { data, error } = useQuery(["coupon1",itemID],()=>singalCoupon(itemID));
  const {mutate, isLoading} = useMutation((data)=>updateCoupon(data,itemID), {
    onSuccess: (data) => {
      // Invalidate and refetch
      toast.success("Update Coupon success")
      queryClient.invalidateQueries(['coupon1'])
      navgate("/coupon")
    },
    onError:()=>{
      toast.error("error ")
    }
  })

  console.log(expiry)

  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year,month, day].join("-");
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    const data= {
        name,
        expiry,
        discount
    }
    mutate(data)
  }

  useEffect(()=>{
    setName(data?.name)
    setexpiry(changeDateFormet(data?.expiry))
    setdiscount(data?.discount)
  },[data])

  console.log(data)

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
                      onChange={(e)=>setName(e.target.value)}
                      value={name}  
                    
                    />
                </div>
            </div>

            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Name</label>
                <div className='w-[70%]'>
                    <input type="Date" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Category Title' 
                      onChange={(e)=>setexpiry(e.target.value)}
                      value={expiry}
                    
                    />
                </div>
            </div>

            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Name</label>
                <div className='w-[70%]'>
                    <input type="number" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Category Title' 
                      onChange={(e)=>setdiscount(e.target.value)}
                      value={discount}  
                    
                    />
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
                        /> ) : "Update"}</button>
            </div>

        </form>
    </div>
  )
}

export default UpdateCoupon
