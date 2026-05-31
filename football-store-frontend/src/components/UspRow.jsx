import { Truck, ShieldCheck, Zap } from "lucide-react";
import "./UspRow.css";

export default function UspRow() {
  return (
    <div className="usp-row">
      {/* USP 1: Frakt */}
      <div className="usp-row__item">
        <span className="usp-row__icon">
          <Truck size={20} />
        </span>
        <span className="usp-row__text">Fri frakt över 899 kr</span>
      </div>

      {/* USP 2: Klubbmerch */}
      <div className="usp-row__item">
        <span className="usp-row__icon">
          <ShieldCheck size={20} />
        </span>
        <span className="usp-row__text">Officiell klubbmerch</span>
      </div>

      {/* USP 3: Leverans */}
      <div className="usp-row__item">
        <span className="usp-row__icon">
          <Zap size={20} />
        </span>
        <span className="usp-row__text">Snabb leverans 1-2 dagar</span>
      </div>
    </div>
  );
}
