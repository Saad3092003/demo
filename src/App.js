import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '@fortawesome/fontawesome-free/css/all.css';
import Home from "./pages/home/Home";
import Account from "./pages/account/Account";
import Header from './components/Header';
import FourZeroFour from './pages/404/404';
import audioFile from './assets/cart.mp3';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Footer from "./components/Footer";
import HomeService from './pages/homeService/HomeService';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Showcase from './pages/showcase/Showcase';
import HSMDetails from './pages/homeService/HSMDetails';
import ShowcaseDetails from './pages/showcase/ShowcaseDetails';
import AboutUs from './pages/aboutus/AboutUs';
import Team from './pages/team/team';
import Contact from './pages/contact/Contact';
import AOS from './AosInit';
import MarketPlace from './pages/marketplace/MarketPlace';
import MarketplaceDetail from './pages/marketplace/MarketPlaceDetail';
import Cart from './pages/cart/Cart';
import Checkout from './pages/cart/Checkout';
import logo from '../src/pages/logo.png'
import Category_sm from './pages/showcase/Category_sm';
import Cookies from 'js-cookie';
import Category_mpm from './pages/marketplace/Category_mpm';
import { get_header_data_cms } from './handleSlice';
import { useDispatch, useSelector } from "react-redux";
import HSM_Products from './pages/homeService/HSM_Products';
import HSMServices from './pages/homeService/HSMServices';
import Widget from './components/Widget';
import OrderDetails from './components/account/OrderDetails';
import Blogs from './pages/Blogs/Blogs';
import ReadBlog from './pages/Blogs/ReadBlog';
import Terms from './pages/terms&conditions/Terms';
import PrivacyPolicy from './pages/privacy_policy/PrivacyPolicy';
import RefundPol from './pages/refundpolicy/RefundPol';
import ShowCaseCheckOut from './pages/showcase/ShowCaseCheckOut';
import HSMCheckOut from './pages/homeService/HSMCheckOut';
import ChatContext from './context/ChatContext';
import BookingDetails from './components/account/BookingDetails';

