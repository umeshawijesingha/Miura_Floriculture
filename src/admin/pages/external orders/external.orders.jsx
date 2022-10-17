import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Sidebar from '../../common/sidebar'

const ExternalOrders = () => {
  const [data_externalOrders, setData_externalOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    async function fetchData(){
      const docSnap = await getDocs(collection(db, "external_product"));
      docSnap.forEach(async (doc) => {
        let responseArray = data_externalOrders;

        let data = doc.data();
        let result = {
          id: doc.id,
          price: data.price,
          product: data.product,
          seller: data.seller,
          status: data.status,
          image: data.image
        }
        responseArray.push(result);

        setData_externalOrders([...responseArray]);
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
        let confirm = true; // *TODO*: create a confirm dialog
        if(confirm){
          if(props.status === "approved"){
            const querySnapshot = await getDocs(query(collection(db, "products"), where("externalId", "==", props.id)));
            querySnapshot.forEach(async (doci) => {
              let data = doci.data();
              if(data !== undefined && data !== null) {
                await deleteDoc(doc(db, "products", doci.id));
              }
            })

            await deleteDoc(doc(db, "external_product", props.id));
          } else {
            await deleteDoc(doc(db, "external_product", props.id));
          }
          alert("External product deleted successfully");
          window.location.reload();
        }
      } catch(error) {
        alert(error);
      }
    }

    const handleApprove = async (e) => {
      try{
        let confirm = true; 
        if(confirm){
          await updateDoc(doc(db, "external_product", props.id), {
            status: "approved"
          });

          await addDoc(collection(db, "products"), {
            category: "plants", 
            image: props.image,
            price: props.price,
            title: props.product,
            description: "input_description", 
            quantity: 1, 
            externalSeller: true,
            externalId: props.id,
            seller: props.seller
          });

          alert("External product approved");
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
        <td>{props.product}</td>
        <td>{props.seller}</td>
        <td>Rs. {props.price}</td>
        <td>{props.status}</td>
        <td>
          {props.status !== "approved" ? (
            <i style={{cursor: 'pointer'}} onClick={handleApprove} className='fa fa-trash' />
          ):(
            <div></div>
          )}
        </td>
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
        <div className='col-10' >
          <h3 style={{"font-size":"40px"}}>External Order Details</h3>

          <table className="table table-striped" style={{ "padding-left": "100px" }}>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Order Id</th>
                <th scope="col">Product</th>
                <th scope="col">Seller</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th>Approve</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data_externalOrders.map((item, index)=>{
                return (
                  <TableRow
                    key={index}
                    index={index}
                    id={item.id}
                    product={item.product}
                    status={item.status}
                    price={parseFloat(item.price).toFixed(2)}
                    seller={item.seller}
                     image={item.image}
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

export default ExternalOrders