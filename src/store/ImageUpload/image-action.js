import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {storage} from "../../firebase-config";
import {imageActions} from "./image-slice"



export const uploadImage = (upImg)=>{
  console.log(upImg)
    const storageRef = ref(storage, `image/${Date.now()}-${upImg?.name}`);
    const uploadTask = uploadBytesResumable(storageRef, upImg);
    return (dispatch)=>{
        dispatch(imageActions.setLoadding(true))
        uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.log(error);
              dispatch(imageActions.setLoadding(false))
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                dispatch(imageActions.setImageUrl(downloadURL))
                dispatch(imageActions.setLoadding(false))
              });
            }
          );
    }
}


export const deleteImage = (deleteUrl)=>{
  const desertRef = ref(storage, deleteUrl);
    return(dispatch)=>{
      dispatch(imageActions.setLoadding(true))
      deleteObject(desertRef)
      .then(() => {
        dispatch(imageActions.setLoadding(false))
        dispatch(imageActions.setImageUrl(""))
      })
      .catch((error) => {
        console.log(error);
        dispatch(imageActions.setLoadding(false))
      });
    }
}