import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Sidebar from '../../common/sidebar';

const OrderDetails = () => {
  const [data_orders, setData_orders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    async function fetchData(){
      const docSnap = await getDocs(collection(db, "orders"));
      docSnap.forEach(async (doc) => {
        let responseArray = data_orders;

        let data = doc.data();
        let result = {
          name: data.name,
          email: data.email,
          contact: data.contact,
          address: data.address,
          total: data.total,
          id: doc.id
        }
        responseArray.push(result);

        setData_orders([...responseArray]);
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
          await deleteDoc(doc(db, "orders", props.id));
          alert("Order deleted successfully");
          window.location.reload();
        }
      } catch(error) {
        alert(error);
      }
    }

    return (
      <tr>
        <th scope="row">{props.index + 1}</th>
        <td>{props.id}</td>
        <td>{props.name}</td>
        <td>{props.email}</td>
        
        <td>Rs. {props.total}</td>
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
        <div className='row'>
          <div className='col-2'>
            <Sidebar />
          </div>
          <div className='col-10' >
            <h3 style={{"font-size":"40px"}}>Order Details</h3>
            <table className="table table-striped" style={{ "padding-left": "100px" }}>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Order Id</th>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Email</th>
                 
                  <th scope="col">Total Amount</th>
                  <th >Delete</th>
                </tr>
              </thead>
              <tbody>

                {data_orders.map((item, index)=>{
                  return (
                    <TableRow
                      key={index}
                      index={index}
                      id={item.id}
                      name={item.name}
                      contact={item.contact}
                      email={item.email}
                      total={parseFloat(item.total).toFixed(2)}
                      
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

export default OrderDetails