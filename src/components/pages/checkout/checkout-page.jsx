import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import {ref, getDownloadURL, getStorage } from "firebase/storage";
import { db } from '../../../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import LoginPage from "../login/login.page";
import PaymentModel from '../../../PaymentModel/PaymentModel'

const CheckoutPage = () => {
    const storage = getStorage();
    const auth = getAuth();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
	const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    let totall=0;
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email)
                console.log(user);
            } else {
                alert("You must sign in before checking out")
            }
        })
    }, [auth])

    const [input_name, setInput_name] = useState("");
    const [input_address, setInput_address] = useState("");
    const [input_contact, setInput_contact] = useState("");
    const [input_city, setInput_city] = useState("");
    const [input_lname, setInput_lname] = useState("");
    const [input_email, setInput_email] = useState("");
    const [orderId, setOrderId] = useState("");
    const [cost, setCost] = useState("");
    

    useEffect(() => {

        async function fetchImage(image) {
            let downloadURL = await getDownloadURL(ref(storage, "/images/"+image));
            return downloadURL;
        }

        //handleProceed();
        async function fetchData() {
            let cartString = localStorage.getItem("miuracart");
            let cartStringArray = [];
            if(cartString !== null && cartString.length > 0) {
                cartStringArray = cartString.split(",");
            }

            let cartArray = new Array();
            cartStringArray.forEach(async (item) => {

                let qtyArray = cartStringArray.filter((item2) => {
                    return item2 === item;
                })

                let currentCartItems = cartItems;
                if (!cartArray.includes(item)) {
                    cartArray.push(item);
                    const docSnap = await getDoc(doc(db, "products", item));
                    console.log(docSnap.data())
                    console.log("ooooooooooooooooo")
                    
               
                    let data = docSnap.data();
                    let image_url = await fetchImage(data.image);
                    let responseArray = {
                        id: item,
                        title: data.title,
                        price: data.price,
                       image:image_url,
                        p: data.p,
                        qty: qtyArray.length,
                        external: data?.externalSeller,
                        seller: data?.seller
                    }
                    currentCartItems.push(responseArray);
                    setCartItems([...currentCartItems]);
                }

            })

        }

        if (!loaded) {
            fetchData().then(() => {
                setLoaded(true);
            });
        }
      

    }, [])

    const handleProceed = async () => {
        // *TODO*: validate the inputs

        setLoading(true);
        console.log("-------")
        try {
           
            const id = new Date().getTime();
            
            setOrderId(id)
            var total = 0;
            cartItems.forEach(async (item) => {

                let sum = parseFloat(item.price).toFixed(2) * parseInt(item.qty);
                console.log("-------")
               
                total += sum;
                console.log(sum)
                setCost(sum)
                await addDoc(collection(db, "sales"), {
                    id:id,
                    timestamp: serverTimestamp(),
                    customer: auth.currentUser.email,
                    status: 'unpaid',
                    product: item.id,
                    quantity: item.qty,
                    price: parseFloat(item.price).toFixed(2),
                    external: item.external?item.external:false,
                    seller: item.seller?item.seller:""
                });

                console.log(item.external)
                if(item.external){
                    await addDoc(collection(db, "external_payments"), {
                        id:id,
                        status:"processing",
                        timestamp: serverTimestamp(),
                        seller: item.seller?item.seller:"",
                        quantity: item.qty,
                        price: parseFloat(item.price).toFixed(2),
                        total: sum
                    });
                }

                //change item quantity
                const docSnap = await getDoc(doc(db, "products", item.id));
                let product = docSnap.data();
                let newQuantity = parseInt(product.quantity) - parseInt(item.qty);

                await updateDoc(doc(db, "products", item.id), {
                    quantity: newQuantity
                });
            })

            await addDoc(collection(db, "orders"), {
                id:id,
                timestamp: serverTimestamp(),
                address: input_address,
                contact: input_contact,
                name:input_name,
                email: auth.currentUser.email,
                name: auth.currentUser.displayName,
                status: 'pending',
                total: total
            });

            const [userDetails, setUserDetails] = useState({name:input_name,phone:input_contact,address:input_address,city:input_city,orderId:id,amount:total});

            console.log(userDetails);
            localStorage.removeItem("miuracart");
            alert("Checkout successful, you will receive your orders shortly.");
            setLoading(false);
            navigate("/");

        } catch (error) {
            setLoading(false);
		//	alert("Error occoured while checking out");
			console.log(error)
        }
            
    }

    return (
      <React.Fragment>
        {loading ? (
            <h1>Loading...</h1>
        ) : (
          <React.Fragment>
            {user ? (
                <div style={{"min-height":"600px","padding":"15px"}}>
                    <div className="row">
                        <div className="col-4">

                        </div>
                        <div className="col-8">

                        </div>

                    </div>
                    <div className="row">
                    <h1 className="ms-0" style={{"background-color":"#8FBC8F","color":"white","text-align":"left","padding-top":"10px","font-size":"50px"}}>BILLING & SHIPPING</h1>
                  

                        <div className="col-5">
                        <div className="card my-3">
                            <div className="card-header bg-dark text-white text-uppercase fw-bold">
                                ORDER SUMMARY
                            </div>

                            <div style={{"padding":"20px"}} className="card-body mt-0 p-10">
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">Product</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Price</th>
                                        </tr>‍
                                    </thead>
                                    <tbody>
                                        
                                        {cartItems.map(item=>{
                                            totall=totall+item.price*item.qty
                                            return (<p style={{"color":"white","margin":"-20px"}}>totall</p>)
                                        })}
                                        {cartItems.map((item, index) => {
                                            return (
                                               
                                                <tr key={index}>
                                                   
                                                    <td>{index + 1}</td>
                                                    <td>{item.title}</td>
                                                  
                                                    <td style={{ textAlign: 'center' }}>{item.qty}</td>
                                                    <td style={{ textAlign: 'right' }}>Rs.{parseFloat(item.price).toFixed(2)}</td>
                                                    
                                                    <td style={{ textAlign: 'center' }}><img style={{"width":"100px","height":"100px"}} src={item.image}/></td>
                                                </tr>
                                            )
                                        })}
                                        <tr>
                                            <td></td>
                                        <td style={{"color":"black","font-weight":"bold","font-size":"20px"}}>
                                            Total   </td>
                                           
                                            <td></td>
                                     <td style={{ "textAlign": "right","font-weight":"bold","font-size":"17px"}}>Rs.{parseFloat(totall).toFixed(2)}</td>
                                        </tr>
                                       
                                    </tbody>
                                </table>
                               
                                
                            
                
                                {/* <button className="btn btn-success float-end" onClick={handleProceed}>Checkout</button> */}
                            </div>
                        </div>
                        </div>

                        <div style={{"padding-left":"600px"}} className="col-6 p-5">
                        <div style={{"margin-top":"-30px"}} className="card-header bg-dark text-white text-uppercase fw-bold ">
                                BILLING & SHIPPING
                            </div>
                        <div className="col-12">
                        <div className="form-group p-2" >
                            <label htmlFor="" style={{"font-size":"17px","color":"black"}}>First Name</label>
                            <input style={{"width":"650px"}} className="form-control" type="text" name="name" value={input_name} onChange={(e) => { setInput_name(e.target.value) }} required />
                        </div>

                        <div className="form-group p-2" >
                            <label htmlFor="" style={{"font-size":"17px","color":"black"}}>Last Name</label>
                            <input style={{"width":"650px"}} className="form-control" type="text" name="name" value={input_lname} onChange={(e) => { setInput_lname(e.target.value) }} required/>
                        </div>

                        <div className="form-group p-2" >
                            <label htmlFor="" style={{"font-size":"17px","color":"black"}}>Email</label>
                            <input style={{"width":"650px"}} className="form-control" type="text" name="name" value={auth.currentUser.email} onChange={(e) => { setInput_email(e.target.value) }} required />
                        </div>

                        <div className="form-group p-2">
                            <label htmlFor="" style={{"font-size":"17px","color":"black"}}>Address</label>
                            <input style={{"width":"650px"}} className="form-control" name="address" type="text" value={input_address} onChange={(e) => { setInput_address(e.target.value) }}  required/>
                        </div>

                        <div className="form-group p-2">
                            <label htmlFor="" style={{"font-size":"17px","color":"black"}}>City</label>
                            <input style={{"width":"650px"}} className="form-control" name="city" type="text" value={input_city} onChange={(e) => { setInput_city(e.target.value) }}  required/>
                        </div>

                        <div className="form-group p-2 " >
                            <label htmlFor="" style={{"font-size":"17px","color":"black"}}>Contact Number</label>
                            <input style={{"width":"650px"}} className="form-control" name="contact" type="text" value={input_contact} onChange={(e) => { setInput_contact(e.target.value) }} />
                        </div>

                        <div>
                            <hr/>
                            <div>
                                <h3 style={{"background-color":"#8FBC8F","color":"white","text-align":"left","padding-top":"10px","font-size":"30px","padding-left":"20px"}}>Order Summary</h3>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <p style={{"font-weight":"bold","font-size":"18px"}}>Sub Total </p>
                                    <p style={{"font-weight":"bold","font-size":"18px"}}>Shipping Fee </p>
                                    <p style={{"font-weight":"bold","font-size":"18px"}}>Total </p>
                                    </div>
                                <div className="col-6">
                                <p style={{"font-weight":"bold","font-size":"18px"}}>Rs.{parseFloat(totall).toFixed(2)} </p>
                                <p style={{"font-weight":"bold","font-size":"18px"}} >Rs.   0.00 </p>
                                <p style={{"font-weight":"bold","font-size":"18px"}}>Rs.{parseFloat(totall).toFixed(2)} </p>
                                    </div>
                                </div>
                        </div>
                        </div>
                        <PaymentModel 
              orderId={orderId}
              email={auth.currentUser.email}
              cost={totall}
              name={input_name}
              address={input_address}
              city={input_city}
              contact={input_contact}
                                 
               
                />
                        </div>






                        </div>
                    </div>
                
            ) : (
                <LoginPage />
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    )
}

export default CheckoutPage;