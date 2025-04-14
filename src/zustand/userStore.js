import { create } from "zustand";
import { axiosInstance } from "../config/axiosInstance";

export const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchAllUsers: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/user", {
        withCredentials: true,
      });
      set({ users: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load users",
        loading: false,
      });
    }
  },



  fetchRecentUsers: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/user/recent", {
        withCredentials: true,
      });
      set({ users: res.data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to load users",
        loading: false,
      });
    }
  },
}));
