import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/css/header.css';
import audioFile from '../assets/cart.mp3'
import axios from 'axios';
import { Badge, Button, IconButton } from '@mui/material';
import logo from '../pages/logo.png';
import Cookies from 'js-cookie';
import { LoggedMember, Internal_Notes, get_header_data_cms, NotificationRead, getCart } from '../handleSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import NotificationsIcon from '@mui/icons-material/Notifications';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Send';
import { event } from 'jquery';
import Avatar from '@mui/material/Avatar';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { authentication } from './FacebookFirebase';
import { url3 } from './port';

function Header({ loadScreen }) {

    const handleFirebaseLogin = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(authentication, provider)
            .then((result) => {
                // The signed-in user info.
                const user = result.user;

                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential.accessToken;
                console.log(result);
                console.log(user);
                console.log(credential);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                console.log(error);
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error);

                // ...
            });
    }
    useEffect(() => {
        const elem = document.getElementById("view3d");

        function handleOrientation() {
            window.addEventListener("deviceorientation", (e) => {
                elem.style.transition = "0.3s"
                elem.style.transform = `rotateZ(${-e.alpha}deg) rotateX(${-e.beta}deg) rotateY(${e.gamma
                    }deg)`;
                console.log(elem.style.transform);
            });
        }
        async function requestDeviceOrientation() {
            if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
                //iOS 13+ devices
                try {
                    const permissionState = await DeviceOrientationEvent.requestPermission()
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation)
                    } else {
                        // alert('Permission was denied')
                    }
                } catch (error) {
                    // alert(error)
                }
            } else if ('DeviceOrientationEvent' in window) {
                //non iOS 13+ devices
                console.log("not iOS");
                window.addEventListener('deviceorientation', handleOrientation)
            } else {
                //not supported
                // alert('nicht unterstützt')
            }
        }
        requestDeviceOrientation()
    }, [])
    const navigate = useNavigate();
    const audio = new Audio(audioFile);
    const playAudio = () => {
        audio.play();
    };
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginRemember, setLoginRemember] = useState('');
    const [Rpass, setRpass] = useState('');
    const [Rnumber, setRnumber] = useState('');
    const [Rcountry, setRcountry] = useState('');
    const [Rgender, setRgender] = useState('');
    const [Rzipcode, setRzipcode] = useState('');
    const [Remail, setRemail] = useState('');
    const [Rfname, setRfname] = useState('');
    const [Rlname, setRlname] = useState('');
    const [Raddress, setRaddress] = useState('');
    const [Luname, setLuname] = useState();
    const [result, setResult] = useState(false);
    const [resultr, setResultr] = useState("");
    const [Rcount, setRcount] = useState(false);
    const dispatch = useDispatch();
    const handleDownload = (file) => {
        const link = document.createElement("a");
        link.href = file;

        const isImageOrPdf = /\.(jpg|jpeg|png|gif|pdf)$/i.test(file);
        if (!isImageOrPdf) {
            link.setAttribute("download", "attached_file");
        }

        link.click();
    }
    const Lmid = Cookies.get('mid') || localStorage.getItem('mid');
    const mid = Cookies.get('mid') || localStorage.getItem('mid');


    useEffect(() => {
        dispatch(LoggedMember(Lmid));
        dispatch(Internal_Notes(mid));
        dispatch(get_header_data_cms());
        dispatch(getCart(mid));
    }, [dispatch, Lmid]);

    const getCurrentDate = () => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const year = String(currentDate.getFullYear());
        return `${day}${month}${year}`;
    };

    const getCurrentTime = () => {
        const currentDate = new Date();
        const hours = String(currentDate.getHours()).padStart(2, "0");
        const minutes = String(currentDate.getMinutes()).padStart(2, "0");
        const seconds = String(currentDate.getSeconds()).padStart(2, "0");
        return `${hours}${minutes}${seconds}`;
    };

    const facebookLogin = async (response) => {
        const details = {
            email: response.data.email,
            first_name: response.data.first_name,
            id: response.data.id,
            last_name: response.data.last_name,
            name: `${response.data.first_name}_${response.data.last_name}${getCurrentDate()}${getCurrentTime()}`
        }
        try {
            const response = await axios({
                method: "post",
                url: `${url3}/registerFacebook`,
                data: JSON.stringify(details),
                headers: {
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            })
                .then(async (response) => {
                    Cookies.set("mid", response.data.mid);
                    setResultr("Facebook Logged");
                    setResult('success');
                    navigate("/account");
                    window.location.reload();
                })
        } catch (error) {
            console.log("Not submitting data");
        }
    }

    const memData = useSelector((state) => state.userDetails.LoggedMember);
    const notificationData = useSelector((state) => state.userDetails.Internal_Notes);
    const preData = useSelector((state) => state.userDetails.get_header_data_cms)
    const getallcart = useSelector((state) => state.userDetails.getCart);

    useEffect(() => {
        const count = notificationData.filter((data) => data.readed == false);
        setRcount(count.length);
    }, [notificationData])

    const handleReaded = async () => {
        const formData = new FormData();
        formData.append('mid', mid);
        await dispatch(NotificationRead(formData));
        setTimeout(() => {
            dispatch(Internal_Notes(mid));
        }, 500);
    }
    const getVerified = async (mid) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url3}/verify_member_client?mid=${mid}`,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
                // headers: {
                //     "Content-Type": "application/json",
                // },
            });
            console.log(response);
            let signupClose = document.getElementById('signupClose');
            let verifyButton = document.getElementById('verifyButton');
            playAudio();
            signupClose.click();
            verifyButton.click();
        }
        catch (err) {
            console.log(err);

        };
    }
    const [loadspin, setloadspin] = useState(false);
    const [errorSign, setErrorSign] = useState(null);
    const handleButtonClick = async (event) => {
        if (loadspin !== true) {
            setloadspin(true);
            setErrorSign(null);
            event.preventDefault();
            const formData = new FormData();
            formData.append("uname", Rfname);
            formData.append("pwd", Rpass);
            formData.append("email", Remail);
            formData.append("phn", Rnumber);
            try {
                const response = await axios({
                    method: "post",
                    url: `${url3}/register_member`,
                    data: formData,
                    // headers: {
                    //     "Content-Type": "application/json",
                    // },
                });
                console.log(response);
                const ResponseMID = response.data.mid;
                await getVerified(ResponseMID);
                setloadspin(false)
            }
            catch (err) {
                console.log(err);
                setloadspin(false);
                setErrorSign(err.response.data.msg)
            };
        }
    }

    useEffect(() => {
        if (memData && memData.uname) {
            setLuname(memData.uname);
        }
    }, [memData]);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }
    let closeHead = () => {
        let topHead = document.querySelector('.top-head')
        topHead.classList.add('fadeOut');
        setTimeout(() => {
            topHead.style.display = 'none';
        }, 400);
    }
    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setloadspin(true);
        const formData = new FormData();
        formData.append("uname", loginUsername);
        formData.append("pwd", loginPassword);
        try {
            const response = await axios({
                method: "post",
                url: `${url3}/login_member`,
                data: formData,
                // headers: {
                //     "Content-Type": "application/json",
                // },
            })
                .then(async (response) => {
                    setLoginUsername("");
                    setLoginPassword("");
                    const token = response.data.jwt;
                    if (loginRemember == true) {
                        localStorage.setItem("jwt", token);
                        localStorage.setItem("mid", response.data.mid);
                    }
                    else {
                        Cookies.set("jwt", token);
                        Cookies.set("mid", response.data.mid);
                    }
                    setResultr("Login Successfull");
                    setResult('success');
                    navigate("/");
                    setloadspin(false);
                    window.location.reload();
                })
        }
        catch (err) {
            console.log(err);
            setResult(true);
            setResultr(err.response.data.msg);
            setloadspin(false);
        };

    }
    const [links, setLinks] = useState([]);
    useEffect(() => {
        if (preData && preData.nav_links && preData.nav_links.length > 0) {
            let newLinks = JSON.parse(preData.nav_links)
            console.log(newLinks);
            setLinks(newLinks);
        }
    }, [preData.nav_links])
    useEffect(() => {
        if (result == true) {
            let login = document.getElementById('Elogin');
            setTimeout(() => {
                login.style.transition = '0.5s';
                login.style.opacity = '0';
                login.style.scale = '0.9';
            }, 2000);
            setTimeout(() => {
                login.style.display = 'none';
                setResult(false)
            }, 3500);
        }
        if (result == 'success') {
            let login = document.getElementById('Slogin');
            setTimeout(() => {
                login.style.transition = '0.5s';
                login.style.opacity = '0';
                login.style.scale = '0.9';
            }, 2000);
            setTimeout(() => {
                login.style.display = 'none';
                setResult(false)
            }, 3500);
        }

    }, [result])



    return (
        <>
            {
                result == true ? (<>
                    <div style={{ zIndex: '9999' }} id="Elogin" className="alert m-5 Lalert alert-danger position-fixed end-0 top-0 alert-dismissible fade show" role="alert">
                        <strong>Login Failed !</strong>&ensp; {resultr}
                    </div>
                </>) : (<>
                </>)
            }
            {
                result == 'success' ? (<>
                    <div style={{ zIndex: '9999' }} id="Slogin" className="alert m-5 Lalert border-0 shadow-sm alert-success position-fixed end-0 top-0 alert-dismissible fade show" role="alert">
                        {resultr}
                    </div>
                </>) : (<>
                </>)
            }
            <div className='top-head py-2 text-white'>
                <div className='container px-lg-5 px-2'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>
                            Our Website uses cookies to improve your browsing experience.
                            <a className='fw-bold text-decoration-none text-white'> View our Cookie Policy</a>
                        </div>
                        <div>
                            <button className='btn-close btn-close-white' onClick={closeHead}></button>
                        </div>
                    </div>
                </div>
            </div>
            <header className='sticky-top bg-white'>
                <nav className='navbar container px-xl-5 px-2 navbar-expand-lg navbar-light '>
                    <button className='navbar-toggler' data-bs-toggle='collapse' data-bs-target='#main-nav' ><span className='navbar-toggler-icon'></span></button>
                    <NavLink onClick={handleClick} to='/' className='navbar-brand me-0'>
                        <div id="view3d">
                            <img src={preData.brand_logo} className='w-100' alt="GinGK" />
                        </div>
                    </NavLink>
                    {/* {memData && (
                        <NavLink to='/account' className="text-decoration-none">
                            <Avatar alt="Remy Sharp" sx={{ width: 50, height: 50 }} className='d-lg-none border border-success border-3' src={memData.pic_url} />
                        </NavLink>
                    )} */}
                    <div className='d-lg-none d-flex flex-row align-items-center'>

                        {localStorage.getItem('mid') || Cookies.get('mid') ? (
                            <div className="dropdown ">
                                <IconButton data-bs-toggle="dropdown" className='bell-cover' onClick={handleReaded}>
                                    <Badge badgeContent={Rcount ? Rcount : null} className='cursor-pointer text-white' color='themeColor'>
                                        <NotificationsIcon className='text-secondary bell' />
                                    </Badge>
                                </IconButton>
                                <div className="dropdown-menu dropdown-menu-end mt-2 p-2 notification" aria-labelledby="triggerId">
                                    {/* <h6 className="dropdown-header position-sticky top-0 bg-white z-3">Messages</h6> */}
                                    {notificationData.slice().reverse().map((item, index) => (
                                        <>
                                            {index > 0 && (
                                                <div className="dropdown-divider mx-2 opacity-50"></div>
                                            )}
                                            <div className="dropdown-item d-flex px-2 shadow-sm justify-content-between position-relative " style={{ fontSize: '14px', backgroundColor: item.readed == false ? '#c4ff7573' : '#f9f9f9', }} href="#">
                                                <div>
                                                    {item.msg}
                                                    {item.file_url && (<>
                                                        <br />
                                                        <div onClick={() => handleDownload(item.file_url)} className='text-theme cursor-pointer'>View Document</div>
                                                    </>)}
                                                    {/* {item.readed == false && (
                                <div className='position-absolute activet readed me-1 top-0 end-0 px-2 border bg-theme' onClick={() => setReaded(true)}>
                                <div style={{ display: 'grid', placeItems: 'center' }}><CheckIcon fontSize='small' className='text-white ' /></div>
                                </div>
                            )} */}
                                                </div>
                                                <div className='fs-7 ps-2 flex-shrink-0 text-end'>
                                                    <div>{item.date}</div>
                                                    <div>{item.time}</div>
                                                </div>
                                            </div >
                                        </>
                                    ))}
                                </div>
                            </div>) : (null)}
                        {localStorage.getItem('mid') || Cookies.get('mid') ? (
                            <NavLink onClick={handleClick} to='cart'>
                                <IconButton className='mx-1 me-3'>
                                    <Badge badgeContent={getallcart ? getallcart.length : null} className='cursor-pointer p-1 text-white' color='themeColor'>
                                        <i className="fa-solid fa-cart-shopping text-secondary mt-1 fs-6"></i>
                                    </Badge>
                                </IconButton>
                            </NavLink>
                        ) : null}

                        {localStorage.getItem('mid') || Cookies.get('mid') ? (
                            <NavLink to='/account' className="text-decoration-none">
                                <Avatar alt="Remy Sharp" sx={{ width: 50, height: 50 }} className='border border-success border-3' src={memData.pic_url} />
                            </NavLink>
                        ) : (
                            <Button color="themeColor" variant='outlined' data-bs-toggle='modal' data-bs-target='#login-modal' className='text-capitalize rounded-0 border-2'>LogIn / SignUp</Button>
                        )}

                    </div>
                    <div className='navbar-collapse collapse ' id='main-nav'>
                        <ul className='navbar-nav mx-auto'>
                            {links && links.length > 0 ? links.map((item, index) => (
                                <>
                                    {item.link == '/homeservice' ? (
                                        <li className="nav-item dropdown px-xl-2 activet px-xxl-4">
                                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {item.name}
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li><NavLink onClick={handleClick} to='/prodcat_hsm' className="dropdown-item">Product</NavLink></li>
                                                <li><NavLink onClick={handleClick} to='/servcat_hsm' className="dropdown-item">Service</NavLink></li>
                                            </ul>
                                        </li>
                                    ) : (
                                        <li key={index} className='nav-item px-xl-2 activet px-xxl-4'>
                                            <NavLink onClick={handleClick} to={item.link} className='nav-link'>{item.name}</NavLink>
                                        </li>
                                    )}
                                </>
                            )) : null}
                        </ul>
                    </div>
                    <div className='d-lg-flex d-none flex-row align-items-center'>

                        {localStorage.getItem('mid') || Cookies.get('mid') ? (
                            <div className="dropdown ">
                                <IconButton data-bs-toggle="dropdown" className='bell-cover' onClick={handleReaded}>
                                    <Badge badgeContent={Rcount ? Rcount : null} className='cursor-pointer text-white' color='themeColor'>
                                        <NotificationsIcon className='text-secondary bell' />
                                    </Badge>
                                </IconButton>
                                <div className="dropdown-menu dropdown-menu-end mt-2 p-2 notification" aria-labelledby="triggerId">
                                    {/* <h6 className="dropdown-header position-sticky top-0 bg-white z-3">Messages</h6> */}
                                    {notificationData.slice().reverse().map((item, index) => (
                                        <>
                                            {index > 0 && (
                                                <div className="dropdown-divider mx-2 opacity-50"></div>
                                            )}
                                            <div className="dropdown-item d-flex px-2 shadow-sm justify-content-between position-relative " style={{ fontSize: '14px', backgroundColor: item.readed == false ? '#c4ff7573' : '#f9f9f9', }} href="#">
                                                <div>
                                                    {item.msg}
                                                    {item.file_url && (<>
                                                        <br />
                                                        <div onClick={() => handleDownload(item.file_url)} className='text-theme cursor-pointer'>View Document</div>
                                                    </>)}
                                                    {/* {item.readed == false && (
                                                        <div className='position-absolute activet readed me-1 top-0 end-0 px-2 border bg-theme' onClick={() => setReaded(true)}>
                                                        <div style={{ display: 'grid', placeItems: 'center' }}><CheckIcon fontSize='small' className='text-white ' /></div>
                                                        </div>
                                                    )} */}
                                                </div>
                                                <div className='fs-7 ps-2 flex-shrink-0 text-end'>
                                                    <div>{item.date}</div>
                                                    <div>{item.time}</div>
                                                </div>
                                            </div >
                                        </>
                                    ))}
                                </div>
                            </div>) : (null)}
                        {localStorage.getItem('mid') || Cookies.get('mid') ? (
                            <NavLink onClick={handleClick} to='cart'>
                                <IconButton className='mx-1 me-3'>
                                    <Badge badgeContent={getallcart ? getallcart.length : null} className='cursor-pointer p-1 text-white' color='themeColor'>
                                        <i className="fa-solid fa-cart-shopping text-secondary mt-1 fs-6"></i>
                                    </Badge>
                                </IconButton>
                            </NavLink>
                        ) : null}

                        {localStorage.getItem('mid') || Cookies.get('mid') ? (
                            <NavLink to='/account' className="text-decoration-none">
                                <Avatar alt="Remy Sharp" sx={{ width: 50, height: 50 }} className='border border-success border-3' src={memData.pic_url} />
                            </NavLink>
                        ) : (
                            <Button color="themeColor" variant='outlined' data-bs-toggle='modal' data-bs-target='#login-modal' className='text-capitalize rounded-0 border-2'>LogIn / SignUp</Button>
                        )}

                    </div>
                </nav>
            </header >

            <div className="modal fade" id="login-modal" >
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered " role="document">
                    <div className="modal-content rounded-0">
                        <div className="modal-header border-0">
                            <h5 className="modal-title w-100 text-center" id="modalTitleId">
                                <img src={logo} width='120' alt="GinGK" />
                            </h5>
                            <button type="button" className="btn-close-red" data-bs-dismiss="modal"><i className="fa-solid fa-xmark"></i></button>
                        </div>
                        <div className="modal-body">
                            <div className='p-3'>
                                <input type="text" onChange={(e) => setLoginUsername(e.target.value)} className='form-control rounded-0 ps-sm-4' placeholder='Username or Email' />
                                <input type="password" onChange={(e) => setLoginPassword(e.target.value)} className='form-control mt-3 rounded-0 ps-sm-4' placeholder='Password' />
                                <div className='d-flex justify-content-between align-items-center my-2'>
                                    <div>
                                        <input type="checkbox" onChange={(e) => setLoginRemember(e.target.checked)} id="cbx" />
                                        <label htmlFor="cbx" className="check">
                                            <svg width="18px" height="18px" viewBox="0 0 18 18">
                                                <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
                                                <polyline points="1 9 7 14 15 4"></polyline>
                                            </svg>
                                        </label>
                                        <label htmlFor="cbx">
                                            <span className='ms-2 fs-7'>Remember me</span>
                                        </label>
                                    </div>
                                    <div className='text-theme fs-7 cursor-pointer' data-bs-target='#fpass-modal' data-bs-toggle='modal'>
                                        Forgot Password?
                                    </div>
                                </div>

                                <Button variant='contained' color='themeColor' onClick={(event) => handleLoginSubmit(event)} className='text-capitalize my-3 w-100 text-white rounded-0 shadow-none' size='large'>
                                    {loadspin == true ? (
                                        <div className="spinner-border text-white" role="alert"></div>
                                    ) : ("Login")}
                                </Button>

                                <div className='border-1 mt-4 border-top'></div>
                                <div className='px-3 py-2 or bg-white mx-auto'>OR</div>
                                <LoginSocialFacebook
                                    appId="1383416062528225"
                                    onResolve={async (response) => {
                                        console.log(response);
                                        facebookLogin(response);
                                    }}
                                    onReject={(error) => {
                                        console.log(error);
                                    }}
                                >
                                    <FacebookLoginButton className='d-none fc-button' />
                                </LoginSocialFacebook>
                                <Button variant='contained' onClick={() => {
                                    document.querySelector(".fc-button").click();
                                }} color='primary' className='text-capitalize my-3 w-100 text-white rounded-0 shadow-none' size='large'>
                                    <div className='fblogin-icon bg-white rounded-circle'>
                                        <i className="fa-brands fa-facebook-f text-primary"></i>
                                    </div>
                                    Login with Facebook</Button>
                                <div className='text-center fs-6'>
                                    Don't have an account? <span className='text-theme cursor-pointer' data-bs-target='#signup-modal' data-bs-toggle='modal'>Sign up</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="signup-modal" >
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered " role="document">
                    <div className="modal-content rounded-0">
                        <div className="modal-header border-0">
                            <h5 className="modal-title w-100 text-center" id="modalTitleId">
                                <img src={logo} width='120' alt="GinGK" />
                            </h5>
                            <button type="button" id='signupClose' className="btn-close-red" data-bs-dismiss="modal"><i className="fa-solid fa-xmark"></i></button>
                        </div>
                        <div className="modal-body">
                            <div className='p-3'>
                                <input type="text" required onChange={(event) => { setRfname(event.target.value) }} className='form-control mt-2  rounded-0 ps-sm-4' placeholder='User Name' />

                                <input type="email" required onChange={(event) => { setRemail(event.target.value) }} className='form-control mt-2  rounded-0 ps-sm-4' placeholder='E-mail' />
                                <input type="password" required onChange={(event) => { setRpass(event.target.value) }} className='form-control mt-2 rounded-0 ps-sm-4' placeholder='Password' />
                                <input type="number" required onChange={(event) => { setRnumber(event.target.value) }} className='form-control mt-2 rounded-0 ps-sm-4' placeholder='Mobile Number' />

                                <Button variant='contained' color='themeColor'
                                    onClick={handleButtonClick}
                                    className='text-capitalize mt-3 w-100 text-white rounded-0 shadow-none' size='large'>
                                    {loadspin == true ? (
                                        <div className="spinner-border text-white" role="alert"></div>
                                    ) : ("Sign Up")}
                                </Button>
                                <div className='text-danger mt-1 text-end'>{errorSign}</div>
                                <div className='border-1 mt-4 border-top'></div>
                                <div className='px-3 py-2 or bg-white mx-auto'>OR</div>
                                <Button variant='contained' color='primary' onClick={() => {
                                    document.querySelector(".fc-button").click();
                                }} className='text-capitalize my-3 w-100 text-white rounded-0 shadow-none' size='large'>
                                    <div className='fblogin-icon bg-white rounded-circle'>
                                        <i className="fa-brands fa-facebook-f text-primary"></i>
                                    </div>
                                    Login with Facebook</Button>
                                <div className='text-center fs-6'>
                                    Already have an account? <span className='text-theme cursor-pointer' data-bs-target='#login-modal' data-bs-toggle='modal'>Login</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id='verifyButton' data-bs-toggle='modal' data-bs-target='#verify-complete'></div>
            <div className="modal fade" id="verify-complete" >
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered " role="document">
                    <div className="modal-content rounded-0">
                        <div className="modal-body mt-3">
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                            <h4 className='text-center pt-3'>Verification link has been sent to your email</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="fpass-modal" >
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered " role="document">
                    <div className="modal-content rounded-0">
                        <div className="modal-header border-0">
                            <h5 className="modal-title w-100 text-center" id="modalTitleId">
                                <img src={logo} width='120' alt="GinGK" />
                            </h5>
                            <button type="button" className="btn-close-red" data-bs-dismiss="modal"><i className="fa-solid fa-xmark"></i></button>
                        </div>
                        <div className="modal-body">
                            <div className='px-3'>
                                <label className='fs-5'>Forgot Password</label>
                                <input type="text" className='form-control rounded-0 ps-sm-4 mt-3' placeholder='Email address' />
                                <Button variant='contained' color='themeColor' data-bs-dismiss='modal' className='text-capitalize mt-3 w-100 text-white rounded-0 shadow-none' size='large'>Submit</Button>
                                <Button variant='contained' color='inherit' data-bs-toggle='modal' className='text-capitalize my-3 w-100 text-danger rounded-0 shadow-none' fullWidth data-bs-target='#login-modal' size='large'>Login</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default Header;