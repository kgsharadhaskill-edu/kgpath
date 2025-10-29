import type { LucideIcon } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
}

interface StatsSectionProps {
  stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="text-center" data-testid={`stat-${idx}`}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}