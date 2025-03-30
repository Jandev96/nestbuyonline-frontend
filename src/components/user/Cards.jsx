import React from 'react'
import { useNavigate } from 'react-router-dom'





function Cards({product}) {

const navigate =useNavigate();
  
  return (
   
    <div className="card bg-base-100 w-96 h-100 shadow-sm relative group ">
  <figure className="relative">
    <img 
      src={product.images}
      alt={product.category}
      className="w-screen "
    />
    {/* Product Title Overlay */}
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 text-white text-lg font-semibold opacity-0
     group-hover:opacity-65 transition-opacity duration-300">
     {product.name}
    </div>
  </figure>

  {/* Buy Button (Hidden by default, appears on hover) */}
  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    <button className="btn btn-primary"  onClick={()=> navigate(`/productDetails/${product?._id}`)} >Buy Now</button>
  </div>
</div>

  
  
  )
}

export default Cards