import { create } from "zustand";
import { axiosInstance } from "../config/axiosInstance";


const useProductStore = create((set) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get("product/products");
      set({ products: response.data.data, isLoading: false });
        console.log("response=====zustand====",response)

    } catch (error) {
      set({ error: "Failed to fetch products", isLoading: false });
    }
  },
}));

export default useProductStore;
