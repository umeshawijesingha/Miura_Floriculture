import { getAuth, signOut } from 'firebase/auth';
import React from 'react'
import { actionTypes } from '../adminAuth/reducer';
import { useStateValue } from '../adminAuth/StateProvider';
import './sidebar.css'

const Sidebar = () => {
	const auth = getAuth();
	const [, dispatch] = useStateValue();

  const handleLogOut = async () => {
    await signOut(auth);
    dispatch({
      type: actionTypes.SET_USER,
      user: null,
      fname: "",
      lname : "",
      role: null
    });
  }


  return (

    <div className="sidebar">
      <div className="logo-details">
        <i className='bx bxl-c-plus-plus'></i>
        <p className="logo_name" >Miura Floriculture</p>

      </div>
      <ul className="nav-links">
        <li>
          <a href="/admin/dashboard" className="active">
            <i className='bx bx-grid-alt' ></i>
            <p className="links_name">Dashboard</p>
          </a>
        </li>
        <li>
          <a href="/admin/add-admin">
            <i className='bx bx-box' ></i>
            <p className="links_name">Add new Admin</p>
          </a>
        </li>
        <li>
          <a href="/admin/admin-details">
            <i className='bx bx-box' ></i>
            <p className="links_name">Admin Details</p>
          </a>
        </li>
        <li>
          <a href="/admin/user-details">
            <i className='bx bx-box' ></i>
            <p className="links_name">User Details</p>
          </a>
        </li>
        <li>
          <a href="/admin/add-product">
            <i className='bx bx-pie-chart-alt-2' ></i>
            <p className="links_name">Add Products</p>
          </a>
        </li>
        <li>
          <a href="/admin/products">
            <i className='bx bx-pie-chart-alt-2' ></i>
            <p className="links_name">Products Details</p>
          </a>
        </li>
        <li>
          <a href="/admin/order-details">
            <i className='bx bx-book-alt' ></i>
            <p className="links_name">Order Details</p>
          </a>
        </li>
        <li>
          <a href="/admin/sold-products">
            <i className='bx bx-book-alt' ></i>
            <p className="links_name">Sold products</p>
          </a>
        </li>

        <li>
          <a href="/admin/seller-details">
            <i className='bx bx-box' ></i>
            <p className="links_name">External Seller Details</p>
          </a>
        </li>
        <li>
          <a href="/admin/add-seller">
            <i className='bx bx-box' ></i>
            <p className="links_name">Add External Seller</p>
          </a>
        </li>
        <li>
          <a href="/admin/seller-orders">
            <i className='bx bx-box' ></i>
            <p className="links_name">External Seller Orders</p>
          </a>
        </li>
        <li>
          <a href="/admin/seller-payments">
            <i className='bx bx-box' ></i>
            <p className="links_name">External Seller Payments</p>
          </a>
        </li>



        <li className="log_out">
          <a onClick={handleLogOut}>
            <i className='bx bx-log-out'></i>
            <p className="links_name">Log out</p>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar