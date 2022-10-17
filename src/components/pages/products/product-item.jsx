import { useNavigate } from "react-router";

const ProductItem = (props) => {
    const navigate = useNavigate();

    const addToCart = () => {
        let cartItems = localStorage.getItem("miuracart");
        let responseArray= [];
        if(cartItems !== null && cartItems.length > 0) {
            cartItems = cartItems.split(",");
            responseArray = [...cartItems,props.id];
        } else {
            responseArray = [props.id];
        }
        localStorage.setItem("miuracart", responseArray);
       // alert("Added to cart");
        console.log(responseArray);
    }

    const viewProduct = (e) => {
        e.preventDefault();
        navigate(`/product-info/${props.id}`)
    }
    
    return(
        <div className="card rounded-3 m-2" onClick={viewProduct}>
            <img className="img-fluid w-auto" width="250" height="250" src={props.image} alt="" srcSet="" />
            <div className="m-2">
                <h6 className="text-center fw-bold text-dark mb-0 mt-2">{props.title}</h6>
                <h6 className="text-center fw-bold text-dark mb-0 mt-2">{props.price}</h6>
            </div>
            <div>
                <p style={{color:'green',"padding-left":"50px"}}>{props.stock} items available</p>
                <button style={{ cursor: 'pointer', padding: '5px 10px', margin: '5px', border: 'solid thin gray', borderRadius: '5px'  ,"width":"250px","color":"white","background-color":"green"}} onClick={addToCart}>Add to Cart</button> 
            </div>
            
        </div>
    )
}

export default ProductItem;