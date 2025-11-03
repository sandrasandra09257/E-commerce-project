import React from 'react'
import img1 from '../Assets/Images/exchange_icon.png'
import img2 from '../Assets/Images/quality_icon.png'
import img3 from '../Assets/Images/support_img (1).png'
function Icon() {
  return (
    
  <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">

    
    <div>
      <div class="flex justify-center mt-32 mr-7 ">
        <img src={img1} alt="Exchange Policy" class="w-14 h-14" />
      </div>
      <h3 class="text-gray-800 font-semibold mt-4 mr-7">Easy Exchange Policy</h3>
      <p class="text-gray-500 text-sm mb-2 mr-7">We offer hassle-free exchange policy</p>
    </div>

    
    <div>
      <div class="flex justify-center mt-32">
        <img src={img2} alt="Return Policy" class="w-14 h-14" />
      </div>
      <h3 class="text-gray-800 font-semibold mt-4">7 Days Return Policy</h3>
      <p class="text-gray-500 text-sm mb-2">We provide 7 days free return policy</p>
    </div>

    
    <div>
      <div class="flex justify-center mt-32">
        <img src={img3} alt="Customer Support" class="w-14 h-14" />
      </div>
      <h3 class="text-gray-800 font-semibold mt-4 ">Best Customer Support</h3>
      <p class="text-gray-500 text-sm  mb-2">We provide 24/7 customer support</p>
    </div>
    </div>



      )
}

export default Icon
