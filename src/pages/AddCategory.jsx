import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {BsArrowLeft} from "react-icons/bs"



const AddCategory = () => {

  


  return (
    <div className='dasbord_laout text-white' >
        <div className=''>
            <Link className='py-3 px-5 text-[20px] font-medium rounded-lg bg-yellow-600 text-white flex items-center gap-2 w-40 justify-center' to={"/category"}> <BsArrowLeft/> <span>Back</span></Link>
        </div>

        <div className='py-5'>
        <h2 className=' font-semibold text-[23px]'>Add Category</h2>
          <p>Add your Product category and necessary information from here</p>
        </div>

        <div className=" bg-primary py-8 rounded-lg px-5">
            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Name</label>
                <input type="text" className=' w-[70%] bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Category Title' />
            </div>
            <div className=' flex items-start justify-between my-10'>
                <label className=' text-[18px] font-medium' htmlFor="">Description</label>
                <textarea name="" id="" cols="10" rows="10" className=' w-[70%] h-[200px] bg-transparent border border-[#808191] py-3 px-5 rounded-lg ' placeholder='Category Description'></textarea>
            </div>
        </div>
    </div>
  )
}

export default AddCategory