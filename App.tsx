import React, { FC, ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Server, BrainCircuit, ArrowRight, MapPin, Camera, 
  Cpu, Wifi, MessageCircle, TrendingUp, Clock, Bot,
  LayoutDashboard, ShoppingCart, Settings, LogOut, Search, 
  AlertTriangle, FileText, Zap, BarChart3, Terminal, Menu, X,
  Users, Calendar, TrendingDown, Leaf, Layers, Plus, Trash2, 
  CheckCircle2, Grid3x3, Building, GraduationCap, ShieldCheck, Eye, CreditCard
} from 'lucide-react';

// ==========================================
// 0. ESTILOS Y UTILIDADES
// ==========================================
const glassCard = "bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-2xl";

// Fondo Técnico (No bloquea clics gracias a pointer-events-none)
const TechBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-slate-950" />
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />
  </div>
);

// ==========================================
// 1. MÓDULOS DE LA DEMO
// ==========================================
enum View { DASHBOARD, POS, TABLES, RENTALS, SCHOOL, VISION, FISCAL }

// --- MÓDULO: AUDITOR (DASHBOARD) ---
const DashboardAuditor = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showData, setShowData] = useState(false);

  const runAuditory = () => {
    setLoading(true); setProgress(0); setShowData(false);
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(interval); setLoading(false); setShowData(true); return 100; }
        return p + 4;
      });
    }, 60);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center relative z-10">
      {!showData && !loading && (
        <div className="text-center space-y-8">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="p-8 bg-amber-500/10 rounded-full border border-amber-500/20 w-fit mx-auto">
            <Bot className="w-20 h-20 text-amber-500" />
          </motion.div>
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Auditoría Neural</h2>
          <button onClick={runAuditory} className="bg-amber-500 text-slate-950 px-12 py-6 rounded-2xl font-black text-2xl shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all">IMPULSA MI NEGOCIO!</button>
        </div>
      )}

      {loading && (
        <div className="w-full max-w-md space-y-4 text-center">
          <p className="text-amber-400 font-mono animate-pulse tracking-widest">ANALIZANDO ADN EMPRESARIAL...</p>
          <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-white/10">
            <motion.div className="h-full bg-amber-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
          </div>
          <p className="text-slate-500 font-mono">{progress}%</p>
        </div>
      )}

      {showData && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
           <div className={`${glassCard} p-6 rounded-3xl border-l-4 border-red-500`}>
              <h4 className="text-red-400 font-bold flex items-center gap-2 uppercase text-xs"><AlertTriangle className="w-4 h-4"/> Alerta RRHH</h4>
              <p className="text-slate-300 text-sm mt-3"><strong>"Marcos R."</strong> cierra noche (02 AM) y abre mañana (08 AM). Riesgo de error por fatiga: <strong>CRÍTICO</strong>.</p>
           </div>
           <div className={`${glassCard} p-6 rounded-3xl border-l-4 border-cyan-500`}>
              <h4 className="text-cyan-400 font-bold flex items-center gap-2 uppercase text-xs"><TrendingUp className="w-4 h-4"/> Optimización</h4>
              <p className="text-slate-300 text-sm mt-3">"Risotto" genera 15% de merma. Potenciar "Pastas" que subió 22% en demanda. Ajuste de precios sugerido: <strong>+9%</strong>.</p>
           </div>
           <div className={`${glassCard} p-6 rounded-3xl border-l-4 border-indigo-500 md:col-span-2 text-center`}>
              <p className="text-indigo-200 italic">"Análisis completado para Colegio, Salud, Legal y Comercio. Estrategia enviada a su WhatsApp."</p>
           </div>
        </motion.div>
      )}
    </div>
  );
};

