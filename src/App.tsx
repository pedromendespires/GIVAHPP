/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Home, 
  Percent, 
  FileText, 
  TrendingDown, 
  Building2, 
  Key, 
  Info, 
  Calendar,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Scale,
  Menu,
  X,
  HelpCircle,
  ChevronDown,
  WifiOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from './components/Section';
import { Card } from './components/Card';
import { NAV_ITEMS, QUICK_STATS, ELIGIBILITY_CRITERIA } from './constants';

export default function App() {
  const [activeSection, setActiveSection] = useState('section-0');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Online/Offline Status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Scroll Spy & Header State
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 500);
      
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 250;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans text-zinc-900 selection:bg-brand-100 selection:text-brand-900 antialiased">
      {/* Offline Indicator */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-0 left-0 w-full bg-amber-500 text-white py-2 px-4 z-[100] flex items-center justify-center gap-3 font-bold text-sm shadow-lg"
          >
            <WifiOff className="w-4 h-4" />
            <span>Modo Offline: Está a visualizar uma versão guardada da página.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip to Content Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-brand-600 focus:text-white focus:rounded-xl focus:font-bold focus:shadow-2xl"
      >
        Saltar para o conteúdo principal
      </a>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] pointer-events-none">
        <motion.div 
          className="h-full bg-brand-500 origin-left"
          style={{ scaleX: scrollProgress / 100 }}
        />
      </div>

      {/* Navigation */}
      <nav 
        aria-label="Navegação Principal"
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? 'bg-white/90 backdrop-blur-2xl border-b border-zinc-200/50 py-3 sm:py-4' : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <button 
              className="flex items-center gap-3 group cursor-pointer focus-visible:ring-4 focus-visible:ring-brand-500/30 rounded-2xl outline-none" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Voltar ao topo da página"
            >
              <div className="w-11 h-11 bg-brand-600 rounded-2xl flex items-center justify-center shadow-xl shadow-brand-200 group-hover:rotate-12 transition-all duration-500">
                <Scale className="text-white w-6 h-6" />
              </div>
              <span className="font-black text-2xl tracking-tighter">HABITAÇÃO<span className="text-brand-600">2026</span></span>
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-2 bg-zinc-100/50 p-1.5 rounded-full border border-zinc-200/50 backdrop-blur-md">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  aria-current={activeSection === item.id ? 'page' : undefined}
                  className={`px-6 py-2.5 text-xs font-black uppercase tracking-widest rounded-full transition-all duration-500 outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    activeSection === item.id 
                      ? 'bg-white text-brand-600 shadow-sm' 
                      : 'text-zinc-400 hover:text-zinc-900'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-[10px] font-black tracking-[0.2em] uppercase bg-zinc-900 px-5 py-2 rounded-full text-white shadow-lg shadow-zinc-200">
                Lei n.º 9-A/2026
              </div>
              <button 
                className="md:hidden p-3 text-zinc-600 hover:bg-zinc-100 rounded-2xl transition-all focus-visible:ring-2 focus-visible:ring-brand-500 outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Fechar Menu" : "Abrir Menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Sidebar */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-zinc-900/40 backdrop-blur-sm z-[60] md:hidden"
                aria-hidden="true"
              />
              {/* Sidebar */}
              <motion.div
                id="mobile-menu"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 left-0 h-full w-[85%] max-w-xs bg-white z-[70] md:hidden shadow-2xl flex flex-col"
              >
                <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-200">
                      <Scale className="text-white w-5 h-5" />
                    </div>
                    <span className="font-black text-xl tracking-tighter">HABITAÇÃO<span className="text-brand-600">2026</span></span>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg outline-none"
                    aria-label="Fechar Menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="px-6 py-8 space-y-2 flex-1 overflow-y-auto" role="menu">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      role="menuitem"
                      onClick={() => scrollTo(item.id)}
                      className={`w-full text-left px-6 py-4 rounded-2xl text-lg font-black transition-all outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                        activeSection === item.id 
                          ? 'bg-brand-50 text-brand-700 translate-x-2' 
                          : 'text-zinc-600 hover:bg-zinc-50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
                <div className="p-6 border-t border-zinc-100">
                  <div className="text-[10px] font-black tracking-[0.2em] uppercase bg-zinc-900 px-5 py-3 rounded-xl text-white text-center shadow-lg shadow-zinc-200">
                    Lei n.º 9-A/2026
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-20 sm:pt-48 sm:pb-40 overflow-hidden min-h-[60vh] flex items-center">
        <div className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 text-center md:text-left w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto md:mx-0"
          >
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-brand-50 text-brand-700 text-[9px] sm:text-[10px] font-black tracking-[0.2em] mb-6 sm:mb-10 border border-brand-100 shadow-sm">
              <Calendar className="w-3.5 h-3.5 sm:w-4 h-4" />
              PUBLICADO EM 6 DE MARÇO DE 2026
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-bold text-zinc-900 tracking-tight mb-8 sm:mb-10 leading-[0.95] font-display">
              Fomento de Oferta de <span className="text-gradient">Habitação</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-zinc-600 mb-10 sm:mb-14 leading-relaxed font-medium max-w-3xl">
              O Governo está autorizado a aprovar medidas de desagravamento fiscal focadas na <span className="text-brand-600 font-bold">Habitação Própria (HPP)</span> e na <span className="text-brand-600 font-bold">autoconstrução</span>.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 sm:gap-5">
              <button 
                onClick={() => scrollTo('section-1')}
                className="px-8 py-4 sm:px-10 sm:py-5 bg-brand-600 text-white font-black rounded-2xl sm:rounded-3xl hover:bg-brand-700 hover:scale-[1.05] active:scale-[0.95] transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl shadow-brand-200"
              >
                Consultar Medidas <ArrowRight className="w-5 h-5 sm:w-6 h-6" />
              </button>
              <a 
                href="https://diariodarepublica.pt/dr/detalhe/lei/9-a-2026-1068965400" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 sm:px-10 sm:py-5 bg-white border-2 sm:border-4 border-zinc-100 text-zinc-800 font-black rounded-2xl sm:rounded-3xl hover:bg-zinc-50 hover:border-zinc-200 transition-all duration-500 text-center"
              >
                Ler Diário da República
              </a>
            </div>
          </motion.div>
        </div>
        
        {/* Abstract Background Elements with Parallax Effect */}
        <motion.div 
          animate={{ 
            x: isMobileMenuOpen ? 40 : 0,
            scale: isMobileMenuOpen ? 1.05 : 1,
            opacity: isMobileMenuOpen ? 0.2 : 0.3
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-0 right-0 w-full h-full -z-0 pointer-events-none"
        >
          <div className="absolute top-0 right-0 w-[40vw] h-[40vw] min-w-[300px] min-h-[300px] bg-brand-100 rounded-full blur-[100px] sm:blur-[150px] -mr-[10vw] -mt-[10vw]"></div>
          <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] min-w-[250px] min-h-[250px] bg-blue-50 rounded-full blur-[80px] sm:blur-[120px] -ml-[5vw] -mb-[5vw]"></div>
        </motion.div>
      </header>

      <main id="main-content" className="max-w-7xl 2xl:max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pb-40">
        {/* Quick Stats / Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mb-24 sm:mb-40">
          {QUICK_STATS.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className={`p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] relative overflow-hidden shadow-2xl shadow-zinc-200/60 group flex flex-col justify-between min-h-[280px] sm:min-h-[320px] ${
                stat.theme === 'dark' ? 'bg-zinc-900 text-white' : 
                stat.theme === 'brand' ? 'bg-brand-600 text-white' : 
                'bg-white border border-zinc-100'
              }`}
              role="article"
              aria-labelledby={`stat-title-${i}`}
            >
              <div className="relative z-10">
                <p className={`text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] mb-4 sm:mb-6 ${stat.theme === 'light' ? 'text-zinc-500' : 'opacity-60'}`}>{stat.label}</p>
                <h3 id={`stat-title-${i}`} className="text-4xl sm:text-5xl font-black mb-4 sm:mb-6 tracking-tighter group-hover:scale-105 transition-transform origin-left duration-500">{stat.value}</h3>
                <p className={`text-sm leading-relaxed font-medium ${stat.theme === 'light' ? 'text-zinc-600' : 'opacity-80'}`}>{stat.desc}</p>
              </div>
              <stat.icon aria-hidden="true" className={`absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-32 h-32 sm:w-48 sm:h-48 opacity-10 group-hover:rotate-12 transition-transform duration-700 ${stat.theme === 'light' ? 'text-zinc-900' : 'text-white'}`} />
            </motion.div>
          ))}
        </div>

        {/* Main Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Sidebar Navigation for Desktop */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-32 h-fit">
            <div className="space-y-2 mb-12">
              {NAV_ITEMS.map((item) => (
                <button 
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`flex items-center gap-4 w-full px-6 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all duration-500 ${
                    activeSection === item.id 
                      ? 'bg-brand-600 text-white shadow-2xl shadow-brand-200 translate-x-3' 
                      : 'text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full transition-all duration-500 ${activeSection === item.id ? 'bg-white scale-150' : 'bg-transparent'}`} />
                  {item.label}
                </button>
              ))}
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="p-8 bg-zinc-950 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-zinc-200"
            >
              <div className="relative z-10">
                <p className="text-[10px] font-black text-brand-400 uppercase tracking-[0.3em] mb-4">Autorização Legislativa</p>
                <div className="flex items-center gap-4 text-3xl font-black">
                  <Calendar className="w-8 h-8 text-brand-400" />
                  180 Dias
                </div>
              </div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand-500/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
            </motion.div>
          </aside>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-32">
            <Section id="section-0" title="Objeto e Objetivo" icon={Info}>
              <div className="prose prose-zinc max-w-none">
                <p className="text-xl sm:text-2xl text-zinc-600 leading-relaxed mb-12 font-medium">
                  A Lei n.º 9-A/2026 autoriza o Governo a aprovar incentivos fiscais à construção, reabilitação, venda e arrendamento de imóveis habitacionais. Esta autorização legislativa visa combater a crise habitacional através do desagravamento fiscal em quatro códigos fundamentais:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                  {['Código do IVA', 'Código do IRS', 'Estatuto Benefícios Fiscais', 'Código do IMT'].map((code, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -10, scale: 1.05 }}
                      className="p-6 sm:p-8 bg-white border border-zinc-100 rounded-[1.5rem] sm:rounded-[2rem] text-center shadow-sm hover:shadow-2xl transition-all duration-500"
                    >
                      <div className="w-12 h-12 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
                        <FileText className="w-6 h-6 text-brand-600" />
                      </div>
                      <span className="text-[10px] font-black text-zinc-900 uppercase tracking-[0.2em] leading-tight block">{code}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Section>

            <Section id="section-1" title="Medidas Detalhadas para HPP" icon={CheckCircle2}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <Card 
                  icon={ShieldCheck}
                  title="Isenção Total de IMT e Selo"
                  description="Isenção na 1.ª aquisição de imóvel para HPP, desde que seja Habitação de Custos Controlados (HCC) e o valor não exceda o limite do 2.º escalão do IMT."
                  highlight="Isenção IMT/IS"
                />
                <Card 
                  icon={Building2}
                  title="IVA a 6% na Construção"
                  description="Taxa reduzida aplicável a empreitadas de construção ou reabilitação de imóveis destinados a habitação própria e permanente ou arrendamento habitacional."
                  highlight="IVA Reduzido"
                />
                <Card 
                  icon={TrendingDown}
                  title="Dedução IRS Arrendatários"
                  description="Aumento do limite anual de dedução de rendas de 600€ para 1000€ em sede de IRS, exclusivo para contratos de habitação permanente."
                  highlight="IRS Arrendamento"
                />
                <Card 
                  icon={Percent}
                  title="Reinvestimento de Mais-Valias"
                  description="Exclusão de tributação se o valor da venda for reinvestido na compra de HPP ou em imóveis para arrendamento habitacional."
                  highlight="Mais-Valias"
                />
              </div>
            </Section>

            <Section id="section-2" title="Foco: Autoconstrução e Reabilitação" icon={Key}>
              <div className="space-y-10">
                <div className="bg-brand-50 p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] border border-brand-100 shadow-sm relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-2xl sm:text-3xl font-black mb-10 flex items-center gap-4 text-brand-900">
                      <div className="w-4 h-12 bg-brand-600 rounded-full"></div>
                      Regime de Restituição Parcial do IVA
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16">
                      <div className="space-y-8">
                        <h4 className="font-black text-brand-800 text-[10px] uppercase tracking-[0.3em]">Quem pode beneficiar?</h4>
                        <ul className="space-y-5 text-brand-900/70">
                          <li className="flex items-start gap-4">
                            <div className="w-7 h-7 bg-brand-200 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <CheckCircle2 className="w-4 h-4 text-brand-700" />
                            </div>
                            <span className="font-bold text-base sm:text-lg">Pessoas singulares (indivíduos) que promovam a obra.</span>
                          </li>
                          <li className="flex items-start gap-4">
                            <div className="w-7 h-7 bg-brand-200 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <CheckCircle2 className="w-4 h-4 text-brand-700" />
                            </div>
                            <span className="font-bold text-base sm:text-lg">Imóveis destinados exclusivamente a Habitação Própria e Permanente.</span>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-8">
                        <h4 className="font-black text-brand-800 text-[10px] uppercase tracking-[0.3em]">O que é abrangido?</h4>
                        <ul className="space-y-5 text-brand-900/70">
                          <li className="flex items-start gap-4">
                            <div className="w-7 h-7 bg-brand-200 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <CheckCircle2 className="w-4 h-4 text-brand-700" />
                            </div>
                            <span className="font-bold text-base sm:text-lg">Empreitadas de construção e reabilitação (contratos entre set/2025 e dez/2029).</span>
                          </li>
                          <li className="flex items-start gap-4">
                            <div className="w-7 h-7 bg-brand-200 rounded-xl flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                              <CheckCircle2 className="w-4 h-4 text-brand-700" />
                            </div>
                            <span className="font-bold text-base sm:text-lg">Projetos de arquitetura, engenharia e estudos de especialidade (restituição de 50% do IVA).</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-16 p-6 sm:p-8 bg-white/50 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-brand-200/50 text-sm sm:text-base text-brand-900 font-bold italic shadow-sm">
                      "A restituição visa compensar a diferença entre a taxa normal suportada e a taxa reduzida pretendida pelo Governo para incentivar a autoconstrução."
                    </div>
                  </div>
                  <Building2 className="absolute -bottom-16 -right-16 w-48 h-48 sm:w-80 sm:h-80 text-brand-600/5 group-hover:rotate-6 transition-transform duration-1000" />
                </div>

                <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-700">
                  <h3 className="text-2xl sm:text-3xl font-black mb-8 flex items-center gap-4">
                    <div className="w-4 h-12 bg-zinc-900 rounded-full"></div>
                    CIA: Investimento para Arrendamento
                  </h3>
                  <p className="text-zinc-600 font-bold text-base sm:text-lg mb-12">
                    Regime para investidores que coloquem imóveis no mercado de arrendamento habitacional:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {[
                      { label: 'IMT e Selo', value: 'Isenção Total', desc: 'Na aquisição do imóvel' },
                      { label: 'IMI (8 Anos)', value: 'Isenção Total', desc: 'Período inicial de detenção' },
                      { label: 'IMI (Posterior)', value: 'Redução 50%', desc: 'Sobre a taxa em vigor' }
                    ].map((item, i) => (
                      <div key={i} className="p-6 sm:p-8 bg-zinc-50 rounded-[2rem] sm:rounded-[2.5rem] border border-zinc-100 hover:border-brand-200 hover:bg-brand-50/30 transition-all duration-500 group">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-4 group-hover:text-brand-600 transition-colors">{item.label}</p>
                        <p className="text-xl sm:text-2xl font-black text-zinc-900 mb-2">{item.value}</p>
                        <p className="text-xs sm:text-sm text-zinc-600 font-bold">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Section>

            <Section id="section-3" title="Limites e Condições" icon={ShieldCheck}>
              <div className="bg-zinc-950 p-8 sm:p-16 rounded-[2.5rem] sm:rounded-[4rem] text-white shadow-3xl">
                <p className="text-xl sm:text-2xl font-bold mb-12 sm:text-brand-400 uppercase tracking-widest font-display">Critérios de Elegibilidade:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-16">
                  {ELIGIBILITY_CRITERIA.map((item, i) => (
                    <div key={i} className="space-y-4 sm:space-y-6 group">
                      <div className="text-4xl sm:text-6xl font-black text-white/5 group-hover:text-brand-500/20 transition-colors duration-700">{item.num}</div>
                      <p className="font-bold text-xl sm:text-2xl tracking-tight font-display">{item.title}</p>
                      <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-bold">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section id="section-4" title="Perguntas Frequentes" icon={HelpCircle}>
              <div className="space-y-4 max-w-3xl mx-auto">
                {[
                  { q: "Quem tem direito à isenção de IMT?", a: "Jovens até aos 35 anos na primeira aquisição de habitação própria e permanente, com limites de valor de transação." },
                  { q: "O IVA a 6% aplica-se a todas as obras?", a: "Não, apenas a empreitadas de construção ou reabilitação destinadas a habitação própria e permanente ou arrendamento acessível." },
                  { q: "Como funciona a restituição do IVA na autoconstrução?", a: "É um regime onde o Estado devolve parte do IVA suportado (taxa normal) para que o custo final reflita a taxa reduzida de 6%." },
                  { q: "Qual o prazo desta autorização legislativa?", a: "O Governo tem 180 dias a partir de 6 de março de 2026 para regulamentar estas medidas." }
                ].map((faq, i) => {
                  const [isOpen, setIsOpen] = useState(false);
                  return (
                    <motion.div 
                      key={i}
                      initial={false}
                      className="border border-zinc-100 rounded-3xl overflow-hidden bg-white hover:border-brand-200 transition-colors"
                    >
                      <button 
                        className="w-full px-8 py-6 text-left flex justify-between items-center group outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${i}`}
                      >
                        <span className="font-bold text-lg text-zinc-800 group-hover:text-brand-600 transition-colors">{faq.q}</span>
                        <ChevronDown className={`w-5 h-5 text-zinc-400 group-hover:text-brand-600 transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div 
                            id={`faq-a-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-8 pb-6 text-zinc-600 font-medium leading-relaxed overflow-hidden"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </Section>
          </div>
        </div>
      </main>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-40 p-4 bg-zinc-900 text-white rounded-2xl shadow-2xl hover:bg-brand-600 hover:scale-110 active:scale-95 transition-all duration-300 group"
            aria-label="Voltar ao topo"
          >
            <ArrowRight className="w-6 h-6 -rotate-90 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-zinc-950 text-white pt-32 pb-16 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-16 mb-24">
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-brand-500/20">
                  <Scale className="text-white w-7 h-7" />
                </div>
                <span className="font-black text-4xl tracking-tighter">HABITAÇÃO<span className="text-brand-500">2026</span></span>
              </div>
              <p className="text-zinc-400 leading-relaxed font-bold text-base sm:text-lg">
                Este portal é uma ferramenta informativa sobre a Lei n.º 9-A/2026. Consulte sempre o Diário da República para textos legais definitivos e aconselhamento profissional para decisões fiscais.
              </p>
            </div>
            <div className="flex flex-wrap gap-20">
              <div className="space-y-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-700">Navegação</h4>
                <ul className="space-y-5 text-xs font-black text-zinc-600 uppercase tracking-widest">
                  {NAV_ITEMS.map(item => (
                    <li key={item.id}>
                      <button 
                        onClick={() => scrollTo(item.id)} 
                        className="hover:text-brand-500 transition-all duration-300 hover:translate-x-2 block"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-16 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
            <div className="flex gap-12">
              <span className="hover:text-zinc-300 cursor-pointer transition-colors">Política de Privacidade</span>
              <span className="hover:text-zinc-300 cursor-pointer transition-colors">Termos e Condições</span>
              <span className="hover:text-zinc-300 cursor-pointer transition-colors">Declaração de Acessibilidade</span>
            </div>
            <p className="text-zinc-500">© 2026 Portal Informativo Habitação Portugal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
