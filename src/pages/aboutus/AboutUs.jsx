import React, { useState, useEffect } from 'react';
import aboutimg from './images/about-us.jpg';
import '../../assets/css/about-us.css';
import missionimg from './images/mission.jpg';
import visionimg from './images/vission.jpg';
import p1 from './images/p1.jpeg';
import p2 from './images/p2.jpeg';
import p3 from './images/p3.jpeg';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Offer from '../../components/Offer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUs_cms, getAllDepartments_cms, getAbout_cms_meta } from '../../handleSlice';
import { Helmet } from 'react-helmet';

function AboutUs({ loadScreen }) {
    let cardslide = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
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
    const [sliderContent, setSliderContent] = useState([]);

    const dispatch = useDispatch();
    const AboutUsData = useSelector(
        (state) => state.userDetails.getAboutUs_cms
    );
    const AllDepartments = useSelector(
        (state) => state.userDetails.getAllDepartments_cms
    );
    const [bannerpicurl, setBannerpicURL] = useState('');
    const [description, setDescription] = useState('');
    const [description1, setDescription1] = useState('');
    const [description2, setDescription2] = useState('');
    const [description3, setDescription3] = useState('');
    const [description4, setDescription4] = useState('');
    const [picurl3, setpicURL3] = useState('');
    const [picurl4, setpicURL4] = useState('');
    const [title, setTitle] = useState('');
    const [title1, setTitle1] = useState('');
    const [title2, setTitle2] = useState('');
    const [title3, setTitle3] = useState('');
    const [title4, setTitle4] = useState('');



    useEffect(() => {
        const fetchUserData = async () => {

            loadScreen(true);
            await dispatch(getAboutUs_cms());
            await dispatch(getAbout_cms_meta());
            await dispatch(getAllDepartments_cms());
            loadScreen(false);



        };
        fetchUserData();


    }, [dispatch]);


    useEffect(() => {
        setBannerpicURL(AboutUsData.banner_picture_url);
        setDescription(AboutUsData.description)
        setDescription1(AboutUsData.description1)
        setDescription2(AboutUsData.description2)
        setDescription3(AboutUsData.description3)
        setDescription4(AboutUsData.description4)
        setpicURL3(AboutUsData.picture3_url)
        setpicURL4(AboutUsData.picture4_url)
        setTitle(AboutUsData.title)
        setTitle1(AboutUsData.title1)
        setTitle2(AboutUsData.title2)
        setTitle3(AboutUsData.title3)
        setTitle4(AboutUsData.title4)
    }, [AboutUsData])

    const seoData = useSelector((state) => state.userDetails.getAbout_cms_meta)
    console.log(AboutUsData);
    console.log(AllDepartments);

    useEffect(() => {
        setSliderContent(AllDepartments);
    }, [AllDepartments]);
    const newsletter_controller = useSelector((state) => state.userDetails.newsletter_controller)
    return (
        <>
            <Helmet>
                <title>{seoData.metaTitle}</title>
                <meta name="description" content={seoData.metaDesc} />
                <meta name="robots" content={seoData.metaKey} />
                <meta property="og:image" content={seoData.metaImage} />
            </Helmet>
            <div className='account-bg p-5'>
                <h1 className='text-white text-center' data-aos='zoom-in'>About Us</h1>
            </div>
            <div className='container'>
                <div className='aboutimg py-5 my-5' data-aos='fade-up' data-aos-duration='1000'>
                    <img src={bannerpicurl} className='img-fluid w-100 object-fit-cover' />
                </div>
                <div className='pt-4'>
                    <h3 className='my-3' data-aos='fade-up'>{title}</h3>
                    <p className='text-secondary' data-aos='fade-up'>{description}</p>
                </div>
                <div className='py-2'>
                    <h3 className='my-3' data-aos='fade-up'>{title1}</h3>
                    <p className='text-secondary' data-aos='fade-up'>{description1}</p>
                </div>
                <hr />
                <div className='py-4 row g-3'>
                    <div className='col-lg-4' data-aos-duration='1000' data-aos='fade-up'>
                        <img src={picurl3} className='img-fluid w-100' />
                    </div>
                    <div className='col-lg-8' data-aos-duration='1000' data-aos='fade-left'>
                        <h3 className='my-3'>{title2}</h3>
                        <p className='text-secondary'>{description2}</p>
                    </div>
                </div>
                <hr />

                <div className='mt-4 row g-3'>
                    <div className='col-lg-8' data-aos-duration='1000' data-aos='fade-right'>
                        <h3 className='my-3'>{title3}</h3>
                        <p className='text-secondary'>
                            {description3}
                        </p>
                    </div>
                    <div className='col-lg-4' data-aos-duration='1000' data-aos='fade-left'>
                        <img src={picurl4} className='img-fluid w-100' />
                    </div>
                </div>
            </div>
            <div className='container-fluid bg-theme-light py-5'>
                <div className="container" data-aos='fade-up'>
                    <h2 className='text-center my-4'>Our Departments</h2>
                    <Slider {...cardslide} className='main-slide'>
                        {sliderContent.length > 3 && sliderContent.map((items, index) => (
                            <div key={index} className="p-3">
                                <div className='bg-white slider-card shadow position-relative cursor-pointer'>
                                    <div className=' overflow-hidden rounded'>
                                        <img className='img-fluid w-100 t3 object-fit-cover' style={{ height: '18rem' }} src={items.department_photo} />
                                    </div>
                                    <Link to='/team' state={{ id: items.dept_id, name: items.department_name }}
                                        // '/team'
                                        onClick={handleClick} className='stretched-link '></Link>
                                    <div className='p-3'>
                                        <h4>{items.department_name}</h4>
                                        <p className='text-theme fw-bold'>View All Team Members <ArrowRightAltIcon fontSize='large' /></p>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </Slider>
                    <div className='row '>
                        {sliderContent.length <= 3 && sliderContent.map((items, index) => (
                            <div key={index} className="p-3 col-xl-4 col-md-6">
                                <div className='bg-white slider-card shadow position-relative cursor-pointer'>
                                    <div className=' overflow-hidden rounded'>
                                        <img className='img-fluid w-100 t3 object-fit-cover' style={{ height: '18rem' }} src={items.department_photo} />
                                    </div>
                                    <Link to='/team' state={items.dept_id} onClick={handleClick} className='stretched-link '></Link>
                                    <div className='p-3'>
                                        <h4>{items.department_name}</h4>
                                        <p className='text-theme fw-bold'>View All Team Members <ArrowRightAltIcon fontSize='large' /></p>
                                    </div>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div>
            <Offer page="About Us" />
        </>
    )
}
export default AboutUs;