const Footer = () => {
    return(
        <footer className="page-footer bg-dark ">
            <div className="bg-success">
                <div className="container">
                    <div className="row pay-2 d-flex align-item-center">
                        <div className="col-md-12 text-center">
                            <a href=""><i className="fab mx-2 my-2 fa-facebook-f text-white mr-4"></i></a>
                            <a href=""><i className="fab mx-2 my-2 fa-instagram text-white mr-4"></i></a>
                            <a href=""><i className="fab mx-2 my-2 fa-linkedin text-white mr-4"></i></a>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container text-center text-md-left mt-3">
                <div className="row">

                    <div className="col-md-3 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold  text-white font-weight-bold">About</h6>
                        <hr className="bg-success mb-4 mt-0 d-inline-block mx-auto" style={{width:"125px", height:"2px"}}/>
                            <p className="mt-2 text-white">We believe in a world where you have total freedom to be you, without
                                judgement. To experiment. To express yourself. To be brave and grab life as the
                                extraordinary adventure it is. </p>
                    </div>

                    <div className="col-md-3 mx-auto mb-4">
                        <h6 className="text-uppercase fw-bold  text-white font-weight-bold">Categories</h6>
                        <hr className="bg-success mb-4 mt-0 d-inline-block mx-auto" style={{width:"100px", height: "2px"}}/>
                            <ul className="list-unstyled">
                                <li className="my-2"><a className="text-decoration-none text-start text-light" href="">Full Kit</a></li>
                                <li className="my-2"><a className="text-decoration-none text-start text-light" href="">Plants</a></li>
                                <li className="my-2"><a className="text-decoration-none text-start text-light" href="">Stones</a></li>
                                <li className="my-2"><a className="text-decoration-none text-start text-light" href="">Accesories</a></li>
                                <li className="my-2"><a className="text-decoration-none text-start text-light" href="">Pots</a></li>

                            </ul>
                    </div>


                    <div className="col-md-3 mx-auto mb-4">
                        <h6 className="text-uppercase  fw-bold text-white font-weight-bold">Contact Details</h6>
                        <hr className="bg-success mb-4 mt-0 d-inline-block mx-auto" style={{width:"110px", height: "2px"}}/>
                            <ul className="list-unstyled">
                                <li className="my-2 text text-white"><i className="fas fa-home mr-3"></i> "Disna", Kumarapattiya, Ambagasdowa.
                                </li>
                                <li className="my-1 text text-white"><i className="fas fa-envelope mr-3"></i><i> miura.floriculture@gmail.com</i>
                            </li>
                            <li className="my-2 text text-white"><i className="fas fa-phone mr-3"></i>  0774482072 | 0769925717</li>

                        </ul>
                    </div>


                </div>
            </div>

            <div className="footer-copyright text-center py-0.5">
                <p className="m-0 text-white">&copy; Copyright <a className="text-decoration-none" href="A">Miura floriculture.lk</a></p>
            </div>

        </footer>
    )
}
export default Footer;