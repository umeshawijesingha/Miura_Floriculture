import React, { useEffect, useState } from 'react'
import Sidebar from '../../common/sidebar';
import { db } from '../../../firebase';
import { addDoc, collection } from 'firebase/firestore';

const AddSeller = () => {
  const [input_fname, setInput_fname] = useState("");
  const [input_lname, setInput_lname] = useState("");
  const [input_email, setInput_email] = useState("");
  const [input_address, setInput_address] = useState("");
  const [input_phone, setInput_phone] = useState("");
  const [input_category, setInput_category] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let dataAdded = await addDoc(collection(db, "sellers"), {
        fname: input_fname,
        lname: input_lname,
        email: input_email,
        address: input_address,
        phone: input_phone,
        category: input_category
      });

      if(dataAdded){
        setLoading(false);
        alert("New seller added successfully");
        window.location.reload();
      }

    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div>
      <div>
        <Sidebar />
        <form onSubmit={handleSubmit} style={{ "padding-left": "350px", "padding-top": "50px" }}>
          <h3 style={{ "padding-left": "100px", "padding-top": "40px", "color": "green" }}>Add New Seller</h3>

          <div className="form-group row py-2" >
            <label for="firstname" className="col-sm-2 col-form-label">First Name</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" id="firstname" placeholder="First Name" value={input_fname} onChange={(e)=>{setInput_fname(e.target.value)}} />
            </div>
          </div>

          <div className="form-group row py-2" >
            <label for="lastname" className="col-sm-2 col-form-label">Last Name</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" id="lastname" placeholder="Last Name" value={input_lname} onChange={(e)=>{setInput_lname(e.target.value)}} />
            </div>
          </div>

          <div className="form-group row py-2" >
            <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" id="email" placeholder="Email" value={input_email} onChange={(e)=>{setInput_email(e.target.value)}} />
            </div>
          </div>

          <div className="form-group row py-2">
            <label for="address" className="col-sm-2 col-form-label">Address</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" id="address" placeholder="Address" value={input_address} onChange={(e)=>{setInput_address(e.target.value)}} />
            </div>
          </div>

          <div className="form-group row py-2">
            <label for="contact" className="col-sm-2 col-form-label">Contact Number</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" id="contact" placeholder="Contact Number" value={input_phone} onChange={(e)=>{setInput_phone(e.target.value)}} />
            </div>
          </div>

          <div className="form-group row">
            <label for="category" className="col-sm-2 col-form-label">Product Category</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" id="category" placeholder="product Category" value={input_category} onChange={(e)=>{setInput_category(e.target.value)}} />
            </div>
          </div><br/>

          <div >
            <button className="btn btn-primary px-5 ml-10" style={{"width":"450px"}} type="submit">Save</button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default AddSeller