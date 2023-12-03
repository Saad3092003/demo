import React, { useState, useEffect } from 'react';
import { pink } from '@mui/material/colors';
import { Button, Checkbox } from '@mui/material';
import '../assets/css/HomeServiceCard.css'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { getLikedArray } from '../handleSlice';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Count from './account/Count';
import { url4 } from './port';

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
    };
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }
    return (
        <a onClick={() => { handleViewClick(); handleClick(); }} className='stretched-link cursor-pointer'></a>
    );
};

function ShowcaseCard({ sliderContent, selectCategory }) {
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
        if (likedProducts?.spid?.includes(pid)) {
            const mid = localStorage.getItem('mid') || Cookies.get('mid');
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
                        "api-key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
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
            formData.append("spid", pid);
            try {
                const response = await axios({
                    method: "post",
                    url: `${url4}/api/like-spid`,
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

        <div className='row g-4'>
            {sliderContent.map((item, index) => (
                <div key={index} className='col-lg-4 col-md-6 col-xxl-3' data-aos='fade-up' data-aos-duration='700' data-aos-delay={(index % 4) * 200}>
                    <div className='slider-card shadow-sm border position-relative'>
                        <div className='img-box'>
                            <img src={item.thumbnail_photo} alt={item.project_name} />
                            <div className='d-flex justify-content-end position-absolute m-3 top-0 end-0'>
                                <div>
                                    <Checkbox icon={<i className="fa-solid fa-heart "></i>} checkedIcon={<i className="fa-solid fa-heart"></i>}
                                        checked={likedProducts?.spid?.includes(item.pid)}
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
                            pid={item.pid}
                            project_name={item.project_name}
                            category={item.category}
                            project_rate={item.project_rate}
                            rate_currency={item.rate_currency}
                            project_details={item.project_details}
                            project_subtitle={item.project_subtitle}
                            project_desc={item.project_desc}
                            project_sub_desc={item.project_sub_desc}
                            thumbnail_photo={item.thumbnail_photo}
                            quatation_photo={item.quatation_photo}
                            slider_photos={item.slider_photos}
                            sub_slider_photos={item.sub_slider_photos}
                            reviews={item.reviews}
                        />
                        <div className='sliderContent p-3'>
                            <h5>{item.project_name}</h5>
                            <div className='text-secondary'>
                                {item.project_subtitle}


                            </div>
                            <div className='text-secondary  pt-2'>
                                <i className="fa-regular fa-eye"></i> <Count pid={item.pid} /> people viewing this
                            </div>
                            <div className='my-2'>
                                <NavLink to='/showcaseDetailPage' onClick={handleClick} className='text-theme text-decoration-none fs-6 fw-bold'>Learn More <i className="fa-solid ms-2 fa-arrow-right-long"></i> </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            ))

            }
        </div>
    );
}

export default ShowcaseCard;
