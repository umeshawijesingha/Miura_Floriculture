import './contact-us.css';

const ContactUsPage = () => {
    return (
        <>
            <div className="row position-relative g-0">
                <img className="hero-img" height="600px" width="100%" src="https://i.pinimg.com/originals/52/00/84/52008442254fc48159db6c4e49f38a78.jpg" alt="" />

                <div className="position-absolute mt-5 w-100 d-flex flex-column animate__animated animate__slideInUp">
                    <div className="d-flex w-100 flex-column">
                        <h1 className="fw-bolder text-light p-0 m-0 w-100 text-center fs-100">Helping The</h1>
                        <h1 className="fw-bolder text-light p-0 m-0 w-100 text-center fs-100">World Unlock</h1>
                        <h1 className="fw-bolder text-light p-0 m-0 w-100 text-center fs-100">Creativity</h1>
                    </div>
                </div>
            </div>

            <div className="my-5 g-0 container">
                <h1 className="fw-bolder text-center p-0 m-0 animate__animated animate__slideInUp">
                    Contact us </h1>
                <p className="text-center p-0 m-0 mt-3 animate__animated animate__slideInUp">
                    We believe in a world where you have total freedom to be you, without judgement. To experiment. To express yourself.
                    To be brave and grab life as the extraordinary adventure it is. So we make sure everyone has an equal chance to discover
                    all the amazing things they’re capable of – no matter who they are, where they’re from or what looks they like to boss.
                    We exist to give you the confidence to be whoever you want to be.We believe great fashion shouldn’t come with a compromise,
                    be that style, price or impact.Our Shop is wonderfully unique. And we do everything we can to help you find your fit,
                    offering more than sizes.So you can be confident we’ve got the perfect thing for you.

                    Contact us

                </p>
            </div>

            <div className="row g-0 animate__animated animate__slideInUp my-5">
                <div className="col text-center">
                    <h1 className="fs-50 fw-bolder">email</h1>
                    <p>miura.floriculture@gmail.com</p>
                </div>
                <div className="col text-center border-start border-end">
                    <h1 className="fs-50 fw-bolder">contact no</h1>
                    <p> 0774482072 | 0769925717</p>
                </div>
                <div className="col text-center">
                    <h1 className="fs-50 fw-bolder">Facebook Link </h1>
                    <a href>https://www.facebook.com/Miura-Floriculture-108468884448211</a>
                </div>
            </div>


        </>
    )
}
export default ContactUsPage