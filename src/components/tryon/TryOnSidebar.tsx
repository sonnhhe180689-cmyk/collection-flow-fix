import { ChevronRight } from "lucide-react";

interface Necklace {
  id: number; name: string; nameVi: string; price: number;
  priceDisplay: string; image: string;
}

interface Props {
  necklaces: Necklace[];
  favorites: Set<number>;
  onSelect: (i: number) => void;
}

const TryOnSidebar = ({ necklaces, favorites, onSelect }: Props) => {
  const favList = necklaces.filter((n) => favorites.has(n.id));

  return (
    <div className="space-y-6">

      {/* Đổi Mẫu Vòng */}
      <div className="bg-card rounded-2xl shadow-lg p-5">
        <h3 className="font-display text-lg font-bold text-foreground mb-4">Đổi Mẫu Vòng</h3>
        <div className="grid grid-cols-3 gap-2">
          {necklaces.map((n, i) => (
            <div
              key={n.id}
              onClick={() => onSelect(i)}
              className="cursor-pointer rounded-lg overflow-hidden bg-cream hover:shadow-md transition-all hover:scale-105"
            >
              <img src={n.image} alt={n.nameVi} className="w-full aspect-square object-cover" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TryOnSidebar;
