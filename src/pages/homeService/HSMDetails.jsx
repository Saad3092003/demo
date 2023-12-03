import React, { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { red, pink } from '@mui/material/colors';
import { Button, Checkbox, IconButton } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import phoneimg from './images/call-outline.svg';
import emailimg from './images/mail-open-outline.svg';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import messageimg from './images/chatbubble-ellipses-outline.svg';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import PhoneForwardedOutlinedIcon from '@mui/icons-material/PhoneForwardedOutlined';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NavLink } from 'react-router-dom';
import Offer from '../../components/Offer';
import { HSM_allProduct, addbooking_hsm, getCart, AddToCart_hsm, HSM_Product_seo, checkcart, AddView, getLikedArray, getreviews_hsm, getreviews_bypid, getContactPage_cms } from '../../handleSlice';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import HsmSlider from '../../components/HsmSlider';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { url1, url4 } from '../../components/port';

function HSMDetails({ loadScreen, setalertStatus, setalertText, setalertmode }) {
    const location = useLocation();
    const params = useParams();
    const pid = params.id;
    const [HData, setHData] = useState({});
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


    const [imagePreview, setImagePreview] = useState(null);
    const [imagePreview1, setImagePreview1] = useState(null);
    const [imagePreview2, setImagePreview2] = useState(null);
    const [siteAddress, setSiteAddress] = useState('');
    const [contactPer, setContactPer] = useState('')
    const [selectDate, setSelectDate] = useState(null)
    const [selectTime, setSelectTime] = useState(null);
    const [desc, setDesc] = useState('');
    const [tagArray, settagArray] = useState([]);


    const handleSiteAddressChange = (event) => {
        setSiteAddress(event.target.value);
    };
    const handleContactPerChange = (event) => {
        setContactPer(event.target.value);
    };
    const handleSelectDateChange = (date) => {
        setSelectDate(date);
    };
    const handleSelectTimeChange = (time) => {
        const formattedTime = dayjs(time).format('HH:mm');
        console.log(formattedTime);
        setSelectTime(formattedTime);
    };
    const handleDescChange = (event) => {
        setDesc(event.target.value);
    };


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImagePreview(file);
    };

    const handleImageRemove = () => {
        setImagePreview(null);
    };

    const handleImageChange1 = (event) => {
        const file = event.target.files[0];
        setImagePreview1(file);
    };

    const handleImageRemove1 = () => {
        setImagePreview1(null);
    };

    const handleImageChange2 = (event) => {
        const file = event.target.files[0];
        setImagePreview2(file);
    };

    const handleImageRemove2 = () => {
        setImagePreview2(null);
    };
    const dispatch = useDispatch();

    const Lmid = Cookies.get('mid') || localStorage.getItem('mid');

    const memData = useSelector((state) => state.userDetails.LoggedMember);
    console.log(memData);
    let mid = memData.mid

    useEffect(() => {
        const fetchUserData = async () => {
            const formData = new FormData();
            formData.append("mid", mid);
            formData.append("pid", pid);
            loadScreen(true);
            await dispatch(HSM_allProduct());
            await dispatch(checkcart({ mid, pid }));
            await dispatch(AddView(formData));
            await dispatch(getreviews_bypid(pid))
            await dispatch(HSM_Product_seo({ pid: pid }))
            // await dispatch(getreviews_hsm());
            const fetchProductDetails = async () => {
                try {
                    const response = await axios.get(`${url1}/getProduct_hsm?pid=${pid}`, {
                        headers: {
                            "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                        },
                    });
                    const product = response.data.product;
                    console.log(product);

                    setHData(product);
                    settagArray(product.tags[0].split(','));
                    console.log(HData);
                }
                catch (error) {
                    // console.log(csrfToken)
                    console.log("Not submitting data");
                }
            }
            fetchProductDetails();
            loadScreen(false);
        };
        fetchUserData();
    }, [dispatch]);



    let homeServiceDetails = useSelector(
        (state) => state.userDetails.hsm_allproducts
    );

    // let hsmReviews = useSelector(
    //     (state) => state.userDetails.getreviews_hsm
    // );
    let productReviews = useSelector(
        (state) => state.userDetails.getreviews_bypid
    );

    useEffect(() => {
        dispatch(getLikedArray(Lmid))
        dispatch(getContactPage_cms());
    }, [dispatch])

    const likedProducts = useSelector((state) => state.userDetails.getLikedArray)
    console.log(likedProducts);
    const handleLikeClicked = async (pid) => {
        if (likedProducts?.pid?.includes(pid)) {
            const mid = localStorage.getItem('mid') || Cookies.get('mid');
            const formData = new FormData();
            formData.append("mid", mid);
            formData.append("pid", pid);
            try {
                const response = await axios({
                    method: "delete",
                    url: `${url4}/api/unlike-pid`,
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
            formData.append("pid", pid);
            try {
                const response = await axios({
                    method: "post",
                    url: `${url4}/api/like-pid`,
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
    console.log(HData);



    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    useEffect(() => {
        console.log(siteAddress);
    }, [siteAddress])
    const [cartbtn, setcartbtn] = useState(false);
    const addToCart = async () => {
        setcartbtn(true);

        const formData = new FormData();
        formData.append("mid", memData.mid);
        formData.append("pid", HData.pid);

        await dispatch(AddToCart_hsm(formData));
        await dispatch(getCart(mid));
        setalertmode('success')
        setalertText('Added to Cart');
        setalertStatus(true);
        setcartbtn('added');
    }
    const handleShare = () => {

        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
    }
    const seoData = useSelector((state) => state.userDetails.HSM_Product_seo)
    const contactDetails = useSelector(
        (state) => state.userDetails.getContactPage_cms
    );
    let getallcart = useSelector((state) => state.userDetails.getCart);
    useEffect(() => {
        getallcart.forEach(element => {
            if (HData.pid == element.pid) {
                if (element.count >= 1) {
                    setcartbtn('added');
                }
            }
        });
    }, [getallcart, HData])
    const handleClickCart = () => {

        if (cartbtn !== 'added' && cartbtn !== true) {
            addToCart();
        }
    };
    const inputDateObj = new Date(selectDate);
    const year = inputDateObj.getFullYear();
    const month = (inputDateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDateObj.getDate().toString().padStart(2, '0');
    const formatted = `${year}-${month}-${day}`;

    const dataToSend = {

        HData: HData,
        siteAddress: siteAddress,
        contactPer: contactPer,
        selectDate: formatted,
        selectTime: selectTime,
        desc: desc,
        imagePreview: imagePreview,
        imagePreview1: imagePreview1,
        imagePreview2: imagePreview2,
    }

    return (
        <>
            <div className="modal fade" id="terms2-modal" >
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered " role="document">
                    <div className="modal-content rounded-0">
                        <div className="modal-header border-0">
                            <h2>Terms and Conditions</h2>
                            <button type="button" className="btn-close-red" data-bs-dismiss="modal"><i className="fa-solid fa-xmark"></i></button>
                        </div>
                        <div className="modal-body">
                            <div className=''>



                                <div>

                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus consequatur amet illo assumenda placeat fugit hic quas ducimus nisi sed, quis totam cum eligendi quos veniam itaque. Dignissimos, iusto velit?</p>

                                </div>
                            </div>




                            {/* <Button variant='contained' color='themeColor' data-bs-dismiss='modal' className='text-capitalize my-3 w-100 text-white rounded-0 shadow-none' size='large' onClick={handleModalSubmit}>Okay</Button> */}



                        </div>
                    </div>
                </div>
            </div>
            {seoData && (<>
                <Helmet>
                    <title>{seoData.metaTitle}</title>
                    <meta name="description" content={seoData.metaDesc} />
                    <meta name="robots" content={seoData.metaKey} />
                    <meta property="og:image" content={seoData.metaImage} />
                </Helmet>
            </>)}
            <div className='container py-3'>
                <div className="d-flex gap-1 text-secondary my-3">
                    <Link to='/' className='nav-link'>Home</Link>
                    <NavigateNextIcon />
                    <Link to={HData.item_category == 'servcat' ? ('/servcat_hsm') : ('/prodcat_hsm')} className='nav-link'>Home Service</Link>
                    <NavigateNextIcon />
                    <Link className='nav-link'>{HData.product_name}</Link>
                </div>

                <div className="row g-4">
                    <div className="col-lg-8">
                        {HData.item_category == 'servcat' && (
                            <div className='bg-light2 p-4 mb-4'>
                                <h4>Book Now</h4>
                                <form className='row g-3 p-2 mt-2' data-aos='fade-up' >
                                    <div className='col-sm-6'>
                                        <TextField variant='outlined' className='w-100 bg-white rounded-0' label='Site Address' value={siteAddress} onChange={handleSiteAddressChange} />
                                    </div>
                                    <div className='col-sm-6'>
                                        <TextField variant='outlined' className='w-100 bg-white rounded-0' label='Contact No.' type='number' value={contactPer} onChange={handleContactPerChange} />
                                    </div>
                                    <div className='col-sm-6'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['DatePicker']}>
                                                <DatePicker
                                                    className='w-100 bg-white rounded-0'
                                                    label="Select Date"
                                                    value={selectDate} // Value from the state
                                                    onChange={handleSelectDateChange} // Event handler to update the state
                                                />
                                            </DemoContainer>
                                        </LocalizationProvider>

                                    </div>
                                    <div className='col-sm-6'>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DemoContainer components={['TimePicker']}>
                                                <TimePicker className='w-100 bg-white rounded-0' label="Select Time" value={selectTime} onChange={handleSelectTimeChange} />
                                            </DemoContainer>
                                        </LocalizationProvider>
                                    </div>
                                    <div className='col-md-6'>
                                        <TextField
                                            id="outlined-multiline-static"
                                            label="Description"
                                            fullWidth
                                            className='bg-white'
                                            multiline
                                            rows={5}
                                            value={desc}
                                            onChange={handleDescChange}
                                        />
                                    </div>
                                    <div className='col-md-6'>
                                        <p className='mb-2'>Upload Photo/Video</p>
                                        <div className='d-flex gap-2 flex-wrap flex-sm-nowrap '>
                                            <div className='upload-img position-relative border-secondary t3 border'>
                                                <input
                                                    type="file"
                                                    id="imageInput"
                                                    style={{ display: 'none' }}
                                                    onChange={handleImageChange}
                                                />
                                                {!imagePreview ? (
                                                    <label htmlFor='imageInput' className='w-100 h-100 place-items-center d-grid cursor-pointer' >
                                                        <AddIcon fontSize='large' />
                                                    </label>
                                                ) : (
                                                    <>
                                                        <div className='position-absolute top-0 end-0 m-1 bg-danger cursor-pointer' style={{ lineHeight: 0 }} onClick={handleImageRemove}><CloseIcon className='text-white' /></div>
                                                        <img src={URL.createObjectURL(imagePreview)} className='img-fluid w-100 h-100 object-fit-cover' />
                                                    </>
                                                )}
                                            </div>
                                            <div className='upload-img position-relative border-secondary t3 border'>
                                                <input
                                                    type="file"
                                                    id="imageInput1"
                                                    style={{ display: 'none' }}
                                                    onChange={handleImageChange1}
                                                />
                                                {!imagePreview1 ? (
                                                    <label htmlFor='imageInput1' className='w-100 h-100 place-items-center d-grid cursor-pointer' >
                                                        <AddIcon fontSize='large' />
                                                    </label>
                                                ) : (
                                                    <>
                                                        <div className='position-absolute top-0 end-0 m-1 bg-danger cursor-pointer' style={{ lineHeight: 0 }} onClick={handleImageRemove1}><CloseIcon className='text-white' /></div>
                                                        <img src={URL.createObjectURL(imagePreview1)} className='img-fluid w-100 h-100 object-fit-cover' />
                                                    </>
                                                )}
                                            </div>
                                            <div className='upload-img position-relative border-secondary t3 border'>
                                                <input
                                                    type="file"
                                                    id="imageInput2"
                                                    style={{ display: 'none' }}
                                                    onChange={handleImageChange2}
                                                />
                                                {!imagePreview2 ? (
                                                    <label htmlFor='imageInput2' className='w-100 h-100 place-items-center d-grid cursor-pointer' >
                                                        <AddIcon fontSize='large' />
                                                    </label>
                                                ) : (
                                                    <>
                                                        <div className='position-absolute top-0 end-0 m-1 bg-danger cursor-pointer' style={{ lineHeight: 0 }} onClick={handleImageRemove2}><CloseIcon className='text-white' /></div>
                                                        <img src={URL.createObjectURL(imagePreview2)} className='img-fluid w-100 h-100 object-fit-cover' />
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-2">
                                        <label className='d-flex gap-2 align-items-center cursor-pointer'>
                                            <label class="booking">
                                                <input type="checkbox"
                                                    checked={isChecked}
                                                    onChange={handleCheckboxChange}
                                                />
                                                <svg viewBox="0 0 64 64" height="1rem" width="1rem">
                                                    <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" class="path"></path>
                                                </svg>
                                            </label>
                                            I agree to the  </label> <span data-bs-target="#terms2-modal"
                                                data-bs-toggle="modal" className='text-success fw-bold cursor-pointer d-inline'>
                                            Terms and Conditions
                                        </span>
                                    </div>
                                    {mid ? (
                                        <div className='col-12'>
                                            {isChecked == true ? (
                                                <Link to='/hsmCheckout' state={dataToSend}>  <Button variant='contained' color='themeColor' className='text-capitalize text-white shadow-none rounded-0 fw-bold' size='large' >Book a demo</Button> </Link>
                                            ) : (
                                                <Tooltip title="You need to accept Terms and Condition" followCursor>
                                                    <Button variant='contained' className='text-capitalize bg-secondary text-white shadow-none rounded-0 fw-bold' size='large' >Book a demo</Button>
                                                </Tooltip>
                                            )}
                                        </div>
                                    ) : (
                                        <div className='col-12'>
                                            <Button color="themeColor" variant='contained' data-bs-toggle='modal' data-bs-target='#login-modal' className='text-capitalize rounded-0 text-white border-2'>LogIn / SignUp</Button>
                                        </div>
                                    )}

                                </form>
                            </div>
                        )}
                        <div className="" data-aos='fade-up'>
                            <div className='position-relative'>
                                <Slider {...settings} className='home-slide' >
                                    {HData.gallery_images ? HData.gallery_images.map((item, index) => (<>
                                        <img src={item} className='img-fluid slider-img w-100' alt="" />
                                    </>)) : (<><h1 className='text-secondary text-center m-5'>No Images Currently</h1></>)}
                                </Slider>
                                <div className='position-absolute top-0 start-0 w-100 h-100'>
                                    <div className='d-flex justify-content-between p-4'>
                                        <div>
                                            <button className='btn btn-sm rounded-pill pill-rate me-3 z-1'>4.6<i className="fa-solid ms-1 fa-star text-white"></i> </button>
                                        </div>
                                        <div className='d-flex gap-3'>
                                            <div onClick={handleShare}>
                                                <IconButton size='small' className='bg-white'>
                                                    <ShareIcon />
                                                </IconButton>
                                            </div>
                                            <div>
                                                <Checkbox icon={<i className="fa-solid fa-heart "></i>} checkedIcon={<i className="fa-solid fa-heart"></i>}
                                                    checked={likedProducts?.pid?.includes(HData.pid)}
                                                    onChange={() => handleLikeClicked(HData.pid)}
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
                        </div>
                        <div className='py-3'>
                            <h3 className='my-3'>{HData.product_name}</h3>
                            {HData.quantity_pi == "0" && <span className='text-danger fw-bold'><h4>Out of Stock</h4></span>}
                            {Number(HData.quantity_pi) <= Number(HData.quantity_lsqw) && (HData.quantity_pi !== "") && (HData.quantity_pi !== "0") && <span className='text-danger fw-bold'><h4>Limited Stock Remaining !!</h4></span>}
                            <div className="d-flex gap-2">
                                {tagArray.map((items, index) => (
                                    <>
                                        <div key={index} data-aos='fade-right' data-aos-duration='1000' data-aos-delay={(index) * 200} className='bg-light2 px-3 py-2 rounded-pill'>
                                            {items}
                                        </div>
                                    </>
                                ))}
                            </div>
                            <h5 className='mt-3 '>
                                <span className='text-danger text-decoration-line-through'>S$ {HData.unit_price}</span>
                            </h5>
                            <div className='my-3'>

                                <div className='fs-4 fw-semibold' data-aos='fade-up'>S$ {HData.selling_price}</div>

                            </div>
                            <div className='my-3'>
                                <h5 data-aos='fade-down'>Description</h5>
                                {HData.short_desc}
                                <div className='text-secondary' data-aos='fade-up'>
                                    {HData.desc}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 d-flex flex-lg-column flex-column-reverse gap-2">
                        <div className='p-2 p-sm-3 px-sm-4  bg-black text-white' data-aos='fade-up' >
                            <h5>Connect With Us</h5>
                            <div className='d-flex gap-2 py-4 border-bottom'>
                                <div>
                                    <img src={phoneimg} width='40' />
                                </div>
                                <div>
                                    <div className='fs-7'>Mobile Number/Whatsapp</div>
                                    <div className='fw-bold lh-sm'>{contactDetails.contact_number}</div>
                                </div>
                            </div>
                            <div className='d-flex gap-2 py-4 border-bottom'>
                                <div>
                                    <img src={emailimg} width='40' />
                                </div>
                                <div>
                                    <div className='fs-7'>Email ID</div>
                                    <div className='fw-bold lh-sm'>{contactDetails.email}</div>
                                </div>
                            </div>
                            <div className='d-flex gap-2 py-4 pb-4'>
                                <div>
                                    <img src={messageimg} width='40' />
                                </div>
                                <div>
                                    <div className='fs-7'>Phone /SMS</div>
                                    <div className='fw-bold lh-sm'>{contactDetails.tel}</div>
                                </div>
                            </div>
                        </div>
                        {HData.item_category == 'prodcat' && HData.quantity_pi !== "0" && (
                            <>
                                <div className='p-3 bg-light2 text-center mt-3 shadow'>
                                    <div className="d-flex gap-3 justify-content-center align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                                        </svg>
                                        <h5 className="my-0">Add to Cart</h5>
                                    </div>
                                    <hr className='my-2' />
                                    {mid ? (
                                        <Button onClick={handleClickCart} variant='contained' color='themeColor' size='large' className='shadow-none text-white  fw-bold rounded-0 ' fullWidth>
                                            {cartbtn == false && (
                                                <div className='d-flex align-items-center gap-1'>
                                                    <AddIcon /> Add
                                                </div>
                                            )}
                                            {cartbtn == true && (
                                                <div className="spinner-border text-white" role="alert"></div>
                                            )}
                                            {cartbtn == 'added' && (
                                                <>
                                                    <CheckCircleIcon className='me-2' />  Added
                                                </>
                                            )}
                                        </Button>
                                    ) : (
                                        <Button color="themeColor" variant='contained' fullWidth data-bs-toggle='modal' data-bs-target='#login-modal' className='text-capitalize rounded-0 text-white border-2'>LogIn / SignUp</Button>
                                    )}
                                </div>
                            </>)}
                    </div>
                </div>
                {/* <div className='border border-end-0 border-start-0 py-4' data-aos='fade-up'>
                    <div className='flex-wrap d-flex gap-3 align-items-center'>
                        <div>
                            <img width='80' height='80' className='bg-light2 p-1 rounded-circle' src={memData.pic_url ? (memData.pic_url) : ('https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/480px-Placeholder_no_text.svg.png')} />
                        </div>
                        <div>
                            <div className="flex-wrap d-flex gap-3 align-items-center">
                                <h4 className=''>{memData.uname}</h4>
                                <div className='flex-wrap d-flex gap-1 align-items-center text-theme'>
                                    <VerifiedOutlinedIcon />
                                    <div>Verified</div>
                                </div>
                            </div>
                            <div className='flex-wrap d-flex gap-3 align-items-center'>
                                <div className='flex-wrap d-flex gap-2 align-items-center'>
                                    <AccessTimeOutlinedIcon color='info' />
                                    <div className='text-secondary'>Joined 5 years ago</div>
                                </div>
                                <div className='flex-wrap d-flex gap-2 align-items-center'>
                                    <PhoneForwardedOutlinedIcon color='info' />
                                    <div className='text-secondary'>Very Responsive</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> */}
                {/* <div className="mt-3" data-aos='fade-left' data-aos-duration='1000'>
                    <p className='fw-bold fs-5'>Write your review</p>
                    <div className='my-3'>
                        <TextField
                            label="Write your review"
                            fullWidth
                            className='bg-white'
                            multiline
                            rows={3}
                        />
                    </div>
                    <Button variant='contained' color='themeColor' className='shadow-none text-white fw-bold rounded-0' size='large'>Submit Review</Button>
                </div> */}
                <div className="py-4">
                    <h5 className='mb-0'>Reviews </h5>
                    <div className='d-flex gap-2 align-items-center'>

                        <span className='text-secondary'>({productReviews.length} Reviews)</span>
                    </div>
                </div>

                <div>
                    {productReviews.map((item, index) => (
                        <div key={index} data-aos='fade-up' data-aos-duration='800' className="py-sm-4 py-2 border border-bottom border-start-0 border-end-0 border-top-0">
                            <div className='d-flex justify-content-between'>
                                <div className='d-flex mx-3 gap-2 align-items-center RwProfile '>
                                    <div><img className='shadow-sm ' src={item.review_photo} alt={item.username} /></div>
                                    <div className='lh-sm'>
                                        <h6 className='mb-0'>{item.username}</h6>
                                        <div>
                                            {/* <StarIcon fontSize='small' className='text-theme' />
                                        <StarIcon fontSize='small' className='text-theme' />
                                        <StarIcon fontSize='small' className='text-theme' />
                                        <StarIcon fontSize='small' className='text-theme' /> */}

                                            {[...Array(item.rating)].map((_, index) => (
                                                <StarIcon fontSize='small' className='text-theme' />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className='text-secondary'>{item.product_name}</div>
                            </div>
                            <p className='text-secondary ms-md-5 ps-md-4 mt-2'>{item.review}. </p>
                        </div>
                    ))}

                    {/* <div className='py-4 text-center text-theme fs-5'> */}
                    {/* <Link className='text-theme text-decoration-none fw-bold'>Read all reviews <ArrowRightAltIcon fontSize='large' /></Link> */}
                    {/* </div> */}
                </div>
                <div data-aos='fade-up'>
                    <h4>Recommended For you</h4>
                    <HsmSlider homeServiceDetails={HData.item_category == 'servcat' ? homeServiceDetails.filter(item => item.item_category === 'servcat').filter(item => item.pid !== HData.pid) : homeServiceDetails.filter(item => item.item_category === 'prodcat').filter(item => item.pid !== HData.pid)} />
                </div>
            </div>
            <Offer></Offer>
        </>
    )
}
export default HSMDetails;