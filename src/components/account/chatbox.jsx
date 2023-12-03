import React, { useEffect, useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import '../../assets/css/chat.css'
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Cookies from "js-cookie";
import { MarkSoldAPI } from "../../handleSlice";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import { event } from "jquery";
import io from "socket.io-client";
import ChatContext from "../../context/ChatContext";
import { useContext } from "react";
import SellerModal from "./SellerModal";
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { url3 } from "../port";

function Chatbox({ CurrentMember, newChat, currentMid, loadspinbtn, handleChangeStatus,
    activeTab,
    setalertStatus,
    setalertText,
    setalertmode,
    ChatStatus,
    socket,
    mid,
    message,
    setSocket,
    setNewChat,
    setMessage,
    listingID,
    CurrentListing,
    handleSubmit, }) {
    const cmid = currentMid;
    const handlescrollchat = () => {
        let chatscroll = document.getElementById('account-chat')
        chatscroll.scrollTo(0, chatscroll.scrollHeight);
        console.log('scroll');
    }


    const handleChatClick = async () => {
        try {

            const response = await axios({
                method: "get",
                url: `${url3}/get_chats_listing?mid=${CurrentMember.mid}&lid=${listingID}`,
                headers: {
                    "Content-Type": "application/json",

                },
            });
            console.log(response.data.chat_messages);
            setNewChat(response.data.chat_messages);
            setTimeout(() => {
                handlescrollchat();
            }, 200);

        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        console.log('cmid');
        console.log(cmid);
        const socketinit = io.connect("https://ws.devcorps.in");
        socketinit.on("receive_message", async () => {
            handleChatClick(CurrentMember.mid, listingID)
        });
    }, [cmid])
    console.log(CurrentMember);
    const [loadSoldbtn, setloadSoldbtn] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const [paymentDetails, setpaymentDetails] = useState("");
    const [soldPrice, setsoldPrice] = useState("");
    const [soldCount, setsoldCount] = useState("");
    const handleClose = () => {
        setOpen(false);
        setpaymentDetails("")
        setsoldPrice("")
        setsoldCount("")
    };
    console.log(CurrentMember);
    const dispatch = useDispatch();
    const handleMarkSold = async (e) => {
        e.preventDefault();
        setloadSoldbtn(true);
        const formData = new FormData();
        formData.append('buyer_mid', CurrentMember.mid);
        formData.append('seller_mid', mid);
        formData.append('lid', CurrentListing.lid);
        formData.append('p_image', CurrentListing.thumbnail_photo);
        formData.append('p_title', CurrentListing.service_name);
        formData.append('p_area', CurrentListing.service_area);
        formData.append('sold_price', soldPrice);
        formData.append('count', soldCount);
        formData.append('payment_details', paymentDetails);

        await dispatch(MarkSoldAPI(formData));
        // setTimeout(() => {
        setalertText("Item Sold");
        setalertStatus(true);
        setalertmode('success');
        setloadSoldbtn(false);
        handleClose()
        // }, 2000);
    }
    return (
        <>

            {/* <SellerModal modal={modal} memberdetails={CurrentMember} /> */}
            <div className='p-3 align-items-center border d-flex gap-2 flex-wrap overflow-auto justify-content-between col-md-8 '>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Mark as Sold</DialogTitle>
                    <DialogContent>
                        <div className="d-flex gap-2 gap-md-4 flex-wrap">
                            <div>
                                <img src={CurrentMember.pic_url} className='rounded-circle object-fit-cover' width={50} height={50} alt={CurrentMember.uname} />
                            </div>
                            <div className='flex-grow-1 align-self-center'>
                                <h5 className='mb-0'>{CurrentMember.uname}</h5>
                                <div className='fs-7'>{CurrentMember.email}</div>
                                <div className='fs-7  d-flex align-items-center'>
                                    <div>{CurrentMember.phn}</div>
                                </div>
                            </div>
                            <div className='px-md-4 px-1'>
                                <div className='fs-7 d-flex align-items-center text-theme'><MailOutlineIcon fontSize='small' />
                                    <div className=' ms-2'>
                                        Verified</div>
                                </div>
                            </div>
                        </div>

                        <div className='bg-white mt-3 cursor-pointer '>
                            <div className='row g-3 '>
                                <div className='col-md-4 p-0'>
                                    <img className='img-fluid w-100 object-fit-cover' style={{ maxHeight: '150px' }} src={CurrentListing.thumbnail_photo} alt={CurrentListing.service_name} />
                                </div>
                                <div className='col-md-8'>
                                    <div className='d-flex  justify-content-between gap-3 aliggn-items-center'>
                                        <h4>{CurrentListing.service_name}</h4>
                                    </div>
                                    <div className=' '>
                                        <p>{CurrentListing.service_area}</p>
                                        <h6 className='mt-1'>Price : S$ {CurrentListing.price}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="mt-3">
                                <label htmlFor="MarkSoldInput" className="form-label fw-bold">Payment Details</label>
                                <input type="text" value={paymentDetails} onChange={(e) => setpaymentDetails(e.target.value)} className="form-control" id="MarkSoldInput" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">Share your payment mode or any other details to be saved.</div>
                            </div>
                            <div className="mt-3 d-flex justify-content-start flex-wrap gap-2">
                                <div>
                                    <label htmlFor="MarkSoldNumber" className="form-label fw-bold">Price</label>
                                    <input type="number" value={soldPrice} required onChange={(e) => setsoldPrice(e.target.value)} className="form-control w-100" id="MarkSoldNumber" />
                                </div>
                                <div>
                                    <label htmlFor="MarkSoldCount" className="form-label fw-bold">Quantity</label>
                                    <input type="number" value={soldCount} required onChange={(e) => setsoldCount(e.target.value)} className="form-control w-100" id="MarkSoldCount" />
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        {loadSoldbtn == false ? (
                            <Button onClick={handleClose} className="rounded-0 " variant="outlined" color="error">Cancel</Button>
                        ) : null}
                        {loadSoldbtn == false ? (
                            <Button onClick={(e) => handleMarkSold(e)} type="submit" color="themeColor" className="rounded-0 text-white" variant="contained">Mark as Sold</Button>
                        ) : (
                            <Button color="themeColor" className="rounded-0 text-white py-2 px-5" variant="contained">
                                <span className="spinner-border spinner-border-sm"></span>
                            </Button>
                        )}
                    </DialogActions>
                </Dialog>
                {newChat && newChat.length > 0 ? (
                    <>
                        <div className=' overflow-auto w-100 pe-3 ' style={{ height: '20rem' }} id="account-chat">
                            <div className="top-0 position-sticky d-flex justify-content-between pb-2 bg-white">
                                <div className="d-flex align-items-center gap-2">
                                    <img src={CurrentMember.pic_url} width={40} height={40} className="rounded-circle object-fit-cover" />
                                    <h5>{CurrentMember.uname}</h5>
                                </div>

                                {activeTab == 'Buyers' && (
                                    <div className=" d-flex justify-content-end gap-2 align-items-center">
                                        <div className="fw-bold"></div>
                                        <FormControl variant="standard" color="themeColor" sx={{ m: 1, minWidth: 120 }} size="small">
                                            <InputLabel id="demo-select-small-label">Action</InputLabel>
                                            <Select
                                                className="bg-theme-light"
                                                labelId="demo-select-small-label"
                                                id="demo-select-small"
                                                value={ChatStatus}
                                                label="Age"
                                                onChange={handleChangeStatus}
                                            >
                                                <MenuItem value='Enquiry'>Enquiry</MenuItem>
                                                <MenuItem value='Interested'>Interested</MenuItem>
                                                {/* <MenuItem value='Sold' onClick={handleClickOpen}>Sold</MenuItem> */}

                                            </Select>
                                        </FormControl>
                                        <div className="dropdown">
                                            <a data-bs-toggle="dropdown" aria-expanded="false">
                                                <IconButton>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li onClick={handleClickOpen} className="dropdown-item cursor-pointer">Create Sells</li>
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                            {newChat.map((item, index) => (
                                <>
                                    {item.mid !== mid ? (
                                        <div>
                                            <div style={{ maxWidth: '75%', width: 'fit-content' }} className='p-2 bg-dark text-white rounded-3'>
                                                {item.msg}
                                            </div>
                                            <div className='fs-7 text-secondary'>
                                                {item.time} / {item.date}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='text-end'>
                                            <div style={{ maxWidth: '75%', width: 'fit-content' }} className='ms-auto p-2 bg-theme text-white rounded-3'>
                                                {item.msg}
                                            </div>
                                            <div className='fs-7 text-secondary'>
                                                {item.time} / {item.date}
                                            </div>
                                        </div>
                                    )}
                                </>
                            ))}
                        </div>
                        <div className="modal-footer px-2 py-1 mt-3  w-100">
                            <div className="input-group ">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Send message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <span className="input-group-text bg-theme position-relative activet" id="input1">
                                    {loadspinbtn == true ? (
                                        <div className="spinner-border spinner-border-sm text-white" role="alert"></div>
                                    ) : (
                                        <SendIcon className='text-white cursor-pointer' onClick={handleSubmit} />
                                    )}
                                </span>
                            </div>
                        </div>
                    </>) : (<div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        {(activeTab == 'Buyers' || activeTab == 'Sellers') && newChat == null ? (
                            <div className="spinner-border text-success " style={{ scale: '1.5' }}></div>
                        ) : (null)}
                    </div>)
                }
            </div>
        </>

    )
}
export default Chatbox;