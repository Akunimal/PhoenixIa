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
// 0. ESTILOS Y UTILIDADES (Z-INDEX FIX)
// ==========================================
const glassCard = "bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-2xl";

const TechBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <div className="absolute inset-0 bg-slate-950" />
    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)]" />
  </div>
);

// ==========================================
// 1. MÓDULOS DE LA DEMO (LÓGICA INTERACTIVA)
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
      {!showData && !loading && (
        <div className="text-center space-y-8">
          <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="p-10 bg-amber-500/10 rounded-full border border-amber-500/20 w-fit mx-auto shadow-[0_0_50px_rgba(245,158,11,0.1)]">
            <Bot className="w-24 h-24 text-amber-500" />
          </motion.div>
          <div className="space-y-2">
            <h2 className="text-5xl font-black text-white tracking-tighter uppercase">Auditoría Estratégica</h2>
            <p className="text-slate-400 text-lg">Haga clic para iniciar el análisis neural de su empresa.</p>
          </div>
          <button onClick={runAuditory} className="bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 px-12 py-6 rounded-2xl font-black text-2xl shadow-2xl shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all">IMPULSA MI NEGOCIO!</button>
        </div>
      )}

      {loading && (
        <div className="w-full max-w-md space-y-6 text-center">
          <p className="text-amber-400 font-mono text-xl animate-pulse tracking-widest uppercase">Escaneando parámetros operativos...</p>
          <div className="h-4 bg-slate-800 rounded-full overflow-hidden border border-white/10 p-1">
            <motion.div className="h-full bg-amber-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
          </div>
          <p className="text-slate-500 font-mono text-lg">{progress}%</p>
        </div>
      )}

      {showData && (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl px-4">
           <div className={`${glassCard} p-8 rounded-[40px] border-l-8 border-red-500`}>
              <h4 className="text-red-400 font-black flex items-center gap-2 uppercase text-sm mb-4"><AlertTriangle /> Alerta Crítica RRHH</h4>
              <p className="text-slate-300 text-lg leading-relaxed">El sistema detectó que <strong>"Marcos R."</strong> excede el límite de fatiga (Turno Noche + Turno Mañana sin descanso). Riesgo de error: <strong>92%</strong>.</p>
           </div>
           <div className={`${glassCard} p-8 rounded-[40px] border-l-8 border-cyan-500`}>
              <h4 className="text-cyan-400 font-black flex items-center gap-2 uppercase text-sm mb-4"><TrendingUp /> Optimización de Carta</h4>
              <p className="text-slate-300 text-lg leading-relaxed">El "Risotto" tiene 15% de merma. Potenciar "Pastas" (+22% demanda). Sugerencia: Ajuste de precios <strong>+9%</strong> por inflación detectada.</p>
           </div>
           <div className={`${glassCard} p-6 rounded-3xl md:col-span-2 text-center bg-amber-500/5 border-amber-500/20`}>
              <p className="text-amber-200 font-bold italic">"Las mejoras estratégicas han sido enviadas a la dirección general. Aplicable a cualquier rubro."</p>
           </div>
        </motion.div>
      )}
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
            <button key={p.id} onClick={() => addToCart(p)} className="bg-slate-950 p-6 rounded-3xl border border-white/5 hover:border-emerald-500/50 text-left transition-all active:scale-95">
              <p className="text-white font-black text-lg">{p.name}</p>
              <p className="text-emerald-400 font-mono">$ {p.price}</p>
            </button>
          ))}
        </div>
      </div>
      <div className={`${glassCard} p-8 rounded-[40px] flex flex-col justify-between border-t-8 border-emerald-500`}>
        <div className="space-y-4">
           <h3 className="text-white font-black uppercase text-sm tracking-widest border-b border-white/10 pb-4">Ticket de Control</h3>
           {cart.map((i, idx) => <div key={idx} className="flex justify-between text-sm text-slate-300"><span>{i.qty}x {i.name}</span><span>$ {i.price * i.qty}</span></div>)}
        </div>
        <div className="pt-6 border-t border-white/10">
          <div className="flex justify-between text-3xl font-black mb-6"><span>TOTAL</span><span>$ {total}</span></div>
          <button onClick={() => setCart([])} className="w-full bg-emerald-500 text-slate-950 font-black py-5 rounded-2xl active:scale-95 transition-transform shadow-xl shadow-emerald-500/20 uppercase">Emitir Factura</button>
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
         <h3 className="text-rose-400 font-black mb-6 uppercase tracking-widest">Estado de Reservas</h3>
         <div className="grid grid-cols-7 gap-3">
            {Array.from({length: 28}).map((_, i) => (
              <div key={i} className={`aspect-square rounded-xl flex items-center justify-center text-xs border-2 ${blocked.includes(i+1) ? 'bg-rose-500/20 border-rose-500 text-rose-400 font-bold' : 'border-slate-800 text-slate-700'}`}>{i+1}</div>
            ))}
         </div>
      </div>
      <div className={`${glassCard} p-8 rounded-[40px] flex flex-col border-t-8 border-rose-500`}>
         <div className="flex-1 space-y-6">
            <div className="bg-slate-800 p-4 rounded-2xl rounded-tr-none ml-auto text-sm w-4/5 text-white">Hola! Tienen libre para el 20 y 21 de enero?</div>
            <div className="bg-slate-900 p-4 rounded-2xl rounded-tl-none text-sm w-4/5 text-slate-300 border border-white/5">
               <Bot className="w-4 h-4 text-rose-400 mb-2" /> <strong>Phoenix Bot:</strong> Si! Esas fechas están libres. El total es $84.000.
               <button onClick={() => { setPayStatus(1); setTimeout(()=> { setPayStatus(2); setBlocked([...blocked, 20, 21]) }, 2500) }} className="mt-4 w-full bg-blue-600 text-white py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all">
                 <CreditCard /> PAGAR CON MERCADO PAGO
               </button>
            </div>
            {payStatus === 1 && <div className="text-rose-400 animate-pulse text-xs text-center font-mono py-4">SINCRONIZANDO CON MERCADO PAGO...</div>}
            {payStatus === 2 && <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-emerald-500/20 border-2 border-emerald-500 p-4 rounded-2xl text-emerald-400 text-sm font-black text-center">¡PAGO CONFIRMADO! Días 20 y 21 bloqueados.</motion.div>}
         </div>
      </div>
    </div>
  );
};

