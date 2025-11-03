import React, { useContext } from 'react';
import { ShopContext } from './Context/ShopContext';
import { NavLink } from 'react-router-dom';

function Grid({ title1, title2, limit }) {
  const { products } = useContext(ShopContext);
  const displayedCollections = limit ? products.slice(0, limit) : products;

  return (
    <div>
      <div className="container mx-auto px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-medium uppercase tracking-widest mt-20 text-gray-800 inline-block px-4 pb-2">
            <span className="text-gray-500">{title1}</span>
            <span className="px-1">{title2}</span>
            <div
              className="w-10 h-0.5 bg-gray-500"
              style={{ marginLeft: '400px', marginTop: '-14px' }}
            ></div>
          </h2>
          <p className="mt-4 text-sm text-gray-500 max-w-2xl mx-auto">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mx-7 px-4">
        {displayedCollections.map((i) => (
          <div key={i._id} className="group">
            <div className="relative overflow-hidden bg-gray-100 aspect-[4/5]">
              <NavLink to={`/product/${i._id}`}>
                <img
                  src={i.image}
                  alt={i.name}
                  className="w-full h-full object-cover"
                />
              </NavLink>
            </div>
            <div className="pt-3 text-left">
              <p className="text-sm font-medium text-gray-700 truncate hover:text-gray-900">
                {i.name}
              </p>
              <p className="text-sm font-semibold text-gray-900" style={{ marginRight: '400px' }}>
                ${i.price || 149}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;
