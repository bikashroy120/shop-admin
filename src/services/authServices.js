import { Axios } from "../utils/Axios"



export const adminLogin  = async(data)=>{
    const res = await Axios.post("/user/login/admin",data)
    return res
}

export const getUser  = async()=>{
    const res = await Axios.get("/user/")
    return res.data
}

export const getOrder  = async()=>{
    const res = await Axios.get("/user/all-order")
    return res.data
}