import { Axios } from "../utils/Axios"



export const adminLogin  = async(data)=>{
    const res = await Axios.post("/user/login/admin",data)
    return res
}