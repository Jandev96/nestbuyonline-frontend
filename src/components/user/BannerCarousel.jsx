import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const BannerCarousel = () => {
  const banners = [
    {
      id: 1,
      title: "Latest Launch of ACs",
      subtitle: "2025 Series",
      price: "Starting at ₹25,990*",
      offer: "*Exchange Offers Up to ₹10,000",
      cta: "Shop now",
      bgColor: "bg-blue-50",
      textColor: "text-blue-900",
      image: 'https://i.postimg.cc/1R2yHYFs/HP-Rotating-SC-19-Feb2025-uf8bkt.webp' // Replace with your image path
    },
    {
      id: 2,
      title: "Get from",
      subtitle: "Nest Buy",
      highlights: [
        "1.5 ton 3 star ACs",
        "Starting ₹28,990",
        "Easy EMI Starting at ₹1365/month",
        "Exchange Benefits Up to ₹10,000",
        "Same Day Delivery on Select Locations"
      ],
      cta: "Shop now",
      bgColor: "bg-cyan-50",
      textColor: "text-cyan-900",
      image: "https://i.postimg.cc/zBP84xPw/ac-banner-image.webp" // Replace with your image path
    },
    {
      id: 3,
      title: "iPhone 16e",
      price: "Starting at ₹52,900*",
      offer: "*Inclusive of all Offers",
      cta: "Shop now",
      bgColor: "bg-gray-100",
      textColor: "text-gray-900",
      image: "https://i.postimg.cc/mkzB470v/iphone-16e-banner-image.webp" // Replace with your image path
    },
    {
      id: 4,
      title: "iPhone ",
      subtitle: "Nest Buy",
      period: "Exclusive Offers 30th March - 6th April",
      model: "iPhone 16 128GB",
      price: "Starting at ₹67,490*",
      offer: "*Inclusive of all Offers",
      cta: "Shop now",
      bgColor: "bg-gray-200",
      textColor: "text-gray-900",
      image: "https://i.postimg.cc/L5cR8nSn/iphone-banner-image.webp" // Replace with your image path
    },
    {
      id: 5,
      title: "Pixel Smartwatch 3",
      price: "Starting at ₹39,400*",
      offer: "*Inclusive of all Offers",
      stats: {
        time: "10:10",
        date: "22",
        battery: "100%"
      },
      cta: "Shop now",
      bgColor: "bg-green-50",
      textColor: "text-green-900",
      image: "https://i.postimg.cc/vHnbSL79/pixel-smart-watch-banner.webp" // Replace with your image path
    },
    {
      id: 6,
      title: "Top Selling Party Speakers",
      discount: "Up to 67% Off",
      cta: "Shop now",
      bgColor: "bg-purple-50",
      textColor: "text-purple-900",
      image: "https://i.postimg.cc/sgRsFQKL/speaker-banner-image.webp" // Replace with your image path
    },
    {
      id: 7,
      brand: "Whirlpool",
      title: "Washing Machines",
      price: "Starting at ₹13,490*",
      offer: "*Additional Exchange Benefits Up to ₹2,200",
      cta: "Shop now",
      bgColor: "bg-red-50",
      textColor: "text-red-900",
      image: "https://i.postimg.cc/W16jsNH1/washing-machine-banner-image.webp" // Replace with your image path
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setTransitionEnabled(true);
    setCurrentSlide(index);
  };

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Slides container */}
      <div 
        className={`flex h-full transition-transform duration-700 ease-in-out ${transitionEnabled ? '' : 'transition-none'}`}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {banners.map((banner, index) => (
          <div 
            key={banner.id}
            className={`flex-shrink-0 w-full h-full ${banner.bgColor} ${banner.textColor} relative`}
          >
            <div className="container mx-auto h-full flex items-center">
              {/* Content */}
              <div className="w-full md:w-1/2 px-6 z-10">
                {banner.title && <h2 className="text-3xl md:text-4xl font-bold mb-2">{banner.title}</h2>}
                {banner.subtitle && <h3 className="text-2xl md:text-3xl font-semibold mb-4">{banner.subtitle}</h3>}
                {banner.period && <p className="text-lg mb-3">{banner.period}</p>}
                {banner.model && <p className="text-xl font-medium mb-3">{banner.model}</p>}
                {banner.price && <p className="text-xl md:text-2xl font-bold mb-2">{banner.price}</p>}
                {banner.offer && <p className="text-sm md:text-base mb-4">{banner.offer}</p>}
                {banner.discount && <p className="text-2xl font-bold text-red-600 mb-4">{banner.discount}</p>}
                
                {banner.highlights && (
                  <ul className="mb-4 space-y-2">
                    {banner.highlights.map((item, i) => (
                      <li key={i} className="flex items-center">
                        <span className="mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                {banner.stats && (
                  <div className="flex space-x-4 mb-4">
                    <div>
                      <p className="text-2xl font-bold">{banner.stats.time}</p>
                      <p>{banner.stats.date}</p>
                    </div>
                    <div>
                      <p className="text-xl">{banner.stats.battery}</p>
                    </div>
                  </div>
                )}
                
                <button className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
                  {banner.cta}
                </button>
              </div>
              
              {/* Image */}
              <div className="hidden md:block absolute right-0 top-0 h-full w-1/2">
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-contain object-center"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition z-10"
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition z-10"
      >
        <FiChevronRight className="w-6 h-6" />
      </button>
      
      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-black' : 'bg-gray-400'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BannerCarousel;