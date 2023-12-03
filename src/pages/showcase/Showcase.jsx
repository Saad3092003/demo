import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/css/Showcase.css';
import { NavLink } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import Offer from '../../components/Offer';
import { Link } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AllCategories_sm, allProjects, getContactPage_cms } from '../../handleSlice';
import { Helmet } from 'react-helmet';

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
        <a onClick={() => { handleViewClick(); handleClick(); }} className='stretched-link'></a>
    );
};

function Showcase({ loadScreen }) {


    const sliderContent = useSelector(
        (state) => state.userDetails.allProjects
    );

    let cardslide = {
        dots: false,
        speed: 500,
        arrows: true,
        infinite: sliderContent.length > 4,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,  // Change this to 2 if you want to show 2 cards at a time
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
                    slidesToScroll: 2,
                    infinite: sliderContent.length > 3,
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
    useEffect(() => {
        const fetchUserData = async () => {
            loadScreen(true);
            await dispatch(allProjects());
            await dispatch(AllCategories_sm());
            await dispatch(getContactPage_cms());
            loadScreen(false);
        };
        fetchUserData();
    }, [dispatch]);


    const seoData = useSelector((state) => state.userDetails.getAbout_cms_meta)

    const category = useSelector((state) => state.userDetails.AllCategories_sm);
    return (
        <>
         <Helmet>
                <title>{seoData.metaTitle}</title>
                <meta name="description" content={seoData.metaDesc} />
                <meta name="robots" content={seoData.metaKey} />
                <meta property="og:image" content={seoData.metaImage} />
            </Helmet>
            <div className='account-bg p-md-5 py-5 px-2'>
                <h1 className='text-white text-center' data-aos='zoom-in'>Showcase </h1>
            </div>
         
            {

                category ? category.map((items, index) => (
                    <div className='container py-5 '>
                        <div className='d-flex justify-content-between' key={index}>
                            <h3> {items.ctg_name}</h3>
                            <div className='fs-5'>
                                <Link onClick={handleClick} to='/category_sm' state={{ index: items.ctg_name }} className='text-theme text-decoration-none'>View More <ArrowRightAltIcon fontSize='large' /></Link>
                            </div>
                        </div>

                        <Slider className=' my-3 main-slide' {...cardslide}>
                            {sliderContent ?
                                sliderContent
                                    .filter(item => item.category === items.cid)
                                    .map((itms, idx) => (
                                        <div key={idx} className='p-2'>
                                            <div className='showcase-thumb'>
                                                <img className='w-100 t3 img-fluid h-100 object-fit-cover ' src={itms.thumbnail_photo} alt={itms.project_name} />
                                                <Action
                                                    pid={itms.pid}
                                                    project_name={itms.project_name}
                                                    category={itms.category}
                                                    project_rate={itms.project_rate}
                                                    rate_currency={itms.rate_currency}
                                                    project_details={itms.project_details}
                                                    project_subtitle={itms.project_subtitle}
                                                    project_desc={itms.project_desc}
                                                    project_sub_desc={itms.project_sub_desc}
                                                    thumbnail_photo={itms.thumbnail_photo}
                                                    quatation_photo={itms.quatation_photo}
                                                    slider_photos={itms.slider_photos}
                                                    sub_slider_photos={itms.sub_slider_photos}
                                                    reviews={itms.reviews}
                                                />
                                                <div>
                                                    <h5>{itms.project_name}</h5>
                                                    <div>Starting from : {itms.rate_currency} {itms.project_rate}</div>
                                                </div>
                                            </div>
                                        </div>
                                    )) : (<h2 className='text-secondary text-center'>Comming soon</h2>)
                            }
                        </Slider>
                    </div >
                )) : (<h2>No Data Passed</h2>)
            }

            <Offer />
        </>
    );
}

export default Showcase;