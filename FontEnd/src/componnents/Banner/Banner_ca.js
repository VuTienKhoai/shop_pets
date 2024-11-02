import React from 'react';
import './Banner.css';
import { Link } from 'react-router-dom';
import { banner_ca } from '../../data';
import { formatVietnameseToString } from '../Common/formatVietnameseToString'
const Banner_ca = ({ category }) => {
  return (
    <>
      {banner_ca?.map((item, index) => (
        <div className="image-overlay-container" key={index}>
          <div className="overlay">
            <img src={item.img} alt="Overlay" className="overlay-image" />
          </div>
          <div className="overlay-text">
            <p> {category[index]?.name}  </p>

            <div className="banner_btn">
              <Link to={`/category/${formatVietnameseToString(category[index]?.name ? category[index].name : '404')}/${category[index]?.id}`}>Shop Now</Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Banner_ca;
