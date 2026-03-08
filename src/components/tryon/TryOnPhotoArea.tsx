import { Camera, RotateCcw, Search, SlidersHorizontal, Upload } from "lucide-react";
import { RefObject } from "react";

interface Props {
  userImage: string | null;
  showCamera: boolean;
  videoRef: RefObject<HTMLVideoElement>;
  fileInputRef: RefObject<HTMLInputElement>;
  necklaces: { id: number; image: string; name: string; nameVi: string; priceDisplay: string; category: string }[];
  selectedNecklace: number;
  favorites: Set<number>;
  onToggleFavorite: (id: number) => void;
  necklacePos: { x: number; y: number };
  necklaceScale: number;
  necklaceRotation: number;
  necklaceOpacity: number;
  isDragging: boolean;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenCamera: () => void;
  onCapture: () => void;
  onStopCamera: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onReset: () => void;
  onSelectTab: (tab: "photo" | "select" | "adjust") => void;
  activeTab: "photo" | "select" | "adjust";
  onSelect: (i: number) => void;
  onScaleChange: (s: number) => void;
}

const TryOnPhotoArea = ({
  userImage, showCamera, videoRef, fileInputRef, necklaces, selectedNecklace,
  necklacePos, necklaceScale, isDragging, favorites, onToggleFavorite,
  onOpenCamera, onCapture, onStopCamera,
  onMouseDown, onMouseMove, onMouseUp, onReset, onSelectTab, activeTab, onSelect,
  onScaleChange,
}: Props) => {
  return (
    <div className="space-y-4">
      {/* Photo Container */}
      <div className="bg-card rounded-2xl shadow-lg overflow-hidden relative">
        {!userImage && !showCamera ? (
          <div className="aspect-[4/5] flex flex-col items-center justify-center gap-4 bg-cream">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Camera className="w-10 h-10 text-primary" />
            </div>
            <p className="font-display text-lg text-foreground">Chụp ảnh để thử vòng cổ</p>
            <p className="font-body text-sm text-muted-foreground">Chụp selfie hoặc tải ảnh chân dung</p>
            <div className="flex gap-3 mt-2">
              <button onClick={onOpenCamera} className="btn-gold flex items-center gap-2 text-sm px-6 py-2.5 rounded-full">
                <Camera className="w-4 h-4" /> Chụp Ảnh
              </button>
              <button onClick={() => fileInputRef.current?.click()} className="btn-outline-gold flex items-center gap-2 text-sm px-6 py-2.5 rounded-full">
                <Upload className="w-4 h-4" /> Tải Ảnh
              </button>
            </div>
          </div>
        ) : showCamera ? (
          <div className="relative">
            <video ref={videoRef} className="w-full aspect-[4/5] object-cover" autoPlay playsInline muted style={{ transform: "scaleX(-1)" }} />
            <div className="absolute bottom-4 left-0 right-0 flex gap-3 justify-center">
              <button onClick={onCapture} className="btn-gold rounded-full px-6 py-2.5 text-sm">Chụp Ảnh</button>
              <button onClick={onStopCamera} className="btn-outline-gold rounded-full px-6 py-2.5 text-sm bg-card/80">Hủy</button>
            </div>
          </div>
        ) : (
          <div className="relative">
            <div
              className="aspect-[4/5] relative overflow-hidden cursor-move select-none"
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              <img src={userImage!} alt="Your photo" className="w-full h-full object-cover" />
              <img
                src={necklaces[selectedNecklace].image}
                alt="Necklace overlay"
                className="absolute pointer-events-auto"
                style={{
                  left: `calc(50% + ${necklacePos.x}px)`,
                  top: `${necklacePos.y}px`,
                  transform: `translateX(-50%) scale(${necklaceScale})`,
                  width: "35%",
                  opacity: 0.92,
                  borderRadius: "50%",
                  filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
                }}
                onMouseDown={onMouseDown}
                draggable={false}
              />
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-md flex items-center gap-2 cursor-pointer hover:bg-card transition-colors">
                <img src={necklaces[selectedNecklace].image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                <span className="font-body text-xs font-medium text-foreground">Xoay 3D</span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-3">
              <button onClick={() => onSelectTab("select")} className="bg-card/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 text-sm font-body font-medium text-foreground shadow-md hover:bg-card transition-colors">
                <Search className="w-4 h-4" /> Chọn Vòng
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Adjust Panel - shown when adjust tab is active */}
      {activeTab === "adjust" && userImage && (
        <div className="bg-card rounded-2xl shadow-lg p-5 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <SlidersHorizontal className="w-5 h-5 text-primary" />
            <h3 className="font-display text-lg font-bold text-foreground">Điều Chỉnh Vòng Cổ</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1.5">
                <span className="font-body text-sm font-medium text-foreground">Kích thước</span>
                <span className="font-body text-sm text-muted-foreground">{Math.round(necklaceScale * 100)}%</span>
              </div>
              <input
                type="range" min="0.3" max="2" step="0.05" value={necklaceScale}
                onChange={(e) => onScaleChange(parseFloat(e.target.value))}
                className="w-full accent-primary"
              />
            </div>
            <p className="font-body text-xs text-muted-foreground text-center bg-primary/5 rounded-lg py-2">
              💡 Kéo vòng cổ trên ảnh để thay đổi vị trí
            </p>
          </div>
        </div>
      )}

      {/* Step Tabs */}
      <div className="flex gap-3 flex-wrap">
        {[
          { key: "photo" as const, icon: <Camera className="w-4 h-4" />, label: "Chụp Ảnh" },
          { key: "select" as const, icon: <Search className="w-4 h-4" />, label: "Chọn Vòng" },
          { key: "adjust" as const, icon: <SlidersHorizontal className="w-4 h-4" />, label: "Điều Chỉnh" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => onSelectTab(tab.key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "gradient-tiffany text-primary-foreground shadow-md"
                : "bg-card text-foreground border border-border hover:border-primary/30"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
        {userImage && (
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-body text-sm font-medium bg-card text-foreground border border-border hover:border-destructive/30 hover:text-destructive transition-all"
          >
            <RotateCcw className="w-4 h-4" /> Chụp Lại
          </button>
        )}
      </div>
    </div>
  );
};

export default TryOnPhotoArea;
