"use client";

import React, { useState, useRef, useEffect, RefObject } from "react";
import { IoMdClose, IoIosInformationCircleOutline } from "react-icons/io";
import { HiOutlineCloudUpload } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { 
  BsPersonAdd, BsBank, BsFiles, BsLightning, 
  BsGeoAlt, BsCalendarCheck, BsAward, BsTruck, BsHeadset 
} from "react-icons/bs";

interface EditServiceSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any; 
  onSaveDraft: (data: any) => void;
}

const OFFERINGS_DATA = [
  { id: '550e8400-e29b-41d4-a716-446655440000', title: 'Company Secretary Subscription', desc: 'Enjoy 1 month free Company Secretary Subscription', icon: <BsPersonAdd /> },
  { id: '550e8400-e29b-41d4-a716-446655440001', title: 'Opening of a Bank Account', desc: 'Complimentary Corporate Bank Account Opening', icon: <BsBank /> },
  { id: '550e8400-e29b-41d4-a716-446655440002', title: 'Access Company Records and SSM Forms', desc: '24/7 Secure Access to Statutory Company Records', icon: <BsFiles /> },
  { id: '550e8400-e29b-41d4-a716-446655440003', title: 'Priority Filling', desc: 'Documents are prioritized for submission and swift processing - within 24 hours', icon: <BsLightning /> },
  { id: '550e8400-e29b-41d4-a716-446655440004', title: 'Registered Office Address Use', desc: 'Use of SSM-Compliant Registered Office Address with Optional Mail Forwarding', icon: <BsGeoAlt /> },
  { id: '550e8400-e29b-41d4-a716-446655440005', title: 'Compliance Calendar Setup', desc: 'Get automated reminders for all statutory deadlines', icon: <BsCalendarCheck /> },
  { id: '550e8400-e29b-41d4-a716-446655440006', title: 'First Share Certificate Issued Free', desc: 'Receive your company\'s first official share certificate at no cost', icon: <BsAward /> },
  { id: '550e8400-e29b-41d4-a716-446655440007', title: 'CTC Delivery & Courier Handling', desc: 'Have your company documents and certified copies delivered securely to you', icon: <BsTruck /> },
  { id: '550e8400-e29b-41d4-a716-446655440008', title: 'Chat Support', desc: 'Always-On Chat Support for Compliance, Filing, and General Queries', icon: <BsHeadset /> },
];

