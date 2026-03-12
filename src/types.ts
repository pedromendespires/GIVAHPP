export interface NavItem {
  label: string;
  id: string;
}

export interface StatItem {
  label: string;
  value: string;
  desc: string;
  icon: any;
  theme: 'dark' | 'brand' | 'light';
}

export interface CriteriaItem {
  num: string;
  title: string;
  desc: string;
}
