import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext);
  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })
  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}));
  }
  const placeOrder = async(event) =>{
    //preventing relaod
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) =>{
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
      
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2
    }
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}});
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }else{
      alert("Error");
    }
    

  }
  //if user is not logged in or doesnt have any item in cart he cant proceed to checkout
  const navigate = useNavigate()
  useEffect(()=>{
    if(!token){
      navigate("/cart")
    }
    else if(getTotalCartAmount() === 0){
      navigate("/cart")
    }
  },[token])


  return (
    <form action="" className="place-order" onSubmit={placeOrder}>
        <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-feilds">
                <input required type="text" placeholder='First Name' name='firstName' onChange={onChangeHandler} value={data.firstName}/>
                <input required type="text" placeholder='Last Name' name='lastName' onChange={onChangeHandler} value={data.lastName}/>
            </div>
            <input required type="email" placeholder='Email' name='email' onChange={onChangeHandler} value={data.email}/>
            <input required type="text" placeholder='Street' name='street' onChange={onChangeHandler} value={data.street}/>
            <div className="multi-feilds">
                <input required type="text" placeholder='City' name='city' onChange={onChangeHandler} value={data.city}/>
                <input required type="text" placeholder='State' name='state' onChange={onChangeHandler} value={data.state}/>
            </div>
            <div className="multi-feilds">
                <input required type="text" placeholder='Zip Code' name='zipcode' onChange={onChangeHandler} value={data.zipcode}/>
                <input required type="text" placeholder='Country' name='country' onChange={onChangeHandler} value={data.country}/>
            </div>
            <input required type="text" placeholder='Phone Number' name='phone' onChange={onChangeHandler} value={data.phone} />
            
        </div>
        <div className="place-order-right">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                  <p>Subtotal</p>
                  <p>₹{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                  <p>Delivery fee</p>
                  <p>₹{getTotalCartAmount()===0?0:2}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                  <p>Total</p>
                  <p>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</p>
              </div>
            </div>
            <button type='submit'>Proceed to payment</button>
          </div>

        </div>
    </form>
  )
}

export default PlaceOrder
