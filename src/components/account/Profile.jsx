import React, { useState, useEffect } from 'react';
import StarRateIcon from '@mui/icons-material/StarRate';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { LoggedMember } from '../../handleSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Button, Input } from '@mui/material';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { url3 } from '../port';

function Profile({ setActiveTab, setalertStatus,
    setalertText,
    setalertmode }) {
    const dispatch = useDispatch()
    const mid = Cookies.get('mid') || localStorage.getItem('mid');

    useEffect(() => {
        dispatch(LoggedMember(mid))
    }, [dispatch])
    const [kycvidPreview, setKycvidPreview] = useState(null);

    const memData = useSelector((state) => state.userDetails.LoggedMember);
    console.log(memData);
    const [kycvid, setKycvid] = useState(null);
    const [open, setOpen] = useState(false);
    const [loadspin, setloadspin] = useState(false);
    const handleVerify = async () => {
        if (loadspin == false) {
            setloadspin(true);
            const mid = localStorage.getItem('mid') || Cookies.get('mid');
            const formData = new FormData();

            formData.append("mid", mid);
            formData.append("video", kycvid);
            console.log(mid);
            console.log(kycvid);
            try {
                const response = await axios({
                    method: "post",
                    url: `${url3}/applyKYC`,
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "api-key": "90bd6f5b-033f-42e7-8e92-2a443dfa42f8",
                    },
                })
                    .then(async (response) => {
                        if (response.data.success == true) {
                            setalertText("Uploaded for KYC");
                            setalertStatus(true);
                            setalertmode('success');
                            handleClose()
                        }
                        else {
                            setalertStatus(true);
                            if (response.data.message) {
                                setalertText(response.data.message);
                                setalertmode('error')
                            }
                        }
                        console.log(response);
                    })
                setloadspin(false);

            }
            catch (err) {
                console.log(err);
                setalertStatus(true);
                if (err.response.data.message) {
                    setalertText(err.response.data.message);
                    setalertmode('error')
                }
                setloadspin(false);

            };

        }
    }
    useEffect(() => {
        return () => {
            if (kycvidPreview) {
                URL.revokeObjectURL(kycvidPreview);
            }
        };
    }, [kycvidPreview]);

    const handleClose = () => {
        setOpen(false);
        setKycvidPreview(null);
        setKycvid(null);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setKycvid(file);
            const previewURL = URL.createObjectURL(file);
            setKycvidPreview(previewURL);
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>KYC Verification</DialogTitle>
                <DialogContent>
                    <div className="d-flex gap-2 gap-md-3 flex-wrap">
                        <div>
                            <img src={memData.pic_url} className='rounded-circle object-fit-cover' width={70} height={70} alt={memData.uname} />
                        </div>
                        <div className='flex-grow-1 align-self-center'>
                            <h5 className='mb-0'>{memData.uname}</h5>
                            <div className='fs-7'>{memData.email}</div>
                            <div className='fs-7  d-flex align-items-center'>
                                <div>{memData.phn}</div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-4'>
                        {/* {loadspin == false ? ( */}
                        {/* <Button onClick={handleClose} className="rounded-0 " variant="outlined" color="error">Cancel</Button> */}
                        {/* ) : null} */}

                        <Input
                            id='kycinput'
                            type='file'
                            inputProps={{ accept: 'video/*' }}
                            onChange={(e) => handleFileChange(e)}
                            style={{ display: 'none' }}
                        />
                        {!kycvidPreview ? (
                            <label htmlFor='kycinput'>
                                <Button
                                    style={{ width: '15rem' }}
                                    component='span'
                                    type='submit'
                                    color='themeColor'
                                    className='rounded-0 text-white'
                                    variant='contained'
                                >
                                    Upload Video for KYC
                                </Button>
                            </label>
                        ) : (
                            <video controls width="320" height="240">
                                <source src={kycvidPreview} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                    </div>
                </DialogContent>
                <DialogActions>
                    {loadspin == false ? (
                        <Button onClick={handleClose} className="rounded-0 " variant="outlined" color="error">Cancel</Button>
                    ) : null}
                    {loadspin == false ? (
                        <Button onClick={(e) => handleVerify(e)} type="submit" color="themeColor" className="rounded-0 text-white" variant="contained">Verify</Button>
                    ) : (
                        <Button color="themeColor" className="rounded-0 text-white py-2 px-5" variant="contained">
                            <span className="spinner-border spinner-border-sm"></span>
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
            <div className='shadow rounded p-1 p-md-0' data-aos='fade-up'>
                <div className='d-flex justify-content-between border-bottom border-1 p-3'>
                    <div className='text-secondary fw-semibold fs-7'>
                        My Account
                    </div>
                    <div className='text-pill fw-semibold fs-7 cursor-pointer activet' id='editclick' onClick={() => setActiveTab('editProfile')}>
                        Edit Profile
                    </div>
                </div>
                <div className='bg-white p-sm-4 p-1'>
                    <div className="d-flex gap-2 gap-md-4 flex-wrap">
                        <div className='pfp'>
                            <img src={memData.pic_url} className='h-100 w-100' alt={memData.uname} />
                        </div>
                        <div className='flex-grow-1 align-self-center'>
                            <h5 className='mb-0'>{memData.uname}</h5>
                            <div className='fs-7'>{memData.email}</div>
                            <div className='fs-7  d-flex align-items-center'><StarRateIcon color='warning' fontSize='small' />
                                <div>{memData.rating}</div>
                            </div>
                        </div>
                        <div className='px-md-4 px-1'>
                            {memData.kyc_status ? memData.kyc_status == "Verified" ? (
                                <div className='fs-7 d-flex align-items-center text-theme'><MailOutlineIcon fontSize='small' />
                                    <div className=' ms-2'>
                                        Verified</div>
                                </div>
                            ) : (
                                <>
                                    <div className='fs-7 d-flex align-items-center text-danger'><PrivacyTipIcon fontSize='small' />
                                        <div className=' ms-1'>
                                            Rejected</div>
                                    </div>
                                    <Button color="themeColor" onClick={handleClickOpen} className='rounded-0 shadow-none text-white fw-bold mt-2 text-capitalize ' variant='contained' size='small'>Re-Verify</Button>
                                </>
                            ) : (
                                <Button color="warning" onClick={handleClickOpen} className='rounded-0 shadow-none fw-bold mt-2 text-capitalize ' variant='contained' size='small'>Complete KYC</Button>
                            )}
                            {/* {memData.kyc_status == false && (
                                <Button color="warning" className='rounded-0 shadow-none fw-bold mt-2 text-capitalize ' variant='contained' size='small'>KYC in proccess</Button>
                            )} */}
                        </div>
                    </div>
                    <div className='text-secondary mt-2'>
                        {memData.bio}
                    </div>
                    <div className='mt-3'>
                        <p className='fs-7 mb-0 text-secondary'>Location Information</p>
                        <hr className='mt-2' />
                    </div>
                    <div>
                        <div className='mt-2 fw-bold fs-7'>Country</div>
                        <div className=' text-secondary fs-7.5'>{memData.country}</div>
                        <div className='mt-2 fw-bold fs-7'>Zipcode</div>
                        <div className=' text-secondary fs-7.5'>{memData.zipcode}</div>
                        <div className='mt-2 fw-bold fs-7'>Address </div>
                        <div className=' text-secondary  fs-7.5'>{memData.address}</div>
                    </div>
                    <div className='mt-3'>
                        <p className='fs-7 mb-0 text-secondary'>Personal Information</p>
                        <hr className='mt-2' />
                    </div>
                    <div>
                        <div className='mt-2 fw-bold fs-7'>Email Address</div>
                        <div className=' text-secondary fs-7.5'>{memData.email}</div>
                        <div className='mt-2 fw-bold fs-7'>Phone No.</div>
                        <div className=' text-secondary fs-7.5'>+{memData.phn}</div>
                        <div className='mt-2 fw-bold fs-7'>Gender  </div>
                        <div className=' text-secondary fs-7.5'>{memData.gender}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;