import React, { useState, useEffect } from 'react';
import { pink } from '@mui/material/colors';
import { Button, Checkbox } from '@mui/material';
import '../assets/css/HomeServiceCard.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { getLikedArray, likeProduct } from '../handleSlice';
import Count from './account/Count';
import { url4 } from './port';

const Action = ({
    unit_price,
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
    selling_price,
}) => {
    const Navigate = useNavigate();
    const handleViewClick = () => {
        const data = {
            unit_price: unit_price,
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
            selling_price: selling_price,
        };
        Navigate(`/hsmDetailPage/${pid}`, { state: data });

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

function HomeServiceCard({ details, Selcategory }) {
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }
    console.log(details);
    const dispatch = useDispatch();
    let mid = localStorage.getItem('mid') || Cookies.get('mid');
    const [liked, setLiked] = useState(false)
    const [viewCount, setViewCount] = useState([]);
    useEffect(() => {
        dispatch(getLikedArray(mid))
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
                setLiked(false);
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
                setLiked(true);
                dispatch(getLikedArray(mid))
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <div className='row g-4'>
            {details ? details.map((item, index) => (

                <div key={index} data-aos='fade-up' data-aos-duration='700' data-aos-delay={(index % 4) * 200} className='col-lg-4 col-md-6 col-xxl-3'>
                    <div className='slider-card shadow-sm border position-relative'>
                        <div className='img-box'>
                            <img src={item.thumbnail_image} alt={item.product_name} />
                            <div className='justify-content-end position-absolute m-3 top-0 end-0'>
                                <div>
                                    <Checkbox icon={<i className="fa-solid fa-heart "></i>}
                                        checked={likedProducts?.pid?.includes(item.pid)}
                                        onChange={() => handleLikeClicked(item.pid)}
                                        checkedIcon={<i className="fa-solid fa-heart"></i>} sx={{
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
                            {item.quantity_pi == "0" && <span className='text-danger'>Out of Stock</span>}
                            {Number(item.quantity_pi) <= Number(item.quantity_lsqw) && (item.quantity_pi !== "") && (item.quantity_pi !== "0") && <span className='text-danger'>Limited Stock Remaining</span>}
                            <div className='d-flex gap-3 align-itmes-center justify-content-between'>
                                {item.review_count && item.review_count > 0 ? (
                                    <div>
                                        <button className='btn btn-sm rounded-pill pill-rate me-3'>{item.rating} <i className="fa-solid fa-star text-white"></i> </button>
                                        <span className='text-secondary'>{item.review_count} Reviews</span>
                                    </div>
                                ) : (null)}
                                <div>
                                    <span className='text-muted text-decoration-line-through'> S$ ${item.unit_price}</span>
                                </div>
                            </div>
                            <div className='d-flex align-items-center mt-2 mb-4 justify-content-between'>
                                <div className='text-info'>
                                    {item.discount ? (<>
                                        <i className="fa-solid fa-tags"></i> Save Upto {item.discount}% off
                                    </>) : (null)}

                                </div>

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
        </div>
    );
}

export default HomeServiceCard;
