import React, { useState, useEffect } from 'react';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddIcon from '@mui/icons-material/Add';
import { IconButton, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, editCart, generalConf, LoggedMember } from '../../handleSlice';
import axios from 'axios';
import Cookies from 'js-cookie';
import CloseIcon from '@mui/icons-material/Close';
import { url1, url3, url4 } from '../../components/port';

const ItemCount = ({ count, mid, pid, setCartItems, cartItems, quantity }) => {
    const dispatch = useDispatch();
    let [cartcount, setCartcount] = useState(count);



    const pluscart = async () => {
        if (cartcount < quantity) {
            const formData = new FormData();
            formData.append("mid", mid);
            formData.append("pid", pid);
            formData.append("count", cartcount + 1);
            await dispatch(editCart(formData));
            setCartcount(cartcount + 1);
            const updatedCartItems = cartItems.map((item, index) => {
                if (item.pid == pid) {
                    return {
                        ...item,
                        count: item.count + 1
                    };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        } else {
            alert("No more Items in the stock")
        }
    }
    const minuscart = async () => {
        if (cartcount <= 1) {
            setCartcount(1)
        }
        else {
            const formData = new FormData();
            formData.append("mid", mid);
            formData.append("pid", pid);
            formData.append("count", cartcount - 1);
            await dispatch(editCart(formData));
            setCartcount(cartcount - 1);
            const updatedCartItems = cartItems.map((item, index) => {
                if (item.pid == pid) {
                    return {
                        ...item,
                        count: item.count - 1
                    };
                }
                return item;
            });
            setCartItems(updatedCartItems);
        }
    }
    return (
        <div className='d-flex gap-2 justify-content-center mt-2'>
            <IconButton onClick={minuscart} className='border border-secondary' size='small'>
                <RemoveOutlinedIcon />
            </IconButton>
            <div className='align-self-center'>
                <div className='border border-secondary px-4'>
                    {cartcount}
                </div>
            </div>
            <IconButton onClick={pluscart} className='border border-secondary' size='small'>
                <AddIcon />
            </IconButton>
        </div>
    )
}



function Cart({ loadScreen }) {
    const [sum, setSum] = useState(0);
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }
    const [OfferData, setOfferData] = useState(0);
    const [Seloffer, setSelOffer] = useState(0);
    const dispatch = useDispatch();
    useEffect(() => {
    }, [OfferData])
    console.log(OfferData);
    let mid = localStorage.getItem('mid') || Cookies.get('mid');
    useEffect(() => {
        async function fetch() {
            loadScreen(true)
            await dispatch(getCart(mid))
            await dispatch(LoggedMember(mid));
            await dispatch(generalConf());
            loadScreen(false)
        }
        fetch();
    }, [dispatch])

    const memData = useSelector((state) => state.userDetails.LoggedMember);
    let getallcart = useSelector((state) => state.userDetails.getCart);
    const configs = useSelector((state) => state.userDetails.generalConf);
    const [SelPoint, setSelPoint] = useState(0);
    let [cart, setcart] = useState([]);
    useEffect(() => {
        setcart(getallcart)
    }, [getallcart])

    console.log(configs);
    const [cashback_conversion, setcashback_conversion] = useState(1);
    const [reward_conversion, setreward_conversion] = useState(1)
    useEffect(() => {
        let cpoint = memData.cashback_points * configs.cashback_rate;
        setcashback_conversion(cpoint.toFixed(2))
        let rpoint = memData.reward_points * configs.reward_rate;
        setreward_conversion(rpoint.toFixed(2))
    }, [configs, memData])
    console.log(reward_conversion);
    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const productPromises = cart.map(async (item, index) => {
                    try {
                        const response = await axios.get(`${url1}/getProduct_hsm?pid=${item.pid}`, {
                            headers: {
                                "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                            },
                        });
                        const product = response.data.product;
                        console.log(product);
                        return {
                            pid: item.pid,
                            pname: product.product_name,
                            img: product.thumbnail_image,
                            quantity_pi: product.quantity_pi,
                            quantity_lsqw: product.quantity_lsqw,
                            rate: product.selling_price,
                            cutRate: product.unit_price,
                            discount: product.discount,
                            discount_type: product.discount_type,
                            reward_points: product.reward_points,
                            count: cart[index].count,
                        };
                    }
                    catch (error) {
                        // console.log(csrfToken)
                        console.log("Not submitting data");
                    }
                });

                const productDetails = await Promise.all(productPromises);
                console.log(productDetails);
                setCartItems(productDetails);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [cart, getallcart]);

    let [cartItems, setCartItems] = useState([]);

    const handleOffer = async () => {
        const pnames = cartItems.map((item, index) => item.pname);
        try {
            const formData = new FormData();
            formData.append("pname", pnames)
            const response = await axios({
                method: "post",
                url: `${url3}/view_offers_cart`,
                data: formData,
                headers: {
                    // "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            setOfferData(response.data.data)
        } catch (error) {
            console.log("Not submitting data");
        }
    };

    const handleRemoveItem = async (pid) => {
        const formData = new FormData();
        formData.append("mid", mid);
        formData.append("pid", pid);
        try {
            const response = await axios.delete(`${url4}/api/cart_hsm`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
                data: formData,
            });
            console.log(response);
            dispatch(getCart(mid));
        }
        catch (error) {
            console.log(error);
        }
    }


    console.log(cartItems);
    const totalRate = cartItems.reduce((acc, cartItem) => acc + cartItem.cutRate * cartItem.count, 0);
    const displus = cartItems.reduce((acc, cartItem) => acc + cartItem.rate * cartItem.count, 0);
    const [totalAmount, settotalAmount] = useState(0);
    const [fcashback, setfcashback] = useState();
    const [dcashback, setdcashback] = useState();
    const [freward, setfreward] = useState();
    const [dreward, setdreward] = useState();
    useEffect(() => {
        setfcashback(memData.cashback_points);
        setfreward(memData.reward_points);
    }, [memData])

    console.log("Total Rate:", totalRate);
    const totalDiscount = cartItems.reduce((acc, cartItem) => {
        if (cartItem.discount_type === "percent") {
            const discountAmount = (Number(cartItem.discount) / 100) * cartItem.cutRate;
            console.log('uigyuftyguygi');
            console.log(discountAmount);
            return acc + discountAmount * cartItem.count;
        } else if (cartItem.discount_type === "amount") {
            return acc + Number(cartItem.discount) * cartItem.count;
        }
        return acc;
    }, 0);
    console.log(typeof (totalRate));
    console.log(typeof (totalDiscount));
    console.log(typeof (configs.other_charges));
    console.log(parseFloat(configs.other_charges) / 100 * totalRate);
    // console.log(totalRate - totalDiscount + parseFloat(configs.other_charges) + parseFloat(configs.shipping_charges))
    const allTotal = totalRate - totalDiscount + parseFloat(configs.shipping_charges) + (parseFloat(configs.other_charges) / 100 * displus)
    useEffect(() => {
        console.log('drewad');
        console.log(dcashback);
    }, [dcashback])
    useEffect(() => {
        let amount = allTotal;
        let famount;
        if (Seloffer != 0) {
            if (Seloffer.offer_type == 'Percent') {
                amount = allTotal - ((Seloffer.price / 100) * allTotal)
            }
            if (Seloffer.offer_type == 'Price') {
                amount = allTotal - Seloffer.price;
            }
            famount = amount;
        }
        else if (SelPoint == 'reward') {
            if (reward_conversion > amount) {
                famount = 0;
                setfreward((reward_conversion - amount) / configs.reward_rate);
                setdreward(amount / configs.reward_rate);
                setdcashback(0);
            }
            else {
                famount = amount - reward_conversion;
                setfreward(0)
                setdreward(reward_conversion / configs.reward_rate);
            }
            setfcashback(cashback_conversion / configs.cashback_rate)
        }
        else if (SelPoint == 'cashback') {
            if (cashback_conversion > amount) {
                famount = 0;
                setfcashback((cashback_conversion - amount) / configs.cashback_rate)
                setdcashback(amount / configs.cashback_rate);
                setdreward(0);
            }
            else {
                famount = amount - cashback_conversion;
                setdreward(0);
                setfcashback(0)
                setdcashback(cashback_conversion / configs.cashback_rate);
            }
            setfreward(reward_conversion / configs.reward_rate)
        }
        else {
            setfreward(reward_conversion / configs.reward_rate)
            setfcashback(cashback_conversion / configs.cashback_rate)
            famount = amount;
        }
        settotalAmount(famount);
    }, [allTotal, Seloffer, SelPoint, configs])
    return (
        <>

            {SelPoint == 0 ? (
                <div className="modal fade" id="offerModal" >
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="staticBackdropLabel">Select an Offer</h5>
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSelOffer(0)}>Cancel</button>
                            </div>
                            <div className="modal-body overflow-auto ">
                                <div className='box' >
                                    <div className=''>
                                        {OfferData ? OfferData.map((item, index) => (
                                            <div style={{ backgroundColor: Seloffer.promo_id == item.promo_id && ('rgb(205, 255, 189, 0.8)') }}>
                                                <div className='d-flex py-2 px-2 chat-icon cursor-pointer gap-1 align-items-center justify-content-between' >
                                                    <div className='d-flex gap-1'>
                                                        <div>
                                                            <img src='https://as2.ftcdn.net/v2/jpg/02/63/71/59/1000_F_263715969_CRvgvfdA0VUH2UQKMLxNHmYJ9G60IEWL.jpg' className='img-fluid rounded-circle' width={50} alt="User" />
                                                        </div>
                                                        <div className=''>
                                                            <div>{item.promotion_title}</div>
                                                            <div>{item.promotion_code}</div>
                                                            <div>{item.products.length > 0 && item.products.map((item) => (<div className='badge bg-theme me-1'>{cartItems.map((data) => data.pname == item && item)}</div>
                                                            ))}</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className='my-0 text-primary' ><> {item.offer_type == "Price" && ('S$ ')}{item.price}{item.offer_type == "Percent" && ('%')} Off</></div>
                                                        {item.promotion_type == "Shipping" ?
                                                            item.minimum_shopping <= totalAmount && (item.max_discount_amount >= totalDiscount) ?
                                                                <Button data-bs-dismiss="modal" aria-label="Close" fullWidth variant='contained' color='themeColor' className='shadow-none rounded-0 text-white fw-bold' onClick={() => { setSelOffer(item) }}>
                                                                    {Seloffer.promo_id == item.promo_id ? (<>Applied</>) : (<>Apply</>)}</Button>
                                                                : null :
                                                            (
                                                                <Button data-bs-dismiss="modal" aria-label="Close" fullWidth variant='contained' color='themeColor' className='shadow-none rounded-0 text-white fw-bold' onClick={() => { setSelOffer(item) }}>
                                                                    {Seloffer.promo_id == item.promo_id ? (<>Applied</>) : (<>Apply</>)}</Button>
                                                            )}

                                                    </div>
                                                </div>
                                                <div className='d-inline fs-7'>
                                                    <p className='mb-1'>Offer is valid from
                                                        <p className='d-inline fw-bold text-danger'> {item.offer_valid_from} </p>
                                                        to <p className='d-inline fw-bold text-danger'> {item.offer_valid_upto} </p>
                                                    </p>
                                                    {item.promotion_type == "Shipping" && (
                                                        <>
                                                            {item.minimum_shopping < totalAmount ? null : <p className=' badge bg-danger fw-normal fs-7'>Minimum Total Ammount To Apply the Offer
                                                                <p className='d-inline fw-bold '> S$ {item.minimum_shopping} </p>

                                                            </p>}
                                                            {item.max_discount_amount < totalDiscount ? <p className=' badge bg-danger fw-normal fs-7'>Maximum Discount limit is <p className='d-inline fw-bold '>  S$ {item.max_discount_amount}</p> to apply

                                                            </p> : null}
                                                        </>)}
                                                </div>
                                                <hr className='my-0' />
                                            </div>
                                        )) : (<div className='p-3 text-center fw-bold'>No Offers Available on these Products</div>)}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >
            ) : (null)
            }

            <div className='account-bg p-5'>
                <h1 className='text-white text-center' data-aos='zoom-in'>My Cart</h1>
            </div>
            <section className='bg-light2'>
                <div className='container py-4'>
                    <div className="row g-3" >
                        <div className="col-lg-8 mt-4">
                            <hr />
                            <div className='mt-2'>
                                {cartItems.length > 0 ? cartItems.map((item, index) =>

                                (<>

                                    {cart[index] ? (
                                        <div key={index} className='bg-white border-bottom border-2 fadeIn px-4 py-3'>
                                            <div className='row g-3'>
                                                <div className='col-md-3 p-0'>
                                                    <img className='img-fluid w-100 object-fit-cover' style={{ maxHeight: '150px' }} src={item.img} alt={item.pname} />
                                                    <div className=''>
                                                        {cart[index] && (
                                                            <ItemCount
                                                                // setCartcount={setCartcount}
                                                                quantity={Number(item.quantity_pi)}
                                                                count={cart[index].count}
                                                                pid={cart[index].pid}
                                                                mid={mid}
                                                                cartItems={cartItems}
                                                                setCartItems={setCartItems}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                                <div className='col-md-9'>
                                                    <div className='d-flex ms-3 justify-content-between gap-3 aliggn-items-center'>
                                                        <h4>{item.pname}</h4>
                                                        <div><CancelOutlinedIcon className='text-danger cursor-pointer' onClick={() => handleRemoveItem(cart[index].pid)} /></div>
                                                    </div>
                                                    <div className=' ms-3 '>
                                                        <div className='text-secondary text-decoration-line-through fs-5'>S$ {item.cutRate}</div>
                                                        <h3 className='mt-1'>S$ {item.rate}</h3>
                                                        {item.discount !== "" && (item.discount_type === "percent" || item.discount_type === "amount") ? <div className='text-info fs-5 ms-3'>
                                                            <i className="fa-solid fa-tags"></i> {item.discount}
                                                            {
                                                                item.discount_type === "percent" ? (' % ') : ("S$ ")
                                                            }
                                                            Discount
                                                        </div> : null}
                                                        {Number(item.quantity_pi) <= Number(item.quantity_lsqw) && (item.quantity_pi !== "") && (item.quantity_pi !== "0") && <span className='text-danger'>Limited Stock Remaining</span>}
                                                    </div>
                                                    {/* <div className='mt-3'> */}
                                                    {/* <Button color='inherit' className='text-theme fw-bold'>SAVE FOR LATER</Button> */}
                                                    {/* </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (<h3 className='text-center mt-3'>Item Removed</h3>)}
                                </>)) : (<h1 className='text-center'>No Items In Cart</h1>)}

                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="bg-white shadow" data-aos='fade-up'>
                                <div className='p-4 py-3 border-bottom border-2'>
                                    <h4>Your Cart Details</h4>
                                </div>

                                <div className='p-4 border-bottom border-2 '>
                                    <div className="d-flex justify-content-between">
                                        <div className='text-secondary'>Subtotal ({cartItems.length} items)</div>
                                        <div className='fw-bold'>S$ {totalRate}</div>
                                    </div>
                                    <div className="d-flex mt-4 justify-content-between">
                                        <div className='text-secondary'>Savings</div>
                                        <div className='fw-bold'>− S$ {totalDiscount && totalDiscount.toFixed(2)}</div>
                                    </div>
                                    <div className="d-flex mt-4 justify-content-between">
                                        <div className='text-secondary'>Tax</div>
                                        <div className='fw-bold'>+ {configs.other_charges}%</div>
                                    </div>
                                    <div className="d-flex mt-4 justify-content-between">
                                        <div className='text-secondary'>Shipping Charges</div>
                                        <div className='fw-bold'>+ S$ {configs.shipping_charges}</div>
                                    </div>
                                    {getallcart.length > 0 && (
                                        <>
                                            {Seloffer == 0 ? (
                                                <div className="d-flex align-items-center mt-2 justify-content-between">
                                                    <div className='text-secondary'>
                                                        <Button variant={SelPoint == 'cashback' ? ('contained') : ('outlined')} color='themeColor' onClick={() => setSelPoint('cashback')} className={`shadow-none rounded-0 ${SelPoint == 'cashback' && ('text-white')} fw-bold`}>
                                                            Cashback
                                                        </Button>
                                                        <Button variant={SelPoint == 'reward' ? ('contained') : ('outlined')} color='themeColor' onClick={() => setSelPoint('reward')} className={`shadow-none rounded-0 ${SelPoint == 'reward' && ('text-white')} fw-bold`}>
                                                            Reward
                                                        </Button>
                                                        {SelPoint == 'cashback' || SelPoint == 'reward' ? (
                                                            <IconButton color='error' onClick={() => setSelPoint(0)} className={`shadow-none rounded-0 fw-bold`}>
                                                                <CloseIcon />
                                                            </IconButton>
                                                        ) : (null)}
                                                    </div>
                                                    <div className='fw-bold'>
                                                        {SelPoint == 'cashback' && (dcashback && dcashback.toFixed(1))}
                                                        {SelPoint == 'reward' && (dreward && dreward.toFixed(1))}
                                                        {SelPoint == 0 && (0)}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="d-flex mt-4 justify-content-between">
                                                    <div >Promo Code Applied : {Seloffer.promotion_code}</div>
                                                    <div className='fw-bold'>- {Seloffer.offer_type == "Price" && ('S$ ')}{Seloffer.price} {Seloffer.offer_type == "Percent" && ('%')} </div>
                                                </div>
                                            )}
                                            {/* <div className="d-flex mt-4 justify-content-between">
                                    <div className='text-secondary'>Redeem Point </div>
                                    
                                    <div>
                                    <div className="checkbox-con">
                                    <input id="checkbox" type="checkbox" />
                                    </div>
                                    </div>
                                </div> */}
                                            <Button data-bs-target="#offerModal" data-bs-toggle="modal" disabled={SelPoint !== 0 && (true)} onClick={handleOffer} fullWidth variant='contained' color='themeColor' className='shadow-none rounded-0 text-white fw-bold mt-3 '>
                                                {Seloffer == 0 && <>View Offers</>}
                                                {Seloffer !== 0 ? (<>Applied</>) : (null)}
                                            </Button>
                                        </>
                                    )}
                                </div>
                                {getallcart.length > 0 && (
                                    <div className='p-4'>
                                        <div className='d-flex justify-content-between'>
                                            <h5>Total Amount</h5>
                                            <h5>{totalAmount && totalAmount.toFixed(2)}</h5>
                                            {/* <h6>{fcashback && fcashback.toFixed(2)}</h6> */}
                                            {/* <h6>{freward && freward.toFixed(2)}</h6> */}
                                        </div>
                                        <NavLink to='/checkout' state={{ Seloffer: Seloffer, dreward: dreward, dcashback: dcashback, totalRate: totalAmount, subtotal: totalRate, totalDiscount: totalDiscount, serviceCharges: configs.other_charges, shipping_charges: configs.shipping_charges, cartItems: cartItems, cashback: fcashback, reward: freward, SelPoint: SelPoint }}>
                                            <Button fullWidth color='themeColor' onClick={handleClick} variant='contained' className='fw-bold mt-4 shadow-none rounded-0 text-white' size='large'>Checkout</Button>
                                        </NavLink>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
export default Cart;