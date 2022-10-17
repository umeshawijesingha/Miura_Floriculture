import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase';
import Sidebar from '../../common/sidebar';
import './dashboard.css'

const Dashboard = () => {
  const [data_orders, setData_orders] = useState([]);
  const [data_sales, setData_sales] = useState([]);
    const [topSelling, setTopSelling] = useState([])
  const [data_sellers, setData_sellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    async function fetchData(){
      const docSnap = await getDocs(query(collection(db, "orders"),orderBy('timestamp', 'asc')));
      docSnap.forEach(async (doc) => {
        let responseArray = data_orders;

        let data = doc.data();
        let result = {
          name: data.name,
          total: data.total,
          status: data.status,
          date: new Date(data.timestamp?.toDate()).toLocaleDateString(),
          id: doc.id
        }
        responseArray.push(result);

        setData_orders([...responseArray]);
      });
      
      const docSnap2 = await getDocs(query(collection(db, "sales"),orderBy('timestamp', 'asc')));
      docSnap2.forEach(async (doc) => {
        let responseArray = data_sales;

        let data = doc.data();
        let result = {
          id: doc.id
        }
        responseArray.push(result);

        setData_sales([...responseArray]);
      });

      const docSnap3 = await getDocs(collection(db, "sellers"));
      docSnap3.forEach(async (doc) => {
        let responseArray = data_sellers;

        let data = doc.data();
        let result = {
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

  function RecentOrderItem(props) {
    return (
      <tr>
        <td>{props.date}</td>
        <td>{props.customer}</td>
        <td>{props.status}</td>
        <td>Rs. {props.total}</td>
      </tr>
    )
  }
  return (
    <div>
      <Sidebar />
      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <i className='bx bx-menu sidebarBtn'></i>
            <span className="dashboard">Dashboard</span>
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <i className='bx bx-search' ></i>
          </div>
          {/* <div className="profile-details">
         <img src="https://randomuser.me/api/portraits/men/43.jpg" alt="profile image"/> 
        <p className="admin_name">xyz</p>
        <i className='bx bx-chevron-down' ></i>
      </div> */}
        </nav>

        <div className="home-content">
          <div className="overview-boxes">
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Order</div>
                <div className="number">{data_orders.length}</div>
                <div className="indicator">
                  <i className='bx bx-up-arrow-alt'></i>
                  <span className="text">Up from yesterday</span>
                </div>
              </div>
              <i className='bx bx-cart-alt cart'></i>
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Sales</div>
                <div className="number">{data_sales.length}</div>
                <div className="indicator">
                  <i className='bx bx-up-arrow-alt'></i>
                  <span className="text">Up from yesterday</span>
                </div>
              </div>
              <i className='bx bxs-cart-add cart two' ></i>
            </div>
            {/* <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Profit</div>
                <div className="number">Rs.12,876</div>
                <div className="indicator">
                  <i className='bx bx-up-arrow-alt'></i>
                  <span className="text">Up from yesterday</span>
                </div>
              </div>
              <i className='bx bx-cart cart three' ></i>
            </div> */}
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total External Sellers</div>
                <div className="number">{data_sellers.length}</div>
                <div className="indicator">
                  <i className='bx bx-down-arrow-alt down'></i>
                  <span className="text">Down From Today</span>
                </div>
              </div>
              <i className='bx bxs-cart-download cart four' ></i>
            </div>
          </div>

          <div className="sales-boxes">
            <div className="recent-sales box">
              <div className="title">Recent Orders</div>
              <div className="sales-details">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Customer</th>
                      <th>Sales</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data_orders.map((item, index)=>{
                      return (
                        <RecentOrderItem
                          key={index}
                          index={index}
                          id={item.id}
                          customer={item.name}
                          status={item.status}
                          total={parseFloat(item.total).toFixed(2)}
                          date={item.date}
                        />
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="button">
                <a href="/admin/order-details">See All</a>
              </div>
            </div>
            <div className="top-sales box">
              <div className="title">Top Selling Products</div>
              
              <div className="card mb-2" >
                <div className="card-body">
                  <div className='row'>
                    <div className='col-4'>
                      <img className='col-8' src="https://i.ibb.co/V3jhkgw/S006.jpg" />
                    </div>
                    <div className='col-4'>
                      <p className="card-title">Bear's Paw</p>
                    </div>
                    <div className='col-4'>
                      <p className="card-title">Rs.200.00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-2" >
                <div className="card-body">
                  <div className='row'>
                    <div className='col-4'>
                      <img className='col-8' src="https://i.ibb.co/7KGWw5Q/2.jpg" />
                    </div>
                    <div className='col-4'>
                      <p className="card-title">Small Wooden Bees</p>
                    </div>
                    <div className='col-4'>
                      <p className="card-title">Rs.25.00</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card" >
                <div className="card-body">
                  <div className='row'>
                    <div className='col-4'>
                      <img className='col-8' src="https://i.ibb.co/94gqCdN/S001.jpg" />
                    </div>
                    <div className='col-4'>
                      <p className="card-title">Topsy Trvey</p>
                    </div>
                    <div className='col-4'>
                      <p className="card-title">Rs.200.00</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard