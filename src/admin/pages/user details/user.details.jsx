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
      const docSnap = await getDocs(collection(db, "user"));
      docSnap.forEach(async (doc) => {
        let responseArray = data_users;

        let data = doc.data();
        let result = {
          email: data.email,
          name: data.displayName,
          phone: data.phoneNumber,
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
        let confirm = true; 
        if(confirm){
          await deleteDoc(doc(db, "user", props.id));
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
        <td>{props.name}</td>
        <td>{props.email}</td>
        <td>{props.phone}</td>
        <td><i className="fa fa-plus" aria-hidden="true"></i></td>
        <td><i className='bx bx-grid-alt' ></i></td>
        <td>
          <i style={{cursor: 'pointer'}} onClick={handleDeleteUser} className='fa fa-trash' />
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
            <h3 style={{"font-size":"40px"}}>User Details</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
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
                      name={item.name}
                      phone={item.phone}
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