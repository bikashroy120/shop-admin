import { AxiosM,Axios } from "../utils/Axios"


export const addBrand  = async(data)=>{
    const res = await Axios.post("/brand",data)
    return res
}

export const updateBrand  = async(data,itemID)=>{
    const res = await Axios.put(`/brand/${itemID}`,data)
    return res
}

export const getBrand  = async()=>{
    const res = await Axios.get("/brand")
    return res.data
}

export const singalBrand  = async(id)=>{
    const res = await Axios.get(`/brand/${id}`)
    return res.data
}

export const deleteBrand  = async(data)=>{
    const res = await Axios.delete(`/brand/delete/${data}`)
    return res
}