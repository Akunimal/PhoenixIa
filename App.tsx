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

// ==========================================
// 1. COMPONENTES DE LA SUITE (DEMO)
// ==========================================

enum View { DASHBOARD, POS, TABLES, RENTALS, SCHOOL, VISION, FISCAL }

const themes = {
  [View.DASHBOARD]: { color: 'text-amber-400', border: 'border-amber-500', bg: 'bg-amber-500/10' },
  [View.POS]: { color: 'text-emerald-400', border: 'border-emerald-500', bg: 'bg-emerald-500/10' },
  [View.TABLES]: { color: 'text-orange-400', border: 'border-orange-500', bg: 'bg-orange-500/10' },
  [View.RENTALS]: { color: 'text-rose-400', border: 'border-rose-500', bg: 'bg-rose-500/10' },
  [View.SCHOOL]: { color: 'text-indigo-400', border: 'border-indigo-500', bg: 'bg-indigo-500/10' },
  [View.VISION]: { color: 'text-red-400', border: 'border-red-500', bg: 'bg-red-500/10' },
  [View.FISCAL]: { color: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-500/10' },
};

// --- MÓDULO: PUNTO DE VENTA (POS) ---
const POSView = () => {
  const [cart, setCart] = useState<{id: number, name: string, price: number, qty: number}[]>([]);
  const products = [
    { id: 1, name: "Café Espresso", price: 2800 },
    { id: 2, name: "Medialuna Pro", price: 950 },
    { id: 3, name: "Tostado Especial", price: 4800 },
    { id: 4, name: "Jugo Natural", price: 3200 },
    { id: 5, name: "Licuado Fruta", price: 4100 },
    { id: 6, name: "Agua Mineral", price: 1800 },
  ];

  const addToCart = (p: any) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === p.id);
      if (exists) return prev.map(item => item.id === p.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  return (
    <div className="flex flex-col md:grid md:grid-cols-3 gap-6 h-full">
      <div className={`col-span-2 ${glassCard} p-6 rounded-3xl flex flex-col`}>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><ShoppingCart className="text-emerald-400" /> Venta Rápida</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
          {products.map(p => (
            <motion.div 
              key={p.id} whileTap={{ scale: 0.95 }} onClick={() => addToCart(p)}
              className="bg-slate-950 p-4 rounded-2xl border border-white/5 hover:border-emerald-500/50 cursor-pointer transition-all group"
            >
              <div className="h-12 bg-slate-900 rounded-xl mb-3 flex items-center justify-center group-hover:bg-emerald-500/10"><Plus className="text-emerald-500" /></div>
              <p className="text-white text-sm font-bold">{p.name}</p>
              <p className="text-emerald-400 text-xs">$ {p.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className={`${glassCard} p-6 rounded-3xl flex flex-col justify-between border-t-4 border-emerald-500`}>
        <div className="overflow-y-auto max-h-[50vh]">
          <h3 className="text-white font-bold mb-4">Ticket de Venta</h3>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-xs text-slate-300 mb-2 p-2 bg-white/5 rounded-lg">
              <span>{item.qty}x {item.name}</span>
              <span>$ {item.qty * item.price}</span>
            </div>
          ))}
        </div>
        <div className="pt-4 border-t border-white/10">
          <div className="flex justify-between text-xl font-black text-white mb-4"><span>TOTAL</span><span>$ {total}</span></div>
          <button onClick={() => setCart([])} className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl shadow-lg shadow-emerald-500/20">FACTURAR</button>
        </div>
      </div>
    </div>
  );
};

// --- MÓDULO: AUDITOR / DASHBOARD (CON BARRA DE CARGA) ---
const DashboardAuditor = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showData, setShowData] = useState(false);

  const runAuditory = () => {
    setLoading(true);
    setProgress(0);
    setShowData(false);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          setShowData(true);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  return (
    <div className="h-full space-y-6">
      {!showData && !loading && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <div className="p-6 bg-amber-500/10 rounded-full border border-amber-500/20 animate-pulse"><Bot className="w-16 h-16 text-amber-500" /></div>
          <h2 className="text-4xl font-black text-white">Auditoría Estratégica</h2>
          <p className="text-slate-400 max-w-md">Analiza mermas, fatiga de personal y optimización de precios en un solo clic.</p>
          <button onClick={runAuditory} className="bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 px-10 py-5 rounded-2xl font-black text-xl shadow-xl shadow-amber-500/20">IMPULSA MI NEGOCIO!</button>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <p className="text-amber-400 font-mono text-sm animate-pulse">PROCESANDO DATOS NEURALES...</p>
          <div className="w-64 h-3 bg-slate-800 rounded-full overflow-hidden border border-white/5">
            <motion.div className="h-full bg-amber-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
          </div>
          <span className="text-slate-500 text-xs font-mono">{progress}% COMPLETO</span>
        </div>
      )}

      {showData && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className={`${glassCard} p-6 rounded-3xl border-l-4 border-red-500`}>
                <h4 className="text-red-400 text-xs font-bold uppercase">Alerta RRHH</h4>
                <p className="text-slate-300 text-xs mt-2"><strong>Turno Crítico:</strong> "Marcos R." cierra hoy 02 AM y abre mañana 08 AM. Alto riesgo de error por fatiga. Se sugiere rotar.</p>
             </div>
             <div className={`${glassCard} p-6 rounded-3xl border-l-4 border-cyan-500`}>
                <h4 className="text-cyan-400 text-xs font-bold uppercase">Optimización Menú</h4>
                <p className="text-slate-300 text-xs mt-2">"Risotto" tiene 15% de merma. Eliminar y potenciar "Pastas" que subió 22% en demanda este mes.</p>
             </div>
             <div className={`${glassCard} p-6 rounded-3xl border-l-4 border-emerald-500`}>
                <h4 className="text-emerald-400 text-xs font-bold uppercase">Estacionalidad</h4>
                <p className="text-slate-300 text-xs mt-2">Pico de demanda detectado para viernes noche. Extender cocina 1h aumenta ingresos un 14%.</p>
             </div>
          </div>
          <div className={`${glassCard} p-8 rounded-3xl text-center bg-amber-500/5`}>
             <p className="text-amber-400 font-bold italic">"Estas mejoras se aplican a cualquier rubro: Salud, Comercio, Educación o Legal."</p>
          </div>
          <button onClick={() => setShowData(false)} className="text-slate-500 text-xs underline w-full text-center">Reiniciar Análisis</button>
        </motion.div>
      )}
    </div>
  );
};

