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
      {/* Yêu Thích */}
      <div className="bg-card rounded-2xl shadow-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-bold text-foreground">Yêu Thích</h3>
          <button className="font-body text-xs font-semibold text-primary flex items-center gap-0.5 hover:underline">
            Xem Tất Cả <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        {favList.length > 0 ? (
          <div className="grid grid-cols-4 gap-2">
            {favList.slice(0, 4).map((n, i) => (
              <div
                key={n.id}
                onClick={() => onSelect(necklaces.indexOf(n))}
                className="cursor-pointer rounded-lg overflow-hidden bg-cream hover:shadow-md transition-shadow"
              >
                <img src={n.image} alt={n.nameVi} className="w-full aspect-square object-cover" />
              </div>
            ))}
          </div>
        ) : (
          <p className="font-body text-xs text-muted-foreground text-center py-4">
            Nhấn ❤️ để thêm vòng yêu thích
          </p>
        )}
      </div>

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
