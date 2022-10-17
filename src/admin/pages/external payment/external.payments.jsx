import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Sidebar from '../../common/sidebar'

const ExternalPayments = () => {
  const [data_externalPayments, setData_externalPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    async function fetchData(){
      const docSnap = await getDocs(collection(db, "external_payments"));
      docSnap.forEach(async (doc) => {
        let responseArray = data_externalPayments;

        let data = doc.data();
        let result = {
          id: doc.id,
          date: new Date(data.timestamp?.toDate()).toLocaleDateString(),
          seller: data.seller,
          status: data.status,
          total: data.total
        }
        responseArray.push(result);

        setData_externalPayments([...responseArray]);
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
          await deleteDoc(doc(db, "external_payments", props.id));
          //alert("Sale deleted successfully");
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
        <td>{props.seller}</td>
        <td>{props.status}</td>
        <td>Rs. {props.total}</td>
        <td>{props.date}</td>
        <td>
          <i style={{cursor: 'pointer'}} onClick={handleDelete} className='fa fa-trash' />
        </td>
      </tr>
    )
  }

  return (
    <div>
      <div className='row'>
        <div className='col-2'>
          <Sidebar />
        </div>
        <div className='col-10'>
          <h3 style={{"font-size":"40px"}}>External Seller Payments</h3>

          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Payment Id</th>
                <th scope="col">Seller Id</th>
                <th scope="col">Payment Status</th>
                <th scope="col">Total</th>
                <th scope="col">Paid Date</th>
                <th >Delete</th>
              </tr>
            </thead>
            <tbody>
              {data_externalPayments.map((item, index)=>{
                return (
                  <TableRow
                    key={index}
                    index={index}
                    id={item.id}
                    seller={item.seller}
                    date={item.date}
                    status={item.status}
                    total={parseFloat(item.total).toFixed(2)}
                  />
                )
              })}
            </tbody>
          </table>
        </div>
      </div>




    </div>
  )
}

export default ExternalPayments