import { Heart, ChevronLeft, ChevronRight, Sparkles, Search } from "lucide-react";
import { useState } from "react";

interface Necklace {
  id: number; name: string; nameVi: string; price: number;
  priceDisplay: string; image: string; category: string;
}

interface Props {
  necklaces: Necklace[];
  selectedNecklace: number;
  favorites: Set<number>;
  onSelect: (i: number) => void;
  onToggleFavorite: (id: number) => void;
  colorFilter?: string;
}

const colorCategoryMap: Record<string, string[]> = {
  gold: ["gold", "luxury"],
  silver: ["silver", "diamond"],
  rosegold: ["rosegold", "pearl"],
};

const TryOnSuggestions = ({ necklaces, selectedNecklace, favorites, onSelect, onToggleFavorite, colorFilter }: Props) => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const maxScroll = Math.max(0, necklaces.length - 4);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { key: "all", label: "Tất Cả" },
    { key: "diamond", label: "Cổ Điển" },
    { key: "luxury", label: "Cao Cấp" },
    { key: "gold", label: "Hiện Đại" },
    { key: "pearl", label: "Đá Quý" },
  ];

  const filtered = necklaces.filter((n) => {
    const matchSearch = !searchQuery || n.nameVi.toLowerCase().includes(searchQuery.toLowerCase()) || n.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = activeFilter === "all" || n.category === activeFilter;
    const matchColor = !colorFilter || colorCategoryMap[colorFilter]?.includes(n.category);
    return matchSearch && matchFilter && matchColor;
  });

  return (
    <div className="bg-card rounded-2xl shadow-lg p-5 h-full flex flex-col">
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Tìm kiếm vòng cổ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-background font-body text-sm focus:outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 rounded-full font-body text-sm font-medium transition-all ${
                activeFilter === f.key
                  ? "gradient-tiffany text-primary-foreground shadow-sm"
                  : "bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 mb-6">
        <Sparkles className="w-4 h-4 text-primary" />
        <h3 className="font-display text-xl font-bold text-foreground italic">Gợi Ý Cho Bạn</h3>
        <Sparkles className="w-4 h-4 text-primary" />
      </div>

      <div className="relative flex-1">
        {scrollOffset > 0 && (
          <button
            onClick={() => setScrollOffset(Math.max(0, scrollOffset - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 bg-card rounded-full shadow-lg flex items-center justify-center hover:bg-accent transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
        )}

        <div className="grid grid-cols-2 gap-4 overflow-hidden">
          {filtered.slice(scrollOffset, scrollOffset + 4).map((n, idx) => {
            const realIdx = necklaces.indexOf(n);
            return (
              <div
                key={n.id}
                onClick={() => onSelect(realIdx)}
                className={`cursor-pointer group relative rounded-xl overflow-hidden transition-all hover:shadow-lg ${
                  selectedNecklace === realIdx ? "ring-2 ring-primary shadow-md" : ""
                }`}
              >
                {realIdx === 0 && (
                  <span className="absolute top-2 left-2 z-10 bg-red-500 text-primary-foreground font-body text-[10px] font-bold px-2 py-0.5 rounded-full">
                    Hot
                  </span>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); onToggleFavorite(n.id); }}
                  className="absolute top-2 right-2 z-10"
                >
                  <Heart className={`w-5 h-5 transition-colors ${
                    favorites.has(n.id) ? "text-red-500 fill-red-500" : "text-muted-foreground/50 group-hover:text-red-400"
                  }`} />
                </button>
                <div className="bg-cream aspect-square">
                  <img src={n.image} alt={n.nameVi} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-2.5 bg-card">
                  <p className="font-body text-xs font-medium text-foreground truncate">{n.name}</p>
                  <p className="font-body text-xs font-bold text-primary mt-0.5">{n.priceDisplay}</p>
                </div>
              </div>
            );
          })}
        </div>

        {scrollOffset < maxScroll && (
          <button
            onClick={() => setScrollOffset(Math.min(maxScroll, scrollOffset + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 bg-card rounded-full shadow-lg flex items-center justify-center hover:bg-accent transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TryOnSuggestions;
