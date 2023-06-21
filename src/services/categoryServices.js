import { AxiosM } from "../utils/Axios"





export const addCategory  = async(data)=>{
    const res = await AxiosM.post("/product-category",data)
    return res
}