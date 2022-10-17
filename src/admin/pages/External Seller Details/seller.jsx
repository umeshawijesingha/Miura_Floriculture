import React, { useEffect, useState } from 'react'
import Sidebar from '../../common/sidebar'
import { db } from '../../../firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

const SellerDetails = () => {
  const [data_sellers, setData_sellers] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(){
      const docSnap = await getDocs(collection(db, "sellers"));
      docSnap.forEach(async (doc) => {
        let responseArray = data_sellers;

        let data = doc.data();
        let result = {
          email: data.email,
          fname: data.fname,
          lname: data.lname,
          address: data.address,
          phone: data.phone,
          category: data.category,
          id: doc.id
        }
        responseArray.push(result);

        setData_sellers([...responseArray]);
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

    const handleDelete = async () => {
      try{
        let confirm = true; 
        if(confirm){
          await deleteDoc(doc(db, "sellers", props.id));
          alert("Seller deleted successfully");
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
        <td>{props.address}</td>
        <td>{props.email}</td>
        <td>{props.category}</td>
        <td><i class="fa fa-plus" aria-hidden="true"></i></td>
        <td><i className='bx bx-grid-alt' ></i></td>
        <td>
          <i style={{cursor: 'pointer'}} onClick={handleDelete} className='fa fa-trash' />
        </td>
      </tr>
    )
  }

  return (
    <React.Fragment>
      {loading ? (
        <h1>Loading...</h1>
      ):(
        <div>
          <div className='row'>
            <div className='col-2'>
              <Sidebar />
            </div>
            <div className='col-10'>
              <h3 style={{"font-size":"40px"}}>Seller Details</h3>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Adress</th>
                    <th scope="col">Email</th>
                    <th scope="col">Product Category</th>
                    <th >Add</th>
                    <th >Edit</th>
                    <th >Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {data_sellers.map((item, index) => {
                    return (
                      <TableRow
                        key={index}
                        index={index}
                        fname={item.fname}
                        lname={item.lname}
                        address={item.address}
                        email={item.email}
                        category={item.category}
                        id={item.id}
                      />
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default SellerDetails