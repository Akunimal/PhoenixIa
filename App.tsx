import React, { FC, ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Server, BrainCircuit, ArrowRight, MapPin, Camera, 
  Cpu, Wifi, MessageCircle, TrendingUp, Clock, Bot,
  LayoutDashboard, ShoppingCart, FileText, Settings, LogOut, Search, AlertTriangle, CheckCircle
} from 'lucide-react';

// ==========================================
// 1. COMPONENTES DEL DASHBOARD / DEMO (Simulados)
// ==========================================

enum View { DASHBOARD, POS, AUDITOR, CONFIG }

const MetricCard: FC<{ title: string; value: string; trend: string; isPositive?: boolean }> = ({ title, value, trend, isPositive }) => (
  <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
    <h3 className="text-slate-400 text-sm font-medium mb-2">{title}</h3>
    <div className="text-3xl font-bold text-white mb-2">{value}</div>
    <div className={`text-sm ${isPositive ? 'text-cyan-400' : 'text-red-400'} flex items-center gap-1`}>
      {isPositive ? <TrendingUp className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
      {trend}
    </div>
  </div>
);

const Sidebar: FC<{ currentView: View; onNavigate: (v: View) => void; onExit: () => void }> = ({ currentView, onNavigate, onExit }) => {
  const menuItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: View.POS, label: 'Punto de Venta', icon: ShoppingCart },
    { id: View.AUDITOR, label: 'Auditor IA', icon: Bot },
    { id: View.CONFIG, label: 'Configuración', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 h-screen fixed left-0 top-0 p-6 flex flex-col justify-between z-50">
      <div>
        <div className="flex items-center gap-3 mb-10">
          <img src="/logo-phoenix.png" alt="Logo" className="h-8 w-auto" />
          <span className="font-bold text-white tracking-tight">PHOENIX <span className="text-cyan-400">POS</span></span>
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id 
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
      <button onClick={onExit} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
        <LogOut className="w-5 h-5" />
        <span>Salir de Demo</span>
      </button>
    </aside>
  );
};

