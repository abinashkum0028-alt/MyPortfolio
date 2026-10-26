import { useState, useEffect } from 'react';
import type { ChangeEvent, MouseEvent as ReactMouseEvent } from 'react';
import { ArrowUpRight, ArrowRight, Menu, X, ExternalLink, Download, ArrowLeft, Sparkles, ShieldCheck, Activity, Music, Compass, CheckCircle2, Zap, Check, Play, Pause, Volume2 } from 'lucide-react';

type PageLink = { page: 'home' | 'work' | 'resume'; hash?: string };

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'work' | 'resume'>('home');
  
  // Interactive Hero Canvas Mouse Position State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [heroMouse, setHeroMouse] = useState({ x: 50, y: 50 }); // percentage for fluid gradient follow
  
  // Custom Liquid Glass Cursor Position State (smooth lerp)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorTarget, setCursorTarget] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  const [activeTab, setActiveTab] = useState('all');

  // Interactive BPM State for Music News Publishing Preview
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpmValue, setBpmValue] = useState(128);

  // Handle scroll for navigation styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Liquid glass cursor tracking & smooth interpolation loop
  useEffect(() => {
    const handleMouseMove = (e: globalThis.MouseEvent) => {
      setCursorTarget({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animateCursor = () => {
      setCursorPos((prev) => ({
        x: lerp(prev.x, cursorTarget.x, 0.2),
        y: lerp(prev.y, cursorTarget.y, 0.2),
      }));
      animationFrameId = requestAnimationFrame(animateCursor);
    };

    animationFrameId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [cursorTarget]);

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleHeroMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHeroMouse({ x, y });
  };

  const navLinks: (PageLink & { name: string })[] = [
    { name: 'Work', page: 'work' },
    { name: 'Approach', page: 'home', hash: '#approach' },
    { name: 'About', page: 'home', hash: '#about' },
    { name: 'Resume', page: 'resume' },
  ];

  const handleNavClick = (e: ReactMouseEvent<HTMLAnchorElement | HTMLButtonElement>, link: PageLink) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    if (link.page !== currentPage) {
      setCurrentPage(link.page);
    }

    setTimeout(() => {
      if (link.hash) {
        const element = document.querySelector(link.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo(0, 0);
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-stone-900 font-sans selection:bg-[#ccff00] selection:text-stone-900 relative cursor-default">
      
      {/* Live Animated Liquid Glass Cursor Dot */}
      <div 
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full backdrop-blur-md transition-transform duration-75 ease-out ${
          isHovered ? 'w-16 h-16 bg-white/30 border border-white/60 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)] -translate-x-1/2 -translate-y-1/2' : 'w-7 h-7 bg-stone-900/40 border border-white/80 shadow-[0_4px_16px_0_rgba(0,0,0,0.15)] -translate-x-1/2 -translate-y-1/2'
        }`}
        style={{
          transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-stone-900/20 pointer-events-none animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-[#F9F8F6]/95 backdrop-blur-md border-b border-stone-200 py-4 shadow-sm' : 'bg-transparent py-6'
        } px-6 md:px-12 flex justify-between items-center`}
      >
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            setCurrentPage('home');
            window.scrollTo(0,0);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="text-xl tracking-tight font-medium hover:text-[#88aa00] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
        >
          Abinash Kumar
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.hash || '#'} 
              onClick={(e) => handleNavClick(e, link)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="hover:text-stone-500 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:ring-offset-4 focus:ring-offset-[#F9F8F6]"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage !== 'home') {
                setCurrentPage('home');
                setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
              } else {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="ml-4 px-5 py-2.5 bg-stone-900 text-[#F9F8F6] hover:bg-[#ccff00] hover:text-stone-900 transition-colors rounded-none focus:outline-none focus:ring-2 focus:ring-[#ccff00] focus:ring-offset-4 focus:ring-offset-[#F9F8F6]"
          >
            Contact Me
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 -mr-2 text-stone-900 focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[72px] bg-[#F9F8F6] z-40 px-6 py-8 flex flex-col gap-6 text-2xl font-medium border-t border-stone-200 md:hidden animate-fadeIn">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.hash || '#'}
              onClick={(e) => handleNavClick(e, link)}
              className="hover:text-[#88aa00] transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              setCurrentPage('home');
              setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100);
            }}
            className="mt-4 text-[#88aa00] transition-colors"
          >
            Contact Me
          </a>
        </div>
      )}

      {currentPage === 'home' && (
        <main>
          {/* 1. Hero Section with Interactive Anthracite-Inspired Fluid Background spanning Full Width */}
          <section 
            onMouseMove={handleHeroMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="pt-44 pb-32 px-6 md:px-16 w-full text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[85vh]"
          >
            {/* Interactive Mouse-Following Light Mesh Gradient Background */}
            <div 
              className="absolute inset-0 pointer-events-none transition-all duration-300 ease-out z-0 opacity-90"
              style={{
                background: `radial-gradient(1000px circle at ${heroMouse.x}% ${heroMouse.y}%, rgba(204, 255, 0, 0.25), rgba(16, 185, 129, 0.1) 40%, transparent 85%), radial-gradient(800px circle at ${100 - heroMouse.x}% ${100 - heroMouse.y}%, rgba(147, 197, 253, 0.15), transparent 75%)`
              }}
            ></div>

            {/* Subtle Grid Lines Overlay spanning full width */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e5e5_1px,transparent_1px),linear-gradient(to_bottom,#e5e5e5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none z-0"></div>

            <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/95 backdrop-blur-md border border-stone-300 text-stone-800 text-xs font-mono uppercase tracking-widest rounded-full shadow-sm mb-6">
                <Sparkles size={13} className="text-[#88aa00]" /> UI/UX & Interaction Design
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1.08] mb-6">
                I turn complex digital experiences into intuitive products.
              </h1>
              
              <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed mb-10 max-w-2xl">
                UI/UX Designer with 5 years of experience crafting intuitive digital experiences across telecom and B2B SaaS. Based in Bengaluru, India.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={(e) => handleNavClick(e, { page: 'work' })}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-[#F9F8F6] font-medium hover:bg-[#ccff00] hover:text-stone-900 transition-all rounded-none group focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
                >
                  View All Selected Work
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={(e) => handleNavClick(e, { page: 'resume' })}
                  className="inline-flex items-center gap-2 px-6 py-4 bg-white/95 backdrop-blur-md border border-stone-300 text-stone-900 font-medium hover:bg-stone-100 transition-all shadow-sm"
                >
                  View Resume <ExternalLink size={16} />
                </button>
              </div>

            </div>
          </section>

          {/* 2. Featured Case Studies */}
          <section id="work" className="border-t border-stone-200">
            
            {/* Lyca Mobile - B2C Impact (Interactive Prototype 1) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 max-w-[1600px] mx-auto border-b border-stone-200">
              <div className="lg:col-span-5 p-6 md:p-12 lg:py-24 lg:pr-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-stone-200 bg-[#F9F8F6]">
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 border border-stone-300 text-xs tracking-widest uppercase text-stone-600 w-max bg-white">
                  <Sparkles size={13} className="text-[#88aa00]" /> Featured Case Study • B2C Telecom
                </div>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">
                  Auto-Renewal Management for Lyca Mobile
                </h2>
                <p className="text-lg text-stone-600 mb-6 leading-relaxed font-light">
                  At Lyca, the default auto-renewal feature for telecom plans was highly successful for business revenue, but it created a massive user experience bottleneck. Users could only disable auto-renewal by calling customer care. This resulted in high call center costs, deep user frustration, and a degradation of brand trust.
                </p>
                <p className="text-base text-stone-500 mb-8 leading-relaxed font-light">
                  The challenge was to introduce a self-service digital cancellation method that satisfied the user's need for control, while employing strategic friction to protect the business's recurring revenue goals.
                </p>
                
                <div className="space-y-6 text-sm md:text-base border-t border-stone-200 pt-6">
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Impact & Objective</h3>
                    <p className="text-stone-600">Designed a friction-minimized subscriber dashboard giving users crystal-clear visibility into recurring charges, resulting in higher trust and retention.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Design Role & Tools</h3>
                    <p className="text-stone-600">UI/UX Designer • Figma, Interactive Prototyping, Design Systems</p>
                  </div>
                </div>

                <a 
                  href="https://www.behance.net/gallery/246087055/UX-Case-Study-Auto-Renewal-Management" 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-10 inline-flex items-center gap-2 font-medium group hover:text-[#88aa00] transition-colors w-fit bg-stone-900 text-white px-6 py-3.5 hover:bg-[#ccff00] hover:text-stone-900"
                >
                  Explore Behance Case Study <ArrowUpRight size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
              
              {/* Interactive Motion Mockup: Lyca Mobile */}
              <div className="lg:col-span-7 bg-stone-100 flex items-center justify-center relative overflow-hidden group min-h-[550px] p-8">
                <div className="absolute top-6 right-6 bg-white border border-stone-200 text-stone-800 text-xs font-mono px-3 py-1.5 rounded-full z-20 shadow-sm flex items-center gap-1.5">
                   <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span> Live Motion Preview • Hover to Interact
                </div>

                <div className="w-[320px] bg-white rounded-[2.5rem] shadow-xl border-[8px] border-stone-200 p-5 relative overflow-hidden transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                   <div className="flex justify-between items-center mb-4 pt-2">
                     <span className="text-xs font-bold text-stone-900 tracking-wider">LYCAMOBILE</span>
                     <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-xs">📶</div>
                   </div>
                   
                   <div className="bg-stone-50 p-4 rounded-2xl mb-4 border border-stone-200 group-hover:border-[#88aa00]/40 transition-colors">
                      <div className="text-[10px] uppercase font-mono text-stone-500">Active Subscription</div>
                      <div className="text-base font-bold text-stone-900">National Plus 30GB</div>
                      <div className="w-full bg-stone-200 h-2 rounded-full mt-3 overflow-hidden">
                        <div className="bg-stone-900 h-full w-[70%] group-hover:w-[92%] transition-all duration-1000"></div>
                      </div>
                      <div className="flex justify-between items-center mt-2 text-[10px] text-stone-500 font-mono">
                         <span>28 GB used</span>
                         <span className="text-emerald-700 font-bold">Renews in 3 days</span>
                      </div>
                   </div>

                   <div className="bg-white border border-stone-200 p-4 rounded-2xl shadow-sm mb-4">
                      <div className="flex justify-between items-center mb-2">
                         <span className="text-xs font-medium text-stone-900">Auto-Renewal Control</span>
                         <div className="w-11 h-6 bg-stone-300 group-hover:bg-[#ccff00] rounded-full transition-colors duration-500 p-1 flex items-center cursor-pointer">
                            <div className="w-4 h-4 bg-stone-900 rounded-full shadow transform translate-x-0 group-hover:translate-x-5 transition-transform duration-500"></div>
                         </div>
                      </div>
                      <div className="text-[10px] text-stone-500 h-6 relative overflow-hidden">
                         <span className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">Status: Disabled (Manual Top-up)</span>
                         <span className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-emerald-700 font-semibold flex items-center gap-1">
                           <ShieldCheck size={12} /> Active: 10% Loyalty Bonus Applied
                         </span>
                      </div>
                   </div>

                   <div className="bg-stone-900 text-white text-[10px] py-2.5 px-4 rounded-xl flex items-center gap-2 transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">
                      <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse"></span>
                      Preference Saved • 23 Markets Synced
                   </div>
                </div>
              </div>
            </div>

            {/* Lekha - B2B SaaS Impact (Split-View Validating File Interactive Prototype) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 max-w-[1600px] mx-auto border-b border-stone-200">
              
              <div className="lg:col-span-7 bg-stone-100 flex items-center justify-center relative overflow-hidden group min-h-[620px] order-2 lg:order-1 border-r border-stone-200 p-8 md:p-12">
                <div className="absolute top-6 left-6 bg-white border border-stone-200 text-stone-800 text-xs font-mono px-3.5 py-1.5 rounded-full z-20 shadow-sm flex items-center gap-2">
                   <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span> Validating File • Split-View OCR Engine
                </div>

                <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-stone-300 p-6 relative overflow-hidden transform group-hover:scale-[1.02] transition-all duration-700">
                   <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-5">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-400"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                          <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>
                        <span className="text-xs font-mono text-stone-500 bg-stone-100 px-3 py-1 rounded-md">lekha.app/workspace/invoice-validation</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 flex items-center gap-1">
                        <ShieldCheck size={13} /> Tally Prime Synced
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 relative overflow-hidden flex flex-col justify-between h-[280px]">
                         <div>
                           <div className="flex justify-between items-center mb-3">
                             <span className="text-xs font-mono font-bold text-stone-500">RAW INVOICE SCAN</span>
                             <span className="text-[10px] font-mono text-stone-400">PDF • 2.4 MB</span>
                           </div>
                           <div className="space-y-2.5 py-3">
                             <div className="h-2.5 bg-stone-200 rounded w-full"></div>
                             <div className="h-2.5 bg-stone-200 rounded w-4/5"></div>
                             <div className="h-2.5 bg-stone-200 rounded w-11/12"></div>
                             <div className="h-2 bg-stone-200 rounded w-2/3"></div>
                             <div className="h-2 bg-stone-200 rounded w-3/4"></div>
                           </div>
                         </div>
                         <div className="border-t border-stone-200 pt-2 flex justify-between text-[10px] text-stone-500 font-mono">
                           <span>Page 1 of 1</span>
                           <span className="text-emerald-700 font-semibold">300 DPI Clear</span>
                         </div>
                         <div className="absolute inset-x-0 h-1 bg-emerald-500 top-0 group-hover:translate-y-[260px] transition-transform duration-1000 ease-in-out shadow-[0_0_20px_#10b981]"></div>
                      </div>

                      <div className="space-y-3.5 flex flex-col justify-between">
                         <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                            <div className="text-[10px] font-mono text-stone-500 mb-1">EXTRACTED VENDOR</div>
                            <div className="text-xs font-bold text-stone-900 group-hover:text-emerald-700 transition-colors flex items-center justify-between">
                              <span>TechCorp Global Inc.</span>
                              <Check size={14} className="text-emerald-600" />
                            </div>
                         </div>
                         <div className="bg-stone-50 p-3.5 rounded-xl border border-stone-200">
                            <div className="text-[10px] font-mono text-stone-500 mb-1">LEDGER MATCH</div>
                            <div className="text-xs font-bold text-stone-900">Accounts Payable (Tally)</div>
                            <div className="text-[10px] text-stone-500 font-mono mt-0.5">Acc # 4092-B</div>
                         </div>
                         <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-xl">
                            <div className="text-[10px] font-mono text-emerald-800 mb-0.5">CRYPTOGRAPHIC HASH</div>
                            <div className="text-[10px] font-mono font-bold text-emerald-900 truncate">SHA256: 8f9b...3c12</div>
                         </div>
                      </div>
                   </div>

                   <div className="mt-5 bg-stone-900 text-white text-xs py-3 px-4 rounded-xl flex items-center justify-between shadow-xl">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse"></span>
                        <span className="font-medium">File Validation Complete • Ready for Ledger Sync</span>
                      </div>
                      <span className="text-[#ccff00] font-mono text-[10px]">100% Match</span>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-5 p-6 md:p-12 lg:py-24 lg:pl-16 flex flex-col justify-center order-1 lg:order-2 bg-[#F9F8F6]">
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 border border-stone-300 text-xs tracking-widest uppercase text-stone-600 w-max bg-white">
                  <Sparkles size={13} className="text-[#88aa00]" /> Featured Case Study • B2B Enterprise
                </div>
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">
                  Lekha — Accounts Payable Automation
                </h2>
                <p className="text-lg text-stone-600 mb-8 leading-relaxed font-light">
                  Lekha is a B2B SaaS accounts payable automation platform purpose-built for the Tally Prime ecosystem. It transforms manual, data-heavy invoice processing into an intuitive and seamless digital workflow. By streamlining document validation and direct ledger synchronization, the platform reduces cognitive load and makes complex financial operations effortless for enterprise teams.
                </p>
                
                <div className="space-y-6 text-sm md:text-base border-t border-stone-200 pt-6">
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Impact & Objective</h3>
                    <p className="text-stone-600">Eliminated manual data entry errors and compliance bottlenecks by introducing split-view document auditing and cryptographic verification.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 mb-1">Design Role & Tools</h3>
                    <p className="text-stone-600">UI/UX Designer • Figma, Design Systems, Enterprise Workflows</p>
                  </div>
                </div>

                <a 
                  href="https://www.behance.net/gallery/257560915/Lekha-B2B-SaaS-Accounts-Payable-UXUI-Case-Study" 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-10 inline-flex items-center gap-2 font-medium group hover:text-[#88aa00] transition-colors w-fit bg-stone-900 text-white px-6 py-3.5 hover:bg-[#ccff00] hover:text-stone-900"
                >
                  Explore Behance Case Study <ArrowUpRight size={18} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

            <div className="py-20 flex flex-col items-center justify-center bg-stone-100 text-center px-6">
              <h3 className="text-3xl font-medium tracking-tight mb-4">Explore All 5 Design Projects</h3>
              <p className="text-stone-600 max-w-md mb-8 font-light">Browse the comprehensive archive including healthcare apps, digital publishing portals, and traveler tools.</p>
              <button 
                onClick={(e) => handleNavClick(e, { page: 'work' })}
                className="inline-flex items-center gap-3 px-8 py-4 bg-stone-900 text-[#F9F8F6] font-medium hover:bg-[#ccff00] hover:text-stone-900 transition-all rounded-none group focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
              >
                View Complete Works Archive
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* 4. Design Approach */}
          <section id="approach" className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-stone-200">
            <div className="max-w-3xl mb-20">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">Design Approach</h2>
              <blockquote className="text-xl md:text-3xl text-stone-800 leading-tight font-light border-l-2 border-[#ccff00] pl-6 md:pl-8 py-2">
                “Advocating for ethical UX design. Strategic friction is a vital tool for user security, completely opposing deceptive dark patterns.”
              </blockquote>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 text-sm">
              {[
                { phase: '01 / Understand', desc: 'Immersing in business logic, technical constraints, and genuine user context before touching a canvas.' },
                { phase: '02 / Define', desc: 'Structuring problems clearly. Formulating hypotheses and aligning cross-functional teams on success metrics.' },
                { phase: '03 / Explore', desc: 'Divergent thinking. Mapping user journeys, sketching rapidly, and exploring multiple architectural directions.' },
                { phase: '04 / Prototype', desc: 'Crafting high-fidelity, interactive representations to test logic, flow, and visual hierarchy.' },
                { phase: '05 / Validate', desc: 'Gathering feedback, defending design decisions with evidence, and collaborating closely with engineering for delivery.' }
              ].map((step) => (
                <div key={step.phase} className="group">
                  <div className="h-0.5 w-full bg-stone-300 mb-6 group-hover:bg-[#ccff00] transition-colors"></div>
                  <h4 className="font-semibold text-stone-900 mb-3 tracking-wide">{step.phase}</h4>
                  <p className="text-stone-600 leading-relaxed font-light">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 5. About Summary */}
          <section id="about" className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto border-b border-stone-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
              
              <div className="lg:col-span-6">
                <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">About Me</h2>
                <div className="prose prose-stone text-stone-600 leading-relaxed font-light text-lg">
                  <p className="mb-6">
                    I am a results-driven UI/UX Designer with 5 years of experience crafting intuitive, visually compelling digital experiences. My journey into product design is unconventional, rooted in a multidisciplinary background in textile and print design from NIFT Bengaluru.
                  </p>
                  <p className="mb-6">
                    After developing an eye for color theory, pattern composition, and manufacturing constraints, I pursued an M.A. in Interaction Design at Harbour.Space University in Barcelona to transition into digital interfaces.
                  </p>
                  <p>
                    Today, I leverage this aesthetic discipline and user-centered approach to build scalable interfaces that solve complex architectural problems, increase user engagement, and ensure brand consistency across web and mobile platforms.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-center bg-stone-100 p-8 md:p-12 border border-stone-200">
                <h3 className="text-2xl font-medium mb-6">Want the full professional breakdown?</h3>
                <p className="text-stone-600 mb-8 leading-relaxed font-light">
                  View my dedicated resume page for a complete history of my work experience, education, skills, and certifications, or download the PDF version directly.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button 
                    onClick={(e) => handleNavClick(e, { page: 'resume' })}
                    className="inline-flex items-center gap-2 bg-stone-900 text-[#F9F8F6] font-medium hover:bg-[#ccff00] hover:text-stone-900 px-6 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
                  >
                    View Full Resume <ArrowRight size={16} />
                  </button>
                  <a 
                    href="https://drive.google.com/file/d/1kYiPrQ8QD1G73_CysX-TwmGG5WwJs90C/view?usp=sharing" 
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-stone-900 font-medium hover:bg-stone-200 px-6 py-3 border border-stone-300 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
                  >
                    Download PDF <Download size={16} />
                  </a>
                </div>
              </div>

            </div>
          </section>

          {/* 6. Interactive Light Mode Visual Art Canvas (Placed right above Contact) */}
          <section className="py-20 px-6 md:px-12 max-w-[1600px] mx-auto">
            <div 
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setMousePos({ x: 0, y: 0 })}
              className="w-full aspect-[16/10] md:aspect-[21/10] bg-stone-900 rounded-3xl border border-stone-800 flex flex-col justify-between relative overflow-hidden group shadow-2xl cursor-crosshair p-8 md:p-12"
            >
               <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
               <div className="absolute top-10 left-10 w-[500px] h-[300px] bg-gradient-to-tr from-[#ccff00]/15 via-emerald-500/10 to-transparent rounded-full blur-3xl opacity-75 pointer-events-none"></div>
               <div className="absolute bottom-10 right-10 w-[600px] h-[350px] bg-gradient-to-bl from-purple-500/15 via-blue-500/10 to-transparent rounded-full blur-3xl opacity-75 pointer-events-none"></div>

               <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-3 bg-stone-800 border border-stone-700 px-4 py-2 rounded-2xl shadow-xl backdrop-blur-md">
                     <div className="w-2.5 h-2.5 rounded-full bg-[#ccff00] animate-pulse"></div>
                     <span className="text-xs font-mono text-stone-200 tracking-wider">NIFT, Bengaluru, India • Bachelor's of Design</span>
                  </div>
                  
                  <div className="flex gap-2 bg-stone-800 p-1.5 rounded-2xl border border-stone-700 backdrop-blur-md">
                     {['all', 'telecom', 'saas', 'heritage'].map((tab) => (
                       <button
                         key={tab}
                         onClick={() => setActiveTab(tab)}
                         className={`px-3 py-1 rounded-xl text-xs font-mono uppercase transition-all ${
                           activeTab === tab ? 'bg-[#ccff00] text-stone-900 font-bold shadow' : 'text-stone-300 hover:text-white'
                         }`}
                       >
                         {tab}
                       </button>
                     ))}
                  </div>
               </div>

               <div 
                 className="relative z-10 my-auto py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-transform duration-200 ease-out"
                 style={{ transform: `translate(${-mousePos.x * 12}px, ${-mousePos.y * 12}px)` }}
               >
                  <div className="lg:col-span-6 space-y-4 text-left">
                     <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#ccff00] text-stone-900 text-xs font-bold uppercase tracking-widest rounded-full shadow-lg">
                        <Sparkles size={13} /> Multidisciplinary Designer & Maker
                     </div>
                     <h3 className="text-3xl md:text-5xl text-white font-medium tracking-tight leading-tight">
                        Blending pattern rhythm with digital systems.
                     </h3>
                     <p className="text-stone-300 text-sm md:text-base font-light leading-relaxed max-w-lg">
                        From hand-crafted textile weave structures at NIFT and Arvind Mills to rigorous enterprise SaaS workflows and telecom self-service portals.
                     </p>
                  </div>

                  <div className="lg:col-span-6 flex flex-wrap items-center justify-center lg:justify-end gap-4 relative">
                     <div className={`w-40 md:w-48 bg-stone-800/95 rounded-2xl border transition-all duration-500 shadow-2xl p-4 flex flex-col justify-between group/card cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${activeTab === 'all' || activeTab === 'telecom' ? 'border-[#ccff00]/60 ring-1 ring-[#ccff00]/30' : 'border-stone-700 opacity-40'}`}>
                        <div className="flex justify-between items-center mb-3">
                           <div className="w-2 h-2 rounded-full bg-[#ccff00]"></div>
                           <span className="text-[9px] font-mono text-stone-300">B2C TELECOM</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="text-xs font-bold text-white">Lyca Auto-Renewal</div>
                          <div className="w-full bg-stone-700 h-2 rounded-full overflow-hidden">
                             <div className="bg-[#ccff00] h-full w-[85%]"></div>
                          </div>
                        </div>
                        <div className="text-[9px] text-[#ccff00] font-mono">Self-service UX</div>
                     </div>

                     <div className={`w-40 md:w-48 bg-stone-800/95 rounded-2xl border transition-all duration-500 shadow-2xl p-4 flex flex-col justify-between group/card cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${activeTab === 'all' || activeTab === 'saas' ? 'border-emerald-400/60 ring-1 ring-emerald-400/30' : 'border-stone-700 opacity-40'}`}>
                        <div className="flex justify-between items-center mb-3">
                           <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                           <span className="text-[9px] font-mono text-stone-300">B2B ENTERPRISE</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="text-xs font-bold text-white">Lekha Tally OCR</div>
                          <div className="space-y-1">
                             <div className="w-full h-1 bg-stone-700 rounded"></div>
                             <div className="w-3/4 h-1 bg-stone-700 rounded"></div>
                          </div>
                        </div>
                        <div className="text-[9px] text-emerald-400 font-mono">Split-view Audit</div>
                     </div>

                     <div className={`w-40 md:w-48 bg-stone-800/95 rounded-2xl border transition-all duration-500 shadow-2xl p-4 flex flex-col justify-between group/card cursor-pointer transform hover:scale-105 hover:-translate-y-2 ${activeTab === 'all' || activeTab === 'heritage' ? 'border-purple-400/60 ring-1 ring-purple-400/30' : 'border-stone-700 opacity-40'}`}>
                        <div className="flex justify-between items-center mb-3">
                           <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                           <span className="text-[9px] font-mono text-stone-300">NIFT HERITAGE</span>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="text-xs font-bold text-white">Textile Weave Study</div>
                          <div className="grid grid-cols-3 gap-1">
                             <div className="h-3 bg-purple-500/30 rounded"></div>
                             <div className="h-3 bg-purple-500/50 rounded"></div>
                             <div className="h-3 bg-purple-500/70 rounded"></div>
                          </div>
                        </div>
                        <div className="text-[9px] text-purple-300 font-mono">Color & Pattern</div>
                     </div>
                  </div>
               </div>

               <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-stone-300 border-t border-stone-800/80 pt-4 gap-2">
                  <span>📍 Bengaluru, India • Ready for Global Impact</span>
                  <span className="text-[#ccff00] flex items-center gap-1.5"><Activity size={13} /> Harbour.Space M.A. Interaction Design</span>
               </div>
            </div>
          </section>
        </main>
      )}

      {/* =====================================================
          ALL WORKS / PROJECTS PAGE VIEW WITH LIGHT MODE COVERS
          ===================================================== */}
      {currentPage === 'work' && (
        <main className="pt-32 pb-24 min-h-screen">
          <div className="px-6 md:px-12 max-w-[1600px] mx-auto mb-16">
            <button 
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo(0,0);
              }}
              className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 font-medium transition-colors mb-12 group focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter mb-6">All Selected Works</h1>
            <p className="text-xl text-stone-600 max-w-2xl font-light">A comprehensive collection of my product design case studies, ranging from enterprise B2B platforms to global B2C telecommunications, healthcare, publishing, and traveler tools.</p>
          </div>

          <div className="border-t border-stone-200 space-y-0">
            
            {/* 1. Auto Renewal Management */}
            <a 
              href="https://www.behance.net/gallery/246087055/UX-Case-Study-Auto-Renewal-Management" 
              target="_blank" 
              rel="noreferrer"
              className="block grid grid-cols-1 md:grid-cols-2 max-w-[1600px] mx-auto border-b border-stone-200 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#ccff00] focus:ring-inset"
            >
              <div className="order-1 bg-stone-100 border-b md:border-b-0 md:border-r border-stone-200 relative overflow-hidden min-h-[480px] flex items-center justify-center p-8">
                 <div className="absolute top-4 left-4 bg-white border border-stone-200 text-stone-800 text-[10px] font-mono px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                   <Zap size={12} className="text-[#88aa00] animate-bounce"/> Interactive Motion Preview
                 </div>
                 
                 <div className="w-[300px] bg-white rounded-[2rem] shadow-xl border-[6px] border-stone-200 p-4 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                   <div className="flex justify-between items-center mb-3">
                     <span className="text-[10px] font-bold text-stone-900 tracking-wider">LYCAMOBILE</span>
                     <span className="text-[10px] bg-stone-100 px-2 py-0.5 rounded text-stone-600 font-mono">23 Markets</span>
                   </div>
                   <div className="bg-stone-50 p-3 rounded-xl mb-3 border border-stone-200">
                      <div className="text-[9px] uppercase font-mono text-stone-500">Subscription Status</div>
                      <div className="text-sm font-bold text-stone-900">National Plus 30GB</div>
                      <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-stone-900 h-full w-[70%] group-hover:w-[95%] transition-all duration-1000"></div>
                      </div>
                   </div>
                   <div className="bg-white border border-stone-200 p-3 rounded-xl shadow-sm">
                      <div className="flex justify-between items-center mb-1">
                         <span className="text-[10px] font-medium text-stone-900">Auto-Renewal Control</span>
                         <div className="w-9 h-5 bg-stone-300 group-hover:bg-[#ccff00] rounded-full transition-colors duration-500 p-0.5 flex items-center">
                            <div className="w-3.5 h-3.5 bg-stone-900 rounded-full shadow transform translate-x-0 group-hover:translate-x-4 transition-transform duration-500"></div>
                         </div>
                      </div>
                      <div className="text-[9px] text-stone-500 h-5 relative overflow-hidden">
                         <span className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0">Manual Top-up Required</span>
                         <span className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-emerald-700 font-semibold flex items-center gap-1">
                           <CheckCircle2 size={10} /> Active • 10% Bonus
                         </span>
                      </div>
                   </div>
                 </div>
              </div>
              <div className="order-2 p-6 md:p-12 lg:p-16 flex flex-col justify-between h-full bg-[#F9F8F6] group-hover:bg-stone-50 transition-colors">
                <div>
                  <div className="text-xs tracking-widest uppercase text-stone-500 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ccff00]"></span> B2C Telecom • Featured Case Study
                  </div>
                  <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Auto-Renewal Management</h3>
                  <p className="text-stone-600 leading-relaxed text-lg max-w-md font-light">
                    Balancing Business Goals and User Control across prepaid and postpaid plans in 23+ international markets. Reduced customer support tickets by transforming opaque subscriptions into transparent user control.
                  </p>
                </div>
                <div className="mt-12 flex items-center gap-2 font-medium group-hover:text-[#88aa00] transition-colors text-stone-900">
                  Read Full Case Study <ArrowUpRight size={18} />
                </div>
              </div>
            </a>

            {/* 2. Lekha Accounts Payable */}
            <a 
              href="https://www.behance.net/gallery/257560915/Lekha-B2B-SaaS-Accounts-Payable-UXUI-Case-Study" 
              target="_blank" 
              rel="noreferrer"
              className="block grid grid-cols-1 md:grid-cols-2 max-w-[1600px] mx-auto border-b border-stone-200 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#ccff00] focus:ring-inset"
            >
              <div className="order-2 md:order-1 p-6 md:p-12 lg:p-16 flex flex-col justify-between h-full bg-[#F9F8F6] group-hover:bg-stone-50 transition-colors">
                <div>
                  <div className="text-xs tracking-widest uppercase text-stone-500 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> B2B SaaS / Enterprise • Featured Case Study
                  </div>
                  <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Lekha — Accounts Payable</h3>
                  <p className="text-stone-600 leading-relaxed text-lg max-w-md font-light">
                    Lekha is a B2B SaaS accounts payable automation platform purpose-built for the Tally Prime ecosystem. It transforms manual, data-heavy invoice processing into an intuitive and seamless digital workflow. By streamlining document validation and direct ledger synchronization, the platform reduces cognitive load and makes complex financial operations effortless for enterprise teams.
                  </p>
                </div>
                <div className="mt-12 flex items-center gap-2 font-medium group-hover:text-[#88aa00] transition-colors text-stone-900">
                  Read Full Case Study <ArrowUpRight size={18} />
                </div>
              </div>
              <div className="order-1 md:order-2 bg-stone-100 border-b md:border-b-0 md:border-l border-stone-200 relative overflow-hidden min-h-[480px] flex items-center justify-center p-8">
                 <div className="absolute top-4 right-4 bg-white border border-stone-200 text-stone-800 text-[10px] font-mono px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                   <Zap size={12} className="text-emerald-600 animate-bounce"/> Validating File • Split-View OCR
                 </div>
                 
                 <div className="w-[90%] max-w-sm bg-white rounded-xl shadow-xl border border-stone-300 p-4 transform group-hover:scale-105 transition-all duration-700">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                      </div>
                      <span className="text-[10px] font-mono text-stone-500">lekha.app/validate</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-[10px]">
                      <div className="bg-stone-50 p-3 rounded-lg border border-stone-200 relative overflow-hidden">
                        <div className="text-stone-500 mb-2 font-mono font-semibold">RAW SCAN</div>
                        <div className="space-y-1.5">
                          <div className="h-1.5 bg-stone-300 rounded w-full"></div>
                          <div className="h-1.5 bg-stone-300 rounded w-3/4"></div>
                          <div className="h-1.5 bg-stone-300 rounded w-5/6"></div>
                        </div>
                        <div className="absolute inset-x-0 h-1 bg-emerald-500 top-0 group-hover:translate-y-36 transition-transform duration-1000 shadow-[0_0_12px_#10b981]"></div>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                          <div className="text-[9px] text-stone-500">Vendor Match</div>
                          <div className="font-bold text-stone-900 text-xs">TechCorp Inc.</div>
                        </div>
                        <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-200">
                          <div className="text-[9px] text-stone-500">Tally Sync</div>
                          <div className="font-bold text-emerald-700 text-[10px] flex items-center gap-1">
                            <ShieldCheck size={11} /> SHA-256 Valid
                          </div>
                        </div>
                      </div>
                    </div>
                 </div>
              </div>
            </a>

            {/* 3. Arogya Pal (Healthcare App) */}
            <a 
              href="https://www.behance.net/gallery/184156649/Health-care-App" 
              target="_blank" 
              rel="noreferrer"
              className="block grid grid-cols-1 md:grid-cols-2 max-w-[1600px] mx-auto border-b border-stone-200 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#ccff00] focus:ring-inset"
            >
              <div className="order-1 bg-stone-100 border-b md:border-b-0 md:border-r border-stone-200 relative overflow-hidden min-h-[480px] flex items-center justify-center p-8">
                 <div className="absolute top-4 left-4 bg-white border border-stone-200 text-stone-800 text-[10px] font-mono px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5">
                   <Zap size={12} className="text-emerald-600 animate-bounce"/> Interactive Booking Flow
                 </div>

                 <div className="w-[280px] bg-white rounded-[2.2rem] shadow-xl border-[6px] border-stone-200 p-4 transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-700">
                    <div className="flex justify-between items-center mb-3">
                       <span className="text-[10px] font-bold text-stone-900 uppercase">Arogya Pal</span>
                       <Activity size={14} className="text-emerald-600 animate-pulse" />
                    </div>
                    <div className="flex gap-2.5 mb-3 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                       <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold">Dr</div>
                       <div>
                          <div className="text-xs font-bold text-stone-900">Dr. Sharma, MD</div>
                          <div className="text-[9px] text-stone-500">Senior Cardiologist</div>
                       </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 mb-3">
                       <div className="p-2 rounded bg-stone-50 text-center text-[9px] text-stone-600 border border-stone-200">09:00 AM</div>
                       <div className="p-2 rounded bg-stone-900 text-[#ccff00] text-center text-[9px] font-bold shadow transform scale-105">10:30 AM</div>
                       <div className="p-2 rounded bg-stone-50 text-center text-[9px] text-stone-600 border border-stone-200">02:00 PM</div>
                    </div>
                    <div className="bg-[#ccff00] text-stone-900 text-center text-[10px] font-bold py-2.5 rounded-lg shadow-sm group-hover:bg-stone-900 group-hover:text-white transition-colors">
                       Confirm Appointment Slot
                    </div>
                 </div>
              </div>
              <div className="order-2 p-6 md:p-12 lg:p-16 flex flex-col justify-between h-full bg-[#F9F8F6] group-hover:bg-stone-50 transition-colors">
                <div>
                  <div className="text-xs tracking-widest uppercase text-stone-500 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Healthcare / Mobile App
                  </div>
                  <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Arogya Pal Healthcare App</h3>
                  <p className="text-stone-600 leading-relaxed text-lg max-w-md font-light">
                    A digital healthcare app connecting patients with local practitioners, emphasizing accessibility, quick appointment scheduling, and immediate health record access.
                  </p>
                </div>
                <div className="mt-12 flex items-center gap-2 font-medium group-hover:text-[#88aa00] transition-colors text-stone-900">
                  Read Full Case Study <ArrowUpRight size={18} />
                </div>
              </div>
            </a>

            {/* 4. Music News Publishing Website (Light Mode BPM Inspired Interactive Player) */}
            <a 
              href="https://www.behance.net/gallery/147879569/Music-News-Publishing-Website"
              target="_blank" 
              rel="noreferrer"
              className="block grid grid-cols-1 md:grid-cols-2 max-w-[1600px] mx-auto border-b border-stone-200 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#ccff00] focus:ring-inset"
            >
              <div className="order-2 md:order-1 p-6 md:p-12 lg:p-16 flex flex-col justify-between h-full bg-[#F9F8F6] group-hover:bg-stone-50 transition-colors">
                <div>
                  <div className="text-xs tracking-widest uppercase text-stone-500 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#88aa00]"></span> EDITORIAL / WEB DESIGN
                  </div>
                  <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Music News Publishing Portal</h3>
                  <p className="text-stone-600 leading-relaxed text-lg max-w-md font-light">
                    A digital publishing platform focused on music journalism, featuring a dynamic editorial grid system, immersive typography, audio visualizer aesthetics, and light-mode curation.
                  </p>
                </div>
                <div className="mt-12 flex items-center gap-2 font-medium group-hover:text-[#88aa00] transition-colors text-stone-900">
                  Read Full Case Study <ArrowUpRight size={18} />
                </div>
              </div>

              {/* Interactive Light Mode BPM & Music Player Preview Box */}
              <div className="order-1 md:order-2 bg-stone-100 border-b md:border-b-0 md:border-l border-stone-200 relative overflow-hidden min-h-[480px] flex items-center justify-center p-8">
                 <div className="absolute top-6 right-6 bg-white border border-stone-200 text-stone-800 text-[10px] font-mono px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 z-20">
                   <Zap size={12} className="text-[#88aa00]"/> BPM Audio Visualizer • Interactive
                 </div>

                 {/* Interactive BPM Widget Box (Light Mode Clean) */}
                 <div className="w-[380px] bg-white rounded-2xl shadow-xl border border-stone-200 p-5 text-stone-900 transform group-hover:scale-105 transition-all duration-700 relative">
                    
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-stone-100">
                       <div className="flex items-center gap-2">
                          <Music size={16} className="text-[#88aa00]" />
                          <span className="text-xs font-mono font-bold tracking-widest text-stone-700">SONIC DISPATCH // BPM 128</span>
                       </div>
                       <span className="text-[10px] font-mono bg-stone-100 px-2 py-0.5 rounded text-stone-600">LIVE AUDIO</span>
                    </div>

                    {/* Active Track Title */}
                    <div className="mb-4">
                       <div className="text-[10px] font-mono text-stone-400 uppercase">Cover Feature</div>
                       <div className="text-sm font-bold text-stone-900">Underground Waves & Modular Synth</div>
                    </div>

                    {/* Interactive Audio Wave Visualizer Simulation */}
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 mb-4 flex items-center justify-between h-20">
                       <div className="flex items-end gap-1 h-12 w-full justify-between px-2">
                          {[40, 70, 90, 50, 60, 100, 80, 45, 65, 85, 95, 60, 40, 75, 85, 65, 50, 90, 70, 40].map((h, i) => (
                             <div 
                                key={i} 
                                className={`w-1 rounded-full transition-all duration-300 ${isPlaying ? 'bg-[#88aa00]' : 'bg-stone-300'}`}
                                style={{ height: isPlaying ? `${Math.max(20, (h + Math.sin(Date.now() / 200 + i) * 20))}%` : `${h * 0.4}%` }}
                             ></div>
                          ))}
                       </div>
                    </div>

                    {/* Play Controls & BPM Slider */}
                    <div className="flex items-center justify-between bg-stone-100 p-3 rounded-xl border border-stone-200">
                       <button 
                         onClick={(e) => {
                           e.preventDefault();
                           setIsPlaying(!isPlaying);
                         }}
                         className="w-10 h-10 rounded-full bg-stone-900 text-[#ccff00] flex items-center justify-center hover:scale-105 transition-transform shadow-md focus:outline-none"
                       >
                         {isPlaying ? <Pause size={18} /> : <Play size={18} className="translate-x-0.5" />}
                       </button>

                       <div className="flex-1 mx-4">
                          <div className="flex justify-between items-center text-[10px] font-mono text-stone-500 mb-1">
                             <span>Tempo</span>
                             <span className="text-stone-900 font-bold">{bpmValue} BPM</span>
                          </div>
                          <input 
                            type="range" 
                            min="90" 
                            max="160" 
                            value={bpmValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setBpmValue(Number(e.target.value))}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full accent-stone-900 h-1 bg-stone-300 rounded-lg cursor-pointer" 
                          />
                       </div>

                       <div className="flex items-center gap-1 text-stone-500">
                          <Volume2 size={16} />
                       </div>
                    </div>

                 </div>
              </div>
            </a>

            {/* 5. Nomad Travel App (Inspired by Deskovery Reference UI - Clean Light Mode) */}
            <a 
              href="https://www.behance.net/gallery/147623177/A-travel-app-for-backpacker-and-digital-nomad-" 
              target="_blank" 
              rel="noreferrer"
              className="block grid grid-cols-1 md:grid-cols-2 max-w-[1600px] mx-auto border-b border-stone-200 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#ccff00] focus:ring-inset"
            >
              <div className="order-1 bg-stone-100 border-b md:border-b-0 md:border-r border-stone-200 relative overflow-hidden min-h-[500px] flex items-center justify-center p-8">
                 <div className="absolute top-4 left-4 bg-white border border-stone-200 text-stone-800 text-[10px] font-mono px-3 py-1 rounded-full shadow-sm flex items-center gap-1.5 z-20">
                   <Zap size={12} className="text-amber-600 animate-bounce"/> Deskovery Nomad Toolkit UI
                 </div>

                 {/* Matching Deskovery Reference Floating Card Mockup (Clean Light Mode) */}
                 <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-stone-300 p-6 text-stone-900 transform group-hover:scale-105 transition-all duration-700 relative">
                    
                    <div className="flex justify-between items-center mb-6 pb-4 border-b border-stone-100">
                       <div className="flex items-center gap-2">
                          <Compass size={16} className="text-stone-700" />
                          <span className="text-xs font-mono font-bold tracking-wider text-stone-800">NOMAD HUB // DESKOVERY</span>
                       </div>
                       <span className="text-[10px] font-mono bg-stone-100 px-2.5 py-1 rounded text-stone-600">Bali, ID</span>
                    </div>

                    <div className="bg-stone-50 p-4 rounded-2xl mb-5 border border-stone-200">
                       <div className="text-[10px] font-mono text-amber-700 mb-1">FEATURED CO-WORKING & LOFT</div>
                       <div className="text-base font-bold text-stone-900 mb-1">Ubud Jungle Co-Work & Stay</div>
                       <div className="flex items-center gap-3 text-xs text-stone-500 mt-2 font-mono">
                          <span>📶 300 Mbps Wi-Fi</span>
                          <span>•</span>
                          <span>$24 / day</span>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-5">
                       <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
                          <div className="text-[9px] font-mono text-stone-400">COMMUNITY</div>
                          <div className="text-xs font-bold text-stone-900 mt-0.5">142 Nomads Active</div>
                       </div>
                       <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 text-center">
                          <div className="text-[9px] font-mono text-stone-400">ROUTE SYNC</div>
                          <div className="text-xs font-bold text-amber-700 mt-0.5">Instant GPS</div>
                       </div>
                    </div>

                    <div className="bg-stone-900 text-white text-center text-xs font-bold py-3 rounded-xl shadow-md group-hover:bg-[#ccff00] group-hover:text-stone-900 transition-colors flex items-center justify-center gap-2">
                       <span>Sync Journey Route</span>
                       <ArrowRight size={14} />
                    </div>

                 </div>
              </div>
              <div className="order-2 p-6 md:p-12 lg:p-16 flex flex-col justify-between h-full bg-[#F9F8F6] group-hover:bg-stone-50 transition-colors">
                <div>
                  <div className="text-xs tracking-widest uppercase text-stone-500 mb-6 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> B2C Travel / Mobile App
                  </div>
                  <h3 className="text-3xl md:text-4xl font-medium tracking-tight mb-6">Nomad Travel & Backpacker App</h3>
                  <p className="text-stone-600 leading-relaxed text-lg max-w-md font-light">
                    A comprehensive mobile application tailored for backpackers and digital nomads, streamlining journey planning, high-speed co-working discovery, and community connection.
                  </p>
                </div>
                <div className="mt-12 flex items-center gap-2 font-medium group-hover:text-[#88aa00] transition-colors text-stone-900">
                  Read Full Case Study <ArrowUpRight size={18} />
                </div>
              </div>
            </a>

          </div>
        </main>
      )}

      {/* =====================================================
          RESUME PAGE VIEW
          ===================================================== */}
      {currentPage === 'resume' && (
        <main className="pt-32 pb-24 min-h-screen">
          <div className="px-6 md:px-12 max-w-[1200px] mx-auto">
            
            <button 
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo(0,0);
              }}
              className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 font-medium transition-colors mb-12 group focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </button>

            <div className="mb-16 border-b border-stone-200 pb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div>
                <h1 className="text-5xl md:text-6xl font-medium tracking-tighter mb-4">Abinash Kumar</h1>
                <p className="text-xl text-stone-600 font-light">Interaction Designer | UI/UX Designer | Product Designer</p>
                <p className="text-sm text-stone-500 mt-2 font-mono">(+91) 8147528659 • abinash.kum0028@gmail.com • Bengaluru, India</p>
              </div>
              <a 
                href="https://drive.google.com/file/d/1kYiPrQ8QD1G73_CysX-TwmGG5WwJs90C/view?usp=sharing" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-stone-900 text-[#F9F8F6] font-medium hover:bg-[#ccff00] hover:text-stone-900 px-6 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
              >
                Download PDF <Download size={16} />
              </a>
            </div>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
              <div className="md:col-span-1">
                <h3 className="text-sm tracking-widest uppercase text-stone-500 font-semibold sticky top-24">Professional Summary</h3>
              </div>
              <div className="md:col-span-3">
                <p className="text-lg text-stone-600 font-light leading-relaxed">
                  Results-driven UI/UX Designer with 5 years of experience crafting intuitive, visually compelling digital experiences. Proficient in Interaction Design, Usability Testing, and User Research. Holds a Master's in Interaction Design from Harbour.Space University, Barcelona. Proven track record of increasing user engagement, improving conversion rates, and ensuring brand consistency across web and mobile platforms through a user-centered design approach.
                </p>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 border-t border-stone-200 pt-16">
              <div className="md:col-span-1">
                <h3 className="text-sm tracking-widest uppercase text-stone-500 font-semibold sticky top-24">Work Experience</h3>
              </div>
              <div className="md:col-span-3 space-y-12">
                
                <div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h4 className="text-2xl font-medium text-stone-900">Associate (UI/UX Designer)</h4>
                    <span className="text-stone-500 font-medium mt-1 md:mt-0">March 2024 - March 2026</span>
                  </div>
                  <p className="text-lg text-stone-900 mb-4">LycaDigital (Part of Lyca Group) — Bengaluru, India</p>
                  <ul className="list-disc list-outside ml-5 text-stone-600 space-y-2 font-light">
                    <li>Contributed to the design and development of Lycamobile's website and mobile app, enhancing user satisfaction and engagement through intuitive interface design.</li>
                    <li>Collaborated with cross-functional teams including product, engineering, and marketing to implement design solutions that increased conversions and reduced customer support costs.</li>
                    <li>Ensured brand consistency across all digital platforms by developing and maintaining a unified design language and optimised user experiences.</li>
                    <li>Conducted usability testing sessions and applied findings to iterate and improve interface designs.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h4 className="text-2xl font-medium text-stone-900">UX and UI Designer</h4>
                    <span className="text-stone-500 font-medium mt-1 md:mt-0">October 2022 - February 2024</span>
                  </div>
                  <p className="text-lg text-stone-900 mb-4">Softiva IT Solutions — Bengaluru, India</p>
                  <ul className="list-disc list-outside ml-5 text-stone-600 space-y-2 font-light">
                    <li>Designed user-centric digital experiences for Softiva's IT services and client-facing solutions, translating business requirements into intuitive, visually engaging web interfaces.</li>
                    <li>Led UI/UX design for Lekha, a B2B SaaS accounts payable automation platform integrated with Tally Prime, simplifying complex financial workflows and improving usability.</li>
                    <li>Created scalable design systems and reusable Figma components, establishing consistent visual language, responsive layouts, typography, spacing, and interaction patterns across projects.</li>
                    <li>Collaborated with clients, product teams, and developers to understand requirements, conduct design iterations, address usability and accessibility considerations, and deliver designs aligned with both user needs and business objectives.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h4 className="text-2xl font-medium text-stone-900">Designer</h4>
                    <span className="text-stone-500 font-medium mt-1 md:mt-0">December 2018 - January 2020</span>
                  </div>
                  <p className="text-lg text-stone-900 mb-4">Pee Gee Fabrics — Bengaluru, India</p>
                  <ul className="list-disc list-outside ml-5 text-stone-600 space-y-2 font-light">
                    <li>Developed innovative prints and colorways for seasonal collections, enhancing the aesthetic appeal of shirtings, suitings, and bottoms.</li>
                    <li>Collaborated with cross-functional teams to ensure alignment on design concepts and seasonal trends.</li>
                    <li>Conducted thorough market research to identify emerging trends and consumer preferences, informing design decisions.</li>
                    <li>Enhanced brand identity by integrating current fashion trends into thoughtful design solutions, resulting in increased customer engagement.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h4 className="text-2xl font-medium text-stone-900">Textile Designer</h4>
                    <span className="text-stone-500 font-medium mt-1 md:mt-0">September 2018 - November 2018</span>
                  </div>
                  <p className="text-lg text-stone-900 mb-4">Apsara Silks — Bengaluru, India</p>
                  <ul className="list-disc list-outside ml-5 text-stone-600 space-y-2 font-light">
                    <li>Worked as a print designer specialising in textile patterns, focusing on fabric surface design and colour application.</li>
                    <li>Designed intricate textile patterns, elevating the brand's aesthetic appeal and market competitiveness.</li>
                    <li>Collaborated with the production team to ensure the feasibility and quality of print designs.</li>
                    <li>Researched current trends in textile design to continuously refresh and innovate the product line.</li>
                    <li>Streamlined the design process, improving efficiency and reducing turnaround time on project deliverables.</li>
                    <li>Developed a keen eye for color theory and pattern composition, enhancing overall design quality.</li>
                  </ul>
                </div>

              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 border-t border-stone-200 pt-16">
              <div className="md:col-span-1">
                <h3 className="text-sm tracking-widest uppercase text-stone-500 font-semibold sticky top-24">Education</h3>
              </div>
              <div className="md:col-span-3 space-y-8">
                <div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h4 className="text-xl font-medium text-stone-900">M.A. in Interaction Design</h4>
                    <span className="text-stone-500 font-medium">2021 - 2022</span>
                  </div>
                  <p className="text-lg text-stone-600 font-light">Harbour.Space University — Barcelona, Spain</p>
                </div>
                <div>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                    <h4 className="text-xl font-medium text-stone-900">B.Des. in Textile Design</h4>
                    <span className="text-stone-500 font-medium">2014 - 2018</span>
                  </div>
                  <p className="text-lg text-stone-600 font-light">National Institute of Fashion Technology (NIFT) — Bengaluru, India</p>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 border-t border-stone-200 pt-16">
              <div className="md:col-span-1">
                <h3 className="text-sm tracking-widest uppercase text-stone-500 font-semibold sticky top-24">Key Skills</h3>
              </div>
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                
                <div>
                  <h4 className="font-semibold text-stone-900 mb-3 border-b border-stone-200 pb-2">Design Tools</h4>
                  <p className="text-stone-600 font-light leading-relaxed">Figma, Miro, Adobe Photoshop, Adobe Illustrator, Canva, Adobe Indesign</p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 mb-3 border-b border-stone-200 pb-2">AI Tools</h4>
                  <p className="text-stone-600 font-light leading-relaxed">Gemini, Claude, Chatgpt, Perplexity</p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 mb-3 border-b border-stone-200 pb-2">UX Methods</h4>
                  <p className="text-stone-600 font-light leading-relaxed">User-Centered Design, User Stories, User Research, Interaction Design, Usability Testing, Information Architecture, User Flows, Competitive Analysis, Survey Design, Wireframing, Prototyping, Agile Methodology</p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 mb-3 border-b border-stone-200 pb-2">UI Skills</h4>
                  <p className="text-stone-600 font-light leading-relaxed">UI Design, Visual Design, Mobile UI Design, Web UI Design, App Design, User Interface Designing, Design Systems, Style Guides, Typography, Grid System</p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 mb-3 border-b border-stone-200 pb-2">Soft Skills</h4>
                  <p className="text-stone-600 font-light leading-relaxed">Adaptable, Problem Solving, Result-Oriented, Cross-functional Collaboration, Client Communication</p>
                </div>
                <div>
                  <h4 className="font-semibold text-stone-900 mb-3 border-b border-stone-200 pb-2">Languages</h4>
                  <p className="text-stone-600 font-light leading-relaxed">English (Fluent), Hindi (Native)</p>
                </div>

              </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-4 gap-8 border-t border-stone-200 pt-16">
              <div className="md:col-span-1">
                <h3 className="text-sm tracking-widest uppercase text-stone-500 font-semibold sticky top-24">Certifications</h3>
              </div>
              <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-6 bg-stone-100 border border-stone-200">
                  <h4 className="font-semibold text-stone-900 mb-1">Claude 101</h4>
                  <p className="text-sm text-stone-500 mb-4">Claude Code · Issued Aug 2026</p>
                </div>
                <div className="p-6 bg-stone-100 border border-stone-200">
                  <h4 className="font-semibold text-stone-900 mb-1">Generative AI Fundamentals</h4>
                  <p className="text-sm text-stone-500 mb-4">Google Cloud Skill Badge · Issued Oct 2023</p>
                  <p className="text-xs text-stone-400 font-mono">ID: 5610369</p>
                </div>
                <div className="p-6 bg-stone-100 border border-stone-200">
                  <h4 className="font-semibold text-stone-900 mb-1">Introduction to Large Language Models</h4>
                  <p className="text-sm text-stone-500 mb-4">Google Cloud Skill Badge · Issued Oct 2023</p>
                  <p className="text-xs text-stone-400 font-mono">ID: 5610160</p>
                </div>
                <div className="p-6 bg-stone-100 border border-stone-200">
                  <h4 className="font-semibold text-stone-900 mb-1">Introduction to Responsible AI</h4>
                  <p className="text-sm text-stone-500 mb-4">Google Cloud Skill Badge · Issued Oct 2023</p>
                  <p className="text-xs text-stone-400 font-mono">ID: 5586463</p>
                </div>
                <div className="p-6 bg-stone-100 border border-stone-200">
                  <h4 className="font-semibold text-stone-900 mb-1">Introduction to Generative AI</h4>
                  <p className="text-sm text-stone-500 mb-4">Google Cloud Skill Badge · Issued Oct 2023</p>
                  <p className="text-xs text-stone-400 font-mono">ID: 5574877</p>
                </div>
              </div>
            </section>

          </div>
        </main>
      )}

      {/* Footer / Contact */}
      <footer id="contact" className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto border-t border-stone-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6">Let's build something intentional.</h2>
            <p className="text-stone-600 text-lg mb-12 max-w-sm font-light">
              Currently open for new opportunities. Feel free to reach out for collaborations or just a friendly chat.
            </p>
            <div className="flex flex-col space-y-4 items-start">
              <a 
                href="mailto:abinash.kum0028@gmail.com" 
                className="text-2xl md:text-3xl font-medium text-stone-900 hover:text-[#88aa00] transition-colors border-b-2 border-transparent hover:border-[#88aa00] pb-1 break-all"
              >
                abinash.kum0028@gmail.com
              </a>
              <a 
                href="tel:+918147528659" 
                className="text-xl md:text-2xl font-light text-stone-600 hover:text-[#88aa00] transition-colors"
              >
                (+91) 8147528659
              </a>
              <span className="text-lg text-stone-600 font-light mt-2">Bengaluru, India</span>
            </div>
          </div>

          <div className="md:text-right flex flex-col justify-end space-y-6 text-lg font-medium">
            <a 
              href="https://linkedin.com/in/abinash-kumar-a3ab04163" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#88aa00] transition-colors flex items-center md:justify-end gap-2 group w-fit md:ml-auto focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
            >
              LinkedIn <ArrowUpRight size={18} className="text-stone-400 group-hover:text-[#88aa00]" />
            </a>
            <a 
              href="https://behance.net/abinashkum007" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#88aa00] transition-colors flex items-center md:justify-end gap-2 group w-fit md:ml-auto focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
            >
              Behance <ArrowUpRight size={18} className="text-stone-400 group-hover:text-[#88aa00]" />
            </a>
            <a 
              href="https://github.com/abinashkumar0028" 
              target="_blank" 
              rel="noreferrer"
              className="hover:text-[#88aa00] transition-colors flex items-center md:justify-end gap-2 group w-fit md:ml-auto focus:outline-none focus:ring-2 focus:ring-[#ccff00]"
            >
              GitHub <ArrowUpRight size={18} className="text-stone-400 group-hover:text-[#88aa00]" />
            </a>
          </div>

        </div>
        
        <div className="mt-24 pt-8 border-t border-stone-200 flex flex-col md:flex-row justify-between items-center text-sm text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Abinash Kumar. All rights reserved.</p>
          <p>Designed with intentionality. Built with React & Tailwind.</p>
        </div>
      </footer>

    </div>
  );
}