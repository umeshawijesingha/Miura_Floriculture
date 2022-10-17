import React, { useEffect, useState } from 'react'
import Sidebar from '../../common/sidebar'
import { db } from '../../../firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';


const Products = () => {
  const [data_products, setData_products] = useState([]);
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData(){
      const docSnap = await getDocs(collection(db, "products"));
      docSnap.forEach(async (doc) => {
        let responseArray = data_products;

        let data = doc.data();
        let result = {
          category: data.category,
          description: data.description,
          p: data.p,
          price: data.price,
          quantity: data.quantity,
          title: data.title,
          id: doc.id
        }
        responseArray.push(result);

        setData_products([...responseArray]);
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
          await deleteDoc(doc(db, "products", props.id));
          alert("Products deleted successfully");
          window.location.reload();
        }
      } catch(error) {
        alert(error);
      }
    }

    return (
      <tr>
        <th scope="row">{props.index + 1}</th>
        <td>{props.title}</td>
        <td>{props.p} {props.price}</td>
        <td>{props.category}</td>
        <td>{props.description}</td>
        <td>{props.quantity}</td>
        <td><i class="fa fa-plus" aria-hidden="true"></i></td>
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
            <h3 style={{"font-size":"40px"}} >Products Details</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Product Price</th>
                  <th scope="col">Product Category</th>
                  <th scope="col">Product Description</th>
                  <th scope="col">Product Quantity</th>
                  <th >Add</th>
                  <th >Edit</th>
                  <th >Delete</th>
                </tr>
              </thead>
              <tbody>
                {data_products.map((item, index) => {
                  return (
                    <TableRow
                      key={index}
                      index={index}
                      id={item.id}
                      title={item.title}
                      p={item.p}
                      price={parseFloat(item.price).toFixed(2)}
                      category={item.category}
                      description={item.description}
                      quantity={item.quantity}
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

export default Products