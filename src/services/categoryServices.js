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
    const res = await Axios.get(`/product-category/admin`)
    return res.data
}

export const getCategory2  = async(searchQuery)=>{
    const res = await Axios.get(`/product-category`)
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


export const addShippingCost  = async(data)=>{
    const res = await Axios.post("/shipping-cost",data)
    return res
}

export const getShippingCost  = async()=>{
    const res = await Axios.get(`/shipping-cost`)
    return res.data
}

export const updateShippingCost  = async(itemID,data)=>{
    const res = await Axios.put(`/shipping-cost/${itemID}`,data)
    return res
}