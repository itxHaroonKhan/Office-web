import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import SplashCursor from "./components/SplashCursor";
import ScrollVelocity from "./components/ScrollVelocity";
import { MarqueeDemo } from "./components/MarqueeDemo";
import { Marquee } from "@/components/ui/marquee";
import { GlobeDemo } from "./components/GlobeDemo";
import { ChatBox } from "./components/ChatBox";
import Ballpit from "./components/Ballpit";
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
  "/mainslideimg.webp",
  "/illustrationteenage.webp",
  "/prevWork.webp"
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
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smoothHero  = useSpring(heroScroll, { stiffness: 60, damping: 20, mass: 0.4 });
  const heroScale   = useTransform(smoothHero, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(smoothHero, [0, 0.7], [1, 0]);
  const heroTextY   = useTransform(smoothHero, [0, 1], ["0%", "-28%"]);
  const heroTextOp  = useTransform(smoothHero, [0, 0.45], [1, 0]);

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
    { title: "E-Commerce Store", cat: "Web Design", img: "/portfolio_web1.webp" },
    { title: "Corporate Portal", cat: "Web Design", img: "/portfolio_web2.webp" },
    { title: "Business Landing", cat: "Web Design", img: "/portfolio_web3.webp" },
    { title: "Fashion Website", cat: "Web Design", img: "/portfolio_web4.webp" },
    { title: "Agency Website", cat: "Web Design", img: "/portfolio_web5.webp" },
    { title: "SaaS Platform", cat: "Web Design", img: "/portfolio_web6.webp" },
    { title: "Lumina Brand", cat: "Branding", img: "/portfolio_brand1.webp" },
    { title: "Nexus Identity", cat: "Branding", img: "/portfolio_brand2.webp" },
    { title: "Apex Branding", cat: "Branding", img: "/portfolio_brand3.webp" },
    { title: "Vibe Creative", cat: "Branding", img: "/portfolio_brand4.webp" },
    { title: "Pulse Brand", cat: "Branding", img: "/portfolio_brand5.webp" },
    { title: "Mobile Banking", cat: "Mobile Apps", img: "/portfolio_mob1.webp" },
    { title: "HealthTrack App", cat: "Mobile Apps", img: "/portfolio_mob2.webp" },
    { title: "Delivery Platform", cat: "Mobile Apps", img: "/portfolio_mob3.webp" },
    { title: "Fitness Tracker", cat: "Mobile Apps", img: "/portfolio_mob4.webp" },
    { title: "Travel App", cat: "Mobile Apps", img: "/portfolio_mob5.webp" },
    { title: "Eco-Motion Film", cat: "Video", img: "/portfolio_video-animation_9.webp" },
    { title: "Brand Promo", cat: "Video", img: "/portfolio_video-animation_10.webp" },
    { title: "Product Reel", cat: "Video", img: "/portfolio_video-animation_11.webp" },
    { title: "Corporate Video", cat: "Video", img: "/portfolio_video-animation_12.webp" },
  ];

  const teamMembers = [
    { name: "John Sterling", role: "Creative Director", img: "/user1.webp" },
    { name: "Maya Vance", role: "UI/UX Designer", img: "/user2.webp" },
    { name: "David Chen", role: "Full-Stack Dev", img: "/user3.webp" },
    { name: "Elena Rossi", role: "Brand Strategist", img: "/user1.webp" }
  ];

  const blogPosts = [
    { title: "The Future of Web Design in 2024", date: "Oct 24, 2023", cat: "Industry", img: "/services_webapp.webp" },
    { title: "Mastering Brand Identity", date: "Nov 12, 2023", cat: "Branding", img: "/services_logoandbranding.webp" },
    { title: "SEO Strategies for Small Business", date: "Dec 05, 2023", cat: "Marketing", img: "/services_seo.webp" }
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
    <div className="min-h-screen bg-[#03080f] text-white font-sans selection:bg-primary/30 overflow-x-hidden">
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
        COLOR="#3b82f6"
      />
      {/* Header / Navbar */}
      <nav className={`fixed w-full z-50 px-8 transition-all duration-500 ${isScrolled ? 'py-3 bg-[#03080f]/80 backdrop-blur-2xl border-b border-white/[0.07] shadow-2xl shadow-black/40' : 'py-7'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Matching screenshot dots */}
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <div className="flex flex-col items-center">
               <div className="flex space-x-0.5">
                  <div className="w-3 h-3 bg-primary rounded-sm group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20" />
                  <div className="w-3 h-3 bg-primary rounded-sm opacity-30 group-hover:opacity-100 transition-all" />
               </div>
               <div className="flex space-x-0.5 mt-0.5">
                  <div className="w-3 h-6 bg-primary rounded-sm group-hover:-translate-y-1 transition-transform" />
                  <div className="w-3 h-3 bg-white rounded-full self-end -ml-1.5 border-2 border-[#03080f] shadow-xl z-10" />
               </div>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-display font-black text-2xl tracking-[0.05em] uppercase leading-none transition-colors group-hover:text-primary">
                SOFTWARE
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.55em] text-white/40 group-hover:text-white transition-colors">
                ELITES
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
              GET A QUOTE
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
              className="fixed inset-0 z-[60] bg-[#03080f] flex flex-col p-10 pt-32"
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
                  <p className="text-white/40 text-sm font-medium">info@softwareelites.com</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" ref={heroRef} style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
        {/* Ballpit background */}
        <motion.div style={{ scale: heroScale, opacity: heroOpacity, width: '100%', height: '100%' }}>
          <Ballpit
            count={120}
            gravity={0.01}
            friction={0.9975}
            wallBounce={0.95}
            followCursor={true}
            colors={[0x3b82f6, 0x38bdf8, 0x60a5fa, 0x0ea5e9, 0x93c5fd, 0x7dd3fc]}
          />
        </motion.div>

        {/* Hero Text Overlay */}
        <motion.div
          style={{ y: heroTextY, opacity: heroTextOp }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-primary text-sm font-semibold uppercase tracking-[0.25em] mb-4"
          >
            Software Elites
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-[0.95] tracking-tight"
          >
            We Build
            <br />
            <span className="text-primary">Elite</span> Software
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-6 text-lg md:text-xl text-white/60 max-w-xl leading-relaxed"
          >
            Premium software company crafting powerful websites,
            mobile apps & custom systems that scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
            className="mt-10 flex flex-wrap gap-4 justify-center pointer-events-auto"
          >
            <a
              href="#contact"
              className="px-8 py-3.5 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors duration-300"
            >
              Start a Project
            </a>
            <a
              href="#work"
              className="px-8 py-3.5 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-primary transition-all duration-300"
            >
              View Our Work
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ opacity: heroTextOp }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </section>

      {/* Scrolling Text Section */}
      <section className="py-12 bg-deep border-y border-white/5 overflow-hidden">
        <ScrollVelocity
          texts={['SOFTWARE ELITES', 'WE BUILD SOFTWARE', 'CRAFTED WITH PASSION', 'ELITE SOLUTIONS']}
          velocity={60}
          className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter text-white/10 hover:text-primary/90 transition-colors duration-1000 cursor-default"
          numCopies={8}
        />
      </section>

      {/* Companies Section */}
      <section className="py-20 bg-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xs shrink-0">
             <h4 className="text-2xl font-display font-black uppercase leading-tight">Companies We <span className="text-primary">Helped Build.</span></h4>
          </div>
          <div className="flex-grow overflow-hidden relative">
            <Marquee pauseOnHover className="[--duration:25s]">
              {[
                "/clients_clients01.webp",
                "/clients_clients02.webp",
                "/clients_clients03.webp",
                "/clients_clients04.webp",
                "/clients_clients05.webp",
                "/clients_clients06.webp",
              ].map((src, i) => (
                <img key={i} src={src} alt="client" className="h-14 w-auto object-contain opacity-50 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 mx-6" />
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white/5" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white/5" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="relative min-h-screen py-32 px-6 flex items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block"
              >
                What We Do
              </motion.span>
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-display font-black uppercase leading-none"
              >
                Everything Your <span className="text-white/30">Brand</span> Needs.
              </motion.h3>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 max-w-sm text-sm leading-relaxed"
            >
              From pixel-perfect design to scalable code — we handle every piece of your digital presence so you can focus on growing your business.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Palette size={24} />, title: "Web Design", desc: "Creative, modern designs that captivate and convert.", img: "/services_webapp.webp" },
              { icon: <Code2 size={24} />, title: "Web Development", desc: "Robust, scalable solutions using modern technologies.", img: "/services_backend.webp" },
              { icon: <Smartphone size={24} />, title: "Mobile App Dev", desc: "Native and cross-platform apps for iOS and Android.", img: "/services_mobile.webp" },
              { icon: <Globe size={24} />, title: "SEO Optimization", desc: "Data-driven strategies to boost organic traffic.", img: "/services_seo.webp" },
              { icon: <Sparkles size={24} />, title: "Logo & Branding", desc: "Professional identity packages that stand out.", img: "/services_logoandbranding.webp" },
              { icon: <Smartphone size={24} />, title: "E-Commerce", desc: "Complete platforms with secure payment gateways.", img: "/services_ecom.webp" },
              { icon: <Code2 size={24} />, title: "WordPress Dev", desc: "Custom themes and plugins tailored to your needs.", img: "/services_wordpress.webp" },
              { icon: <Smartphone size={24} />, title: "UI/UX Design", desc: "User-centered design that makes products intuitive.", img: "/services_ui.webp" },
              { icon: <MessageCircle size={24} />, title: "Social Media", desc: "Strategic campaigns that build engagement and leads.", img: "/services_smm.webp" },
              { icon: <Palette size={24} />, title: "Video & Animation", desc: "Compelling visuals that communicate effectively.", img: "/services_videoandanimation.webp" },
              { icon: <Code2 size={24} />, title: "Maintenance", desc: "Ongoing updates and security monitoring.", img: "/services_websitemaintenance.webp" },
              { icon: <Globe size={24} />, title: "Domain & Hosting", desc: "Fast, secure, and reliable hosting solutions.", img: "/services_domainandhosting.webp" }
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
                  <div className="w-full aspect-video rounded-xl overflow-hidden mb-4">
                    <img src={service.img} alt={service.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  </div>
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
      <section id="portfolio" className="relative min-h-screen py-32 px-6 bg-[#020c18]">
        <div className="absolute bottom-0 right-0 w-[60vw] h-[60vh] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20 text-center">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block"
            >
              Our Portfolio
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter mb-8"
            >
              Work That <span className="text-primary">Speaks.</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 mb-12"
            >
              500+ projects delivered across 30+ industries. Every pixel intentional, every line of code purposeful.
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
              { count: "500+", label: "Projects Delivered" },
              { count: "300+", label: "Satisfied Clients" },
              { count: "15+", label: "Years in Business" },
              { count: "50+", label: "Expert Creators" }
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
      <section id="technologies" className="relative min-h-screen py-32 px-6">
        <div className="absolute top-1/2 left-0 w-[50vw] h-[70vh] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-20">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Tech Stack</span>
            <h3 className="text-4xl md:text-6xl font-display font-black uppercase mb-12">Built With <span className="text-white/30">the Best.</span></h3>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
              {[
                { name: 'React', img: '/technology_code.webp' },
                { name: 'Node.js', img: '/technology_zex.webp' },
                { name: 'MongoDB', img: '/technology_mongo.webp' },
                { name: 'Python', img: '/technology_code.webp' },
                { name: 'AWS', img: '/technology_materialize.webp' },
                { name: 'Figma', img: '/technodesign.webp' },
                { name: 'TypeScript', img: '/technology_css.webp' },
                { name: 'Tailwind', img: '/technology_html.webp' }
              ].map((tech, i) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:bg-white/10 transition-all cursor-default"
                >
                  <div className="h-24 overflow-hidden">
                    <img src={tech.img} alt={tech.name} className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500" />
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <span className="text-lg font-bold group-hover:text-primary transition-colors">{tech.name}</span>
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                      <Sparkles size={14} className="text-white/20 group-hover:text-white" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-20">
                <h4 className="text-3xl font-display font-black uppercase mb-12 text-center">How We <span className="text-primary">Get It Done.</span></h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                    { step: "01", title: "Discovery", desc: "We dig deep into your goals, audience, and market to craft a winning strategy.", img: "/discovery.webp" },
                    { step: "02", title: "Design", desc: "Bold, conversion-focused UI/UX that looks stunning on every screen.", img: "/designanddevelopment.webp" },
                    { step: "03", title: "Build", desc: "Rock-solid code built for speed, security, and scale.", img: "/technodesign.webp" },
                    { step: "04", title: "Launch", desc: "We go live — then stay by your side to grow and optimize.", img: "/testing.webp" }
                  ].map((item, i) => (
                    <motion.div
                      key={item.step}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative rounded-3xl bg-white/[0.02] border border-white/5 group hover:border-primary/30 transition-all overflow-hidden"
                    >
                      <div className="h-36 overflow-hidden">
                        <img src={item.img} alt={item.title} className="w-full h-full object-cover opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-500" />
                      </div>
                      <div className="p-8 relative">
                        <span className="text-5xl font-display font-black text-white/5 absolute top-2 right-6 group-hover:text-primary/10 transition-colors">{item.step}</span>
                        <h5 className="text-xl font-bold mb-4">{item.title}</h5>
                        <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="relative min-h-screen py-32 px-6 bg-deep overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vh] bg-primary/5 rounded-full blur-[160px] pointer-events-none" />
        {/* ... existing packages code ... */}
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block"
            >
              Transparent Pricing
            </motion.span>
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-7xl font-display font-black uppercase"
            >
              Premium Quality, <span className="text-primary">Real Prices.</span>
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/40 mt-4 max-w-xl mx-auto"
            >
              No hidden fees. No surprises. Just world-class digital work at prices that make sense for growing businesses.
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
      <section id="team" className="relative min-h-screen py-32 px-6">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">The Dream Team</span>
            <h3 className="text-4xl md:text-6xl font-display font-black uppercase leading-tight">The People <span className="text-white/30">Behind the Magic.</span></h3>
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
      <section id="blog" className="relative min-h-screen py-32 px-6 bg-deep overflow-hidden">
        <div className="absolute top-0 right-0 w-[55vw] h-[60vh] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <div>
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">From Our Blog</span>
              <h3 className="text-4xl md:text-6xl font-display font-black uppercase">Ideas Worth <span className="text-white/30">Reading.</span></h3>
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
      <section id="faq" className="relative min-h-screen py-32 px-6">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vh] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Got Questions?</span>
            <h3 className="text-4xl md:text-6xl font-display font-black uppercase">We've Got <span className="text-white/30">Answers.</span></h3>
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
              <span className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 block opacity-80">Stay in the Loop</span>
              <h3 className="text-4xl md:text-6xl font-display font-black uppercase mb-8 leading-tight">Elite Insights <br /> Straight to Your <span className="italic opacity-50">Inbox.</span></h3>
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
              <p className="mt-8 text-xs font-medium opacity-60">Join 5,000+ founders & marketers. Zero spam. Unsubscribe anytime.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative min-h-screen py-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-0 w-[60vw] h-[70vh] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Who We Are</span>
              <h3 className="text-5xl font-display font-black uppercase mb-8 leading-tight">Built to Help Businesses <span className="text-primary">Scale Fast.</span></h3>
              <p className="text-white/60 leading-relaxed mb-8 text-lg">
                Software Elites is a results-driven software company. We turn ambitious ideas into powerful digital products — building websites, apps, and custom software that don't just look great, they perform.
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
                src="/aboutimg.webp"
                alt="Our Team"
                className="w-full h-full object-cover grayscale brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03080f] via-transparent to-transparent" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 pt-20 border-t border-white/5">
             <div className="lg:col-span-1">
               <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Trust</span>
               <h3 className="text-5xl font-display font-black uppercase mb-6 leading-none">Real Words <br /> from Real <br /> <span className="text-white/20">Clients.</span></h3>
               <Quote size={80} className="text-white/5" />
             </div>
             
             <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 items-start">
               {[
                 { name: "Sarah Johnson", role: "CEO at TechStart", text: "Software Elites transformed our online presence. Their development team is incredibly talented." },
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
      <section id="contact" className="relative min-h-screen py-32 px-6 overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[55vw] h-[80vh] bg-primary/8 rounded-full blur-[160px] -translate-y-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10">
              <span className="text-primary font-black uppercase tracking-[0.4em] text-[10px] mb-6 block">Work With Us</span>
              <h3 className="text-6xl md:text-8xl font-display font-black uppercase tracking-tighter mb-8 leading-[0.85]">
                Let's Build <br />
                Something <span className="text-primary italic">Great.</span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mt-16 pt-16 border-t border-white/5">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-4">Direct Communication</span>
                  <div className="space-y-4">
                    <a href="mailto:info@softwareelites.com" className="group flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <MessageCircle size={14} className="text-white/60 group-hover:text-white" />
                      </div>
                      <span className="font-bold border-b border-primary/20 group-hover:border-primary transition-all">info@softwareelites.com</span>
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
                    <textarea rows={4} placeholder="Tell us about your project, goals, and timeline..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 focus:outline-none focus:border-primary/50 transition-all resize-none placeholder:text-white/10" />
                  </div>

                  <button className="w-full bg-primary text-white font-black uppercase text-xs tracking-[0.4em] py-7 rounded-2xl hover:brightness-110 shadow-2xl shadow-primary/30 transition-all active:scale-[0.98]">
                    Let's Build Together →
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-[#020c18]">
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
                  software<span className="text-primary font-black lowercase">elites</span>
                </span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                We turn bold visions into elite software. Websites, apps, and custom systems built to grow, convert, and last.
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
                    <a href="mailto:info@softwareelites.com" className="text-sm font-bold border-b border-primary/20 hover:border-primary transition-all">info@softwareelites.com</a>
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
              <span>© 2025 Software Elites. All rights reserved.</span>
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
              <div className="bg-white text-[#03080f] px-8 py-5 rounded-[2.5rem] rounded-br-[0.5rem] shadow-2xl text-[14px] font-bold flex items-center gap-3 backdrop-blur-md">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">👋</span>
                </div>
                Hey! Ready to grow your brand? 🚀
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChatOpen(true)}
                className="bg-white/95 backdrop-blur-md text-primary px-6 py-4 rounded-[1.5rem] shadow-xl text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10 pointer-events-auto cursor-pointer flex items-center gap-2 group transition-all"
              >
                <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                I have a question 💬
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsChatOpen(true)}
                className="bg-white/95 backdrop-blur-md text-primary px-6 py-4 rounded-[1.5rem] shadow-xl text-[10px] font-black uppercase tracking-[0.2em] border border-primary/10 pointer-events-auto cursor-pointer flex items-center gap-2 group transition-all"
              >
                <Smartphone size={14} className="group-hover:scale-110 transition-transform" />
                Get a free quote
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
             <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-[#03080f] animate-ping" />
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
