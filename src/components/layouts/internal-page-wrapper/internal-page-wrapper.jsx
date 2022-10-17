import {Outlet} from 'react-router';
import Header from "../../common/header/Header";
import Footer from "../../common/footer/footer";

const InternalPageWrapper = () => {
    return (
        <>
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}
export default InternalPageWrapper