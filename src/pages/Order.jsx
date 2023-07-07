import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {HiOutlineUpload,HiOutlineDownload} from "react-icons/hi";
import {FaRegEdit} from "react-icons/fa"
import Table from '../components/table/Table';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {FiEdit} from "react-icons/fi"
import {AiTwotoneDelete} from "react-icons/ai"
import { toast } from 'react-toastify';
import { base_url } from '../utils/base_url';
import { getOrder, updateOrder } from '../services/authServices';


const Order = () => {

    const navigate =  useNavigate()
    const { data, isLoading, error } = useQuery('order', getOrder);
    const [show,setShow] = useState(false)
    const queryClient = useQueryClient()
    const [search,setSearch] = useState("")
    const [filter,setFilter] = useState("All")
    const [dataCa,setDataCA] = useState([])

    const update = useMutation(updateOrder, {
        onSuccess: (data) => {
          // Invalidate and refetch
          toast.success("Order update success")
          queryClient.invalidateQueries(['order'])
        },
        onError:()=>{
          toast.error("error ")
        }
      })


      useEffect(()=>{
        const updat = data?.filter((item)=>item?.email.toLowerCase().trim().includes(search.toLowerCase()))
        setDataCA(updat)
      },[search,data])

      useEffect(()=>{
            if(filter==="All"){
                setDataCA(data)
            }else{
                const updat = data?.filter((item)=>item.orderStatus===filter)
                setDataCA(updat)
            }
      },[filter,data])

      const handelChance = (e,id)=>{
        const data = {
            value:e.target.value,
            id:id
        }

        update.mutate(data)
      }

    const columns = [
        {
            name: 'Img',
            selector: row => <img src={`${base_url}uploads/${row?.orderby.image}`} className={"w-[45px] h-[45px] rounded-full "}/>,
            width:"100px"
        },
        {
            name: 'Name',
            selector: row => row?.FirstName + " "+ row?.LastName,
        },

        {
            name: 'Email',
            selector: row => row?.email,
        },
        {
            name: 'Phone',
            selector: row => row?.phone,
        },
        {
            name: 'Shipping',
            selector: row => row?.shipping,
            width:"100px"
        },

        {
            name: 'Order Status',
            selector: row => <span className={`p-1 rounded-2xl ${row?.orderStatus ==="Pending" && "bg-red-500"} ${row?.orderStatus ==="Processing" && "bg-yellow-500"} ${row?.orderStatus ==="Complete" && "bg-green-500"}`}>{row?.orderStatus}</span>,
        },

        {
            name: 'Totle',
            selector: row => row?.totle,
            width:"100px"
        },

        {
            name:"Action",
            cell:(row)=> <>
                <div className=' flex flex-row items-center gap-2'>
                    {
                        update.isLoading ? <span>Loading...</span> :
                        <select onChange={(e)=>handelChance(e,row?._id)} value={row.orderStatus} className=' bg-primary border border-white py-1 rounded-md px-1'>
                        <option className='' value="Pending">Pending</option>
                        <option className='' value="Processing">Processing</option>
                        <option className='' value="Complete">Complete</option>
                        </select>
                    }

                 
                </div>
            </>, 
            // width:"130px"
        }
    ];


    // add-category
  return (
    <div className='dasbord_laout text-white bgpr'>
        <div>
            <div className='flex items-center justify-between'>
                <h2 className='text-[23px] font-semibold'>All Order</h2>
            </div>


            <div className='flex items-center gap-3 w-full'>
            <div className=' bg-primary text-white w-full py-3 px-5 mt-8 rounded-lg'>
                <input type="text" onChange={(e)=>setSearch(e.target.value)} className=' py-3 px-5 bg-gray-700 outline-none w-full rounded-md' placeholder='Search By Name' />
            </div>


            <div className=' bg-primary w-full text-white py-3 px-5 mt-8 rounded-lg'>
                    <select onChange={(e)=>setFilter(e.target.value)} value={filter} className=' bg-primary border border-white w-full py-3  rounded-md px-5'>
                        <option className='' value="All">All </option>
                        <option className='' value="Pending">Pending</option>
                        <option className='' value="Processing">Processing</option>
                        <option className='' value="Complete">Complete</option>
                        </select>
            </div>
            </div>

            {
                isLoading ? (<h2 className='mt-4'>Lodding...</h2>) :(
                    <div className=' mt-7'>
                        <Table columns={columns} data={dataCa}/>
                     </div>
                )
            }
        </div>

        {
            show ? (
                <div className=' fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500/75 z-[99999999]'>
                <div className=' bg-white w-[400px] text-primary h-[200px] flex flex-col justify-center items-center rounded-lg'>
                        <h2 className=' text-[20px] mb-3'>Are you Delete the item</h2>
                        <div className='flex items-center gap-3'>
                        <button onClick={()=>setShow(false)} className=' flex items-center gap-2 py-3 px-10 rounded-lg bg-green-500 hover:bg-green-700 duration-300 transition-all'>
                            Cancel
                        </button>
                        <button onClick={()=>toast.error("দুঃখিত অর্ডার পেইজের কাজ এখনো শেষ হয়নি")} className=' flex items-center gap-2 py-3 px-10 rounded-lg bg-red-500 hover:bg-red-800'>
                            Delete
                        </button>
                        </div>
                </div>
            </div>
            ):(
                <></>
            )
        }


    </div>
  )
}

export default Order