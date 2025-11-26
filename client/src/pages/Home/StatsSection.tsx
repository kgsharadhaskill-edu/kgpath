import { useEffect, useRef, useState } from 'react';
import { Helmet } from "react-helmet-async";
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
  id?: string; // optional SEO-friendly ID
}

export default function StatsSection({
  stats,
  heading,
  subheading,
  id = "kgpath-stats",
}: StatsSectionProps) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="py-16 md:py-20 bg-card"
      aria-label="KGPath student success statistics"
    >
      {/* ---------- SEO TAGS ---------- */}
      <Helmet>
        <meta
          name="description"
          content="KGPath student success stats: placement rate, salary growth, project completion numbers, and community achievements in AI-driven careers."
        />

        {/* Structured Data for Stats */}
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "KGPath",
            "description": "AI-powered education institute offering job-ready programs.",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.5",
              "reviewCount": "500"
            },
            "metrics": [
              ${stats
                .map(
                  (stat) => `{
                "@type": "QuantitativeValue",
                "name": "${stat.label}",
                "value": "${stat.value}"
              }`
                )
                .join(",")}
            ]
          }
          `}
        </script>
      </Helmet>
      {/* ---------------------------------- */}

      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Heading / Subheading */}
        {(heading || subheading) && (
          <header className="text-center mb-12">
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
          </header>
        )}

        {/* ---------- Stats Grid ---------- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;

            const targetValue = parseInt(stat.value.replace(/\D/g, '')) || 0;
            const [count, setCount] = useState(0);

            useEffect(() => {
              if (!visible) return;

              let start = 0;
              const duration = 1500;
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
              <article
                key={idx}
                className="text-center"
                aria-labelledby={`stat-title-${idx}`}
                data-testid={`stat-${idx}`}
              >
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3"
                  role="img"
                  aria-label={`${stat.label} icon`}
                >
                  <Icon className="h-6 w-6 text-primary" />
                </div>

                {/* Animated Number */}
                <div
                  id={`stat-title-${idx}`}
                  className="text-3xl md:text-5xl font-bold text-primary mb-2 transition-all"
                >
                  {visible ? count : 0}
                  {/\D+$/.test(stat.value) &&
                    stat.value.replace(/[0-9]/g, '')}
                </div>

                {/* Label */}
                <p className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
