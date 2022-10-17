import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { ref, getDownloadURL, getStorage } from "firebase/storage";
import { collection, getDocs, query, where } from "firebase/firestore";
import './product.css'
import ProductItem from "./product-item";
import { db } from "../../../firebase";



const ProductPagePots = () => {
    const auth = getAuth();
    const storage = getStorage();

    const [productData, setProductData] = useState([]);
    const [products, setProducts] = useState(productData)
    const [toPrice, setToPrice] = useState(0)
    const [fromPrice, setFromPrice] = useState(0)
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchImage(image) {
            let downloadURL = await getDownloadURL(ref(storage, "/images/"+image));
            return downloadURL;
        }

        async function fetchData() {

            var results = [];
            const querySnapshot = await getDocs(query(collection(db, "products"), where("category", "==", "pots")));
            querySnapshot.forEach(async (doc) => {
                let data = doc.data();
                let image_url = await fetchImage(data.image);

                let responseArray = {
                    id: doc.id,
                    title: data.title,
                    price: data.price,
                    p: data.p,
                    image: image_url,
                    stock: data.quantity
                }

                results.push(responseArray);
                setProductData([...results])
                setProducts([...results]);
            });

            setLoading(false);

        }
        if (loading) {
            fetchData();
        }

    }, [])

    function toHandler(event) {
        // *TODO*: validate inputs
        setToPrice(event.target.value);
    }

    function fromHandler(event) {
        // *TODO*: validate inputs
        setFromPrice(event.target.value);
    }

    function filterHandler(event) {
        event.preventDefault();
        setLoading(true);
        let filteredProducts = productData.filter((item)=>{
            return parseFloat(item.price).toFixed(2) >= parseFloat(fromPrice).toFixed(2) && parseFloat(toPrice).toFixed(2) >= parseFloat(item.price).toFixed(2);
        });
        
        setProducts(filteredProducts);
        setLoading(false);
    }

    return (
        <>
            <div className="row g-0 p-1">
                <div className="col-md-3">
                    <div className="card m-3">
                        <div className="card-header fw-bold bg-dark text-light">
                            PRICE FILTER
                        </div>
                        <div className="card-body mt-0">
                            <p>Price</p>
                            <input onChange={fromHandler} value={fromPrice} className="form-control" type="number" placeholder="From" />
                            <input onChange={toHandler} value={toPrice} className="form-control mt-3" type="number" placeholder="To" />
                            <button onClick={filterHandler} className="btn btn-primary btn-sm mt-3 float-end">Filter
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-9 mt-2">
                    <h3 className="ms-2">POTS</h3>
                    <div className="grid-container">
                        {loading ? (
                            <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                                <div className="spinner-border" role="status">
                                    <span className="sr-only">Loading...</span></div>
                            </div>
                        ) :
                            products.map((item, index) => (
                                <ProductItem
                                    key={index}
                                    id={item.id}
                                    price={parseFloat(item.price).toFixed(2)}
                                    title={item.title}
                                    image={item.image}
                                    p={item.p}
                                    stock={item.stock}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProductPagePots