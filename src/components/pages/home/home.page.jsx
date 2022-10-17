import './home.css';
import {useNavigate} from "react-router";

const HomePage = () => {

    const navigate = useNavigate();

    return (
        <>
            <div className="row animate__animated animate__slideInUp mt-0">
                <div className="d-flex justify-content-center flex-row">
                    <div onClick={() => {
                        navigate('/product/full-kits')
                    }} className="m-3">
                        <img className="rounded-circle"
                             src="./images/fulkit.jpg"
                             width="100" height="100" alt=""/>
                        <p className="text-center text-uppercase fw-bold">Full Kits</p>
                    </div>
                    <div onClick={() => {
                        navigate('/product/plants')
                    }} className="m-3">
                        <img className="rounded-circle"
                             src="./images/plants.jpg"
                             width="100" height="100" alt=""/>
                        <p className="text-center text-uppercase fw-bold">Plants</p>
                    </div>
                    <div onClick={() => {
                        navigate('/product/pots')
                    }} className="m-3">
                        <img className="rounded-circle"
                             src="./images/pots.jpg"
                             width="100" height="100" alt=""/>
                        <p className="text-center text-uppercase fw-bold">Pots</p>
                    </div>
                    <div onClick={() => {
                        navigate('/product/stones')
                    }} className="m-3">
                        <img className="rounded-circle"
                             src="./images/stones.jpg"
                             width="100" height="100" alt=""/>
                        <p className="text-center text-uppercase fw-bold">Stones</p>
                    </div>
                    <div onClick={() => {
                        navigate('/product/accessories')
                    }} className="m-3">
                        <img className="rounded-circle"
                             src="./images/acc.jpg"
                             width="100" height="100" alt=""/>
                        <p className="text-center text-uppercase fw-bold">Accessories</p>
                    </div>
                    
                </div>
            </div>

            <div className="row position-relative">
                <img className="hero-img" height="500px" width="100%"
                     src="https://image.freepik.com/free-photo/3d-green-palm-leaves-arrangement_23-2149015445.jpg" alt=""/>

                <div className="position-absolute mt-5 w-100 d-flex flex-column animate__animated animate__slideInUp">
                    <h1 className="fw-bolder p-0 m-0 w-100 text-light text-center fs-100">Grow</h1>
                    <div className="d-flex w-100 flex-row">
                        <h1 className="fw-bolder text-light p-0 m-0 w-100 text-center fs-100">Bit By Bit</h1>
                    </div>
                    <button style={{"width":"600px"}} className="mx-auto mt-4 btn btn-outline-light btn-lg">Trending</button>
                </div>
            </div>
        </>
    )
}
export default HomePage