export default function EditServiceSidebar({ isOpen, onClose, initialData, onSaveDraft }: EditServiceSidebarProps) {
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    id: null as string | null,
    title: "",
    description: "",
    price: "" as string,
    duration: "" as string | number
  });

  const [selectedOfferings, setSelectedOfferings] = useState<string[]>([]);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [galleryImage1, setGalleryImage1] = useState<File | null>(null);
  const [galleryImage2, setGalleryImage2] = useState<File | null>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const gallery1InputRef = useRef<HTMLInputElement>(null);
  const gallery2InputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        id: initialData.id || null,
        title: initialData.title || "",
        description: initialData.description || "",
        price: initialData.price || "",
        duration: initialData.duration || 1
      });
      setSelectedOfferings(initialData.selectedOfferings || []);
      setBannerImage(initialData.bannerImage || null);
      setGalleryImage1(initialData.galleryImage1 || null);
      setGalleryImage2(initialData.galleryImage2 || null);
    } else if (!isOpen) {
      setFormData({ id: null, title: "", description: "", price: "", duration: 1 });
      setSelectedOfferings([]);
      setBannerImage(null);
      setGalleryImage1(null);
      setGalleryImage2(null);
    }
  }, [initialData, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleConfirm = () => {
    onSaveDraft({
      ...formData,
      selectedOfferings,
      bannerImage,
      galleryImage1,
      galleryImage2
    });
    onClose();
  };

  const toggleOffering = (id: string) => {
    setSelectedOfferings(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderUploadSlot = (label: string, file: File | null, setFile: (f: File | null) => void, inputRef: RefObject<HTMLInputElement | null>) => (
    <div className="space-y-3">
      <label className="text-sm font-bold text-gray-800">{label}</label>
      <div className="flex items-center gap-1 text-gray-400 text-[11px]">
        <IoIosInformationCircleOutline size={14} />
        <span>Maximum of 1 Image</span>
      </div>
      {!file ? (
        <div onClick={() => inputRef.current?.click()} className="border-2 border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50/30 cursor-pointer hover:bg-gray-50 transition-colors">
          <input type="file" ref={inputRef} onChange={(e) => e.target.files && setFile(e.target.files[0])} className="hidden" accept="image/*" />
          <HiOutlineCloudUpload size={44} className="text-[#002F70] mb-2" />
          <button className="bg-[#002F70] text-white px-6 py-1.5 rounded-md text-xs font-bold mb-2">Browse</button>
          <p className="text-gray-400 text-[10px]">or Drag a file to upload</p>
        </div>
      ) : (
        <div className="border border-gray-200 rounded-lg p-4 flex items-center gap-4 bg-white shadow-sm ring-1 ring-gray-100">
          <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden">
            <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-700 truncate">{file.name}</p>
            <p className="text-[10px] text-gray-400 uppercase">{(file.size / (1024 * 1024)).toFixed(1)} MB</p>
          </div>
          <button onClick={() => setFile(null)} className="text-[#002F70] hover:text-red-500">
            <RiDeleteBin6Line size={20} />
          </button>
        </div>
      )}
    </div>
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={onClose} />
      )}

      <div className={`fixed top-0 right-0 h-full w-120 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">{formData.id ? "Edit Service" : "Add New Service"}</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <IoMdClose size={24} className="text-gray-600" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto h-[calc(100vh-140px)] space-y-7 pb-10">
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
            <input 
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-md text-sm outline-none"
              placeholder="Enter service title"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
            <textarea 
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-md text-sm resize-none outline-none"
              placeholder="Describe your service..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Estimated Completion Time (Days)</label>
            <input 
              type="number" 
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-md text-sm outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Price</label>
            <div className="flex border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-gray-50 px-3 flex items-center gap-2 border-r border-gray-200 py-3">
                <img src="https://flagcdn.com/w40/my.png" alt="MY Flag" className="w-5 h-auto" />
                <span className="text-xs font-bold text-gray-600">MYR</span>
              </div>
              <input 
                type="number" 
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                placeholder="0.00" 
                className="w-full p-3 focus:outline-none text-sm" 
              />
            </div>
          </div>

          <div className="space-y-2 relative" ref={dropdownRef}>
            <label className="text-xs font-bold text-gray-500 uppercase">Additional Offerings</label>
            <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="w-full p-2 border border-gray-200 rounded-md flex flex-wrap gap-2 items-center bg-white min-h-11.5 cursor-pointer">
              {selectedOfferings.length === 0 ? <span className="text-sm text-gray-400 ml-2">Select offerings...</span> : 
                selectedOfferings.map(id => (
                  <div key={id} className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                    <span className="text-[11px] text-gray-600 font-medium">{OFFERINGS_DATA.find(o => o.id === id)?.title}</span>
                    <button onClick={(e) => { e.stopPropagation(); toggleOffering(id); }} className="text-gray-400"><IoMdClose size={14} /></button>
                  </div>
                ))
              }
              <div className="ml-auto pr-1">{isDropdownOpen ? <MdOutlineKeyboardArrowUp size={20} /> : <MdOutlineKeyboardArrowDown size={20} />}</div>
            </div>
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-62.5 overflow-y-auto p-2">
                {OFFERINGS_DATA.map((offering) => (
                  <div key={offering.id} onClick={() => toggleOffering(offering.id)} className={`flex items-start gap-4 p-3 rounded-lg cursor-pointer ${selectedOfferings.includes(offering.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    <div className={`mt-1 text-xl ${selectedOfferings.includes(offering.id) ? 'text-blue-600' : 'text-gray-400'}`}>{offering.icon}</div>
                    <div>
                      <h4 className="text-[13px] font-bold text-gray-800">{offering.title}</h4>
                      <p className="text-[11px] text-gray-500">{offering.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <hr className="border-gray-100 my-4" />

          <div className="space-y-8">
            {renderUploadSlot("Banner Image", bannerImage, setBannerImage, bannerInputRef)}
            {renderUploadSlot("Gallery Image 1", galleryImage1, setGalleryImage1, gallery1InputRef)}
            {renderUploadSlot("Gallery Image 2", galleryImage2, setGalleryImage2, gallery2InputRef)}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 flex gap-4">
          <button onClick={onClose} className="flex-1 py-3 border border-gray-200 rounded-md text-sm font-bold text-red-500 hover:bg-red-50">Cancel</button>
          <button 
            onClick={handleConfirm}
            className="flex-1 py-3 rounded-md text-sm font-bold text-white bg-[#002F70] hover:bg-[#002354]"
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}