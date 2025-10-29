import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface StatsSectionProps {
  stats: Stat[];
  heading?: string;
  subheading?: string;
}

export default function StatsSection({
  stats,
  heading,
  subheading,
}: StatsSectionProps) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          // Optional: Disconnect after becoming visible to prevent re-triggering
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Heading and Subheading Section */}
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            const targetValue = parseInt(stat.value.replace(/\D/g, '')) || 0;
            const [count, setCount] = useState(0);

            // Animate count-up only when visible
            useEffect(() => {
              if (!visible) return;
              let start = 0;
              const duration = 1500; // 1.5 seconds
              // Avoid division by zero and ensure stepTime is at least 1
              const stepTime =
                targetValue > 0
                  ? Math.max(1, Math.floor(duration / targetValue))
                  : duration;

              const timer = setInterval(() => {
                start += 1;
                if (start >= targetValue) {
                  setCount(targetValue);
                  clearInterval(timer);
                } else {
                  setCount(start);
                }
              }, stepTime);

              return () => clearInterval(timer);
            }, [visible, targetValue]);

            return (
              <div
                key={idx}
                className="text-center"
                data-testid={`stat-${idx}`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl md:text-5xl font-bold text-primary mb-2 transition-all">
                  {/* Display the animated count or the final target value if animation is done */}
                  {visible ? count : 0}
                  {/\D+$/.test(stat.value) &&
                    stat.value.replace(/[0-9]/g, '') /* keep symbols like + or K */}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}