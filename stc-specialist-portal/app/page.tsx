"use client";

import { useState, useRef, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Image from "next/image";
import CreateServiceForm from "./components/CreateServiceForm"; 
import EditServiceSidebar from "./components/EditServiceSidebar";
import { HiOutlineDotsVertical, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { FiPlus, FiDownload, FiMail, FiBell, FiEdit3, FiTrash2 } from "react-icons/fi";

export default function AllSpecialistsPage() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 6;
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/backend/specialists/all");
      const result = await response.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (error) {
      console.error("Database fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = data.filter((item) => {
    const matchesTab = 
      activeTab === "All" || 
      (activeTab === "Drafts" && item.is_draft === true) || 
      (activeTab === "Published" && item.is_draft === false);
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    if (selectedIds.length === paginatedData.length) setSelectedIds([]);
    else setSelectedIds(paginatedData.map(item => item.id));
  };

  const handleEditClick = (service: any) => {
    setSelectedService(service);
    setOpenMenuId(null);
    setIsEditing(true);
  };

  return (
    <div className="flex min-h-screen bg-[#FBFBFC]">
      <EditServiceSidebar 
        isOpen={isEditing}
        initialData={selectedService}
        onClose={() => { setIsEditing(false); fetchServices(); } } onSaveDraft={function (data: any): void {
          throw new Error("Function not implemented.");
        } }      />
      
      {!isEditing && <Sidebar />}
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 flex items-center justify-end px-10 gap-5 text-gray-400 border-b border-gray-50 bg-white">
          <FiMail className="cursor-pointer hover:text-black" size={18} />
          <div className="relative">
            <FiBell className="cursor-pointer hover:text-black" size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </div>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 ml-2 border border-gray-100 relative">
            <Image src="/image 80.png" alt="User" fill className="object-cover" />
          </div>
        </header>

        <main className="px-10 py-4 grow overflow-y-auto">
          <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Dashboard</div>
          <h1 className="text-2xl font-bold mb-8 text-gray-800">Services</h1>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 min-h-175">
            
            {!isCreating && !isEditing ? (
              <>
                <h2 className="text-xl font-bold text-gray-900">Specialists</h2>
                <p className="text-xs text-gray-400 mt-1 mb-8">Create and publish your services for Client’s & Companies</p>

                <div className="flex gap-10 border-b border-gray-100 mb-8">
                  {["All", "Drafts", "Published"].map((tab) => (
                    <button 
                      key={tab} 
                      onClick={() => { setActiveTab(tab); setCurrentPage(1); setSelectedIds([]); }}
                      className={`pb-4 text-sm font-semibold transition-all ${activeTab === tab ? "text-[#002F70] border-b-2 border-[#002F70]" : "text-gray-400 hover:text-gray-600"}`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between items-center mb-8">
                  <input 
                    type="text" 
                    placeholder="Search Services" 
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="bg-gray-50 border border-gray-100 rounded-md px-4 py-2 text-sm w-72 outline-none focus:bg-white focus:border-[#002F70] transition-all" 
                  />
                  
                  <div className="flex gap-3">
                    <button onClick={() => setIsCreating(true)} className="flex items-center gap-2 bg-[#002F70] text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-[#002354]">
                      <FiPlus /> Create
                    </button>
                    <button className="flex items-center gap-2 border border-[#002F70] text-[#002F70] px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-50">
                      <FiDownload /> Export
                    </button>
                  </div>
                </div>

                <div className="overflow-visible min-h-120">
                  {loading ? (
                    <div className="flex justify-center items-center h-40 text-gray-400">Loading live data...</div>
                  ) : filteredData.length === 0 ? (
                    <div className="flex justify-center items-center h-40 text-gray-400 italic">No services found matching your search.</div>
                  ) : (
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] uppercase text-gray-400 border-b border-gray-100">
                          <th className="pb-4 px-2">
                            <input type="checkbox" className="rounded border-gray-300 text-[#002F70]" checked={paginatedData.length > 0 && selectedIds.length === paginatedData.length} onChange={toggleAll} />
                          </th>
                          <th className="pb-4 px-4">Service</th>
                          <th className="pb-4 px-4">Price</th>
                          <th className="pb-4 px-4 text-center">Purchases</th>
                          <th className="pb-4 px-4">Duration</th>
                          <th className="pb-4 px-4 text-center">Approval Status</th>
                          <th className="pb-4 px-4 text-center">Publish Status</th>
                          <th className="pb-4 px-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {paginatedData.map((row) => (
                          <tr key={row.id} className={`text-sm transition-colors ${selectedIds.includes(row.id) ? "bg-blue-50/50" : "hover:bg-gray-50/30"}`}>
                            <td className="py-5 px-2">
                              <input type="checkbox" className="rounded border-gray-300 text-[#002F70]" checked={selectedIds.includes(row.id)} onChange={() => toggleSelect(row.id)} />
                            </td>
                            <td className="py-5 px-4 font-medium text-gray-800">{row.title}</td>
                            <td className="py-5 px-4 font-bold text-gray-900">RM {parseFloat(row.final_price).toLocaleString()}</td>
                            <td className="py-5 px-4 text-center">{row.total_number_of_ratings || 0}</td>
                            <td className="py-5 px-4 font-medium">{row.duration_days} Days</td>
                            <td className="py-5 px-4 text-center">
                              <span className={`inline-block w-27.5 py-1.5 rounded-md text-[10px] font-bold ${row.verification_status === "approved" ? "bg-green-100 text-green-500" : row.verification_status === "rejected" ? "bg-red-100 text-red-500" : "bg-cyan-100 text-cyan-400"}`}>
                                {row.verification_status?.toUpperCase() || "PENDING"}
                              </span>
                            </td>
                            <td className="py-5 px-4 text-center">
                              <span className={`inline-block w-27.5 py-1.5 rounded-md text-[10px] font-bold ${!row.is_draft ? "bg-green-400 text-white" : "bg-red-600 text-white"}`}>
                                {!row.is_draft ? "PUBLISHED" : "DRAFT"}
                              </span>
                            </td>
                            <td className="py-5 px-4 text-right relative">
                              <button 
                                onClick={() => setOpenMenuId(openMenuId === row.id ? null : row.id)} 
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                              >
                                <HiOutlineDotsVertical className="text-gray-400" />
                              </button>

                              {openMenuId === row.id && (
                                <div 
                                  ref={menuRef}
                                  className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border border-gray-100 z-50 py-1"
                                >
                                  <button 
                                    onClick={() => handleEditClick(row)}
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                  >
                                    <FiEdit3 className="text-gray-400" /> Edit
                                  </button>
                                  <hr className="border-gray-50" />
                                  <button 
                                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors"
                                  >
                                    <FiTrash2 /> Delete
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
                <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-center">
                  <div className="flex items-center gap-8">
                    <button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)} className={`flex items-center gap-2 text-sm font-bold ${currentPage === 1 ? "text-gray-300" : "text-gray-900"}`}>
                      <HiChevronLeft size={20} />Previous
                    </button>
                    <div className="flex items-center gap-4">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                        <button key={num} onClick={() => setCurrentPage(num)} className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${currentPage === num ? "bg-[#002F70] text-white" : "text-gray-600"}`}>
                          {num}
                        </button>
                      ))}
                    </div>
                    <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)} className={`flex items-center gap-2 text-sm font-bold ${currentPage === totalPages ? "text-gray-300" : "text-gray-900"}`}>
                      Next<HiChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </>
            ) : isCreating ? (
              <CreateServiceForm onBack={() => { setIsCreating(false); fetchServices(); }} />
            ) : (
              <CreateServiceForm onBack={() => { setIsEditing(false); fetchServices(); }} />
            )}

          </div>
        </main>
      </div>
    </div>
  );
}