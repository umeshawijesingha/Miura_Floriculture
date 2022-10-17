import React, { useEffect } from 'react'
import { StateProvider, useStateValue } from './StateProvider';
import reducer, { actionTypes, initialState } from './reducer';
import {Outlet, useNavigate} from 'react-router';
import AdminLoginPage from '../pages/login/login.page';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function CheckAuthUser({children}) {
	const auth = getAuth();
  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate()

  useEffect(()=>{
		onAuthStateChanged(auth, (authUser) => {

      let savedUser = sessionStorage.getItem('miurauser');
      
		  if (authUser && savedUser !== null && savedUser !== undefined && (user===null || user=== undefined)) {
        savedUser = savedUser.split(",");
        dispatch({
          type: actionTypes.SET_USER,
          user: savedUser[0],
          fname: savedUser[1],
          lname : savedUser[2],
          role: savedUser[3]
        });
		  }
		})
	},[auth])

  return (
    <React.Fragment>
      {user ? (
        <Outlet/>
      ):(
        <AdminLoginPage />
      )}
    </React.Fragment>
  );
}

function CheckAuth() {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <CheckAuthUser />
    </StateProvider>
  )
}

export default CheckAuth