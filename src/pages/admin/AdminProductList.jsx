import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProductStore from "../../zustand/productStore";

const AdminProductList = () => {
  const { products, fetchProducts, deleteProduct, isLoading, error, success } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Products</h2>

      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id} className="text-center">
              <td className="p-2 border">
                <img src={prod.images} alt={prod.name} className="h-12 mx-auto" />
              </td>
              <td className="p-2 border">{prod.name}</td>
              <td className="p-2 border">₹{prod.price}</td>
              <td className="p-2 border">{prod.stock}</td>
              <td className="p-2 border">
                <button
                  onClick={() => navigate(`/admin/edit-product/${prod._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(prod._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;