// --- COLEGIO (SUITE DIRECTIVA) ---
const SchoolView = () => (
  <div className="space-y-8 relative z-20 h-full">
    <h2 className="text-3xl font-black text-white flex items-center gap-3"><GraduationCap className="text-indigo-400 w-10 h-10" /> Panel Directivo</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className={`${glassCard} p-8 rounded-[40px] border-l-8 border-red-500`}>
          <h4 className="text-white font-black flex items-center gap-2 mb-4 uppercase text-sm"><TrendingDown className="text-red-500" /> IA Predictora de Mora</h4>
          <p className="text-slate-400 text-lg">Se detectaron 8 familias con <strong>patrón de impago inminente</strong>. El sistema ya envió recordatorios preventivos automatizados. Ahorro estimado: <strong>$450.000</strong>.</p>
       </div>
       <div className={`${glassCard} p-8 rounded-[40px] border-l-8 border-indigo-500`}>
          <h4 className="text-white font-black flex items-center gap-2 mb-4 uppercase text-sm"><Users className="text-indigo-500" /> Clima Institucional</h4>
          <p className="text-slate-400 text-lg">Alerta de anomalía en 4to Año B. Se detectó un patrón de inasistencia inusual. Notificación enviada a Preceptoría con prioridad 1.</p>
       </div>
    </div>
    <div className={`${glassCard} p-10 rounded-[50px] text-center border-t-8 border-indigo-500`}>
       <Clock className="w-16 h-16 text-indigo-500 mx-auto mb-6 animate-spin-slow" />
       <h3 className="text-2xl font-black text-white mb-4">Optimizador de Grilla Horaria</h3>
       <p className="text-slate-400 max-w-2xl mx-auto">La IA resolvió 12 choques horarios de profesores para el próximo cuatrimestre. Ahorro de gestión: <strong>15 horas hombre mensuales</strong>.</p>
    </div>
  </div>
);

