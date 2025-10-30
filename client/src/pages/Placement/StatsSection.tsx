import React from 'react';
import { Card, CardContent } from './ui/Card';
import { placementStats } from './placementData';

export default function StatsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {placementStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <Card key={idx} className="text-center">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-3 ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}