// --- MÓDULO: POS (ARREGLADO) ---
const POSView = () => {
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number}[]>([]);
  const products = [
    { id: 1, name: "Café Espresso", price: 2800 }, { id: 2, name: "Medialuna", price: 950 },
    { id: 3, name: "Tostado J&Q", price: 4800 }, { id: 4, name: "Jugo Natural", price: 3200 }
  ];
  const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  return (
    <div className="grid md:grid-cols-3 gap-6 h-full relative z-10">
      <div className={`${glassCard} col-span-2 p-6 rounded-3xl`}>
        <h2 className="text-xl font-bold text-white mb-6">Punto de Venta</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map(p => (
            <button key={p.id} onClick={() => setCart([...cart, {...p, qty: 1}])} className="bg-slate-950 p-4 rounded-2xl border border-white/5 hover:border-emerald-500/50 text-left transition-all">
              <p className="text-white font-bold">{p.name}</p>
              <p className="text-emerald-400 font-mono text-xs">$ {p.price}</p>
            </button>
          ))}
        </div>
      </div>
      <div className={`${glassCard} p-6 rounded-3xl flex flex-col justify-between border-t-4 border-emerald-500`}>
        <div className="space-y-2">
           <h3 className="text-white font-bold mb-4">Ticket</h3>
           {cart.map((i, idx) => <div key={idx} className="flex justify-between text-xs text-slate-300 p-2 bg-white/5 rounded"><span>{i.name}</span><span>$ {i.price}</span></div>)}
        </div>
        <div className="pt-4 border-t border-white/10">
          <div className="flex justify-between text-2xl font-black mb-4"><span>TOTAL</span><span>$ {total}</span></div>
          <button onClick={() => setCart([])} className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-xl active:scale-95 transition-transform">FACTURAR</button>
        </div>
      </div>
    </div>
  );
};

