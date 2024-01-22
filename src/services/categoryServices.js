import { Axios } from "../utils/Axios"


export const addCategory  = async(data)=>{
    const res = await Axios.post("/product-category",data)
    return res
}

export const updateCategory  = async(data,itemID)=>{
    const res = await Axios.put(`/product-category/${itemID}`,data)
    return res
}

export const getCategory  = async(searchQuery)=>{
    const res = await Axios.get(`/product-category?${searchQuery}`)
    return res.data
}

export const singalCategory  = async(id)=>{
    const res = await Axios.get(`/product-category/${id}`)
    return res.data
}

export const deleteCategory  = async(data)=>{
    const res = await Axios.delete(`/product-category/delete/${data}`)
    return res
}