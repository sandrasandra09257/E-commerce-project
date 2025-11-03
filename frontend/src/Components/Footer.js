import React from 'react'
import yourimg1 from '../Assets/Images/Rectangle 3608 (1).png'
import yourimg2 from '../Assets/Images/Rectangle 3627.png'
import yourimg3 from '../Assets/Images/Rectangle 3626.png'
import yourimg4 from '../Assets/Images/Rectangle 3611.png'
import yourimg5 from '../Assets/Images/Rectangle 3629.png'

function Footer() {
  return (
    <div>
      <div className="container mx-auto px-4 py-16">

    <div className="text-center mt-14">
                <h2 className="text-3xl font-medium uppercase tracking-widest text-gray-800  inline-block px-4 pb-2">
                     <span className="text-gray-500">BEST</span><span className="px-1">SELLER</span>
                     <div 
                        className="w-10 h-0.5 bg-gray-500" 
                        style={{ marginLeft: '249px',marginTop:'-14px' }} 
                    ></div>
                </h2>
        <p className="mt-4 text-sm text-gray-500 max-w-2xl mx-auto">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
        </p>
    </div>

    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mx-7 mt-10 px-10 ">
    
        <div className="group">
            <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                <img src={yourimg1} alt="Product Name" class="w-full h-full object-cover" />
            </div>
            <div className="pt-3 text-left">
                <p className="text-sm font-medium text-gray-700 truncate hover:text-gray-900">
                    Women Round Neck Cotton Top
                </p>
                <p className=" text-sm font-semibold text-gray-900" style={{marginRight:'400px'}}>
                    $149
                </p>
            </div>
        </div>
        <div className="group">
            <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                <img src={yourimg2} alt="Product" class="w-full h-full object-cover" />
            </div>
            <div className="pt-3 text-left">
                <p className="text-sm font-medium text-gray-700 truncate">Women Round Neck Cotton Top</p>
                <p className="mt-1 text-sm font-semibold text-gray-900" style={{marginRight:'400px'}}>$149</p>
            </div>
        </div>

        <div className="group">
            <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                <img src={yourimg3} alt="Product" class="w-full h-full object-cover" />
            </div>
            <div className="pt-3 text-left">
                <p className="text-sm font-medium text-gray-700 truncate">Men Round Neck Cotton Top</p>
                <p className="mt-1 text-sm font-semibold text-gray-900" style={{marginRight:'400px'}}>$149</p>
            </div>
        </div>

        <div className="group">
            <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                <img src={yourimg4}alt="Product" class="w-full h-full object-cover" />
            </div>
            <div className="pt-3 text-left">
                <p className="text-sm font-medium text-gray-700 truncate">Men Round Neck Pure Cotton T-shirt</p>
                <p className="mt-1 text-sm font-semibold text-gray-900" style={{marginRight:'400px'}}>$149</p>
            </div>
        </div>

        <div className="group">
            <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
                <img src={yourimg5} alt="Product" class="w-full h-full object-cover" />
            </div>
            <div className="pt-3 text-left">
                <p className="text-sm font-medium text-gray-700 truncate">Men Round Neck Pure Cotton T-shirt</p>
                <p className="mt-1 text-sm font-semibold text-gray-900" style={{marginRight:'400px'}}>$149</p>
            </div>
        </div>

        </div>
        </div>
        </div>

  )
}

export default Footer
