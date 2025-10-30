import React from 'react';
import { Card, CardContent } from './ui/Card';
import { placementProcess } from './placementData';

export default function PlacementProcessSection() {
  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">Our 4-Step Placement Process</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">A structured approach to ensure you land your dream job.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {placementProcess.map((process, idx) => {
            const Icon = process.icon;
            return (
              <Card key={idx} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">{process.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                  <p className="text-sm text-muted-foreground">{process.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}