import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/Accordion';
import { faqData } from './placementData';

export default function FAQSection() {
    return (
        <section className="py-16 bg-background">
            <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-2">Your placement-related questions, answered.</p>
                </div>
                <Accordion>
                    {faqData.map((faq) => (
                        <AccordionItem key={faq.id} id={faq.id}>
                            <AccordionTrigger>{faq.question}</AccordionTrigger>
                            <AccordionContent>{faq.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}