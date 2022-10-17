import React from 'react';
import {useNavigate} from "react-router";
import { useEffect, useState } from 'react';
import { db } from "../firebase";

import { doc, setDoc,addDoc,collection } from "firebase/firestore"; 

const PaymentModal = ({cost,email,orderId,name,contact,city,address,proceed}) => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsArray, setCartItemsArray] = useState([])
  useEffect(() => {
   // proceed();
    
}, payment)

  // Put the payment variables here
  var payment = {
    sandbox: true, // if the account is sandbox or real
    merchant_id: '1219914', // Replace your Merchant ID
    return_url: '/profile',
    cancel_url: 'https://projectmiura-ff9d2.web.app/cancel',
    notify_url: 'https://projectmiura-ff9d2.web.app/notify',
    order_id: orderId,
    items: "",
    amount: cost, 
    currency: 'LKR',
    first_name: name,
    last_name: 'lastname',
    email: email,
    phone: contact,
    address: address,
    city: city,
    country: 'Sri Lanka',
    delivery_address: 'No. 46, Galle road, Kalutara South', // optional field
    delivery_city: 'Kalutara', // optional field
    delivery_country: 'Sri Lanka', // optional field
    custom_1: '', // optional field
    custom_2: '', // optional field
   
    
  };

  
  
 
    
  // Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = (orderId)=> {
    console.log("Payment completed. OrderID:" + orderId);
    console.log(payment.first_name)
    

    const docRef =  addDoc(collection(db, "payments"), {
      email: payment.email,
      orderId:payment.order_id,
      amount:payment.amount
    });

    const docReff =  addDoc(collection(db, "shipping"), {
      email: payment.email,
      orderId:payment.order_id,
      name:payment.first_name,
      address:payment.address,
      contactNo:payment.phone,
      amount:payment.amount
    });

    let cartString = localStorage.getItem("miuracart");
    
    localStorage.removeItem("miuracart");
    navigate('/cart')

    
    //Note: validate the payment and show success or failure page to the customer
  };

  

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    //Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: show an error page
    console.log("Error:"  + error);
  };

  function pay(){
    window.payhere.startPayment(payment);
  }

  return <button className='btn btn-success float-end' onClick={pay}>Proceed Checkout</button>;
 
};

export default PaymentModal;