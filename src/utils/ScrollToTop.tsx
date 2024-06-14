import { Button } from "@/components/ui/button";
import { ChevronsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <m.div 
    initial={{ y: 0 }}
    animate={{ y: [0, -10, 0] }}
    transition={{
      duration: 4,
      repeat: Infinity,
      repeatType: "loop"
    }}
    className="fixed bottom-8 right-[30%]">
      {isVisible && (
        <Button variant={"outline"} 
            size={"icon"} 
            onClick={() => scrollToTop()}
            className="rounded-full">
          <ChevronsUp />
        </Button>
      )}
    </m.div>
  );
};

export default ScrollToTop;
