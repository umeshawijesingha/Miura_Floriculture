import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router';
import { ref, getDownloadURL, getStorage } from "firebase/storage";
import { collection, doc, getDoc, getDocs, query, where,setDoc,updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { Firestore } from "firebase/firestore";

import { getFirestore } from "firebase/firestore"



const ProductInfo = () => {
  const params = useParams();
  const navigate = useNavigate();
  const storage = getStorage();
  const [data_id, setData_id] = useState("");
  const [data_image, setData_image] = useState("");
  const [data_title, setData_title] = useState("");
  const [data_description, setData_description] = useState("");
  const [data_stock, setData_stock] = useState("");

  const [input_quantity, setInput_Quantity] = useState(0);

  const [validSearch, setValidSearch] = useState(false);

  const [loading, setLoading] = useState(true);
let totalQuantity=data_stock;
  useEffect(() => {

    async function fetchImage(image) {
        let downloadURL = await getDownloadURL(ref(storage, "/images/"+image));
        return downloadURL;
    }

    async function fetchData() {

      const docSnap = await getDoc(doc(db, "products", params.product));
      let data = docSnap.data();

      if(data) {
        let image_url = await fetchImage(data.image);

        setData_id(docSnap.id);
        setData_image(image_url);
        setData_title(data.title);
        setData_description(data.description);
        setData_stock(data.quantity);

        setValidSearch(true);
      }
      setLoading(false);

    }
    if (loading) {
      fetchData();
    }

  }, [])

  const handleAddToCart = async () => {
    let cartItems = localStorage.getItem("miuracart");
    if(cartItems !== null && cartItems.length > 0) {
        cartItems = cartItems.split(",");
        cartItems = cartItems.filter((item) => {
          return item !== data_id
        })
        for (let i = 0; i < input_quantity; i++){
          cartItems.push(data_id)
        }
    } else {
      cartItems = [];
      for (let i = 0; i < input_quantity; i++){
        cartItems.push(data_id)
      }
    }
    localStorage.setItem("miuracart", cartItems);
   alert("Added to cart");
  
   const quantityRef = doc(db, "products", params.product);

totalQuantity=totalQuantity-input_quantity;
await updateDoc(quantityRef, {
  quantity:totalQuantity
});



    console.log(cartItems);
    navigate('/cart')
  }

  
  return (
    <React.Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ):(
        <React.Fragment>
          {validSearch ? (
            <div className='row'>
              <div className='col-6'>
                <img style={{"width":"600px","height":"500px","padding-top":"75px","padding-left":"120px"}} src={data_image} alt={data_title} />
                </div>
                <div className='col-6 '>
                  <h3 style={{"padding":"40px","color":"green"}}>{data_title}</h3>
                  <br/>
                  <hr/>
                  <h3 style={{"padding-left":"50px"}}>Product Description</h3>
                  <p style={{"padding":"50px"}}>{data_description}</p>
                  <p style={{"padding-left":"50px"}}>Quanity
                  <input style={{"padding":"20px","margin-left":"20px"}} type="number" min={1} max={data_stock} value={input_quantity} onChange={(e)=>{setInput_Quantity(e.target.value)}}/>
                    </p>
                  
                  <button style={{"padding":"10px","width":"250px","margin":"30px"}} className='btn btn-primary' onClick={handleAddToCart}>Add to cart</button>

                </div>

            </div>
          ):(
            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
              <h1>No such product</h1>
            </div>
          )}
        
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductInfo;
