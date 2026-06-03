import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// En komponent som automatiskt scrollar upp till toppen av sidan när URL:en ändras
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
