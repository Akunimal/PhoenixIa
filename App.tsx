import React, { FC, ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Server, BrainCircuit, ArrowRight, MapPin, Camera, 
  Cpu, Wifi, MessageCircle, TrendingUp, Clock, Bot,
  LayoutDashboard, ShoppingCart, Settings, LogOut, Search, AlertTriangle, FileText, Zap
} from 'lucide-react';

// ==========================================
// 0. ESTILOS GLOBALES Y UTILIDADES AERO
// ==========================================

// Clase para el efecto Cristal (Glass)
const glassCard = "bg-slate-900/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]";
const glassBtn = "relative overflow-hidden bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 backdrop-blur-md transition-all duration-300 shadow-[0_0_15px_rgba(34,211,238,0.1)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)]";

// Animación de Reflejo (Shimmer)
const ShimmerEffect = () => (
  <motion.div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{
      background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 25%, transparent 30%)"
    }}
    animate={{ x: ["-100%", "200%"] }}
    transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 1 }}
  />
);

// Fondo Tech Mosaico (Nano Pattern)
const NanoTechBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-slate-950">
    <svg className="absolute w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
      <pattern id="nano-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
        <path d="M30 30h1v1h-1zM10 10h1v1h-1zM50 50h1v1h-1z" fill="currentColor" className="text-cyan-400"/>
        <path d="M0 60 L60 0" stroke="currentColor" strokeWidth="0.5" className="text-cyan-400 opacity-20"/>
      </pattern>
      <rect width="100%" height="100%" fill="url(#nano-pattern)" />
    </svg>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_90%)]" />
    <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
  </div>
);

// ==========================================
// 1. COMPONENTES DEL DASHBOARD / DEMO
// ==========================================

enum View { DASHBOARD, POS, AUDITOR, CONFIG }

const MetricCard: FC<{ title: string; value: string; trend: string; isPositive?: boolean; delay?: number }> = ({ title, value, trend, isPositive, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`${glassCard} p-6 rounded-2xl group hover:border-cyan-500/30 transition-colors relative overflow-hidden`}
  >
    <ShimmerEffect />
    <div className="relative z-10">
      <h3 className="text-slate-400 text-sm font-medium mb-2 uppercase tracking-wider">{title}</h3>
      <div className="text-4xl font-bold text-white mb-2 drop-shadow-md">{value}</div>
      <div className={`text-sm font-bold ${isPositive ? 'text-cyan-400' : 'text-red-400'} flex items-center gap-1`}>
        {isPositive ? <TrendingUp className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
        {trend}
      </div>
    </div>
  </motion.div>
);

const Sidebar: FC<{ currentView: View; onNavigate: (v: View) => void; onExit: () => void }> = ({ currentView, onNavigate, onExit }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: View.POS, label: 'Punto de Venta', icon: ShoppingCart },
    { id: View.AUDITOR, label: 'Auditor IA', icon: Bot },
    { id: View.CONFIG, label: 'Configuración', icon: Settings },
  ];

  return (
    <aside className={`w-64 h-screen fixed left-0 top-0 p-6 flex flex-col justify-between z-50 ${glassCard} border-r border-slate-700/50 rounded-r-3xl`}>
      <div>
        <div className="flex items-center gap-3 mb-10 px-2">
          <img src="/logo-phoenix.png" alt="Logo" className="h-8 w-auto drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
          <span className="font-bold text-white tracking-tight text-lg">PHOENIX <span className="text-cyan-400">POS</span></span>
        </div>
        <nav className="space-y-3">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group ${
                currentView === item.id 
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_15px_rgba(34,211,238,0.15)]' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {currentView === item.id && <ShimmerEffect />}
              <item.icon className={`w-5 h-5 relative z-10 ${currentView === item.id ? 'animate-pulse' : ''}`} />
              <span className="font-medium relative z-10">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <button onClick={onExit} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20">
        <LogOut className="w-5 h-5" />
        <span>Salir de Demo</span>
      </button>
    </aside>
  );
};