// --- MÓDULO: ALQUILERES (FLUJO COMPLETO) ---
const RentalsView = () => {
  const [step, setStep] = useState(0); // 0: Inicio, 1: Pago, 2: Reservado
  const [days, setDays] = useState([5, 6, 7]);

  const handlePay = () => {
    setStep(1);
    setTimeout(() => { setStep(2); setDays([...days, 15, 16, 17]); }, 2500);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <div className={`${glassCard} p-6 rounded-3xl`}>
         <h3 className="text-rose-400 font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5" /> Calendario Enero</h3>
         <div className="grid grid-cols-7 gap-2">
            {Array.from({length: 28}).map((_, i) => {
               const d = i + 1;
               const block = days.includes(d);
               return <div key={d} className={`aspect-square rounded-lg flex items-center justify-center text-[10px] border ${block ? 'bg-rose-500/20 border-rose-500 text-rose-400' : 'bg-slate-900 border-slate-800 text-slate-600'}`}>{d}</div>
            })}
         </div>
      </div>
      <div className={`${glassCard} p-6 rounded-3xl flex flex-col border-t-4 border-rose-500`}>
         <div className="flex-1 space-y-4">
            <div className="bg-slate-800 p-3 rounded-2xl rounded-tr-none ml-auto text-xs w-4/5 text-white">Hola! Disponible del 15 al 17?</div>
            <div className="bg-slate-900 border border-white/5 p-3 rounded-2xl rounded-tl-none text-xs w-4/5 text-slate-300">
               <Bot className="w-3 h-3 text-rose-400 mb-1" /> Si! Está libre. El total es $45.000. Te envío el link:
               <button onClick={handlePay} className="mt-2 w-full bg-blue-600 text-white py-2 rounded-lg font-bold text-[10px] flex items-center justify-center gap-1"><CreditCard className="w-3 h-3"/> Pagar con Mercado Pago</button>
            </div>
            {step === 1 && <div className="text-center text-xs text-rose-400 animate-pulse py-4 font-mono">PROCESANDO PAGO...</div>}
            {step === 2 && (
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-emerald-500/20 border border-emerald-500 p-3 rounded-2xl text-[10px] text-emerald-400 font-bold">
                 ¡PAGO CONFIRMADO! Fechas 15, 16 y 17 bloqueadas automáticamente.
              </motion.div>
            )}
         </div>
      </div>
    </div>
  );
};