// --- FISCAL (AFIP) ---
const FiscalView = () => {
  const [s, setS] = useState(0);
  return (
    <div className="h-full flex flex-col items-center justify-center text-center relative z-20">
       <ShieldCheck className={`w-32 h-32 mb-8 ${s === 2 ? 'text-emerald-400 drop-shadow-[0_0_20px_rgba(52,211,153,0.5)]' : 'text-slate-800'}`} />
       <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Certificación Fiscal</h2>
       <p className="text-slate-500 text-lg max-w-sm mb-12">Homologación directa con servidores AFIP para factura electrónica nivel 3.</p>
       {s === 0 && <button onClick={() => {setS(1); setTimeout(()=>setS(2), 2000)}} className="bg-blue-600 text-white px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 active:scale-95 transition-all">HOMOLOGAR PUNTO DE VENTA</button>}
       {s === 1 && <p className="text-blue-400 animate-pulse font-mono text-xl tracking-widest">SOLICITANDO TOKEN CAEA...</p>}
       {s === 2 && (
         <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="p-8 bg-emerald-500/10 border-2 border-emerald-500 rounded-[40px]">
            <p className="text-emerald-400 font-mono text-xl font-bold">ESTADO: CONECTADO Y HOMOLOGADO</p>
            <p className="text-slate-500 font-mono text-sm mt-4 tracking-widest">PHX-CERT-2026-X99-ACTIVE</p>
         </motion.div>
       )}
    </div>
  );
};

// ==========================================
// 2. APLICACIÓN PRINCIPAL (LANDING + DEMO)
// ==========================================

