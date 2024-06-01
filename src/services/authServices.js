import { Axios } from "../utils/Axios"



export const adminLogin  = async(data)=>{
    const res = await Axios.post("/user/login/admin",data)
    return res
}

export const getUser  = async(searchQuery)=>{
    const res = await Axios.get(`/user?${searchQuery}`)
    return res.data
}

export const getMe  = async()=>{
    const res = await Axios.get(`/user/one`)
    return res.data
}

export const getById  = async(id)=>{
    const res = await Axios.get(`/user/${id}`)
    return res.data
}

export const getByIdAdmin  = async(id,searchQuery)=>{
    const res = await Axios.get(`/user/user-order/admin/${id}?${searchQuery}`)
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

export const updateUserAdmin  = async(data,id)=>{
    const res = await Axios.put(`/user/update/${id}`,data)
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

export const getSingleOrder= async(id)=>{
    const res = await Axios.get(`/user/order/${id}`)
    return res.data
}