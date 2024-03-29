import { Axios } from "../utils/Axios"


export const addBlog  = async(data)=>{
    const res = await Axios.post("/blog",data)
    return res
}

export const updateBlog  = async(data,itemID)=>{
    const res = await Axios.put(`/blog/${itemID}`,data)
    return res
}

export const getBlog  = async(searchQuery)=>{
    const res = await Axios.get(`/blog?${searchQuery}`)
    return res.data
}

export const singalBlog  = async(id)=>{
    const res = await Axios.get(`/blog/admin/${id}`)
    return res.data
}

export const deleteBlog  = async(data)=>{
    const res = await Axios.delete(`/blog/${data}`)
    return res
}


export const addBanner  = async(data)=>{
    const res = await Axios.post(`/banner`,data)
    return res.data
}

export const getBanner  = async()=>{
    const res = await Axios.get(`/banner/all-banner`)
    return res.data
}

export const deleteBanner  = async(id)=>{
    console.log(id)
    const res = await Axios.delete(`/banner/delete-banner/${id}`)
    return res
}