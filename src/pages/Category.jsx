import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {HiOutlineUpload,HiOutlineDownload} from "react-icons/hi";
import {FaRegEdit} from "react-icons/fa"
import Table from '../components/table/Table';


const Category = () => {

    const navigate =  useNavigate()

    const [category,setCategory] = useState([])



 
    
    const columns = [
        {
            name: 'Img',
            selector: row => <img src={row.imgUrl} className={"w-[45px] h-[45px] rounded-full "}/>,
        
        },
        {
            name:"Id",
            selector: row => row.id,
        },
        {
            name: 'Title',
            selector: row => row.title,
        },


        {
            name:"Action",
            cell:(row)=><button className='bg-red-400 text-white py-1 px-2'>Delete</button>, 
        }
    ];



    // add-category
  return (
    <div className='dasbord_laout text-white bgpr'>
        <div>
            <div className='flex items-center justify-between mb-5'>
                <h2 className='text-[23px] font-semibold'>Product Category</h2>
            </div>
            <div className=' bg-primary text-white py-6 px-5 rounded-xl flex items-center justify-between '>
                <div className='flex items-center gap-3'>
                    <button className=' flex items-center gap-3 text-[18px] border hover:border-green-500 border-white py-2 rounded-md px-3'>
                        <HiOutlineUpload style={{fontSize:"20px"}}/>
                        Export
                    </button>
                    <button className=' flex items-center gap-3 text-[18px] border border-white hover:border-yellow-400 py-2 rounded-md px-3'>
                        <HiOutlineDownload style={{fontSize:"20px"}}/>
                        Import
                    </button>
                </div>
                <div className=' flex items-center gap-3'>
                    <button className=' flex items-center gap-2 py-3 px-10 rounded-lg bg-gray-300 hover:cursor-not-allowed text-gray-800'>
                        <FaRegEdit style={{fontSize:"20px"}}/>
                        Bulk Action
                    </button>
                    <button className=' flex items-center gap-2 py-3 px-10 rounded-lg bg-red-500 hover:cursor-not-allowed'>
                    <   FaRegEdit style={{fontSize:"20px"}}/>
                        Delete
                    </button>
                    <button onClick={()=>navigate("/add-category")} className=' flex items-center gap-2 py-3 px-10 rounded-lg bg-green-500 hover:bg-green-700 duration-300 transition-all'>
                        <FaRegEdit style={{fontSize:"20px"}}/>
                        Add Category
                    </button>
                </div>
            </div>

            <div className=' bg-primary text-white py-3 px-5 mt-8 rounded-lg'>
                <input type="text" className=' py-3 px-5 bg-gray-700 outline-none w-full rounded-md' placeholder='Search By Category Name' />
            </div>

            <div className=' mt-7'>
                <Table columns={columns} data={category && category}/>
            </div>
        </div>
    </div>
  )
}

export default Category