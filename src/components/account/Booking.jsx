import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getBookings_hsm, getBookings_sm } from '../../handleSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Booking() {
  const [activeTab, setActiveTab] = useState('Showcase');
  const Navigate = useNavigate();
  const mid = Cookies.get('mid') || localStorage.getItem('mid');
  const [loadspinbtn, setloadspinbtn] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {

    setloadspinbtn(true);

    dispatch(getBookings_sm(mid));
    dispatch(getBookings_hsm(mid));
    setloadspinbtn(false);


  }, [dispatch]);
  const SMData = useSelector((state) => state.userDetails.getBookings_sm);
  const HSMData = useSelector((state) => state.userDetails.getBookings_hsm);
  return (
    <div className='shadow rounded bg-white container pb-4' data-aos="fade-up">
      <div className='text-secondary fw-semibold fs-7'>
        <div className="p-1">
          All Bookings
        </div>

        <div className="row  bg-theme-light">
          <button className={`nav-link activet ${activeTab == 'Showcase' && ('bg-theme text-white')} p-1 fs-6 border-0 text-dark col d-inline`} id="Showcase" onClick={() => { setActiveTab('Showcase'); }}>Showcase</button>
          <button className={`nav-link activet ${activeTab == 'HSM' && ('bg-theme text-white')} p-1 fs-6 border-0 text-dark col d-inline`} id="HSM" onClick={() => { setActiveTab('HSM'); }}>HSM</button>
        </div>
      </div>
      {activeTab == 'Showcase' && (
        <div className='overflow-auto'>
          <table border="1" className="table mt-4 table-responsive rounded text-nowrap">
            <thead className="thead-dark ">
              <tr >

                <th className="bg-black text-white">Title</th>
                <th className="bg-black text-white">Date</th>
                <th className="bg-black text-white">Time</th>
                <th className="bg-black text-white">Price</th>
                <th className="bg-black text-white">Status</th>
                <th className="bg-black text-white">View Order</th>
              </tr>
            </thead>

            <tbody>

              {SMData.map((booking, index) => (
                <>

                  <tr key={index} style={{ verticalAlign: 'middle' }}>

                    <td>{booking.title}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>{booking.price}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          //   handleClickScroll();
                          //   const data = {
                          //     mid: order.mid,
                          //     amount: order.amount,
                          //     payment_mode: order.payment_mode,
                          //     tracking_id: order.tracking_id,
                          //     delivery_status: order.delivery_status,
                          //     payment_status: order.payment_status,
                          //     payment_mode: order.payment_mode,
                          //     email: order.email,
                          //     shipping_addr: order.shipping_addr,
                          //     contact: order.contact,
                          //     uname: order.uname,
                          //     coupon: order.coupon,
                          //     shipping: order.shipping,
                          //     subtotal: order.subtotal,
                          //     tax: order.tax,
                          //     promotion_id: order.promotion_id,
                          //     oid: order.oid,
                          //     date: order.date,
                          //     time: order.time,
                          //     // pid: product.pid,
                          //     // product_name: product.product_name,
                          //     // product_img: product.photo,
                          //     // price: product.price,
                          //     // photo: product.photo,
                          //     // count: product.count,
                          //     products : order.products,
                          //     // reward_points: product.reward_points,
                          //   };

                          Navigate(`/bookingDetailPage`, { state: booking });

                        }}
                      >
                        View Order
                      </button>
                    </td>
                  </tr>

                </>
              ))}
            </tbody>

          </table>
          {
            loadspinbtn == true && (
              <div className="bg-white m-5 d-flex justify-content-center align-items-center">
                <div className="spinner-border text-success " style={{ scale: '1.5' }}></div>
              </div>
            )}
        </div>
      )}
      {activeTab == 'HSM' && (
        <div className='overflow-auto'>
          <table border="1" className="table mt-4 table-responsive rounded text-nowrap">
            <thead className="thead-dark ">
              <tr >

                <th className="bg-black text-white">Title</th>
                <th className="bg-black text-white">Date</th>
                <th className="bg-black text-white">Time</th>
                <th className="bg-black text-white">Price</th>
                <th className="bg-black text-white">Status</th>
                <th className="bg-black text-white">View Order</th>
              </tr>
            </thead>

            <tbody>

              {HSMData.map((booking, index) => (
                <>

                  <tr key={index} style={{ verticalAlign: 'middle' }}>

                    <td>{booking.title}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>
                    <td>{booking.price}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          //   handleClickScroll();
                          //   const data = {
                          //     mid: order.mid,
                          //     amount: order.amount,
                          //     payment_mode: order.payment_mode,
                          //     tracking_id: order.tracking_id,
                          //     delivery_status: order.delivery_status,
                          //     payment_status: order.payment_status,
                          //     payment_mode: order.payment_mode,
                          //     email: order.email,
                          //     shipping_addr: order.shipping_addr,
                          //     contact: order.contact,
                          //     uname: order.uname,
                          //     coupon: order.coupon,
                          //     shipping: order.shipping,
                          //     subtotal: order.subtotal,
                          //     tax: order.tax,
                          //     promotion_id: order.promotion_id,
                          //     oid: order.oid,
                          //     date: order.date,
                          //     time: order.time,
                          //     // pid: product.pid,
                          //     // product_name: product.product_name,
                          //     // product_img: product.photo,
                          //     // price: product.price,
                          //     // photo: product.photo,
                          //     // count: product.count,
                          //     products : order.products,
                          //     // reward_points: product.reward_points,
                          //   };

                          Navigate(`/bookingDetailPage`, { state: booking });

                        }}
                      >
                        View Order
                      </button>
                    </td>
                  </tr>

                </>
              ))}
            </tbody>

          </table>
          {
            loadspinbtn == true && (
              <div className="bg-white m-5 w-100 d-flex justify-content-center align-items-center">
                <div className="spinner-border text-success " style={{ scale: '1.5' }}></div>
              </div>
            )}
        </div>
      )}
    </div>
  )
}

export default Booking;