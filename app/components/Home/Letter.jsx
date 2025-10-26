// "use client";
// import { useState } from "react";

// export default function Newsletter() {
//   const [email, setEmail] = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     if (email.trim() === "") return;
//     setSuccess(true);
//     setEmail("");
//     setTimeout(() => setSuccess(false), 3000);
//   };

//   return (
//     <section className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#E7F2EF] overflow-hidden">
//       {/* Soft gradient background shapes */}
//       <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#A1C2BD]/30 rounded-full blur-3xl"></div>
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#708993]/20 rounded-full blur-2xl"></div>
//       <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-[#A1C2BD]/10 rotate-45 rounded-2xl blur-xl -translate-x-1/2 -translate-y-1/2"></div>

//       <div className="max-w-4xl mx-auto relative z-10 text-center">
//         {/* Heading */}
//         <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#19183B] mb-8 leading-tight">
//           Stay Updated
//         </h2>

//         <p className="text-[#708993] text-lg sm:text-xl md:text-2xl mb-16 leading-relaxed max-w-2xl mx-auto">
//           Subscribe to our newsletter and never miss out on new tutorials,
//           developer tips, and updates from our team.
//         </p>

//         {/* Input + Button */}
//         <form
//           onSubmit={handleSubscribe}
//           className="flex flex-col sm:flex-row justify-center items-center gap-5 w-full px-2"
//         >
//           <input
//             type="email"
//             placeholder="Enter your email address"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full sm:w-2/3 lg:w-1/2 px-8 py-5 rounded-3xl border border-[#708993]/40 focus:ring-2 focus:ring-[#A1C2BD] focus:border-[#A1C2BD] outline-none text-[#19183B] text-lg shadow-sm transition-all duration-200"
//           />
//           <button
//             type="submit"
//             className="w-full sm:w-auto px-10 py-5 rounded-3xl bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] text-[#E7F2EF] font-semibold text-lg shadow-md hover:opacity-90 hover:scale-[1.03] transition-all duration-200"
//           >
//             Subscribe
//           </button>
//         </form>

//         {/* Success Message */}
//         {success && (
//           <p className="mt-8 text-green-600 font-semibold text-lg animate-fadeIn">
//             🎉 Successfully Subscribed!
//           </p>
//         )}
//       </div>
//     </section>
//   );
// }

"use client";
import { useState } from "react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() === "") return;
    setSuccess(true);
    setEmail("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section className="relative py-28 px-6 sm:px-12 lg:px-20 bg-[#E7F2EF] overflow-hidden">
      {/* Decorative visible elements */}
      <div className="absolute -top-10 -left-10 w-20 h-20 bg-[#A1C2BD]/50 rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-28 h-28 bg-[#708993]/40 rounded-full "></div>
      <div className="absolute top-11 left-1/2 w-16 h-16 bg-[#19183B]/30 rotate-12 rounded-lg -translate-x-1/2 -translate-y-1/2 "></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Heading */}
         <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#19183B] inline-block relative pb-3">
            Stay Updated 
            <span className="absolute left-1/2 bottom-0 w-48 h-[4px] bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] rounded-full transform -translate-x-1/2"></span>
          </h2>
        
        </div>


        <p className="text-[#708993] text-lg sm:text-xl md:text-2xl mb-16 leading-relaxed max-w-2xl mx-auto">
          Subscribe to our newsletter and never miss out on new tutorials,
          developer tips, and updates from our team.
        </p>

        {/* Input + Button */}
        <form
          onSubmit={handleSubscribe}
          className="flex flex-col sm:flex-row justify-center items-center gap-5 w-full px-2"
        >
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-2/3 lg:w-1/2 px-8 py-5 rounded-3xl border border-[#708993]/40 focus:ring-2 focus:ring-[#A1C2BD] focus:border-[#A1C2BD] outline-none text-[#19183B] text-lg shadow-sm transition-all duration-200"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-5 rounded-3xl bg-gradient-to-r from-[#19183B] via-[#708993] to-[#A1C2BD] text-[#E7F2EF] font-semibold text-lg shadow-md hover:opacity-90 hover:scale-[1.03] transition-all duration-200"
          >
            Subscribe
          </button>
        </form>

        {/* Success Message */}
        {success && (
          <p className="mt-8 text-green-600 font-semibold text-lg animate-fadeIn">
            🎉 Successfully Subscribed!
          </p>
        )}
      </div>
    </section>
  );
}
