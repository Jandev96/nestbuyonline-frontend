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

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get("/user/profile");
      set({ user: res.data.data, loading: false });
    } catch (err) {
      set({ error: "Failed to load profile", loading: false });
    }
  },

  updateProfile: async (updatedData) => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.put("/user/update", updatedData);
      set({ user: res.data.data, loading: false });
      return { success: true, message: res.data.message };
    } catch (err) {
      set({ error: err.response?.data?.message || "Update failed", loading: false });
      return { success: false, message: err.response?.data?.message || "Update failed" };
    }
  },



}));
