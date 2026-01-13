import React, { FC, ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Server, BrainCircuit, ArrowRight, MapPin, Camera, 
  Cpu, Wifi, MessageCircle, TrendingUp, Clock, Bot,
  LayoutDashboard, ShoppingCart, Settings, LogOut, Search, 
  AlertTriangle, FileText, Zap, BarChart3, Terminal, Menu, X,
  Users, Calendar, TrendingDown, Leaf, Layers, Plus, Trash2, 
  CheckCircle2, Grid3x3, Building, GraduationCap, ShieldCheck, CreditCard
} from 'lucide-react';

// ==========================================
// 0. ESTILOS Y UTILIDADES (AERO GLASS)
// ==========================================
const glassCard = "bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-2xl";

const TechBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <div className="absolute inset-0 bg-slate-950" />
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />
  </div>
);

// Animación de Reflejo (Shimmer)
const Shimmer = () => (
  <motion.div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{ background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.05) 25%, transparent 30%)" }}
    animate={{ x: ["-100%", "200%"] }}
    transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 1 }}
  />
);

// ==========================================
// 1. MÓDULOS DE LA DEMO INTERACTIVA
// ==========================================
enum View { DASHBOARD, POS, TABLES, RENTALS, SCHOOL, FISCAL }

// --- DASHBOARD: AUDITOR ESTRATÉGICO ---
const DashboardAuditor = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showData, setShowData] = useState(false);

  const runAuditory = () => {
    setLoading(true); setProgress(0); setShowData(false);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setLoading(false); setShowData(true); return 100; }
        return p + 5;
      });
    }, 70);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center relative z-20">
      <AnimatePresence mode="wait">
        {!showData && !loading && (
          <motion.div key="start" exit={{ opacity: 0, scale: 0.9 }} className="text-center space-y-8">
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 4 }} className="p-10 bg-amber-500/10 rounded-full border border-amber-500/20 w-fit mx-auto shadow-[0_0_50px_rgba(245,158,11,0.1)]">
              <Bot className="w-20 h-20 text-amber-500" />
            </motion.div>
            <div className="space-y-2">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Auditoría Neural de Negocio</h2>
              <p className="text-slate-400">Presione para analizar mermas, fatiga y rentabilidad.</p>
            </div>
            <button onClick={runAuditory} className="bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 px-12 py-5 rounded-2xl font-black text-xl shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all">IMPULSA MI NEGOCIO!</button>
          </motion.div>
        )}

        {loading && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md space-y-6 text-center">
            <p className="text-amber-400 font-mono text-lg animate-pulse tracking-widest uppercase font-bold">Analizando parámetros estratégicos...</p>
            <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-white/10 p-1 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <motion.div className="h-full bg-amber-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
            </div>
            <p className="text-slate-500 font-mono text-lg">{progress}%</p>
          </motion.div>
        )}

        {showData && (
          <motion.div key="data" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-4">
             <div className={`${glassCard} p-8 rounded-[40px] border-l-8 border-red-500`}>
                <h4 className="text-red-400 font-black flex items-center gap-2 uppercase text-xs mb-4"><AlertTriangle className="w-4 h-4" /> Alerta RRHH</h4>
                <p className="text-slate-300 text-lg leading-relaxed font-light">Detectada fatiga crítica en <strong>"Marcos R."</strong> (Turno Noche + Mañana). Riesgo de error operativo: <strong>92%</strong>. Se sugiere rotación inmediata.</p>
             </div>
             <div className={`${glassCard} p-8 rounded-[40px] border-l-8 border-cyan-500`}>
                <h4 className="text-cyan-400 font-black flex items-center gap-2 uppercase text-xs mb-4"><TrendingUp className="w-4 h-4" /> Optimización de Carta</h4>
                <p className="text-slate-300 text-lg leading-relaxed font-light">El "Risotto" presenta 15% de merma. Potenciar "Pastas" (+22% demanda). Ajuste de precios sugerido: <strong>+9%</strong> por inflación de insumos.</p>
             </div>
             <div className={`${glassCard} p-6 rounded-3xl md:col-span-2 text-center bg-amber-500/5 border-amber-500/20`}>
                <p className="text-amber-200 font-bold italic">"Plan de acción enviado a su asistente personal de WhatsApp. Aplicable a cualquier industria."</p>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- PUNTO DE VENTA (POS) ---
const POSView = () => {
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number}[]>([]);
  const products = [
    { id: 1, name: "Café Espresso", price: 2800 }, { id: 2, name: "Medialuna Pro", price: 950 },
    { id: 3, name: "Tostado Especial", price: 4800 }, { id: 4, name: "Jugo Natural", price: 3200 }
  ];
  const addToCart = (p: any) => {
    const ex = cart.find(i => i.id === p.id);
    if(ex) setCart(cart.map(i => i.id === p.id ? {...i, qty: i.qty + 1} : i));
    else setCart([...cart, {...p, qty: 1}]);
  };
  const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  return (
    <div className="grid md:grid-cols-3 gap-6 h-full relative z-20">
      <div className={`${glassCard} col-span-2 p-8 rounded-[40px]`}>
        <h2 className="text-2xl font-black text-white mb-8 uppercase italic tracking-tighter">Terminal de Ventas</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map(p => (
            <button key={p.id} onClick={() => addToCart(p)} className="bg-slate-950 p-6 rounded-3xl border border-white/5 hover:border-emerald-500/50 text-left transition-all active:scale-95 shadow-xl">
              <p className="text-white font-black text-lg">{p.name}</p>
              <p className="text-emerald-400 font-mono">$ {p.price}</p>
            </button>
          ))}
        </div>
      </div>
      <div className={`${glassCard} p-8 rounded-[40px] flex flex-col justify-between border-t-8 border-emerald-500`}>
        <div className="space-y-4">
           <h3 className="text-white font-black uppercase text-xs tracking-widest border-b border-white/10 pb-4">Ticket en Vivo</h3>
           {cart.map((i, idx) => <div key={idx} className="flex justify-between text-sm text-slate-300"><span>{i.qty}x {i.name}</span><span>$ {i.price * i.qty}</span></div>)}
        </div>
        <div className="pt-6 border-t border-white/10">
          <div className="flex justify-between text-3xl font-black mb-6"><span>TOTAL</span><span>$ {total}</span></div>
          <button onClick={() => setCart([])} className="w-full bg-emerald-500 text-slate-950 font-black py-5 rounded-2xl active:scale-95 transition-transform shadow-xl shadow-emerald-500/20 uppercase">Emitir Factura AFIP</button>
        </div>
      </div>
    </div>
  );
};

