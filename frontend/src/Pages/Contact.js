import React from 'react'
import cimg from '../Assets/Images/contact_img.png'

function Contact() {
  return (
    <div>
      <section class="max-w-6xl mx-auto px-6 py-12">
  <h2 class="text-center text-2xl md:text-3xl font-semibold text-gray-800 mb-12">
    CONTACT <span class="font-bold">US</span>
    <span class="inline-block w-12 border-b-2 border-gray-400 align-middle ml-2"></span>
  </h2>

  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
    
    <div class="flex justify-center">
      <img src={cimg}
           alt="Office Desk" class="rounded-lg shadow-md w-full md:w-[90%]"/>
    </div>

    
    <div>
      <h3 class="text-lg font-semibold text-gray-800 uppercase mb-2">Our Store</h3>
      <p class="text-gray-600 mb-3">
        5478 Wilshire Station,<br />
        Suite 1045, Manchester, USA
      </p>
      <p class="text-gray-600 mb-2">Tel: +1 945 331 0739</p>
      <p class="text-gray-600 mb-6">Email: foreverstoreexample@gmail.com</p>

      <h3 class="text-lg font-semibold text-gray-800 uppercase mb-2">Careers at Forever</h3>
      <p class="text-gray-600 mb-4">
        Learn more about our teams and job openings.
      </p>
      <button class="border border-gray-800 text-gray-800 px-5 py-2 rounded hover:bg-gray-800 hover:text-white transition">
        Explore Jobs
      </button>
    </div>
  </div>
</section>


<section class="mt-32 bg-white py-16 text-center">
  <h3 class="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
    Subscribe now & get 20% off
  </h3>
  <p class="text-gray-500 mb-6 text-sm md:text-base">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </p>
  <form class="flex justify-center items-center gap-3 max-w-md mx-auto">
    <input type="email"
           placeholder="Enter your email"
           class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-gray-500" />
    <button type="submit"
            class="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition">
      Subscribe
    </button>
  </form>
</section>
<div class="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-10">

    
    <div class=" md:w-1/3 mt-40">
       <h2 className="mb-4 font-logo text-2xl font-semibold text-gray-800 tracking-widest uppercase ">
    
        FOREVER<span class="text-red-600 ">.</span>
      </h2>
      <p class=" text-gray-500 text-sm leading-relaxed">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book.
      </p>
    </div>
    <div class=" ml-40 md:col-span-1 mt-40 ">
                <h4 class="text-base font-semibold uppercase mb-4 tracking-wider">
                    COMPANY
                </h4>
                <ul class="space-y-2 text-sm text-gray-600">
                    <li><a href="#" class="hover:text-gray-900">Home</a></li>
                    <li><a href="#" class="hover:text-gray-900">About us</a></li>
                    <li><a href="#" class="hover:text-gray-900">Delivery</a></li>
                    <li><a href="#" class="hover:text-gray-900">Privacy policy</a></li>
                </ul>
            </div>

            <div class=" md:col-span-1 mt-40">
                <h4 class="text-base font-semibold uppercase mb-4 tracking-wider">
                    GET IN TOUCH
                </h4>
                <ul class="space-y-2 text-sm text-gray-600">
                    <li>+1-212-456-7890</li>
                    <li>greatstackdev@gmail.com</li>
                </ul>
            </div>

        </div>
    
    
        </div>
        
  )
}

export default Contact
