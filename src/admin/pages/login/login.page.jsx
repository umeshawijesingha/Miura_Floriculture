import React, { useEffect, useState } from 'react'
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../firebase";
import validator from 'validator';
import { getAuth, signInWithEmailAndPassword, browserSessionPersistence, setPersistence, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { actionTypes } from '../../adminAuth/reducer';
import { useStateValue } from '../../adminAuth/StateProvider';

const AdminLoginPage = () => {
	const auth = getAuth();
	const [, dispatch] = useStateValue();
	const navigate = useNavigate();
	const [input_email, setInput_email] = useState("");
	const [input_password, setInput_password] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
            await setPersistence(auth, browserSessionPersistence);
            let fireAction_signIn = await signInWithEmailAndPassword(auth, input_email, input_password);

			const docSnap = await getDocs(query(collection(db, "sysuser"), where("email", "==", input_email)));

			docSnap.forEach(async (doc) => {
				const data = await doc.data();
				if(data !== undefined && data !== null) {

					dispatch({
						type: actionTypes.SET_USER,
						user: fireAction_signIn.user.email,
						fname: fireAction_signIn.user.fname,
						lname : fireAction_signIn.user.lname,
						role: data.role
					});
					sessionStorage.setItem('miurauser',[fireAction_signIn.user.email,fireAction_signIn.user.fname,fireAction_signIn.user.lname,data.role]);

					alert(`Successfully signed in as ${data.role}`);
					return fireAction_signIn;

				} else {

					await signOut(auth);
					dispatch({
						type: actionTypes.SET_USER,
						user: null,
						fname: "",
						lname : "",
						role: null
					});
					alert('Invalid credentials, Please recheck your email and password');
				}
			})
			
        } catch (error) {
            console.log(error);
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/wrong-password') {
                alert('Invalid credentials, Please recheck your email and password');
            } else if (errorCode === 'auth/too-many-requests') {
                alert('You are temporarily blocked due to multiple failed login atempts, Please try again later');
            } else {
                alert(errorCode);
            }

        }

	}

	return (
		<div className='p-500 m-100' >
			<hr />
			<div className='row center'>
				<div className='col-3' >
					<img style={{ "padding": "100px -300px 50px 300px", "width": "500px", "height": "600px" }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyLhrC59qOCbBVFGUgQcLaPi5JE5ZVjNZ_ug&usqp=CAU" />
				</div>
				<div style={{ "padding": "100px 50px " }} className='col-6 py-500'>
					<div className=" card row  my-50">
						<div >
							<div className="img-left d-none d-md-flex">
							</div>
							<div className="card-body col-12 p-10 ">
								<h4 className="title text-center mt-4">
									Admin Login
								</h4>
								<form className="form-box px-3" onSubmit={handleSubmit}>

									<div className="form-input">

										<input type="email" placeholder="Input your Email" name="email" required="" value={input_email} onChange={(e)=>{setInput_email(e.target.value);}} />
									</div>

									<div className="form-input">

										<input type="password" placeholder="*********" name="password" required="" value={input_password} onChange={(e)=>{setInput_password(e.target.value);}} />
									</div>
									<div className="mb-3">
										<button className="btn btn-block text-capitalize " name="submit" type="submit">Login</button>
									</div>

								</form>
							</div>
							<hr />
						</div>
					</div>
				</div>
			</div>
			<hr />
		</div>
	)
}

export default AdminLoginPage