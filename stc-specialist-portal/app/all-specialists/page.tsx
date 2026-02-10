"use client";

import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Navbar from "../components/Navbar";
import SpecialistCard from "../components/SpecialistCard";

export default function Page() {
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await fetch("/api/backend/specialists/all");
        const result = await response.json();
        if (result.success) {
          setSpecialists(result.data);
        }
      } catch (error) {
        console.error("Failed to fetch specialists:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecialists();
  }, []);

  const headingFont = { fontFamily: "'Red Hat Display', sans-serif" };

  return (
    <div className="min-h-screen bg-[#FBFBFC]">
      <style jsx global>{`
        @import url(https://db.onlinewebfonts.com/c/c5e417a15ef065265661bf7601f7601f7601f?family=Proxima+Nova+Medium+Regular);
        @import url(https://db.onlinewebfonts.com/c/433a513cac0c0ddffe0edc4de3b1c1fc?family=Red+Hat+Display);
      `}</style>

      <Navbar />

      <main className="max-w-360 mx-auto px-6 xl:px-20 py-12">
        <div className="flex items-center gap-3 text-sm mb-10 text-gray-400">
          <FaHome className="text-[#002F70] text-lg" />
          <span>/</span>
          <span className="text-gray-500">Specialists</span>
          <span>/</span>
          <span className="text-gray-500">Register a New Company</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl lg:text-5xl font-black mb-3 tracking-tight" style={headingFont}>
              Register a New Company
            </h1>
            <p className="text-gray-500 text-lg">Get Your Company Registered with a Trusted Specialists</p>
          </div>
          
          <div className="flex gap-3">
            {["Price", "Sort by"].map((f) => (
              <button key={f} className="flex items-center gap-4 bg-white border border-gray-200 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm hover:border-[#002F70] transition-all">
                {f} <MdKeyboardArrowDown className="text-xl text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading specialists...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {specialists.map((item: any) => (
              <SpecialistCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}