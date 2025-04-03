import { create } from "zustand";
import { axiosInstance } from "../config/axiosInstance";

const useAdminStore = create((set) => ({
  admin: null,
  isLoading: false,
  error: null,

  // Check if admin is authenticated
  checkAdminAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/admin/checkadmin", { withCredentials: true });
      set({ admin: response.data, isLoading: false });
    } catch (error) {
      set({ admin: null, isLoading: false, error: error.response?.data?.message || "Failed to verify admin" });
    }
  },

  // Admin login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/admin/login", { email, password }, { withCredentials: true });
      set({ admin: response.data, isLoading: false });
    } catch (error) {
      set({ admin: null, isLoading: false, error: error.response?.data?.message || "Login failed" });
    }
  },

  // Admin logout
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.get("/admin/logout", { withCredentials: true });
      set({ admin: null, isLoading: false });
    } catch (error) {
      set({ isLoading: false, error: error.response?.data?.message || "Logout failed" });
    }
  },
}));

export default useAdminStore;
