import { ShoppingCart } from "lucide-react";
import { gifts } from "@/data/gifts";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const GiftSection = () => {
  const { addToCart } = useCart();

  const handleAddToCart = (gift: typeof gifts[0]) => {
    addToCart({ id: gift.id, name: gift.name, nameVi: gift.nameVi, price: gift.price, image: gift.image });
    toast({ title: `Đã thêm ${gift.nameVi} vào giỏ hàng! 🎁` });
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Gift Collections</h2>
          <p className="section-subtitle">Bộ Sưu Tập Quà Tặng</p>
          <p className="font-body text-sm text-muted-foreground mt-4 max-w-xl mx-auto">
            Những món quà trang sức cao cấp hoàn hảo dành tặng người thân yêu trong những dịp đặc biệt
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {gifts.map((gift) => (
            <div key={gift.id} className="bg-card rounded-lg overflow-hidden shadow-sm group cursor-pointer hover:shadow-lg transition-all duration-300">
              <div className="overflow-hidden">
                <img src={gift.image} alt={gift.nameVi} className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-display text-lg font-semibold">{gift.name}</h3>
                <p className="font-body text-xs text-muted-foreground mt-1">{gift.description}</p>
                <p className="font-body text-primary text-sm font-medium mt-2">{gift.priceDisplay}</p>
                <button onClick={() => handleAddToCart(gift)} className="btn-outline-gold text-xs mt-3 px-4 py-2">
                  <ShoppingCart className="w-3 h-3 inline mr-1" /> Thêm Vào Giỏ
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
