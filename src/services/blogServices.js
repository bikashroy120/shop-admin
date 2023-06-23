import { AxiosM,Axios } from "../utils/Axios"


export const addBlog  = async(data)=>{
    const res = await AxiosM.post("/blog",data)
    return res
}

export const updateBlog  = async(data,itemID)=>{
    const res = await AxiosM.put(`/blog/${itemID}`,data)
    return res
}

export const getBlog  = async()=>{
    const res = await Axios.get("/blog")
    return res.data
}

export const singalBlog  = async(id)=>{
    const res = await Axios.get(`/blog/${id}`)
    return res.data
}

export const deleteBlog  = async(data)=>{
    const res = await Axios.delete(`/blog/${data}`)
    return res
}