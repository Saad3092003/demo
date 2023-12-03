import React, { useState, useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import phoneimg from '../homeService/images/call-outline.svg';
import emailimg from '../homeService/images/mail-open-outline.svg';
import messageimg from '../homeService/images/chatbubble-ellipses-outline.svg';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import ShareIcon from '@mui/icons-material/Share';
import 'slick-carousel/slick/slick-theme.css';
import { Button, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { NavLink } from 'react-router-dom';
import Offer from '../../components/Offer';
import quatationimg from './images/Screenshot 2023-07-29 185935.png';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { AddView, LoggedMember, addbooking_showcase, allProjects, SM_Product_seo, get_Category } from '../../handleSlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import Cookies from 'js-cookie';
import Tooltip from '@mui/material/Tooltip';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { url1 } from '../../components/port';

const Action = ({
    pid,
    project_name,
    category,
    project_rate,
    rate_currency,
    project_details,
    project_subtitle,
    project_desc,
    project_sub_desc,
    thumbnail_photo,
    quatation_photo,
    slider_photos,
    sub_slider_photos,
    reviews,
}) => {
    const Navigate = useNavigate();
    const handleViewClick = () => {
        const data = {
            pid: pid,
            project_name: project_name,
            category: category,
            project_rate: project_rate,
            rate_currency: rate_currency,
            project_details: project_details,
            project_subtitle: project_subtitle,
            project_desc: project_desc,
            project_sub_desc: project_sub_desc,
            thumbnail_photo: thumbnail_photo,
            quatation_photo: quatation_photo,
            slider_photos: slider_photos,
            sub_slider_photos: sub_slider_photos,
            reviews: reviews,
        };
        Navigate(`/showcaseDetailPage/${pid}`, { state: data });
        window.location.reload();
    };
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }
    return (
        <a onClick={() => { handleViewClick(); handleClick(); }} className='stretched-link'></a>
    );
};


function ShowcaseDetails({ loadScreen, setalertmode, setalertStatus, setalertText }) {
    const location = useLocation();
    const params = useParams();
    const pid = params.id;
    const [SData, setSData] = useState({});


    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }
    const sliderContent = useSelector(
        (state) => state.userDetails.allProjects
    );
    var cardslide = {
        dots: false,
        speed: 500,
        arrows: true,
        autoplay: true,
        infinite: sliderContent.length > 4,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 2,
        centerPadding: "20px",
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
                breakpoint: 1199.5,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 992.5,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 567.5,
                settings: {
                    centerMode: true,
                    slidesToShow: 1,
                    arrows: false,
                    slidesToScroll: 1
                }
            }
        ],
        customPaging: function (i) {
            return <div>{i + 1}</div>; // Customize the indicator label as needed
        },
    };

    const mid = Cookies.get('mid') || localStorage.getItem('mid');
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUserData = async () => {
            const formData = new FormData();
            formData.append("mid", mid);
            formData.append("pid", SData.pid);
            loadScreen(true);
            await dispatch(allProjects());

            await dispatch(SM_Product_seo({ pid: pid }))
            await dispatch(AddView(formData));
            const fetchProjectDetails = async () => {
                try {
                    const response = await axios.get(`${url1}/getProject_sm?pid=${pid}`, {
                        headers: {
                            "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                        },
                    });
                    const product = response.data.project_data;
                    console.log(product);

                    setSData(product);
                    await dispatch(get_Category(product.category));
                    //    settagArray(product.tags[0].split(',')) ;

                }
                catch (error) {
                    // console.log(csrfToken)
                    console.log("Not submitting data");
                }
            }
            fetchProjectDetails();
            loadScreen(false);
        };
        fetchUserData();
    }, [dispatch]);
    const CateDetails = useSelector(
        (state) => state.userDetails.get_Category
    );
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };
    const seoData = useSelector((state) => state.userDetails.SM_Product_seo)

    console.log(CateDetails);
    console.log('params');
    console.log(params);
    const settings = {
        dots: false,
        infinite: sliderContent.length > 4,
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
    const [category_name, setCategoryName] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [imagePreview1, setImagePreview1] = useState(null);
    const [imagePreview2, setImagePreview2] = useState(null);
    const [siteAddress, setSiteAddress] = useState('');
    const [contactPer, setContactPer] = useState('')
    const [selectDate, setSelectDate] = useState(null)
    const [selectTime, setSelectTime] = useState(null);
    const [desc, setDesc] = useState('');

    useEffect(() => {
        setCategoryName(CateDetails.ctg_name)
    }, [CateDetails])


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
    const Lmid = Cookies.get('mid') || localStorage.getItem('mid');

    useEffect(() => {
        dispatch(LoggedMember(Lmid));
    }, [dispatch, Lmid]);
    const contactDetails = useSelector(
        (state) => state.userDetails.getContactPage_cms
    );
    const memData = useSelector((state) => state.userDetails.LoggedMember);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        const inputDateObj = new Date(selectDate);
        const year = inputDateObj.getFullYear();
        const month = (inputDateObj.getMonth() + 1).toString().padStart(2, '0');
        const day = inputDateObj.getDate().toString().padStart(2, '0');
        const formatted = `${year}-${month}-${day}`;
        formData.append("title", SData.project_name);
        formData.append("venue", siteAddress);
        formData.append("phone", contactPer);
        formData.append("date", formatted);
        formData.append("time", selectTime);
        formData.append("desc", desc);
        formData.append("image1", imagePreview);
        formData.append("image2", imagePreview1)
        formData.append("image3", imagePreview2)
        formData.append("consultant", "not assigned");
        formData.append("price", SData.project_rate)
        formData.append("status", "Pending")


        if (memData && memData.uname) {
            formData.append("user", memData.uname)
        }

        await dispatch(addbooking_showcase(formData));

        // setTimeout(() => {
        //     window.location.reload();
        // }, 1000);

    };
    const inputDateObj = new Date(selectDate);
    const year = inputDateObj.getFullYear();
    const month = (inputDateObj.getMonth() + 1).toString().padStart(2, '0');
    const day = inputDateObj.getDate().toString().padStart(2, '0');
    const formatted = `${year}-${month}-${day}`;


    const dataToSend = {

        SData: SData,
        siteAddress: siteAddress,
        contactPer: contactPer,
        selectDate: formatted,
        selectTime: selectTime,
        desc: desc,
        imagePreview: imagePreview,
        imagePreview1: imagePreview1,
        imagePreview2: imagePreview2,
    }

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

    return (
        <>
            <div className="modal fade" id="terms-modal" >
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
            <div className='account-bg p-5'>
                <h1 className='text-white text-center' data-aos='zoom-in'>{category_name} : {SData.project_name}</h1>
            </div>

            <div className='container py-4'>
                <div className="row g-4">
                    <div className="col-lg-8" data-aos='fade-right' data-aos-duration='1000'>
                        <div className='bg-light2 p-4'>
                            <h4>Book Showcase</h4>
                            <form className='row g-3 p-2 mt-2' data-aos='fade-up' onSubmit={handleSubmit} >
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
                                        I agree to the  </label> <span data-bs-target="#terms-modal"
                                            data-bs-toggle="modal" className='text-success fw-bold cursor-pointer d-inline'>
                                        Terms and Conditions
                                    </span>
                                </div>
                                {mid ? (
                                    <div className='col-12'>
                                        {isChecked == true ? (
                                            <Link to='/showCaseCheckout' state={dataToSend}>  <Button variant='contained' color='themeColor' className='text-capitalize text-white shadow-none rounded-0 fw-bold' size='large' >Book a demo</Button> </Link>
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
                        <Slider {...settings} className='home-slide mt-3'>
                            {SData.slider_photos ? SData.slider_photos.map((item, index) => (<>
                                <div className='position-relative'>
                                    <img src={item} className='img-fluid slider-img w-100' alt="" />
                                </div>
                            </>)) : (<><h1 className='text-secondary text-center m-5'>No Images Currently</h1></>)}
                        </Slider>
                        <div className='position-absolute  start-0 w-100 h-100' style={{ top: "33rem" }}>
                            <div className='d-flex justify-content-between p-4'>
                                {/* <div>
                                            <button className='btn btn-sm rounded-pill pill-rate me-3 z-1'>4.6<i className="fa-solid ms-1 fa-star text-white"></i> </button>
                                        </div> */}
                                <div className='d-flex gap-3'>
                                    <div onClick={handleShare}>
                                        <IconButton size='small' className='bg-white'>
                                            <ShareIcon />
                                        </IconButton>
                                    </div>
                                    {/* <div>
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
                                            </div> */}

                                </div>
                            </div>
                        </div>
                        <p data-aos='fade-up' className='my-4'>
                            {SData.project_desc}
                        </p>
                    </div>
                    <div className="col-lg-4">
                        <div data-aos='fade-left' data-aos-duration='1000' className='p-2 p-sm-3 px-sm-4  bg-black text-white'>
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
                        {/* <div className='p-3 bg-light2 text-center mt-3'>
                            <h5>Installment payment method</h5>
                            <Button variant='contained' fullWidth color='themeColor' className='fs-7 text-white shadow-none rounded-0'>Check Installment Payment Method</Button>
                        </div> */}
                    </div>
                </div>

                <div className='py-3'>
                    <h3 className='my-3 text-theme' data-aos='fade-up'>Starting from : {SData.rate_currency} {SData.project_rate}</h3>
                    <h4 className='fw-bold my-4' data-aos='fade-up'>{SData.project_subtitle}</h4>
                    <div className='text-secondary my-3' data-aos='fade-up'>
                        <p>{SData.project_details} </p>
                    </div>
                    <div className='row g-0' data-aos='zoom-in'>
                        <div className="col-lg-6" >
                            <Slider {...settings} className='home-slide'>
                                {SData.sub_slider_photos ? SData.sub_slider_photos.map((item, index) => (<>
                                    <div className='position-relative'>
                                        <img src={item} className='img-fluid slider-img w-100' alt="" />
                                    </div>
                                </>)) : (<><h1 className='text-secondary text-center m-5'>No Images Currently</h1></>)}
                            </Slider>
                        </div>
                        <div className="col-lg-6 slider-img  overflow-hidden ">
                            {/* <div className='px-2 px-md-4 py-3 text-white'>
                                <h3>Renovation Quotation</h3>
                                <div className='my-4'>
                                    <div className="d-flex my-3">
                                        <div style={{ width: '10rem', }}>Name:</div>
                                        <div >XYZ name</div>
                                    </div>
                                    <div className="d-flex my-3">
                                        <div style={{ width: '10rem', }}>Phone No:</div>
                                        <div >+65 1234 5678</div>
                                    </div>
                                    <div className="d-flex my-3">
                                        <div style={{ width: '10rem', }}>Address:</div>
                                        <div style={{ width: '15rem', }} >It is a long established fact that a reader will be distracted by the readable content </div>
                                    </div>
                                    <div className="d-flex my-3">
                                        <div style={{ width: '10rem', }}>Date:</div>
                                        <div >20-02-2023</div>
                                    </div>
                                    <div className="d-flex my-3">
                                        <div style={{ width: '10rem', }}>Time:</div>
                                        <div >9:30 am</div>
                                    </div>
                                    <div className="d-flex my-3">
                                        <div style={{ width: '10rem', }}>What type of work?</div>
                                        <div >Kitchen Renovation</div>
                                    </div>
                                </div>
                                <h3>Total Cost : $2,500</h3>
                            </div> */}
                            <div className='h-100 '>
                                <img src={SData.quatation_photo} alt={SData.project_name} className='img-fluid object-fit-cover h-100 w-100' />
                            </div>
                        </div>
                    </div>
                    <p className='text-secondary my-3' data-aos='fade-up' data-aos-duration='800'>
                        {SData.project_sub_desc}
                    </p>
                </div>
                <div>
                    {sliderContent.filter(item => item.category === SData.category).filter(item => item.pid !== SData.pid).length > 0 && (<div className='d-flex justify-content-between'>
                        <h3>{category_name}</h3>
                        <div className='fs-5'>
                            <Link className='text-theme text-decoration-none' to='/category_sm' state={{ index: category_name }} onClick={handleClick}>View More <ArrowRightAltIcon fontSize='large' /></Link>
                        </div>
                    </div>)}
                    <Slider className=' my-3 main-slide' {...cardslide}>
                        {sliderContent.filter(item => item.category === SData.category).filter(item => item.pid !== SData.pid)
                            ? sliderContent
                                .filter(item => item.category === SData.category)
                                .filter(item => item.pid !== SData.pid)
                                .map((items, index) => (<>
                                    <div key={index} className='p-2'>
                                        <div className='showcase-thumb'>
                                            <img className='w-100 t3 img-fluid h-100 object-fit-cover' src={items.thumbnail_photo} />
                                            <Action
                                                pid={items.pid}
                                                project_name={items.project_name}
                                                category={items.category}
                                                project_rate={items.project_rate}
                                                rate_currency={items.rate_currency}
                                                project_details={items.project_details}
                                                project_subtitle={items.project_subtitle}
                                                project_desc={items.project_desc}
                                                project_sub_desc={items.project_sub_desc}
                                                thumbnail_photo={items.thumbnail_photo}
                                                quatation_photo={items.quatation_photo}
                                                slider_photos={items.slider_photos}
                                                sub_slider_photos={items.sub_slider_photos}
                                                reviews={items.reviews}
                                            />
                                            <div>
                                                <h5>{items.project_name}</h5>
                                                <div>Starting from : {items.rate_currency} {items.project_rate}</div>
                                            </div>
                                        </div>
                                    </div>
                                </>)) : (<h2 className='text-secondary text-center'>Comming soon</h2>)
                        }
                    </Slider>
                </div>
            </div>
            <Offer></Offer>
        </>
    )
}
export default ShowcaseDetails;