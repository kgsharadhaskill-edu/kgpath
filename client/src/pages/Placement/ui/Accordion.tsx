import React, { useState, createContext, useContext, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

type AccordionContextType = {
  openItem: string | null;
  setOpenItem: (id: string | null) => void;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('useAccordion must be used within <Accordion>');
  return context;
};

const AccordionItemContext = createContext<string>('');

export const Accordion = ({ children }: { children: React.ReactNode }) => {
  const [openItem, setOpenItem] = useState<string | null>(null);
  return (
    <AccordionContext.Provider value={{ openItem, setOpenItem }}>
      <div className="border-t">{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ id, children }: { id: string; children: React.ReactNode }) => {
  return (
    <AccordionItemContext.Provider value={id}>
      <div className="border-b">{children}</div>
    </AccordionItemContext.Provider>
  );
};

export const AccordionTrigger = ({ children }: { children: React.ReactNode }) => {
  const { openItem, setOpenItem } = useAccordion();
  const id = useContext(AccordionItemContext);
  const isOpen = openItem === id;

  return (
    <button
      onClick={() => setOpenItem(isOpen ? null : id)}
      className="flex w-full items-center justify-between py-4 text-lg font-medium text-left"
    >
      {children}
      <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
};

export const AccordionContent = ({ children }: { children: React.ReactNode }) => {
    const { openItem } = useAccordion();
    const id = useContext(AccordionItemContext);
    const isOpen = openItem === id;
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={contentRef}
            style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
            className="overflow-hidden transition-all duration-300 ease-in-out"
        >
            <div className="pb-4 pt-1 text-muted-foreground">{children}</div>
        </div>
    );
};