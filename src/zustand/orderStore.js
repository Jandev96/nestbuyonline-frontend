// zustand/orderStore.js
import { create } from "zustand";
import { axiosInstance } from "../config/axiosInstance";
import { toast } from "react-hot-toast";

export const useOrderStore = create((set) => ({
  order: null,
  loading: false,
  error: null,

  createOrder: async ({ shippingAddress }) => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.post("/order/", { shippingAddress });

      const createdOrder = res.data?.order;
      if (!createdOrder) throw new Error("No order returned from server");

      toast.success("Order placed successfully!");
      set({ order: createdOrder, loading: false });

      return createdOrder;
    } catch (error) {
      toast.error(error.response?.data?.message || "Order creation failed.");
      set({ error: error.message, loading: false });
      return null;
    }
  },

 getOrderById: async (id) => {
  set({ loading: true, error: null });
  try {
    const res = await axiosInstance.get(`/order/${id}`);
    console.log("response for order",res)
    set({ order: res.data, loading: false });
  } catch (error) {
    set({
      error: error.response?.data?.message || "Failed to fetch order",
      loading: false,
    });
  }
}




}));
