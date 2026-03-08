import { useState, useEffect, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const slides = [
  {
    image: hero1,
    title: "THE NECKLACE COLLECTION",
    subtitle: "Luxury. Elegance. Timeless Beauty.",
    cta: "Khám Phá Bộ Sưu Tập",
    link: "/bo-suu-tap",
  },
  {
    image: hero2,
    title: "TRANG SỨC CAO CẤP",
    subtitle: "Chế tác tinh xảo, vẻ đẹp vĩnh cửu.",
    cta: "Xem Bộ Sưu Tập",
    link: "/bo-suu-tap",
  },
  {
    image: hero3,
    title: "KHÔNG GIAN SANG TRỌNG",
    subtitle: "Trải nghiệm đẳng cấp thượng lưu.",
    cta: "Tìm Hiểu Thêm",
    link: "/lien-he",
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [textVisible, setTextVisible] = useState(true);
  const navigate = useNavigate();

  const goTo = useCallback((index: number) => {
    setTextVisible(false);
    setTimeout(() => {
      setCurrent(index);
      setTextVisible(true);
    }, 400);
  }, []);

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="w-full">
      {/* Image Carousel */}
      <div className="relative w-full h-[70vh] overflow-hidden">
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
          </div>
        ))}

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
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
      </div>

      {/* Text & CTA - Outside the carousel */}
      <div className="bg-background py-10">
        <div className="container mx-auto px-4 text-center">
          <div
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateY(0)" : "translateY(15px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {slides[current].title}
            </h1>
            <p className="font-heading text-lg md:text-xl text-muted-foreground mt-3 italic">
              {slides[current].subtitle}
            </p>
            <button
              className="btn-gold mt-6 text-sm inline-flex items-center gap-2"
              onClick={() => navigate(slides[current].link)}
            >
              {slides[current].cta} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
