import React, { useState } from 'react';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Button } from '@mui/material';
import { green } from '@mui/material/colors';
import Radio from '@mui/material/Radio';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios";
import Cookies from "js-cookie";
import audioFile from '../../assets/cart.mp3';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { LoggedMember, addbooking_hsm, getCart } from '../../handleSlice';
import { useDispatch } from 'react-redux';
import { url3 } from '../../components/port';

function HSMCheckOut({ setalertStatus, setalertmode, setalertText, loadScreen }) {
    // checked value adddress

    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = React.useState(0);
    const location = useLocation();
    const CheckData = location.state;
    console.log(CheckData);
    const handleChange = (event) => {
        setSelectedValue(Number(event.target.value));
    };
    let mid = localStorage.getItem('mid') || Cookies.get('mid');


    const dispatch = useDispatch();


    const controlProps = (index) => ({
        checked: selectedValue === index,
        onChange: handleChange,
        value: index,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': `address-${index}` },
    });

    let [cartItems, setCartItems] = useState([CheckData.HData]);
    const [loadspin, setloadspin] = useState(false);

    const memData = useSelector((state) => state.userDetails.LoggedMember);
    console.log(memData);


    const [newaddress, setnewaddress] = useState(CheckData.siteAddress);
    const [load, setLoad] = useState(false);
    const handleEditAddress = (e) => {


    }
    let address = [
        {
            pname: memData.uname,
            tag: 'Home',
            address: newaddress,
            number: CheckData.contactPer,
        },
    ]
    const handleSubmit = async () => {
        const inputDateObj = new Date(CheckData.selectDate);
        const year = inputDateObj.getFullYear();
        const month = (inputDateObj.getMonth() + 1).toString().padStart(2, '0');
        const day = inputDateObj.getDate().toString().padStart(2, '0');
        const formatted = `${year}-${month}-${day}`;
        const formData = new FormData();

        formData.append("title", CheckData.HData.product_name);
        formData.append("mid", mid);
        formData.append("venue", CheckData.siteAddress);
        formData.append("phone", CheckData.contactPer);
        formData.append("date", formatted);
        formData.append("time", CheckData.selectTime);
        formData.append("desc", CheckData.desc);
        formData.append("image1", CheckData.imagePreview);
        formData.append("image2", CheckData.imagePreview1)
        formData.append("image3", CheckData.imagePreview2)
        formData.append("consultant", "not assigned");
        formData.append("price", CheckData.HData.selling_price)
        formData.append("status", "Pending")


        if (memData && memData.uname) {
            formData.append("user", memData.uname)
        }

        loadScreen(true);
        await dispatch(addbooking_hsm(formData));
        loadScreen(false);
        setalertmode('success')
        setalertText('Booking Confirmed');
        setalertStatus(true);
        navigate("/account");

        // setTimeout(() => {
        // window.location.reload();
        // }, 1000);
    };

    const handleHitPayGateway = async () => {
        if (loadspin !== true) {
            setloadspin(true);
            let apiDetails = {
                amount: CheckData.HData.selling_price,
                currency: "SGD",
                email: memData.email,
                phone: memData.phn,
                name: memData.uname,
                payment_methods: ["paynow_online"],
                purpose: CheckData.HData.product_name,
                expires_after: "5 mins",
                redirect_url: "http://139.59.236.50:3002/account"
            }
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(apiDetails)
            };

            await fetch(`${url3}/payment-request`, options)
                .then(response => response.json())
                .then(response => setu(response))
                .catch(err => console.error(err));
        }
    }
    const [intervalId, setIntervalId] = useState(null);
    const [PayStatus, setPayStatus] = useState(false);
    const setu = (response) => {
        let intervalId = null;
        let timeoutId = null;
        let WinPay = window.open(response.url, null, "popup,width=400,height=600,left=100,top=50,");
        const checkPaymentStatus = async () => {
            try {
                const presponse = await axios.get(`${url3}/paymentStatus?request_id=${response.id}`, {
                    headers: {
                        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                    },
                });
                console.log(presponse.data);
                setPayStatus(presponse.data.status);

                if (presponse.data.status === "completed") {
                    clearInterval(intervalId);
                    clearTimeout(timeoutId);
                    handleSubmit()
                    WinPay.close();
                    setloadspin(false);
                }
            } catch (error) {
                console.log("Not submitting data");
                console.log(error);
            }
        };
        // Start the interval and store its reference in the intervalId variable
        intervalId = setInterval(checkPaymentStatus, 2000);
        // Clear the interval after 5 minutes (300,000 milliseconds)
        timeoutId = setTimeout(() => {
            clearInterval(intervalId);
            setloadspin(false);
            WinPay.close();
        }, 300000);
    };
    // const cartProducts = cartItems.map((item, index) => ({
    //     pid: item.pid,
    //     product_name: item.pname,
    //     price: item.rate,
    //     photo: item.img,
    //     count: item.count,
    //     reward_points: item.reward_points
    // }))
    useEffect(() => {
        const text = document.getElementById("text");
        const letters = text.textContent.split("");
        text.textContent = "";
        letters.forEach((letter, i) => {
            const span = document.createElement("span");
            span.textContent = letter;
            span.style.animationDelay = `${i * 0.1}s`;
            text.append(span);
        });
    }, []);
    // let p_mode = CheckData.SelPoint;
    // if (CheckData.SelPoint == 0) {
    //     p_mode = 'Online'
    // }

    // console.log(Odata);



    return (
        <>
            <div id='verifyOrder' data-bs-toggle='modal' data-bs-target='#verify-Order'></div>
            <div id='verifyClose' data-bs-dismiss='modal' data-bs-target='#verify-Order'></div>
            <div className="modal fade" id="verify-Order" >
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered " role="document">
                    <div className="modal-content rounded-0">
                        <div className="modal-body mt-3">
                            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                            </svg>
                            <h4 className='text-center pt-3'>Order Placed Successfully !!</h4>
                            <p className='text-center' id='text'>Redirecting To Account Page...</p>
                            <div className="spinner-border text-bg-success text-center" role="alert"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="address-modal" >
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered " role="document">
                    <div className="modal-content ">
                        <div className="modal-header border-0">
                            <h2>Edit Address</h2>
                            <button type="button" className="btn-close-red" id='addclose' data-bs-dismiss="modal"><i className="fa-solid fa-xmark"></i></button>
                        </div>
                        <div className="modal-body pt-0">
                            <textarea type="text" onChange={(e) => setnewaddress(e.target.value)} value={newaddress} className='form-control border-secondary p-2' placeholder='Address' />
                            {/* <Button variant='contained' color='themeColor' onClick={handleEditAddress} className='text-capitalize my-3 w-100 text-white rounded-0 shadow-none' size='large'>
                                {load == true ? (<>
                                    <div className="spinner-border text-white" role="alert"></div>
                                </>) : (<>
                                    Submit
                                </>)}
                            </Button> */}
                        </div>
                    </div>
                </div>
            </div>

            <div className='account-bg p-5'>
                <h1 className='text-white text-center' data-aos='zoom-in'>Booking Checkout</h1>
            </div>
            <section className='bg-light2'>
                <div className='container py-4'>
                    <div className="row g-3" >
                        <div className="col-lg-8 mt-4">
                            <div className='bg-white border-2 border-bottom p-3 d-flex justify-content-between align-items-center'>
                                <h5>Billing Details</h5>
                                {/* <Button color='themeColor' variant='outlined' size='large' className='px-4 rounded-0 border-2'>Change</Button> */}
                            </div>

                            {address ? address.map((item, index) => (<>
                                <div key={index} className='bg-white p-3 px-sm-4 d-flex'>
                                    <div>
                                        <Radio
                                            {...controlProps(index)}
                                            sx={{
                                                color: green[400],
                                                '&.Mui-checked': {
                                                    color: green[400],
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className='flex-fill'>
                                        <div className='d-flex ms-2 justify-content-between'>
                                            <div className="d-flex mt-1 gap-3">
                                                <div className='fs-5' >{memData.uname}</div>
                                                <div className='badge bg-light2 align-self-center rounded-pill text-dark fw-normal py-2 px-3'>{item.tag}</div>
                                            </div>
                                            {/* <div className='fs-6 cursor-pointer activet text-primary align-self-center' data-bs-target='#address-modal' data-bs-toggle='modal'>EDIT</div> */}
                                        </div>
                                        <p className='fw-light mt-2 mb-0'>{item.address}</p>
                                        <p className='fw-light'>{item.number}</p>

                                        <div className="d-flex gap-3">
                                            {/* <Button variant='contained' color='themeColor' className='shadow-none rounded-0 fw-bold text-white px-4' size='large'>Service Here</Button> */}
                                            {/* <Button variant='outlined' color='themeColor' className='shadow-none border-2 rounded-0 fw-bold px-4' size='large'>Add New Address</Button> */}
                                        </div>
                                    </div>
                                </div>
                            </>)) : (<h2 className='text-center text-secondary bg-white p-4 '>No Adddress Given</h2>)}

                            <div className='mt-2'>
                                {cartItems[0] ? cartItems.map((item, index) => (<>
                                    <div key={index} className='bg-white border-bottom border-2 fadeIn px-4 py-3'>
                                        <div className='row g-3'>
                                            <div className='col-md-3 p-0'>
                                                <img className='img-fluid w-100 object-fit-cover' style={{ maxHeight: '150px' }} src={item.thumbnail_image} alt={item.product_name} />
                                            </div>
                                            <div className='col-md-9'>
                                                <div className='d-flex ms-3 justify-content-between gap-3 aliggn-items-center'>
                                                    <h4>{item.product_name}</h4>
                                                </div>
                                                <div className=' ms-3 '>
                                                    {/* <div className='text-secondary text-decoration-line-through fs-5'>${item.cutRate}</div> */}
                                                    <h3 className='mt-1'>S$ {item.selling_price}</h3>
                                                    <p className='mt-1'>{item.short_desc}</p>
                                                    <p className='mt-1'>{CheckData.selectTime}</p>
                                                    {CheckData.selectDate && <p className='mt-1'>{CheckData.selectDate}</p>}
                                                    {/* <h3 className='mt-1'>{item.selectTime}</h3>
                                                    <h3 className='mt-1'>{item.selectDate0}</h3> */}
                                                    {/* <div className='text-info ms-3'> */}
                                                    {/* <i className="fa-solid fa-tags"></i> Save upto 50% off */}
                                                    {/* </div> */}
                                                </div>
                                                {/* <div className='mt-3'> */}
                                                {/* <Button color='inherit' className='text-theme fw-bold'>SAVE FOR LATER</Button> */}
                                                {/* </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </>)) : (<h1 className='text-center'>No Items In Cart</h1>)}

                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="bg-white shadow" data-aos='fade-up'>
                                <div className='p-4 py-3 border-bottom border-2'>
                                    <h4>Your Orders</h4>
                                </div>
                                <div className='p-4 border-bottom border-2 '>
                                    <div className="d-flex justify-content-between">
                                        <div className='text-secondary'>Subtotal ({cartItems.length} items)</div>
                                        <div className='fw-bold'>S$ {CheckData.HData.selling_price}</div>
                                    </div>
                                    {/* <div className="d-flex mt-4 justify-content-between">
                                        <div className='text-secondary'>Savings</div>
                                        <div className='fw-bold'>− ${CheckData.totalDiscount}</div>
                                    </div>
                                    <div className="d-flex mt-4 justify-content-between">
                                        <div className='text-secondary'>Tax</div>
                                        <div className='fw-bold'>+ {CheckData.serviceCharges}%</div>
                                    </div>
                                    <div className="d-flex mt-4 justify-content-between">
                                        <div className='text-secondary'>Shipping Charges</div>
                                        <div className='fw-bold'>+ ${CheckData.shipping_charges}</div>
                                    </div> */}
                                    <div className="d-flex mt-4 justify-content-between">
                                        <div className='text-secondary'>Payment Mode </div>
                                        <div className='fw-bold'>Online</div>
                                    </div>
                                </div>
                                <div className='p-4'>
                                    <div className='d-flex justify-content-between'>
                                        <h5>Total Amount</h5>
                                        <h5>${CheckData.HData.selling_price}</h5>

                                    </div>
                                    <Button fullWidth color='themeColor'
                                        onClick={handleHitPayGateway}
                                        variant='contained' className='fw-bold mt-4 shadow-none rounded-0 text-white' size='large'>
                                        {loadspin == true ? (
                                            <div className="spinner-border text-white" role="alert"></div>
                                        ) : ("Confirm Booking")}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
export default HSMCheckOut;