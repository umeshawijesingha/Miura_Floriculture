import React, { useState } from 'react';
import Sidebar from '../../common/sidebar';
import { browserSessionPersistence, createUserWithEmailAndPassword, EmailAuthProvider, getAuth, reauthenticateWithCredential, sendEmailVerification, setPersistence, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useStateValue } from '../../adminAuth/StateProvider';

const AddUser = () => {
	const auth = getAuth();
  const [input_firstName, setInput_firstName] = useState("");
  const [input_lastName, setInput_lastName] = useState("");
	const [input_email, setInput_email] = useState("");
	const [input_password, setInput_password] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      let email = auth.currentUser.email;

      // *TODO*: create an html input to get password (preferably a 'Modal')
      let password = prompt("You must confirm your password before creating a new user");

      const credential = EmailAuthProvider.credential( email, password );

      //confirm password
      let a = await reauthenticateWithCredential(auth.currentUser,credential);

      setLoading(true);

      //create-user
      await createUserWithEmailAndPassword(auth, input_email, input_password);
      await updateProfile(auth.currentUser, {
        displayName: input_firstName+" "+input_lastName
      });
      await sendEmailVerification(auth.currentUser);
      await addDoc(collection(db, "sysuser"), {
        email: input_email,
        fname: input_firstName,
        lname: input_lastName,
        role: "admin"
      });

      //re-login
      await setPersistence(auth, browserSessionPersistence);
      let fireAction_signIn = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);

      alert('New admin created successfully');
      window.location.reload();
      return fireAction_signIn;

    } catch (error) {
      console.log(error);
      setLoading(false);
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/email-already-in-use') {
        alert('Sorry, This email is already in use');
      } else if (errorCode === 'auth/wrong-password') {
        alert('Invalid credentials, Please recheck your password');
      } else if (errorCode === 'auth/too-many-requests') {
        alert('You are temporarily blocked due to multiple failed login atempts, Please try again later');
      } else {
        alert(errorCode);
      }

    }
  };

  return (
    <React.Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ):(
        <div>
          <Sidebar />
          <form style={{ "padding-left": "350px", "padding-top": "50px" }} onSubmit={handleSubmit}>
            <h3 style={{ "padding-left": "100px", "padding-top": "40px", "color": "green" }}>Add New Admin</h3>

            <div className="form-group row py-2" >

              <label for="firstname" className="col-sm-2 col-form-label">First Name</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="firstname" placeholder="First Name" value={input_firstName} onChange={(e)=>{setInput_firstName(e.target.value);}} />
              </div>
            </div>

            <div className="form-group row py-2" >

              <label for="lastname" className="col-sm-2 col-form-label">Last Name</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="lastname" placeholder="Last Name" value={input_lastName} onChange={(e)=>{setInput_lastName(e.target.value);}} />
              </div>
            </div>

            <div className="form-group row py-2" >

              <label for="staticEmail" className="col-sm-2 col-form-label">Email</label>
              <div className="col-sm-6">
                <input type="text" className="form-control" id="email" placeholder="Email" value={input_email} onChange={(e)=>{setInput_email(e.target.value);}} />
              </div>
            </div>

            <div className="form-group row">
              <label for="inputPassword" className="col-sm-2 col-form-label">Password</label>
              <div className="col-sm-6">
                <input type="password" className="form-control" id="inputPassword" placeholder="Password" value={input_password} onChange={(e)=>{setInput_password(e.target.value);}} />
              </div>
            </div><br/>

            <div >
              <button className="btn btn-primary px-5 ml-10" style={{"width":"450px"}} type="submit">Save</button>
            </div>

          </form>
        </div>
      )}
    </React.Fragment>
  )
}

export default AddUser