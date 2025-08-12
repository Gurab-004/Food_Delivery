import React, { useContext, useEffect } from 'react'
import "./Verify.css"
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { StoreContext } from '../../context/StoreContext'
const Verify = () => {
    //for geting the value of parameter in a url just like api we use searchParamas
    const [searchParamas,setSearchParams] = useSearchParams();
    const success = searchParamas.get("success");
    const orderId = searchParamas.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async() =>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success){
            navigate("/myorders")
        }else{
            navigate("/")
        }
    }
    useEffect(() =>{
        verifyPayment();
    },[])
    
  return (
    <div className='verify'>
        <div className="spinner">

        </div>
      
    </div>
  )
}

export default Verify
