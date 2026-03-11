import { MessageCircle, Sparkles } from "lucide-react";
import bgShowroom from "@/assets/bg-showroom.png";
import customOrder from "@/assets/custom-order.png";
import crafting1 from "@/assets/crafting-1.jpg";
import crafting2 from "@/assets/crafting-2.jpg";
import crafting3 from "@/assets/crafting-3.jpg";

const images = [
  { src: customOrder, alt: "Chế tác vòng cổ" },
  { src: crafting1, alt: "Gắn kim cương" },
  { src: crafting2, alt: "Chế tác ngọc trai" },
  { src: crafting3, alt: "Bộ sưu tập cao cấp" },
];

const TryOnSidebar = () => {
  return (
    <div className="rounded-2xl h-full relative overflow-hidden" style={{ backgroundImage: `url(${bgShowroom})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-card/60 backdrop-blur-sm" />
      <div className="relative z-10 p-5 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-primary" />
          <h3 className="font-display text-xl font-bold text-foreground italic">Đặt Làm Theo Yêu Cầu</h3>
        </div>

        <div className="grid grid-cols-2 gap-3 flex-1 mb-4">
          {images.map((img, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-md group cursor-pointer">
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>

        <a
          href="/lien-he"
          className="btn-gold flex items-center justify-center gap-2 text-sm px-6 py-3 rounded-full w-full font-medium"
        >
          <MessageCircle className="w-4 h-4" /> Liên Hệ Đặt Làm
        </a>
      </div>
    </div>
  );
};

export default TryOnSidebar;
