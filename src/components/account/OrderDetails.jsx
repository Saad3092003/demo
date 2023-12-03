import React from 'react'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { viewOrder_crm } from '../../handleSlice';
import { useSelector } from 'react-redux';


function OrderDetails({loadScreen}) {
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
    const oid = params.id;

    useEffect(()=>{
      const fetchOrderData = async () => {
        loadScreen(true);
      await dispatch(viewOrder_crm(oid))
      loadScreen(false);
      }
      fetchOrderData();
    },[dispatch])

    
  const data = useSelector( (state) => state.userDetails.viewOrder_crm);
console.log(data);

  const headerStyle = {
    fontSize: '16px', // Adjust the font size as needed
  };

  const sectionStyle = {
    marginLeft: '20px', // Adjust the spacing as needed
  };

  return (
    <div>


      <div className="container overflow-auto">
        <h2>Order Details</h2>
        <div className="row ">
          <div className="col">
            <div className="light-gray-bg p-2">
              <div className="d-inline-block" style={sectionStyle}>
                <h2 className="d-inline" style={headerStyle}>Payment Mode:</h2>
                <p>{data.payment_mode}</p>
              </div>

              <div className="d-inline-block" style={sectionStyle}>
                <h2 className="d-inline" style={headerStyle}>Tracking ID:</h2>
                <p>{data.tracking_id}</p>
              </div>

              <div className="d-inline-block" style={sectionStyle}>
                <h2 className="d-inline" style={headerStyle}>Delivery Status:</h2>
                <p>{data.delivery_status}</p>
              </div>
            </div>
          </div>
        </div>

        <h2>Order Summary</h2>
        <table className="table table-striped table-responsive table-bordered">
          <tbody>
            <tr>
              <th>Order Code:</th>

              <td>{data.oid}</td>
            </tr>
            <tr>
              <th>Customer:</th>

              <td>{data.uname}</td>
            </tr>
            <tr>
              <th>Email:</th>

              <td>{data.email}</td>
            </tr>
            <tr>
              <th>Payment Mode</th>

              <td>{data.payment_mode}</td>
            </tr>
            <tr>
              <th>Payment Status</th>

              <td>{data.payment_status}</td>
            </tr>
            <tr>
              <th>Order Date</th>

              <td>{data.date}</td>
            </tr>
            <tr>
              <th>Order Time</th>

              <td>{data.time}</td>
            </tr>
            <tr>
              <th>Contact</th>

              <td>{data.contact}</td>
            </tr>
            <tr>
              <th>Shipping address:</th>

              <td>{data.shipping_addr}</td>
            </tr>
          </tbody>
        </table>
        <h2>Product Details</h2>
        {data && data.products &&  data.products.length > 0 ?data.products.map((product, productIndex) => (
        <table key={productIndex} className="table table-striped table-bordered">
          <tbody>
            <tr>
              <th>Product Image</th>
              <td> <img src={product.photo} height={150} width={150} alt={product.product_name} /></td>
            </tr>
            <tr>
              <th>Product Name</th>

              <td>{product.product_name}</td>
            </tr>
            <tr>
              <th>Price</th>

              <td>{product.price}</td>
            </tr>
            <tr>
              <th>Count</th>

              <td>{product.count}</td>
            </tr>
            <tr>
              <th>Reward Points</th>

              <td>{product.reward_points}</td>
            </tr>



          </tbody>
        </table>
         )) : null}
        <h2>Bill Details</h2>
        <table className="table table-striped table-responsive table-bordered">
          <tbody>
            <tr>
              {/* <th>Promotion ID</th> */}

              {/* <td>{data.promotion_id}</td> */}
            </tr>
            <tr>
              <th>Subtotal</th>

              <td>{data.subtotal}</td>
            </tr>
            <tr>
              <th>Coupon</th>

              <td>{data.coupon}</td>
            </tr>
            <tr>
              <th>Shipping</th>

              <td>{data.shipping}</td>
            </tr>
            <tr>
              <th>Tax</th>

              <td>{data.tax}</td>
            </tr>
            <tr>
              <th>Total Order Amount:</th>

              <td>{data.amount}</td>
            </tr>
          </tbody>
        </table>
      </div>






    </div>

  )
}

export default OrderDetails;