import { Truck, ShieldCheck, Zap } from "lucide-react";

export default function UspRow() {
  return (
    <div className="usp-row">
      {/* USP 1: Frakt */}
      <div className="Usp-item">
        <span className="Usp-icon">
          <Truck size={24} strokeWidth={1.5} />
        </span>
        <span className="Usp-text">Fri frakt över 899 kr</span>
      </div>

      {/* USP 2: Klubbmerch */}
      <div className="Usp-item">
        <span className="Usp-icon">
          <ShieldCheck size={24} strokeWidth={1.5} />
        </span>
        <span className="Usp-text">Officiell klubbmerch</span>
      </div>

      {/* USP 3: Leverans */}
      <div className="Usp-item">
        <span className="Usp-icon">
          <Zap size={24} strokeWidth={1.5} />
        </span>
        <span className="Usp-text">Snabba leveranser 1-2 dagar</span>
      </div>
    </div>
  );
}