// --- ALQUILERES (FLUJO MERCADO PAGO) ---
const RentalsView = () => {
  const [payStatus, setPayStatus] = useState(0);
  const [blocked, setBlocked] = useState([1, 2, 5, 6]);

  return (
    <div className="grid md:grid-cols-2 gap-6 h-full relative z-20">
      <div className={`${glassCard} p-8 rounded-[40px]`}>
         <h3 className="text-rose-400 font-black mb-6 uppercase tracking-widest">Calendario de Reservas</h3>
         <div className="grid grid-cols-7 gap-3">
            {Array.from({length: 28}).map((_, i) => (
              <div key={i} className={`aspect-square rounded-xl flex items-center justify-center text-xs border-2 ${blocked.includes(i+1) ? 'bg-rose-500/20 border-rose-500 text-rose-400 font-bold' : 'border-slate-800 text-slate-700'}`}>{i+1}</div>
            ))}
         </div>
      </div>
      <div className={`${glassCard} p-8 rounded-[40px] flex flex-col border-t-8 border-rose-500`}>
         <div className="flex-1 space-y-6">
            <div className="bg-slate-800 p-4 rounded-2xl rounded-tr-none ml-auto text-sm w-4/5 text-white shadow-xl">Hola! Disponible del 20 al 22 de enero?</div>
            <div className="bg-slate-900 p-4 rounded-2xl rounded-tl-none text-sm w-4/5 text-slate-300 border border-white/5">
               <Bot className="w-4 h-4 text-rose-400 mb-2" /> <strong>Phoenix Bot:</strong> Si! Disponible. Total por 2 noches: $84.000.
               <button onClick={() => { setPayStatus(1); setTimeout(()=> { setPayStatus(2); setBlocked([...blocked, 20, 21, 22]) }, 2500) }} className="mt-4 w-full bg-blue-600 text-white py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all">
                 <CreditCard className="w-5 h-5" /> PAGAR CON MERCADO PAGO
               </button>
            </div>
            {payStatus === 1 && <div className="text-rose-400 animate-pulse text-xs text-center font-mono py-4">SINCRO MERCADO PAGO...</div>}
            {payStatus === 2 && <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-emerald-500/20 border-2 border-emerald-500 p-4 rounded-2xl text-emerald-400 text-sm font-black text-center shadow-[0_0_20px_rgba(16,185,129,0.2)]">¡PAGO CONFIRMADO! Fechas bloqueadas.</motion.div>}
         </div>
      </div>
    </div>
  );
};

// --- COLEGIO (SUITE DIRECTIVA) ---
const SchoolView = () => (
  <div className="space-y-8 relative z-20 h-full">
    <h2 className="text-3xl font-black text-white flex items-center gap-3"><GraduationCap className="text-indigo-400 w-10 h-10" /> Panel Directivo Escolar</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className={`${glassCard} p-8 rounded-[40px] border-l-8 border-red-500`}>
          <h4 className="text-white font-black flex items-center gap-2 mb-4 uppercase text-xs"><TrendingDown className="text-red-500" /> Predictor de Mora</h4>
          <p className="text-slate-400 text-lg font-light leading-relaxed">Analizando patrones de pago: 8 familias con <strong>riesgo de impago inminente</strong>. Recordatorios preventivos enviados. Ahorro estimado: <strong>$450.000</strong>.</p>
       </div>
       <div className={`${glassCard} p-8 rounded-[40px] border-l-8 border-indigo-500`}>
          <h4 className="text-white font-black flex items-center gap-2 mb-4 uppercase text-xs"><Users className="text-indigo-500" /> Clima Institucional</h4>
          <p className="text-slate-400 text-lg font-light leading-relaxed">Detectada anomalía de asistencia en 4to Año B. Patrón inusual indica posible conflicto grupal. Notificación enviada a Preceptoría.</p>
       </div>
    </div>
    <div className={`${glassCard} p-10 rounded-[50px] text-center border-t-8 border-indigo-500 bg-indigo-500/5`}>
       <Clock className="w-16 h-16 text-indigo-500 mx-auto mb-6 animate-spin-slow" />
       <h3 className="text-2xl font-black text-white mb-4">Optimizador de Grilla Horaria</h3>
       <p className="text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">La IA resolvió 12 choques horarios para el próximo cuatrimestre. Ahorro de gestión: <strong>15 horas de trabajo administrativo mensual</strong>.</p>
    </div>
  </div>
);

// --- FISCAL (AFIP) ---
const FiscalView = () => {
  const [s, setS] = useState(0);
  return (
    <div className="h-full flex flex-col items-center justify-center text-center relative z-20 px-4">
       <ShieldCheck className={`w-32 h-32 mb-8 transition-all duration-1000 ${s === 2 ? 'text-emerald-400 drop-shadow-[0_0_30px_rgba(52,211,153,0.5)]' : 'text-slate-800'}`} />
       <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Certificación Fiscal</h2>
       <p className="text-slate-500 text-lg max-w-sm mb-12 font-light">Homologación directa con servidores AFIP para factura electrónica certificada.</p>
       {s === 0 && <button onClick={() => {setS(1); setTimeout(()=>setS(2), 2000)}} className="bg-blue-600 text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-500/40 uppercase">Vincular Punto de Venta</button>}
       {s === 1 && <p className="text-blue-400 animate-pulse font-mono text-xl tracking-widest uppercase font-bold">Solicitando CAEA Fiscal...</p>}
       {s === 2 && (
         <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-8 bg-emerald-500/10 border-2 border-emerald-500 rounded-[40px]">
            <p className="text-emerald-400 font-mono text-xl font-bold uppercase tracking-widest">Homologado con éxito</p>
            <p className="text-slate-500 font-mono text-xs mt-4 tracking-widest">ID-CERT: PHX-2026-X99-AFIP</p>
         </motion.div>
       )}
    </div>
  );
};

// ==========================================
// 2. COMPONENTES DE LA LANDING PAGE (RECUPERADOS)
// ==========================================

const services = [
  { id: 'ia-impulso', icon: Bot, name: "Paquete Impulso IA", desc: "WhatsApp con el ADN de tu empresa: respuestas automáticas humanas, auditoría diaria de precios y automatización de gestión para ahorrar horas de trabajo." },
  { id: 'it-pro', icon: Server, name: "Infraestructura IT", desc: "Servidores de alta disponibilidad y soporte preventivo. Soluciones robustas para que tu operativa no se detenga nunca." },
  { id: 'redes-wifi', icon: Wifi, name: "WiFi Alta Densidad", desc: "Diseño e instalación de redes para hoteles y complejos. Gestión de ancho de banda garantizada para todos tus huéspedes." },
  { id: 'seguridad-ia', icon: Camera, name: "Seguridad Inteligente", desc: "Cámaras con analítica de video y alarmas Grado 2. Monitoreo avanzado que entiende lo que ve." },
  { id: 'workstations', icon: Cpu, name: "Workstations & Gaming", desc: "Hardware de alto rendimiento para AutoCAD, Render 3D y Gaming extremo. Armado técnico certificado." },
];

const LandingPage: FC<{ onEnterDemo: () => void }> = ({ onEnterDemo }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const [whatsappUrl, setWhatsappUrl] = useState("https://wa.me/542255605257");

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const phone = "542255605257";
    const msg = encodeURIComponent("Hola Phoenix IA, me interesa el Paquete de Impulso para mi negocio.");
    if (isMobile) setWhatsappUrl(`whatsapp://send?phone=${phone}&text=${msg}`);
    else setWhatsappUrl(`https://web.whatsapp.com/send?phone=${phone}&text=${msg}`);
  }, []);

  return (
    <div className="relative z-10">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 z-[60] origin-left shadow-[0_0_10px_#22d3ee]" style={{ scaleX }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full h-24 flex items-center justify-between px-6 md:px-12 border-b border-white/5 backdrop-blur-md z-50">
        <div className="flex items-center gap-3 group cursor-pointer">
          <img src="/logo-phoenix.png" className="h-10 drop-shadow-[0_0_10px_#22d3ee] transition-transform group-hover:scale-110" />
          <span className="text-2xl font-black uppercase tracking-tighter text-white">Phoenix <span className="text-cyan-400">IA</span></span>
        </div>
        <div className="hidden lg:flex gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
           <a href="#servicios" className="hover:text-cyan-400 transition-colors">Servicios</a>
           <a href="#nosotros" className="hover:text-cyan-400 transition-colors">Evolución</a>
           <a href="#contacto" className="hover:text-cyan-400 transition-colors">Contacto</a>
        </div>
        <button onClick={onEnterDemo} className="bg-cyan-500/10 text-cyan-400 px-6 py-3 rounded-xl border border-cyan-500/30 text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500/20 transition-all shadow-[0_0_20px_rgba(34,211,238,0.1)]">Probar Demo</button>
      </nav>

      {/* Hero */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-24 text-center px-6">
        <div className="max-w-6xl">
           <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85] text-white">
              EVOLUCIONAMOS <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 drop-shadow-2xl">TU NEGOCIO.</span>
           </motion.h1>
           <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-400 mb-12 font-light leading-relaxed">
             Inteligencia Artificial aplicada para ahorrar tiempo y multiplicar la rentabilidad en cualquier industria.
           </p>
           <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
             <button onClick={onEnterDemo} className="group relative bg-cyan-500 text-slate-950 px-12 py-6 rounded-2xl font-black text-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-cyan-500/40">
               <Shimmer /> <LayoutDashboard className="relative z-10" /> <span className="relative z-10 uppercase tracking-tight">Lanzar Experiencia IA</span>
             </button>
             <a href={whatsappUrl} target="_blank" className="bg-white/5 border border-white/10 px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/10 transition-all flex items-center gap-2">
                <MessageCircle className="w-6 h-6" /> WHATSAPP
             </a>
           </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-32 container mx-auto px-6">
        <div className="text-center mb-20">
           <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter">Soluciones Pro</h2>
           <p className="text-cyan-400 font-black uppercase tracking-[0.4em] text-xs">Tecnología Certificada por Google</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {services.map((s, i) => (
             <motion.div key={s.id} whileHover={{ y: -10 }} className={`${glassCard} p-10 rounded-[40px] relative overflow-hidden group`}>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <s.icon className="w-16 h-16 text-cyan-400 mb-8 group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.4)]" />
                <h3 className="text-2xl font-black text-white mb-4 relative z-10">{s.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed relative z-10 font-light">{s.desc}</p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Nosotros / Valor */}
      <section id="nosotros" className="py-32 bg-cyan-500/5 backdrop-blur-3xl">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div>
              <h2 className="text-5xl font-black text-white mb-8 tracking-tighter uppercase leading-none">Tu Negocio en <br/><span className="text-cyan-400 italic">Piloto Automático.</span></h2>
              <div className="space-y-8">
                 <div className="flex gap-6 p-6 rounded-3xl hover:bg-white/5 transition-colors group">
                    <Clock className="w-10 h-10 text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div><h4 className="text-white font-black text-xl mb-1 uppercase tracking-tight">Ahorro de Tiempo Masivo</h4><p className="text-slate-400 font-light">Automatizamos la atención inicial y tareas administrativas repetitivas.</p></div>
                 </div>
                 <div className="flex gap-6 p-6 rounded-3xl hover:bg-white/5 transition-colors group">
                    <TrendingUp className="w-10 h-10 text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div><h4 className="text-white font-black text-xl mb-1 uppercase tracking-tight">Auditoría de Precios</h4><p className="text-slate-400 font-light">Recomendaciones diarias de ajustes para proteger tu margen contra la inflación.</p></div>
                 </div>
                 <div className="flex gap-6 p-6 rounded-3xl hover:bg-white/5 transition-colors group">
                    <BrainCircuit className="w-10 h-10 text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <div><h4 className="text-white font-black text-xl mb-1 uppercase tracking-tight">Google AI Leader</h4><p className="text-slate-400 font-light">Implementamos modelos LLM que hablan y actúan con el ADN de tu empresa.</p></div>
                 </div>
              </div>
           </div>
           <div className={`${glassCard} p-12 rounded-[60px] text-center border-t-8 border-cyan-500 relative overflow-hidden`}>
              <Shimmer />
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-white mb-6 italic uppercase tracking-tighter">"Silicon Valley en la Costa"</h3>
                <p className="text-slate-400 text-lg font-light leading-relaxed mb-10">Trayendo la potencia de los Google Cloud Partners directamente a <strong>Villa Gesell, Mar de las Pampas y Mar Azul</strong>.</p>
                <div className="flex justify-center gap-4 flex-wrap">
                   <span className="bg-cyan-500/10 text-cyan-300 px-6 py-2 rounded-full border border-cyan-500/30 text-xs font-black uppercase tracking-widest">Google Cloud Candidate</span>
                   <span className="bg-cyan-500/10 text-cyan-300 px-6 py-2 rounded-full border border-cyan-500/30 text-xs font-black uppercase tracking-widest">AI Leader Certified</span>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="py-24 border-t border-white/5 text-center">
         <div className="max-w-2xl mx-auto px-6">
            <h2 className="text-5xl font-black text-white mb-10 tracking-tighter uppercase italic">¿LISTO PARA ESCALAR?</h2>
            <a href={whatsappUrl} target="_blank" className="inline-flex bg-cyan-500 text-slate-950 px-12 py-6 rounded-2xl font-black text-xl gap-3 shadow-2xl shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-all">
               <MessageCircle className="w-6 h-6" /> HABLAR CON UN ESPECIALISTA
            </a>
            <div className="mt-20 flex flex-col items-center gap-3 text-slate-600 font-black uppercase tracking-[0.3em] text-[10px]">
               <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-cyan-500" /> Villa Gesell • Mar de las Pampas</div>
               <p>© 2026 PHOENIX IA | PHOENIX NEURAL SUITE</p>
            </div>
         </div>
      </footer>
    </div>
  );
};

// ==========================================
// 3. MAIN APP CONTROLLER
// ==========================================

export default function App() {
  const [isDemo, setIsDemo] = useState(false);
  const [view, setView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch(view) {
      case View.DASHBOARD: return <DashboardAuditor />;
      case View.POS: return <POSView />;
      case View.TABLES: return (
        <div className="h-full flex flex-col items-center justify-center relative z-20">
          <h2 className="text-4xl font-black text-white mb-16 italic tracking-tighter uppercase">Gestión de Salón</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
             {[1,2,3,4,5,6].map(i => (
               <button key={i} onClick={() => setView(View.POS)} className="w-28 h-28 rounded-[40px] border-4 border-slate-700 bg-slate-900/50 flex flex-col items-center justify-center text-white font-black hover:border-orange-500 hover:scale-110 transition-all shadow-2xl active:scale-90 relative overflow-hidden group">
                  <span className="text-[10px] text-slate-500 uppercase font-bold relative z-10">Mesa</span>
                  <span className="text-3xl relative z-10">{i}</span>
                  <div className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
               </button>
             ))}
          </div>
        </div>
      );
      case View.RENTALS: return <RentalsView />;
      case View.SCHOOL: return <SchoolView />;
      case View.FISCAL: return <FiscalView />;
      default: return null;
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden">
      <TechBackground />
      
      <AnimatePresence mode="wait">
        {!isDemo ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
            <LandingPage onEnterDemo={() => setIsDemo(true)} />
          </motion.div>
        ) : (
          <motion.div key="demo" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex h-screen relative z-10 bg-slate-950">
            {/* Sidebar Desktop */}
            <aside className="w-72 bg-slate-950 border-r border-slate-800 p-8 hidden lg:flex flex-col justify-between">
              <div className="space-y-12">
                 <div className="flex items-center gap-3"><img src="/logo-phoenix.png" className="h-10" /><span className="font-black text-white text-lg tracking-tighter italic">SUITE PRO</span></div>
                 <nav className="space-y-1">
                    {[
                      { id: View.DASHBOARD, name: 'Auditor IA', icon: Zap },
                      { id: View.POS, name: 'Punto de Venta', icon: ShoppingCart },
                      { id: View.TABLES, name: 'Mesas', icon: Grid3x3 },
                      { id: View.RENTALS, name: 'Alquileres', icon: Building },
                      { id: View.SCHOOL, name: 'Gestión Colegio', icon: GraduationCap },
                      { id: View.FISCAL, name: 'Módulo Fiscal', icon: ShieldCheck },
                    ].map(item => (
                      <button 
                        key={item.id} onClick={() => setView(item.id)}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-[10px] font-black uppercase tracking-widest ${view === item.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg' : 'text-slate-500 hover:bg-slate-900 hover:text-white'}`}
                      >
                        <item.icon className="w-5 h-5" /> {item.name}
                      </button>
                    ))}
                 </nav>
              </div>
              <button onClick={() => setIsDemo(false)} className="bg-red-500/10 text-red-500 p-5 rounded-2xl flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-widest hover:bg-red-500/20 transition-all border border-red-500/20"><LogOut className="w-4 h-4" /> Salir de Demo</button>
            </aside>

            {/* Mobile Nav Button */}
            <div className="lg:hidden fixed top-4 left-4 z-[100]">
               <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-3 bg-slate-900 rounded-xl text-white shadow-xl"><Menu /></button>
            </div>
            
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
              {isSidebarOpen && (
                <>
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] lg:hidden" />
                  <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} className="fixed inset-y-0 left-0 w-64 bg-slate-950 z-[100] p-6 flex flex-col justify-between lg:hidden border-r border-slate-800">
                    <div className="space-y-8">
                       <div className="flex items-center gap-2"><img src="/logo-phoenix.png" className="h-8" /><span className="font-black text-white text-xs">SUITE PRO</span></div>
                       <nav className="space-y-2">
                         {[
                           { id: View.DASHBOARD, name: 'Auditor', icon: Zap },
                           { id: View.POS, name: 'Venta', icon: ShoppingCart },
                           { id: View.TABLES, name: 'Mesas', icon: Grid3x3 },
                           { id: View.RENTALS, name: 'Hotel', icon: Building },
                           { id: View.SCHOOL, name: 'Colegio', icon: GraduationCap },
                           { id: View.FISCAL, name: 'Fiscal', icon: ShieldCheck },
                         ].map(item => (
                           <button 
                             key={item.id} onClick={() => { setView(item.id); setIsSidebarOpen(false); }}
                             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest ${view === item.id ? 'bg-cyan-500/10 text-cyan-400' : 'text-slate-500'}`}
                           >
                             <item.icon className="w-4 h-4" /> {item.name}
                           </button>
                         ))}
                       </nav>
                    </div>
                    <button onClick={() => setIsDemo(false)} className="text-red-500 font-black text-[10px] uppercase tracking-widest">Salir</button>
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            {/* Main Content Area */}
            <main className="flex-1 p-6 lg:p-12 overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
               <AnimatePresence mode="wait">
                  <motion.div key={view} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="h-full">
                    {renderView()}
                  </motion.div>
               </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
