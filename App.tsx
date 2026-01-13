import React, { FC, ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Server, BrainCircuit, ArrowRight, MapPin, Camera, 
  Cpu, Wifi, MessageCircle, TrendingUp, Clock, Bot,
  LayoutDashboard, ShoppingCart, Settings, LogOut, Search, 
  AlertTriangle, FileText, Zap, ChevronRight, BarChart3, Terminal, Menu, X,
  Users, Calendar, TrendingDown, Leaf, Layers
} from 'lucide-react';

// ==========================================
// 0. ESTILOS GLOBALES Y UTILIDADES
// ==========================================

const glassCard = "bg-slate-900/60 backdrop-blur-md border border-white/5 shadow-xl";

// --- Componente de Barra de Progreso Animada ---
const AnimatedProgressBar: FC<{ value: number; color: string; delay?: number }> = ({ value, color, delay = 0 }) => (
  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden mt-2">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: 1.5, delay: delay, ease: "circOut" }}
      className={`h-full rounded-full ${color}`}
    />
  </div>
);

// --- Componente de Gráfico de Barras Verticales ---
const AnimatedBarChart = () => (
  <div className="flex items-end justify-between h-32 gap-2 mt-4">
    {[35, 55, 40, 70, 60, 90, 85].map((height, i) => (
      <motion.div
        key={i}
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: `${height}%`, opacity: 1 }}
        transition={{ duration: 0.8, delay: i * 0.1 }}
        className="w-full bg-cyan-500/20 hover:bg-cyan-500/40 rounded-t-sm relative group transition-colors"
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity">
          {height}%
        </div>
      </motion.div>
    ))}
  </div>
);

// Variantes Generales
const fadeInScale = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

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

