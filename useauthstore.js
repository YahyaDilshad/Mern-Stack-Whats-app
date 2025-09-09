// src/store/useauthstore.js

// Zustand se store create karne ke liye import
import { create } from "zustand";

// Axios instance (jo backend se connect hai) import
import axiosinstace from  "../lib/axios";

// UI notifications ke liye toast
import toast from "react-hot-toast";
import { LogIn as LoginIcon } from "lucide-react";

// Zustand ka store create kiya gaya
const useAuthStore = create((set) => ({
  
  // ----- STATES -----
  authuser: null,          // Current logged-in user ka data store hoga
  isCheckingAuth: true,    // Check kar rahe hain ke user authenticated hai ya nahi
  isAuthenticated: false,  // True hoga agar user login/signup hua hai
  isloggedin: false,       // Agar user ne login kiya hua hai to ye true hoga
  isupdatingprofile: false,       // Profile update process ke liye loader flag
  issignup: false,         // Signup process ke liye loader flag
  
  // ----- ACTIONS / FUNCTIONS -----
  
  // 1. Check authentication -> backend se /auth/check ko call karega
  checkauth: async () => {
    try {
      const response  = await axiosinstace.get("/auth/check");
      
      // Agar backend se user mila to state update karo
      set({ 
        authuser: response.data.user,   // backend se aaya hua user
        isAuthenticated: true, 
        isCheckingAuth: false 
      });

    } catch (error) {  
      // Agar error aaya to matlab user authenticated nahi hai
      set({ 
        authuser: null, 
        isAuthenticated: false, 
        isCheckingAuth: false 
      });
    }
  },

  // 2. Signup function -> user form data backend ko bhejta hai
  signup: async (formdata) => {
    // Loader true kar diya
    set({ isSignup: true });
    
    try {
      // Backend ke /auth/signup route ko call karo
      const response = await axiosinstace.post("/auth/signup", formdata);
      
      // Agar signup success hua to user ka data state me save karo
      set({ authuser: response.data.user });

      // UI notification dikhana
      toast.success("Account created successfully");
      
    } catch (error) {
      // Agar signup me error aaya to UI pe error show karo
      toast.error(error.response?.data?.message || error.message || "Signup failed");

      
    } finally {
      // Loader false kar diya
      set({ isSignup: false });
    }
  },
login: async (formdata) => {
  try {
    const response = await axiosinstace.post('/auth/login', formdata);
    set({
      authuser: response.data.user,
      isAuthenticated: true,
      isloggedin: true
    });
    toast.success("Logged in successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Login failed");
  }
},

logout: async () => {
  try {
    await axiosinstace.post("/auth/logout");
    set({ authuser: null, isAuthenticated: false, isloggedin: false });
    toast.success("Logged out successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || error.message || "Logout failed");
  }
},

// updateprofile: async (formdata) => {
//   try {
//     set({ isupdatingprofile: true });
//     const response = await axiosinstace.put('/auth/update_profile', formdata);
//     set({ authuser: response.data });
//     toast.success("Profile updated");
//   } catch (error) {
//     toast.error(error.response?.data?.message || error.message || "Profile update failed");
//   } finally {
//     set({ isupdatingprofile: false });
//   }
// }
}));

export default useAuthStore;
