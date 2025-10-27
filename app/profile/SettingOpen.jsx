import React from "react";
import { X } from "lucide-react"; // for close icon

const SettingOpen = ({ settingOpen, setSettingOpen }) => {
  if (!settingOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#19183B]  dark:bg-gray-900 rounded-2xl shadow-lg w-11/12 max-w-sm p-6 text-gray-800 dark:text-gray-100 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={() => setSettingOpen(false)}
          className="absolute top-3 right-3 text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <h2 className="text-xl font-semibold mb-4  text-white text-center">Settings</h2>

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
        </ul>
      </div>
    </div>
  );
};

export default SettingOpen;
