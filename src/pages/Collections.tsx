import { useState } from "react";
import { Star, ShoppingCart, Search, ArrowRight, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { products } from "@/data/products";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import bgShowroom from "@/assets/bg-showroom.png";
import bgFeedback from "@/assets/bg-feedback.jpg";
import GiftSection from "@/components/GiftSection";

const reviews = [
  { name: "Minh Thu", text: "\"Diamond Necklace rất đẹp, sáng lấp lánh và nhẹ nhàng. Chắc chắn sẽ ghé lại lần nữa!\"", rating: 5, avatar: avatar1 },
  { name: "Hương Như", text: "\"Tôi yêu thích vòng cổ ngọc trai ở đây. Sản phẩm giao rất nhanh và chất lượng tuyệt vời!\"", rating: 5, avatar: avatar2 },
  { name: "Lan Anh", text: "\"The Luxury Collection rất quý phái. Vòng cổ đẹp nhất mà tôi từng sở hữu!\"", rating: 5, avatar: avatar3 },
];

const INITIAL_COUNT = 4;

const categories = [
  { label: "Tất Cả", value: "all" },
  { label: "Cổ Điển", value: "pearl" },
  { label: "Cao Cấp", value: "luxury" },
  { label: "Hiện Đại", value: "rosegold" },
  { label: "Đá Quý", value: "diamond" },
];

const Collections = () => {
  const [formData, setFormData] = useState({ name: "", email: "", review: "" });
  const [selectedRating, setSelectedRating] = useState(5);
  const [showAll, setShowAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const handleAddToCart = (p: typeof products[0]) => {
    addToCart({ id: p.id, name: p.name, nameVi: p.nameVi, price: p.price, image: p.image });
    toast({ title: `Đã thêm ${p.nameVi} vào giỏ hàng!` });
  };

  const handleSubmitReview = () => {
    if (!formData.name || !formData.email || !formData.review) {
      toast({ title: "Vui lòng điền đầy đủ thông tin!", variant: "destructive" });
      return;
    }
    toast({ title: "Cảm ơn bạn đã đánh giá! ⭐" });
    setFormData({ name: "", email: "", review: "" });
    setSelectedRating(5);
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === "all" || p.category === selectedCategory;
    const matchSearch = searchQuery.trim() === "" ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.nameVi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, INITIAL_COUNT);

  return (
    <div className="pt-16">
      {/* Hero Banner */}
      <section className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden">
        <img src={bgShowroom} alt="Bộ Sưu Tập Vòng Cổ" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
                Vẻ Đẹp<br /><span className="italic text-primary">Vượt Thời Gian</span>
              </h1>
              <p className="font-body text-sm md:text-base text-primary-foreground/80 mt-4 leading-relaxed max-w-md">
                Khám phá bộ sưu tập vòng cổ cao cấp được chế tác tinh xảo. Thử trực tiếp trên ảnh của bạn với công nghệ AR 2D hiện đại.
              </p>
              <Link to="/thu-vong-co">
                <button className="btn-gold mt-6 text-sm flex items-center gap-2">
                  Khám Phá Ngay <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            </div>
            {/* Transparent Necklace Collections circle */}
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border border-primary-foreground/30 bg-primary-foreground/10 backdrop-blur-md flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(255,255,255,0.1),inset_0_0_30px_rgba(255,255,255,0.05)]">
              <h3 className="font-display text-xl md:text-2xl font-bold leading-tight drop-shadow-lg"><span className="text-primary-foreground">Bộ Sưu Tập</span><br /><span className="text-primary">Vòng Cổ</span></h3>
              <p className="font-body text-xs text-primary-foreground/70 mt-1 tracking-wider uppercase">Luna Jewel Collection</p>
              <button onClick={() => document.getElementById('collections-grid')?.scrollIntoView({ behavior: 'smooth' })} className="mt-3 px-5 py-2 text-[10px] font-body font-medium tracking-wider text-white rounded-full bg-gradient-to-r from-[hsl(170,45%,55%)] to-[hsl(185,50%,60%)] hover:from-[hsl(170,45%,50%)] hover:to-[hsl(185,50%,55%)] shadow-md hover:shadow-lg transition-all flex items-center gap-1">
                Xem Chi Tiết <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 right-0">
          <div className="container mx-auto px-4 md:px-16 flex gap-12">
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-primary">24/7</p>
              <p className="font-body text-xs text-primary-foreground/70">Hỗ Trợ Khách Hàng</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-primary">7 Ngày</p>
              <p className="font-body text-xs text-primary-foreground/70">Miễn Phí Đổi Trả</p>
            </div>
            <div>
              <p className="font-display text-2xl md:text-3xl font-bold text-primary">5<Star className="w-4 h-4 inline text-primary ml-0.5 -mt-1" /></p>
              <p className="font-body text-xs text-primary-foreground/70">Đánh Giá</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section id="collections-grid" className="py-20 bg-cream">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-10 justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Tìm kiếm vòng cổ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-full bg-card font-body text-sm focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => { setSelectedCategory(cat.value); setShowAll(false); }}
                  className={`px-4 py-2 rounded-full text-xs font-body font-medium border transition-all ${
                    selectedCategory === cat.value
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-card text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {displayedProducts.map((col) => (
              <div key={col.id} className="bg-card rounded-lg overflow-hidden shadow-sm group cursor-pointer relative">
                <div className="overflow-hidden">
                  <img src={col.image} alt={col.name} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-display text-lg font-semibold">{col.name}</h3>
                  <p className="font-body text-xs text-muted-foreground">{col.nameVi}</p>
                  <p className="font-body text-primary text-sm font-medium mt-1">{col.priceDisplay}</p>
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <button
                      onClick={() => {
                        toggleFavorite(col.id);
                        toast({ title: isFavorite(col.id) ? `Đã bỏ ${col.nameVi} khỏi yêu thích` : `❤️ Đã thêm ${col.nameVi} vào yêu thích!` });
                      }}
                      className={`p-2 rounded-full border transition-all ${
                        isFavorite(col.id)
                          ? "border-red-400 bg-red-50 text-red-500"
                          : "border-border text-muted-foreground hover:border-red-300 hover:text-red-400"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(col.id) ? "fill-red-500" : ""}`} />
                    </button>
                    <button onClick={() => handleAddToCart(col)} className="btn-outline-gold text-xs px-4 py-2">
                      <ShoppingCart className="w-3 h-3 inline mr-1" /> Thêm Vào Giỏ Hàng
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {!showAll && filteredProducts.length > INITIAL_COUNT && (
            <div className="text-center mt-10">
              <button onClick={() => setShowAll(true)} className="btn-gold text-sm">Xem Thêm</button>
            </div>
          )}
          {showAll && (
            <div className="text-center mt-10">
              <button onClick={() => setShowAll(false)} className="btn-gold text-sm">Thu Gọn</button>
            </div>
          )}
        </div>
      </section>

      {/* Gift Section - directly below collections, no gap */}
      <GiftSection />

      {/* Luxury Showroom Banner */}
      <section className="relative h-[40vh] overflow-hidden">
        <img src={bgShowroom} alt="Không gian trưng bày sang trọng" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
          <div className="text-center">
            <h2 className="font-display text-3xl md:text-4xl text-primary-foreground italic">Không Gian Sang Trọng</h2>
            <p className="font-body text-sm tracking-[0.2em] uppercase text-primary-foreground/80 mt-3">Trải nghiệm mua sắm đẳng cấp tại cửa hàng</p>
          </div>
        </div>
      </section>

      {/* Leave Feedback */}
      <section className="py-20 bg-cream">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="section-title">Để Lại Đánh Giá</h2>
            <p className="section-subtitle">Chia Sẻ Trải Nghiệm Của Bạn</p>
          </div>
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-8 h-8 cursor-pointer transition-colors ${
                  star <= selectedRating ? "fill-primary text-primary" : "text-muted-foreground"
                }`}
                onClick={() => setSelectedRating(star)}
              />
            ))}
          </div>
          <div className="space-y-4">
            <input type="text" placeholder="Tên của bạn" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm bg-card font-body text-sm focus:outline-none focus:border-primary" />
            <input type="email" placeholder="Email của bạn" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm bg-card font-body text-sm focus:outline-none focus:border-primary" />
            <textarea placeholder="Đánh giá của bạn" rows={4} value={formData.review} onChange={(e) => setFormData({ ...formData, review: e.target.value })} className="w-full px-4 py-3 border border-border rounded-sm bg-card font-body text-sm focus:outline-none focus:border-primary resize-none" />
            <div className="text-center">
              <button onClick={handleSubmitReview} className="btn-gold text-sm">Gửi Đánh Giá</button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Feedback */}
      <section className="py-20 relative overflow-hidden" style={{ backgroundImage: `url(${bgFeedback})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-card/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="section-title">Customer Feedback</h2>
            <p className="section-subtitle">Phản Hồi Từ Khách Hàng</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden border-2 border-primary/20">
                  <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex justify-center gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <Star key={j} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{review.name}</h3>
                <p className="font-body text-sm text-muted-foreground italic leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Try-On CTA */}
      <section className="py-20 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">Trải Nghiệm Thử Vòng Cổ</h2>
          <p className="font-body text-primary-foreground/70 mt-4 max-w-xl mx-auto italic">
            Tải ảnh của bạn lên và thử ngay các mẫu vòng cổ yêu thích. Xem trước khi mua để chắc chắn bạn đã chọn đúng!
          </p>
          <Link to="/thu-vong-co">
            <button className="btn-gold mt-8 flex items-center gap-2 mx-auto text-sm">
              Thử Ngay Miễn Phí <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Collections;
