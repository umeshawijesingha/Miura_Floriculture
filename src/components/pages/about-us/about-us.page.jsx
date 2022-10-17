import './about-us.css';

const AboutUsPage = () => {
    return(
        <>
            <div className="row position-relative g-0">
                <img className="hero-img" height="600px" width="100%" src="https://i.pinimg.com/originals/52/00/84/52008442254fc48159db6c4e49f38a78.jpg" alt=""/>

                <div className="position-absolute mt-5 w-100 d-flex flex-column animate__animated animate__slideInUp">
                    <div className="d-flex w-100 flex-column">
                        <h1 className="fw-bolder text-light p-0 m-0 w-100 text-center fs-100">WHO</h1>
                        <h1 className="fw-bolder text-light p-0 m-0 w-100 text-center fs-100">WE ARE ?</h1>
                        <h1 className="fw-bolder text-light p-0 m-0 w-100 text-center fs-100"></h1>
                    </div>
                </div>
            </div>

            <div className="my-5 g-0 container">
                <h1 className="fw-bolder text-center p-0 m-0 animate__animated animate__slideInUp">About us</h1>
                <p className="text-center p-0 m-0 mt-3 animate__animated animate__slideInUp">
        
In 2019 we stared "Miura Floricuture" with small store and with little buddy plants. We are a home and garden plant store that helps our customers to be more close to nature.
High quality Cactus and Succulents plants with good health and d all plant accessories are 
presented to all with reasonable prices.At any time you can get your plants as gifts for birthdays, anniversaries, 
teachers’ days and so on from “Miura Floriculture”.
                </p>
            </div>

            
        </>
    )
}
export default AboutUsPage