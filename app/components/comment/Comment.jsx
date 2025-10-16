import { X,Trash } from "lucide-react";
import React from "react";

const Comment = ({comments,user,blogAuthorId,handleDeleteComment}) => {
  return (
    <>
      {comments.map((c) => (
        <div
          key={c._id}
          className="flex items-start gap-3 p-2 bg-[#19183B] rounded-md border border-[#708993]/20 relative"
        >
          {/* Avatar */}
          <img
            src={c.user?.avatar?.url}
            alt={c.user?.name || "User"}
            className="w-8 h-8 rounded-full object-cover border border-[#708993]/30"
          />

          {/* Comment Content */}
          <div className="flex-1">
            <p className="text-[#A1C2BD] font-semibold text-sm">
              {c.user?.name}
            </p>
            <p className="text-[#E7F2EF] text-xs sm:text-sm break-words">
              {c.text}
            </p>
          </div>

          {/* Delete Button (only visible to blog author or comment owner) */}
          {user &&
            (String(user._id) === String(c.user?._id) ||
              String(user._id) === String(blogAuthorId)) && (
              <button
                onClick={() => handleDeleteComment(c._id)}
                className="text-red-500 hover:text-red-400 absolute right-2 top-2"
              >
                <Trash  size={14} />
              </button>
            )}
        </div>
      ))}
    </>
  );
};

export default Comment;
