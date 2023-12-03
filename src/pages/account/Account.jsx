import React, { useState, useEffect } from 'react';
import '../../assets/css/account.css';
import Offer from '../../components/Offer';
import s1 from '../marketplace/images/Movers & Delivery.png';
import s2 from '../marketplace/images/Home Repairs.png';
import s3 from '../marketplace/images/Property.png';
import s4 from '../marketplace/images/Mobile Phones.png';
import { Button, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import Editlisting from '../../components/account/Editlisting';
import Purchase from '../../components/account/Purchase';
import Profile from '../../components/account/Profile';
import AddIcon from '@mui/icons-material/Add';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import EditProfile from '../../components/account/EditProfile';
import Wallet from '../../components/account/Wallet';
import CloseIcon from '@mui/icons-material/Close';
import ChangePassword from '../../components/account/ChangePassword';
import Transaction from '../../components/account/Transaction';
import Chats from '../../components/account/Chats';
import { useDispatch } from 'react-redux';
import { Order_Table, getLikedArray, get_user_listing_profiles, VeiwMember, create_listing_profile, AllCategories_mpm, edit_listing_profile } from '../../handleSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import ByersCount from './ByersCount';
import { Helmet } from 'react-helmet';
import { useContext } from 'react';
import Booking from '../../components/account/Booking';
import { url1, url4 } from '../../components/port';
import Sales from '../../components/account/Sales';

const Action = ({ buyers,
    category,
    description,
    lid,
    price,
    seller_id,
    seller_name,
    service_area,
    service_name,
    slider_photos,
    thumbnail_photo,
    title,
}) => {
    const Navigate = useNavigate();

    const dispatch = useDispatch();

    // Fetch member data when the component mounts
    useEffect(() => {
        dispatch(VeiwMember(seller_id));
    }, [dispatch, seller_id]);

    // Get the member data from Redux store
    const memData = useSelector((state) => state.userDetails.VeiwMember);

    const photo = memData.pic_url;

    const handleViewClick = () => {
        const data = {
            buyers: buyers,
            category: category,
            description: description,
            lid: lid,
            sphoto: photo,
            price: price,
            seller_id: seller_id,
            seller_name: seller_name,
            service_area: service_area,
            service_name: service_name,
            slider_photos: slider_photos,
            thumbnail_photo: thumbnail_photo,
            title: title,
        };
        Navigate(`/marketplaceDetailPage/${lid}`, { state: data });
    };
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }
    return (
        <div onClick={() => { handleViewClick(); handleClick(); }} className='stretched-link cursor-pointer'></div>
    );
};


