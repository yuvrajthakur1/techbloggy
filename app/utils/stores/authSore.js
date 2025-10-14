// "use client";
// import { create } from "zustand";

// // Zustand store for authentication
// const useAuthStore = create((set) => ({
//   user: null,
//   token: null,
//   isReady: false, // 👈 new flag

//   // ✅ Save user and token after login
//   login: (userData, token) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(userData));
//     set({ user: userData, token });
//   },

//   // ✅ Restore data when app loads
//     restoreAuth: () => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");
//     if (token && user) {
//       set({ token, user: JSON.parse(user), isReady: true });
//     } else {
//       set({ isReady: true }); // mark as checked even if nothing found
//     }
//   },


//   // ✅ Logout and clear everything
//   logout: () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     set({ user: null, token: null });
//   },
// }));

// export default useAuthStore;


"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      // ✅ Save user and token after login
      login: (userData, token) => {
        set({ user: userData, token });
      },

      // ✅ Logout and clear everything
      logout: () => {
        set({ user: null, token: null });
      },
    }),
    {
      name: "auth-storage", // key in localStorage
      getStorage: () => localStorage, // by default bhi localStorage hota hai
    }
  )
);

export default useAuthStore;
