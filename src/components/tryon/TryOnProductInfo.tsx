import { Star, SlidersHorizontal } from "lucide-react";

interface FavNecklace {
  id: number; nameVi: string; image: string;
}

interface Props {
  necklace: { nameVi: string; priceDisplay: string; image: string; category: string };
  selectedColor: string;
  onSelectColor: (c: string) => void;
  onAddToCart: () => void;
  onSelectNecklace: () => void;
  necklaceScale: number;
  necklaceRotation: number;
  necklaceOpacity: number;
  onScaleChange: (s: number) => void;
  onRotationChange: (r: number) => void;
  onOpacityChange: (o: number) => void;
  activeTab: "photo" | "select" | "adjust";
  onSelectTab: (tab: "photo" | "select" | "adjust") => void;
  favList: FavNecklace[];
  onSelectFavorite: (id: number) => void;
}

const colors = [
  { key: "gold", label: "Vàng", color: "hsl(45 80% 55%)" },
  { key: "silver", label: "Bạc", color: "hsl(0 0% 78%)" },
  { key: "rosegold", label: "Vàng Hồng", color: "hsl(15 60% 70%)" },
];

const TryOnProductInfo = ({
  necklace, selectedColor, onSelectColor, onAddToCart,
  onSelectNecklace, necklaceScale, onScaleChange, activeTab, onSelectTab,
  favList, onSelectFavorite,
}: Props) => {
  return (
    <div className="bg-card rounded-2xl shadow-lg p-6 space-y-5">
      {/* Product Name + Badge */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-display text-2xl font-bold text-foreground">{necklace.nameVi}</h2>
          <span className="shrink-0 bg-primary/10 text-primary font-body text-xs font-semibold px-3 py-1 rounded-full">
            Vòng 18K
          </span>
        </div>
        <p className="font-display text-3xl font-bold text-foreground mt-2">{necklace.priceDisplay}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <div className="flex">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star key={s} className={`w-4 h-4 ${s <= 4 ? "text-yellow-500 fill-yellow-500" : "text-yellow-500 fill-yellow-500 opacity-60"}`} />
          ))}
        </div>
        <span className="font-body text-sm font-semibold text-foreground">4.8</span>
        <span className="font-body text-sm text-muted-foreground">(125 đánh giá)</span>
      </div>

      {/* Color Selection */}
      <div>
        <p className="font-body text-sm font-semibold text-foreground mb-3">Chọn Màu:</p>
        <div className="flex gap-3">
          {colors.map((c) => (
            <button
              key={c.key}
              onClick={() => onSelectColor(c.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all font-body text-sm ${
                selectedColor === c.key
                  ? "border-primary bg-primary/5 font-semibold"
                  : "border-border hover:border-primary/40"
              }`}
            >
              <span className="w-5 h-5 rounded-full border border-border" style={{ background: c.color }} />
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button onClick={onSelectNecklace} className="flex-1 btn-gold rounded-full py-3 text-sm">
          Chọn Vòng
        </button>
        <button
          onClick={() => onSelectTab("adjust")}
          className="flex-1 btn-outline-gold rounded-full py-3 text-sm flex items-center justify-center gap-2"
        >
          Điều Chỉnh <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Scale Slider (when adjust tab) */}
      {activeTab === "adjust" && (
        <div className="bg-tiffany-bg rounded-xl p-4 space-y-3">
          <p className="font-body text-sm font-semibold text-foreground">Kích thước vòng cổ</p>
          <input
            type="range" min="0.3" max="2" step="0.05" value={necklaceScale}
            onChange={(e) => onScaleChange(parseFloat(e.target.value))}
            className="w-full accent-primary"
          />
          <p className="font-body text-xs text-muted-foreground text-center">Kéo vòng cổ trên ảnh để thay đổi vị trí</p>
        </div>
      )}

      {/* Add to Cart */}
      <button
        onClick={onAddToCart}
        className="w-full gradient-tiffany text-primary-foreground font-body font-semibold py-3 rounded-full text-sm hover:brightness-110 transition-all shadow-md"
      >
        🛒 Thêm Vào Giỏ Hàng — {necklace.priceDisplay}
      </button>

      {/* Favorites Section */}
      {favList.length > 0 ? (
        <div>
          <h3 className="font-display text-lg font-bold text-foreground mb-3">Yêu Thích</h3>
          <div className="grid grid-cols-4 gap-2">
            {favList.slice(0, 4).map((n) => (
              <div
                key={n.id}
                onClick={() => onSelectFavorite(n.id)}
                className="cursor-pointer rounded-lg overflow-hidden bg-cream hover:shadow-md transition-shadow"
              >
                <img src={n.image} alt={n.nameVi} className="w-full aspect-square object-cover" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3 className="font-display text-lg font-bold text-foreground mb-2">Yêu Thích</h3>
          <p className="font-body text-xs text-muted-foreground text-center py-3">
            Nhấn ❤️ để thêm vòng yêu thích
          </p>
        </div>
      )}
    </div>
  );
};

export default TryOnProductInfo;
