import { AxiosM,Axios } from "../utils/Axios"


export const addCategory  = async(data)=>{
    const res = await AxiosM.post("/product-category",data)
    return res
}

export const updateCategory  = async(data,itemID)=>{
    const res = await AxiosM.put(`/product-category/${itemID}`,data)
    return res
}

export const getCategory  = async()=>{
    const res = await Axios.get("/product-category")
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