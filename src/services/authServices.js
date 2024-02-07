import { Axios } from "../utils/Axios"



export const adminLogin  = async(data)=>{
    const res = await Axios.post("/user/login/admin",data)
    return res
}

export const getUser  = async(searchQuery)=>{
    const res = await Axios.get(`/user?${searchQuery}`)
    return res.data
}

export const getOrder  = async(searchQuery)=>{
    const res = await Axios.get(`/user/all-order?${searchQuery}`)
    return res.data
}

export const updateUser  = async(data)=>{
    const res = await Axios.put(`/user/update/`,data)
    return res.data
}

export const updateOrder  = async(data)=>{
    const res = await Axios.put(`/user/order-update/${data.id}`,{status:data.value})
    return res.data
}

export const getDashbordData  = async()=>{
    const res = await Axios.get("/user/dashborddata")
    return res.data
}