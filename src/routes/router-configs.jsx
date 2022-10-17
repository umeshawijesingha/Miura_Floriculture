import {useRoutes} from 'react-router-dom'
import LoginPage from "../components/pages/login/login.page";
import RegisterPage from "../components/pages/register/register.page";
import NotFoundPage from "../components/pages/not-found/not-found.page";
import InternalPageWrapper from "../components/layouts/internal-page-wrapper/internal-page-wrapper";
import HomePage from "../components/pages/home/home.page";
import AboutUsPage from "../components/pages/about-us/about-us.page";
import ContactUsPage from "../components/pages/contact-us/contact-us.page";
import ProductPage from "../components/pages/products/product.page";
import ProductPageFullKit from "../components/pages/products/product-full-kits.page";
import ProductPagePlant from "../components/pages/products/product-plants.page";
import ProductPageStones from "../components/pages/products/product.page-stones";
import ProductPageAccessories from "../components/pages/products/product.accessories";
import ProductPagePots from "../components/pages/products/product-pots.page";
import Cart from "../components/pages/cart/cart.page";
import CheckoutPage from "../components/pages/checkout/checkout-page";

import AdminLoginPage from '../admin/pages/login/login.page';
import AddUser from '../admin/pages/add user/add.user';
import UserDetails from '../admin/pages/user details/user.details';
import AdminDetails from '../admin/pages/admin details/user.details';
import AddProduct from '../admin/pages/add product/add.product';
import OrderDetails from '../admin/pages/order details/order.details';
import Products from '../admin/pages/products/products';
import SellProducts from '../admin/pages/sell products/sell.products';
import Dashboard from '../admin/pages/Dashboard/dashboard';
import SellerDetails from '../admin/pages/External Seller Details/seller';
import AddSeller from '../admin/pages/Add Seller/add.seller';
import ExternalOrders from '../admin/pages/external orders/external.orders';
import ExternalPayments from '../admin/pages/external payment/external.payments';
import Profile from '../components/pages/profile/profile';
import UserAddProducts from '../components/pages/user add Products/user.add.products';

import CheckAuth from '../admin/adminAuth/CheckAuth';
import RecoveryPassword from '../components/pages/recovery password/recovery.password';
import ProductInfo from '../components/pages/product info/product-info';

const RouterConfigs = () => {
    return useRoutes([
        {
            path: "/",
            element: <InternalPageWrapper/>,
            children: [
                {
                    index: true,
                    element: <HomePage/>
                },
                {
                    path: "about-us",
                    element: <AboutUsPage/>
                },
                {
                    path: "contact-us",
                    element: <ContactUsPage/>
                },
                {
                    path: 'login',
                    element: <LoginPage/>
                },
                {
                    path: 'register',
                    element: <RegisterPage/>
                },
                ,
                {
                    path: 'profile',
                    element: <Profile/>
                },
                {
                    path: 'recovery-password',
                    element: <RecoveryPassword />
                },
                {
                    path: 'user-add-product',
                    element: <UserAddProducts/>
                },
                {
                    path: "product",
                    element: <ProductPage/>
                },
                {
                    path: "product/full-kits",
                    element: <ProductPageFullKit/>
                },
                {
                    path: "product/plants",
                    element: <ProductPagePlant/>
                },
                {
                    path: "product/stones",
                    element: <ProductPageStones/>
                },
                {
                    path: "product/accessories",
                    element: <ProductPageAccessories/>
                },
                {
                    path: "product/pots",
                    element: <ProductPagePots/>
                },
                {
                    path: "cart",
                    element: <Cart/>
                },
                {
                    path: "cart/checkout",
                    element: <CheckoutPage/>
                },
                {
                    path: 'product-info/:product',
                    element: <ProductInfo/>
                },
                
            ]
        },
        {
            path: "/admin",
            element: <CheckAuth/>,
            children: [
                {
                    index: true,
                    element: <Dashboard/>
                },
                {
                    path: "dashboard",
                    element: <Dashboard/>
                },
                {
                    path: "add-admin",
                    element: <AddUser/>
                },
                {
                    path: "admin-details",
                    element: <AdminDetails/>
                },
                {
                    path: "user-details",
                    element: <UserDetails/>
                },
                {
                    path: 'add-product',
                    element: <AddProduct/>
                },
                {
                    path: "order-details",
                    element: <OrderDetails/>
                },
                {
                    path: "products",
                    element: <Products/>
                },
                {
                    path: "sold-products",
                    element: <SellProducts/>
                },
                {
                    path: "seller-details",
                    element: <SellerDetails/>
                },
                {
                    path: "add-seller",
                    element: <AddSeller/>
                },
                {
                    path: "seller-orders",
                    element: <ExternalOrders/>
                },
                {
                    path: "seller-payments",
                    element: <ExternalPayments/>
                }
            ]
        },
        {
            path: "*",
            element: <NotFoundPage/>
        }
    ]);
}
export default RouterConfigs;