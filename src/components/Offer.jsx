import React, { useEffect, useState } from "react";
import '../assets/css/offer.css';
import { Button } from '@mui/material';
import { get_footer_data_cms, newsletter_controller } from "../handleSlice";
import { useDispatch, useSelector } from "react-redux";
import { url3 } from "./port";

function Offer({ page }) {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    useEffect(() => {
        const fetchFooterData = async () => {
            await dispatch(get_footer_data_cms());
            await dispatch(newsletter_controller());
        }
        fetchFooterData();
    }, [dispatch])
    const [msg, setmsg] = useState("");
    const preData = useSelector((state) => state.userDetails.get_footer_data_cms);
    const news_pages = useSelector((state) => state.userDetails.newsletter_controller);
    const handleSubscribe = async () => {
        let apiDetails = {
            email: email
        }
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(apiDetails)
        };

        await fetch(`${url3}/subscribe_newsletter`, options)
            .then(response => setu(response))
            .catch(err => errc(err));
    }
    const setu = (response) => {
        if (response.status == 200) {
            setmsg("Subscribed Successfully !!")
        }
        if (response.status == 404) {
            setmsg("Already Subscribed")
        }
    }
    const errc = (err) => {
        setmsg("Error Please try again")
    }
    return (
        <>
            {news_pages.includes(page) && (
                <div className='bg-offer-banner' style={{ backgroundImage: `url(${preData.bg_img})` }}>
                    <div className='container'>
                        <div className='py-5 row'>
                            <div className='offset-lg-5 col-lg-6'>
                                <h2 className='text-white' data-aos-duration='1000' data-aos='fade-left'>{preData.title}</h2>
                                <p className='text-light' data-aos-duration='1000' data-aos='fade-right'>{preData.subtitle}</p>
                                <div className='input-group input-group-lg' data-aos-duration='1000' data-aos='zoom-in'>
                                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' className='rounded-0 form-control' />

                                    <Button variant='contained' color='themeColor' onClick={handleSubscribe} className='text-capitalize text-white rounded-0 shadow-none' size='large'>Subscribe</Button>

                                </div>
                                <div style={{ width: "fit-content" }} className="bg-white mt-2 fs-7 text-theme px-3 pb-1 fw-bold rounded">{msg}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}
export default Offer;