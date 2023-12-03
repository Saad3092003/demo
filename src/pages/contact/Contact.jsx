import React, { useEffect, useState } from 'react'
import phoneimg from '../homeService/images/call-outline.svg';
import emailimg from '../homeService/images/mail-open-outline.svg';
import messageimg from '../homeService/images/chatbubble-ellipses-outline.svg';
import { Button } from '@mui/material';
import phoneicon from './images/phoneicon.svg';
import mapicon from './images/mapicon.svg';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getContactPage_cms, getContactUs_cms_meta } from '../../handleSlice';
import { ManOutlined } from '@mui/icons-material';
import axios from 'axios';
import { url4 } from '../../components/port';
import Offer from '../../components/Offer';

function Contact({ loadScreen, setalertmode, setalertStatus, setalertText }) {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phn, setPhn] = useState('');
    const [message, setMessage] = useState('');
    const contactDetails = useSelector(
        (state) => state.userDetails.getContactPage_cms
    );
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [tel, setTel] = useState('')
    const [officeAd, setOfficeAd] = useState('')
    useEffect(() => {
        const fetchUserData = async () => {

            loadScreen(true);
            await dispatch(getContactPage_cms());
            await dispatch(getContactUs_cms_meta());
            loadScreen(false);

        };
        fetchUserData();
    }, [dispatch]);
    const seoData = useSelector((state) => state.userDetails.getContactUs_cms_meta)

    useEffect(() => {

        setEmail(contactDetails.email);
        setMobile(contactDetails.contact_number);
        setTel(contactDetails.tel)
        setOfficeAd(contactDetails.office_address)
    }, [contactDetails])
    console.log(contactDetails);
    console.log(email)
    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();

        formData.append("uname", name);
        formData.append("email", mail);
        formData.append("contact", phn);
        formData.append("message", message);


        try {
            const response = await axios({
                method: "post",
                url: `${url4}/api/contact`,
                data: formData,
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            })
                .then(async (response) => {



                    console.log(response)
                    setalertText("Message Sent");
                    setalertStatus(true);
                    setalertmode('success')
                    setMail('')
                    setName('')
                    setPhn('')
                    setMessage('')


                })
        }
        catch (err) {
            console.log(err);

            setalertStatus(true);
            setalertText(err.response.data.msg);
            setalertmode('error')

        };




    }
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
                <h1 className='text-white text-center' data-aos='zoom-in'>Contact Us</h1>
            </div>
            <div className='container py-5'>
                <div className="row" >
                    <div className="col-lg-8" data-aos-duration='1000' data-aos='fade-right'>
                        <iframe className='w-100' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d33564.02436941504!2d103.85696161077104!3d1.3421822346365746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31da11238a8b9375%3A0x887869cf52abf5c4!2sSingapore!5e0!3m2!1sen!2sin!4v1690732394942!5m2!1sen!2sin" height="400" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="col-lg-4" data-aos-duration='1000' data-aos='fade-left'>
                        <div className='p-2 p-sm-3 px-sm-4  bg-black text-white'>
                            <h5>Connect With Us</h5>
                            <div className='d-flex gap-2 py-4 border-bottom'>
                                <div>
                                    <img src={phoneimg} width='40' />
                                </div>
                                <div>
                                    <div className='fs-7'>Mobile Number/Whatsapp</div>
                                    <div className='fw-bold lh-sm'>{mobile}</div>
                                </div>
                            </div>
                            <div className='d-flex gap-2 py-4 border-bottom'>
                                <div>
                                    <img src={emailimg} width='40' />
                                </div>
                                <div>
                                    <div className='fs-7'>Email ID</div>
                                    <div className='fw-bold lh-sm'>{email}</div>
                                </div>
                            </div>
                            <div className='d-flex gap-2 py-4 pb-4'>
                                <div>
                                    <img src={messageimg} width='40' />
                                </div>
                                <div>
                                    <div className='fs-7'>Phone /SMS</div>
                                    <div className='fw-bold lh-sm'>{tel}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-light2 py-5'>
                <form onSubmit={handleSubmit}>
                    <div className="container" data-aos='fade-up' data-aos-duration='1000'>
                        <h4>Get in Touch</h4>
                        <div className="row py-3">

                            <div className="col-md-6">
                                <p className='mb-2'>Your name</p>
                                <input type="text" placeholder='Enter your name' className='form-control form-control-lg border-success' value={name} onChange={(e) => setName(e.target.value)} />
                                <p className='mt-3 mb-2'>Your email address</p>
                                <input type="text" placeholder='Enter email address' className='form-control form-control-lg border-success' value={mail} onChange={(e) => setMail(e.target.value)} />
                                <p className='mt-3 mb-2'>Phone No.</p>
                                <input type="text" placeholder='Enter phone no' className='form-control form-control-lg border-success' value={phn} onChange={(e) => setPhn(e.target.value)} />
                                <Button className='shadow-none mt-4 text-white px-5 rounded-0' variant='contained' color='themeColor' size='large' onClick={handleSubmit}>Submit</Button>
                            </div>

                            <div className="col-md-6">
                                <p className='mb-2'>Message</p>
                                <textarea className='h-75 w-100 form-control border-success' placeholder='Type your message' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            </div>

                        </div>
                        <h4 className='mt-4'>Singapore Office</h4>
                        <div className='d-flex gap-3 mt-3 align-items-center'>
                            <img src={mapicon} width='20' />
                            <div >{officeAd}</div>
                        </div>
                        <div className='d-flex gap-3 mt-3 align-items-center'>
                            <img src={phoneicon} width='20' />
                            <div >+65-63395593, +65-62840171</div>
                        </div>

                    </div>
                </form>
            </div>
            <Offer page="Contact Us" />
        </>
    )
}
export default Contact;