// Vistas del Dashboard
const DashboardView = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white">Resumen Operativo</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard title="Ventas del Día" value="$ 1.250.400" trend="+15% vs ayer" isPositive />
      <MetricCard title="Tiempo Ahorrado (IA)" value="4.5 hs" trend="Gestión Automática" isPositive />
      <MetricCard title="Margen Promedio" value="32%" trend="-2% Alerta de Costos" isPositive={false} />
    </div>
    <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Bot className="w-5 h-5 text-cyan-400" /> Insights de Phoenix IA
      </h3>
      <div className="space-y-4">
        {[
          "Se detectó un aumento del 5% en el proveedor de Café. Se sugiere ajustar precio de venta a $2800.",
          "El stock de 'Bebidas Cola' está bajo para el fin de semana. ¿Generar orden de compra?",
          "3 reservas confirmadas automáticamente por WhatsApp en la última hora."
        ].map((alert, i) => (
          <div key={i} className="flex gap-4 p-4 bg-slate-950 rounded-xl border border-slate-800">
             <div className="mt-1"><BrainCircuit className="w-4 h-4 text-cyan-400" /></div>
             <p className="text-slate-300 text-sm">{alert}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const POSView = () => (
  <div className="grid grid-cols-3 gap-6 h-[80vh]">
    <div className="col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 overflow-y-auto">
       <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Menú / Productos</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input type="text" placeholder="Buscar..." className="bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-cyan-500 transition-colors" />
          </div>
       </div>
       <div className="grid grid-cols-3 gap-4">
          {[1,2,3,4,5,6,7,8,9].map(i => (
            <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-cyan-500/50 cursor-pointer transition-all">
              <div className="h-24 bg-slate-900 rounded-lg mb-3 flex items-center justify-center">
                 <Camera className="text-slate-700" />
              </div>
              <p className="text-white font-medium">Producto {i}</p>
              <p className="text-cyan-400 font-bold">$ {i}500</p>
            </div>
          ))}
       </div>
    </div>
    <div className="col-span-1 bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
       <div>
         <h2 className="text-xl font-bold text-white mb-4">Ticket Actual</h2>
         <div className="space-y-2 mb-4">
           <div className="flex justify-between text-slate-400 text-sm"><span>2x Café Especial</span><span>$ 5.600</span></div>
           <div className="flex justify-between text-slate-400 text-sm"><span>1x Tostado</span><span>$ 4.200</span></div>
         </div>
         <div className="border-t border-slate-800 pt-4 flex justify-between text-white font-bold text-xl">
            <span>Total</span><span>$ 9.800</span>
         </div>
       </div>
       <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
         <FileText className="w-5 h-5" /> Facturar (AFIP)
       </button>
    </div>
  </div>
);

// Aplicación Demo Wrapper
const DemoApp: FC<{ onExit: () => void }> = ({ onExit }) => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD: return <DashboardView />;
      case View.POS: return <POSView />;
      default: return (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
          <Clock className="w-12 h-12 mb-4 opacity-50" />
          <h2 className="text-2xl font-bold mb-2">Módulo en Desarrollo</h2>
          <p>Esta sección estará disponible en la versión completa.</p>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} onExit={onExit} />
      <main className="flex-1 ml-64 p-8 relative">
        <AnimatePresence mode='wait'>
          <motion.div
            key={currentView}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
      {/* Chatbot Flotante Demo */}
      <div className="fixed bottom-6 right-6 w-80 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50">
        <div className="bg-cyan-500/10 p-4 border-b border-slate-800 flex items-center gap-3">
           <div className="relative">
             <Bot className="w-8 h-8 text-cyan-400" />
             <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
           </div>
           <div>
             <h4 className="font-bold text-white text-sm">Phoenix Bot</h4>
             <p className="text-xs text-slate-400">Auditoría en tiempo real</p>
           </div>
        </div>
        <div className="p-4 h-48 overflow-y-auto space-y-3 text-sm">
           <div className="bg-slate-800 p-3 rounded-lg rounded-tl-none text-slate-300">
             Hola, he detectado que el precio de la harina subió un 8%. ¿Quieres que recalcule los costos de panadería?
           </div>
           <div className="bg-cyan-500/20 p-3 rounded-lg rounded-tr-none text-cyan-200 ml-auto max-w-[80%]">
             Sí, por favor actualiza los precios.
           </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. LANDING PAGE (Tu web actual)
// ==========================================

// --- ANIMATION VARIANTS LANDING ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.99] } 
  }
};

const serviceListVariants: Variants = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const serviceItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
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
      className={`py-24 md:py-32 ${className}`}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="container mx-auto px-6">{children}</div>
    </motion.section>
  );
};

