import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { GetSales } from '../../handleSlice';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { url1 } from '../port';

const Photo = ({ item }) => {
    const dispatch = useDispatch();
    const [sellerData, setSellerData] = useState('');
    // Fetch member data when the component mounts
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`${url1}/viewmember_crm?mid=${item.buyer_mid}`, {
                    headers: {
                        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                    },
                });
                setSellerData(response.data.member);
            } catch (error) {
                console.log("Not submitting data");
                console.log(error);
            }
        };
        fetch();
    }, [dispatch, item.seller_mid]);

    return (
        <div className='d-flex mx-3 gap-2 align-items-start sliderProfile mt-2 justify-content-end'>
            <div>
                <img src={sellerData.pic_url} alt={sellerData.uname} />
            </div>
            <div>
                <div className='lh-sm fs-5'>
                    {sellerData.uname}
                </div>
                <div className='lh-sm'>
                    {sellerData.email}
                </div>
            </div>
        </div>
    );
};

function Sales() {
    // const [purchases, setpurchases] = useState([]);
    const dispatch = useDispatch();
    const mid = localStorage.getItem('mid') || Cookies.get('mid');
    useEffect(() => {
        const fetch = async () => {
            await dispatch(GetSales(mid))
        }
        fetch();
    }, [dispatch])
    const purchases = useSelector((state) => state.userDetails.GetSales);
    return (<>
        <div className='shadow rounded p-3 bg-white'>
            <div className='text-secondary fw-semibold fs-7'>
                My Sales
            </div>
            <hr className="text-secondary mb-0" />
            <div>
                {purchases && purchases.length > 0 ? purchases.map((item, index) => (<>
                    <div key={index} className='bg-white border-bottom border-2 fadeIn px-4 py-3'>
                        <div className='row g-3'>
                            <div className='col-md-3 p-0'>
                                <img className='img-fluid w-100 object-fit-cover' style={{ minHeight: "130px", maxHeight: '150px' }} src={item.p_image} alt={item.p_title} />
                            </div>
                            <div className='col-md-9'>
                                <div className='d-flex justify-content-between flex-wrap'>
                                    <div className='ms-md-3 '>
                                        <div className='d-flex justify-content-between gap-3 aliggn-items-center'>
                                            <h4 className='fw-normal'>{item.p_title}</h4>
                                        </div>
                                        <div >
                                            <h5 className='mb-0 text-theme'>S$ {item.sold_price}</h5>
                                        </div>
                                        <div>
                                            <span className='fw-bold'>Payment Details : </span> {item.payment_details}
                                            <div>Items Sold : <span className='fw-bold'>{item.count}</span></div>
                                        </div>
                                        <p className='text-secondary  mb-0'>{item.date} / {item.time}</p>
                                    </div>
                                    <Photo item={item} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>)) : (<h3 className='text-center text-secondary'>No Items Here..</h3>)}

            </div>
        </div>
    </>)
}

export default Sales;