import { 
  TrendingDown, 
  Percent, 
  Home 
} from 'lucide-react';
import { NavItem, StatItem, CriteriaItem } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Objetivo', id: 'section-0' },
  { label: 'Medidas HPP', id: 'section-1' },
  { label: 'Autoconstrução', id: 'section-2' },
  { label: 'Limites', id: 'section-3' },
  { label: 'FAQ', id: 'section-4' }
];

export const QUICK_STATS: StatItem[] = [
  { label: 'Dedução IRS Arrendatários', value: 'Até 1000€', desc: 'Aumento do limite anual para deduções.', icon: TrendingDown, theme: 'dark' },
  { label: 'Taxa Autónoma de IRS', value: 'Reduzida a 10%', desc: 'Aplicável a rendimentos prediais.', icon: Percent, theme: 'brand' },
  { label: 'Isenção de IMT', value: '1ª Aquisição', desc: 'Para habitação própria e permanente.', icon: Home, theme: 'light' }
];

export const ELIGIBILITY_CRITERIA: CriteriaItem[] = [
  { num: '01', title: 'Renda Moderada', desc: 'Não pode exceder 2,5 vezes o valor da retribuição mínima mensal de 2026.' },
  { num: '02', title: 'Preço de Venda', desc: 'Limitado ao escalão superior do 2.º escalão do Código do IMT.' },
  { num: '03', title: 'Permanência', desc: 'O adquirente deve permanecer no imóvel por um período mínimo de 12 meses.' }
];