const themes = {
  [View.DASHBOARD]: { color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10' },
  [View.POS]: { color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
  [View.AUDITOR]: { color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' },
  [View.CONFIG]: { color: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10' },
};

const MetricCard: FC<{ title: string; value: string; trend: string; isPositive?: boolean; theme: any; progress: number; delay?: number }> = ({ title, value, trend, isPositive, theme, progress, delay }) => (
  <motion.div 
    variants={fadeInScale}
    className={`${glassCard} p-6 rounded-2xl border-l-4 ${theme.border.replace('/30', '')} relative overflow-hidden`}
  >
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">{title}</h3>
      <div className={`text-xs font-bold flex items-center gap-1 ${isPositive ? theme.color : 'text-red-400'}`}>
        {isPositive ? <TrendingUp className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
        {trend}
      </div>
    </div>
    <div className="text-3xl font-bold text-white mb-4">{value}</div>
    
    {/* Barra Animada */}
    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
      <span>Meta Mensual</span>
      <span>{progress}%</span>
    </div>
    <AnimatedProgressBar value={progress} color={theme.color.replace('text-', 'bg-')} delay={delay} />
  </motion.div>
);

const Sidebar: FC<{ currentView: View; onNavigate: (v: View) => void; onExit: () => void; isOpen: boolean; onClose: () => void }> = ({ currentView, onNavigate, onExit, isOpen, onClose }) => {
  const t = themes[currentView];
  
  const menuItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: View.POS, label: 'Punto de Venta', icon: ShoppingCart },
    { id: View.AUDITOR, label: 'Auditor IA', icon: Bot },
    { id: View.CONFIG, label: 'Configuración', icon: Settings },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between transition-transform duration-300
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
    md:translate-x-0 
  `;

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm" onClick={onClose} />}

      <aside className={sidebarClasses}>
        <div>
          <div className="flex items-center justify-between mb-10 px-2">
            <div className="flex items-center gap-2">
              <img src="/logo-phoenix.png" alt="Logo" className="h-8 w-auto" />
              <span className="font-bold text-white tracking-tight text-lg">PHOENIX <span className={`transition-colors duration-500 ${t.color}`}>SUITE</span></span>
            </div>
            <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  currentView === item.id 
                  ? `${t.bg} ${t.color} border ${t.border}` 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <button onClick={onExit} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-950/30 rounded-xl transition-all border border-transparent hover:border-red-900/50">
          <LogOut className="w-5 h-5" />
          <span>Salir de Demo</span>
        </button>
      </aside>
    </>
  );
};

// --- VISTAS DEL DEMO ---

const DashboardView = () => {
  const t = themes[View.DASHBOARD];
  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Tablero de <span className={t.color}>Control</span></h2>
        <span className="text-slate-500 text-sm font-mono">Última sincro: Hace 2 min</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <MetricCard title="Ingresos Semanales" value="$ 850.200" trend="+12%" isPositive theme={t} progress={78} delay={0.2} />
        <MetricCard title="Tickets Promedio" value="142" trend="+5%" isPositive theme={t} progress={65} delay={0.4} />
        <MetricCard title="Eficiencia Operativa" value="98%" trend="Óptimo" isPositive theme={t} progress={98} delay={0.6} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfico de Ventas Visual */}
        <div className={`${glassCard} p-6 rounded-2xl`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-300 font-bold">Rendimiento en Tiempo Real</h3>
            <BarChart3 className="text-slate-500 w-5 h-5" />
          </div>
          <AnimatedBarChart />
          <div className="flex justify-between mt-2 text-xs text-slate-500 px-1">
             <span>Lun</span><span>Mar</span><span>Mie</span><span>Jue</span><span>Vie</span><span>Sab</span><span>Dom</span>
          </div>
        </div>

        {/* Alertas Rápidas */}
        <div className={`${glassCard} p-6 rounded-2xl`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-300 font-bold">Alertas Operativas</h3>
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="space-y-3">
             {[
               { icon: Clock, text: "Personal de cocina llegando a límite de horas extra.", color: "text-yellow-400" },
               { icon: TrendingDown, text: "Stock de 'Café' bajo (3 días restantes).", color: "text-orange-400" },
               { icon: Users, text: "Alta demanda prevista para el sábado noche.", color: "text-cyan-400" }
             ].map((alert, i) => (
               <motion.div 
                 key={i} 
                 initial={{ x: 20, opacity: 0 }} 
                 animate={{ x: 0, opacity: 1 }} 
                 transition={{ delay: 0.8 + (i * 0.1) }}
                 className="flex items-center gap-3 p-3 bg-slate-950/50 rounded-lg border border-white/5"
               >
                 <alert.icon className={`w-4 h-4 ${alert.color}`} />
                 <span className="text-sm text-slate-300">{alert.text}</span>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const POSView = () => {
  const t = themes[View.POS];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:grid md:grid-cols-3 gap-6 h-auto md:h-[85vh]">
      <div className={`col-span-2 ${glassCard} rounded-2xl p-4 md:p-6 flex flex-col order-2 md:order-1`}>
         <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="text-xl font-bold text-white">Punto de Venta <span className={t.color}>Rápido</span></h2>
            <input type="text" placeholder="Buscar..." className="w-full md:w-auto bg-slate-950 border border-slate-700 rounded-lg px-4 py-2 text-sm text-white focus:border-emerald-500 outline-none transition-colors" />
         </div>
         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar max-h-[400px] md:max-h-none">
            {[1,2,3,4,5,6,7,8,9].map(i => (
              <motion.div 
                key={i} 
                whileTap={{ scale: 0.95 }}
                className={`bg-slate-950/80 p-3 md:p-4 rounded-xl border border-white/5 hover:${t.border} cursor-pointer transition-all group`}
              >
                <div className={`h-12 md:h-16 bg-slate-900 rounded-lg mb-2 flex items-center justify-center group-hover:${t.bg} transition-colors`}>
                   <Camera className="text-slate-600 w-5 h-5 md:w-6 md:h-6" />
                </div>
                <p className="text-white font-medium text-xs md:text-sm truncate">Item {i}</p>
                <p className={`${t.color} font-bold text-sm`}>$ {i}500</p>
              </motion.div>
            ))}
         </div>
      </div>
      <div className={`col-span-1 ${glassCard} rounded-2xl p-4 md:p-6 flex flex-col justify-between border-t-4 ${t.border.replace('/30','')} order-1 md:order-2`}>
         <div>
           <h2 className="text-xl font-bold text-white mb-6">Ticket #055</h2>
           <div className="space-y-3 mb-4">
             <div className="flex justify-between text-slate-300 text-sm"><span>2x Café</span><span>$ 5.600</span></div>
             <div className="flex justify-between text-slate-300 text-sm"><span>1x Tostado</span><span>$ 4.200</span></div>
           </div>
         </div>
         <motion.button 
           whileTap={{ scale: 0.98 }}
           className={`w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 md:py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 mt-4`}
         >
           <FileText className="w-5 h-5" /> Cobrar
         </motion.button>
      </div>
    </motion.div>
  );
};

// --- AUDITORÍA IA SERIA Y PROFUNDA ---
const AuditorView = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');

  // Textos para la simulación de carga
  const loadSteps = [
    "Conectando Neural Core...", 
    "Cruzando datos de turnos con ley laboral...", 
    "Analizando rentabilidad de carta...", 
    "Calculando proyección estacional...",
    "Generando reporte estratégico..."
  ];
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (analyzing && currentStep < loadSteps.length) {
      const timer = setTimeout(() => setCurrentStep(prev => prev + 1), 800);
      return () => clearTimeout(timer);
    } else if (currentStep === loadSteps.length) {
      setComplete(true);
    }
  }, [analyzing, currentStep]);

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto px-2">
      {!analyzing && !complete ? (
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center h-full text-center space-y-8">
          <div className="relative">
             <div className="absolute inset-0 bg-amber-500/20 blur-[50px] rounded-full animate-pulse" />
             <Bot className="w-24 h-24 md:w-32 md:h-32 text-amber-400 mx-auto relative z-10" />
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Auditoría Estratégica IA</h2>
            <p className="text-slate-400 text-base md:text-xl max-w-xl mx-auto">
              Analizamos Recursos Humanos, Inventario y Rentabilidad para darte un plan de acción inmediato. <br/>
              <span className="text-amber-400/70 text-sm mt-2 block font-mono">Adaptable a: Retail • Gastronomía • Hotelería</span>
            </p>
          </div>
          <motion.button
            onClick={() => setAnalyzing(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-900 px-10 py-5 rounded-full font-black text-xl flex items-center gap-3 shadow-[0_0_30px_rgba(251,191,36,0.3)]"
          >
            <Zap className="w-6 h-6 fill-slate-900" />
            INICIAR ANÁLISIS PROFUNDO
          </motion.button>
        </motion.div>
      ) : !complete ? (
        <div className="flex flex-col items-center justify-center h-full">
           <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden mb-4">
             <motion.div 
               className="h-full bg-amber-400"
               initial={{ width: 0 }}
               animate={{ width: `${(currentStep / loadSteps.length) * 100}%` }}
             />
           </div>
           <p className="text-amber-400 font-mono text-sm">{loadSteps[Math.min(currentStep, loadSteps.length - 1)]}</p>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/10">
             <div>
               <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                 <Terminal className="text-amber-400 w-6 h-6" /> Reporte de Inteligencia
               </h2>
               <p className="text-slate-500 text-xs mt-1">ID: #AUDIT-2026-X99 | Prioridad: ALTA</p>
             </div>
             <button onClick={() => {setAnalyzing(false); setComplete(false); setCurrentStep(0);}} className="text-slate-400 hover:text-white text-sm">Nueva Auditoría</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pb-10">
            {/* Tarjeta de Alerta Inmediata */}
            <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl md:col-span-2">
               <h3 className="text-red-400 font-bold flex items-center gap-2 mb-2"><AlertTriangle className="w-5 h-5" /> ACCIÓN INMEDIATA REQUERIDA</h3>
               <p className="text-white text-lg">Se detectó inconsistencia de precios vs. inflación semanal.</p>
               <p className="text-slate-400 mt-2 text-sm">El insumo "Harina 000" aumentó 12% en base de datos de proveedores. Tus precios de panificados quedaron 8% abajo del margen ideal.</p>
               <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors">Aplicar Ajuste Automático (+8%)</button>
            </div>

            {/* RRHH */}
            <div className={`${glassCard} p-6 rounded-2xl`}>
               <h3 className="text-amber-400 font-bold flex items-center gap-2 mb-4"><Users className="w-5 h-5" /> Recursos Humanos & Fatiga</h3>
               <ul className="space-y-4 text-sm text-slate-300">
                 <li className="flex gap-3">
                   <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2"></div>
                   <span><strong>Alerta de Turno:</strong> El empleado "Juan P." tiene turno mañana (08:00) mañana, pero cierra hoy a las (02:00). Riesgo de agotamiento y error operativo.</span>
                 </li>
                 <li className="flex gap-3">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                   <span><strong>Sugerencia:</strong> Rotar ingreso de Juan P. a las 11:00 AM o cubrir con turno volante.</span>
                 </li>
               </ul>
            </div>

            {/* Menú / Inventario */}
            <div className={`${glassCard} p-6 rounded-2xl`}>
               <h3 className="text-cyan-400 font-bold flex items-center gap-2 mb-4"><Layers className="w-5 h-5" /> Optimización de Oferta</h3>
               <ul className="space-y-4 text-sm text-slate-300">
                 <li className="flex gap-3">
                   <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2"></div>
                   <span><strong>Baja Rotación:</strong> El plato "Risotto de Hongos" salió solo 2 veces esta semana. Considerar eliminar de carta para reducir merma.</span>
                 </li>
                 <li className="flex gap-3">
                   <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2"></div>
                   <span><strong>Oportunidad:</strong> La "Milanesa Napolitana" es Top Seller. Se sugiere agregar variante "A Caballo" (huevo frito) por bajo costo marginal y alto valor percibido.</span>
                 </li>
               </ul>
            </div>

            {/* Estacionalidad */}
            <div className={`${glassCard} p-6 rounded-2xl md:col-span-2`}>
               <h3 className="text-emerald-400 font-bold flex items-center gap-2 mb-4"><Leaf className="w-5 h-5" /> Eficiencia Estacional</h3>
               <p className="text-slate-300 text-sm mb-3">
                 Detectamos transición a Temporada Alta en tu zona (Villa Gesell). El histórico indica pico de demanda entre 21:00 y 23:30.
               </p>
               <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl flex justify-between items-center">
                 <div className="text-emerald-300 text-sm"><strong>Recomendación:</strong> Extender horario de cocina 1 hora (hasta 01:00 AM) viernes y sábados.</div>
                 <div className="text-emerald-400 font-bold">+15% Ingresos Proyectados</div>
               </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const DemoApp: FC<{ onExit: () => void }> = ({ onExit }) => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD: return <DashboardView />;
      case View.POS: return <POSView />;
      case View.AUDITOR: return <AuditorView />;
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-slate-950 relative overflow-hidden">
      {/* Botón Menú Móvil */}
      <div className="fixed top-4 left-4 z-[60] md:hidden">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white shadow-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <Sidebar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        onExit={onExit} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <main className="flex-1 md:ml-64 p-4 md:p-8 relative z-10 pt-16 md:pt-8 overflow-y-auto h-screen">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full pb-20"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

// ==========================================
// 2. LANDING PAGE (Responsive)
// ==========================================

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const services = [
    { id: 'ia-impulso', icon: Bot, name: "Impulso IA", desc: "WhatsApp automático y auditoría de precios." },
    { id: 'it-pro', icon: Server, name: "Infraestructura", desc: "Servidores y redes que no fallan." },
    { id: 'redes-wifi', icon: Wifi, name: "WiFi Hoteles", desc: "Cobertura total garantizada." },
    { id: 'seguridad-ia', icon: Camera, name: "Seguridad Pro", desc: "Cámaras que entienden lo que ven." },
    { id: 'workstations', icon: Cpu, name: "Workstations", desc: "PCs para Render y Arquitectura." },
];

const navLinks = [
  { name: 'Servicios', href: '#servicios' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'Contacto', href: '#contacto' }
];

const MotionSection: FC<{ children: ReactNode; className?: string; id?: string }> = ({ children, className = '', id }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.section
      id={id}
      ref={ref}
      className={`py-16 md:py-24 ${className} relative z-10`}
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
    whileTap={{ scale: 0.98 }}
    className={`w-full md:w-auto flex items-center justify-center gap-3 px-6 py-4 rounded-xl font-bold transition-all duration-300 ${
      primary 
      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' 
      : 'bg-white/5 text-white border border-white/10'
    }`}
  >
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
    const message = encodeURIComponent("Hola Phoenix IA.");
    if (isMobile) setWhatsappUrl(`whatsapp://send?phone=${phone}&text=${message}`);
    else setWhatsappUrl(`https://web.whatsapp.com/send?phone=${phone}&text=${message}`);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="text-slate-200 font-sans selection:bg-cyan-500/30 relative bg-slate-950">
      <div className="fixed inset-0 pointer-events-none z-0">
         <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]"></div>
      </div>

      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 z-[60] origin-left shadow-[0_0_10px_#22d3ee]" style={{ scaleX }} />

      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-2 cursor-pointer">
            <img src="/logo-phoenix.png" alt="Logo" className="h-8 w-auto" />
            <span className="text-lg font-black tracking-tighter text-white uppercase md:block hidden">Phoenix <span className="text-cyan-400">IA</span></span>
          </a>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-6">
               {navLinks.map(item => (
                 <a key={item.name} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-xs font-bold text-slate-300 hover:text-cyan-400 uppercase tracking-widest">{item.name}</a>
               ))}
            </div>
            <button onClick={onEnterDemo} className="flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-3 py-2 rounded-lg border border-cyan-500/30 text-xs font-bold uppercase tracking-widest">
                <LayoutDashboard className="w-4 h-4" /> <span className="hidden md:inline">Live</span> Demo
            </button>
          </div>
        </div>
      </nav>

      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative z-10">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-7xl font-black mb-6 leading-tight text-white tracking-tighter">
            MENOS GESTIÓN.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">MÁS RENTABILIDAD.</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-10 leading-relaxed font-light">
            Evolucionamos negocios en la costa mediante <strong>Inteligencia Artificial aplicada</strong>.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto md:max-w-none">
             <AnimatedCTA onClick={onEnterDemo} primary={false}>
                <LayoutDashboard className="w-5 h-5 text-cyan-400" /> 
                <span>Probar Demo</span>
            </AnimatedCTA>
            <a href={whatsappUrl} className="w-full md:w-auto" target="_blank" rel="noopener noreferrer">
              <AnimatedCTA>
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </AnimatedCTA>
            </a>
          </div>
        </div>
      </section>

      <MotionSection id="servicios">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white mb-2">Soluciones</h2>
          <p className="text-cyan-400 uppercase tracking-widest text-xs font-bold">Tecnología Google Certified</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div 
              key={s.id} 
              className={`${glassCard} p-6 rounded-2xl border-white/5`}
            >
              <s.icon className="w-10 h-10 text-cyan-400 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{s.name}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </MotionSection>

      <footer id="contacto" className="py-16 border-t border-white/5 bg-slate-950/80 backdrop-blur-xl text-center relative z-10">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-6">¿LISTO PARA ESCALAR?</h2>
          <div className="flex justify-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <AnimatedCTA>
                <MessageCircle className="w-6 h-6" />
                <span>Hablar con Especialista</span>
              </AnimatedCTA>
            </a>
          </div>
          <p className="mt-10 text-slate-500 text-xs">© 2026 PHOENIX IA</p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  const [isDemoMode, setIsDemoMode] = useState(false);
  return (
    <AnimatePresence mode="wait">
      {isDemoMode ? (
        <motion.div key="demo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <DemoApp onExit={() => setIsDemoMode(false)} />
        </motion.div>
      ) : (
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <LandingPage onEnterDemo={() => setIsDemoMode(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
