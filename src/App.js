import "./App.css";
import Layout from "./components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { ToastContainer } from "react-toastify";

function App() {

  const {user} = useSelector((state)=>state.auth)
  const queryClient = new QueryClient()

  
  return (
    <>
    <QueryClientProvider client={queryClient}>
        {
          user ? (<Layout/>) : (<Login />)
         }

    </QueryClientProvider>
    <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
    </>
  );
}

export default App;
