import React, { useEffect, useState } from 'react'


import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import useFetch from '../../hooks/useFetch';

import Cards from '../../components/user/Cards'
import ProductCardSkeltons from '../../components/user/ProductCardSkeltons';

function Products() {
    
  const [productList,isLoading,error ]= useFetch('/product/products')


    const NextArrow = (props) => {
        const { className, style, onClick } = props;



        return (
          <div
            className={className}
            style={{ ...style, display: 'block', background: 'gray', borderRadius: '50%' }}
            onClick={onClick}
          />
        );
      };
      
      const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
          <div
            className={className}
            style={{ ...style, display: 'block', background: 'gray', borderRadius: '50%' }}
            onClick={onClick}
          />
        );
      };






      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3.05, // Number of cards to show at once
        slidesToScroll: 1, // Number of cards to scroll at a time
        nextArrow: <NextArrow />, // Custom next arrow
        prevArrow: <PrevArrow />, // Custom previous arrow
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1,
            },
          },
        ],
      };

      if(isLoading){
        return <ProductCardSkeltons />
      }



  return (
    <div className="carousel-container">
    <Slider {...settings}>
      {productList.map((product, index) => (
        <div key={index}>
          <Cards product={product} key={product._id} />
        </div>
      ))}
    </Slider>
  </div>
  )
}

export default Products


