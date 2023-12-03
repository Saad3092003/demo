import React from 'react'
import { useLocation } from 'react-router-dom';


function BookingDetails() {
  const location = useLocation();
  const data = location.state;
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
        <h2>Booking Details</h2>
        <div className="row ">
          <div className="col">
            <div className="light-gray-bg p-2">


              <div className="d-inline-block" style={sectionStyle}>
                <h2 className="d-inline" style={headerStyle}>Booking ID:</h2>
                <p>{data.bid}</p>
              </div>

              <div className="d-inline-block" style={sectionStyle}>
                <h2 className="d-inline" style={headerStyle}>Delivery Status:</h2>
                <p>{data.status}</p>
              </div>
              <div className="d-inline-block" style={sectionStyle}>
                <h2 className="d-inline" style={headerStyle}>User :</h2>
                <p>{data.user}</p>
              </div>
            </div>
          </div>
        </div>

        <h2>Booking Summary</h2>
        <table className="table table-striped table-responsive table-bordered">
          <tbody>
            <tr>
              <th>Booking Code:</th>

              <td>{data.bid}</td>
            </tr>
            <tr>
              <th>Booking Title</th>

              <td>{data.title}</td>
            </tr>
            <tr>
              <th>Price</th>

              <td>{data.price}</td>
            </tr>
            <tr>
              <th>Venue</th>

              <td>{data.venue}</td>
            </tr>
            <tr>
              <th>Phone</th>

              <td>{data.phone}</td>
            </tr>
            <tr>
              <th>Description</th>

              <td>{data.desc}</td>
            </tr>
            <tr>
              <th>Booking Date</th>

              <td>{data.date}</td>
            </tr>
            <tr>
              <th>Booking Time</th>

              <td>{data.time}</td>
            </tr>
            <tr>
              <th>Consultant</th>

              <td>{data.consultant}</td>
            </tr>

          </tbody>
        </table>
        <h2>Booking Photos :</h2>
        {data.booking_photos.length > 0 ? data.booking_photos.map((product, productIndex) => (
          <img srcset="image.avif, image.webp, image.jpg" src={product} height={150} width={150} alt={product} />
        )) : <h3 className='text-center mt-1'>No Photos</h3>}

      </div>






    </div>

  )
}

export default BookingDetails;