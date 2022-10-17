import './cart.css'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Cart = () => {
    const auth = getAuth();
    const navigate = useNavigate();
    const storage = getStorage();
    const [loaded, setLoaded] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartItemsArray, setCartItemsArray] = useState([])
    const [cart_total, setCart_total] = useState(0);
    const [cart_qty, setCart_qty] = useState(0);
    const [user, setUser] = useState(null);

    useEffect(() => {

        async function fetchImage(image) {
            let downloadURL = await getDownloadURL(ref(storage, "/images/" + image));
            return downloadURL;
        }

        async function fetchData() {
            let cartString = localStorage.getItem("miuracart");
            let cartStringArray = [];
            if(cartString !== null && cartString.length > 0) {
                cartStringArray = cartString.split(",");
            }
            setCartItemsArray(cartStringArray);

            let cartArray = new Array();
            cartStringArray.forEach(async (item) => {

                let qtyArray = cartStringArray.filter((item2) => {
                    return item2 === item;
                })

                let currentCartItems = cartItems;
                if (!cartArray.includes(item)) {
                    cartArray.push(item);
                    const docSnap = await getDoc(doc(db, "products", item));
                    let data = docSnap.data();
                    let image_url = await fetchImage(data.image);

                    let responseArray = {
                        id: item,
                        title: data.title,
                        price: data.price,
                        p: data.p,
                        image: image_url,
                        qty: qtyArray.length
                    }
                    currentCartItems.push(responseArray);
                    setCartItems([...currentCartItems]);
                }

            })

        }

        if (!loaded) {
            fetchData().then(() => {
                setLoaded(true);
            });
        }

    }, []);

    useEffect(() => {
        if (cartItems !== null && cartItems.length > 0) {
            let sum = 0;
            let quantity = 0;
            cartItems.forEach((item) => {
                let total = parseFloat(item.price).toFixed(2) * item.qty;
                sum = sum + total;
                quantity += item.qty;
            })
            setCart_total(sum);
            setCart_qty(quantity);
        }
    }, [cartItems])

    const handleCheckout = () => {

        let filteredCart = cartItems.map((item) => {
            return item.id + "#" + item.qty;
        });
        sessionStorage.setItem("miuracheckout", filteredCart);
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user.email)
                console.log(user);
                navigate('/cart/checkout');
            } else {
                alert("You must sign in before checking out")
            }
        })
        
        navigate('/login');
       
    }

    function CartProduct(props) {
        const [qty, setQty] = useState(props?.qty);

        const handleQuantityChange = (e) => {
            setQty(e.target.value);
            let newCartItems = cartItems.map((item) => {
                if (item.id === props.id) {
                    let responseArray = {
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        p: item.p,
                        image: item.image,
                        qty: parseInt(e.target.value)
                    }
                    return responseArray;
                } else {
                    return item;
                }
            })
            setCartItems([...newCartItems]);

            let newCartItemsArray = cartItemsArray.filter((item) => {
                return item !== props.id;
            });
            for(let i = 0; i < parseInt(e.target.value); i++){
                newCartItemsArray.push(props.id);
                setCartItemsArray([...newCartItemsArray]);
                localStorage.setItem("miuracart", newCartItemsArray);
            }
            
        }

        const handleRemove = (e) => {
            e.preventDefault();

            let newCartItems = cartItems.filter((item) => {
                return item.id !== props.id;
            })
            setCartItems([...newCartItems]);

            let newCartItemsArray = cartItemsArray.filter((item) => {
                return item !== props.id;
            });
            setCartItemsArray([...newCartItemsArray])
            localStorage.setItem("miuracart", newCartItemsArray);
            navigate('/')
            navigate('/cart')
        }

        return (
            <div >
            <div className="product" >
                <img src={props.image} alt={props.title} />
                <div className="product-info p-3">
                    <h4 className="product-name">{props.title}</h4>
                    <h5 className="product-price">{props.p} {props.price}</h5>
                    {/*<h5 className="product-offer">50%</h5>*/}
                    <p className="product-quantity">
                        Qnt: <input type="number" min={1} value={qty} onChange={handleQuantityChange} name="quantity" />
                        <p className="product-remove" onClick={handleRemove}>
                            <i className="fa fa-trash" aria-hidden="true"></i>
                            <span className="remove">Remove</span>
                            
                        </p>
                    </p>
                </div>
            </div>
            </div>
        )
        console.log(cartItemsArray)
    }

    return (
        {cartItemsArray}?
        <div className="container-cart">
            <h1 className="ms-0 text-uppercase fw-bold">Shopping Cart</h1>
            <div className="cart">
                <div className="products">
                    {cartItems.map((item, index) => {
                        return (
                            <CartProduct
                                key={index}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                p={item.p}
                                price={parseFloat(item.price).toFixed(2)}
                                qty={item.qty}
                            />
                        )
                    })}

                </div>

                <div className="cart-total">
                    <p>
                        <p>Total Price</p>
                        <p>{cart_total}</p>
                    </p>
                    <p>
                        <p>Number of Items</p>
                        <p>{cart_qty}</p>
                    </p>
                    <button className="btn w-100 mb-2 btn-primary" onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>
                </div>
            </div>
            <div style={{"padding-bottom":"300px"}}></div>
        </div> :""
    )
}

export default Cart;