const DashboardView = () => (
  <div className="space-y-8">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} 
      className="text-3xl font-bold text-white drop-shadow-lg"
    >
      Resumen Operativo <span className="text-cyan-400 text-lg font-normal ml-2">| Tiempo Real</span>
    </motion.h2>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard title="Ventas del Día" value="$ 1.250.400" trend="+15% vs ayer" isPositive delay={0.1} />
      <MetricCard title="Tiempo Ahorrado (IA)" value="4.5 hs" trend="Gestión Automática" isPositive delay={0.2} />
      <MetricCard title="Margen Promedio" value="32%" trend="-2% Alerta de Costos" isPositive={false} delay={0.3} />
    </div>

    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}
      className={`${glassCard} rounded-2xl p-8 relative overflow-hidden`}
    >
      <div className="absolute top-0 right-0 p-4 opacity-20"><Bot className="w-32 h-32 text-cyan-400" /></div>
      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
        <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" /> Insights de Phoenix IA
      </h3>
      <div className="space-y-4 relative z-10">
        {[
          "Se detectó un aumento del 5% en el proveedor de Café. Se sugiere ajustar precio de venta a $2800.",
          "El stock de 'Bebidas Cola' está bajo para el fin de semana. ¿Generar orden de compra?",
          "3 reservas confirmadas automáticamente por WhatsApp en la última hora."
        ].map((alert, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.01, x: 5 }}
            className="flex gap-4 p-4 bg-slate-950/60 rounded-xl border border-white/5 hover:border-cyan-500/30 transition-all cursor-default"
          >
             <div className="mt-1"><BrainCircuit className="w-4 h-4 text-cyan-400" /></div>
             <p className="text-slate-300 text-sm">{alert}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);

const POSView = () => (
  <div className="grid grid-cols-3 gap-6 h-[85vh]">
    <motion.div 
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
      className={`col-span-2 ${glassCard} rounded-2xl p-6 overflow-hidden flex flex-col`}
    >
       <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Menú / Productos</h2>
          <div className="relative group">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-cyan-400 transition-colors" />
            <input type="text" placeholder="Buscar..." className="bg-slate-950/50 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all w-64 focus:w-72" />
          </div>
       </div>
       <div className="grid grid-cols-3 gap-4 overflow-y-auto pr-2 pb-2 custom-scrollbar">
          {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
            <motion.div 
              key={i} 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-950/80 p-4 rounded-xl border border-white/5 hover:border-cyan-500/50 cursor-pointer transition-all shadow-lg relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="h-20 bg-slate-900/50 rounded-lg mb-3 flex items-center justify-center border border-white/5">
                 <Camera className="text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </div>
              <p className="text-white font-medium text-sm">Producto {i}</p>
              <p className="text-cyan-400 font-bold">$ {i}500</p>
            </motion.div>
          ))}
       </div>
    </motion.div>

    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
      className={`col-span-1 ${glassCard} rounded-2xl p-6 flex flex-col justify-between relative`}
    >
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 opacity-50" />
       <div>
         <h2 className="text-xl font-bold text-white mb-6 flex justify-between items-center">
            Ticket Actual <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400">#042</span>
         </h2>
         <div className="space-y-3 mb-4 max-h-[50vh] overflow-y-auto">
           <div className="flex justify-between text-slate-300 text-sm p-2 hover:bg-white/5 rounded"><span>2x Café Especial</span><span>$ 5.600</span></div>
           <div className="flex justify-between text-slate-300 text-sm p-2 hover:bg-white/5 rounded"><span>1x Tostado</span><span>$ 4.200</span></div>
           <div className="flex justify-between text-slate-300 text-sm p-2 hover:bg-white/5 rounded"><span>1x Jugo Naranja</span><span>$ 3.500</span></div>
         </div>
       </div>
       <div>
         <div className="border-t border-white/10 pt-4 flex justify-between text-white font-bold text-2xl mb-6">
            <span>Total</span><span className="text-cyan-400">$ 13.300</span>
         </div>
         <button className={`w-full ${glassBtn} py-4 rounded-xl font-bold flex items-center justify-center gap-2 group`}>
           <ShimmerEffect />
           <FileText className="w-5 h-5 relative z-10" /> 
           <span className="relative z-10 group-hover:tracking-wider transition-all">Facturar (AFIP)</span>
         </button>
       </div>
    </motion.div>
  </div>
);

