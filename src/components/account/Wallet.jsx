import React, { useEffect, useState } from "react";
import balanceimg from '../../pages/account/images/balance.png';
import pointsimg from '../../pages/account/images/points.png';
import { Button } from "@mui/material";
import { useSelector } from 'react-redux';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useDispatch } from "react-redux";
import { get_transaction_history_wallet } from "../../handleSlice";
import Cookies from "js-cookie";




function Wallet() {
    const memData = useSelector((state) => state.userDetails.LoggedMember);
    const mid = Cookies.get('mid') || localStorage.getItem('mid');
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchWalletData = async () => {
            await dispatch(get_transaction_history_wallet(mid));
        }
        fetchWalletData();
    }, [dispatch])

    const transactionData = useSelector((state) => state.userDetails.get_transaction_history_wallet);
    return (
        <div className='shadow rounded p-3 bg-white' data-aos="fade-up">
            <div className='text-secondary fw-semibold fs-7'>
                My Point
            </div>
            <hr className="text-secondary" />
            <div className='row gx-5 gy-2 pb-2 pt-1'>
                <div className="col-md-6">
                    <div className='p-3 shadow-sm bg-dark rounded align-items-center d-flex gap-2 flex-wrap justify-content-between'>
                        <div className='d-flex gap-3'>
                            <div>
                                <img src={balanceimg} className='img-fluid' width={40} />
                            </div>
                            <div className='text-white'>
                                <h5 className='my-0'>{memData.cashback_points.toFixed(0)}</h5>
                                <p className='my-0 fs-7 fw-bold'>Cashback Points</p>
                            </div>
                        </div>
                        <div>
                            {/* <Button variant='contained' className='bg-white activet text-dark'>Withdraw</Button> */}
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className='p-3 shadow-sm bg-pill rounded align-items-center d-flex gap-2 flex-wrap justify-content-between'>
                        <div className='d-flex gap-3'>
                            <div>
                                <img src={pointsimg} className='img-fluid' width={40} />
                            </div>
                            <div>
                                <h5 className='my-0'>{memData.reward_points.toFixed(0)}</h5>
                                <p className='my-0 fs-7 fw-bold'>Reward Points</p>
                            </div>
                        </div>
                        <div>
                            {/* <Button variant='contained' className='bg-dark activet'>Get Point</Button> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                {transactionData.map((item, index) => (
                    <div key={index}>
                        <div className='d-flex justify-content-between gap-2 flex-wrap'>
                            <div>
                                <div className="d-flex ">
                                    {item.event == 'Credited' ?
                                        <div className='bg-theme me-3 text-white rounded t-p-box'>
                                            <SouthWestIcon />
                                        </div>
                                        : <div className='bg-pill me-3 text-white rounded t-p-box'>
                                            <NorthEastIcon />
                                        </div>}
                                    <div>
                                        <h5 className='my-0'>{item.event}</h5>
                                        {item.category == 'Cashback' ? <p className='text-secondary my-0'>Refund</p> : <p className='text-secondary my-0'>From Purchase</p>}
                                    </div>
                                </div>
                            </div>
                            <div className='text-end'>
                                <h6 className='my-0'>S$ {item.amt && Math.ceil(item.amt)}</h6>
                                <p className='my-0 text-secondary'>{item.category}</p>
                            </div>
                        </div>
                        <div className="fs-7 text-secondary my-1">{item.date}</div>
                        <hr className='text-secondary mt-1' />
                    </div>
                ))}

            </div>
        </div>
    )
}
export default Wallet;