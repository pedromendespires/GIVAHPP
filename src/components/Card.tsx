import React from 'react';
import { motion } from 'motion/react';

interface CardProps {
  title: string;
  description: string;
  icon: any;
  highlight?: string;
}

export const Card = React.memo(({ title, description, icon: Icon, highlight }: CardProps) => (
  <motion.div 
    whileHover={{ y: -6 }}
    className="group glass-card p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] hover:shadow-2xl hover:border-brand-100 transition-all duration-500"
  >
    <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:rotate-6 transition-all duration-500">
      <Icon className="w-7 h-7 text-brand-600 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-zinc-900 mb-3 font-display">{title}</h3>
    <p className="text-zinc-600 text-sm leading-relaxed mb-6 font-medium">{description}</p>
    {highlight && (
      <span className="inline-flex px-4 py-1.5 bg-brand-50 text-brand-700 text-[10px] font-black uppercase tracking-[0.15em] rounded-full border border-brand-100 shadow-sm">
        {highlight}
      </span>
    )}
  </motion.div>
));

Card.displayName = 'Card';
