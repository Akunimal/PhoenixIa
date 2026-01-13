import React, { FC, ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Server, BrainCircuit, ArrowRight, MapPin, Camera, 
  Cpu, Wifi, MessageCircle, TrendingUp, Clock, Bot,
  LayoutDashboard, ShoppingCart, Settings, LogOut, Search, 
  AlertTriangle, FileText, Zap, ChevronRight, BarChart3, Terminal
} from 'lucide-react';

// ==========================================
// 0. ESTILOS GLOBALES Y UTILIDADES (OPTIMIZADOS)
// ==========================================

// Efecto Cristal Optimizado (Menos blur para mejor rendimiento)
const glassCard = "bg-slate-900/60 backdrop-blur-md border border-white/5 shadow-xl";

// Variantes de Animación Ligeras
const fadeInScale = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

const hoverEffect = {
  hover: { y: -4, transition: { duration: 0.2 } },
  tap: { scale: 0.98 }
};

// Hook para Efecto Máquina de Escribir (Typewriter)
const useTypewriter = (text: string, speed: number = 20, start: boolean = false) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    if (!start) return;
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, start]);

  return displayText;
};

// ==========================================
// 1. COMPONENTES DEL DASHBOARD / DEMO
// ==========================================

enum View { DASHBOARD, POS, AUDITOR, CONFIG }

// Configuración de Temas por Sección
const themes = {
  [View.DASHBOARD]: { color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10', glow: 'shadow-cyan-500/20' },
  [View.POS]: { color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10', glow: 'shadow-emerald-500/20' },
  [View.AUDITOR]: { color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10', glow: 'shadow-amber-500/20' },
  [View.CONFIG]: { color: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10', glow: 'shadow-violet-500/20' },
};

const MetricCard: FC<{ title: string; value: string; trend: string; isPositive?: boolean; theme: any }> = ({ title, value, trend, isPositive, theme }) => (
  <motion.div 
    variants={fadeInScale}
    whileHover="hover"
    className={`${glassCard} p-6 rounded-2xl border-l-4 ${theme.border.replace('/30', '')} relative overflow-hidden group`}
  >
    {/* Efecto de Brillo solo en Hover */}
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
      variants={{ hover: { x: "200%", transition: { duration: 0.6 } } }}
    />
    <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">{title}</h3>
    <div className="text-3xl font-bold text-white mb-2">{value}</div>
    <div className={`text-sm font-bold flex items-center gap-1 ${isPositive ? theme.color : 'text-red-400'}`}>
      {isPositive ? <TrendingUp className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
      {trend}
    </div>
  </motion.div>
);

const Sidebar: FC<{ currentView: View; onNavigate: (v: View) => void; onExit: () => void }> = ({ currentView, onNavigate, onExit }) => {
  const t = themes[currentView];
  
  const menuItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: View.POS, label: 'Punto de Venta', icon: ShoppingCart },
    { id: View.AUDITOR, label: 'Auditor IA', icon: Bot },
    { id: View.CONFIG, label: 'Configuración', icon: Settings },
  ];

  return (
    <aside className={`w-64 h-screen fixed left-0 top-0 p-6 flex flex-col justify-between z-50 bg-slate-950 border-r border-slate-800 transition-colors duration-500`}>
      <div>
        <div className="flex items-center gap-3 mb-10 px-2">
          <img src="/logo-phoenix.png" alt="Logo" className="h-8 w-auto" />
          <span className="font-bold text-white tracking-tight text-lg">PHOENIX <span className={`transition-colors duration-500 ${t.color}`}>SUITE</span></span>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              whileHover={{ x: 5 }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                currentView === item.id 
                ? `${t.bg} ${t.color} border ${t.border}` 
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {currentView === item.id && <motion.div layoutId="active-pill" className={`ml-auto w-1.5 h-1.5 rounded-full ${t.color.replace('text-', 'bg-')}`} />}
            </motion.button>
          ))}
        </nav>
      </div>
      <button onClick={onExit} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-950/30 rounded-xl transition-all border border-transparent hover:border-red-900/50">
        <LogOut className="w-5 h-5" />
        <span>Salir de Demo</span>
      </button>
    </aside>
  );
};

// --- VISTAS DEL DEMO ---

const DashboardView = () => {
  const t = themes[View.DASHBOARD];
  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="space-y-8">
      <div className="flex justify-between items-end">
        <h2 className="text-3xl font-bold text-white">Resumen <span className={t.color}>General</span></h2>
        <span className="text-slate-500 text-sm font-mono">Actualizado: Ahora mismo</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Ventas Hoy" value="$ 850.200" trend="+12%" isPositive theme={t} />
        <MetricCard title="Tickets" value="142" trend="+5%" isPositive theme={t} />
        <MetricCard title="Eficiencia IA" value="98%" trend="Óptimo" isPositive theme={t} />
      </div>

      <div className={`p-1 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900`}>
        <div className="bg-slate-950 rounded-xl p-6 h-64 flex items-center justify-center border border-slate-800 relative overflow-hidden">
             <BarChart3 className={`w-full h-full opacity-10 ${t.color}`} />
             <p className="absolute text-slate-400">Gráfico de rendimiento interactivo disponible en versión full</p>
        </div>
      </div>
    </motion.div>
  );
};

