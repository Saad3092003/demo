import React, { useState, useEffect } from 'react';

import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Offer from '../../components/Offer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAboutUs_cms, getAllDepartments_cms, getAbout_cms_meta, getRefund_cms } from '../../handleSlice';
import { Helmet } from 'react-helmet';

function RefundPol({ loadScreen }) {





    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUserListing = async () => {
            loadScreen(true);
            await dispatch(getRefund_cms());
            loadScreen(false);

        }
        fetchUserListing();
    }, [dispatch])









    const seoData = useSelector((state) => state.userDetails.getAbout_cms_meta)
    const refundData = useSelector((state) => state.userDetails.getRefund_cms)
    useEffect(() => {
        if (document.getElementById("refund-content")) {
            let content = document.getElementById("refund-content");
            content.innerHTML = refundData.refund_policy;
        }
    }, [refundData])
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
                <h1 className='text-white text-center' data-aos='zoom-in'>Refund Policy</h1>
            </div>
            <div className='container'>

                <div className='pt-4'>
                    <p className="text-secondary" id='refund-content'></p>





                </div>



            </div>

            <Offer page="Refund Policy" />
        </>
    )
}
export default RefundPol;