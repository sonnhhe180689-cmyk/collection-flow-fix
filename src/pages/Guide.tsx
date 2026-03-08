import { Camera, Sparkles, Move, Download, ShoppingCart, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Bước 1: Tải Ảnh Lên",
    desc: "Chọn một bức ảnh chân dung rõ nét của bạn. Ảnh nên chụp thẳng mặt, vùng cổ rõ ràng để có kết quả tốt nhất.",
    tips: ["Sử dụng ảnh có độ phân giải cao", "Ánh sáng đều, không bị ngược sáng", "Vùng cổ không bị che khuất"],
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Bước 2: Chọn Vòng Cổ",
    desc: "Duyệt qua bộ sưu tập và chọn mẫu vòng cổ bạn muốn thử. Bạn có thể dùng nút mũi tên để chuyển đổi nhanh giữa các mẫu.",
    tips: ["Xem trước nhiều mẫu để so sánh", "Chú ý màu sắc phù hợp với trang phục", "Thử các kiểu dáng khác nhau"],
  },
  {
    icon: <Move className="w-6 h-6" />,
    title: "Bước 3: Di Chuyển & Điều Chỉnh",
    desc: "Kéo vòng cổ đến vị trí phù hợp trên cổ của bạn. Sử dụng thanh trượt để phóng to hoặc thu nhỏ kích thước vòng.",
    tips: ["Kéo thả để di chuyển vị trí", "Điều chỉnh kích thước cho vừa vặn", "Nhấn \"Đặt Lại\" nếu cần bắt đầu lại"],
  },
  {
    icon: <Download className="w-6 h-6" />,
    title: "Bước 4: Lưu & Chia Sẻ",
    desc: "Khi hài lòng với kết quả, bạn có thể tải ảnh về máy để lưu giữ hoặc chia sẻ với bạn bè để lấy ý kiến.",
    tips: ["Tải ảnh về để so sánh các mẫu", "Chia sẻ để nhờ bạn bè góp ý", "Lưu lại để tham khảo khi mua hàng"],
  },
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "Bước 5: Đặt Hàng",
    desc: "Khi đã chọn được mẫu ưng ý, thêm vào giỏ hàng và tiến hành đặt hàng. Chúng tôi sẽ giao hàng tận nơi cho bạn.",
    tips: ["Kiểm tra kỹ thông tin sản phẩm", "Điền đúng địa chỉ giao hàng", "Liên hệ hotline nếu cần hỗ trợ"],
  },
];

const faqs = [
  { q: "Tính năng thử vòng cổ có chính xác không?", a: "Tính năng của chúng tôi giúp bạn hình dung được sản phẩm trên người. Tuy nhiên, màu sắc thực tế có thể khác đôi chút do ánh sáng và màn hình hiển thị." },
  { q: "Tôi có thể thử bao nhiêu mẫu?", a: "Bạn có thể thử không giới hạn số lượng mẫu. Hãy thoải mái khám phá toàn bộ bộ sưu tập của chúng tôi!" },
  { q: "Ảnh của tôi có được lưu trữ không?", a: "Không. Ảnh của bạn chỉ được xử lý trên trình duyệt và không được tải lên máy chủ của chúng tôi. Hoàn toàn riêng tư và bảo mật." },
  { q: "Làm sao để có kết quả thử đẹp nhất?", a: "Chụp ảnh chân dung rõ nét, ánh sáng đều, vùng cổ không bị che khuất và chọn ảnh có nền đơn giản." },
];

const Guide = () => {
  return (
    <div className="pt-16">
      <section className="py-16 luxury-header-classic">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
            <span className="block font-display text-4xl md:text-5xl font-bold text-white">Hướng Dẫn</span>
            <span className="block font-display text-5xl md:text-6xl font-bold italic text-primary mt-1" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.25)' }}>Sử Dụng</span>
          </h1>
          <p className="font-body text-white/80 mt-4 text-base md:text-lg max-w-2xl mx-auto" style={{ textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>
            Hướng dẫn chi tiết cách sử dụng tính năng thử vòng cổ trực tuyến và đặt hàng tại Luna Jewel
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={i} className="relative overflow-hidden bg-card rounded-xl p-8 shadow-sm transition-all duration-500 hover:shadow-[0_8px_30px_hsl(var(--primary)/0.15)] hover:scale-[1.02] hover:border-primary/30 border border-primary/10 cursor-pointer group">
                {/* Sparkle background effect */}
                <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-500" style={{
                  backgroundImage: `
                    radial-gradient(2px 2px at 15% 25%, hsl(var(--primary) / 0.5) 50%, transparent 50%),
                    radial-gradient(1.5px 1.5px at 35% 65%, hsl(var(--tiffany-light) / 0.6) 50%, transparent 50%),
                    radial-gradient(2px 2px at 55% 15%, hsl(var(--primary) / 0.4) 50%, transparent 50%),
                    radial-gradient(1px 1px at 75% 45%, hsl(var(--tiffany-light) / 0.5) 50%, transparent 50%),
                    radial-gradient(1.5px 1.5px at 90% 80%, hsl(var(--primary) / 0.45) 50%, transparent 50%),
                    radial-gradient(1px 1px at 25% 90%, hsl(var(--tiffany-light) / 0.4) 50%, transparent 50%),
                    radial-gradient(2px 2px at 65% 75%, hsl(var(--primary) / 0.35) 50%, transparent 50%),
                    radial-gradient(1.5px 1.5px at 45% 40%, hsl(var(--tiffany-light) / 0.5) 50%, transparent 50%)
                  `,
                  animation: 'sparkle-float 4s ease-in-out infinite alternate'
                }} />
                {/* Shimmer gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
                  background: 'linear-gradient(105deg, transparent 30%, hsl(var(--primary) / 0.06) 45%, hsl(var(--tiffany-light) / 0.1) 50%, hsl(var(--primary) / 0.06) 55%, transparent 70%)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s ease-in-out infinite'
                }} />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_hsl(var(--primary)/0.3)]">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-primary">{step.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{step.desc}</p>
                    <div className="bg-cream rounded-lg p-4 transition-all duration-300 group-hover:bg-primary/5">
                      <p className="font-body text-sm font-medium mb-2">Mẹo nhỏ:</p>
                      {step.tips.map((tip, j) => (
                        <div key={j} className="flex items-center gap-2 mb-1">
                          <CheckCircle className="w-4 h-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                          <span className="font-body text-sm text-muted-foreground">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/thu-vong-co">
              <button className="btn-gold flex items-center gap-2 mx-auto">
                Bắt Đầu Thử Ngay <Sparkles className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Câu Hỏi <span className="text-primary italic">Thường Gặp</span>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-lg p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-[1.01] hover:border-primary/30 border border-transparent cursor-pointer group">
                <h3 className="font-display text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-primary">{faq.q}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Guide;
