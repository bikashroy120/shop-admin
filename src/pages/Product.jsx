import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import {HiOutlineUpload,HiOutlineDownload} from "react-icons/hi";
import {FaRegEdit} from "react-icons/fa"
import Table from '../components/table/Table';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {FiEdit} from "react-icons/fi"
import {AiTwotoneDelete} from "react-icons/ai"
import { toast } from 'react-toastify';
import { deleteProduct, getProduct } from '../services/productServices';

const Product = () => {

    const navigate =  useNavigate()
    const { data, isLoading, error } = useQuery('product', getProduct);
    const [show,setShow] = useState(false)
    const [deleteId,setDeleteId] = useState()
    const queryClient = useQueryClient()
    const [search,setSearch] = useState("")
    const [dataCa,setDataCA] = useState([])

    const {mutate} = useMutation(deleteProduct, {
        onSuccess: (data) => {
          // Invalidate and refetch
          toast.success("Delete success")
          queryClient.invalidateQueries(['product'])
          setShow(false)
        },
        onError:()=>{
          toast.error("error ")
        }
      })


      useEffect(()=>{
        const updat = data?.filter((item)=>item.title.toLowerCase().trim().includes(search.toLowerCase()))
        setDataCA(updat)
      },[search,data])

    const columns = [
        {
            name: 'Img',
            selector: row => <img src={`http://localhost:5000/uploads/${row.images[0]}`} className={"w-[45px] h-[45px] rounded-full "}/>,
            width:"100px"
        },
        {
            name: 'Title',
            selector: row => row.title,
            width:"250px"
        },

        {
            name: 'Category',
            selector: row => row.category?.title,
        },
        {
            name: 'Brand',
            selector: row => row.brand?.title,
        },
        {
            name: 'Price',
            selector: row => row.bprice,
        },
        {
            name: 'Sale Price',
            selector: row => row.price,
        },
        {
            name: 'Stock',
            selector: row => row.quantity,
        },

        {
            name:"Action",
            cell:(row)=> <>
                <div className=' flex flex-row items-center gap-2'>
                    {/* <button><HiOutlineViewfinderCircle /></button> */}
                    <button onClick={()=>navigate(`/update-product/${row._id}`)} className=' text-[20px] hover:text-green-500' ><FiEdit /></button>
                    <button onClick={()=>getId(row._id)} className=' text-[20px] hover:text-red-500' ><AiTwotoneDelete /></button>
                </div>
            </>, 
            width:"130px"
        }
    ];

    const getId= (id)=>{
        setShow(true)
        setDeleteId(id)
    }

    


    // add-category
  return (
    <div className='dasbord_laout text-white bgpr'>
        <div>
            <div className='flex items-center justify-between mb-5'>
                <h2 className='text-[23px] font-semibold'>Product</h2>
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
                    <button onClick={()=>navigate("/add-product")} className=' flex items-center gap-2 py-3 px-10 rounded-lg bg-green-500 hover:bg-green-700 duration-300 transition-all'>
                        <FaRegEdit style={{fontSize:"20px"}}/>
                        Add Product
                    </button>
                </div>
            </div>

            <div className=' bg-primary text-white py-3 px-5 mt-8 rounded-lg'>
                <input type="text" onChange={(e)=>setSearch(e.target.value)} className=' py-3 px-5 bg-gray-700 outline-none w-full rounded-md' placeholder='Search By product Name Category Name Brand Name' />
            </div>

            {
                isLoading ? (<h2>Lodding...</h2>) :(
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
                        <button onClick={()=>mutate(deleteId)} className=' flex items-center gap-2 py-3 px-10 rounded-lg bg-red-500 hover:bg-red-800'>
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

export default Product