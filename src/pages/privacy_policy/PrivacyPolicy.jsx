import React, { useState, useEffect } from 'react';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Offer from '../../components/Offer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUs_cms, getAllDepartments_cms, getAbout_cms_meta, getPrivacy_cms } from '../../handleSlice';
import { Helmet } from 'react-helmet';

function PrivacyPolicy({ loadScreen }) {



    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUserListing = async () => {
            loadScreen(true);
            await dispatch(getPrivacy_cms());
            loadScreen(false);
        }
        fetchUserListing();
    }, [dispatch])


    const seoData = useSelector((state) => state.userDetails.getAbout_cms_meta)
    const privacyData = useSelector((state) => state.userDetails.getPrivacy_cms)
    const newsletter_controller = useSelector((state) => state.userDetails.newsletter_controller)
    useEffect(() => {
        if (document.getElementById("privacy-content")) {
            let content = document.getElementById("privacy-content");
            content.innerHTML = privacyData.privacy_policy;
        }
    }, [privacyData])
    return (
        <>
            <Helmet>
                <title>{seoData.metaTitle}</title>
                <meta name="description" content={seoData.metaDesc} />
                <meta name="robots" content={seoData.metaKey} />
                <meta property="og:image" content={seoData.metaImage} />
            </Helmet>
            <div className='account-bg p-5'>
                <h1 className='text-white text-center' data-aos='zoom-in'>Privacy Policy</h1>
            </div>
            <div className='container'>

                <div className='pt-4'>
                    <p className="text-secondary" id='privacy-content'></p>




                </div>



            </div>

            <Offer page="Privacy Policy" />
        </>
    )
}
export default PrivacyPolicy;