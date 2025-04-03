import React from 'react';

const DealsOfTheDay = () => {
  const deals = [
    {
      title: "Bluetooth Headphones",
      price: "Starting at ₹1,290",
      image: "https://i.pinimg.com/736x/c9/d3/d9/c9d3d9497ff6778e67c4538fd1067837.jpg",
      gradient: "from-blue-100 to-purple-100",
      hoverGradient: "from-blue-200 to-purple-200"
    },
    {
      title: "Mixers, Blenders, Air Fryers",
      price: "Starting at ₹499",
      image: "https://i.pinimg.com/736x/90/62/bb/9062bbce12f670cba0f507d3d8ce16d5.jpg",
      gradient: "from-green-100 to-blue-100",
      hoverGradient: "from-green-200 to-blue-200"
    },
    {
      title: "Power Banks",
      price: "Starting at ₹751",
      image: "https://i.pinimg.com/736x/12/76/fe/1276fee2c9f18f411d2fca0d98e2612a.jpg",
      gradient: "from-orange-100 to-red-100",
      hoverGradient: "from-orange-200 to-red-200"
    },
    {
      title: "Galaxy Fit 3 Smartwatch",
      brand: "SAMSUNG",
      note: "Inclusive of all Offers",
      image: "https://i.pinimg.com/736x/77/b6/bb/77b6bba1bf8921f80b95a3ba26dbef93.jpg",
      gradient: "from-purple-100 to-pink-100",
      hoverGradient: "from-purple-200 to-pink-200"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 mb-8">
         <h2 className="text-2xl font-bold text-white mb-6 px-3 py-1 rounded-md inline-block 
                     animate-bounce 
                     bg-gradient-to-r from-yellow-500 to-gray-700 
                     shadow-lg
                     hover:shadow-[0_0_15px_#b45309,0_0_30px_#9ca3af]
                     transition-all duration-500">
        Deals Of The Day
      </h2>
      
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((deal, index) => (
          <div 
            key={index}
            className="relative group h-64 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:z-10 hover:shadow-lg rounded-lg overflow-hidden border border-gray-200"
          >
            {/* Background Image - No gradients */}
            <img 
              src={deal.image} 
              alt={deal.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            
            {/* Content Overlay - Semi-transparent for readability */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
            
            {/* Text Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {deal.brand && (
                  <span className="font-bold text-white block mb-1">{deal.brand}</span>
                )}
                <h3 className="font-semibold text-lg">{deal.title}</h3>
                {deal.note ? (
                  <p className="text-sm text-white/90 mt-1">{deal.note}</p>
                ) : (
                  <p className="font-medium text-white mt-1">{deal.price}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsOfTheDay;