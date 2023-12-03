import React, { useState, useEffect } from 'react';
import { pink } from '@mui/material/colors';
import { Button, Checkbox } from '@mui/material';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../assets/css/MarketPlaceCard.css'
import { NavLink, Link } from 'react-router-dom';
import { VeiwMember, getLikedArray } from '../handleSlice';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import Count from './account/Count';
import { url1, url4 } from './port';

const Photo = ({ item }) => {
    const dispatch = useDispatch();
    const [sellerData, setSellerData] = useState('');
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${url1}/viewmember_crm?mid=${item.seller_id}`, {
                    headers: {
                        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                    },
                });
                setSellerData(response.data.member);
            } catch (error) {
                console.log("Not submitting data");
                console.log(error);
            }
        };
        fetch();
    }, [dispatch, item.seller_id]);

    return (
        <div className='d-flex mx-3 gap-2 align-items-center sliderProfile mt-2'>
            <div>
                <img src={sellerData.pic_url} alt={sellerData.uname} />
            </div>
            <div className='lh-sm'>
                {sellerData.uname}
            </div>
        </div>
    );
};


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
    page,
}) => {
    const Navigate = useNavigate();

    const dispatch = useDispatch();

    // Fetch member data when the component mounts
    const [memData, setmemData] = useState(null);
    useEffect(() => {
        async function fetch() {
            try {
                const response = await axios.get(`${url1}/viewmember_crm?mid=${seller_id}`, {
                    headers: {
                        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                    },
                });
                setmemData(response.data.member)
            } catch (error) {
                console.log("Not submitting data");
                console.log(error);
            }
        };
        fetch()
    }, [dispatch, seller_id]);

    let photo;
    if (memData !== null) {
        photo = memData.pic_url;
    }

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
        if (page == 'detail') { window.location.reload(); }
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

function MarketPlaceSlider({ sliderContent, page }) {
    let cardslide = {
        dots: false,
        infinite: sliderContent.length > 4,
        speed: 500,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 4,
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
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }
    const dispatch = useDispatch();
    let mid = localStorage.getItem('mid') || Cookies.get('mid');
    useEffect(() => {
        dispatch(getLikedArray(mid))
    }, [dispatch])

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
            <Slider {...cardslide} className='main-slide'>
                {sliderContent.map((item, index) => (
                    <div key={index} className='position-relative' data-aos="fade-up" data-aos-duration='1000'>
                        <div className='mx-3 slider-card position-relative border'>
                            <div className='img-box'>
                                <img src={item.thumbnail_photo} alt={item.title} />
                                <div className='d-flex w-100 justify-content-between position-absolute p-3 top-0 start-0'>
                                    <div>
                                        {/* <button className='btn btn-sm rounded-pill'>null<i className="fa-solid fa-star text-white"></i> </button> */}
                                    </div>
                                    <div>
                                        <Checkbox icon={<i className="fa-solid fa-heart "></i>} checkedIcon={<i className="fa-solid fa-heart"></i>}
                                            checked={likedProducts?.lid?.includes(item.lid)}
                                            onChange={() => handleLikeClicked(item.lid)}
                                            sx={{
                                                color: 'white',
                                                backgroundColor: 'grey',
                                                '&.Mui-checked': {
                                                    backgroundColor: pink[600],
                                                    color: 'white',
                                                },
                                            }} />
                                    </div>
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
                                page={page}
                            />

                            <div className='sliderContent p-2'>
                                <p>{item.title}</p>
                                <div className=' d-flex justify-content-between align-items-center'>
                                    <div className='text-danger fs-5'>
                                        <span>S$ </span><span>{item.price}</span>
                                    </div>
                                    <div className='fs-6'>{item.stock > 0 ? (<>Stock: <span className='text-theme'> {item.stock} </span></>) : (<span className='text-danger'>Out of stock</span>)}</div>

                                </div>
                                <div className='text-secondary mt-1 text-end'>
                                    <Count pid={item.lid} /> people viewing this
                                </div>
                            </div>
                        </div>
                        <Photo item={item} />
                    </div>
                ))}
            </Slider>
        </>

    );
}

export default MarketPlaceSlider;
