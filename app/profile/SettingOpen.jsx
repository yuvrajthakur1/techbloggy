import React from "react";
import { X } from "lucide-react"; // for close icon
import useAuthStore from "../utils/stores/authSore";
import api from "../axios/axios";
import Swal from "sweetalert2";

const SettingOpen = ({ settingOpen, setSettingOpen }) => {
  const { user, token } = useAuthStore();

  if (!settingOpen) return null;

  // 🧨 Delete Account Handler
  const handleDeleteAccount = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Your account and all associated data will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
        background: "#1e1e2f", // popup dark theme match
        color: "#fff",
        customClass: {
          popup: "z-[11000]", // ensures popup is above modal
        },
      });

      if (result.isConfirmed) {
        const res = await api.delete(`/users/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          await Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Your account has been deleted successfully.",
            timer: 2000,
            showConfirmButton: false,
            background: "#1e1e2f",
            color: "#fff",
          });

          // 🔐 Logout & redirect
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while deleting your account.",
        background: "#1e1e2f",
        color: "#fff",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#19183B]  dark:bg-gray-900 rounded-2xl shadow-lg w-11/12 max-w-sm p-6 text-gray-800 dark:text-gray-100 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setSettingOpen(false)}
          className="absolute top-3 right-3 text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold mb-4  text-white text-center">
          Settings
        </h2>

        {/* Settings List */}
        <ul className="space-y-3  text-white">
          <li className="hover:bg-gray-100 hover:text-[#19183B] rounded-lg px-3 py-2 cursor-pointer">
            Profile
          </li>

          <li className="hover:bg-gray-100 hover:text-[#19183B] rounded-lg px-3 py-2 cursor-pointer">
            Account
          </li>
          <li className="hover:bg-gray-100 hover:text-[#19183B] rounded-lg px-3 py-2 cursor-pointer">
            Notifications
          </li>
          <li className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2 cursor-pointer text-red-500">
            Logout
          </li>

          <li className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg px-3 py-2 cursor-pointer text-red-500">
            <button onClick={handleDeleteAccount}>Deactivate</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SettingOpen;
