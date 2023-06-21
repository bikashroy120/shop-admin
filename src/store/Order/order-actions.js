import { async } from "@firebase/util";
import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { getOrder,getQuery } from "../../componets/FirebaseFuncation";
import { firestore } from "../../firebaseConfig";
import { orderActions } from "./order-slice";



// check coupon 

 

// export const factOrder = ()=>{
//     return async (dispatch) => {
//     await getOrder().then((data)=>{
//         dispatch(orderActions.orderItems(data))
//     })
//     }
//   }


  export const factOrder = ()=>{
   const collectionref = collection(firestore, "orderItem");
    return async (dispatch)=>{
       onSnapshot(collectionref, (data) => {
          dispatch(orderActions.orderItems(data.docs.map((item) => {
            return { ...item.data(), id: item.id };
          })))
      });
    }
  }


  export const getQuer = ()=>{
  
    return async (dispatch) => {
    await getQuery().then((data)=>{
        dispatch(orderActions.queryItems(data))
    })
    }
  }


  export const getUserData= (id)=>{

    return async (dispatch)=>{
      const items = await getDocs(
        query(
          collection(firestore, "user"),
          where("uid", "==", id),
        )
      );
      dispatch(orderActions.usersItems(items.docs.map((doc) => doc.data())));
    }
    
   }

// user order list
// export const orderlist = (address) => {
//   return async (dispatch) => {
//     async function getuserorderlist(e) {
//       dispatch(authActions.Loading("loading"));

//       axios
//         .get("/order/customer/view/")
//         .then((response) => {
//             dispatch(orderActions.adduserorderdata(response.data));
//             dispatch(authActions.Loading("idle"));
//         })
//         .catch((err) => {
//           console.log(err);
//           dispatch(authActions.Loading("error"));
//         });
//     }
//     getuserorderlist();
//   };
// };