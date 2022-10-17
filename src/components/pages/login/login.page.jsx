import './login.css';
import { useNavigate, useLocation } from 'react-router-dom'
import React, { useEffect, useState } from 'react';
import { isValidInputTimeValue } from '@testing-library/user-event/dist/utils';
import app from '../../../firebase';
import { getAuth, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";

const LoginPage = () => {
    const auth = getAuth();
    const navigate = useNavigate()
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPword] = useState('');
    const [validate, setValidation] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user.email)
          }
        })
    },[auth])


    function emailcheck(event) {
        setEmail(event.target.value)

    }

    function passwordchecker(event) {
        setPword(event.target.value)

    }

    async function login(event) {
        event.preventDefault();

        try {
            await setPersistence(auth, browserSessionPersistence);
            let fireAction_signIn = await signInWithEmailAndPassword(auth, email, password);
            //console.log(fireAction_signIn.user);
            alert('Successfully signed in');

            if(location.pathname === "/login"){
                navigate('/');
            }

            return fireAction_signIn;

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
        <React.Fragment>
            {user ? (
                <h1>403</h1>
            ):(
                <div className="login-page">
                    <div className="container">
                        <div className="row px-3 mb-5 pt-5">
                            <div className="col-lg-10 col-xl-9 card rounded-3    flex-row mx-auto px-0">
                                <div className="img-left d-none d-md-flex">
                                </div>


                                <div className="card-body">
                                    <h4 className="title text-center mt-4">
                                        Login
                                    </h4>
                                    <form className="form-box px-3" >
                                        {
                                            validate && <div>

                                                <p className="invalid">Invalid Email / Password</p>
                                            </div>
                                        }
                                        <div className="form-input">
                                            <input type="email" placeholder="Iinput your Email" name="email" tabIndex="20"
                                                onChange={emailcheck} />
                                        </div>
                                        <div className="form-input">
                                            <input type="password" placeholder="*********" name="password" tabIndex="10"
                                                onChange={passwordchecker} />
                                        </div>
                                        <div className="mb-3">
                                            <button onClick={login} className="btn btn-block text-capitalize"><a href="profile">Login</a>
                                            </button>
                                        </div>

                                        <div className="text-center mb-2">
                                            Don't have Account <a href="#" className="register-link" onClick={() => {
                                                navigate('/register')
                                            }}>Register
                                                now!</a>
                                        </div>

                                        <div className="text-center mb-2">
                                            Forgot Password <a href="/recovery-password" className="register-link">Recover password</a>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </React.Fragment>
    )
}
export default LoginPage