export default function App() {
  const [isDemo, setIsDemo] = useState(false);
  const [view, setView] = useState<View>(View.DASHBOARD);

  const renderView = () => {
    switch(view) {
      case View.DASHBOARD: return <DashboardAuditor />;
      case View.POS: return <POSView />;
      case View.TABLES: return (
        <div className="h-full flex flex-col items-center justify-center relative z-20">
          <h2 className="text-4xl font-black text-white mb-16 italic tracking-tighter uppercase">Gestión de Salón</h2>
          <div className="grid grid-cols-3 gap-12">
             {[1,2,3,4,5,6].map(i => (
               <button key={i} onClick={() => setView(View.POS)} className="w-28 h-28 rounded-[40px] border-4 border-slate-700 bg-slate-900/50 flex flex-col items-center justify-center text-white font-black hover:border-orange-500 hover:scale-110 transition-all shadow-2xl active:scale-90">
                  <span className="text-[10px] text-slate-500 uppercase">Mesa</span>
                  <span className="text-3xl">{i}</span>
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
          <motion.div 
            key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen text-center px-6 relative z-10"
          >
            {/* Landing Navigation */}
            <nav className="fixed top-0 w-full h-24 flex items-center justify-between px-10 border-b border-white/5 backdrop-blur-md z-50">
               <div className="flex items-center gap-3">
                 <img src="/logo-phoenix.png" className="h-10 drop-shadow-[0_0_10px_#22d3ee]" />
                 <span className="text-2xl font-black uppercase tracking-tighter text-white">Phoenix <span className="text-cyan-400">IA</span></span>
               </div>
               <div className="hidden md:flex gap-10 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <a href="#" className="hover:text-cyan-400 transition-colors">Servicios</a>
                  <a href="#" className="hover:text-cyan-400 transition-colors">Nosotros</a>
                  <a href="#" className="hover:text-cyan-400 transition-colors">Contacto</a>
               </div>
               <button onClick={() => setIsDemo(true)} className="bg-cyan-500/10 text-cyan-400 px-6 py-3 rounded-xl border border-cyan-500/30 text-xs font-black uppercase tracking-widest hover:bg-cyan-500/20 transition-all shadow-[0_0_20px_rgba(34,211,238,0.1)]">Probar Demo</button>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 py-32">
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-7xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.85]">
                EVOLUCIONAMOS <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">TU NEGOCIO.</span>
              </motion.h1>
              <p className="max-w-2xl mx-auto text-xl md:text-2xl text-slate-400 mb-12 font-light leading-relaxed">
                Inteligencia Artificial aplicada para ahorrar tiempo y multiplicar la rentabilidad en cualquier industria.
              </p>
              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <button onClick={() => setIsDemo(true)} className="bg-cyan-500 text-slate-950 px-12 py-6 rounded-2xl font-black text-xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-cyan-500/40">
                  <LayoutDashboard /> LANZAR EXPERIENCIA INTERACTIVA
                </button>
                <a href="https://wa.me/542255605257" target="_blank" className="bg-white/5 border border-white/10 px-12 py-6 rounded-2xl font-black text-xl hover:bg-white/10 transition-all">CONSULTAR WHATSAPP</a>
              </div>
            </div>

            {/* Footer Sutil */}
            <footer className="absolute bottom-10 text-slate-600 text-[10px] tracking-[0.3em] font-bold uppercase">
              © 2026 PHOENIX NEURAL SUITE | GOOGLE CLOUD CERTIFIED
            </footer>
          </motion.div>
        ) : (
          <motion.div 
            key="demo" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="flex h-screen relative z-10 bg-slate-950"
          >
            {/* Demo Sidebar (Solo Escritorio) */}
            <aside className="w-72 bg-slate-950 border-r border-slate-800 p-8 hidden md:flex flex-col justify-between">
              <div className="space-y-12">
                 <div className="flex items-center gap-3"><img src="/logo-phoenix.png" className="h-10" /><span className="font-black text-white text-lg tracking-tighter italic">SUITE PRO</span></div>
                 <nav className="space-y-2">
                    {[
                      { id: View.DASHBOARD, name: 'Auditor IA', icon: Zap },
                      { id: View.POS, name: 'Punto de Venta', icon: ShoppingCart },
                      { id: View.TABLES, name: 'Mapa de Mesas', icon: Grid3x3 },
                      { id: View.RENTALS, name: 'Alquileres', icon: Building },
                      { id: View.SCHOOL, name: 'Gestión Colegio', icon: GraduationCap },
                      { id: View.FISCAL, name: 'Módulo Fiscal', icon: ShieldCheck },
                    ].map(item => (
                      <button 
                        key={item.id} onClick={() => setView(item.id)}
                        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all text-sm font-black uppercase tracking-widest ${view === item.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-lg' : 'text-slate-500 hover:bg-slate-900 hover:text-white'}`}
                      >
                        <item.icon className="w-5 h-5" /> {item.name}
                      </button>
                    ))}
                 </nav>
              </div>
              <button onClick={() => setIsDemo(false)} className="bg-red-500/10 text-red-500 p-4 rounded-2xl flex items-center justify-center gap-3 font-black text-xs hover:bg-red-500/20 transition-all border border-red-500/20"><LogOut className="w-4 h-4" /> SALIR DE DEMO</button>
            </aside>

            {/* Demo Header Móvil */}
            <div className="md:hidden fixed top-4 right-4 z-[100]">
               <button onClick={() => setIsDemo(false)} className="bg-red-500 p-3 rounded-xl text-white shadow-xl"><X /></button>
            </div>

            {/* Contenido Principal de la Demo */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
               <AnimatePresence mode="wait">
                  <motion.div key={view} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="h-full">
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
