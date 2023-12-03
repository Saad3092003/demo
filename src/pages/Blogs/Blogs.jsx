import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllBlogs_cms } from '../../handleSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Blogs = ({ loadScreen }) => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  useEffect(() => {
    const getBlogData = async () => {
      loadScreen(true);
      await dispatch(getAllBlogs_cms());
      loadScreen(false);
    }
    getBlogData();

  }, [dispatch])

  const blogData = useSelector((state) => state.userDetails.getAllBlogs_cms);
  console.log(blogData);
  return (
    <>
      <div className='account-bg p-5'>
        <h1 className='text-white text-center' data-aos='zoom-in'>Blogs</h1>
      </div>
      <div className="container">
        <h3 className='my-4'>Explore Blogs</h3>
        <div className="row g-4">
          {blogData.map(item => (
            <div className="col-md-6 col-lg-4">
              <div className="card cursor-pointer upload-img2" key={item.blog_id} onClick={() => {
                Navigate(`/readBlog/${item.blog_id}`, { state: { blog_id: item.blog_id } })
              }}>
                <img src={item.banner_image} className="card-img-top" alt={item.name} />
                <div className="card-body">
                  <h5 className="card-title text-capitalize">{item.name}</h5>
                  <p className="card-text">Read Time :{item.read_time}</p>
                  <p className="card-text">Category : {item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Blogs;