const DemoApp: FC<{ onExit: () => void }> = ({ onExit }) => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD: return <DashboardView />;
      case View.POS: return <POSView />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
          <Clock className="w-16 h-16 mb-6 opacity-30 animate-pulse" />
          <h2 className="text-2xl font-bold mb-2">Módulo en Desarrollo</h2>
          <p>Esta sección estará disponible en la versión completa.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen font-sans relative overflow-hidden">
      <NanoTechBackground />
      <Sidebar currentView={currentView} onNavigate={setCurrentView} onExit={onExit} />
      <main className="flex-1 ml-64 p-8 relative z-10">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Chatbot Flotante Demo Glass */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1 }}
        className={`fixed bottom-6 right-6 w-80 ${glassCard} rounded-2xl overflow-hidden z-50`}
      >
        <div className="bg-cyan-500/20 p-4 border-b border-white/10 flex items-center gap-3 backdrop-blur-md">
           <div className="relative">
             <Bot className="w-8 h-8 text-cyan-400" />
             <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
           </div>
           <div>
             <h4 className="font-bold text-white text-sm">Phoenix Bot</h4>
             <p className="text-xs text-cyan-200/70">Auditoría en tiempo real</p>
           </div>
        </div>
        <div className="p-4 h-48 overflow-y-auto space-y-3 text-sm bg-slate-950/40">
           <div className="bg-white/5 p-3 rounded-lg rounded-tl-none text-slate-200 border border-white/5">
             Hola, el precio de la harina subió un 8%. ¿Recalculo costos?
           </div>
           <div className="bg-cyan-500/20 p-3 rounded-lg rounded-tr-none text-cyan-100 ml-auto max-w-[85%] border border-cyan-500/20">
             Sí, actualiza los precios ahora.
           </div>
        </div>
      </motion.div>
    </div>
  );
};

// ==========================================
// 2. LANDING PAGE (Estilo Glass)
// ==========================================

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.99] } 
  }
};

const services = [
    { id: 'ia-impulso', icon: Bot, name: "Paquete Impulso IA", desc: "WhatsApp con el ADN de tu empresa: respuestas automáticas humanas, auditoría diaria de precios y automatización de gestión." },
    { id: 'it-pro', icon: Server, name: "Infraestructura IT", desc: "Servidores de alta disponibilidad y soporte preventivo. Soluciones robustas para que tu operativa no se detenga nunca." },
    { id: 'redes-wifi', icon: Wifi, name: "WiFi de Alta Densidad", desc: "Diseño e instalación de redes para hoteles y complejos. Gestión de ancho de banda garantizada." },
    { id: 'seguridad-ia', icon: Camera, name: "Seguridad Inteligente", desc: "Cámaras con analítica de video y alarmas Grado 2. Monitoreo avanzado que entiende lo que ve." },
    { id: 'workstations', icon: Cpu, name: "Workstations & Gaming", desc: "Hardware de alto rendimiento para AutoCAD, Render 3D y Gaming extremo. Armado técnico certificado." },
];

const navLinks = [
  { name: 'Servicios', href: '#servicios' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'IA', href: '#ia' },
  { name: 'Contacto', href: '#contacto' }
];

const MotionSection: FC<{ children: ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.section
      id={id}
      ref={ref}
      className={`py-24 md:py-32 ${className} relative z-10`}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="container mx-auto px-6">{children}</div>
    </motion.section>
  );
};

const AnimatedCTA: FC<{ onClick?: () => void; children: ReactNode; primary?: boolean }> = ({ onClick, children, primary = true }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className={`group relative flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-300 overflow-hidden ${
      primary 
      ? 'bg-cyan-500/80 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]' 
      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-cyan-500/50'
    }`}
  >
    <ShimmerEffect />
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  </motion.button>
);

