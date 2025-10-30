import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hiringPartners } from "./placementData";

export default function HiringPartnersSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="py-20 bg-card relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold"
          >
            Our Hiring Partners
          </motion.h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            Our students are hired by leading companies across tech industries.
          </p>
        </div>

        {/* 🧱 Masonry-feel + Scroll Transform Logos */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-10 mb-16">
          {hiringPartners.slice(0, 18).map((company, idx) => {
            const y = useTransform(scrollYProgress, [0, 1], [50 + idx * 3, -50 - idx * 3]);
            const rotateX = useTransform(scrollYProgress, [0, 1], [50, -50]);
            const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]);

            return (
              <motion.div
                key={idx}
                style={{ y, rotateX, opacity }}
                className="text-center font-bold text-muted-foreground text-lg grayscale opacity-70 
                           hover:grayscale-0 hover:opacity-100 transition-all duration-500
                           hover:scale-110 hover:text-primary"
              >
                {company}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
