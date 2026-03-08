import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    title: "BỘ SƯU TẬP\nCAO CẤP",
    subtitle: "Sang trọng. Thanh lịch. Vẻ đẹp vượt thời gian.",
    cta: "Khám Phá Bộ Sưu Tập",
    link: "/bo-suu-tap",
  },
  {
    image: hero2,
    title: "TRẢI NGHIỆM\nTHỬ VÒNG CỔ",
    subtitle: "Thử vòng cổ trực tuyến ngay trên ảnh của bạn.",
    cta: "Thử Vòng Cổ Ngay",
    link: "/thu-vong-co",
  },
  {
    image: hero3,
    title: "KHÔNG GIAN\nSANG TRỌNG",
    subtitle: "Trải nghiệm đẳng cấp thượng lưu.",
    cta: "Tìm Hiểu Thêm",
    link: "/lien-he",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const goTo = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-all duration-700 ease-in-out"
          style={{
            opacity: i === current ? 1 : 0,
            transform: i === current ? "scale(1)" : "scale(1.05)",
          }}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
          <div className="hero-overlay absolute inset-0" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4 md:px-16">
          <div
            className="max-w-lg"
            style={{
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? "translateY(20px)" : "translateY(0)",
              transition: "opacity 0.5s ease, transform 0.5s ease",
              transitionDelay: "0.2s",
            }}
          >
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-[1.3] whitespace-pre-line">
              {slides[current].title}
            </h1>
            <p className="font-heading text-lg md:text-xl text-primary-foreground/90 mt-4 italic">
              {slides[current].subtitle}
            </p>
            <button className="btn-gold mt-8 text-sm" onClick={() => navigate(slides[current].link)}>
              {slides[current].cta}
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center hover:bg-background/50 transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-primary-foreground" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-background/30 backdrop-blur-sm flex items-center justify-center hover:bg-background/50 transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-primary-foreground" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i === current ? "bg-primary w-8" : "bg-primary-foreground/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
