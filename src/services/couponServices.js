import { Axios } from "../utils/Axios"


export const addCoupon  = async(data)=>{
    const res = await Axios.post("/coupon",data)
    return res
}

export const updateCoupon   = async(data,itemID)=>{
    const res = await Axios.put(`/coupon/${itemID}`,data)
    return res
}

export const getCoupon  = async(searchQuery)=>{
    const res = await Axios.get(`/coupon?${searchQuery}`)
    return res.data
}

export const singalCoupon   = async(id)=>{
    const res = await Axios.get(`/coupon/${id}`)
    return res.data
}

export const deleteCoupon  = async(data)=>{
    const res = await Axios.delete(`/coupon/${data}`)
    return res
}