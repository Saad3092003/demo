import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { red, pink } from '@mui/material/colors';
import { Button, Checkbox, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { AddView, MarketplaceAllListing, VeiwMember, getLikedArray, sendMessage } from '../../handleSlice';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import MarketPlaceSlider from '../../components/MarketPlaceSlider';
import Offer from '../../components/Offer';
import { useDispatch, useSelector } from "react-redux";
import SendIcon from '@mui/icons-material/Send';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import io from "socket.io-client";
import { url1, url3, url4 } from '../../components/port';



function MarketplaceDetail({ loadScreen, setalertStatus, setalertText, setalertmode }) {

    const location = useLocation();
    const params = useParams();
    const seoData = useSelector((state) => state.userDetails.getHomePage_cms_meta)
    const [MData, setMData] = useState({});
    const [socket, setSocket] = useState(null);
    const [message, setMessage] = useState('');

    let mid = localStorage.getItem('mid') || Cookies.get('mid');
    const [loadspin, setloadspin] = useState(false);
    let lid = params.id;
    console.log(mid)

    const memData = useSelector((state) => state.userDetails.LoggedMember);
    const sender_name = memData.uname;
    // useEffect(() => {
    //     if (socket !== null) {
    //         const handleReceiveMessage = async () => {
    //             try {
    //                 const response = await axios({
    //                     method: "get",
    //                     url: `http://139.59.236.50:5552/get_chats_listing?mid=${mid}&lid=${lid}`,
    //                     headers: {
    //                         "Content-Type": "application/json",

    //                     },
    //                 });
    //                 console.log(response.data.chat_messages);
    //                 setChats(response.data.chat_messages)
    //                 setTimeout(() => {
    //                     handlescrollchat();
    //                 }, 500);

    //             }
    //             catch (error) {
    //                 console.log(error);
    //             }
    //             console.log("Received message");
    //         };
    //         socket.on("receive_message", handleReceiveMessage);
    //     }
    // }, [socket])
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }
    const socketConnect = () => {
        const socketinit = io.connect("https://ws.devcorps.in");
        setSocket(socketinit);
        socketinit.on("receive_message", async () => {
            handleChatClick(mid, lid);

        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (loadspin !== true) {
            setloadspin(true);
            const formData = new FormData();
            formData.append("sender_mid", MData.seller_id);
            formData.append("lid", lid);
            formData.append("msg", message);
            formData.append("mid", mid)
            // loadScreen(true);
            await dispatch(sendMessage({ formData }));
            handleChatClick(mid, lid);
            // loadScreen(false);
            socket.emit("send_message");
            setMessage('')
            setTimeout(() => {
                handlescrollchat();
            }, 500);
            setloadspin(false);
            // window.location.reload();
        }
    };
    const [memDetails, setMemDetails] = useState('');

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        prevArrow: (
            <div className="custom-prev-arrow">
                <button className='rounded-pill btn btn-light home-slide-btn'>
                    <i className="fa-solid fa-arrow-left-long"></i>
                </button>
            </div>
        ),
        nextArrow: (
            <div className="custom-next-arrow">
                <button className='rounded-pill btn btn-light home-slide-btn'>
                    <i className="fa-solid fa-arrow-right-long"></i>
                </button>
            </div>
        ),
        responsive: [
            {
                breakpoint: 767.5,
                settings: {
                    arrows: false,
                }
            }
        ],
    };
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUserData = async () => {
            const formData = new FormData();
            formData.append("mid", mid);
            formData.append("pid", lid);

            loadScreen(true);
            await dispatch(MarketplaceAllListing());
            await dispatch(AddView(formData));
            await dispatch(getLikedArray(mid));
            const fetchListingDetails = async () => {
                try {
                    const response = await axios.get(`${url1}/getlisting_mpm?lid=${lid}`, {
                        headers: {
                            "API-KEY": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                        },
                    });
                    const product = response.data.data;
                    console.log(product);

                    setMData(product);
                    try {
                        const response = await axios.get(`${url1}/viewmember_crm?mid=${product.seller_id}`, {
                            headers: {
                                "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                            },
                        });
                        setMemDetails(response.data.member);
                    } catch (error) {
                        console.log("Not submitting data");
                        console.log(error);
                    }
                    //    settagArray(product.tags[0].split(',')) ;

                }
                catch (error) {
                    // console.log(csrfToken)
                    console.log("Not submitting data");
                }
            }
            fetchListingDetails();

            loadScreen(false);
        };
        fetchUserData();
    }, [dispatch]);
    const marketplaceAllListings = useSelector(
        (state) => state.userDetails.marketplaceAllListings
    );


    const handlescrollchat = () => {
        if (document.getElementById('MDetail-chat')) {
            let chatscroll = document.getElementById('MDetail-chat');
            chatscroll.scrollTo(0, chatscroll.scrollHeight);
            console.log('scroll');
        }
    }

    const handleChatClick = async (mid, lid) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url3}/get_chats_listing?mid=${mid}&lid=${lid}`,
                headers: {
                    "Content-Type": "application/json",

                },
            });
            console.log(response.data.chat_messages);
            setChats(response.data.chat_messages)
            setTimeout(() => {
                handlescrollchat();
            }, 500);

        }
        catch (error) {
            console.log(error);
        }
    }
    const [chats, setChats] = useState([]);

    console.log(chats);
    console.log(MData.seller_id == mid);

    const handleShare = () => {

        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setalertmode('success')
        setalertText('Link Copied');
        setalertStatus(true);
    }

    const handleStartMsg = async (msg) => {
        if (loadspin !== true) {
            setloadspin(true);
            const formData = new FormData();
            formData.append("sender_mid", MData.seller_id);
            formData.append("lid", lid);
            formData.append("msg", msg);
            formData.append("mid", mid)
            // loadScreen(true);
            await dispatch(sendMessage({ formData }));
            // loadScreen(false);
            setMessage('')
            handleChatClick(mid, lid);
            setTimeout(() => {
                handlescrollchat();
            }, 500);
            setloadspin(false);
            // window.location.reload();
        }
    }
    const likedProducts = useSelector((state) => state.userDetails.getLikedArray)
    console.log(likedProducts);
    const handleLikeClicked = async (pid) => {
        if (likedProducts?.lid?.includes(pid)) {
            const mid = localStorage.getItem('mid') || Cookies.get('mid');
            const formData = new FormData();
            formData.append("mid", mid);
            formData.append("lid", pid);
            try {
                const response = await axios({
                    method: "delete",
                    url: `${url4}/api/unlike-lid`,
                    data: formData,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                    },
                });
                console.log(response);
                // dispatch(getCart(mid));

                dispatch(getLikedArray(mid));
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            const mid = localStorage.getItem('mid') || Cookies.get('mid');
            const formData = new FormData();
            formData.append("mid", mid);
            formData.append("lid", pid);
            try {
                const response = await axios({
                    method: "post",
                    url: `${url4}/api/like-lid`,
                    data: formData,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                    },
                });
                console.log(response);
                // dispatch(getCart(mid));

                dispatch(getLikedArray(mid))
            }
            catch (error) {
                console.log(error);
            }
        }

    }

    return (
        <>
            <Helmet>
                <title>{seoData.metaTitle}</title>
                <meta name="description" content={seoData.metaDesc} />
                <meta name="robots" content={seoData.metaKey} />
                <meta property="og:image" content={seoData.metaImage} />
            </Helmet>
            {MData.seller_id == mid ? (null) : (
                <div className="modal fade" id="chatModal" >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Chat</h5>
                                <button type="button" className="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body overflow-auto " id='MDetail-chat'>
                                <div className='chatbox'>
                                    {chats && chats.length > 0 ? chats.map((item, index) => (
                                        <>
                                            {MData.seller_id == item.mid ? (
                                                <div>
                                                    <div style={{ maxWidth: '75%', width: 'fit-content' }} className='p-2 bg-dark text-white rounded-3'>
                                                        {item.msg}
                                                    </div>
                                                    <div className='fs-7 text-secondary'>
                                                        {item.time} / {item.date}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className='text-end'>
                                                    <div style={{ maxWidth: '75%', width: 'fit-content' }} className='ms-auto p-2 bg-theme text-white rounded-3'>
                                                        {item.msg}
                                                    </div>
                                                    <div className='fs-7 text-secondary'>
                                                        {item.time} / {item.date}
                                                    </div>
                                                </div>
                                            )}
                                        </>
                                    )) : (<div className='d-flex justify-content-center align-items-center'>
                                        <div className='d-flex flex-wrap gap-2'>
                                            <Button variant='contained' onClick={() => handleStartMsg('Hi, is this still available?')} className='shadow-none rounded-0 text-dark bg-light2 mt-2'>Hi, is this still available?</Button>
                                            <Button variant='contained' onClick={() => handleStartMsg('Is the price negotiable?')} className='shadow-none rounded-0 text-dark bg-light2 mt-2'>Is the price negotiable?</Button>
                                            <Button variant='contained' onClick={() => handleStartMsg('Can I see more photos?')} className='shadow-none rounded-0 text-dark bg-light2 mt-2'>Can I see more photos?</Button>
                                        </div>
                                    </div>)}
                                </div>
                            </div>
                            <div className="modal-footer px-2 py-1 mt-3">
                                <div className="input-group ">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Send message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    <span className="input-group-text bg-theme activet cursor-pointer" id="input1">
                                        {loadspin == true ? (
                                            <div className="spinner-border spinner-border-sm text-white" role="alert"></div>
                                        ) : (
                                            <SendIcon className='text-white' onClick={handleSubmit} />
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='container py-4'>
                <div className="d-flex gap-1 text-secondary my-3">
                    <Link to='/' className='nav-link'>Home</Link>
                    <NavigateNextIcon />
                    <Link to='/marketplace' className='nav-link'>MarketPlace</Link>
                    <NavigateNextIcon />
                    <siv className='nav-link'>{MData.title}</siv>
                </div>
                <div className='row g-4 mt-3'>
                    <div className="col-lg-8" data-aos='fade-right'>
                        <div className='position-relative'>
                            <Slider {...settings} className='home-slide' >
                                {MData.slider_photos ? MData.slider_photos.map((item, index) => (<>
                                    <img src={item} className='img-fluid object-fit-cover slider-img w-100' />
                                </>)) : (<><h1 className='text-secondary text-center m-5'>No Images Currently</h1></>)}
                            </Slider>

                            <div className='position-absolute top-0 start-0 w-100 h-100'>
                                <div className='d-flex justify-content-end p-4'>
                                    <div className='d-flex gap-3'>
                                        <div onClick={handleShare}>
                                            <IconButton size='small' className='bg-white'>
                                                <ShareIcon />
                                            </IconButton>
                                        </div>
                                        <div>
                                            <Checkbox icon={<i className="fa-solid fa-heart "></i>} checkedIcon={<i className="fa-solid fa-heart"></i>}
                                                checked={likedProducts?.lid?.includes(MData.lid)}
                                                onChange={() => handleLikeClicked(MData.lid)}
                                                sx={{
                                                    color: 'white',
                                                    backgroundColor: 'grey',
                                                    '&.Mui-checked': {
                                                        backgroundColor: red['A700'],
                                                        color: 'white',
                                                    },
                                                }} />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex gap-3 mt-2 flex-wrap flex-md-nowrap w-100 justify-content-between' data-aos='zoom-in'>
                            <h3 className='mb-0'>{MData.service_name}</h3>
                            <div className="d-flex gap-2 justify-content-center justify-content-sm-start"><a href="/" className="text-decoration-none"><div className="social-icon bg-primary"><i className="fa-brands fa-facebook-f text-white"></i></div></a><a href="/" className="text-decoration-none"><div className="social-icon bg-info"><i className="fa-brands fa-twitter text-white"></i></div></a><a href="/" className="text-decoration-none"><div className="social-icon bg-danger"><i className="fa-brands fa-instagram text-white"></i></div></a></div>
                        </div>
                    </div>
                    <div className="col-lg-4" data-aos='fade-left' data-aos-duration='1000'>
                        <div className='border-success border p-4'>
                            <div className='d-flex mx-3 gap-2 align-items-center sliderProfile '>
                                <div><img className='shadow-sm ' src={memDetails.pic_url} alt={memDetails.uname} /></div>
                                <div className='lh-sm'>
                                    <h5 className='mb-0'>{memDetails.uname}</h5>
                                    <div className='d-flex gap-2 align-items-center'>

                                    </div>
                                </div>
                            </div>
                            {MData.seller_id == mid ? (null) : mid ? (
                                <>
                                    {memData.kyc_status == "Verified" ? (
                                        <div className='mt-3'>
                                            {MData.stock > 0 ? (
                                                <Button data-bs-target="#chatModal" data-bs-toggle="modal" fullWidth variant='contained' color='themeColor' className='shadow-none rounded-0 text-white fw-bold '
                                                    onClick={() => { handleChatClick(mid, lid); socketConnect(); }}>Chat Now</Button>
                                            ) : (
                                                <>
                                                    <Button data-bs-target="#chatModal" data-bs-toggle="modal" disabled fullWidth variant='contained' color='themeColor' className='shadow-none rounded-0 text-white fw-bold '>Chat Now</Button>
                                                    <div className='text- mt-1 badge bg-danger'>Out of stock</div>
                                                </>
                                            )}
                                        </div>
                                    ) : (
                                        <Link to="/account">
                                            <Button data-bs-target="#chatModal" fullWidth variant='contained' color='warning' className='shadow-none rounded-0 text-white fw-bold mt-3'>Complete KYC First <OpenInNewIcon className='ms-2' fontSize='small' /></Button>
                                        </Link>
                                    )}
                                </>
                            ) : (
                                <Button color="themeColor" variant='contained' fullWidth data-bs-toggle='modal' data-bs-target='#login-modal' className='text-capitalize rounded-0 mt-3 text-white border-2'>LogIn / SignUp</Button>

                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <h2 data-aos='fade-up' className='text-danger my-2 '>
                        <div>S$ {MData.price}</div>
                    </h2>
                    <div className='fs-5 text-dark'>{MData.stock > 0 ? (<>Stock: <span className='text-theme'> {MData.stock} </span></>) : (<span className='text-danger'>Out of stock</span>)}</div>
                    <h4 data-aos='fade-up' className='mt-2'>Description</h4>
                    <p data-aos='fade-up' className='text-secondary'>
                        {MData.description}
                    </p>
                </div>
                <div className='my-4' data-aos='fade-up'>
                    <h4>Service area(s)</h4>
                    <div className="d-flex gap-2 align-items-center">
                        <LocationOnIcon /> <p className='text-secondary fs-5 my-0'>{MData.service_area}</p>
                    </div>
                </div>

                <div className='py-4'>
                    <div className='d-flex justify-content-between mb-4'>
                        <h3>Similar listings</h3>
                        <div className='fs-5'>
                            <Link className='text-theme text-decoration-none'>View More <ArrowRightAltIcon fontSize='large' /></Link>
                        </div>
                    </div>
                    <MarketPlaceSlider page='detail' sliderContent={marketplaceAllListings.filter(item => item.category === MData.category).filter(item => item.lid !== MData.lid)} />
                </div>
            </div>
            <Offer />
        </>
    )
}
export default MarketplaceDetail;
