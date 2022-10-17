import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Sidebar from '../../common/sidebar';

const SellProducts = () => {
  const [data_sales, setData_sales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    async function fetchData(){
      const docSnap = await getDocs(collection(db, "sales"));
      docSnap.forEach(async (doc) => {
        let responseArray = data_sales;

        let data = doc.data();
        console.log(data);
        let result = {
          customer: data.customer,
          status: data.status,
          date: new Date(data.timestamp?.toDate()).toLocaleDateString(),
          id: doc.id
        }
        responseArray.push(result);

        setData_sales([...responseArray]);
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
          await deleteDoc(doc(db, "sales", props.id));
          alert("Sale deleted successfully");
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
        <td>{props.customer}</td>
        <td>{props.status}</td>
        <td>{props.date}</td>
        <td><i style={{cursor: 'pointer'}} onClick={handleDelete} className='fa fa-trash' /></td>
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
            <h3 style={{"font-size":"40px"}}>Sold Products</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Payment Id</th>
                  <th scope="col">Customer Email</th>
                  <th scope="col">Payment Status</th>
                  <th scope="col">Paid Date</th>
                  <th >Delete</th>
                </tr>
              </thead>
              <tbody>
                {data_sales.map((item, index)=>{
                  return (
                    <TableRow
                      key={index}
                      index={index}
                      id={item.id}
                      date={item.date}
                      customer={item.customer}
                      status={item.status}
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

export default SellProducts