// --- MÓDULO: VISION IA (ARREGLADO) ---
const VisionView = () => {
  const [cams, setCams] = useState<{x: number, y: number, r: number}[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const add = (e: any) => {
    if(!ref.current) return;
    const b = ref.current.getBoundingClientRect();
    setCams([...cams, { x: e.clientX - b.left, y: e.clientY - b.top, r: 0 }]);
  };
  return (
    <div className="h-full flex flex-col space-y-4 relative z-10">
      <h2 className="text-xl font-bold text-white">Vision Planner <span className="text-red-500 text-xs font-normal">| Click para ubicar, Click-Derecho para rotar</span></h2>
      <div ref={ref} onClick={add} className="flex-1 bg-slate-900 border-2 border-dashed border-slate-700 rounded-[40px] relative overflow-hidden cursor-crosshair">
        {cams.map((c, i) => (
          <div key={i} className="absolute" style={{ left: c.x, top: c.y, transform: 'translate(-50%, -50%)' }}>
            <div className="absolute w-32 h-32 bg-red-500/20" style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 100%)', transform: `rotate(${c.r}deg)`, transformOrigin: 'left center' }} />
            <div onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); setCams(cams.map((cc, ii) => ii === i ? {...cc, r: cc.r + 45} : cc)) }} className="bg-red-500 p-2 rounded-full relative z-10"><Camera className="w-4 h-4 text-white" /></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MÓDULO: ALQUILERES ---
const RentalsView = () => {
  const [pay, setPay] = useState(0);
  const [days, setDays] = useState([1,2,5]);
  return (
    <div className="grid md:grid-cols-2 gap-6 h-full relative z-10">
      <div className={`${glassCard} p-6 rounded-3xl`}>
         <h3 className="text-rose-400 font-bold mb-4">Disponibilidad Enero</h3>
         <div className="grid grid-cols-7 gap-2">
            {Array.from({length: 28}).map((_, i) => (
              <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-[10px] border ${days.includes(i+1) ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'border-slate-800 text-slate-700'}`}>{i+1}</div>
            ))}
         </div>
      </div>
      <div className={`${glassCard} p-6 rounded-3xl flex flex-col border-t-4 border-rose-500`}>
         <div className="flex-1 space-y-4">
            <div className="bg-slate-800 p-3 rounded-xl ml-auto text-xs w-4/5 text-white">Hola! Libre del 20 al 22?</div>
            <div className="bg-slate-900 p-3 rounded-xl text-xs w-4/5 text-slate-300">
               <Bot className="w-3 h-3 text-rose-400 mb-1" /> Si! Está disponible. $84.000 total.
               <button onClick={() => { setPay(1); setTimeout(()=> { setPay(2); setDays([...days, 20, 21, 22]) }, 2000) }} className="mt-3 w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-xs">PAGAR CON MERCADO PAGO</button>
            </div>
            {pay === 1 && <div className="text-rose-400 animate-pulse text-xs text-center font-mono">PROCESANDO PAGO...</div>}
            {pay === 2 && <div className="bg-emerald-500/20 border border-emerald-500 p-3 rounded-xl text-emerald-400 text-xs font-bold">RESERVA CONFIRMADA. Días bloqueados en calendario.</div>}
         </div>
      </div>
    </div>
  );
};

// --- MÓDULO: COLEGIO ---
const SchoolView = () => (
  <div className="space-y-6 relative z-10 h-full">
    <h2 className="text-2xl font-bold text-white flex items-center gap-2"><GraduationCap className="text-indigo-400" /> Suite Directiva</h2>
    <div className="grid grid-cols-2 gap-4">
       <div className={`${glassCard} p-6 rounded-3xl border-l-4 border-red-500`}>
          <h4 className="text-white font-bold flex items-center gap-2 text-sm"><TrendingDown className="w-4 h-4 text-red-500" /> Predictor de Mora</h4>
          <p className="text-slate-400 text-xs mt-2">Detección temprana de 8 familias con riesgo de impago. Notificaciones preventivas enviadas automáticamente.</p>
       </div>
       <div className={`${glassCard} p-6 rounded-3xl border-l-4 border-indigo-500`}>
          <h4 className="text-white font-bold flex items-center gap-2 text-sm"><Users className="w-4 h-4 text-indigo-500" /> Conflictos Escolares</h4>
          <p className="text-slate-400 text-xs mt-2">Alerta de anomalía en 4to Año. Patrón de inasistencia detectado. Notificación a Preceptoría nivel Prioridad 1.</p>
       </div>
    </div>
    <div className={`${glassCard} flex-1 p-6 rounded-[40px] flex flex-col justify-center items-center text-center`}>
       <Clock className="w-12 h-12 text-indigo-500 mb-4 animate-spin-slow" />
       <h3 className="text-white font-bold">Optimizador de Grillas Horarias</h3>
       <p className="text-slate-400 text-sm mt-2 max-w-sm">La IA resolvió 12 choques horarios de profesores. Ahorro de gestión: 15 horas mensuales.</p>
    </div>
  </div>
);

// --- MÓDULO: FISCAL ---
const FiscalView = () => {
  const [s, setS] = useState(0);
  return (
    <div className="h-full flex flex-col items-center justify-center text-center relative z-10">
       <ShieldCheck className={`w-24 h-24 mb-6 ${s === 2 ? 'text-emerald-400' : 'text-slate-800'}`} />
       <h2 className="text-2xl font-bold text-white mb-2">Homologación Fiscal AFIP</h2>
       {s === 0 && <button onClick={() => {setS(1); setTimeout(()=>setS(2), 2000)}} className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black">VINCULAR PUNTO DE VENTA</button>}
       {s === 1 && <p className="text-blue-400 animate-pulse font-mono">SOLICITANDO TOKEN...</p>}
       {s === 2 && <div className="p-4 bg-emerald-500/10 border border-emerald-500 rounded-2xl text-emerald-400 font-mono text-xs">CERTIFICADO ACTIVO: PHX-AFIP-2026</div>}
    </div>
  );
};

// ==========================================
// 2. APLICACIÓN PRINCIPAL
// ==========================================
export default function App() {
  const [isDemo, setIsDemo] = useState(false);
  const [view, setView] = useState<View>(View.DASHBOARD);

  const renderView = () => {
    switch(view) {
      case View.DASHBOARD: return <DashboardAuditor />;
      case View.POS: return <POSView />;
      case View.TABLES: return (
        <div className="h-full flex flex-col items-center justify-center relative z-10">
          <h2 className="text-white font-bold mb-10 text-2xl">Gestión de Mesas</h2>
          <div className="grid grid-cols-3 gap-6">
             {[1,2,3,4,5,6].map(i => (
               <button key={i} onClick={() => setView(View.POS)} className="w-24 h-24 rounded-[30px] border-2 border-slate-700 bg-slate-900/50 flex items-center justify-center text-white font-bold hover:border-orange-500 hover:scale-110 transition-all shadow-xl">{i}</button>
             ))}
          </div>
        </div>
      );
      case View.RENTALS: return <RentalsView />;
      case View.SCHOOL: return <SchoolView />;
      case View.VISION: return <VisionView />;
      case View.FISCAL: return <FiscalView />;
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen relative overflow-hidden">
      <TechBackground />
      
      {!isDemo ? (
        <div className="flex flex-col items-center justify-center h-screen text-center px-6 relative z-10">
           <img src="/logo-phoenix.png" className="h-20 mb-10 drop-shadow-[0_0_15px_#22d3ee]" />
           <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black tracking-tighter mb-6">EVOLUCIONAMOS <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">TU NEGOCIO.</span></motion.h1>
           <p className="max-w-xl text-slate-400 text-lg mb-12">Inteligencia Artificial aplicada para ahorrar tiempo y dinero en cualquier rubro.</p>
           <div className="flex gap-4">
              <button onClick={() => setIsDemo(true)} className="bg-cyan-500 text-slate-950 px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-cyan-500/40">PROBAR DEMO INTERACTIVA</button>
              <a href="https://wa.me/542255605257" className="bg-white/5 border border-white/10 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">WHATSAPP</a>
           </div>
        </div>
      ) : (
        <div className="flex h-screen relative z-10">
           {/* Sidebar Desktop */}
           <aside className="w-64 bg-slate-950/80 backdrop-blur-md border-r border-slate-800 p-6 hidden md:flex flex-col justify-between">
              <div className="space-y-10">
                 <div className="flex items-center gap-2"><img src="/logo-phoenix.png" className="h-8" /><span className="font-black tracking-widest text-xs">SUITE PRO</span></div>
                 <nav className="space-y-1">
                    {[
                      { id: View.DASHBOARD, name: 'Auditor IA', icon: Zap },
                      { id: View.POS, name: 'POS / Venta', icon: ShoppingCart },
                      { id: View.TABLES, name: 'Mesas', icon: Grid3x3 },
                      { id: View.RENTALS, name: 'Alquileres', icon: Building },
                      { id: View.SCHOOL, name: 'Colegio', icon: GraduationCap },
                      { id: View.VISION, name: 'Vision / Cámaras', icon: Eye },
                      { id: View.FISCAL, name: 'Fiscal AFIP', icon: ShieldCheck },
                    ].map(item => (
                      <button 
                        key={item.id} onClick={() => setView(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-medium ${view === item.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg' : 'text-slate-500 hover:bg-slate-900 hover:text-white'}`}
                      >
                        <item.icon className="w-4 h-4" /> {item.name}
                      </button>
                    ))}
                 </nav>
              </div>
              <button onClick={() => setIsDemo(false)} className="text-red-400/60 hover:text-red-400 flex items-center gap-2 text-sm font-bold transition-colors"><LogOut className="w-4 h-4" /> SALIR</button>
           </aside>
           
           {/* Mobile Header */}
           <div className="fixed top-4 left-4 z-50 md:hidden">
              <button onClick={() => setIsDemo(false)} className="p-2 bg-slate-900 rounded-lg text-red-400"><X /></button>
           </div>

           <main className="flex-1 p-4 md:p-10 overflow-y-auto">
              <AnimatePresence mode="wait">
                <motion.div key={view} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="h-full">
                  {renderView()}
                </motion.div>
              </AnimatePresence>
           </main>
        </div>
      )}
    </div>
  );
}
