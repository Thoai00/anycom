import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaRegEnvelope, FaRegBell } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-360 mx-auto px-6 xl:px-15 h-22.5 flex items-center justify-between">
        
        <Link href="/" className="shrink-0 mr-10">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={160} 
            height={55} 
            priority
            className="object-contain cursor-pointer transition-transform hover:scale-105"
          />
        </Link>
        
        <div 
          className="hidden lg:flex items-center gap-8 uppercase tracking-widest grow"
          style={{ fontSize: "9px", fontWeight: 700 }}
        >
          <Link href="/all-specialists" className="cursor-pointer hover:text-[#002F70] whitespace-nowrap transition-colors">
            Register a company
          </Link>
          
          <span className="cursor-pointer hover:text-[#002F70] whitespace-nowrap transition-colors">
            Appoint a Company Secretary
          </span>
          
          <div className="group flex items-center gap-1 cursor-pointer hover:text-[#002F70] whitespace-nowrap transition-colors">
            Company Secretarial Services 
            <MdKeyboardArrowDown className="text-[12px] transition-transform duration-300 group-hover:rotate-180" />
          </div>
          
          <span className="cursor-pointer hover:text-[#002F70] whitespace-nowrap transition-colors">
            How Anycomp Works
          </span>
        </div>

        <div className="flex items-center gap-6 shrink-0 ml-6">
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-10 w-48 xl:w-56 bg-white focus-within:ring-2 focus-within:ring-[#002F70]/10 transition-all">
            <input 
              type="text" 
              placeholder="Search..." 
              className="px-3 py-2 text-xs outline-none grow"
            />
            <button className="bg-[#002F70] text-white px-3 h-full">
              <FaSearch className="text-xs" />
            </button>
          </div>

          <div className="flex items-center gap-4 text-xl text-gray-500 border-l pl-6 border-gray-100">
            <FaRegEnvelope className="cursor-pointer hover:text-[#002F70]" />
            <div className="relative cursor-pointer hover:text-[#002F70]">
              <FaRegBell />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            
            <Link href="/all-specialists" className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-100 hover:border-[#002F70] transition-all cursor-pointer shrink-0">
              <Image 
                src="/image%2080.png" 
                alt="Profile" 
                width={40} 
                height={40} 
                className="w-full h-full object-cover object-top" 
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}