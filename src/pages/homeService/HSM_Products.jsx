import React, { useState, useEffect } from "react";
import Offer from '../../components/Offer';
import HomeServiceCard from '../../components/HomeServiceCard';
import electricalimg from './images/electrical.png';
import selectall from './images/select-all.png'
import '../../assets/css/HomeService.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HSM_Product_category, HSM_allProduct } from "../../handleSlice";
import { HSM_category } from "../../handleSlice";
import Category from "../../components/Category";
import { Helmet } from "react-helmet";

function HSM_Products({ loadScreen }) {

    const name = 'Prodcat'
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUserData = async () => {
            loadScreen(true);
            await dispatch(HSM_allProduct());
            await dispatch(HSM_Product_category());
            loadScreen(false);
        };
        fetchUserData();
    }, [dispatch]);
    let homeServiceDetails = useSelector(
        (state) => state.userDetails.hsm_allproducts
    );

    const seoData = useSelector((state) => state.userDetails.getAbout_cms_meta)
    const category = useSelector((state) => state.userDetails.hsm_Product_category);
    return (
        <>

<Helmet>
                <title>{seoData.metaTitle}</title>
                <meta name="description" content={seoData.metaDesc} />
                <meta name="robots" content={seoData.metaKey} />
                <meta property="og:image" content={seoData.metaImage} />
            </Helmet>

            <div className='account-bg p-5'>
                <h1 className='text-white text-center' data-aos='zoom-in'>Home Service</h1>
            </div>

            <Category loadScreen={loadScreen} categoryDetails={category} pageSize={8} productDetails={homeServiceDetails.filter(item => item.item_category === "prodcat")} pageName={name} />
        </>
    );
}

export default HSM_Products;