function App() {
  const theme = createTheme({
    palette: {
      themeColor: {
        main: '#8fc743',
      },
    },
  });
  const dispatch = useDispatch();


  const [load, setLoad] = useState(true);
  useEffect(() => {
    dispatch(get_header_data_cms());
  }, [dispatch]);

  const preData = useSelector((state) => state.userDetails.get_header_data_cms)

  useEffect(() => {
    let loader = document.getElementById("loader");
    if (loader) {
      if (load === true) {
        loader.classList.remove('d-none');
        document.body.style.overflow = 'hidden';
      }
      else if (load === false) {
        loader.classList.remove('d-none');
        loader.classList.add('fadeOutL');
        document.body.style.overflow = 'auto';
        setTimeout(() => {
          loader.classList.add('d-none');
        }, 200);
      }
    } else {
      console.error('Element with ID "loader" not found.');
    }

  }, [load]);

  const [alertStatus, setalertStatus] = useState(false);
  const [alertText, setalertText] = useState('Secure');
  const [alertmode, setalertmode] = useState('success');

  const audio = new Audio(audioFile);
  const playAudio = () => {
    audio.play();
  };

  useEffect(() => {
    let login = document.getElementById('Calert');

    if (login) {
      if (alertmode == 'success') {
        playAudio();
      }
      setTimeout(() => {
        login.style.transition = '0.5s';
        login.style.opacity = '0';
        login.style.scale = '0.9';
      }, 2000);
      setTimeout(() => {
        login.style.display = 'none';
        setalertStatus(false);
      }, 3500);
    } else {
      console.error('Element with ID "Calert" not found.');
    }
  }, [alertStatus]);


  return (
    <div className='overflow-hidden'>
      <ThemeProvider theme={theme}>
        <ChatContext.Provider>
          <div id='loader'>
            <img src={preData.brand_logo} alt={preData.brand_name} className='img-fluid' width={200} />
          </div>

          {
            alertStatus == true ? (<>
              <div id="Calert" style={{ zIndex: '9999', marginTop: "100px" }} className={`alert me-5 d-flex align-items-center gap-1 Lalert border-0 shadow-sm text-white py-3 px-4 position-fixed end-0 top-0 alert-dismissible fade show ${alertmode == 'error' ? ('bg-danger') : ('bg-success')}`} role="alert">
                {alertmode == 'error' ? (<div className='fs-5 text-white fw-bold'>! </div>) : (<DoneAllIcon />)} <div>{alertText}</div>
              </div>
            </>) : (<>
            </>)
          }
          <Router>
            <Header loadScreen={setLoad} />
            <Routes>
              <Route index element={<Home loadScreen={setLoad} />} />
              {localStorage.getItem('mid') || Cookies.get('mid') ? (
                <Route path="/account" element={<Account setalertmode={setalertmode} setalertStatus={setalertStatus} setalertText={setalertText} loadScreen={setLoad} />} />
              ) : null}
              {/* <Route path="/homeservice" element={<HomeService loadScreen={setLoad} />} /> */}

              <Route path="/showcase" element={<Showcase loadScreen={setLoad} />} />
              {localStorage.getItem('mid') || Cookies.get('mid') ? (
                <Route path="/orderDetailPage/:id" element={<OrderDetails loadScreen={setLoad} />} />
              ) : null}
              {localStorage.getItem('mid') || Cookies.get('mid') ? (
                <Route path="/bookingDetailPage" element={<BookingDetails />} />
              ) : null}
              <Route path="/hsmDetailPage/:id" element={<HSMDetails setalertStatus={setalertStatus} setalertmode={setalertmode} setalertText={setalertText} loadScreen={setLoad} />} />
              <Route path="/showcaseDetailPage/:id" element={<ShowcaseDetails setalertmode={setalertmode} setalertStatus={setalertStatus} setalertText={setalertText} loadScreen={setLoad} />} />
              <Route path="/aboutus" element={<AboutUs loadScreen={setLoad} />} />
              <Route path="/terms_and_conditions" element={<Terms loadScreen={setLoad} />} />
              <Route path="/privacy_policy" element={<PrivacyPolicy loadScreen={setLoad} />} />
              <Route path="/team" element={<Team loadScreen={setLoad} />} />
              <Route path="/refund_policy" element={<RefundPol loadScreen={setLoad} />} />
              <Route path="/contact" element={<Contact loadScreen={setLoad} setalertmode={setalertmode} setalertStatus={setalertStatus} setalertText={setalertText} />} />
              <Route path="/category_sm" element={<Category_sm loadScreen={setLoad} />} />
              <Route path="/marketplace" element={<MarketPlace loadScreen={setLoad} />} />
              <Route path="/marketplaceDetailPage/:id" element={<MarketplaceDetail setalertStatus={setalertStatus} setalertmode={setalertmode} setalertText={setalertText} loadScreen={setLoad} />} />
              {localStorage.getItem('mid') || Cookies.get('mid') ? (
                <Route path="/cart" element={<Cart loadScreen={setLoad} />} />
              ) : null}
              {localStorage.getItem('mid') || Cookies.get('mid') ? (
                <Route path="/checkout" element={<Checkout setalertStatus={setalertStatus} setalertmode={setalertmode} setalertText={setalertText} loadScreen={setLoad} />} />
              ) : null}
              {localStorage.getItem('mid') || Cookies.get('mid') ? (
                <Route path="/showCaseCheckout" element={<ShowCaseCheckOut setalertStatus={setalertStatus} setalertmode={setalertmode} setalertText={setalertText} loadScreen={setLoad} />} />
              ) : null}
              {localStorage.getItem('mid') || Cookies.get('mid') ? (
                <Route path="/hsmCheckout" element={<HSMCheckOut setalertStatus={setalertStatus} setalertmode={setalertmode} setalertText={setalertText} loadScreen={setLoad} />} />
              ) : null}
              <Route path="/category_mpm" element={<Category_mpm loadScreen={setLoad} />} />
              <Route path="/prodcat_hsm" element={<HSM_Products loadScreen={setLoad} />} />
              <Route path="/servcat_hsm" element={<HSMServices loadScreen={setLoad} />} />
              <Route path="/viewBlogs" element={<Blogs loadScreen={setLoad} />} />
              <Route path="/readBlog/:id" element={<ReadBlog loadScreen={setLoad} />} />
              <Route path='*' element={<FourZeroFour loadScreen={setLoad} />} />
            </Routes>
            <Footer />
          </Router>
          <div className='position-fixed end-0 bottom-0'>

            {/* <Widget /> */}

          </div>
        </ChatContext.Provider>
      </ThemeProvider>

    </div>
  );
}

export default App;
