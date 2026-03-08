import { Upload, Camera, Search, RotateCcw, SlidersHorizontal, Heart, ChevronLeft, ChevronRight, Sparkles, Eye, ShieldCheck, Star } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { toast } from "@/hooks/use-toast";
import { useState, useRef } from "react";
import TryOnPhotoArea from "@/components/tryon/TryOnPhotoArea";
import TryOnProductInfo from "@/components/tryon/TryOnProductInfo";
import TryOnSuggestions from "@/components/tryon/TryOnSuggestions";
import TryOnSidebar from "@/components/tryon/TryOnSidebar";
import TryOnTips from "@/components/tryon/TryOnTips";

const TryOn = () => {
  const [selectedNecklace, setSelectedNecklace] = useState(0);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [necklacePos, setNecklacePos] = useState({ x: 0, y: 80 });
  const [necklaceScale, setNecklaceScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<"photo" | "select" | "adjust">("photo");
  const [selectedColor, setSelectedColor] = useState("gold");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const { addToCart } = useCart();

  const necklaces = products.map((p) => ({
    id: p.id, name: p.name, nameVi: p.nameVi, price: p.price,
    priceDisplay: p.priceDisplay, image: p.image, category: p.category,
  }));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUserImage(ev.target?.result as string);
        setNecklacePos({ x: 0, y: 80 });
        toast({ title: "✅ Ảnh đã tải lên thành công!" });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch {
      toast({ title: "Không thể mở camera.", variant: "destructive" });
      setShowCamera(false);
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) { ctx.translate(canvas.width, 0); ctx.scale(-1, 1); ctx.drawImage(videoRef.current, 0, 0); }
      setUserImage(canvas.toDataURL("image/jpeg"));
      setNecklacePos({ x: 0, y: 80 });
      toast({ title: "✅ Đã chụp ảnh thành công!" });
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach((t) => t.stop());
      setShowCamera(false);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - necklacePos.x, y: e.clientY - necklacePos.y });
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setNecklacePos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);

  const handleSelectNecklace = (i: number) => {
    setSelectedNecklace(i);
    toast({ title: `✅ Đã chọn ${necklaces[i].nameVi}!` });
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleAddToCart = () => {
    const n = necklaces[selectedNecklace];
    addToCart({ id: n.id, name: n.name, nameVi: n.nameVi, price: n.price, image: n.image });
    toast({ title: `🛒 Đã thêm ${n.nameVi} vào giỏ hàng!` });
  };

  const handleReset = () => {
    setUserImage(null);
    setNecklacePos({ x: 0, y: 0 });
    setNecklaceScale(1);
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    stream?.getTracks().forEach((t) => t.stop());
    setShowCamera(false);
  };

  return (
    <div className="pt-16 min-h-screen" style={{ background: "linear-gradient(180deg, hsl(174 30% 95%) 0%, hsl(180 20% 99%) 100%)" }}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Thử Vòng Cổ <span className="italic text-primary">Trực Tuyến</span>
          </h1>
          <p className="font-body text-muted-foreground mt-3">
            Tải ảnh của bạn lên và xem thử các mẫu vòng cổ yêu thích ngay trên màn hình
          </p>
        </div>

        {/* Main area: Photo + Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Left: Photo area */}
          <div className="lg:col-span-2">
            <TryOnPhotoArea
              userImage={userImage}
              showCamera={showCamera}
              videoRef={videoRef}
              fileInputRef={fileInputRef}
              necklaces={necklaces}
              selectedNecklace={selectedNecklace}
              necklacePos={necklacePos}
              necklaceScale={necklaceScale}
              isDragging={isDragging}
              onFileUpload={handleFileUpload}
              onOpenCamera={handleOpenCamera}
              onCapture={handleCapture}
              onStopCamera={stopCamera}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onReset={handleReset}
              onSelectTab={setActiveTab}
              activeTab={activeTab}
            />
          </div>

          {/* Right: Product Info */}
          <div>
            <TryOnProductInfo
              necklace={necklaces[selectedNecklace]}
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              onAddToCart={handleAddToCart}
              onSelectNecklace={() => setActiveTab("select")}
              necklaceScale={necklaceScale}
              onScaleChange={setNecklaceScale}
              activeTab={activeTab}
              onSelectTab={setActiveTab}
              favList={necklaces.filter((n) => favorites.has(n.id))}
              onSelectFavorite={(id) => {
                const idx = necklaces.findIndex((n) => n.id === id);
                if (idx >= 0) handleSelectNecklace(idx);
              }}
            />
          </div>
        </div>

        {/* Bottom: Suggestions + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TryOnSuggestions
              necklaces={necklaces}
              selectedNecklace={selectedNecklace}
              favorites={favorites}
              onSelect={handleSelectNecklace}
              onToggleFavorite={toggleFavorite}
            />
          </div>
          <div>
            <TryOnSidebar
              necklaces={necklaces}
              favorites={favorites}
              onSelect={handleSelectNecklace}
            />
          </div>
        </div>

        {/* Tips */}
        <TryOnTips />
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
    </div>
  );
};

export default TryOn;