const POSView = () => {
  const t = themes[View.POS];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-6 h-[85vh]">
      <div className={`col-span-2 ${glassCard} rounded-2xl p-6 flex flex-col`}>
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Punto de Venta <span className={t.color}>Rápido</span></h2>
            <input type="text" placeholder="Buscar producto..." className="bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:border-emerald-500 outline-none transition-colors" />
         </div>
         <div className="grid grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-slate-950/80 p-4 rounded-xl border border-white/5 hover:${t.border} cursor-pointer transition-all group`}
              >
                <div className={`h-16 bg-slate-900 rounded-lg mb-3 flex items-center justify-center group-hover:${t.bg} transition-colors`}>
                   <Camera className="text-slate-600" />
                </div>
                <p className="text-white font-medium text-sm">Item {i}</p>
                <p className={`${t.color} font-bold`}>$ {i}500</p>
              </motion.div>
            ))}
         </div>
      </div>

      <div className={`col-span-1 ${glassCard} rounded-2xl p-6 flex flex-col justify-between border-t-4 ${t.border.replace('/30','')}`}>
         <div>
           <h2 className="text-xl font-bold text-white mb-6">Ticket #055</h2>
           <div className="space-y-3 mb-4">
             <div className="flex justify-between text-slate-300 text-sm"><span>2x Café</span><span>$ 5.600</span></div>
             <div className="flex justify-between text-slate-300 text-sm"><span>1x Tostado</span><span>$ 4.200</span></div>
           </div>
         </div>
         <motion.button 
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
           className={`w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20`}
         >
           <FileText className="w-5 h-5" /> Cobrar y Facturar
         </motion.button>
      </div>
    </motion.div>
  );
};