// --- MÓDULO: VISION (CÁMARAS INTERACTIVAS) ---
const VisionView = () => {
  const [cams, setCams] = useState<{x: number, y: number}[]>([]);
  const addCam = (e: any) => {
    const r = e.currentTarget.getBoundingClientRect();
    setCams([...cams, { x: e.clientX - r.left, y: e.clientY - r.top }]);
  };
  return (
    <div className="h-full flex flex-col space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2"><Eye className="text-red-500" /> Vision Planner</h2>
      <div className="flex-1 bg-slate-900 border-2 border-dashed border-slate-800 rounded-3xl relative cursor-crosshair overflow-hidden" onClick={addCam}>
         <div className="absolute top-10 left-10 w-32 h-40 border border-slate-700 flex items-center justify-center text-[10px] text-slate-700 uppercase font-bold">Depósito</div>
         <div className="absolute bottom-10 right-20 w-40 h-20 border border-slate-700 flex items-center justify-center text-[10px] text-slate-700 uppercase font-bold">Oficina</div>
         {cams.map((c, i) => (
           <div key={i} className="absolute" style={{ left: c.x - 10, top: c.y - 10 }}>
              <div className="w-20 h-20 bg-red-500/10 absolute -top-5 -left-5 rounded-full blur-xl" />
              <div className="bg-red-500 p-2 rounded-full relative z-10"><Camera className="w-3 h-3 text-white" /></div>
              <div className="w-40 h-40 bg-red-500/5 absolute top-0 left-0" style={{ clipPath: 'polygon(0 0, 100% 40%, 100% 60%)', transform: 'rotate(-45deg)', transformOrigin: 'top left' }} />
           </div>
         ))}
      </div>
    </div>
  );
};

