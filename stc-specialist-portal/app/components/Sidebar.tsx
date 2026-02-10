import { 
  HiOutlineTag, 
  HiOutlineUsers, 
  HiOutlineClipboardDocumentList, 
  HiOutlinePencilSquare, 
  HiOutlineEnvelope, 
  HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog6Tooth
} from "react-icons/hi2";
import Image from "next/image";

const menuItems = [
  { icon: HiOutlineTag, label: "Specialists", active: true },
  { icon: HiOutlineUsers, label: "Clients", active: false },
  { icon: HiOutlineClipboardDocumentList, label: "Service Orders", active: false },
  { icon: HiOutlinePencilSquare, label: "eSignature", active: false },
  { icon: HiOutlineEnvelope, label: "Messages", active: false },
  { icon: HiOutlineDocumentText, label: "Invoices & Receipts", active: false },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-100 flex flex-col py-8 sticky top-0 h-screen shrink-0">
      <div className="px-6 mb-10">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Profile</h2>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-100">
            <Image 
              src="/image%2080.png" 
              alt="User" 
              width={40} 
              height={40} 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate text-gray-800">Gwen Lam</p>
            <p className="text-[10px] font-bold text-[#002F70] truncate">
              ST Comp Holdings Sdn Bhd
            </p>
          </div>
        </div>
      </div>
      <div className="px-6 mb-2">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Dashboard
        </span>
      </div>
      <nav className="grow px-3">
        {menuItems.map((item, idx) => (
          <div 
            key={idx}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 mb-1 ${
              item.active 
                ? "bg-[#002F70] text-white rounded-lg shadow-sm" 
                : "text-gray-500 hover:bg-gray-50 rounded-lg"
            }`}
          >
            <item.icon size={20} />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
        ))}
      </nav>
      <div className="px-3 border-t border-gray-100 pt-6 space-y-1">
        <div className="flex items-center gap-3 px-4 py-3 text-gray-500 text-sm cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
          <HiOutlineQuestionMarkCircle size={20} />
          <span className="font-medium">Help</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 text-gray-500 text-sm cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
          <HiOutlineCog6Tooth size={20} />
          <span className="font-medium">Settings</span>
        </div>
      </div>
    </aside>
  );
}