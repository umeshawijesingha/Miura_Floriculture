import React, { useEffect, useState } from 'react'
import Sidebar from '../../common/sidebar';
import { db } from '../../../firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useStateValue } from '../../adminAuth/StateProvider';

const UserDetails = () => {
  
	const [{ user }] = useStateValue();
  const [data_users, setData_users] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData(){
      const docSnap = await getDocs(collection(db, "sysuser"));
      docSnap.forEach(async (doc) => {
        let responseArray = data_users;

        let data = doc.data();
        let result = {
          email: data.email,
          fname: data.fname,
          lname: data.lname,
          role: data.role,
          id: doc.id
        }
        responseArray.push(result);

        setData_users([...responseArray]);
      });
    }

    if(!loaded){
      fetchData().then(()=>{
        setLoaded(true);
        setLoading(false);
      });
    }
  },[])
  
  function TableRow(props){

    const handleDeleteUser = async () => {
      try{
        let confirm = true; // *TODO*: create a confirm dialog
        if(confirm){
          await deleteDoc(doc(db, "sysuser", props.id));
          alert("User deleted successfully");
          window.location.reload();
        }
      } catch(error) {
        alert(error);
      }
    }

    return (
      <tr>
        <th scope="row">{props.index + 1}</th>
        <td>{props.fname}</td>
        <td>{props.lname}</td>
        <td>{props.email}</td>
        <td><i className="fa fa-plus" aria-hidden="true"></i></td>
        <td><i className='bx bx-grid-alt' ></i></td>
        <td>
          {props.email === user ? (
            <React.Fragment></React.Fragment>
          ):(
            <i style={{cursor: 'pointer'}} onClick={handleDeleteUser} className='fa fa-trash' />
          )}
        </td>
      </tr>
    )
  }

  return (
    <React.Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ):(
        <div className='row'>
          <div className='col-2'>
            <Sidebar />
          </div>
          <div className='col-10'>
            <h3 style={{"font-size":"40px"}}>Admin Details</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Emai</th>
                  <th >Add</th>
                  <th >Edit</th>
                  <th >Delete</th>
                </tr>
              </thead>
              <tbody>
                {data_users.map((item, index) => {
                  return (
                    <TableRow
                      key={index}
                      index={index}
                      id={item.id}
                      fname={item.fname}
                      lname={item.lname}
                      email={item.email}
                    />
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default UserDetails;