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




const Profile = () => {
   const parems = useParams()
   const itemID = parems.id
   const queryClient = useQueryClient()
  const navgate =  useNavigate()
  const [file,setfile] = useState()
  const [fastname,setfastname] = useState("")
  const [lastname,setlastname] = useState("")
  const [mobile,setmobilet] = useState("")
  const [city,setcityt] = useState("")
//   const { data, error } = useQuery(["coupon1",itemID],()=>singalCoupon(itemID));
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



  const changeDateFormet = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split("/");
    return [year,month, day].join("-");
  };

  const handleSubmit = (e)=>{
    e.preventDefault()
    const data= {
        fastname,
        lastname,
        mobile,
        city,
        image:file
    }
    mutate(data)
  }

//   useEffect(()=>{
//     setName(data?.name)
//     setexpiry(changeDateFormet(data?.expiry))
//     setdiscount(data?.discount)
//   },[data])

//   console.log(data)

  return (
    <div className='dasbord_laout text-white' >
        <div className='pb-5'>
        <h2 className=' font-semibold text-[23px]'>Update Profile</h2>
          <p>Update your Product category and necessary information from here</p>
        </div>

        <form onSubmit={(e)=>handleSubmit(e)} className=" bg-primary py-8 rounded-lg px-5">

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
                {/* <img src={`http://localhost:5000/uploads/${data?.image}`} alt="" className='w-[80px] h-[50px]' /> */}
                </div>
                <div className='w-[70%]'>
                    {
                      file ? <img src={URL.createObjectURL(file)} alt="" className='w-[80px] h-[50px]' /> : null
                    }
                </div>
            </div>



            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">First Name</label>
                <div className='w-[70%]'>
                    <input type="text" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='First Name' 
                      onChange={(e)=>setfastname(e.target.value)}
                      value={fastname}  
                    
                    />
                </div>
            </div>

            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Last Name</label>
                <div className='w-[70%]'>
                    <input type="text" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Last Name' 
                      onChange={(e)=>setlastname(e.target.value)}
                      value={lastname}  
                    
                    />
                </div>
            </div>

            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Phone</label>
                <div className='w-[70%]'>
                    <input type="text" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Phone' 
                      onChange={(e)=>setmobilet(e.target.value)}
                      value={mobile}  
                    
                    />
                </div>
            </div>

            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">City</label>
                <div className='w-[70%]'>
                    <input type="text" className=' w-full bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='City' 
                      onChange={(e)=>setcityt(e.target.value)}
                      value={city}  
                    
                    />
                </div>
            </div>
            
            <div className=' flex items-center justify-center gap-6 py-5 '>
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

export default Profile
