import { getAuth } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import React, { useState } from 'react'
import { db } from '../../../firebase';
// import './useraddproducts.css'

const UserAddProducts = () => {
	const auth = getAuth();
	const storage = getStorage();
	const [input_name, setInput_name] = useState("");
	const [input_price, setInput_price] = useState("");
	const [input_image, setInput_image] = useState("");
	const [input_image_name, setInput_image_name] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		// *TODO*: validate the inputs
		let validate_inputs = true;
	
		if(validate_inputs){
		  let imageName = new Date().getTime();
		  let imageType = ".jpeg";
		  setInput_image_name(""); //do not remove this
	
		  try {
	
			switch(input_image.type){
			  case "image/jpg":
				imageType = ".jpg"
			  case "image/png":
				imageType = ".png"
			  case "image/gif":
				imageType = ".gif"
			  default:
				imageType = ".jpeg"
			}
			
			setLoading(true);
			const imageFullName = imageName+imageType;
			const storageRef = ref(storage, `/images/${imageFullName}`);
			let imageUploaded = await uploadBytes(storageRef, input_image);
	
			let dataAdded = await addDoc(collection(db, "external_product"), {
			  image: imageFullName,
			  p: "Rs.",
			  product: input_name,
			  seller: auth.currentUser.email,
			  timestamp: serverTimestamp(),
			  price: input_price,
			  status: "Pending"
			});
			
			if(imageUploaded && dataAdded){
			  setLoading(false);
			  alert("New product added successfully");
			  window.location.reload();
			} else {
			  setLoading(false);
			  alert("Error occoured while adding new product");
			}
	
		  } catch (error) {
			setLoading(false);
			alert("Error occoured while adding new product");
			console.log(error)
		  }
	
		} else {
		  alert("Please check your inputs");
		}
		
	
	  }

	const handleFileInput = (e) => {
		setInput_image_name(e.target.value);
		setInput_image(e.target.files[0]);
	};

	return (
		<React.Fragment>
		  	{loading ? (
				<h1>Loading...</h1>
		  	) : (
				<div class="container">
					<div class="contact-box">
						<div class="left"></div>
						<div class="right">
							<h2>Add Your Product</h2>

							<label for="">Product Name</label>
							<input type="text" class="field" placeholder="product Name" value={input_name} onChange={(e) => {setInput_name(e.target.value);}}/>
							<label for="">Product price</label>
							<input type="text" class="field" placeholder="product price" value={input_price} onChange={(e)=>{setInput_price(e.target.value)}} />
							<label for="">Product Image</label>
							<input type="file" class="field" placeholder="image" value={input_image_name} onChange={handleFileInput}/>
							
							<button onClick={handleSubmit} class="btn">Submit</button>
						</div>
					</div>
				</div>
      		)}
    	</React.Fragment>
	)
}

export default UserAddProducts