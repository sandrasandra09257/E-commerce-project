import React from 'react'
import  myimg from '../Assets/Images/header_img.jpg'

function Banner() {
  return (
    
<div className='px-12'>
    <div className='w-full flex flex-col md:flex-row items-center border border-gray-300'>
    <div className="flex items-center bg-white min-h-[400px]">
    <div className="w-1/2 p-10 lg:p-20 flex flex-col justify-center">
        <p className="text-sm tracking-widest text-gray-700 uppercase mb-2 flex items-center">
            <span class="w-8 h-px bg-gray-700 mr-2"></span>
            OUR BESTSELLERS
        </p>
        <h2 className="text-6xl font-serif text-gray-900 mb-6 leading-tight">
            Latest Arrivals
        </h2>
        <a href="#" className="text-base tracking-widest text-gray-700 uppercase flex items-center hover:text-gray-900 transition duration-300">
            SHOP NOW
            <span className="w-8 h-px bg-gray-700 ml-2"></span>
        </a>
    </div>

    <div className="w-1/2 bg-pink-100 relative overflow-hidden min-h-[400px]">
        <img src={myimg} alt="Model wearing a black scarf" className="object-cover w-half h-full relative inset-0" />
        </div>
</div>
</div>
</div>

  )
}

export default Banner
