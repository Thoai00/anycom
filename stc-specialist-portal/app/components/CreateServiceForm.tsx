"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HiArrowLeft } from "react-icons/hi";
import { FiCamera, FiCheck } from "react-icons/fi";
import { IoMdInformationCircle } from "react-icons/io";
import EditServiceSidebar from "./EditServiceSidebar";

interface CreateServiceFormProps {
  onBack: () => void;
}

export default function CreateServiceForm({ onBack }: CreateServiceFormProps) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [localDraft, setLocalDraft] = useState<any>(null);

  const handlePublishToDatabase = async () => {
  if (!localDraft) {
    alert("Please confirm your changes in the Edit sidebar first.");
    return;
  }

  setLoading(true);
  const data = new FormData();
    if (localDraft.id) data.append("id", localDraft.id);
    data.append("title", localDraft.title);
    data.append("description", localDraft.description);
    data.append("base_price", localDraft.price);
    data.append("duration_days", localDraft.duration.toString());
    data.append("offeringIds", JSON.stringify(localDraft.selectedOfferings));

    if (localDraft.bannerImage) data.append("images", localDraft.bannerImage);
    if (localDraft.galleryImage1) data.append("images", localDraft.galleryImage1);
    if (localDraft.galleryImage2) data.append("images", localDraft.galleryImage2);

    try {
    const response = await fetch("/api/backend/specialists/upsert", {
      method: "POST",
      body: data,
    });
    
    const result = await response.json();
    
    if (result.success) {
      setIsPublishModalOpen(false);
      router.push("/all-specialists"); 
    }
  } catch (e) {
    alert("Failed to upload");
  } finally {
    setLoading(false);
  }
};

  const getImgUrl = (file: File | null) => (file ? URL.createObjectURL(file) : null);

  return (
    <div className="relative min-h-screen bg-white">
      <div className="max-w-300 mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-500 bg-white">
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-800"
            >
              <HiArrowLeft size={28} />
            </button>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              {localDraft?.title || "Register a new company | Private Limited - Sdn Bhd"}
            </h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="px-10 py-2 bg-[#0F172A] text-white text-[11px] font-bold rounded-md uppercase tracking-wider hover:bg-slate-800 transition-colors"
            >
              Edit
            </button>
            <button 
              onClick={() => setIsPublishModalOpen(true)}
              className="px-10 py-2 bg-[#002F70] text-white text-[11px] font-bold rounded-md uppercase tracking-wider hover:bg-[#002354] transition-colors"
            >
              Publish
            </button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-12">
          <div className="col-span-8 space-y-16">
            <div className="grid grid-cols-2 gap-4 h-95">
              <div className="h-full bg-[#F8F9FA] border border-gray-100 rounded-xl flex flex-col items-center justify-center text-gray-400 p-8 text-center relative overflow-hidden">
                {localDraft?.bannerImage ? (
                  <img src={getImgUrl(localDraft.bannerImage)!} className="absolute inset-0 w-full h-full object-cover" alt="Banner" />
                ) : (
                  <>
                    <div className="mb-4 opacity-40">
                      <FiCamera size={48} />
                    </div>
                    <p className="text-[11px] leading-relaxed max-w-50 font-medium">
                      Upload an image for your service listing in PNG, JPG or JPEG up to 4MB
                    </p>
                  </>
                )}
              </div>
              <div className="grid grid-rows-2 gap-4 h-full">
                <div className="rounded-xl overflow-hidden relative border border-gray-100 bg-[#F8F9FA]">
                  {localDraft?.galleryImage1 ? (
                    <img src={getImgUrl(localDraft.galleryImage1)!} className="w-full h-full object-cover" />
                  ) : (
                    <Image src="/image 4.png" alt="Sample 1" fill className="object-cover" />
                  )}
                </div>
                <div className="rounded-xl overflow-hidden relative border border-gray-100 bg-[#F8F9FA]">
                  {localDraft?.galleryImage2 ? (
                    <img src={getImgUrl(localDraft.galleryImage2)!} className="w-full h-full object-cover" />
                  ) : (
                    <Image src="/image 3.png" alt="Sample 2" fill className="object-cover" />
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <section className="border-b border-gray-100 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Description</h3>
                <p className={`text-sm font-medium ${localDraft?.description ? "text-gray-700" : "text-gray-400 italic"}`}>
                  {localDraft?.description || "Describe your service here"}
                </p>
              </section>
              <section className="border-b border-gray-100 pb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Additional Offerings</h3>
                <p className="text-sm text-gray-400 font-medium italic">
                  {localDraft?.selectedOfferings?.length > 0 
                    ? `${localDraft.selectedOfferings.length} offerings selected` 
                    : "Enhance your service by adding additional offerings"}
                </p>
              </section>
            </div>

            <div className="pt-2">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 tracking-tight">Company Secretary</h3>
              <div className="flex items-start gap-16">
                <div className="flex-1 max-w-md">
                  <div className="flex items-center gap-5 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden relative border-4 border-blue-50 shadow-sm">
                      <Image src="/Profile Picture.png" alt="Grace Lam" fill className="object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-gray-900 leading-none">Grace Lam</h4>
                        <div className="bg-[#22C55E] text-white rounded-full p-0.5"><FiCheck size={10} strokeWidth={4} /></div>
                        <span className="text-[10px] font-bold text-gray-300 uppercase tracking-tighter">Verified</span>
                      </div>
                      <p className="text-sm font-bold text-gray-500 mt-1">Corpsec Services Sdn Bhd</p>
                      <button className="mt-3 bg-[#001533] text-white text-[10px] font-bold px-6 py-2 rounded-md hover:bg-black transition-all">
                        View Profile
                      </button>
                    </div>
                  </div>
                  <p className="text-[13px] leading-[1.8] text-gray-600 font-medium italic">
                    A company secretarial service founded by Aida, who believes that every company deserves clarity, confidence, and care in their compliance journey...
                  </p>
                </div>

                <div className="flex-1">
                  <h4 className="text-md font-bold text-gray-800 mb-6">Certified Company Secretary</h4>
                  <div className="flex items-center gap-8 opacity-90">
                    <div className="relative w-16 h-8">
                      <Image src="/SSM.png" alt="SSM Logo" fill className="object-contain" />
                    </div>
                    <div className="relative w-20 h-10">
                      <Image src="/Maicsa.png" alt="Maicsa Logo" fill className="object-contain" />
                    </div>
                    <div className="relative w-14 h-10">
                      <Image src="/image 6.png" alt="Certification" fill className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-10 shadow-[0_15px_50px_-10px_rgba(0,0,0,0.08)] sticky top-10">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-1">Professional Fee</h3>
              <p className="text-[10px] text-gray-400 mb-12 font-bold uppercase tracking-widest">Set a rate for your service</p>
              
              <div className="mb-14 text-center border-b-2 border-gray-900 pb-3">
                <span className="text-2xl font-normal text-gray-900">RM {localDraft?.price || "1,800"}</span>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-500">Base price</span>
                  <div className="grid grid-cols-[30px_1fr] w-24 text-right font-normal text-gray-900">
                    <span className="text-left">RM</span>
                    <span>{localDraft?.price || "1,800"}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-500 underline underline-offset-8 decoration-gray-200">Service processing fee</span>
                  <div className="grid grid-cols-[30px_1fr] w-24 text-right font-normal text-gray-900">
                    <span className="text-left">RM</span>
                    <span>{(parseFloat(localDraft?.price || "1800") * 0.3).toFixed(0)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-gray-400 text-sm">Total</span>
                  <div className="grid grid-cols-[30px_1fr] w-24 text-right text-lg font-normal text-gray-900">
                    <span className="text-left">RM</span>
                    <span>{(parseFloat(localDraft?.price || "1800") * 1.3).toFixed(0)}</span>
                  </div>
                </div>
                
                <div className="pt-10 mt-6 border-t border-gray-100 flex justify-between items-baseline">
                  <span className="text-gray-500 font-bold text-sm">Your returns</span>
                  <div className="grid grid-cols-[30px_1fr] w-24 text-right font-normal text-gray-900">
                    <span className="text-left">RM</span>
                    <span>{localDraft?.price || "1,800"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
            onClick={() => !loading && setIsPublishModalOpen(false)}
          />
          <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md p-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-start gap-4 mb-6">
              <div className="text-[#002F70] mt-1">
                <IoMdInformationCircle size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Publish changes</h2>
                <p className="text-gray-500 text-[13px] leading-relaxed">
                  Do you want to publish these changes? It will appear in the marketplace listing
                </p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setIsPublishModalOpen(false)}
                disabled={loading}
                className="px-6 py-2.5 border border-gray-200 text-gray-700 text-xs font-bold rounded-md hover:bg-gray-50 transition-colors"
              >
                Continue Editing
              </button>
              <button 
                onClick={handlePublishToDatabase}
                disabled={loading}
                className="px-8 py-2.5 bg-[#002F70] text-white text-xs font-bold rounded-md hover:bg-[#002354] transition-colors disabled:bg-slate-400"
              >
                {loading ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
      <EditServiceSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onSaveDraft={setLocalDraft}
        initialData={localDraft}
      />
    </div>
  );
}