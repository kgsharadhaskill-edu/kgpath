import React from 'react';
import { Card, CardContent } from './ui/Card';
import { placementHighlights } from './placementData';

export default function HighlightsSection() {
    return (
        <section className="py-16 bg-background">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Placement Highlights</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">Key achievements that define our success.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {placementHighlights.map((highlight, idx) => {
                        const Icon = highlight.icon;
                        return (
                            <Card key={idx} className="text-center">
                                <CardContent className="p-6">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                                        <Icon className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{highlight.title}</h3>
                                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}