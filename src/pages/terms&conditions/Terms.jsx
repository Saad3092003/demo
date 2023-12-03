import React, { useState, useEffect } from 'react';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Offer from '../../components/Offer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUs_cms, getAllDepartments_cms, getAbout_cms_meta, getTerms_cms } from '../../handleSlice';
import { Helmet } from 'react-helmet';

function Terms({ loadScreen }) {






    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUserListing = async () => {

            loadScreen(true);
            await dispatch(getTerms_cms());
            loadScreen(false);

        }
        fetchUserListing();
    }, [dispatch])







    const seoData = useSelector((state) => state.userDetails.getAbout_cms_meta)

    const termsData = useSelector((state) => state.userDetails.getTerms_cms)
    const newsletter_controller = useSelector((state) => state.userDetails.newsletter_controller)

    useEffect(() => {
        if (document.getElementById("term-content")) {
            let content = document.getElementById("term-content");
            content.innerHTML = termsData.terms_and_conditions;
        }
    }, [termsData])
    return (
        <>
            <Helmet>
                <title>{seoData.metaTitle}</title>
                <meta name="description" content={seoData.metaDesc} />
                <meta name="robots" content={seoData.metaKey} />
                <meta property="og:image" content={seoData.metaImage} />
            </Helmet>
            <div className='account-bg p-5'>
                <h1 className='text-white text-center' data-aos='zoom-in'>Terms and Conditions</h1>
            </div>
            <div className='container'>

                <div className='pt-4' id='term-content'>

                </div>



            </div>
            <Offer page="Terms and Condition" />

        </>
    )
}
export default Terms;