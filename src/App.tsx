import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SplashCursor from "./components/SplashCursor";
import ScrollVelocity from "./components/ScrollVelocity";
import { MarqueeDemo } from "./components/MarqueeDemo";
import { GlobeDemo } from "./components/GlobeDemo";
import { ChatBox } from "./components/ChatBox";
import { 
  ChevronDown,
  MessageCircle,
  X,
  Code2,
  Smartphone,
  Palette,
  Globe,
  ArrowRight,
  Instagram,
  Twitter,
  Linkedin,
  Github,
  Menu,
  Quote,
  Phone,
  Sparkles,
  ArrowUpRight,
  Plus,
  Minus,
  Send,
  Zap,
  Monitor,
  Search,
  Briefcase,
  Cpu,
  BarChart3
} from "lucide-react";

const IMAGES = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1520333789090-1afc82db536a?auto=format&fit=crop&q=80&w=1000"
];

export default function App() {
  const [activeImg, setActiveImg] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activePortfolioTab, setActivePortfolioTab] = useState("All");
  const [activePackageTab, setActivePackageTab] = useState("Logo Design");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0% -70% 0%',
      threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ["home", "services", "portfolio", "technologies", "packages", "team", "blog", "faq", "about", "contact"];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const portfolioCategories = ["All", "Web Design", "Branding", "Mobile Apps", "Video"];
  const portfolioItems = [
    { title: "E-Commerce OS", cat: "Web Design", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200" },
    { title: "Lumina Brand", cat: "Branding", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1200" },
    { title: "Mobile Banking", cat: "Mobile Apps", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1200" },
    { title: "Strategy Analytics", cat: "Web Design", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" },
    { title: "Eco-Motion", cat: "Video", img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200" },
    { title: "HealthTrack", cat: "Mobile Apps", img: "https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&q=80&w=1200" }
  ];

  const teamMembers = [
    { name: "John Sterling", role: "Creative Director", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
    { name: "Maya Vance", role: "UI/UX Designer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
    { name: "David Chen", role: "Full-Stack Dev", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
    { name: "Elena Rossi", role: "Brand Strategist", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" }
  ];

  const blogPosts = [
    { title: "The Future of Web Design in 2024", date: "Oct 24, 2023", cat: "Industry", img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" },
    { title: "Mastering Brand Identity", date: "Nov 12, 2023", cat: "Branding", img: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?auto=format&fit=crop&q=80&w=800" },
    { title: "SEO Strategies for Small Business", date: "Dec 05, 2023", cat: "Marketing", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" }
  ];

  const faqs = [
    { q: "How long does a typical project take?", a: "Project timelines vary depending on scope, but a standard website typically takes 4-8 weeks from discovery to launch." },
    { q: "Do you offer post-launch support?", a: "Yes, we provide ongoing maintenance and support packages to ensure your digital products stay secure and up-to-date." },
    { q: "Can you help with digital marketing?", a: "Absolutely! We offer SEO, PPC, and social media strategy to help drive traffic and conversions for your brand." },
    { q: "What technologies do you use?", a: "We specialize in React, Next.js, Node.js, and modern CSS frameworks like Tailwind, ensuring high performance and scalability." }
  ];

  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const filteredPortfolio = activePortfolioTab === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.cat === activePortfolioTab);

  const packageCategories = ["Logo Design", "Website", "E-Commerce", "SMM", "SEO", "Video", "Branding"];
  const packageData: { [key: string]: any[] } = {
    "Logo Design": [
      { title: "Basic Logo", price: "$35", features: ["3 Custom Concepts", "1 Dedicated Designer", "4 Revisions", "72h Delivery"], popular: false },
      { title: "Professional Logo", price: "$125", features: ["Unlimited Concepts", "4 Designers", "Stationary Design", "All Final Files"], popular: true },
      { title: "Elite Logo", price: "$175", features: ["Icon Design", "5 Award Winning Designers", "Social Media Kit", "Email Signature"], popular: false }
    ],
    "Website": [
      { title: "Basic Website", price: "$299", features: ["5 Page Custom Site", "Mobile Responsive", "Basic SEO", "Contact Form"], popular: false },
      { title: "Standard Website", price: "$499", features: ["10 Page Custom Site", "Advanced SEO", "Live Chat Sync", "3 Mo Support"], popular: true },
      { title: "Premium Website", price: "$899", features: ["20 Page Custom Site", "Speed Optimization", "Free Maintenance", "API Sync"], popular: false }
    ],
    "E-Commerce": [
      { title: "Starter Shop", price: "$599", features: ["50 Products", "Payment Gateway", "Inventory Sync", "Mobile App Ready"], popular: false },
      { title: "Business Shop", price: "$999", features: ["200 Products", "Coupon System", "Wholesale Portal", "Marketing Automation"], popular: true }
    ],
    "SMM": [
      { title: "Growth Plan", price: "$349", features: ["4 Platforms", "20 Posts/Month", "Paid Ad Management", "Weekly Reports"], popular: true }
    ],
    "SEO": [
      { title: "Advanced SEO", price: "$499", features: ["25 Keywords", "On/Off Page Optimization", "10 Backlinks", "Local SEO Rank"], popular: true }
    ],
    "Video": [
      { title: "Basic Video", price: "$199", features: ["30s Explainer", "Voiceover", "Background Music", "HD Delivery"], popular: false }
    ],
    "Branding": [
      { title: "Complete Brand", price: "$999", features: ["Full Identity", "Standard Manual", "Social Kit", "Stationary Set"], popular: true }
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Auto-carousel transition
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImg((prev) => (prev + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0b1e] text-white font-sans selection:bg-primary/30 overflow-x-hidden">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      {/* Back to Top */}
      <AnimatePresence>
        {isScrolled && (
          <motion.button
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/40 z-50 hover:scale-110 active:scale-95 transition-all group"
          >
            <ArrowUpRight className="-rotate-45 group-hover:-translate-y-1 transition-transform" size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      <SplashCursor 
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE={false}
        COLOR="#a50417" 
      />
      {/* Header / Navbar */}
      <nav className={`fixed w-full z-50 px-6 transition-all duration-700 ${isScrolled ? 'py-4' : 'py-8'}`}>
        <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 ${isScrolled ? 'bg-[#0a0b1e]/60 backdrop-blur-3xl border border-white/10 rounded-3xl px-8 py-3' : ''}`}>
          {/* Logo - Matching screenshot dots */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <div className="flex flex-col items-center">
               <div className="flex space-x-0.5">
                  <div className="w-3 h-3 bg-primary rounded-sm group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20" />
                  <div className="w-3 h-3 bg-primary rounded-sm opacity-30 group-hover:opacity-100 transition-all" />
               </div>
               <div className="flex space-x-0.5 mt-0.5">
                  <div className="w-3 h-6 bg-primary rounded-sm group-hover:-translate-y-1 transition-transform" />
                  <div className="w-3 h-3 bg-white rounded-full self-end -ml-1.5 border-2 border-[#0a0b1e] shadow-xl z-10" />
               </div>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-display font-black text-2xl tracking-[0.05em] uppercase leading-none transition-colors group-hover:text-primary">
                DIGITAL
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.55em] text-white/40 group-hover:text-white transition-colors">
                SPARK WEB
              </span>
            </div>
          </div>

          {/* Navigation Pill */}
          <div className={`hidden lg:flex items-center transition-all duration-700 ${isScrolled ? 'bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-1 py-1 shadow-2xl' : 'bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-full px-1 py-1'} space-x-0.5 shadow-2xl shadow-black/20`}>
            {[
              { name: "Home", id: "home" },
              { name: "Services", id: "services" },
              { name: "Portfolio", id: "portfolio" },
              { name: "Team", id: "team" },
              { name: "Blog", id: "blog" },
              { name: "FAQ", id: "faq" },
              { name: "About", id: "about" },
              { name: "Contact", id: "contact" }
            ].map((item) => (
              <button 
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-5 py-2.5 text-[9px] font-black uppercase tracking-[0.3em] rounded-full transition-all flex items-center relative group ${activeNav === item.id ? 'bg-primary text-white shadow-xl shadow-primary/30' : 'text-white/30 hover:text-white hover:bg-white/5'}`}
              >
                <span className="relative z-10">{item.name}</span>
                {activeNav === item.id && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* CTA */}
            <button 
              onClick={() => scrollToSection('contact')}
              className="hidden sm:flex bg-primary hover:scale-105 hover:brightness-110 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl shadow-primary/30 items-center gap-2 group active:scale-95"
            >
              Launch Project
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="lg:hidden w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all active:scale-95"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[60] bg-[#0a0b1e] flex flex-col p-10 pt-32"
            >
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-10 right-10 w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all"
              >
                <X size={32} />
              </button>
              
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-4 custom-scrollbar">
                {[
                  { name: "Home", id: "home" },
                  { name: "Services", id: "services" },
                  { name: "Portfolio", id: "portfolio" },
                  { name: "Technologies", id: "technologies" },
                  { name: "Packages", id: "packages" },
                  { name: "Team", id: "team" },
                  { name: "Blog", id: "blog" },
                  { name: "FAQ", id: "faq" },
                  { name: "About", id: "about" },
                  { name: "Contact", id: "contact" }
                ].map((item, i) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-4xl md:text-6xl font-display font-black uppercase tracking-tighter text-left transition-colors flex items-center justify-between group ${activeNav === item.id ? 'text-primary' : 'hover:text-primary'}`}
                  >
                    {item.name}
                    <ArrowUpRight className={`${activeNav === item.id ? 'opacity-100 translate-x-0' : 'opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0'} transition-all`} size={40} />
                  </motion.button>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-8">
                <div className="flex gap-6">
                   <Twitter className="text-white/40 hover:text-primary transition-colors cursor-pointer" />
                   <Instagram className="text-white/40 hover:text-primary transition-colors cursor-pointer" />
                   <Linkedin className="text-white/40 hover:text-primary transition-colors cursor-pointer" />
                </div>
                <div className="space-y-1">
                  <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">Contact Us</p>
                  <p className="text-white/40 text-sm font-medium">info@digitalsparkweb.com</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex items-center">
          {/* Large Background Text - Animating behind UI */}
          <motion.div 
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="whitespace-nowrap flex"
          >
            <h1 className="text-[22vw] font-display font-black tracking-tighter leading-none select-none text-white/5 pr-20">
              WE SPARK SUCCESS SPARK SUCCESS SPARK 
            </h1>
            <h1 className="text-[22vw] font-display font-black tracking-tighter leading-none select-none text-white/5 pr-20">
              WE SPARK SUCCESS SPARK SUCCESS SPARK 
            </h1>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-20 items-center">
            
            {/* Left side: Images Layout with Carousel logic inside */}
            <div className="relative h-[600px] flex items-center justify-center lg:justify-start">
              <div className="relative w-full max-w-sm aspect-[3.5/5]">
                <AnimatePresence mode="popLayout">
                  {IMAGES.map((img, i) => (
                    (activeImg === i || i === (activeImg + 1) % IMAGES.length || i === (activeImg - 1 + IMAGES.length) % IMAGES.length) && (
                      <motion.div
                        key={img}
                        initial={{ opacity: 0, x: 50, rotate: 5, scale: 0.9 }}
                        animate={{ 
                          opacity: i === activeImg ? 1 : 0.4, 
                          x: i === activeImg ? 0 : (i === (activeImg + 1) % IMAGES.length ? 40 : -40),
                          y: i === activeImg ? 0 : (i === (activeImg + 1) % IMAGES.length ? -10 : 10),
                          rotate: i === activeImg ? 0 : (i === (activeImg + 1) % IMAGES.length ? 3 : -3),
                          scale: i === activeImg ? 1 : 0.95,
                          zIndex: i === activeImg ? 30 : 20 
                        }}
                        exit={{ opacity: 0, x: -50, rotate: -5, scale: 0.9 }}
                        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                        className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] border-2 border-white/5"
                      >
                        <img 
                          src={img} 
                          alt="Portfolio"
                          className="w-full h-full object-cover grayscale brightness-90"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b1e]/60 to-transparent" />
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
                
                {/* Floating Teal Dot from the screenshot */}
                <div className="absolute -left-3 top-[60%] w-4 h-4 bg-primary rounded-full shadow-[0_0_15px_rgba(30,177,177,0.8)] z-40" />
              </div>
            </div>

            {/* Right side: Content */}
            <div className="flex flex-col items-start text-left lg:-ml-10 relative z-20">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white text-5xl md:text-7xl lg:text-[5.5rem] font-display font-black leading-[0.9] tracking-tighter uppercase mb-8"
              >
                SERVICES & <br /> <span className="text-white/40 italic">SOLUTIONS.</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-white/60 max-w-sm mb-10 leading-relaxed font-light"
              >
                Our creative web design services help rediscover your business's image in the Internet marketplace. <span className="text-white/40">Blending style and technology for global brands.</span>
              </motion.p>

              <motion.button 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  boxShadow: ["0 0 0 0 rgba(165,4,23,0.4)", "0 0 0 20px rgba(165,4,23,0)", "0 0 0 0 rgba(165,4,23,0)"]
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  initial: { delay: 0.4 },
                  animate: { 
                    boxShadow: {
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
                }}
                onClick={() => scrollToSection('portfolio')}
                className="bg-primary text-white font-black uppercase text-[11px] tracking-[.3em] px-14 py-6 rounded-full transition-all"
              >
                Explore Work
              </motion.button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-primary/50 to-primary" />
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 [writing-mode:vertical-lr] py-4 uppercase">Scroll to discover</span>
        </motion.div>
      </section>

      {/* Scrolling Text Section */}
      <section className="py-12 bg-deep border-y border-white/5 overflow-hidden">
        <ScrollVelocity
          texts={['DIGITAL SPARK WEB', 'CREATIVE AGENCY', 'CRAFTED IN USA', 'STRATEGY']} 
          velocity={60}
          className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter text-white/10 hover:text-primary/90 transition-colors duration-1000 cursor-default"
          numCopies={8}
        />
      </section>

      {/* Companies Section */}
      <section className="py-20 bg-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xs">
             <h4 className="text-2xl font-display font-black uppercase leading-tight">Companies We <span className="text-primary">Helped Build.</span></h4>
          </div>
          <div className="flex-grow flex justify-center">
            <MarqueeDemo />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block"
              >
                Our Services
              </motion.span>
              <motion.h3 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-display font-black uppercase leading-none"
              >
                Complete <span className="text-white/30">Digital</span> Solutions.
              </motion.h3>
            </div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 max-w-sm text-sm leading-relaxed"
            >
              We offer a comprehensive range of digital services to help your business thrive online. From creative design to powerful strategy.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Palette size={24} />, title: "Web Design", desc: "Creative, modern designs that captivate and convert." },
              { icon: <Code2 size={24} />, title: "Web Development", desc: "Robust, scalable solutions using modern technologies." },
              { icon: <Smartphone size={24} />, title: "Mobile App Dev", desc: "Native and cross-platform apps for iOS and Android." },
              { icon: <Globe size={24} />, title: "SEO Optimization", desc: "Data-driven strategies to boost organic traffic." },
              { icon: <Sparkles size={24} />, title: "Logo & Branding", desc: "Professional identity packages that stand out." },
              { icon: <Smartphone size={24} />, title: "E-Commerce", desc: "Complete platforms with secure payment gateways." },
              { icon: <Code2 size={24} />, title: "WordPress Dev", desc: "Custom themes and plugins tailored to your needs." },
              { icon: <Smartphone size={24} />, title: "UI/UX Design", desc: "User-centered design that makes products intuitive." },
              { icon: <MessageCircle size={24} />, title: "Social Media", desc: "Strategic campaigns that build engagement and leads." },
              { icon: <Palette size={24} />, title: "Video & Animation", desc: "Compelling visuals that communicate effectively." },
              { icon: <Code2 size={24} />, title: "Maintenance", desc: "Ongoing updates and security monitoring." },
              { icon: <Globe size={24} />, title: "Domain & Hosting", desc: "Fast, secure, and reliable hosting solutions." }
            ].map((service, i) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ 
                  opacity: 1, 
                  y: [0, -10, 0], 
                  scale: 1 
                }}
                viewport={{ once: true }}
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  initial: { delay: (i % 4) * 0.1, duration: 0.5 },
                  animate: { 
                    duration: 5 + (i % 5), 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: i * 0.2
                  }
                }}
                whileHover={{ scale: 1.02, y: -15, transition: { duration: 0.3 } }}
                className="bg-white/5 border border-white/10 p-8 rounded-[2rem] hover:bg-white/10 transition-all group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="text-primary mb-4 group-hover:scale-110 transition-transform origin-left">{service.icon}</div>
                  <h4 className="text-lg font-bold mb-3">{service.title}</h4>
                  <p className="text-white/40 text-xs leading-relaxed mb-6">{service.desc}</p>
                  <button className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-white/60 group-hover:text-primary transition-colors">
                    Learn More <ArrowRight size={12} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Work/Portfolio Section */}
      <section id="portfolio" className="py-32 px-6 bg-[#08091a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block"
            >
              Portfolio
            </motion.span>
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter mb-8"
            >
              Selected <span className="text-primary">Work.</span>
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 mb-12"
            >
              Being in this industry for decades, our creative agency has built a huge portfolio serving businesses with effective solutions.
            </motion.p>
            
            {/* Portfolio Filters */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 mb-16"
            >
              {portfolioCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActivePortfolioTab(cat)}
                  className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${activePortfolioTab === cat ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredPortfolio.map((work, i) => (
                <motion.div 
                  key={work.title}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
                  className="group cursor-pointer"
                >
                  <motion.div 
                    animate={{ 
                      y: [0, -5, 0],
                    }}
                    transition={{ 
                      duration: 4 + (i % 2), 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: i * 0.3
                    }}
                    className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 border border-white/5 shadow-2xl"
                  >
                    <img src={work.img} alt={work.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                      <button className="bg-white text-dark p-6 rounded-full font-black uppercase text-xs tracking-widest scale-75 group-hover:scale-100 transition-transform">
                        View Project
                      </button>
                    </div>
                  </motion.div>
                  <div className="flex justify-between items-end px-4">
                    <div>
                      <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">{work.cat}</span>
                      <h5 className="text-2xl font-bold">{work.title}</h5>
                    </div>
                    <ArrowRight size={24} className="text-white/20 group-hover:text-primary transition-colors group-hover:translate-x-2" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Statistics Counter Section */}
      <section className="py-20 bg-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { count: "500+", label: "Projects Completed" },
              { count: "300+", label: "Happy Clients" },
              { count: "15+", label: "Years Experience" },
              { count: "50+", label: "Team Members" }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="text-5xl md:text-6xl font-display font-black mb-2">{stat.count}</div>
                <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Tech Stack</span>
            <h3 className="text-4xl md:text-6xl font-display font-black uppercase mb-12">Technologies <span className="text-white/30">We Use.</span></h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
              {['React', 'Node.js', 'MongoDB', 'Python', 'AWS', 'Figma', 'TypeScript', 'Tailwind'].map((tech, i) => (
                <motion.div 
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 border border-white/10 p-8 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-default"
                >
                  <span className="text-lg font-bold group-hover:text-primary transition-colors">{tech}</span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Sparkles size={16} className="text-white/20 group-hover:text-white" />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-20">
                <h4 className="text-3xl font-display font-black uppercase mb-12 text-center">Our Development <span className="text-primary">Process.</span></h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                    { step: "01", title: "Discovery", desc: "Understanding your vision and project requirements." },
                    { step: "02", title: "Design", desc: "Creating beautiful and functional UI/UX prototypes." },
                    { step: "03", title: "Build", desc: "Clean and scalable code implementation." },
                    { step: "04", title: "Launch", desc: "Deployment and ongoing success support." }
                  ].map((item, i) => (
                    <motion.div 
                      key={item.step}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-primary/30 transition-all"
                    >
                      <span className="text-5xl font-display font-black text-white/5 absolute top-4 right-8 group-hover:text-primary/10 transition-colors">{item.step}</span>
                      <h5 className="text-xl font-bold mb-4">{item.title}</h5>
                      <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-32 px-6 bg-deep">
        {/* ... existing packages code ... */}
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block"
            >
              Pricing Plans
            </motion.span>
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-display font-black uppercase"
            >
              Choose Your <span className="text-primary">Plan.</span>
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 mt-4 max-w-xl mx-auto"
            >
              We offer effective and affordable web design and development services. Premium quality without breaking the bank.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex overflow-x-auto custom-scrollbar gap-2 mb-16 justify-center pb-4"
          >
            {packageCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActivePackageTab(cat)}
                className={`whitespace-nowrap px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all border ${activePackageTab === cat ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {packageData[activePackageTab]?.map((pkg, i) => (
                <motion.div 
                  key={pkg.title}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                  whileHover={{ 
                    scale: 1.02, 
                    rotateY: pkg.popular ? 2 : -2,
                    rotateX: 2,
                    transition: { duration: 0.3 }
                  }}
                  className={`p-10 rounded-[3rem] border flex flex-col h-full perspective-1000 ${pkg.popular ? 'bg-primary/5 border-primary/40 relative shadow-[0_20px_50px_rgba(165,4,23,0.1)]' : 'bg-white/5 border-white/10 shadow-2xl shadow-black/20'}`}
                >
                  {pkg.popular && (
                    <div className="absolute top-8 right-8 bg-primary text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                      Most Popular
                    </div>
                  )}
                  <span className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-2 block">Starting At</span>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-5xl font-display font-black">{pkg.price}</span>
                  </div>
                  <h4 className="text-2xl font-bold mb-8">{pkg.title}</h4>
                  <ul className="space-y-4 mb-10 border-t border-white/10 pt-8 flex-grow">
                    {pkg.features.map(feat => (
                      <li key={feat} className="flex items-center gap-3 text-sm text-white/60">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(165,4,23,0.8)]" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${pkg.popular ? 'bg-primary text-white shadow-2xl shadow-primary/30' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                    Order Now
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Team</span>
            <h3 className="text-4xl md:text-6xl font-display font-black uppercase leading-tight">Meet the <span className="text-white/30">Creative Minds.</span></h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div 
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                animate={{
                  y: [0, -10, 0],
                  transition: {
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.5,
                    ease: "easeInOut"
                  }
                }}
                className="group"
              >
                <div className="relative aspect-square rounded-[3rem] overflow-hidden mb-6 border border-white/10 shadow-2xl">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex gap-4">
                       <button className="w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform"><Twitter size={18} /></button>
                       <button className="w-10 h-10 bg-white text-primary rounded-full flex items-center justify-center hover:scale-110 transition-transform"><Linkedin size={18} /></button>
                    </div>
                  </div>
                </div>
                <h4 className="text-2xl font-bold mb-1">{member.name}</h4>
                <p className="text-primary text-[10px] font-black uppercase tracking-widest">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-32 px-6 bg-deep">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <div>
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Latest News</span>
              <h3 className="text-4xl md:text-6xl font-display font-black uppercase">Industry <span className="text-white/30">Insights.</span></h3>
            </div>
            <button className="hidden md:flex border border-white/10 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all gap-2 items-center">
              View All Blog <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {blogPosts.map((post, i) => (
              <motion.div 
                key={post.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                animate={{
                  y: [0, -8, 0],
                  transition: {
                    duration: 5,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "easeInOut"
                  }
                }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-8 border border-white/5">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  <div className="absolute top-6 left-6 bg-primary text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full">
                    {post.cat}
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{post.date}</span>
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30">By Admin</span>
                </div>
                <h4 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors mb-6">{post.title}</h4>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary group-hover:gap-4 transition-all">
                  Read More <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Questions</span>
            <h3 className="text-4xl md:text-6xl font-display font-black uppercase">Frequently Asked <span className="text-white/30">Questions.</span></h3>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden"
              >
                <button 
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  className="w-full p-8 flex items-center justify-between text-left group"
                >
                  <span className="text-lg font-bold pr-8 group-hover:text-primary transition-colors">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 transition-all ${expandedFaq === i ? 'rotate-180 bg-primary border-primary' : ''}`}>
                    <ChevronDown size={14} />
                  </div>
                </button>
                <AnimatePresence>
                  {expandedFaq === i && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-8 pb-8"
                    >
                      <p className="text-white/40 leading-relaxed pt-4 border-t border-white/10">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex items-center justify-between">
          <h3 className="text-3xl font-display font-black uppercase">What People Say</h3>
          <span className="text-white/20 text-[10px] font-black uppercase tracking-widest italic">User Testimonials</span>
        </div>
        <MarqueeDemo />
      </section>

      {/* Newsletter Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-primary to-primary/60 text-white relative overflow-hidden shadow-2xl shadow-primary/20"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="relative z-10 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 block opacity-80">Newsletter</span>
              <h3 className="text-4xl md:text-6xl font-display font-black uppercase mb-8 leading-tight">Get Exclusive <br /> Creative <span className="italic opacity-50">Updates.</span></h3>
              <div className="max-w-lg mx-auto relative group">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="w-full bg-white text-dark rounded-full px-8 py-6 focus:outline-none pr-20 font-medium"
                />
                <button className="absolute right-2 top-2 bottom-2 aspect-square bg-primary rounded-full flex items-center justify-center text-white hover:bg-dark transition-all transform group-hover:scale-105 active:scale-95">
                  <Send size={20} />
                </button>
              </div>
              <p className="mt-8 text-xs font-medium opacity-60">Join 5,000+ others already subcribed. No spam, ever.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">About Digital Spark Web</span>
              <h3 className="text-5xl font-display font-black uppercase mb-8 leading-tight">Drive Your Business Towards <span className="text-primary">Success.</span></h3>
              <p className="text-white/60 leading-relaxed mb-8 text-lg">
                We are a creative agency in USA with a mission to add value to your business by constantly renewing ourselves with top-tier website design services. Our blending of style and technology enables your brand to succeed on the Web.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-3xl font-display font-black text-primary">500+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Projects Completed</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="text-3xl font-display font-black text-primary">300+</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Happy Clients</p>
                </motion.div>
              </div>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
              >
                Learn Our Story
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10"
            >
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                alt="Our Team" 
                className="w-full h-full object-cover grayscale brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b1e] via-transparent to-transparent" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-20 border-t border-white/5">
             <div className="lg:col-span-1">
               <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Trust</span>
               <h3 className="text-5xl font-display font-black uppercase mb-6 leading-none">Voices <br /> from our <br /> <span className="text-white/20">Partners.</span></h3>
               <Quote size={80} className="text-white/5" />
             </div>
             
             <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 items-start">
               {[
                 { name: "Sarah Johnson", role: "CEO at TechStart", text: "Digital Spark Web transformed our online presence. Their web design team is incredibly talented." },
                 { name: "Michael Davis", role: "Marketing Director", text: "Working with them was the best decision for our brand. Attention to detail is unmatched." },
                 { name: "Jennifer Williams", role: "Project Manager", text: "Compelling visuals and robust code. They understood our vision perfectly from day one." },
                 { name: "Robert Brown", role: "Founder, Brown Ent.", text: "Outstanding work on our branding! They delivered an identity that truly represents us." }
               ].map((test, i) => (
                 <motion.div 
                   key={test.name}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1 }}
                   className={`p-10 rounded-[2.5rem] ${i % 2 === 1 ? 'bg-primary/10 border border-primary/20 mt-12' : 'bg-white/5 border border-white/10'}`}
                 >
                   <p className="text-lg leading-relaxed mb-8 italic">"{test.text}"</p>
                   <div>
                     <p className="font-bold">{test.name}</p>
                     <p className="text-xs font-black uppercase tracking-widest text-primary/60">{test.role}</p>
                   </div>
                 </motion.div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Contact</span>
              <h3 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter mb-8 leading-[0.85]">
                Let's make <br />
                it <span className="text-primary italic">Real.</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-16 pt-16 border-t border-white/5">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-4">Direct Communication</span>
                  <div className="space-y-4">
                    <a href="mailto:info@digitalsparkweb.com" className="group flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <MessageCircle size={14} className="text-white/60 group-hover:text-white" />
                      </div>
                      <span className="font-bold border-b border-primary/20 group-hover:border-primary transition-all">info@digitalsparkweb.com</span>
                    </a>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <Phone size={14} className="text-white/60" />
                      </div>
                      <span className="font-medium text-white/60">+1 (877) 513-4503</span>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-4">Social Presence</span>
                  <div className="flex gap-3">
                    {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                      <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-primary hover:-translate-y-1 transition-all">
                        <Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 rounded-3xl bg-white/[0.02] border border-white/5 flex items-center gap-6 overflow-hidden relative group">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 w-24 h-24 shrink-0 -ml-12 overflow-hidden pointer-events-none grayscale group-hover:grayscale-0 transition-all duration-700">
                  <GlobeDemo className="scale-150" />
                </div>
                <div className="relative z-10">
                   <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block">Global Operations</span>
                   <p className="text-sm font-medium mt-1">Working with clients across 12 countries and 4 continents.</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full -z-10" />
              <div className="bg-white/5 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-sm">
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">What's your name?</label>
                      <input type="text" placeholder="Type here..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/10" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Your email address</label>
                      <input type="email" placeholder="example@mail.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-primary/50 transition-all placeholder:text-white/10" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">How can we help?</label>
                    <div className="flex flex-wrap gap-2">
                      {['Design', 'Development', 'Strategy', 'AI Solution'].map(label => (
                        <button key={label} type="button" className="px-5 py-2 rounded-full border border-white/10 text-[11px] font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition-all">
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-4">Your brief</label>
                    <textarea rows={4} placeholder="Let us know what you're working on..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-primary/50 transition-all resize-none placeholder:text-white/10" />
                  </div>

                  <button className="w-full bg-primary text-white font-black uppercase text-xs tracking-[0.4em] py-7 rounded-2xl hover:brightness-110 shadow-2xl shadow-primary/30 transition-all active:scale-[0.98]">
                    Launch Project Inquiry
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-[#08091a]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="space-y-8">
              <div className="flex items-center space-x-2">
                <div className="flex flex-col items-center">
                   <div className="flex space-x-0.5">
                      <div className="w-2.5 h-2.5 bg-primary rounded-sm" />
                      <div className="w-2.5 h-2.5 bg-primary rounded-sm opacity-40" />
                   </div>
                   <div className="flex space-x-0.5 mt-0.5">
                      <div className="w-2.5 h-5 bg-primary rounded-sm" />
                      <div className="w-2.5 h-2.5 bg-white rounded-full self-end -ml-1" />
                   </div>
                </div>
                <span className="font-display font-black text-xl tracking-tighter uppercase leading-none">
                  digital<span className="text-white font-light lowercase">sparkweb</span>
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Elevating brands through strategic design and cutting-edge digital solutions. Your success is our primary spark.
              </p>
              <div className="flex gap-4">
                {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-all">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-primary">Quick Links</h4>
              <ul className="space-y-4">
                {["Home", "Services", "Portfolio", "Team", "Blog", "FAQ", "About", "Contact"].map(link => (
                  <li key={link}>
                    <button 
                      onClick={() => scrollToSection(link.toLowerCase().replace(' ', ''))}
                      className="text-white/40 hover:text-white transition-colors text-sm font-medium"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-primary">Core Services</h4>
              <ul className="space-y-4">
                {["Web Design", "Development", "SEO Strategy", "Social Media", "Logo Branding", "Mobile Apps"].map(service => (
                  <li key={service} className="text-white/40 text-sm font-medium hover:text-white cursor-pointer transition-colors">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.3em] mb-8 text-primary">Connect</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <MessageCircle size={18} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">Email Us</span>
                    <a href="mailto:info@digitalsparkweb.com" className="text-sm font-bold border-b border-primary/20 hover:border-primary transition-all">info@digitalsparkweb.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">Call Us</span>
                    <p className="text-sm font-bold">+1 (877) 513-4503</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0">
                    <Globe size={18} className="text-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1">USA Office</span>
                    <p className="text-sm font-medium text-white/40">7901 4th St N STE 300, St. Petersburg, FL 33702</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 text-center md:text-left">
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <span>© 2024 Digital Spark Web. All rights reserved.</span>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>System Operational</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Support Chat Overlay - Polished AI Assistant Integration */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end space-y-4">
        <AnimatePresence>
          {isChatOpen && (
            <ChatBox onClose={() => setIsChatOpen(false)} />
          )}
          {!isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="flex flex-col items-end space-y-2 pointer-events-none"
            >
              <div className="bg-white text-[#0a0b1e] px-8 py-5 rounded-[2.5rem] rounded-br-[0.5rem] shadow-2xl text-[14px] font-bold flex items-center gap-3 backdrop-blur-md">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">👋</span>
                </div>
                How can we help you today?
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChatOpen(true)}
                className="bg-white/95 backdrop-blur-md text-primary px-6 py-4 rounded-[1.5rem] shadow-xl text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10 pointer-events-auto cursor-pointer flex items-center gap-2 group transition-all"
              >
                <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                I have a question
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChatOpen(true)}
                className="bg-white/95 backdrop-blur-md text-primary px-6 py-4 rounded-[1.5rem] shadow-xl text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10 pointer-events-auto cursor-pointer flex items-center gap-2 group transition-all"
              >
                <Smartphone size={14} className="group-hover:scale-110 transition-transform" />
                Tell me about apps
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center text-white transition-all duration-500 overflow-hidden relative group ${isChatOpen ? 'bg-white/10 backdrop-blur-xl rotate-90' : 'bg-primary shadow-primary/40'}`}
        >
          {isChatOpen ? (
            <X size={28} className="text-white" />
          ) : (
            <MessageCircle size={28} fill="currentColor" />
          )}
          {!isChatOpen && (
             <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-[#0a0b1e] animate-ping" />
          )}
        </button>
      </div>

      {/* WhatsApp Sticky Button */}
      <a 
        href="https://wa.me/18775134503" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-32 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 group"
      >
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:block" />
        <svg 
          viewBox="0 0 24 24" 
          className="w-8 h-8 text-white fill-current"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.551 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Background Ambience - Dynamic Blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" 
        />
      </div>
    </div>
  );
}