function Account({ loadScreen, setalertStatus, setalertText, setalertmode }) {
    let navigate = useNavigate();
    const logOut = () => {
        localStorage.clear();
        const cookieNames = Object.keys(Cookies.get());
        cookieNames.forEach(cookieName => {
            Cookies.remove(cookieName);
        });
        navigate('/');
        window.location.reload()
    }
    const [activeTab, setActiveTab] = useState('myprofile');
    const [selectDate, setSelectDate] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imagePreviewedit, setImagePreviewedit] = useState(null);
    const [loadspin, setloadspin] = useState(false);
    const [imagePreview1, setImagePreview1] = useState([]);
    const [imagePreviewedit1, setImagePreviewedit1] = useState([]);
    const [editModalData, setEditModalData] = useState({});
    const handleImageChangeedit = (e) => {
        const files = Array.from(e.target.files);
        const selectedImages = files.map((file) => file);
        setImagePreviewedit(selectedImages);
    };
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const selectedImages = files.map((file) => file);
        setImagePreview(selectedImages);
    };
    const handleImageRemove = () => {
        setImagePreview(null);
        setImagePreviewedit(null);
    };
    const handleImageChangeedit1 = (event) => {
        const files = event.target.files;
        const uploadedImages = [];

        for (let i = 0; i < files.length; i++) {
            uploadedImages.push(files[i]);
        }
        setImagePreviewedit1(uploadedImages);
    }
    const handleImageChange1 = (event) => {
        const files = event.target.files;
        const uploadedImages = [];

        for (let i = 0; i < files.length; i++) {
            uploadedImages.push(files[i]);
        }

        setImagePreview1(uploadedImages);
    }
    const handleImageRemove1 = (index) => () => {
        const updatedImages = [...imagePreview1];
        updatedImages.splice(index, 1);
        setImagePreview1(updatedImages);
    }
    const handleSelectDateChange = (date) => {
        setSelectDate(date);
    };



    useEffect(() => {
        console.log(activeTab);
    }, [activeTab])
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }
    const dispatch = useDispatch();
    const mid = localStorage.getItem('mid') || Cookies.get('mid');
    useEffect(() => {
        const fetchLikedProd = async () => {
            loadScreen(true)
            await dispatch(getLikedArray(mid));
            await dispatch(Order_Table(mid));
            await dispatch(get_user_listing_profiles(mid));
            await dispatch(AllCategories_mpm());
            loadScreen(false)
        };
        fetchLikedProd();
    }, [dispatch]);
    const { search } = useLocation();
    useEffect(() => {
        const params = new URLSearchParams(search);

        const reference = params.get('reference');
        const status = params.get('status');
        if (reference) {

        }

    }, [])
    const orders = useSelector((state) => state.userDetails.Order_Table);
    const likedProducts = useSelector((state) => state.userDetails.getLikedArray)
    const categories = useSelector((state) => state.userDetails.AllCategories_mpm)
    const [serviceName, setServiceName] = useState('')
    const [serviceArea, setServiceArea] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        console.log('okok');
        console.log(imagePreview1);
    }, [imagePreview1])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (loadspin !== true) {
            setloadspin(true);
            const formData = new FormData();

            formData.append("mid", mid);
            formData.append("service_name", serviceName);
            formData.append("service_area", serviceArea);
            formData.append("category", category);
            formData.append("stock", quantity);
            formData.append("description", description);
            formData.append("title", serviceName);
            formData.append("seller_name", memData.uname)

            formData.append("seller_id", memData.mid);
            formData.append("price", price)
            if (imagePreview) {
                imagePreview.forEach((image, index) => {
                    formData.append("thumbnail_photo", image);
                });
            }
            if (imagePreview1) {
                imagePreview1.forEach((image, index) => {
                    formData.append("slider_photos", image);
                });
            }

            await dispatch(create_listing_profile(formData));
            setloadspin(true);
            window.location.reload();
        }


    };
    const handleSubmit2 = async (event) => {
        event.preventDefault();
        if (loadspin !== true) {
            setloadspin(true);
            const formData = new FormData();

            formData.append("mid", mid);
            formData.append("service_name", serviceName);
            formData.append("service_area", serviceArea);
            formData.append("category", category);
            formData.append("description", description);
            formData.append("title", serviceName);
            formData.append("seller_name", memData.uname)

            formData.append("seller_id", memData.mid);
            formData.append("price", price)
            if (imagePreview) {
                imagePreview.forEach((image, index) => {
                    formData.append("thumbnail_photo", image);
                });
            }
            if (imagePreview1) {
                imagePreview1.forEach((image, index) => {
                    formData.append("slider_photos", image);
                });
            }

            await dispatch(edit_listing_profile(formData));
            setloadspin(true);
            window.location.reload();
        }


    };
    // useEffect(() => {
    //     let button = document.getElementById('editclick');
    //     let edit = document.getElementById('editProfile-tab');

    //     button.addEventListener('click', () => {
    //         edit.click();
    //     });
    // }, [])
    const [hsmProdDetails, setHsmProdDetails] = useState([]);
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productPromises = likedProducts?.pid?.map(async (item) => {
                    try {
                        const response = await axios.get(`${url1}/getProduct_hsm?pid=${item}`, {
                            headers: {
                                "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                            },
                        });
                        const product = response.data.product;
                        console.log(product);
                        return product;
                    }
                    catch (error) {
                        // console.log(csrfToken)
                        console.log("Not submitting data");
                    }
                });

                const productDetails = await Promise.all(productPromises);
                console.log(productDetails);
                setHsmProdDetails(productDetails);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [likedProducts.pid]);
    console.log(hsmProdDetails);


    const [mpProdDetails, setMpProdDetails] = useState([]);
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productPromises = likedProducts?.lid?.map(async (item) => {
                    try {
                        const response = await axios.get(`${url1}//getlisting_mpm?lid=${item}`, {
                            headers: {
                                "API-KEY": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                            },
                        });
                        const product = response.data.data;
                        console.log(product);
                        return product;
                    }
                    catch (error) {
                        // console.log(csrfToken)
                        console.log("Not submitting data");
                    }
                });

                const productDetails = await Promise.all(productPromises);
                console.log(productDetails);
                setMpProdDetails(productDetails);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [likedProducts.lid]);
    console.log(mpProdDetails);

    const [smProdDetails, setSmProdDetails] = useState([]);
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productPromises = likedProducts?.spid?.map(async (item) => {
                    try {
                        const response = await axios.get(`${url1}/getProject_sm?pid=${item}`, {
                            headers: {
                                "api-key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                            },
                        });
                        const product = response.data.project_data;
                        console.log(product);
                        return product;
                    }
                    catch (error) {
                        // console.log(csrfToken)
                        console.log("Not submitting data");
                    }
                });

                const productDetails = await Promise.all(productPromises);
                console.log(productDetails);
                setSmProdDetails(productDetails);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [likedProducts.spid]);
    console.log(smProdDetails);

    const handleUnlikeLid = async (pid) => {
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
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }
    }

    const memData = useSelector((state) => state.userDetails.LoggedMember);
    const handleUnlikeSpid = async (pid) => {
        const formData = new FormData();
        formData.append("mid", mid);
        formData.append("spid", pid);
        try {
            const response = await axios({
                method: "delete",
                url: `${url4}/api/unlike-spid`,
                data: formData,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response);
            // dispatch(getCart(mid));

            dispatch(getLikedArray(mid));
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleUnlikepid = async (pid) => {
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
            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }
    }


    const listingNew = useSelector((state) => state.userDetails.get_user_listing_profiles);
    const handleDeleteListinng = async (lid) => {
        loadScreen(true)
        try {
            const response = await axios({
                method: "delete",
                url: `${url1}/deleteListing_mpm?lid=${lid}`,
                // data: formData,
                headers: {
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response);
            await dispatch(get_user_listing_profiles(mid));

        }
        catch (error) {
            console.log(error);
        }
        loadScreen(false)
    }

    const [modalData, setModalData] = useState({});
    const [review, setReview] = useState('');
    console.log(modalData);
    const handleModalSubmit = async () => {
        const formData = new FormData();
        formData.append("mid", mid);
        formData.append("pid", modalData.pid);
        formData.append("username", memData.uname);
        formData.append("product_name", modalData.name)
        formData.append("rating", rate) //Sample
        formData.append("review", review);
        formData.append("review_photo", memData.pic_url);

        try {
            const response = await axios({
                method: "post",
                url: `${url4}/api/addreview_hsm`,
                data: formData,
                headers: {

                    "api-key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response);
            // dispatch(getCart(mid));


            window.location.reload();
        }
        catch (error) {
            console.log(error);
        }
        setReview('');
    }
    const [rate, setRate] = useState(0);
    const seoData = useSelector((state) => state.userDetails.getAbout_cms_meta)
    const [currentListing, setCurrentListing] = useState(null);

    return (
        <>
            <Helmet>
                <title>{seoData.metaTitle}</title>
                <meta name="description" content={seoData.metaDesc} />
                <meta name="robots" content={seoData.metaKey} />
                <meta property="og:image" content={seoData.metaImage} />
            </Helmet>
            <div className="modal fade" id="review-modal" >
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered " role="document">
                    <div className="modal-content rounded-0">
                        <div className="modal-header border-0">
                            <h2>Leave a Review</h2>
                            <button type="button" className="btn-close-red" data-bs-dismiss="modal"><i className="fa-solid fa-xmark"></i></button>
                        </div>
                        <div className="modal-body">
                            <div className=''>


                                <div className='fs-5'>Rate Us</div>
                                <div className="rating " style={{ width: 'max-content', marginTop: '-10px', }}>
                                    <input type="radio" onClick={() => setRate(5)} id="star5" name="rate" value="5" />
                                    <label for="star5" className='activet' title="text"></label>
                                    <input type="radio" onClick={() => setRate(4)} id="star4" name="rate" value="4" />
                                    <label for="star4" className='activet' title="text"></label>
                                    <input type="radio" onClick={() => setRate(3)} id="star3" name="rate" value="3" />
                                    <label for="star3" className='activet' title="text"></label>
                                    <input type="radio" onClick={() => setRate(2)} id="star2" name="rate" value="2" />
                                    <label for="star2" className='activet' title="text"></label>
                                    <input type="radio" onClick={() => setRate(1)} id="star1" name="rate" value="1" />
                                    <label for="star1" className='activet' title="text"></label>
                                </div>
                                <div>

                                    <TextField id="outlined-multiline-static" value={review} onChange={(e) => setReview(e.target.value)} label="Review" multiline fullWidth rows={4} className='mt-3' />

                                </div>
                            </div>




                            <Button variant='contained' color='themeColor' data-bs-dismiss='modal' className='text-capitalize my-3 w-100 text-white rounded-0 shadow-none' size='large' onClick={handleModalSubmit}>Submit</Button>



                        </div>
                    </div>
                </div>
            </div>
            <div className='account-bg p-5'>
                <h1 className='text-white text-center' data-aos='zoom-in'>My Account</h1>
            </div>
            <div className='container px-xl-5 py-5'>
                <div className='row gy-2'>
                    <div className='col-lg-4'>
                        <div className='shadow-tab rounded' >
                            <div className='border-bottom border-1 px-3 p-2 align-items-center d-flex justify-content-between'>
                                <div className='text-secondary fw-semibold fs-7'>
                                    My Account
                                </div>
                                <div>
                                    <Button className="activet border-0 " id="sell-tab" onClick={logOut} variant='contained' color='error' size='small'>Logout</Button>
                                </div>
                            </div>
                            <ul className="nav nav-tabs p-2 flex-lg-column flex-nowrap text-nowrap overflow-auto border-0" id="account-tab" role="tablist">
                                <li className="nav-item">
                                    <button className={`nav-link activet ${activeTab == 'myprofile' && ('active')} border-0 text-dark`} id="myprofile-tab" onClick={() => setActiveTab('myprofile')}>Profile</button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link activet ${activeTab == 'listing' && ('active')} border-0 text-dark`} id="listing-tab" onClick={() => setActiveTab('listing')}>Listings</button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link activet ${activeTab == 'wallet' && ('active')} border-0 text-dark`} id="wallet-tab" onClick={() => setActiveTab('wallet')}>My Points/Wallet</button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link activet ${activeTab == 'transaction' && ('active')} border-0 text-dark`} id="transaction-tab" onClick={() => setActiveTab('transaction')}>Transaction History</button>
                                </li>
                                {memData.kyc_status == "Verified" && (
                                    <li className="nav-item">
                                        <button className={`nav-link activet ${activeTab == 'chats' && ('active')} border-0 text-dark`} id="chats-tab" onClick={() => setActiveTab('chats')}>Chats</button>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button className={`nav-link activet ${activeTab == 'booking' && ('active')} border-0 text-dark`} id="booking-tab" onClick={() => setActiveTab('booking')}>My Bookings</button>
                                </li>
                                {memData.kyc_status == "Verified" && (
                                    <li className="nav-item">
                                        <button className={`nav-link activet ${activeTab == 'Mpurchase' && ('active')} border-0 text-dark`} id="Mpurchase-tab" onClick={() => setActiveTab('Mpurchase')}>My Marketplace Purchase</button>
                                    </li>
                                )}
                                {memData.kyc_status == "Verified" && (
                                    <li className="nav-item">
                                        <button className={`nav-link activet ${activeTab == 'Msales' && ('active')} border-0 text-dark`} id="Msales-tab" onClick={() => setActiveTab('Msales')}>My Marketplace Sales</button>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button className={`nav-link activet ${activeTab == 'LReview' && ('active')} border-0 text-dark`} id="LReview-tab" onClick={() => setActiveTab('LReview')}>Leave Review</button>
                                </li>
                                <li className="nav-item">
                                    <button className={`nav-link activet ${activeTab == 'Likes' && ('active')} border-0 text-dark`} id="Likes-tab" onClick={() => setActiveTab('Likes')}>My Likes</button>
                                </li>
                                {memData.kyc_status == "Verified" && (
                                    <li className="nav-item">
                                        <button className={`nav-link activet ${activeTab == 'sell' && ('active')} border-0 text-dark`} id="sell-tab" onClick={() => setActiveTab('sell')}>Sells</button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div className='col-lg-8'>
                        <div className="tab-content" >
                            {/* <div className="tab-pane active" id="myprofile" role="tabpanel" aria-labelledby="myprofile-tab"> */}
                            {activeTab == 'myprofile' && (
                                <Profile setActiveTab={setActiveTab} setalertStatus={setalertStatus} setalertText={setalertText} setalertmode={setalertmode} />
                            )}
                            {/* </div> */}
                            {activeTab == 'editProfile' && (
                                // <div className="tab-pane active" id="editProfile" role="tabpanel" aria-labelledby="editProfile-tab">
                                <EditProfile setalertStatus={setalertStatus} setalertText={setalertText} setalertmode={setalertmode} setActiveTab={setActiveTab} />
                                // </div>
                            )}
                            {activeTab == 'changePassword' && (
                                <ChangePassword />
                            )}
                            {activeTab == 'listing' && (
                                <div className="tab-pane active" id="listing" role="tabpanel" aria-labelledby="listing-tab">
                                    <div className="d-flex fs-7.5 gap-2 mt-2 justify-content-between flex-wrap align-items-center">
                                        <div><p className='text-secondary mb-0'>Listings</p></div>
                                        {/* <div className="d-flex gap-3 align-items-center flex-wrap">
                                            <div>
                                                <form className='search-form'>
                                                    <input type="search" placeholder="Search..." />
                                                    <button type="submit">Search</button>
                                                </form>
                                            </div>
                                            <div>Price :
                                                <select className=" border-0 text-theme" >
                                                    <option value="">Low to High</option>
                                                    <option value="">High to Low</option>
                                                </select>
                                            </div>
                                            <div>|</div>
                                            <div>Sort By :
                                                <select className=" border-0 text-theme" >
                                                    <option value="">Popularity</option>
                                                    <option value="">Least</option>
                                                    <option value="">Normal</option>
                                                </select>
                                            </div>
                                        </div> */}
                                    </div>
                                    <hr className='text-secondary' />
                                    <div className='row g-4'>
                                        {listingNew ? listingNew.map((item, index) => (
                                            <div key={index} className='col-xxl-4 col-sm-6 '>
                                                <div className='slider-card shadow-sm border position-relative'>
                                                    <div className='img-box'>
                                                        <img src={item.thumbnail_photo} alt={item.title} />
                                                        <div className='justify-content-end position-absolute m-1 top-0 end-0'>
                                                            <IconButton className='text-white me-2 mt-1 bg-danger' color='error' onClick={() => handleDeleteListinng(item.lid)}><DeleteIcon /></IconButton>
                                                            <IconButton className='text-white bg-success mt-1' color='success'
                                                                onClick={() => {
                                                                    setEditModalData(item);
                                                                    setActiveTab("editlisting");
                                                                }}><EditCalendarIcon /></IconButton>
                                                        </div>
                                                    </div>
                                                    <Action
                                                        buyers={item.buyers}
                                                        category={item.category}
                                                        description={item.description}
                                                        lid={item.lid}
                                                        price={item.price}
                                                        seller_id={item.seller_id}
                                                        seller_name={item.seller_name}
                                                        service_area={item.service_area}
                                                        service_name={item.service_name}
                                                        slider_photos={item.slider_photos}
                                                        thumbnail_photo={item.thumbnail_photo}
                                                        title={item.title}
                                                    />
                                                    <div className='sliderContent p-3'>
                                                        <h6>{item.title}</h6>
                                                        <div className='d-flex gap-3 fs-5 align-items-center justify-content-between'>
                                                            <div className=''>S$ {item.price}</div>
                                                            <div className='fs-6'>{item.stock > 0 ? (<>Stock: <span className='text-theme'> {item.stock} </span></>) : (<span className='text-danger'>Out of stock</span>)}</div>
                                                        </div>
                                                        <div className='d-flex align-items-center mt-2 mb-4 justify-content-between'>
                                                            <div className='text-info fs-7'>
                                                                Service Area -  {item.service_area}
                                                            </div>
                                                            <div className='fs-5'>

                                                            </div>
                                                        </div>
                                                        <div className='text-secondary border-top fs-7 border-1 pt-2'>
                                                            <i className="fa-regular fa-eye"></i> <ByersCount lid={item.lid} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                            : (<h2 className='text-secondary text-center'>Comming Soon...</h2>)
                                        }
                                    </div>
                                </div>
                            )}
                            {/* <div className="tab-pane" id="wallet" role="tabpanel" aria-labelledby="wallet-tab"> */}
                            {activeTab == 'wallet' && (
                                <Wallet />
                            )}
                            {/* </div> */}
                            {activeTab == 'transaction' && (
                                <Transaction />
                            )}
                            {activeTab == 'chats' && (
                                <Chats setalertStatus={setalertStatus} setalertText={setalertText} setalertmode={setalertmode} />
                            )}
                            {activeTab == 'Mpurchase' && (
                                <Purchase />
                            )}
                            {activeTab == 'Msales' && (
                                <Sales />
                            )}
                            {activeTab == 'LReview' && (
                                <div className="tab-pane active" id="LReview" role="tabpanel" aria-labelledby="LReview-tab">
                                    <div className='  p-3'>
                                        <div className='text-secondary fw-semibold fs-7'>
                                            Reviews
                                        </div>
                                        <hr className="text-secondary" />
                                        <div className='overflow-auto'>
                                            <table border="1" className="table mt-2 table-responsive rounded text-nowrap">
                                                <thead className="thead-dark ">
                                                    <tr >
                                                        <th className="bg-black text-white">Photo</th>
                                                        <th className="bg-black text-white">Product Name</th>
                                                        <th className="bg-black text-white">Amount</th>

                                                        <th className="bg-black text-white">Status</th>
                                                        <th className="bg-black text-white">Date</th>
                                                        <th className="bg-black text-white">Leave a Review</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {orders.map((order, index) => (

                                                        <>
                                                            {order.products.map((product, productIndex) => (
                                                                <tr key={index} style={{ verticalAlign: 'middle' }}>
                                                                    <td>
                                                                        <img
                                                                            src={product.photo}

                                                                            alt={product.product_name}
                                                                            width="50"
                                                                            height="50"
                                                                        />
                                                                    </td>
                                                                    <td>{product.product_name}</td>
                                                                    <td>{product.price}</td>

                                                                    <td>{order.payment_status}</td>
                                                                    <td>{order.date}</td>
                                                                    <td>
                                                                        <button
                                                                            className="btn btn-primary"
                                                                            data-bs-target="#review-modal"
                                                                            data-bs-toggle="modal"
                                                                            onClick={() => {
                                                                                setModalData({
                                                                                    name: product.product_name,
                                                                                    pid: product.pid,
                                                                                })
                                                                            }}
                                                                        >
                                                                            Send Review
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </>
                                                    ))}

                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            )}
                            {activeTab == 'Likes' && (
                                <div className="tab-pane active" id="Likes" role="tabpanel" aria-labelledby="Likes-tab">
                                    <div className=' p-3'>
                                        <div className='text-secondary fw-semibold fs-7'>
                                            My Likes
                                        </div>
                                        <hr className="text-secondary" />
                                        <div className='text-black fw-bold fs-7'>
                                            Showcase Management
                                        </div>
                                        <table border="1" className="table mt-2 table-responsive rounded text-nowrap">
                                            <thead className="thead-dark ">
                                                <tr >
                                                    <th className="bg-black text-white">Photo</th>
                                                    <th className="bg-black text-white">Project Name</th>
                                                    <th className="bg-black text-white">Price</th>
                                                    {/* <th className="bg-black text-white">Category</th> */}
                                                    {/* <th className="bg-black text-white">Reviews</th> */}
                                                    <th className="bg-black text-white">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {smProdDetails && smProdDetails.map((item, index) => (
                                                    <>
                                                        {item && (
                                                            <tr key={index} style={{ verticalAlign: 'middle' }}>
                                                                <td>
                                                                    <img
                                                                        src={item.thumbnail_photo}

                                                                        alt={item.project_name}
                                                                        width="50"
                                                                        height="50"
                                                                    />
                                                                </td>
                                                                <td>{item.project_name}</td>
                                                                <td>{item.project_rate}</td>
                                                                {/* <td>{item.category}</td> */}
                                                                {/* <td>{item.reviews}</td> */}


                                                                <td>
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        onClick={() => handleUnlikeSpid(item.pid)}
                                                                    >
                                                                        Unlike
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className='text-black fw-bold fs-7'>
                                            Marketplace Management
                                        </div>
                                        <table border="1" className="table mt-2 table-responsive rounded text-nowrap">
                                            <thead className="thead-dark ">
                                                <tr >
                                                    <th className="bg-black text-white">Photo</th>
                                                    <th className="bg-black text-white">Title</th>
                                                    <th className="bg-black text-white">Price</th>
                                                    <th className="bg-black text-white">Category</th>
                                                    <th className="bg-black text-white">Seller Name</th>
                                                    <th className="bg-black text-white">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {mpProdDetails && mpProdDetails.map((item, index) => (
                                                    <>
                                                        {item && (
                                                            <tr key={index} style={{ verticalAlign: 'middle' }}>
                                                                <td>
                                                                    <img
                                                                        src={item.thumbnail_photo}

                                                                        alt={item.title}
                                                                        width="50"
                                                                        height="50"
                                                                    />
                                                                </td>
                                                                <td>{item.title}</td>
                                                                <td>{item.price}</td>
                                                                <td>{item.category}</td>
                                                                <td>{item.seller_name}</td>


                                                                <td>
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        onClick={() => handleUnlikeLid(item.lid)}
                                                                    >
                                                                        Unlike
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </>
                                                ))}
                                            </tbody>
                                        </table>
                                        <div className='text-black fw-bold fs-7'>
                                            HomeService Management
                                        </div>
                                        <table border="1" className="table mt-2 table-responsive rounded text-nowrap">
                                            <thead className="thead-dark ">
                                                <tr >
                                                    <th className="bg-black text-white">Photo</th>
                                                    <th className="bg-black text-white">Product Name</th>
                                                    <th className="bg-black text-white">Price</th>
                                                    <th className="bg-black text-white">Category</th>
                                                    <th className="bg-black text-white">Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {hsmProdDetails && hsmProdDetails.map((item, index) => (
                                                    <>
                                                        {item && (
                                                            <tr key={index} style={{ verticalAlign: 'middle' }}>
                                                                <td>
                                                                    <img
                                                                        src={item.thumbnail_image}
                                                                        alt={item.product_name}
                                                                        width="50"
                                                                        height="50"
                                                                    />
                                                                </td>
                                                                <td>{item.product_name}</td>
                                                                <td>{item.selling_price}</td>
                                                                <td>{item.item_category}</td>


                                                                <td>
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        onClick={() => handleUnlikepid(item.pid)}


                                                                    >
                                                                        Unlike
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}
                            {activeTab == 'sell' && (
                                <div className="tab-pane active " id="sell" role="tabpanel" aria-labelledby="sell-tab">
                                    <form >
                                        <div className='px-lg-4'>



                                            <div className="">
                                                <div className='text-secondary fw-semibold fs-7 border-1 border-bottom'>
                                                    Form
                                                </div>
                                                <p className='mb-2'>Service Name</p>
                                                <input type="text" placeholder='Enter your Service Name' className='form-control form-control-lg border-success' value={serviceName} onChange={(e) => setServiceName(e.target.value)} />
                                                <p className='mt-3 mb-2'> Service Area</p>
                                                <input type="text" placeholder='Enter Service Area ' className='form-control form-control-lg border-success' value={serviceArea} onChange={(e) => setServiceArea(e.target.value)} />

                                                <p className='mt-3 mb-2'> Price</p>
                                                <input type="number" placeholder='Enter Price' className='form-control form-control-lg border-success' value={price} onChange={(e) => setPrice(e.target.value)} />

                                                <p className='mt-3 mb-2'> Quantity</p>
                                                <input type="number" placeholder='Enter Quantity' className='form-control form-control-lg border-success' value={quantity} onChange={(e) => setQuantity(e.target.value)} />

                                                <p className='mt-3 mb-2'>Category</p>
                                                <select type="text" placeholder='Select Your Category' className='form-control form-control-lg border-success' value={category} onChange={(e) => setCategory(e.target.value)} >
                                                    {/* <option>Category</option>
                                                   
                                                    <option>BedRoom</option>
                                                    <option>Office</option> */}
                                                    <option>Select</option>
                                                    {categories.map((item, index) => (
                                                        <option value={item.category_name}>{item.category_name}</option>

                                                    ))}
                                                </select>
                                                <p className='mt-3 mb-2'>Service Photo</p>
                                                < div className='upload-img position-relative border-secondary t3 border'>
                                                    <input
                                                        type="file"
                                                        id="imageInput"
                                                        style={{ display: 'none' }}
                                                        onChange={handleImageChange}
                                                        required
                                                    />
                                                    {!imagePreview ? (
                                                        <label htmlFor='imageInput' className='w-100 h-100 place-items-center d-grid cursor-pointer' >
                                                            <AddIcon fontSize='large' />
                                                        </label>
                                                    ) :
                                                        imagePreview.map((image, index) => (

                                                            <>
                                                                <div className='position-absolute top-0 end-0 m-1 bg-danger cursor-pointer' style={{ lineHeight: 0 }} onClick={handleImageRemove}><CloseIcon className='text-white' /></div>
                                                                <img src={URL.createObjectURL(image)} className='img-fluid w-100 h-100 object-fit-cover' />
                                                            </>
                                                        )
                                                        )
                                                    }
                                                </div>
                                                <p className='mt-3 mb-2'>Slider Photo</p>
                                                < div className=' position-relative  t3 border'>
                                                    <input
                                                        type="file"
                                                        id="sldimageInput"
                                                        onChange={handleImageChange1}
                                                        required
                                                        multiple
                                                    />
                                                    {!imagePreview1.length ? (
                                                        <label htmlFor='sldimageInput' className='w-100 h-100 place-items-center d-grid cursor-pointer' >
                                                        </label>
                                                    ) : (
                                                        <div className='d-flex flex-nowrap overflow-auto gap-2 py-2'>
                                                            {
                                                                imagePreview1.map((image, index) => (
                                                                    <div key={index} style={{ height: '150px', width: '150px', position: 'relative' }} className='flex-shrink-0'>
                                                                        <img key={index} src={URL.createObjectURL(image)} alt={`Preview ${index}`} className='img-fluid w-100 h-100 object-fit-cover' />
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    )}

                                                </div>
                                                <p className='mt-3 mb-2'> Description</p>
                                                <textarea type="text" placeholder='Enter Description ' className='form-control form-control-lg border-success' value={description} onChange={(e) => setDescription(e.target.value)} />

                                                <Button className='shadow-none mt-4 text-white px-5 rounded-0' variant='contained' color='themeColor' size='large' type='submit' onClick={handleSubmit}>
                                                    {loadspin == true ? (
                                                        <div className="spinner-border text-white" role="alert"></div>
                                                    ) : ("Submit")}
                                                </Button>
                                            </div>
                                            <p className='fs-7 mt-5 text-secondary'>Sell to Renovation {currentListing ? currentListing.lid : null}</p>
                                            <p className='fs-7-5 mt-3'>No Listing needed, sell directly to us</p>
                                            <div className='py-5 row g-3 account-icons rounded-3 mt-4' data-aos='fade-up'>
                                                <div className='col-sm-6 col-lg-3'>
                                                    <div className='account-icon-box mx-auto'>
                                                        <img src={s1} width='70' className='img-fluid' />
                                                    </div>
                                                    <p className='text-center mt-3'>Movers & Delivery</p>
                                                </div>
                                                <div className='col-sm-6 col-lg-3'>
                                                    <div className='account-icon-box mx-auto'>
                                                        <img src={s2} width='60' className='img-fluid' />
                                                    </div>
                                                    <p className='text-center mt-3'>Home Repairs</p>
                                                </div>
                                                <div className='col-sm-6 col-lg-3'>
                                                    <div className='account-icon-box mx-auto'>
                                                        <img src={s3} width='60' className='img-fluid' />
                                                    </div>
                                                    <p className='text-center mt-3'>Property</p>
                                                </div>
                                                <div className='col-sm-6 col-lg-3'>
                                                    <div className='account-icon-box mx-auto'>
                                                        <img src={s4} width='60' className='img-fluid' />
                                                    </div>
                                                    <p className='text-center mt-3'>Mobile Phones & Gadgets</p>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            )}
                            {activeTab == "editlisting" && (
                                <Editlisting item={editModalData} />
                            )}
                            {activeTab == "booking" && (
                                <Booking loadScreen={loadScreen} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Offer />
        </>
    );
}

export default Account;