import React, { useState, useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import '../assets/css/footer.css';
import { useDispatch, useSelector } from "react-redux";
import { get_footer_data_cms, get_header_data_cms } from "../handleSlice";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import Cookies from "js-cookie";
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import io from "socket.io-client";
import { url2 } from "./port";

function Footer() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socketinit = io.connect("https://ws.devcorps.in");
        setSocket(socketinit);
        socketinit.on("help_desk_receive", async () => {
            handlegetmsg();
        });
    }, [])
    const handleClick = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }
    const mid = localStorage.getItem('mid') || Cookies.get('mid')
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
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchFooterData = async () => {
            await dispatch(get_footer_data_cms());
        }
        fetchFooterData();
    }, [dispatch]);

    useEffect(() => {
        dispatch(get_header_data_cms());
    }, [dispatch]);
    const [chats, setChats] = useState([])
    const logo = useSelector((state) => state.userDetails.get_header_data_cms)
    const preData = useSelector((state) => state.userDetails.get_footer_data_cms)
    const memData = useSelector((state) => state.userDetails.LoggedMember);
    const [loadspin, setloadspin] = useState();
    const raw = {
        tid: mid
    }
    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const response = await axios({
                    method: "post",
                    url: `${url2}/getticket`,
                    data: raw,
                    headers: {
                        "Content-Type": "application/json",
                        "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                    },
                });
                setChats(response.data)
            } catch (error) {
                console.log("Not submitting data");
                console.log(error);
            }
        }
        fetchFooterData();
    }, [memData])
    const [links, setLinks] = useState([]);
    useEffect(() => {
        if (preData && preData.links && preData.links.length > 0) {
            let newLinks = JSON.parse(preData.links);
            console.log(newLinks);
            setLinks(newLinks);
        }
    }, [preData.links]);
    const [subject, setSubject] = useState('');
    const [Message, setMessage] = useState('');
    const handleSendMsg = async () => {
        setloadspin(true);
        let SendMsg = {
            tid: mid,
            uid: mid,
            msg: Message,
            role: "user",
            date: getCurrentDate(),
            time: getCurrentTime()
        }
        try {
            const send = await axios({
                method: "post",
                url: `${url2}/replyticket`,
                data: SendMsg,
                headers: {
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            setMessage('');
            socket.emit("help_desk_send");
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
        }
        setloadspin(false);
    }
    const handlegetmsg = async () => {
        try {
            const response = await axios({
                method: "post",
                url: `${url2}/getticket`,
                data: raw,
                headers: {
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            setChats(response.data)
            if (response.data.data.msgs) {
                let scroller = document.getElementById('chat-scroller');
                setTimeout(() => {

                    scroller.scrollTo(0, scroller.scrollHeight);
                }, 500);
            }
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
        }
    }
    const handleStartChat = async (event) => {
        event.preventDefault();
        setloadspin(true);
        let createmsg = {
            uid: mid,
            usname: memData.uname,
            subj: subject,
            msg: Message,
            role: "user"
        }
        try {
            const send = await axios({
                method: "post",
                url: `${url2}/createticket`,
                data: createmsg,
                headers: {
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            setMessage('');
            console.log(send.data);
            const response = await axios({
                method: "post",
                url: `${url2}/getticket`,
                data: raw,
                headers: {
                    "Content-Type": "application/json",
                    "API-Key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                },
            });
            setChats(response.data)
        } catch (error) {
            console.log("Not submitting data");
            console.log(error);
        }
        setloadspin(false);
    }
    return (
        <footer>
            {mid ? (<>
                <button className="btn btn-success help-desk shadow" onClick={handlegetmsg} style={{ zIndex: '999' }} type="button" data-bs-toggle="offcanvas" data-bs-target="#Id1" >
                    <QuestionAnswerIcon fontSize="large" />
                </button>
                <div className="offcanvas offcanvas-end" id="Id1">
                    <div className="offcanvas-header bg-theme text-white">
                        <h5 className="offcanvas-title">Talk to our support</h5>
                        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body  py-0">
                        {chats.success == false ? (
                            <div>
                                <form>
                                    <div className="my-3">
                                        <label for="exampleInputEmail1" className="form-label">Subject</label>
                                        <input type="text" onChange={(e) => setSubject(e.target.value)} className="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp" />
                                        <div id="emailHelp" className="form-text">We'll Make sure to sovle your doubts</div>
                                    </div>
                                    <textarea onChange={(e) => setMessage(e.target.value)} className="w-100 form-control mb-3" rows="5" required placeholder="Your message"></textarea>
                                    <button type="submit" onClick={handleStartChat} className="btn btn-success rounded-0">
                                        {loadspin == true ? (
                                            <div className="spinner-border spinner-border-sm text-white" role="alert"></div>
                                        ) : ('Start a chat')}

                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className='chatbox-home py-3 px-2' id="chat-scroller">
                                {chats.data && chats.data.msgs ? chats.data.msgs.map((item, index) => (
                                    <>
                                        {item.role == 'admin' ? (
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
                                )) : (
                                    <div className="d-flex justify-content-center align-items-center h-100 w-100">
                                        <h4 className="text-seconadry">Lets chat with our support</h4>
                                    </div>
                                )}
                                <div style={{ width: '95%' }} className="position-absolute bottom-0 p-3 bg-white">
                                    <div className="input-group ">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Send message"
                                            value={Message}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <span onClick={handleSendMsg} className="input-group-text bg-theme activet cursor-pointer" id="input1">
                                            {loadspin == true ? (
                                                <div className="spinner-border spinner-border-sm text-white" role="alert"></div>
                                            ) : (
                                                <SendIcon className='text-white' />
                                            )}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </>) : null}

            <div className="container py-5 p-3">
                <div className="row g-4" data-aos='zoom-in'>
                    <div className="col-lg-6">
                        <h3>About Company</h3>
                        <img src={logo.brand_logo} className="my-3 " width={150} alt="GinGK" />
                        <p className="text-secondary mt-2">
                            {preData.aboutDesc}
                        </p>
                    </div>
                    <div className="col-sm-6 ps-md-4 text-center text-sm-start col-lg-3">
                        <h4>Quick Links</h4>
                        <ul className="list-unstyled">
                            {links.length > 0 ? links.map((item, index) => (
                                <li className="nav-item">
                                    <NavLink onClick={handleClick} className='nav-link fw-semibold' to={item.label}>
                                        {item.name}
                                    </NavLink>
                                </li>
                            )) : null}
                        </ul>
                    </div>
                    <div className="col-sm-6 col-lg-3 text-center text-sm-start ">
                        <Link className='text-decoration-none text-dark' to='/contact' onClick={handleClick}>
                            <h4>Contact Info</h4>
                        </Link>
                        <div>
                            <i className="fa-solid fa-mobile-screen-button me-2"></i>
                            <span>Hotline: +{preData.phone}</span>
                        </div>
                        <div>
                            <i className="fa-regular fa-envelope me-2"></i>
                            <span>{preData.email}</span>
                        </div>
                        <div>
                            <i className="fa-solid fa-location-dot me-2"></i>
                            <span>{preData.address}</span>
                        </div>
                        <div className="d-flex gap-2 mt-3 justify-content-center justify-content-sm-start">
                            <a target="_blank" href={preData.fb} className="text-decoration-none">
                                <div className="social-icon bg-primary">
                                    <i className="fa-brands fa-facebook-f text-white"></i>
                                </div>
                            </a>
                            <a target="_blank" href={preData.twt} className="text-decoration-none">
                                <div className="social-icon bg-info">
                                    <i className="fa-brands fa-twitter text-white"></i>
                                </div>
                            </a>
                            <a target="_blank" href={preData.insta} className="text-decoration-none">
                                <div className="social-icon bg-danger">
                                    <i className="fa-brands fa-instagram text-white"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-3 border-top border-1 text-center">
                {preData.copyRight}
            </div>
        </footer>
    )
}

export default Footer;