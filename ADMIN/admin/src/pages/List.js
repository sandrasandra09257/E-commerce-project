import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const backend_url = process.env.REACT_APP_BACKEND_URL;
const List = ({ token }) => {
  const [list, setList] = useState([]);

  const listProduct = async () => {
    try {
      const response = await axios.get(backend_url + "/product/list");
      if (response.data.success) {
        toast.success(response.data.message);
        setList(response.data.getAllProducts.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("server error");
    }
  };

  const removeProducts = async (id) => {
    try {
      const response = await axios.delete(`${backend_url}/product/remove/${id}`, {
        headers: { token },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        await listProduct();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("server error");
    }
  };

  useEffect(() => {
    listProduct();
  }, []);

  return (
    <div className="ml-8 mt-8">
      <h1 className="font-bold text-gray-700 text-xl mb-4">All Product List</h1>
      <table className="min-w-full bg-white border border-gray-400 ">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b bg-gray-50">Image</th>
            <th className="py-2 px-4 border-b  bg-gray-50">Name</th>
            <th className="py-2 px-4 border-b  bg-gray-50">Category</th>
            <th className="py-2 px-4 border-b  bg-gray-50">Price</th>
         
            <th className="py-2 px-4 border-b  bg-gray-50">Action</th>
          </tr>
        </thead>
        <tbody>
          {list.map((item) => (
            <tr key={item._id} className="text-center">
              <td className="py-2 px-4 border-b">
                <img className="w-10 h-10 mx-auto" src={item.image[0]} alt={item.name} />
              </td>
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.category}</td>
              <td className="py-2 px-4 border-b">{item.price}</td>
              
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => removeProducts(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  x
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;