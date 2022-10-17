import './reg.css';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import app, { db } from '../../../firebase';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification, setPersistence, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const RegisterPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user.email)
      }
    })
  }, [auth])

  const [values, setValues] = useState({
    username: "",
    email: "",
    phonenumber: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "phonenumber",
      type: "text",
      placeholder: "phonenumber",
      errorMessage:
        "Phone number should be 10 numbers it only can be containe numbers",
      label: "phone number",
      pattern: `^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$`,
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      // pattern: `^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await setPersistence(auth, browserSessionPersistence);
      let fireAction_signIn = await createUserWithEmailAndPassword(auth, values.email, values.password);

      await updateProfile(auth.currentUser, {
        displayName: values.username
      });

      await addDoc(collection(db, "user"), {
        email: fireAction_signIn.user.email,
        displayName: values.username,
        phoneNumber: values.phonenumber
      });

      await sendEmailVerification(auth.currentUser);

      //console.log(fireAction_signIn.user);
      alert('Successfully signed in');

      navigate('/');

      return fireAction_signIn;

    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/email-already-in-use') {
        alert('Sorry, This email is already in use');
      } else {
        alert(errorCode);
      }

    }
  };

  const onChange = (e) => {

    setValues({ ...values, [e.target.name]: e.target.value });

  };

  /*   
    function register(event){
      if( username  != ""  ||
        email   !== "" ||
        phonenumber   !== "" ||
        password   !== "" ||
        confirmPassword   !=="")
        
    }
  */

  return (
    <React.Fragment>
      {user ? (
        <h1>Loading....</h1>
      ) : (
        <div className="app">
          <form className='zzz' onSubmit={handleSubmit}>
            <h1>Register</h1>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button className='zz' type="submit" >Submit</button>
          </form>
        </div>
      )}
    </React.Fragment>
  );

};

export default RegisterPage
