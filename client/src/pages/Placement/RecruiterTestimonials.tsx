import React from 'react';
import { Card, CardContent } from './ui/Card';
import { recruiterTestimonials } from './placementData';

export default function RecruiterTestimonials() {
    return (
        <section className="py-16 bg-card">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">What Recruiters Say</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">Hear directly from hiring managers at top companies.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {recruiterTestimonials.map((testimonial, idx) => (
                        <Card key={idx} className="bg-background">
                            <CardContent className="p-8">
                                <p className="text-muted-foreground mb-6 italic text-lg">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover" />
                                    <div>
                                        <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}