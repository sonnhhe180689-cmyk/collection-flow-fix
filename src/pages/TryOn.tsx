import { Upload, Sparkles, Move, ShoppingCart, Camera, CheckCircle } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const TryOn = () => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [selectedNecklace, setSelectedNecklace] = useState(0);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [necklacePos, setNecklacePos] = useState({ x: 0, y: 0 });
  const [necklaceScale, setNecklaceScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showCamera, setShowCamera] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const necklaces = products.map((p) => ({ id: p.id, name: p.name, nameVi: p.nameVi, price: p.price, priceDisplay: p.priceDisplay, image: p.image }));

  const steps = [
    { icon: <Upload className="w-6 h-6" />, title: "Tải Ảnh", desc: "Tải ảnh chân dung từ máy lên" },
    { icon: <Sparkles className="w-6 h-6" />, title: "Chọn Vòng", desc: "Chọn mẫu vòng cổ yêu thích" },
    { icon: <Move className="w-6 h-6" />, title: "Điều Chỉnh", desc: "Kéo và phóng to vòng cổ" },
    { icon: <ShoppingCart className="w-6 h-6" />, title: "Mua Hàng", desc: "Thêm vào giỏ hàng" },
  ];

  const markComplete = (step: number) => {
    setCompletedSteps((prev) => new Set(prev).add(step));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUserImage(ev.target?.result as string);
        setNecklacePos({ x: 0, y: 80 });
        markComplete(0);
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
      toast({ title: "Không thể mở camera. Hãy thử mở trang trong tab mới.", variant: "destructive" });
      setShowCamera(false);
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoRef.current, 0, 0);
      }
      setUserImage(canvas.toDataURL("image/jpeg"));
      setNecklacePos({ x: 0, y: 80 });
      markComplete(0);
      toast({ title: "✅ Đã chụp ảnh thành công!" });
      const stream = videoRef.current.srcObject as MediaStream;
      stream?.getTracks().forEach((t) => t.stop());
      setShowCamera(false);
    }
  };

  const handleSelectNecklace = (i: number) => {
    setSelectedNecklace(i);
    markComplete(1);
    toast({ title: `✅ Đã chọn ${necklaces[i].nameVi}!` });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - necklacePos.x, y: e.clientY - necklacePos.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setNecklacePos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    if (isDragging) markComplete(2);
    setIsDragging(false);
  };

  const handleAddToCart = () => {
    const n = necklaces[selectedNecklace];
    addToCart({ id: n.id, name: n.name, nameVi: n.nameVi, price: n.price, image: n.image });
    markComplete(3);
    toast({ title: `🛒 Đã thêm ${n.nameVi} vào giỏ hàng!` });
  };

  const handleStepClick = (i: number) => {
    if (i === 0) {
      fileInputRef.current?.click();
    } else if (i === 1) {
      document.getElementById("necklace-selection")?.scrollIntoView({ behavior: "smooth" });
    } else if (i === 2) {
      if (!userImage) {
        toast({ title: "Hãy tải ảnh lên trước để điều chỉnh!", variant: "destructive" });
        return;
      }
      toast({ title: "Kéo vòng cổ trên ảnh để điều chỉnh vị trí, dùng thanh trượt để thay đổi kích thước." });
    } else if (i === 3) {
      navigate("/gio-hang");
    }
  };

  return (
    <div className="pt-16">
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold">
              Thử Vòng Cổ <span className="text-primary italic">Trực Tuyến</span>
            </h1>
            <p className="font-body text-muted-foreground mt-3">
              Tải ảnh của bạn lên và xem thử các mẫu vòng cổ yêu thích ngay trên màn hình
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {steps.map((step, i) => (
              <div
                key={i}
                onClick={() => handleStepClick(i)}
                className={`text-center cursor-pointer group transition-all duration-300 rounded-xl p-4 hover:bg-primary/5 hover:shadow-md ${
                  completedSteps.has(i) ? "bg-tiffany-bg" : ""
                }`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-300 ${
                  completedSteps.has(i)
                    ? "bg-primary/20 text-primary"
                    : "bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110"
                }`}>
                  {completedSteps.has(i) ? <CheckCircle className="w-6 h-6" /> : step.icon}
                </div>
                <h3 className={`font-display text-sm font-bold transition-colors ${completedSteps.has(i) ? "text-primary" : "group-hover:text-primary"}`}>
                  {step.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground mt-1">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            {!userImage && !showCamera ? (
              <div className="bg-cream rounded-xl p-12 text-center mb-8">
                <div className="flex flex-col items-center gap-4">
                  <button onClick={handleOpenCamera} className="btn-gold flex items-center gap-2">
                    <Camera className="w-5 h-5" /> Mở Camera Selfie
                  </button>
                  <button onClick={() => fileInputRef.current?.click()} className="btn-outline-gold flex items-center gap-2">
                    <Upload className="w-5 h-5" /> Tải Ảnh Từ Máy
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                  <p className="font-body text-xs text-muted-foreground mt-2">
                    💡 Nếu camera không hiện hình, hãy mở trang trong tab mới
                  </p>
                </div>
              </div>
            ) : showCamera ? (
              <div className="bg-cream rounded-xl p-4 text-center mb-8">
                <video ref={videoRef} className="w-full rounded-lg mb-4" autoPlay playsInline muted style={{ transform: "scaleX(-1)" }} />
                <div className="flex gap-4 justify-center">
                  <button onClick={handleCapture} className="btn-gold">Chụp Ảnh</button>
                  <button onClick={() => { const stream = videoRef.current?.srcObject as MediaStream; stream?.getTracks().forEach(t => t.stop()); setShowCamera(false); }} className="btn-outline-gold">Hủy</button>
                </div>
              </div>
            ) : (
              <div className="bg-cream rounded-xl p-4 mb-8">
                <div
                  className="relative w-full aspect-[3/4] rounded-lg overflow-hidden cursor-move select-none"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
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
                      width: "40%",
                      opacity: 0.9,
                      borderRadius: "50%",
                    }}
                    onMouseDown={handleMouseDown}
                    draggable={false}
                  />
                </div>
                <div className="mt-4 flex items-center gap-4 justify-center flex-wrap">
                  <label className="font-body text-sm">Kích thước:</label>
                  <input type="range" min="0.3" max="2" step="0.1" value={necklaceScale} onChange={(e) => { setNecklaceScale(parseFloat(e.target.value)); markComplete(2); }} className="w-40" />
                  <button onClick={() => { setUserImage(null); setNecklacePos({ x: 0, y: 0 }); setNecklaceScale(1); setCompletedSteps(new Set()); }} className="btn-outline-gold text-xs px-3 py-1">Đặt Lại</button>
                </div>
                <div className="mt-3 text-center">
                  <button onClick={handleAddToCart} className="btn-gold flex items-center gap-2 mx-auto">
                    <ShoppingCart className="w-4 h-4" /> Thêm Vào Giỏ Hàng — {necklaces[selectedNecklace].priceDisplay}
                  </button>
                </div>
              </div>
            )}

            <div id="necklace-selection">
              <h3 className="font-display text-xl font-bold mb-4">Chọn Vòng Cổ</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                {necklaces.map((n, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectNecklace(i)}
                    className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all hover:shadow-lg ${
                      selectedNecklace === i ? "border-primary shadow-md scale-105" : "border-transparent hover:border-primary/30"
                    }`}
                  >
                    <img src={n.image} alt={n.name} className="w-full aspect-square object-cover" />
                    <p className="font-body text-[10px] text-center py-1 text-muted-foreground truncate px-1">{n.nameVi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TryOn;
