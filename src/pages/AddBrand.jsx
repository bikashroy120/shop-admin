import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {BsArrowLeft} from "react-icons/bs"
import {BiCloudUpload} from "react-icons/bi"

const AddBrand = () => {

    const [file, setFile] = useState("");

  return (
    <div className='dasbord_laout' >
        <div className=''>
            <Link className='py-3 px-5 text-[20px] font-medium rounded-lg bg-yellow-600 text-white flex items-center gap-2 w-40 justify-center' to={"/brand"}> <BsArrowLeft/> <span>Back</span></Link>
        </div>

        <div className=' max-w-[500px] m-auto flex items-center gap-5 justify-center flex-col'>
            <div className='w-full'>
              <input placeholder='Enter Title' type="text" className='w-full py-3 text-white text-[20px] font-medium px-3 border border-gray-500 rounded-xl bg-transparent' />
              <div className='flex items-center justify-center'>
              <button className='mt-5 p-3 px-8 rounded-xl text-[20px] text-center bg-green-600 text-white'>Save</button>
              </div>
            </div>
        </div>
    </div>
  )
}

export default AddBrand