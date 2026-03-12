import React from 'react';
import { motion } from 'motion/react';

interface SectionProps {
  title: string;
  icon: any;
  children: React.ReactNode;
  id?: string;
}

export const Section = React.memo(({ title, icon: Icon, children, id }: SectionProps) => (
  <motion.section 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    id={id}
    className="mb-24 scroll-mt-28"
  >
    <div className="flex items-center gap-4 mb-10 border-b border-zinc-200 pb-4">
      <div className="p-2.5 bg-brand-50 rounded-xl">
        <Icon className="w-7 h-7 text-brand-600" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight font-display">{title}</h2>
    </div>
    {children}
  </motion.section>
));

Section.displayName = 'Section';
