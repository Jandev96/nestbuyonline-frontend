import React from "react";

import BannerCarousel from "../../components/user/BannerCarousel";
import ProductBanner from "../../components/user/ProductBanner";
import DealsOfTheDay from "../../components/user/DealsofTheDay";
import CircleCarousel from "../../components/user/CircleCarousel";



function Home() {


  

  return (
    <div>

<BannerCarousel />
<ProductBanner />
<DealsOfTheDay />
<div className="w-full h-[600px] flex items-center justify-center px-4 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
  <CircleCarousel
    baseWidth={400}
    autoplay={true}
    autoplayDelay={2000}
    pauseOnHover={true}
    loop={true}
    round={true}
  />
</div>











     
    </div>
  );
}

export default Home;
