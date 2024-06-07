import { useFormik } from 'formik';
import React from 'react'
import { useMutation } from 'react-query';
import * as yup from "yup";
import { adminLogin } from '../services/authServices';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth/authSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

let schema = yup.object().shape({
    email: yup.string().required("Email is Required"),
    password:yup.string().required("Password is Required"),
  });

const Login = () => {
    const dispacth = useDispatch()
    const naviget = useNavigate()

    const {mutate, isLoading} = useMutation(adminLogin, {
        onSuccess: (data) => {
          // Invalidate and refetch
          dispacth(authActions.addUser(data.data))
          localStorage.setItem("Admin", JSON.stringify(data.data))
          localStorage.setItem("jwtToken", JSON.stringify(data.data.token))
          toast.success("Login success")
        },
        onError:()=>{
          toast.error("You are Not Admin")
        }
      })

    

    const formik = useFormik({
        initialValues: {
          email: "admin@gmail.com",
          password:"123456",
        },
        validationSchema: schema,
        onSubmit: (values) => {
          mutate(values)
        },
      });

      console.log("hello")

  return (
    <div className='w-full h-screen flex items-center justify-center'>
 

        <div className='w-[500px] h-auto bg-white shadow-md p-10 rounded-xl'>
            <h2 className=' font-bold text-[25px] mb-5'>Admin Login</h2>
            <div>
                <form action=""  onSubmit={formik.handleSubmit}>
                    <div className=''>
                        <label className='text-[18px] text-gray-700' htmlFor="">Email</label>
                        <input type="email" className='w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg ' placeholder='enter your email'
                        onChange={formik.handleChange("email")}
                        onBlur={formik.handleBlur("email")}
                        value={formik.values.email}                       
                        />
                        <div className="error  text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.email && formik.errors.email}
                      </div>
                    </div>
                    <div className='py-6'>
                        <label className='text-[18px] text-gray-700' htmlFor="">Password</label>
                        <input type="password" className='w-full bg-inputBg border border-gray-200 py-4 text-[18px] outline-none focus:bg-white px-5 rounded-lg '
                        onChange={formik.handleChange("password")}
                        onBlur={formik.handleBlur("password")}
                        value={formik.values.password}  
                        />
                        <div className="error text-red-500" style={{height:"5px",marginLeft:"5px"}}>
                        {formik.touched.password && formik.errors.password}
                      </div>
                    </div>
                    <button type='submit' className=' py-3 mt-4 rounded-lg text-white text-[18px] font-semibold hover:bg-green-600 duration-300 transition-all px-10 bg-green-500'>{isLoading ? "loading..." : "Login"}</button>
                </form>
            </div>
        </div>

    </div>
  )
}

export default Login