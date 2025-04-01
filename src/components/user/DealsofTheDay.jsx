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
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 bg-gray-100 dark:bg-gray-900/50 px-3 py-1 rounded-md inline-block">
        Deals Of The Day
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((deal, index) => (
          <div 
            key={index}
            className="relative group h-64 transition-all duration-500 ease-in-out hover:scale-105 hover:z-10 hover:shadow-xl rounded-lg overflow-hidden"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <img 
                src={deal.image} 
                alt={deal.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${deal.gradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
            </div>
            
            {/* Hover Effects */}
            <div className={`absolute -inset-1 blur-md opacity-0 group-hover:opacity-30 bg-gradient-to-r ${deal.hoverGradient} transition-opacity duration-500`}></div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-4 text-white">
              <div>
                {deal.brand && (
                  <div className="flex items-center mb-1">
                    <span className="font-bold text-white/90 mr-2">{deal.brand}</span>
                  </div>
                )}
                <h3 className="font-semibold text-lg drop-shadow-md">{deal.title}</h3>
              </div>
              
              <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                {deal.note ? (
                  <p className="text-xs text-white/80 italic">{deal.note}</p>
                ) : (
                  <p className="font-medium text-white/90 drop-shadow-md">{deal.price}</p>
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