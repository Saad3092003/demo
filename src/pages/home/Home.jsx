import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import { Button } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../assets/css/home.css'
import MarketPlaceSlider from '../../components/MarketPlaceSlider';
import HomeServiceCard from '../../components/HomeServiceCard';
import ShowcaseCard from '../../components/ShowcaseCard';
import Offer from '../../components/Offer';
import SearchBar from '../../components/SearchBar';
import { MarketplaceAllListing, HSM_allProduct, allProjects, getHomePage_cms_meta, getHomePage_cms, get_live_promotions_home } from '../../handleSlice';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from "react-helmet";
import { url4 } from '../../components/port';

function Home({ loadScreen }) {
    const [searchTrue, setSearchTrue] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({});
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }

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
    let homeServiceDetails = useSelector(
        (state) => state.userDetails.hsm_allproducts
    );
    let banners = useSelector(
        (state) => state.userDetails.getHomePage_cms
    );
    let marketplaceAllListings = useSelector(
        (state) => state.userDetails.marketplaceAllListings
    );
    useEffect(() => {
        console.log('iuyguvbhuyu');
        console.log(homeServiceDetails);
    }, [homeServiceDetails])
    const getSearchResults = async (term) => {
        try {
            const response = await axios({
                method: "get",
                url: `${url4}/api/search?searchTerm=${term}`,
                headers: {

                    "api-key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
                // headers: {
                //     "Content-Type": "application/json",
                // },
            });

            setSearchResults(response.data);
            console.log(searchResults);
            setSearchTrue(true);


        }
        catch (err) {
            console.log(err);

        };
    }
    let showcaseProjects = useSelector(
        (state) => state.userDetails.allProjects
    );
    useEffect(() => {
        const fetchUserData = async () => {
            loadScreen(true);
            await dispatch(MarketplaceAllListing());
            await dispatch(HSM_allProduct());
            await dispatch(getHomePage_cms());
            await dispatch(allProjects());
            await dispatch(get_live_promotions_home());
            await dispatch(getHomePage_cms_meta());
            loadScreen(false);
        };
        fetchUserData();
    }, [dispatch]);
    const seoData = useSelector((state) => state.userDetails.getHomePage_cms_meta)
    let promotions = useSelector((state) => state.userDetails.get_live_promotions_home);
    console.log(promotions);
    const combinedProductInfo = promotions.reduce((acc, item) => [...acc, ...item.product_info], []);
    useEffect(() => {
        console.log('ytfrdcfvg');
        console.log(promotions);
    }, [combinedProductInfo])
    const newsletter_pages = useSelector((state) => state.userDetails.newsletter_controller)
    return (
        <>
            <Helmet>
                <title>{seoData.metaTitle}</title>
                <meta name="description" content={seoData.metaDesc} />
                <meta name="robots" content={seoData.metaKey} />
                <meta property="og:image" content={seoData.metaImage} />
            </Helmet>
            <Slider {...settings} className='home-slide'>
                {banners.length > 0 && banners.map((item, index) => (
                    <div className='position-relative' key={index}>
                        <img src={item.banner_image_url} alt={item.banner_title} className='img-fluid slider-img w-100' />
                        <div className='home-banner-text justify-content-md-start'>
                            <div className='container px-md-5 ps-3 '>
                                <div className='w-75 glass-home p-3 rounded-4'>
                                    <h1 className='display-5 text-white'>{item.banner_title}</h1>
                                    <Link to={item.button_link}>
                                        <Button variant='contained' color='themeColor' className='text-white rounded-0 shadow-none mt-lg-5' size='large'>{item.button_title}</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>

            <SearchBar onInputChange={setSearchTerm} onClick={() => { getSearchResults(searchTerm) }} />

            {!searchTrue && (
                <>
                    <div className='container pt-5'>
                        <div>
                            <div className='d-flex justify-content-between'>
                                <h2>Marketplace</h2>
                                <div>
                                    <NavLink to='/marketplace' className='text-theme text-decoration-none fs-6 fw-bold' onClick={handleClick}>View More <i className="fa-solid fa-arrow-right-long"></i> </NavLink>
                                </div>
                            </div>
                            <p className='fw-semibold'>Take a tour of homes we'vs designed for our customers</p>
                        </div>
                        <MarketPlaceSlider sliderContent={marketplaceAllListings} />
                    </div>

                    <div className='container  py-5'>
                        <div>
                            <div className='d-flex justify-content-between'>
                                <h2>Home Services</h2>
                                <div>
                                    <NavLink to='/prodcat_hsm' className='text-theme text-decoration-none fs-6 fw-bold' onClick={handleClick}>View More <i className="fa-solid fa-arrow-right-long"></i> </NavLink>
                                </div>
                            </div>
                            <p className='fw-semibold'>Take a tour of homes we'vs designed for our customers</p>
                        </div>
                        <HomeServiceCard details={homeServiceDetails} />
                    </div>

                    <div className='container  py-5'>
                        <div>
                            <div className='d-flex justify-content-between'>
                                <h2>Project Showcase</h2>
                                <div>
                                    <NavLink to='/showcase' className='text-theme text-decoration-none fs-6 fw-bold' onClick={handleClick}>View More <i className="fa-solid fa-arrow-right-long"></i> </NavLink>
                                </div>
                            </div>
                            <p className='fw-semibold'>There are many variations of passages of Lorem Ipsum</p>
                        </div>
                        <ShowcaseCard sliderContent={showcaseProjects} />
                    </div>
                </>
            )
            }
            {searchTrue && (
                <>
                    <div className='container pt-5'>

                        <h1>Search Results</h1>
                        <div className="d-flex justify-content-end">
                            <button className='btn-close' onClick={() => { setSearchTrue(false); setSearchTerm(''); }}></button>
                        </div>
                    </div>

                    {searchResults.lid.length > 0 && (
                        <div className='container pt-5'>

                            <div>
                                <div className='d-flex justify-content-between'>
                                    <h2>Marketplace</h2>

                                </div>
                                <p className='fw-semibold'>Take a tour of homes we'vs designed for our customers</p>
                            </div>

                            <MarketPlaceSlider sliderContent={searchResults.lid} />

                        </div>
                    )
                    }
                    {searchResults.pid.length > 0 && (
                        <div className='container  py-5'>
                            <div>
                                <div className='d-flex justify-content-between'>
                                    <h2>Home Services</h2>

                                </div>
                                <p className='fw-semibold'>Take a tour of homes we'vs designed for our customers</p>
                            </div>
                            <HomeServiceCard details={searchResults.pid} />
                        </div>
                    )
                    }
                    {searchResults.spid.length > 0 && (
                        <div className='container  py-5'>
                            <div>
                                <div className='d-flex justify-content-between'>
                                    <h2>Project Showcase</h2>

                                </div>
                                <p className='fw-semibold'>There are many variations of passages of Lorem Ipsum</p>
                            </div>
                            <ShowcaseCard sliderContent={searchResults.spid} />
                        </div>
                    )
                    }

                </>
            )
            }
            <div className='bg-theme-light'>
                <div className='container  py-5'>
                    <div className='text-center py-4'>
                        <h2>Promotions Or Best Seller?</h2>
                        <p className='lh-base fw-semibold'>There are many variations of passages of Lorem Ipsum</p>
                    </div>
                    {promotions.length > 0 ? <HomeServiceCard details={combinedProductInfo} />
                        : null
                    }
                </div>
            </div>

            <Offer page="Home" />
        </>
    )
}

export default Home;