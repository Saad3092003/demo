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
import { LoggedMember, empty_all_cart, getCart } from '../../handleSlice';
import { useDispatch } from 'react-redux';
import { url3, url4 } from '../../components/port';

function Checkout({ setalertStatus, setalertmode, setalertText }) {
    const getCurrentDate = () => {
        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, "0");
        const month = String(currentDate.getMonth() + 1).padStart(2, "0");
        const year = String(currentDate.getFullYear());
        return `${day}-${month}-${year}`;
    };

    const getCurrentTime = () => {
        const currentDate = new Date();
        const hours = String(currentDate.getHours()).padStart(2, "0");
        const minutes = String(currentDate.getMinutes()).padStart(2, "0");
        const seconds = String(currentDate.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    };
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
    const audio = new Audio(audioFile);
    const playAudio = () => {
        audio.play();
    };
    const dispatch = useDispatch();

    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }
    const controlProps = (index) => ({
        checked: selectedValue === index,
        onChange: handleChange,
        value: index,
        name: 'color-radio-button-demo',
        inputProps: { 'aria-label': `address-${index}` },
    });

    let [cartItems, setCartItems] = useState(CheckData.cartItems);
    const [loadspin, setloadspin] = useState(false);
    const [respOID, setrespOID] = useState(false);

    const memData = useSelector((state) => state.userDetails.LoggedMember);
    console.log(memData);

    let address = [
        {
            pname: memData.uname,
            tag: 'Home',
            address: memData.address + " " + memData.zipcode + " " + memData.country,
            number: memData.phn,
        },
    ]

    const [newaddress, setnewaddress] = useState(memData.address);
    const [load, setLoad] = useState(false);
    const handleEditAddress = () => {
        async function add() {
            setLoad(true);
            const formData = new FormData();
            formData.append('mid', mid);
            formData.append('address', newaddress);
            try {
                const response = await axios({
                    method: "put",
                    url: `${url4}/api/editaddress`,
                    data: formData,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                        // "X-CSRFToken": csrfToken,
                    },
                });
                // return response.data;
                console.log(response.data);
                setalertText(response.data.message);
                setalertStatus(true);
                setalertmode('success');
            } catch (error) {
                // console.log(csrfToken)
                setalertText(error.response.data.message);
                setalertStatus(true);
                setalertmode('error');
                console.log("Not submitting data");
            }
            let addclose = document.getElementById('addclose');
            await dispatch(LoggedMember(mid))
            addclose.click();
            setLoad(false);
        };
        add();
    }

    const cartProducts = cartItems.map((item, index) => ({
        pid: item.pid,
        product_name: item.pname,
        price: item.rate,
        photo: item.img,
        count: item.count,
        reward_points: item.reward_points
    }))
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
    let p_mode = CheckData.SelPoint;
    if (CheckData.SelPoint == 0) {
        p_mode = 'Online'
    }
    const Odata = {
        mid: mid,
        amount: CheckData.totalRate.toFixed(2),
        payment_mode: "Online",
        tracking_id: `TRACK${CheckData.totalRate}`,
        delivery_status: "Pending",
        payment_status: "pending",
        email: memData.email,
        shipping_addr: memData.address + " " + memData.zipcode + " " + memData.country,
        contact: memData.phn,
        uname: memData.uname,
        coupon: `${CheckData.Seloffer.offer_type == "Price" ? ('S$ ') : ('')}${CheckData.Seloffer.price ? CheckData.Seloffer.price : '0'} ${CheckData.Seloffer.offer_type == "Percent" ? ('%') : ('')}`,
        shipping: CheckData.shipping_charges,
        subtotal: CheckData.subtotal.toFixed(2),
        tax: CheckData.serviceCharges,
        promotion_id: CheckData.offerID,
        products: cartProducts,
        date: getCurrentDate(),
        time: getCurrentTime()
    }
    const points = {
        mid: mid,
        camt: CheckData.cashback.toFixed(0),
        cdeducted: CheckData.dcashback.toFixed(0),
        ramt: CheckData.reward.toFixed(0),
        rdeducted: CheckData.dreward.toFixed(0),
    }
    console.log(Odata);

    const handlePlaceOrder = async (oid) => {
        let verifyOrder = document.getElementById('verifyOrder');
        try {
            // const response = await axios({
            //     method: "post",
            //     url: `${url3}/place_order_cart`,
            //     data: {
            //         mid: mid,
            //         amount: CheckData.totalRate.toFixed(2),
            //         payment_mode: p_mode,
            //         tracking_id: `TRACK${CheckData.totalRate}`,
            //         delivery_status: "Pending",
            //         payment_status: "paid",
            //         email: memData.email,
            //         shipping_addr: memData.address + " " + memData.zipcode + " " + memData.country,
            //         contact: memData.phn,
            //         uname: memData.uname,
            //         coupon: `${CheckData.Seloffer.offer_type == "Price" ? ('S$ ') : ('')}${CheckData.Seloffer.price ? CheckData.Seloffer.price : '0'} ${CheckData.Seloffer.offer_type == "Percent" ? ('%') : ('')}`,
            //         shipping: CheckData.shipping_charges,
            //         subtotal: CheckData.subtotal,
            //         tax: CheckData.serviceCharges,
            //         promotion_id: CheckData.offerID,
            //         products: cartProducts,
            //         oid: oid
            //     },
            //     headers: {
            //         "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
            //     },
            // });
            setrespOID(oid)
            playAudio();
            verifyOrder.click();
            // await dispatch(empty_all_cart(mid));
            // await dispatch(getCart(mid))
            // try {
            //     const formData = new FormData();
            //     formData.append('mid', mid);
            //     formData.append('amt', CheckData.cashback);
            //     formData.append('deducted', CheckData.dcashback);
            //     const response2 = await axios({
            //         method: "put",
            //         url: `${url3}/update_cashback_point_cart`,
            //         data: formData,
            //         headers: {
            //             "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
            //         },
            //     });
            //     // return response.data;
            // } catch (error) {
            //     console.log(error.response);
            // }
            // try {
            //     const formData = new FormData();
            //     formData.append('mid', mid);
            //     formData.append('amt', CheckData.reward);
            //     formData.append('deducted', CheckData.dreward);
            //     const response2 = await axios({
            //         method: "put",
            //         url: `${url3}/update_reward_point_cart`,
            //         data: formData,
            //         headers: {
            //             "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
            //         },
            //     });

            //     // return response.data;
            // } catch (error) {
            //     console.log(error.response);
            // }
        } catch (error) {
            if (error.response.data.msg) {
                console.log(error.response.data.msg);
                console.log("Order not placed");
                setalertStatus(true);
                setalertText(error.response.data.msg);
                setalertmode('error')
                setloadspin(false);
            }
        }
    }
    useEffect(() => {
        let verifyClose = document.getElementById('verifyClose');

        if (respOID !== false && document.getElementById('verifyClose')) {
            setTimeout(() => {
                verifyClose.click();
                navigate(`/orderDetailPage/${respOID}`)
                console.log(respOID);
                handleClick();
                window.location.reload()
            }, 2000);
        }
    }, [respOID])
    const productNames = cartProducts.map(item => item.product_name).join(',');
    const handleHitPayGateway = async () => {
        if (loadspin !== true) {
            setloadspin(true);
            if (CheckData.totalRate.toFixed(2) > 0) {

                let apiDetails = {
                    amount: CheckData.totalRate.toFixed(2),
                    currency: "SGD",
                    email: memData.email,
                    phone: memData.phn,
                    name: memData.uname,
                    payment_methods: ["paynow_online"],
                    purpose: productNames,
                    expires_after: "5 mins",
                    redirect_url: "http://139.59.236.50:3002/account",
                    Odata: Odata,
                    points: points,
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

            } else {
                try {
                    let verifyOrder = document.getElementById('verifyOrder');
                    const response = await axios({
                        method: "post",
                        url: `${url3}/place_order_cart`,
                        data: {
                            mid: mid,
                            amount: CheckData.totalRate.toFixed(2),
                            payment_mode: p_mode,
                            tracking_id: `TRACK${CheckData.totalRate}`,
                            delivery_status: "Pending",
                            payment_status: "paid",
                            email: memData.email,
                            shipping_addr: memData.address + " " + memData.zipcode + " " + memData.country,
                            contact: memData.phn,
                            uname: memData.uname,
                            coupon: `${CheckData.Seloffer.offer_type == "Price" ? ('S$ ') : ('')}${CheckData.Seloffer.price ? CheckData.Seloffer.price : '0'} ${CheckData.Seloffer.offer_type == "Percent" ? ('%') : ('')}`,
                            shipping: CheckData.shipping_charges,
                            subtotal: CheckData.subtotal,
                            tax: CheckData.serviceCharges,
                            promotion_id: CheckData.offerID,
                            products: cartProducts,
                            oid: `${CheckData.subtotal}${getCurrentDate()}${getCurrentTime()}${Math.random()}`
                        },
                        headers: {
                            "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                        },
                    });
                    setrespOID(response.data.oid)
                    playAudio();
                    verifyOrder.click();
                    await dispatch(empty_all_cart(mid));
                    await dispatch(getCart(mid))
                    try {
                        const formData = new FormData();
                        formData.append('mid', mid);
                        formData.append('amt', CheckData.cashback);
                        formData.append('deducted', CheckData.dcashback.toFixed(0));
                        const response2 = await axios({
                            method: "put",
                            url: `${url3}/update_cashback_point_cart`,
                            data: formData,
                            headers: {
                                "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                            },
                        });
                    } catch (error) {
                        console.log(error.response);
                    }
                    try {
                        const formData = new FormData();
                        formData.append('mid', mid);
                        formData.append('amt', CheckData.reward);
                        formData.append('deducted', CheckData.dreward.toFixed(0));
                        const response2 = await axios({
                            method: "put",
                            url: `${url3}/update_reward_point_cart`,
                            data: formData,
                            headers: {
                                "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                            },
                        });
                    } catch (error) {
                        console.log(error.response);
                    }
                } catch (error) {
                    if (error.response.data.msg) {
                        console.log(error.response.data.msg);
                        console.log("Order not placed");
                        setalertStatus(true);
                        setalertText(error.response.data.msg);
                        setalertmode('error')
                        setloadspin(false);
                    }
                }
            }
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
                    handlePlaceOrder(response.id)
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

    return (
        <>
            <div id='vOrder' data-bs-toggle='modal' data-bs-target='#Order'></div>
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
                            <Button variant='contained' color='themeColor' onClick={handleEditAddress} className='text-capitalize my-3 w-100 text-white rounded-0 shadow-none' size='large'>
                                {load == true ? (<>
                                    <div className="spinner-border text-white" role="alert"></div>
                                </>) : (<>
                                    Submit
                                </>)}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='account-bg p-5'>
                <h1 className='text-white text-center' data-aos='zoom-in'>Checkout</h1>
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
                                                <div className='fs-5' >{item.pname}</div>
                                                <div className='badge bg-light2 align-self-center rounded-pill text-dark fw-normal py-2 px-3'>{item.tag}</div>
                                            </div>
                                            <div className='fs-6 cursor-pointer activet text-primary align-self-center' data-bs-target='#address-modal' data-bs-toggle='modal'>EDIT</div>
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
                                                <img className='img-fluid w-100 object-fit-cover' style={{ maxHeight: '150px' }} src={item.img} alt={item.pname} />
                                            </div>
                                            <div className='col-md-9'>
                                                <div className='d-flex ms-3 justify-content-between gap-3 aliggn-items-center'>
                                                    <h4>{item.pname}</h4>
                                                </div>
                                                <div className=' ms-3 '>
                                                    <div className='text-secondary text-decoration-line-through fs-5'>S$ {item.cutRate}</div>
                                                    <h3 className='mt-1'>S$ {item.rate}</h3>
                                                </div>
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
                                        <div className='fw-bold'>S$ {CheckData.subtotal.toFixed(2)}</div>
                                    </div>
                                    <div className="d-flex mt-4 justify-content-between">
                                        <div className='text-secondary'>Savings</div>
                                        <div className='fw-bold'>− S$ {CheckData.totalDiscount.toFixed(2)}</div>
                                    </div>
                                    <div className="d-flex mt-4 justify-content-between">
                                        <div className='text-secondary'>Tax</div>
                                        <div className='fw-bold'>+ {CheckData.serviceCharges}%</div>
                                    </div>
                                    <div className="d-flex mt-4 justify-content-between">
                                        <div className='text-secondary'>Shipping Charges</div>
                                        <div className='fw-bold'>+ S$ {CheckData.shipping_charges}</div>
                                    </div>
                                    <div className="d-flex mt-4 justify-content-between">
                                        <div className='text-secondary'>Payment Mode </div>
                                        <div className='fw-bold'>{p_mode}</div>
                                    </div>
                                </div>
                                <div className='p-4'>
                                    <div className='d-flex justify-content-between'>
                                        <h5>Total Amount</h5>
                                        <h5>{CheckData.totalRate.toFixed(2)}</h5>

                                    </div>
                                    <Button fullWidth color='themeColor' onClick={handleHitPayGateway} variant='contained' className='fw-bold mt-4 shadow-none rounded-0 text-white' size='large'>
                                        {loadspin == true ? (
                                            <div className="spinner-border text-white" role="alert"></div>
                                        ) : ("Place Order")}
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
export default Checkout;