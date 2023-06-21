import { collection, doc, getDocs, orderBy, query, setDoc,where } from "firebase/firestore";
import {db} from "../../firebase-config"
import {productActions} from "./product-slice"



export const addCategory = (data)=>{
    // console.log(data)
    const dataRef = doc(db,"category",`${Date.now()}`)
    return async(dispatch)=>{
      const data =  await setDoc(data)
    }
}

export const getCategory = ()=>{
    return async(dispatch)=>{
        const items = await getDocs(
            query(collection(db,"category",))
        );
        dispatch(productActions.setProductCategory(items.docs.map((doc)=> doc.data())))
        // return items.docs.map((doc)=> doc.data())
    }
}