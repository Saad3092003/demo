import React, { useState, useEffect } from 'react';
import SearchBar from "../../components/SearchBar";
import { Button } from '@mui/material';
import Offer from "../../components/Offer";
import s1 from './images/Movers & Delivery.png';
import s2 from './images/Home Repairs.png';
import s3 from './images/Property.png';
import s4 from './images/Mobile Phones.png';
import s5 from './images/Electronics Repairs.png';
import s6 from './images/cars.png';
import '../../assets/css/MarketPlace.css';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { Link } from "react-router-dom";
import MarketPlaceCard from "../../components/MarketPlaceCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { AllCategories_mpm, MarketplaceAllListing } from '../../handleSlice';
import { url3, url4 } from '../../components/port';
import Cookies from 'js-cookie';

function MarketPlace({ loadScreen }) {

    const dispatch = useDispatch();
    let marketplaceAllListings = useSelector(
        (state) => state.userDetails.marketplaceAllListings
    );
    let mid = localStorage.getItem('mid') || Cookies.get('mid');
    
    useEffect(() => {
        const fetchUserData = async () => {
            loadScreen(true);
            await dispatch(MarketplaceAllListing());
            await dispatch(AllCategories_mpm());
            loadScreen(false);
        };
        fetchUserData();
    }, [dispatch]);

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }


    const [sortedListings, setSortedListings] = useState([]);
    const [bestSelling , setBestSelling] = useState([]);
    const [recommended ,setRecommended] = useState([]);
   

    useEffect(() => {
      const fetchViewCount = async () => {
        loadScreen(true);
        const updatedData = await Promise.all(
          marketplaceAllListings.map(async (item) => {
            try {
              const response = await fetch(`${url4}/api/view_Product?pid=${item.lid}`,
              {
                method: 'GET',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8", // Add your API-key header
                  }

              }
              );
              const result = await response.json();
              console.log("result" , result);
              return { ...item, viewCount: result.viewCount };
            } catch (error) {
              console.error(`Error fetching viewCount for ${item.lid}:`, error);
              return item; // Keep the original item if there's an error fetching viewCount
            }
          })
        );
  
        // Sort the data based on viewCount in descending order
        const sortedData = [...updatedData].sort((a, b) => b.viewCount - a.viewCount).filter(item => item.viewCount !== 0);
        setSortedListings(sortedData);
        loadScreen(false);
      };
  
      fetchViewCount();
    }, [marketplaceAllListings]);

    useEffect(() => {
        const fetchBuyersCount = async () => {
            loadScreen(true);
          const updatedData = await Promise.all(
            marketplaceAllListings.map(async (item) => {
              try {
                const response = await fetch(`${url3}/get_buyers_listing_profile?lid=${item.lid}`,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                            "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8", // Add your API-key header
                      }
    
                  }
                );
                const result = await response.json();
                return { ...item, buyersCount: result.buyers.length };
              } catch (error) {
                console.error(`Error fetching buyers count for ${item.lid}:`, error);
                return item; // Keep the original item if there's an error fetching buyers count
              }
            })
          );
    
          // Sort the data based on buyersCount in descending order
          const sortedData = [...updatedData].sort((a, b) => b.buyersCount - a.buyersCount).filter(item => item.buyersCount !== 0);
          setBestSelling(sortedData);
          loadScreen(false);
        };
    
        fetchBuyersCount();
      }, [marketplaceAllListings]);

      useEffect(() => {
        const fetchBuyersCount = async () => {
            loadScreen(true);
          const updatedData = await Promise.all(
            marketplaceAllListings.map(async (item) => {
              try {
                const response = await fetch(`${url3}/get_buyers_listing_profile?lid=${item.lid}`);
                const result = await response.json();
                return { ...item, buyers: result.buyers };
              } catch (error) {
                console.error(`Error fetching buyers count for ${item.lid}:`, error);
                return item; // Keep the original item if there's an error fetching buyers count
              }
            })
          );
    
          // Sort the data based on buyersCount in descending order
          const filteredData = updatedData.filter((item) => item?.buyers?.includes(mid));
          setRecommended(filteredData);
          loadScreen(false);
        };
    
        fetchBuyersCount();
      }, [marketplaceAllListings]);
  
    // let services = [
    //     {
    //         sname: 'Movers & Delivery',
    //         img: s1,
    //     },
    //     {
    //         sname: 'Home Repairs',
    //         img: s2,
    //     },
    //     {
    //         sname: 'Property',
    //         img: s3,
    //     },
    //     {
    //         sname: 'Mobile Phones & Gadgets',
    //         img: s4,
    //     },
    //     {
    //         sname: 'Electronics Repairs',
    //         img: s5,
    //     },
    //     {
    //         sname: 'Cars',
    //         img: s6,
    //     },
    // ]
    console.log(sortedListings);
    const seoData = useSelector((state) => state.userDetails.getAbout_cms_meta)
    let services = useSelector((state) => state.userDetails.AllCategories_mpm);
    return (
        <>
            <Helmet>
                <title>{seoData.metaTitle}</title>
                <meta name="description" content={seoData.metaDesc} />
                <meta name="robots" content={seoData.metaKey} />
                <meta property="og:image" content={seoData.metaImage} />
            </Helmet>
            <div className='account-bg p-5'>
                <h1 className='text-white text-center' data-aos='zoom-in'>Marketplace</h1>
            </div>

            <div className="container py-5">
                <div className='d-flex justify-content-between'>
                    <h3>Categories</h3>
                    <div className='fs-5'>
                        <Link onClick={handleClick} to='/category_mpm' className='text-theme text-decoration-none'>View More <ArrowRightAltIcon fontSize='large' /></Link>
                    </div>
                </div>
                <div className='my-4 row g-3 rounded-3 mt-4 flex-nowrap flex-md-wrap overflow-auto'>
                    {services.slice(0, 6).map((items, index) => (
                        <>
                            <div data-aos='zoom-in' data-aos-delay={(index) * 100} data-aos-duration='700' key={index} className='col-sm-5 col-6 col-md-4 col-lg-2 col-xl-2'>
                                <div className='service-icon-box shadow-sm position-relative bg-light2 mx-auto'>
                                    <img src={items.category_icon} width='70' className='img-fluid  mt-2' alt={items.category_name} />
                                    <Link to='/category_mpm' state={{ index: items.category_name }} className='stretched-link' onClick={handleClick}></Link>
                                </div>
                                <p className='text-center mt-sm-3 mt-1 mb-0'>{items.category_name}</p>
                            </div>
                        </>
                    ))}
                </div>
                <div className='d-flex mt-5 justify-content-between'>
                    <h3>Trending Now</h3>
                    <div className='fs-5'>
                        <Link onClick={handleClick} to='/category_mpm' className='text-theme text-decoration-none'>View More <ArrowRightAltIcon fontSize='large' /></Link>
                    </div>
                </div>
                <div className='mt-4'>
                    <MarketPlaceCard sliderContent={sortedListings.slice(0, 4)} />
                </div>

                <div className='d-flex mt-5 justify-content-between'>
                    <h3>Best Selling Product</h3>
                    <div className='fs-5'>
                        <Link onClick={handleClick} to='/category_mpm' className='text-theme text-decoration-none'>View More <ArrowRightAltIcon fontSize='large' /></Link>
                    </div>
                </div>
                <div className='mt-4'>
                    <MarketPlaceCard sliderContent={bestSelling.slice(0, 4)} />
                </div>

                <div className='d-flex mt-5 justify-content-between'>
                    <h3>Recommended For you</h3>
                    <div className='fs-5'>
                        <Link onClick={handleClick} to='/category_mpm' className='text-theme text-decoration-none'>View More <ArrowRightAltIcon fontSize='large' /></Link>
                    </div>
                </div>
                <div className='mt-4'>
                    <MarketPlaceCard sliderContent={recommended.slice(0, 4)} />
                </div>
                <div className='py-2 text-center'>

                    {/* <Button variant='outlined' color='themeColor' className='text-capitalize bg-white rounded-0 shadow-none mt-5 border-2 px-5' size='large'>Load More</Button> */}

                </div>
            </div>
            <Offer />
        </>
    )
}
export default MarketPlace;