// --- MÓDULO: FISCAL ---
const FiscalView = () => {
  const [stat, setStat] = useState(0);
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
       <ShieldCheck className={`w-20 h-20 mb-6 ${stat === 2 ? 'text-emerald-400' : 'text-slate-700'}`} />
       <h2 className="text-2xl font-bold text-white mb-2">Homologación Fiscal AFIP</h2>
       <p className="text-slate-500 text-sm max-w-xs mb-8">Vinculación directa de puntos de venta con certificados de seguridad nivel 3.</p>
       {stat === 0 && <button onClick={() => {setStat(1); setTimeout(()=>setStat(2), 2000)}} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold">VINCULAR PUNTO DE VENTA</button>}
       {stat === 1 && <p className="text-blue-400 font-mono text-xs animate-pulse">SOLICITANDO CAEA...</p>}
       {stat === 2 && <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 font-mono text-[10px]">CERT_TOKEN: PHX-AFIP-2026-ACTIVE</div>}
    </div>
  );
};

// --- MÓDULO: COLEGIO ---
const SchoolView = () => (
  <div className="space-y-6">
    <h2 className="text-xl font-bold text-white flex items-center gap-2"><GraduationCap className="text-indigo-400"/> Gestión Directiva</h2>
    <div className="grid grid-cols-2 gap-4">
       <div className={`${glassCard} p-4 rounded-2xl`}><Users className="text-indigo-400 mb-2"/><h4 className="text-white text-sm font-bold">Mora Mensual</h4><div className="text-2xl font-bold text-red-400">12.5%</div><p className="text-[10px] text-slate-500">Recordatorios IA enviados</p></div>
       <div className={`${glassCard} p-4 rounded-2xl`}><Clock className="text-indigo-400 mb-2"/><h4 className="text-white text-sm font-bold">Optimización</h4><div className="text-2xl font-bold text-emerald-400">+15hs</div><p className="text-[10px] text-slate-500">Ahorro en grilla docente</p></div>
    </div>
  </div>
);

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
        <div className="h-full flex flex-col items-center justify-center">
          <h2 className="text-white font-bold mb-10">Mapa de Mesas (Click para facturar)</h2>
          <div className="grid grid-cols-3 gap-8">
             {[1,2,3,4,5,6].map(i => (
               <motion.div key={i} whileHover={{scale: 1.1}} onClick={() => setView(View.POS)} className="w-20 h-20 rounded-full border-2 border-slate-700 bg-slate-900 flex items-center justify-center text-white font-bold cursor-pointer hover:border-orange-500">{i}</motion.div>
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
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-cyan-500/30">
      {!isDemo ? (
        <div className="flex flex-col items-center justify-center h-screen text-center px-6">
           <img src="/logo-phoenix.png" className="h-16 mb-10" />
           <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black tracking-tighter mb-6">EVOLUCIONAMOS <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">TU NEGOCIO.</span></motion.h1>
           <p className="max-w-xl text-slate-400 text-lg mb-10">Inteligencia Artificial aplicada para ahorrar tiempo y dinero en cualquier rubro.</p>
           <div className="flex gap-4">
              <button onClick={() => setIsDemo(true)} className="bg-cyan-500 text-slate-950 px-8 py-4 rounded-2xl font-black flex items-center gap-2 hover:scale-105 transition-all"><LayoutDashboard className="w-5 h-5"/> PROBAR DEMO INTERACTIVA</button>
              <a href="https://wa.me/542255605257" className="bg-white/5 border border-white/10 px-8 py-4 rounded-2xl font-bold flex items-center gap-2">WHATSAPP</a>
           </div>
        </div>
      ) : (
        <div className="flex h-screen">
           <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 hidden md:flex flex-col justify-between">
              <div className="space-y-8">
                 <div className="flex items-center gap-2"><img src="/logo-phoenix.png" className="h-8" /><span className="font-bold">SUITE</span></div>
                 <nav className="space-y-2">
                    {[
                      { id: View.DASHBOARD, name: 'Dashboard Auditor', icon: LayoutDashboard },
                      { id: View.POS, name: 'POS Gastronomía', icon: ShoppingCart },
                      { id: View.TABLES, name: 'Mesas', icon: Grid3x3 },
                      { id: View.RENTALS, name: 'Alquileres', icon: Building },
                      { id: View.SCHOOL, name: 'Colegio', icon: GraduationCap },
                      { id: View.VISION, name: 'Vision IA', icon: Eye },
                      { id: View.FISCAL, name: 'Fiscal AFIP', icon: ShieldCheck },
                    ].map(item => (
                      <button 
                        key={item.id} onClick={() => setView(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm ${view === item.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:bg-slate-900'}`}
                      >
                        <item.icon className="w-4 h-4" /> {item.name}
                      </button>
                    ))}
                 </nav>
              </div>
              <button onClick={() => setIsDemo(false)} className="text-red-400 flex items-center gap-2 text-sm"><LogOut className="w-4 h-4" /> Salir</button>
           </aside>
           <main className="flex-1 p-4 md:p-8 overflow-y-auto">{renderView()}</main>
        </div>
      )}
    </div>
  );
}
