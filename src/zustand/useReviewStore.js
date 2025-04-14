import { create } from "zustand";
import { axiosInstance } from "../config/axiosInstance";

const useReviewStore = create((set, get) => ({
  reviews: [],
  loading: false,
  error: null,
  successMessage: null,

  fetchReviews: async (productId) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get(`/review/${productId}`);
      set({ reviews: response.data.reviews, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch reviews",
        loading: false,
      });
    }
  },

  addReview: async ({ productId, rating, comment }) => {
    set({ loading: true, error: null, successMessage: null });
    try {
      const response = await axiosInstance.post(
        `/review`,
        { productId, rating, comment }
      );

      // Refresh all reviews after adding new one
      await get().fetchReviews(productId);

      set({
        successMessage: response.data.message,
        loading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to add review",
        loading: false,
      });
    }
  },

  clearMessages: () => set({ error: null, successMessage: null }),
}));

export default useReviewStore;