const AnimatedCTA: FC<{ onClick?: () => void; children: ReactNode }> = ({ onClick, children }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(34, 211, 238, 0.3)" }}
    whileTap={{ scale: 0.98 }}
    className="group relative flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-500 overflow-hidden bg-cyan-500 text-slate-950 border border-cyan-400/50"
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
      initial={{ x: "-200%" }}
      animate={{ x: "200%" }}
      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
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
    <div className="bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 z-[60] origin-left" style={{ scaleX }} />

      <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 cursor-pointer">
            <img src="/logo-phoenix.png" alt="Phoenix IA Logo" className="h-10 w-auto" />
            <span className="text-xl font-black tracking-tighter text-white uppercase">Phoenix <span className="text-cyan-400">IA</span></span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(item => (
              <a key={item.name} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest">
                {item.name}
              </a>
            ))}
            <button onClick={onEnterDemo} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 px-4 py-2 rounded-lg transition-colors border border-cyan-500/20 text-xs font-bold uppercase tracking-widest animate-pulse">
                <LayoutDashboard className="w-4 h-4" /> Live Demo
            </button>
          </div>
        </div>
      </nav>

      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white tracking-tighter">
            MENOS GESTIÓN.<br/><span className="text-cyan-400">MÁS RENTABILIDAD.</span>
          </motion.h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-400 mb-10 leading-relaxed">
            Evolucionamos negocios en la costa mediante <strong>Inteligencia Artificial aplicada</strong>. Ahorramos tiempo administrativo y optimizamos tus precios automáticamente.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
             <button onClick={onEnterDemo} className="group relative flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all duration-500 overflow-hidden bg-slate-800 text-white border border-slate-600 hover:border-cyan-400">
                <span className="relative z-10 flex items-center gap-2"><LayoutDashboard className="w-5 h-5 text-cyan-400" /> Probar Demo Interactiva</span>
            </button>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <AnimatedCTA>
                <MessageCircle className="w-5 h-5" />
                <span>Consultar por WhatsApp</span>
              </AnimatedCTA>
            </a>
          </div>
        </div>
      </section>

      <MotionSection id="servicios" className="bg-slate-900/20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white mb-4">Soluciones de Próxima Generación</h2>
          <p className="text-slate-500 uppercase tracking-widest text-sm font-bold">Tecnología certificada por Google</p>
        </div>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={serviceListVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {services.map(s => (
            <motion.div key={s.id} className="group p-10 bg-slate-900/40 border border-slate-800 rounded-3xl hover:border-cyan-500/50 transition-all duration-500" variants={serviceItemVariants}>
              <s.icon className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-bold text-white mb-4">{s.name}</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">{s.desc}</p>
              <div className="h-1 w-12 bg-slate-800 group-hover:w-full group-hover:bg-cyan-500 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </MotionSection>

      <MotionSection id="nosotros" className="bg-cyan-500/5">
        <div id="ia" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Tu Negocio en <span className="text-cyan-400">Piloto Automático</span></h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 flex-shrink-0"><Clock className="text-cyan-400" /></div>
                <p className="text-slate-300"><strong>Ahorro de Tiempo masivo:</strong> Automatizamos la atención al cliente inicial y tareas administrativas.</p>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 flex-shrink-0"><TrendingUp className="text-cyan-400" /></div>
                <p className="text-slate-300"><strong>Auditoría de Precios:</strong> Recomendaciones diarias de ajustes basadas en el mercado.</p>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 flex-shrink-0"><BrainCircuit className="text-cyan-400" /></div>
                <p className="text-slate-300"><strong>Google AI Leader:</strong> Implementamos modelos de lenguaje con el ADN de tu empresa.</p>
              </div>
            </div>
          </div>
          <div className="bg-slate-900 border border-cyan-500/20 p-8 rounded-3xl text-center">
            <h3 className="text-xl font-bold text-white mb-4 italic">"Expertos certificados en IA Generativa"</h3>
            <p className="text-slate-400 mb-6">Estamos en proceso de validación final como Google Cloud Partners para traer lo mejor de Silicon Valley a Villa Gesell.</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <span className="text-xs font-mono bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20">Google Cloud Candidate</span>
              <span className="text-xs font-mono bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full border border-cyan-500/20">AI Leader Certified</span>
            </div>
          </div>
        </div>
      </MotionSection>

      <footer id="contacto" className="py-24 border-t border-slate-900 bg-slate-950 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tighter">¿LISTO PARA ESCALAR?</h2>
          <p className="text-slate-400 mb-10">Hablemos hoy sobre cómo el <strong>Paquete de Impulso IA</strong> puede transformar tu gestión diaria.</p>
          <div className="flex justify-center">
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
// 3. MAIN APP (Controlador de Vistas)
// ==========================================

export default function App() {
  // Estado para controlar si estamos en la Landing o en el Demo
  const [isDemoMode, setIsDemoMode] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {isDemoMode ? (
        <motion.div 
          key="demo"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
        >
          <DemoApp onExit={() => setIsDemoMode(false)} />
        </motion.div>
      ) : (
        <motion.div 
          key="landing"
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
        >
          <LandingPage onEnterDemo={() => setIsDemoMode(true)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
