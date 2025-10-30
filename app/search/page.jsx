

"use client";
import { useState, useCallback, useEffect } from "react";
import api from "../axios/axios";
import useDebounce from "../components/utils/Debounce";
import { Search, Loader2} from "lucide-react";
import Link from 'next/link'

export default function SearchUser() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debouncedValue = useDebounce(value, 500);

  const fetchUsers = useCallback(async () => {
    if (!debouncedValue.trim()) {
      setResults([]);
      return;
    }
    try {
      setLoading(true);
      const res = await api.get("/users/search", {
        params: { query: debouncedValue },
      });
      setResults(res.data || []);
    } catch (error) {
      console.error("❌ Search error:", error);
    } finally {
      setLoading(false);
    }
  }, [debouncedValue]);

  useEffect(() => {
    fetchUsers();
  }, [debouncedValue, fetchUsers]);

  return (
    <div className="min-h-screen bg-[#E7F2EF] flex flex-col items-center px-4 py-8">
      {/* 🧭 Search Box */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-3 text-[#708993]" size={20} />
        <input
          type="text"
          placeholder="Search user..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl border border-[#A1C2BD] focus:outline-none focus:ring-2 focus:ring-[#19183B] text-[#19183B] placeholder-[#708993] bg-white shadow-sm transition-all"
        />
        {loading && (
          <Loader2
            size={20}
            className="absolute right-3 top-3 animate-spin text-[#708993]"
          />
        )}
      </div>

      {/* 👥 Results */}
      <div className="w-full max-w-md mt-6 bg-white rounded-xl shadow-md overflow-hidden divide-y divide-[#E7F2EF]">
        {results.length > 0
          ? results.map((user) => (
              <Link key={user._id} href={`/publicprofile/${user._id}`}>
                <div
                  key={user._id}
                  className="flex items-center gap-4 p-3 hover:bg-[#F9FBFA] transition cursor-pointer"
                >
                  <img
                    src={user.avatar?.url || "/default-avatar.png"}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover border border-[#A1C2BD]"
                  />
                  <span className="font-medium text-[#19183B]">
                    {user.name}
                  </span>
                </div>
              </Link>
            ))
          : !loading &&
            value.trim() !== "" && (
              <p className="text-center text-[#708993] py-4">
                No users found 😔
              </p>
            )}
      </div>
    </div>
  );
}