const AuditorView = () => {
  const t = themes[View.AUDITOR];
  const [analyzing, setAnalyzing] = useState(false);
  const [complete, setComplete] = useState(false);

  const analysisText = useTypewriter(
    "> Conectando con base de datos...\n> Analizando historial de ventas (CSV)...\n> Detectando patrones de consumo estacional...\n> ALERTA: Costo de materia prima 'Harina 000' subió 12%.\n> SUGERENCIA: Ajustar precio 'Medialunas' a $850 (+10%).\n> PROYECCIÓN: Incremento de margen neto estimado: 4.5%.\n> Estado del sistema: OPTIMIZADO.",
    25, // Velocidad rápida
    analyzing
  );

  const handleAudit = () => {
    setAnalyzing(true);
    setComplete(false);
    // Simular fin de análisis
    setTimeout(() => setComplete(true), 6000); 
  };

  return (
    <div className="h-full flex flex-col items-center justify-center max-w-3xl mx-auto text-center">
      {!analyzing ? (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-8">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-500/20 blur-[60px] rounded-full animate-pulse" />
            <Bot className="w-32 h-32 text-amber-400 mx-auto relative z-10" />
          </div>
          <h2 className="text-4xl font-bold text-white">Auditoría Inteligente</h2>
          <p className="text-slate-400 text-lg max-w-md mx-auto">
            Nuestra IA analizará tus costos, ventas y competencia para sugerirte mejoras de rentabilidad inmediatas.
          </p>
          <motion.button
            onClick={handleAudit}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(251, 191, 36, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 px-10 py-5 rounded-full font-black text-xl flex items-center gap-3 mx-auto shadow-xl shadow-amber-500/20"
          >
            <Zap className="w-6 h-6 fill-slate-900" />
            IMPULSA MI NEGOCIO!
          </motion.button>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-left bg-slate-950 border border-amber-500/30 rounded-xl p-8 font-mono text-amber-400 shadow-2xl relative overflow-hidden h-[400px]">
          <div className="absolute top-0 left-0 w-full h-1 bg-amber-500/50 animate-pulse" />
          <div className="flex items-center gap-2 mb-4 text-slate-500 border-b border-slate-800 pb-2">
            <Terminal className="w-4 h-4" />
            <span className="text-xs">PHOENIX_AI_KERNEL v2.4.0</span>
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed">
            {analysisText}
            {complete && <span className="animate-pulse">_</span>}
          </pre>
          
          {complete && (
             <motion.div 
               initial={{ y: 20, opacity: 0 }} 
               animate={{ y: 0, opacity: 1 }}
               className="mt-6 flex justify-end"
             >
               <button onClick={() => setAnalyzing(false)} className="text-sm text-slate-400 hover:text-white underline">Reiniciar Auditoría</button>
             </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
};

const DemoApp: FC<{ onExit: () => void }> = ({ onExit }) => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD: return <DashboardView />;
      case View.POS: return <POSView />;
      case View.AUDITOR: return <AuditorView />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
          <Settings className="w-16 h-16 mb-6 opacity-30 animate-spin-slow" />
          <h2 className="text-2xl font-bold mb-2">Configuración</h2>
          <p>Ajustes de usuarios y permisos en desarrollo.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-slate-950 relative overflow-hidden">
      {/* Fondo estático sutil para rendimiento */}
      <div className="fixed inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #334155 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <Sidebar currentView={currentView} onNavigate={setCurrentView} onExit={onExit} />
      
      <main className="flex-1 ml-64 p-8 relative z-10">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// ==========================================
// 2. LANDING PAGE (Estilo Glass Optimizado)
// ==========================================

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" } 
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
      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40' 
      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-cyan-500/50'
    }`}
  >
    {/* Brillo solo en Hover para rendimiento */}
    <motion.div 
      className="absolute inset-0 bg-white/20 -translate-x-full"
      variants={{ hover: { x: "100%", transition: { duration: 0.5 } } }} 
    />
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
    <div className="text-slate-200 font-sans selection:bg-cyan-500/30 relative bg-slate-950">
      {/* Fondo Mosaico Estático para rendimiento */}
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]"></div>
      </div>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 z-[60] origin-left shadow-[0_0_10px_#22d3ee]" style={{ scaleX }} />

      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 cursor-pointer group">
            <img src="/logo-phoenix.png" alt="Phoenix IA Logo" className="h-10 w-auto transition-transform group-hover:scale-110" />
            <span className="text-xl font-black tracking-tighter text-white uppercase">Phoenix <span className="text-cyan-400">IA</span></span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(item => (
              <a key={item.name} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-xs font-bold text-slate-300 hover:text-cyan-400 transition-colors uppercase tracking-widest">
                {item.name}
              </a>
            ))}
            <button onClick={onEnterDemo} className="flex items-center gap-2 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-lg transition-all border border-cyan-500/30 text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <LayoutDashboard className="w-4 h-4" /> Live Demo
            </button>
          </div>
        </div>
      </nav>

      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative z-10">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-black mb-6 leading-tight text-white tracking-tighter drop-shadow-2xl">
            MENOS GESTIÓN.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">MÁS RENTABILIDAD.</span>
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
          <h2 className="text-4xl font-extrabold text-white mb-4">Soluciones de Próxima Generación</h2>
          <p className="text-cyan-400 uppercase tracking-widest text-sm font-bold">Tecnología certificada por Google</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div 
              key={s.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className={`${glassCard} p-10 rounded-3xl group transition-all duration-300 hover:border-cyan-500/30`}
            >
              <s.icon className="w-14 h-14 text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-2xl font-bold text-white mb-4">{s.name}</h3>
              <p className="text-slate-300 mb-6 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </MotionSection>

      <MotionSection id="nosotros">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Tu Negocio en <span className="text-cyan-400">Piloto Automático</span></h2>
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
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-cyan-500/10 to-transparent opacity-50"></div>
            <h3 className="text-2xl font-bold text-white mb-4 italic relative z-10">"Expertos certificados en IA Generativa"</h3>
            <p className="text-slate-300 mb-8 relative z-10">Trayendo lo mejor de Silicon Valley a Villa Gesell.</p>
            <div className="flex justify-center gap-4 flex-wrap relative z-10">
              <span className="text-xs font-mono bg-cyan-500/10 text-cyan-300 px-4 py-2 rounded-full border border-cyan-500/30">Google Cloud Candidate</span>
              <span className="text-xs font-mono bg-cyan-500/10 text-cyan-300 px-4 py-2 rounded-full border border-cyan-500/30">AI Leader Certified</span>
            </div>
          </div>
        </div>
      </MotionSection>

      <footer id="contacto" className="py-24 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl text-center relative z-10">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tighter">¿LISTO PARA ESCALAR?</h2>
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
          transition={{ duration: 0.4 }}
        >
          <DemoApp onExit={() => setIsDemoMode(false)} />
        </motion.div>
      ) : (
        <motion.div 
          key="landing"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <LandingPage onEnterDemo={() => setIsDemoMode(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
