import React, { useEffect, useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import './recoverypassword.css';

const RecoveryPassword = () => {
  const auth = getAuth();
  const [input_email, setInput_email] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, input_email);
      setEmailSent(true);
    } catch (error){
      alert(error.code);
    }
  }

  return (
    <React.Fragment>
    {emailSent ? (
      <div className="box">

        <div className="inner-box">

          <h3>Email Verification Link Has Been Sent !</h3>

          <p style={{ "text-align": "center", "padding": "10%" }} >We have sent a varification link to your providing email address, please confrom your email address and login to your account.</p>
          <br />
          <p style={{ "text-align": "center" }} >Go Back to <a class="link" href="login">Login Page</a></p>
        </div>

      </div>
    ):(
      <div className="box" style={{ "padding": "10%" }}>

        <div className="inner-box" >

          <form action="recover.html" onSubmit={handleSubmit}>

            <h3>Enter Your Email Address.</h3>

            <input type="email" name="email" placeholder="Email Address" required value={input_email} onChange={(e)=>{setInput_email(e.target.value)}} />
            <br />
            <div className='row'>
              <div className='col-5'>
                <button className='btn btn-primary w-20' type='submit' >Send Recovery Link</button>
              </div>
            </div>


          </form>

        </div>

      </div>
    )}
    </React.Fragment>
    
  )
}

export default RecoveryPassword