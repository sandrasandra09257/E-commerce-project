import React from 'react'

function Simple() {
  return (
    <div>
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
    
    </div>
  )
}

export default Simple