const LandingPage: FC<{ onEnterDemo: () => void }> = ({ onEnterDemo }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [whatsappUrl, setWhatsappUrl] = useState("https://wa.me/542255605257");

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const phone = "542255605257";
    const message = encodeURIComponent("Hola Phoenix IA, me interesa el Paquete de Impulso con IA para mi negocio.");
    if (isMobile) setWhatsappUrl(`whatsapp://send?phone=${phone}&text=${message}`);
    else setWhatsappUrl(`https://web.whatsapp.com/send?phone=${phone}&text=${message}`);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="text-slate-200 font-sans selection:bg-cyan-500/30 relative">
      <NanoTechBackground />
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 z-[60] origin-left shadow-[0_0_10px_#22d3ee]" style={{ scaleX }} />

      <nav className="fixed top-0 w-full z-50 bg-slate-950/60 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 cursor-pointer group">
            <img src="/logo-phoenix.png" alt="Phoenix IA Logo" className="h-10 w-auto transition-transform group-hover:scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="text-xl font-black tracking-tighter text-white uppercase drop-shadow-md">Phoenix <span className="text-cyan-400">IA</span></span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(item => (
              <a key={item.name} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-xs font-bold text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-widest">
                {item.name}
              </a>
            ))}
            <button onClick={onEnterDemo} className="flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg transition-all border border-cyan-500/30 text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <LayoutDashboard className="w-4 h-4 animate-pulse" /> Live Demo
            </button>
          </div>
        </div>
      </nav>

      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative z-10">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-black mb-6 leading-tight text-white tracking-tighter drop-shadow-2xl">
            MENOS GESTIÓN.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 filter drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]">MÁS RENTABILIDAD.</span>
          </motion.h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-300 mb-10 leading-relaxed font-light">
            Evolucionamos negocios en la costa mediante <strong>Inteligencia Artificial aplicada</strong>. Ahorramos tiempo administrativo y optimizamos tus precios automáticamente.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
             <AnimatedCTA onClick={onEnterDemo} primary={false}>
                <LayoutDashboard className="w-5 h-5 text-cyan-400" /> 
                <span>Probar Demo Interactiva</span>
            </AnimatedCTA>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <AnimatedCTA>
                <MessageCircle className="w-5 h-5" />
                <span>Consultar por WhatsApp</span>
              </AnimatedCTA>
            </a>
          </div>
        </div>
      </section>

      <MotionSection id="servicios">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4 drop-shadow-lg">Soluciones de Próxima Generación</h2>
          <p className="text-cyan-400 uppercase tracking-widest text-sm font-bold shadow-cyan-500/50">Tecnología certificada por Google</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={s.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className={`${glassCard} p-10 rounded-3xl group transition-all duration-500 relative`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
              <s.icon className="w-14 h-14 text-cyan-400 mb-6 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-all duration-500" />
              <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{s.name}</h3>
              <p className="text-slate-300 mb-6 text-sm leading-relaxed relative z-10">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </MotionSection>

      <MotionSection id="nosotros">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">Tu Negocio en <span className="text-cyan-400">Piloto Automático</span></h2>
            <div className="space-y-6">
              {[
                { icon: Clock, text: "Ahorro de Tiempo masivo: Automatizamos la atención al cliente inicial." },
                { icon: TrendingUp, text: "Auditoría de Precios: Recomendaciones diarias basadas en el mercado." },
                { icon: BrainCircuit, text: "Google AI Leader: Modelos con el ADN de tu empresa." }
              ].map((item, i) => (
                <div key={i} className={`flex gap-4 p-4 rounded-xl ${glassCard} border-transparent hover:border-cyan-500/30 transition-all`}>
                  <div className="mt-1 flex-shrink-0"><item.icon className="text-cyan-400 w-6 h-6" /></div>
                  <p className="text-slate-300 font-light">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className={`${glassCard} p-12 rounded-3xl text-center relative overflow-hidden`}>
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 blur-3xl rounded-full"></div>
            <h3 className="text-2xl font-bold text-white mb-4 italic relative z-10">"Expertos certificados en IA Generativa"</h3>
            <p className="text-slate-300 mb-8 relative z-10">Trayendo lo mejor de Silicon Valley a Villa Gesell.</p>
            <div className="flex justify-center gap-4 flex-wrap relative z-10">
              <span className="text-xs font-mono bg-cyan-500/10 text-cyan-300 px-4 py-2 rounded-full border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]">Google Cloud Candidate</span>
              <span className="text-xs font-mono bg-cyan-500/10 text-cyan-300 px-4 py-2 rounded-full border border-cyan-500/30 shadow-[0_0_10px_rgba(34,211,238,0.2)]">AI Leader Certified</span>
            </div>
          </div>
        </div>
      </MotionSection>

      <footer id="contacto" className="py-24 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl text-center relative z-10">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tighter drop-shadow-lg">¿LISTO PARA ESCALAR?</h2>
          <div className="flex justify-center mt-10">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <AnimatedCTA>
                <MessageCircle className="w-6 h-6" />
                <span>Hablar con un Especialista</span>
              </AnimatedCTA>
            </a>
          </div>
          <div className="mt-16 flex flex-col items-center gap-2 text-slate-500 text-sm">
            <div className="flex gap-2 items-center">
              <MapPin className="w-4 h-4 text-cyan-500" /> Villa Gesell • Mar de las Pampas • Mar Azul
            </div>
            <p>© 2026 PHOENIX IA | PHOENIX NEURAL SUITE</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ==========================================
// 3. MAIN APP
// ==========================================

export default function App() {
  const [isDemoMode, setIsDemoMode] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {isDemoMode ? (
        <motion.div 
          key="demo"
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }} 
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.5 }}
        >
          <DemoApp onExit={() => setIsDemoMode(false)} />
        </motion.div>
      ) : (
        <motion.div 
          key="landing"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LandingPage onEnterDemo={() => setIsDemoMode(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
