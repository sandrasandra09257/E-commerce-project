import React from 'react'
import abimg from '../Assets/Images/about_img.png'
function About() {
  return (
    <div>
      <div class="flex flex-col  items-center mr-20 mb-12 mt-10 ">
            <h2 className="text-3xl font-medium uppercase tracking-widest mb-7 text-gray-800  inline-block px-4 pb-2">
                     <span className="text-gray-500">ABOUT</span><span className="px-1">US</span>
                     <div 
                        className="w-10 h-0.5 bg-gray-500" 
                        style={{ marginLeft: '170px',marginTop:'-14px' }} 
                    ></div>
                </h2> 
        </div>
        
        <div class="grid md:grid-cols-2 mr-10">
            <div class="h-full">
                <img class="w-100 ml-10  h-[490px] overflow-hidden rounded-sm " 
                     src={abimg} 
                     alt="Apparel and coffee mug on a blanket" 
                     
                />
            </div>

            <div class="py-10 text-base text-light-gray space-y-6 lg:space-y-8">
                <p class="font-light leading-relaxed">
                    Forever Was Born Out Of A Passion For Innovation And A Desire To Revolutionize The Way People Shop Online. Our Journey Began With A Simple Idea: To Provide A Platform Where Customers Can Easily Discover, Explore, And Purchase A Wide Range Of Products From The Comfort Of Their Homes.
                </p>

                <p class="font-light leading-relaxed">
                    Since Our Inception, We've Worked Tirelessly To Curate A Diverse Selection Of High-Quality Products That Cater To Every Taste And Preference. From Fashion And Beauty To Electronics And Home Essentials, We Offer An Extensive Collection Sourced From Trusted Brands And Suppliers.
                </p>

                <h3 class="text-lg font-medium text-gray-900 pt-4 tracking-wider">
                    Our Mission
                </h3>

                <p class="font-light leading-relaxed">
                    Our Mission At Forever Is To Empower Customers With Choice, Convenience, And Confidence. We're Dedicated To Providing A Seamless Shopping Experience That Exceeds Expectations, From Browsing And Ordering To Delivery And Beyond.
                </p>
            </div>
        </div>
        <div class="flex flex-col items-start justify-center mb-2 mt-20 ml-7">
           <h2 className="text-3xl font-medium uppercase tracking-widest mb-7 text-gray-800  inline-block px-4 pb-2">
                     <span className="text-gray-500">WHY</span><span className="px-1">CHOOSE US</span>
                     <div 
                        className="w-10 h-0.5 bg-gray-500" 
                        style={{ marginLeft: '280px',marginTop:'-14px' }} 
                    ></div>
                </h2>
        </div>
        
        <div class="h-40 grid grid-cols-1 md:grid-cols-3 ">
    
    <div class="ml-10 border border-gray-300 p-7 text-start shadow-sm">
      <h3 class="text-gray-800 font-semibold uppercase mb-3">Quality Assurance</h3>
      <p class="text-gray-600 leading-relaxed text-sm">
        We meticulously select and vet each product to ensure it meets our stringent quality standards.
      </p>
    </div>

    
    <div class=" border border-gray-300 p-7 text-start shadow-sm">
      <h3 class="text-gray-800 font-semibold uppercase mb-3">Convenience</h3>
      <p class="text-gray-600 leading-relaxed text-sm">
        With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
      </p>
    </div>

    
    <div class="border border-gray-300  p-7 text-start shadow-sm">
      <h3 class="text-gray-800 font-semibold uppercase mb-3">Exceptional Customer Service</h3>
      <p class="text-gray-600 leading-relaxed text-sm">
        Our team of dedicated professionals is here to assist you every step of the way, ensuring your satisfaction is our top priority.
      </p>
    </div>
  </div>
  <div class="container mx-auto px-4 ">
            <div class=" mt-40 text-center max-w-2xl mx-auto mb-10">
                
                <h3 class=" text-3xl font-medium text-gray-900 mb-5">
                    Subscribe now & get 20% off
                </h3>
                
                <p class="text-sm text-gray-500 mb-8">
                    Lorem ipsum is simply dummy text of the printing and typesetting industry.
                </p>

                <form class="flex justify-center">
                    <input 
                        type="email" 
                        placeholder="Enter your email id"
                        class="w-full max-w-sm px-4 py-3 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-900 text-sm"
                    />
                    
                    <button 
                        type="submit" 
                        class="bg-black text-white px-6 py-3 text-sm font-medium uppercase tracking-wider hover:bg-gray-800 transition duration-300"
                    >
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
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

export default About
