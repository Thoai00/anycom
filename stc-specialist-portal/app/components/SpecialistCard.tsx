import Image from "next/image";

interface SpecialistCardProps {
  item: {
    id: string;
    description: string;
    final_price: number;
    media?: { file_url: string }[];
  };
}

export default function SpecialistCard({ item }: SpecialistCardProps) {
const bannerImage = item.media && item.media.length > 0 
  ? item.media[0].file_url 
  : "https://placehold.co/600x400/002f70/white?text=No+Image+Available";

  return (
    <div className="bg-white rounded-[22px] overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-50">
      <div className="relative h-60 w-full bg-gray-100">
        <Image
          src={bannerImage}
          alt={item.description || "Specialist Banner"}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100 shrink-0">
            <Image 
              src="/image%2080.png" 
              alt="User" 
              width={40} 
              height={40} 
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div>
            <p className="text-[15px] font-bold text-gray-900 leading-tight">
              Adam Low
              <span className="text-[15px] text-gray-500 ml-1">
                - Company Secretary
              </span>
            </p>
          </div>
        </div>
       
        <p className="text-[15px] leading-relaxed text-gray-600 mb-6 min-h-12 line-clamp-2">
          {item.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-50">
          <p className="text-xl font-black text-[#002F70]">
            RM {Number(item.final_price).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}