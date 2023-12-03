import React, { useState, useEffect } from "react";
import StarRateIcon from "@mui/icons-material/StarRate";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Order_Table } from "../../handleSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LoggedMember } from "../../handleSlice";
import transactionimg from "../../pages/account/images/transaction-point.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
function Transaction({ setActiveTab }) {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleClickScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }
  // useEffect(() => {
  // dispatch(LoggedMember())
  // }, [dispatch])
  // console.log(LoggedMember);
  const mid = Cookies.get("mid") || localStorage.getItem("mid");
  useEffect(() => {
    dispatch(Order_Table(mid));

    // dispatch(Internal_Notes(mid));
  }, [dispatch]);
  const memData = useSelector((state) => state.userDetails.LoggedMember);
  const orders = useSelector((state) => state.userDetails.Order_Table);
  console.log(orders);
  return (
    < >
      <div className="shadow rounded p-3 bg-white overflow-auto">
        <div className="text-secondary fw-semibold fs-7 position-sticky start-0">
          Transaction History
        </div>
        <hr className="text-secondary position-sticky start-0" />
        <div className="row gx-5 gy-2 position-sticky start-0">
          <div className="col-sm-6">
            <div className="p-3 shadow-sm bg-pill rounded align-items-center d-flex gap-2 flex-wrap justify-content-between">
              <div className="d-flex gap-3">
                <div>
                  <img src={transactionimg} className="img-fluid" width={40} />
                </div>
                <div className="text-white">
                  <h5 className="my-0">${memData.payment_history}</h5>
                  <p className="my-0 fs-7 fw-bold">Total Purchase</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table border="1" className="table mt-5 table-responsive rounded text-nowrap">
          <thead className="thead-dark ">
            <tr >

              <th className="bg-black text-white">Order ID</th>
              <th className="bg-black text-white">Amount</th>
              <th className="bg-black text-white">Payment Method</th>
              <th className="bg-black text-white">Status</th>
              <th className="bg-black text-white">Date</th>
              <th className="bg-black text-white">View Order</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <>

                <tr key={index} style={{ verticalAlign: 'middle' }}>

                  <td>{order.oid}</td>
                  <td>{order.subtotal}</td>
                  <td>{order.payment_mode}</td>
                  <td>{order.payment_status}</td>
                  <td>{order.date}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        handleClickScroll();
                        const data = {
                          mid: order.mid,
                          amount: order.amount,
                          payment_mode: order.payment_mode,
                          tracking_id: order.tracking_id,
                          delivery_status: order.delivery_status,
                          payment_status: order.payment_status,
                          payment_mode: order.payment_mode,
                          email: order.email,
                          shipping_addr: order.shipping_addr,
                          contact: order.contact,
                          uname: order.uname,
                          coupon: order.coupon,
                          shipping: order.shipping,
                          subtotal: order.subtotal,
                          tax: order.tax,
                          promotion_id: order.promotion_id,
                          oid: order.oid,
                          date: order.date,
                          time: order.time,
                          // pid: product.pid,
                          // product_name: product.product_name,
                          // product_img: product.photo,
                          // price: product.price,
                          // photo: product.photo,
                          // count: product.count,
                          products: order.products,
                          // reward_points: product.reward_points,
                        };

                        Navigate(`/orderDetailPage/${order.oid}`, { state: data });

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
      </div>
    </>
  );
}

export default Transaction;
