import React, { useState, useEffect } from 'react';
import { pink } from '@mui/material/colors';
import { Checkbox } from '@mui/material';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getLikedArray } from '../handleSlice';
import Count from './account/Count';
import { url4 } from './port';
function HsmSlider({ homeServiceDetails }) {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }
    const Action = ({
        selling_price,
        desc,
        discount,
        discount_date,
        discount_type,
        featured,
        gallery_images,
        item_category,
        no_of_sale,
        pid,
        product_category,
        product_name,
        quantity_lsqw,
        quantity_pi,
        rating,
        reward_points,
        service_category,
        shipping_days,
        short_desc,
        sku,
        tags,
        thumbnail_image,
        unit,
        unit_price,
    }) => {
        const Navigate = useNavigate();
        const handleViewClick = () => {
            const data = {
                selling_price: selling_price,
                desc: desc,
                discount: discount,
                discount_date: discount_date,
                discount_type: discount_type,
                featured: featured,
                gallery_images: gallery_images,
                item_category: item_category,
                no_of_sale: no_of_sale,
                pid: pid,
                product_category: product_category,
                product_name: product_name,
                quantity_lsqw: quantity_lsqw,
                quantity_pi: quantity_pi,
                rating: rating,
                reward_points: reward_points,
                service_category: service_category,
                shipping_days: shipping_days,
                short_desc: short_desc,
                sku: sku,
                tags: tags,
                thumbnail_image: thumbnail_image,
                unit: unit,
                unit_price: unit_price,
            };
            Navigate(`/hsmDetailPage/${pid}`, { state: data });
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
            <div onClick={() => { handleViewClick(); handleClick(); }} className='stretched-link cursor-pointer'></div>
        );
    }
    let cardslide = {
        dots: false,
        infinite: homeServiceDetails.length > 4,
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
    const dispatch = useDispatch();
    let mid = localStorage.getItem('mid') || Cookies.get('mid');
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
    return (<>
        <Slider {...cardslide} className='main-slide' >
            {homeServiceDetails ? homeServiceDetails.map((item, index) => (
                <div key={index} className='p-3'>
                    <div className='slider-card shadow-sm border position-relative'>
                        <div className='img-box'>
                            <img src={item.thumbnail_image} alt={item.product_name} />
                            <div className='justify-content-end position-absolute m-3 top-0 end-0'>
                                <div>
                                    <Checkbox icon={<i className="fa-solid fa-heart "></i>} checkedIcon={<i className="fa-solid fa-heart"></i>}
                                        checked={likedProducts?.pid?.includes(item.pid)}
                                        onChange={() => handleLikeClicked(item.pid)}
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
                            unit_price={item.unit_price}
                            desc={item.desc}
                            discount={item.discount}
                            discount_date={item.discount_date}
                            discount_type={item.discount_type}
                            featured={item.featured}
                            gallery_images={item.gallery_images}
                            item_category={item.item_category}
                            no_of_sale={item.no_of_sale}
                            pid={item.pid}
                            product_category={item.product_category}
                            product_name={item.product_name}
                            quantity_lsqw={item.quantity_lsqw}
                            quantity_pi={item.quantity_pi}
                            rating={item.rating}
                            reward_points={item.reward_points}
                            service_category={item.service_category}
                            shipping_days={item.shipping_days}
                            short_desc={item.short_desc}
                            sku={item.sku}
                            tags={item.tags}
                            thumbnail_image={item.thumbnail_image}
                            unit={item.unit}
                            selling_price={item.selling_price}
                        />
                        <div className='sliderContent p-3'>
                            <h5>{item.product_name}</h5>
                            {item.quantity_pi == "0" && <div className='text-danger'>Out of Stock</div>}
                            {Number(item.quantity_pi) <= Number(item.quantity_lsqw) && (item.quantity_pi !== "") && (item.quantity_pi !== "0") && <div className='text-danger'>Limited Stock Remaining</div>}
                            <div className='d-flex gap-3 align-itmes-center justify-content-between'>

                                <div>
                                    {(item.rating) ? <button className='btn btn-sm rounded-pill pill-rate me-3'>{item.rating} <i className="fa-solid fa-star text-white"></i> </button> : null}
                                    {(item.review_count > 0) ? <span className='text-secondary'>{item.review_count} Reviews</span> : null}
                                </div>
                                <div>
                                    <span className='text-muted text-decoration-line-through'>S$ ${item.unit_price}</span>
                                </div>
                            </div>
                            <div className='d-flex align-items-center mt-2 mb-4 justify-content-between'>
                                {(item.discount) ?
                                    <div className='text-info'>
                                        <i className="fa-solid fa-tags"></i> Save Upto {item.discount}% off
                                    </div> : null
                                }
                                <div className='fs-4'>
                                    S$ {item.selling_price}
                                </div>
                            </div>

                            <div className='text-secondary border-top border-1 pt-2'>
                                <i className="fa-regular fa-eye"></i> <Count pid={item.pid} /> people viewing this
                            </div>
                        </div>
                    </div>
                </div>
            ))
                : (<h2 className='text-secondary text-center'>Comming Soon...</h2>)
            }
        </Slider>
    </>)
}
export default HsmSlider;