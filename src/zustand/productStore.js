import { create } from "zustand";
import { axiosInstance } from "../config/axiosInstance";

const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,
  success: null,

  // Fetch all products
  fetchProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("product/products", {
        withCredentials: true,
      });
      set({ products: response.data.data, isLoading: false });
      console.log("Fetched products from Zustand:", response.data.data);
    } catch (error) {
      set({ error: "Failed to fetch products", isLoading: false });
    }
  },

  // Add new product
  addProduct: async (productData) => {
    try {
      set({ isLoading: true, error: null, success: null });

      const formData = new FormData();
      formData.append("name", productData.name);
      formData.append("description", productData.description);
      formData.append("price", productData.price);
      formData.append("stock", productData.stock);
      formData.append("category", productData.category);
      formData.append("images", productData.file); // `file` should be File object

      const res = await axiosInstance.post("product/products", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresh product list after successful addition
      set((state) => ({
        products: [...state.products, res.data.data],
        success: "Product added successfully!",
        isLoading: false,
      }));
    } catch (err) {
      console.error("Error adding product:", err);
      set({
        error: err.response?.data?.message || "Failed to add product",
        isLoading: false,
      });
    }
  },
}));

export default useProductStore;
