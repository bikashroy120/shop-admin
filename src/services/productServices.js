import { AxiosM,Axios } from "../utils/Axios"


export const addProduct  = async(data)=>{
    const res = await AxiosM.post("/product",data)
    return res
}

export const updateProduct  = async(data,itemID)=>{
    console.log(data)
    const res = await Axios.put(`/product/update/${itemID}`,data)
    return res
}

export const getProduct = async(searchQuery)=>{
    const res = await Axios.get(`/product?${searchQuery}`)
    return res.data
}

export const singalProduct  = async(id)=>{
    const res = await Axios.get(`/product/${id}`)
    return res.data
}

export const deleteProduct  = async(data)=>{
    const res = await Axios.delete(`/product/${data}`)
    return res
}