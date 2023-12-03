import React, { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import '../../assets/css/chat.css'
import { VeiwMember, get_buyers_listing_profile, get_chats_listing, get_seller_listing_profiles, get_user_listing_profiles, sendMessage } from "../../handleSlice";
import Cookies from "js-cookie";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import Chatbox from "./chatbox";
import { event } from "jquery";
import io from "socket.io-client";
import ChatContext from "../../context/ChatContext";
import { url1, url3 } from "../port";

function Chats({ setalertStatus,
    setalertText,
    setalertmode }) {

    // const memData = useSelector((state) => state.userDetails.LoggedMember);
    const [message, setMessage] = useState('');
    const [chatID, setChatID] = useState(null);
    const [socket, setSocket] = useState(null);
    const [activeTab, setActiveTab] = useState('Buyers');
    const [showUsers, setShowUsers] = useState(false);
    const [listingID, setListingID] = useState('')
    const [buyerList, setBuyerList] = useState([]);
    const [CurrentListing, setCurrentListing] = useState('');
    const [userload, setuserload] = useState([]);
    const [sellerListings, setSellerListings] = useState([]);
    const [newChat, setNewChat] = useState([]);
    const [Lid, setLid] = useState('');
    const [ChatStatus, setChatStatus] = useState(null);
    const [currentMid, setCurrentMid] = useState('');
    const [CurrentMember, setCurrentMember] = useState('');
    const [loadspin, setloadspin] = useState(false);
    const [loadspinbtn, setloadspinbtn] = useState(false);
    const [sellerList, setSellerList] = useState([]);
    const handleSubmit = async (event) => {
        if (loadspin !== true) {
            setloadspinbtn(true);
            event.preventDefault();

            const formData = new FormData();
            formData.append("sender_mid", currentMid);
            formData.append("lid", listingID);
            formData.append("msg", message);
            formData.append("mid", mid);
            await dispatch(sendMessage({ formData }));
            socket.emit("send_message");
            setloadspinbtn(false);
            setTimeout(() => {
                handlescrollchat();
            }, 500);
            setMessage('')
        }
    };
    const mid = Cookies.get('mid') || localStorage.getItem('mid');
    // useEffect(() => {
    //     if (socket !== null) {
    //         const handleReceiveMessage = async () => {
    //             try {
    //                 const response = await axios({
    //                     method: "get",
    //                     url: `http://139.59.236.50:5552/get_chats_listing?mid=${currentMid}&lid=${listingID}`,
    //                     headers: {
    //                         "Content-Type": "application/json",

    //                     },
    //                 });
    //                 console.log(response.data.chat_messages);
    //                 setNewChat(response.data.chat_messages);
    //                 setTimeout(() => {
    //                     handlescrollchat();
    //                 }, 200);

    //             }
    //             catch (error) {
    //                 console.log(error);
    //             }
    //             console.log("Received message");
    //         };
    //         socket.on("receive_message", handleReceiveMessage);
    //     }
    // }, [socket])

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUserListing = async () => {
            await dispatch(get_user_listing_profiles(mid));
            await dispatch(get_seller_listing_profiles(mid));
        }
        fetchUserListing();
    }, [dispatch])

    const handleChangeStatus = async (event) => {
        const formData = new FormData();
        formData.append('mid', currentMid);
        formData.append('lid', Lid);
        formData.append('status', event.target.value);
        try {
            if (event.target.value !== "Sold") {
                const response = await axios({
                    method: "put",
                    url: `${url3}/update_listing_status_profile`,
                    data: formData,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                    },
                });
            }
        } catch (error) {
            console.log("Not submitting data");
        }
        setChatStatus(event.target.value)
    }

    const handleChatClick = async (mid, lid) => {
        try {

            const response = await axios({
                method: "get",
                url: `${url3}/get_chats_listing?mid=${mid}&lid=${listingID}`,
                headers: {
                    "Content-Type": "application/json",

                },
            });
            console.log(response.data.chat_messages);
            setNewChat(response.data.chat_messages);
            setChatStatus(response.data.status);
            setChatID(mid)
            setLid(lid)
            // dispatch(getCart(mid));
            setTimeout(() => {
                handlescrollchat();
            }, 200);

        }
        catch (error) {
            console.log(error);
        }
    }

    const handlescrollchat = () => {
        let chatscroll = document.getElementById('account-chat')
        chatscroll.scrollTo(0, chatscroll.scrollHeight);
        console.log('scroll');
    }

    const fetchBuyerListing = async (lid) => {
        await dispatch(get_buyers_listing_profile(lid));
    }
    const listing = useSelector((state) => state.userDetails.get_user_listing_profiles);
    const buyers = useSelector((state) => state.userDetails.get_buyers_listing_profile);
    const sellerLids = useSelector((state) => state.userDetails.get_seller_listing_profiles);
    const [buyerStatus, setbuyerStatus] = useState('none');
    // console.log(buyers);
    useEffect(() => {

        const fetchBuyerData = async () => {
            setuserload(true)
            let newResponses = [];
            setbuyerStatus('load');
            for (const mid of buyers) {
                try {
                    const response = await axios.get(`${url1}/viewmember_crm?mid=${mid}`, {
                        headers: {
                            "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                        },
                    });
                    console.log(response.data.member);
                    newResponses.push(response.data.member);

                } catch (error) {
                    console.error(`Error fetching data for mid: ${mid}`, error);
                }
            }
            setBuyerList(newResponses);
            if (newResponses.length == 0) {
                setbuyerStatus('none');
            }
            setbuyerStatus('loaded');
        }
        fetchBuyerData();

        setuserload(false)
        console.log(buyerList);
    }, [buyers]);

    useEffect(() => {

        const fetchSellerListingData = async () => {
            let newResponses = [];
            for (const lid of sellerLids) {
                setloadspin(true);
                try {
                    const response = await axios.get(`${url1}/getlisting_mpm?lid=${lid}`, {
                        headers: {
                            "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                        },
                    });
                    console.log(response.data);
                    newResponses.push(response.data.data);

                } catch (error) {
                    console.error(`Error fetching data for lid: ${lid}`, error);
                }
                setloadspin(false);
            }
            setSellerListings(newResponses);

        }
        fetchSellerListingData();

        console.log(sellerListings);
    }, [sellerLids]);

    useEffect(() => {
        console.log(buyerStatus);
    }, [buyerStatus])

    const fetchSellerData = async (id) => {
        setbuyerStatus('load');

        let newResponses = [];
        setbuyerStatus('load');

        try {
            const response = await axios.get(`${url1}/viewmember_crm?mid=${id}`, {
                headers: {
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            console.log(response.data.member);
            newResponses.push(response.data.member);

        } catch (error) {
            console.error(`Error fetching data for mid: ${mid}`, error);
        }

        setSellerList(newResponses);
        if (newResponses.length == 0) {
            setbuyerStatus('none');
        }
        setbuyerStatus('loaded');
    }
    useEffect(() => {
        const socketinit = io.connect("https://ws.devcorps.in");
        setSocket(socketinit);
    }, [])
    return (
        // <ChatContext.Provider value={{ CurrentMember,setCurrentMember, CurrentListing ,setCurrentListing }}>
        <div className='shadow rounded bg-white container' data-aos="fade-up">
            <div className='text-secondary fw-semibold fs-7'>
                <div className="p-1">
                    All Chats
                </div>

                <div className="row  bg-theme-light">
                    <button className={`nav-link activet ${activeTab == 'Buyers' && ('bg-theme text-white')} p-1 fs-6 border-0 text-dark col d-inline`} id="Buyers" onClick={() => { setActiveTab('Buyers'); setChatID(null); setNewChat([]); setShowUsers(false); }}>Buyers</button>
                    <button className={`nav-link activet ${activeTab == 'Sellers' && ('bg-theme text-white')} p-1 fs-6 border-0 text-dark col d-inline`} id="Sellers" onClick={() => { setActiveTab('Sellers'); setChatID(null); setNewChat([]); setShowUsers(false); }}>Sellers</button>
                </div>
            </div>
            {
                activeTab == 'Sellers' && !showUsers && (
                    <>
                        {
                            sellerListings &&
                            (
                                <>{
                                    loadspin == true && (
                                        <div className="bg-white p-5 d-flex justify-content-center align-items-center">
                                            <div className="spinner-border text-success " style={{ scale: '1.5' }}></div>
                                        </div>
                                    )}
                                    {
                                        sellerListings.map((item, index) => (
                                            activeTab == 'Sellers' && !showUsers && (
                                                <>
                                                    <div key={index} className='bg-white border-bottom border-2 fadeIn px-4 py-3 cursor-pointer hover-gray' onClick={() => {
                                                        setShowUsers(true); setListingID(item.lid); fetchSellerData(item.mid)

                                                    }}>
                                                        <div className='row g-3 '>
                                                            <div className='col-md-3 p-0'>
                                                                <img className='img-fluid w-100 object-fit-cover' style={{ maxHeight: '150px' }} src={item.thumbnail_photo} alt={item.service_name} />
                                                            </div>
                                                            <div className='col-md-9'>
                                                                <div className='d-flex ms-3 justify-content-between gap-3 aliggn-items-center'>
                                                                    <h4>{item.service_name}</h4>
                                                                </div>
                                                                <div className=' ms-3 '>
                                                                    <p>{item.service_area}</p>
                                                                    <h6 className='mt-1'>By : {item.seller_name}</h6>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </>
                                            )
                                        ))}
                                </>
                            )
                        }
                    </>
                )


            }
            {activeTab == 'Buyers' && !showUsers ? (
                <>
                    {
                        listing.map((item, index) => (
                            activeTab == 'Buyers' && !showUsers && (
                                <>
                                    <div key={index} className='bg-white border-bottom border-2 fadeIn px-4 py-3 cursor-pointer hover-gray' onClick={() => {
                                        setShowUsers(true); setListingID(item.lid); setCurrentListing(item);
                                        fetchBuyerListing(item.lid); setbuyerStatus('load')
                                    }}>
                                        <div className='row g-3 '>
                                            <div className='col-md-3 p-0'>
                                                <img className='img-fluid w-100 object-fit-cover' style={{ maxHeight: '150px' }} src={item.thumbnail_photo} alt={item.service_name} />
                                            </div>
                                            <div className='col-md-9'>
                                                <div className='d-flex ms-3 justify-content-between gap-3 aliggn-items-center'>
                                                    <h4>{item.service_name}</h4>
                                                </div>
                                                <div className=' ms-3 '>
                                                    <p>{item.service_area}</p>
                                                    <h6 className='mt-1'>By : {item.seller_name}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </>
                            )
                        ))
                    }
                </>
            ) : (
                <>
                    {!showUsers ? (null) : (
                        <div className="row p-0">

                            <div className='d-flex flex-md-column text-nowrap border py-1 p-0 col-md-4 overflow-auto' style={{ minHeight: "6rem", maxHeight: '26.5rem' }}>
                                {activeTab == 'Buyers' ?
                                    buyerList.length == 0 || buyerStatus == 'load' ? (<div className="w-100 h-100 d-flex justify-content-center align-items-center">
                                        {buyerStatus == 'load' && showUsers ? (
                                            <div className="spinner-border text-success " style={{ scale: '1.5' }}></div>
                                        ) : (<> <h5 className="text-secondary">No buyers yet</h5></>)
                                        }
                                        {buyerStatus == 'none' && (<div className="fs-5 text-secondary">No Users</div>)}
                                    </div>) : buyerList.map((items, index) => (

                                        activeTab == 'Buyers' && showUsers && (
                                            <>
                                                <div className='border-bottom'>
                                                    <div style={{ backgroundColor: chatID == items.mid && ('rgb(205, 255, 189, 0.8)') }} className='d-flex py-2 px-2 chat-icon cursor-pointer gap-2 flex-column flex-md-row align-items-center' onClick={() => { handleChatClick(items.mid, listingID); setChatID(null); setCurrentMember(items); setCurrentMid(items.mid) }}>
                                                        <div>
                                                            <img src={items.pic_url} className='rounded-circle object-fit-cover' width={50} height={50} alt={items.uname} />
                                                        </div>
                                                        <div className=''>
                                                            <div className='my-0 ' ><>{items.uname}</></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )

                                    ))
                                    : sellerList == 0 || buyerStatus == 'load' ? (<div className="w-100 h-100 d-flex justify-content-center align-items-center">
                                        {buyerStatus == 'load' && showUsers ? (
                                            <div className="spinner-border text-success " style={{ scale: '1.5' }}></div>
                                        ) : (null)}
                                        {buyerStatus == 'none' && (<div className="fs-5 text-secondary">No Users</div>)}
                                    </div>) : sellerList.map((items, index) => (

                                        activeTab == 'Sellers' && showUsers && (
                                            <>
                                                <div className='border-bottom'>
                                                    <div style={{ backgroundColor: chatID == items.mid && ('rgb(205, 255, 189, 0.8)') }} className='d-flex py-2 px-2 chat-icon cursor-pointer gap-2 flex-column flex-md-row align-items-center' onClick={() => { handleChatClick(mid, listingID); setChatID(null); setCurrentMember(items); setCurrentMid(mid) }}>
                                                        <div>
                                                            <img src={items.pic_url} className='rounded-circle' width={50} height={50} alt={items.uname} />
                                                        </div>
                                                        <div className=''>
                                                            <div className='my-0 ' ><>{items.uname}</></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )

                                    ))
                                }
                            </div>
                            <Chatbox
                                CurrentMember={CurrentMember}
                                newChat={newChat}
                                currentMid={currentMid}
                                setCurrentMid={setCurrentMid}
                                loadspinbtn={loadspinbtn}
                                setloadspinbtn={setloadspinbtn}
                                handleChangeStatus={handleChangeStatus}
                                activeTab={activeTab}
                                ChatStatus={ChatStatus}
                                mid={mid}
                                listingID={listingID}
                                message={message}
                                setMessage={setMessage}
                                handleSubmit={handleSubmit}
                                socket={socket}
                                setSocket={setSocket}
                                setNewChat={setNewChat}
                                setChatStatus={setChatStatus}
                                setChatID={setChatID}
                                setLid={setLid}
                                CurrentListing={CurrentListing}
                                setalertStatus={setalertStatus}
                                setalertText={setalertText}
                                setalertmode={setalertmode}
                            />
                        </div>
                    )}
                </>

            )}


        </div>
        // </ChatContext.Provider>

    )
}
export default Chats;