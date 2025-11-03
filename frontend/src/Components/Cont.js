import React from 'react'

function Cont() {
  return (
    <div>
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

export default Cont
