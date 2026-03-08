import { Heart } from "lucide-react";
import bgShowroom from "@/assets/bg-showroom.png";
import gift1 from "@/assets/gift-1.jpg";
import gift2 from "@/assets/gift-2.jpg";
import gift3 from "@/assets/gift-3.jpg";
import gift4 from "@/assets/gift-4.jpg";
import craftsmanship from "@/assets/craftsmanship.jpg";
import luxuryShowroom from "@/assets/luxury-showroom.jpg";

interface Necklace {
  id: number; name: string; nameVi: string; price: number;
  priceDisplay: string; image: string;
}

interface Props {
  necklaces: Necklace[];
  favorites: Set<number>;
  onSelect: (i: number) => void;
}

const extraModels = [
  { id: 101, name: "Vòng Cổ Ngọc Bích", image: gift1 },
  { id: 102, name: "Vòng Cổ Hổ Phách", image: gift2 },
  { id: 103, name: "Vòng Cổ Thạch Anh", image: gift3 },
  { id: 104, name: "Vòng Cổ Pha Lê", image: gift4 },
  { id: 105, name: "Vòng Cổ Emerald", image: craftsmanship },
  { id: 106, name: "Vòng Cổ Platinum", image: luxuryShowroom },
];

const TryOnSidebar = ({ necklaces, favorites, onSelect }: Props) => {
  return (
    <div className="rounded-2xl p-5 h-full relative overflow-hidden" style={{ backgroundImage: `url(${bgShowroom})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="absolute inset-0 bg-card/85 backdrop-blur-sm" />
      <h3 className="font-display text-xl font-bold text-foreground mb-4 relative z-10">Đổi Mẫu Vòng</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 relative z-10">
        {extraModels.map((m) => (
          <div
            key={m.id}
            className="cursor-pointer rounded-xl overflow-hidden bg-cream hover:shadow-lg transition-all hover:scale-105 group"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            </div>
            <p className="font-body text-xs font-medium text-foreground text-center py-1.5 truncate px-1">{m.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TryOnSidebar;
