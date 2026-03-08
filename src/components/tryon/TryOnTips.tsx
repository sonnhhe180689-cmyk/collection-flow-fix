import { Camera, Sparkles, Eye, ShieldCheck } from "lucide-react";

const tips = [
  { icon: <Camera className="w-5 h-5" />, label: "Chụp Chính Diện" },
  { icon: <Sparkles className="w-5 h-5" />, label: "Ánh Sáng Tốt" },
  { icon: <ShieldCheck className="w-5 h-5" />, label: "Không Che Cổ" },
  { icon: <Eye className="w-5 h-5" />, label: "Nhìn Thẳng Camera" },
];

const TryOnTips = () => (
  <div className="bg-card rounded-2xl shadow-lg p-5">
    <div className="flex flex-wrap items-center gap-6">
      <h3 className="font-display text-lg font-bold text-foreground italic">Mẹo Thử Vòng</h3>
      {tips.map((tip, i) => (
        <div key={i} className="flex items-center gap-2 text-muted-foreground">
          <span className="text-primary">{tip.icon}</span>
          <span className="font-body text-sm">{tip.label}</span>
        </div>
      ))}
    </div>
  </div>
);

export default TryOnTips;
