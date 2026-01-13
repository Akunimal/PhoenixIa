import React, { FC, ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Server, BrainCircuit, ArrowRight, MapPin, Camera, 
  Cpu, Wifi, MessageCircle, TrendingUp, Clock, Bot,
  LayoutDashboard, ShoppingCart, Settings, LogOut, Search, 
  AlertTriangle, FileText, Zap, BarChart3, Terminal, Menu, X,
  Users, Calendar, TrendingDown, Leaf, Layers, Plus, Trash2, 
  CheckCircle2, Grid3x3, Building, GraduationCap, ShieldCheck, Eye, CreditCard, RotateCw
} from 'lucide-react';

// ==========================================
// 0. ESTILOS Y UTILIDADES
// ==========================================
const glassCard = "bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-2xl";

// ==========================================
// 1. COMPONENTES DE LA SUITE (DEMO)
// ==========================================
enum View { DASHBOARD, POS, TABLES, RENTALS, SCHOOL, VISION, FISCAL }

// --- MÓDULO: AUDITOR / DASHBOARD ---
const DashboardAuditor = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showData, setShowData] = useState(false);

  const runAuditory = () => {
    setLoading(true); setProgress(0); setShowData(false);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); setLoading(false); setShowData(true); return 100; }
        return prev + 5;
      });
    }, 80);
  };

  return (
    <div className="h-full space-y-6">
      {!showData && !loading && (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="p-8 bg-amber-500/10 rounded-full border border-amber-500/20">
            <Bot className="w-20 h-20 text-amber-500" />
          </motion.div>
          <h2 className="text-4xl font-black text-white tracking-tighter">AUDITORÍA ESTRATÉGICA NEURAL</h2>
          <p className="text-slate-400 max-w-md text-lg">Haga clic para que la IA procese mermas, optimice precios y detecte fatiga laboral.</p>
          <button onClick={runAuditory} className="bg-gradient-to-r from-amber-400 to-yellow-600 text-slate-950 px-12 py-6 rounded-2xl font-black text-2xl shadow-2xl shadow-amber-500/30 hover:scale-105 transition-transform">IMPULSA MI NEGOCIO!</button>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <p className="text-amber-400 font-mono text-xl animate-pulse tracking-widest">EJECUTANDO ALGORITMOS DE EVOLUCIÓN...</p>
          <div className="w-full max-w-md h-4 bg-slate-800 rounded-full overflow-hidden border border-white/10 p-1">
            <motion.div className="h-full bg-amber-500 rounded-full shadow-[0_0_15px_#f59e0b]" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
          </div>
          <span className="text-slate-500 font-mono">{progress}%</span>
        </div>
      )}

      {showData && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className={`${glassCard} p-6 rounded-3xl border-l-4 border-red-500`}>
                <h4 className="text-red-400 text-xs font-bold uppercase flex items-center gap-2"><AlertTriangle className="w-4 h-4"/> Riesgo Operativo</h4>
                <p className="text-slate-300 text-sm mt-3"><strong>"Juan M."</strong> excede límite de fatiga. Cerró noche y abre mañana. Riesgo de accidente/error: <strong>ALTO</strong>.</p>
             </div>
             <div className={`${glassCard} p-6 rounded-3xl border-l-4 border-cyan-500`}>
                <h4 className="text-cyan-400 text-xs font-bold uppercase flex items-center gap-2"><TrendingUp className="w-4 h-4"/> Margen Neto</h4>
                <p className="text-slate-300 text-sm mt-3">Insumos subieron 14%. Precios actuales generan pérdida del 4% diario. <strong>Sugerencia:</strong> Ajuste inmediato +10%.</p>
             </div>
             <div className={`${glassCard} p-6 rounded-3xl border-l-4 border-emerald-500`}>
                <h4 className="text-emerald-400 text-xs font-bold uppercase flex items-center gap-2"><Leaf className="w-4 h-4"/> Oportunidad</h4>
                <p className="text-slate-300 text-sm mt-3">Previsión de Ola de Calor. Potenciar stock de bebidas frías. Ventas estimadas: <strong>+25%</strong>.</p>
             </div>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-3xl text-center">
             <p className="text-amber-200 font-medium italic">"Análisis completado. Los cambios han sido enviados a su asistente de WhatsApp."</p>
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
    { id: 1, name: "Café Espresso", price: 2800 },
    { id: 2, name: "Medialuna", price: 950 },
    { id: 3, name: "Tostado J&Q", price: 4800 },
    { id: 4, name: "Jugo Natural", price: 3200 },
    { id: 5, name: "Agua Mineral", price: 1800 },
  ];
  const addToCart = (p: any) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === p.id);
      return ex ? prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { ...p, qty: 1 }];
    });
  };
  const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

  return (
    <div className="grid md:grid-cols-3 gap-6 h-full">
      <div className={`${glassCard} col-span-2 p-6 rounded-3xl`}>
        <h2 className="text-xl font-bold text-white mb-6">Menú de Ventas</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p.id} onClick={() => addToCart(p)} className="bg-slate-950 p-4 rounded-2xl border border-white/5 hover:border-emerald-500/40 cursor-pointer transition-all">
              <p className="text-white font-bold text-sm">{p.name}</p>
              <p className="text-emerald-400 font-mono text-xs">$ {p.price}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={`${glassCard} p-6 rounded-3xl flex flex-col justify-between border-t-4 border-emerald-500`}>
        <div className="space-y-2">
           <h3 className="text-white font-bold mb-4">Ticket</h3>
           {cart.map(i => <div key={i.id} className="flex justify-between text-xs text-slate-300 bg-white/5 p-2 rounded"><span>{i.qty}x {i.name}</span><span>$ {i.qty * i.price}</span></div>)}
        </div>
        <div className="pt-4 border-t border-white/10">
          <div className="flex justify-between text-xl font-black mb-4"><span>TOTAL</span><span>$ {total}</span></div>
          <button onClick={() => setCart([])} className="w-full bg-emerald-500 text-slate-900 font-black py-4 rounded-xl">FACTURAR</button>
        </div>
      </div>
    </div>
  );
};

// --- MÓDULO: VISION IA (ARREGLADO Y MEJORADO) ---
const VisionView = () => {
  const [cams, setCams] = useState<{x: number, y: number, rotation: number}[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  const addCam = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCams([...cams, { x: e.clientX - rect.left, y: e.clientY - rect.top, rotation: 0 }]);
  };

  const rotateCam = (e: React.MouseEvent, index: number) => {
    e.stopPropagation(); e.preventDefault();
    setCams(prev => prev.map((c, i) => i === index ? { ...c, rotation: c.rotation + 45 } : c));
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2"><Eye className="text-red-500" /> Planificador de Cobertura IP</h2>
      <p className="text-xs text-slate-500">Click izquierdo para ubicar. Click derecho sobre la cámara para rotar ángulo.</p>
      <div 
        ref={containerRef}
        className="flex-1 bg-slate-900 border-2 border-dashed border-slate-700 rounded-[40px] relative overflow-hidden cursor-crosshair shadow-inner"
        onClick={addCam}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-slate-800 flex items-center justify-center font-bold text-slate-800 uppercase tracking-widest">Salón de Ventas</div>
        
        {cams.map((c, i) => (
          <div key={i} className="absolute" style={{ left: c.x, top: c.y, transform: 'translate(-50%, -50%)' }}>
            <motion.div 
              className="absolute w-40 h-40 bg-red-500/20" 
              style={{ clipPath: 'polygon(0 50%, 100% 0, 100% 100%)', transform: `rotate(${c.rotation}deg)`, transformOrigin: 'left center' }}
            />
            <div 
              onContextMenu={(e) => rotateCam(e, i)}
              className="bg-red-500 p-2 rounded-full relative z-10 shadow-[0_0_15px_rgba(239,68,68,0.5)] border-2 border-white/20"
            >
              <Camera className="w-4 h-4 text-white" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- MÓDULO: COLEGIO (INTERESANTE / GESTIÓN DE TIEMPO) ---
const SchoolView = () => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <h2 className="text-2xl font-bold text-white flex items-center gap-2"><GraduationCap className="text-indigo-400" /> Suite Directiva Escolar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         <div className={`${glassCard} p-6 rounded-3xl border-l-4 border-red-500`}>
            <h4 className="text-white font-bold flex items-center gap-2"><TrendingDown className="w-4 h-4 text-red-500" /> Predictor de Mora</h4>
            <p className="text-slate-400 text-xs mt-2">La IA analizó 300 legajos. Detectó 8 familias con <strong>"Patrón de Deserción Financiera"</strong>. Se enviaron avisos preventivos. Ahorro estimado: $450.000/mes.</p>
         </div>
         <div className={`${glassCard} p-6 rounded-3xl border-l-4 border-indigo-500`}>
            <h4 className="text-white font-bold flex items-center gap-2"><Users className="w-4 h-4 text-indigo-500" /> Clima Escolar</h4>
            <p className="text-slate-400 text-xs mt-2">Detección de anomalías en asistencia de 4to Año. Alerta de <strong>"Posible Conflicto Grupal"</strong>. Preceptoría notificada automáticamente.</p>
         </div>
      </div>
      <div className={`${glassCard} flex-1 p-6 rounded-[40px] relative overflow-hidden`}>
         <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold">Generador de Grillas Docentes</h3>
            <span className="bg-indigo-500/20 text-indigo-400 text-[10px] px-2 py-1 rounded">IA ACTIVA</span>
         </div>
         <div className="space-y-3">
            {[1,2,3].map(i => (
              <div key={i} className="bg-slate-950/50 p-3 rounded-xl border border-white/5 flex justify-between items-center">
                 <span className="text-slate-300 text-sm">Resolución de choque horario: Prof. García vs Prof. López</span>
                 <CheckCircle2 className="text-emerald-500 w-4 h-4" />
              </div>
            ))}
         </div>
         <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20">RE-OPTIMIZAR HORARIOS (12 seg)</button>
      </div>
    </div>
  );
};

// --- MÓDULO: ALQUILERES (FLUJO CERRADO) ---
const RentalsView = () => {
  const [step, setStep] = useState(0); 
  const [days, setDays] = useState([1,2,10,11,12]);

  return (
    <div className="grid md:grid-cols-2 gap-6 h-full">
      <div className={`${glassCard} p-6 rounded-3xl`}>
         <h3 className="text-rose-400 font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5" /> Calendario Enero</h3>
         <div className="grid grid-cols-7 gap-2">
            {Array.from({length: 28}).map((_, i) => {
               const d = i + 1;
               const block = days.includes(d);
               return <motion.div key={d} animate={block ? { scale: [1, 1.05, 1], backgroundColor: 'rgba(244,63,94,0.2)' } : {}} className={`aspect-square rounded-lg flex items-center justify-center text-[10px] border ${block ? 'border-rose-500 text-rose-400 font-bold' : 'border-slate-800 text-slate-700'}`}>{d}</motion.div>
            })}
         </div>
      </div>
      <div className={`${glassCard} p-6 rounded-3xl flex flex-col border-t-4 border-rose-500`}>
         <div className="flex-1 space-y-4">
            <div className="bg-slate-800 p-3 rounded-2xl rounded-tr-none ml-auto text-xs w-4/5 text-white shadow-lg">Hola! Tienen libre del 20 al 22?</div>
            <div className="bg-slate-900 border border-white/5 p-3 rounded-2xl rounded-tl-none text-xs w-4/5 text-slate-300">
               <Bot className="w-3 h-3 text-rose-400 mb-1" /> Si! Está disponible. El total por 2 noches es $84.000.
               <button onClick={() => setStep(1)} className="mt-3 w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"><CreditCard className="w-4 h-4"/> ENVIAR LINK DE PAGO</button>
            </div>
            {step >= 1 && (
               <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-2xl text-[11px] text-emerald-400 font-bold">
                  ¡RESERVA CONFIRMADA! Pago de $84.000 recibido por Mercado Pago. Días 20, 21 y 22 bloqueados.
                  <button onClick={() => { setStep(2); setDays([...days, 20, 21, 22]); }} className="mt-2 block underline">Actualizar Calendario</button>
               </motion.div>
            )}
         </div>
      </div>
    </div>
  );
};

// --- MÓDULO: FISCAL ---
const FiscalView = () => {
  const [stat, setStat] = useState(0);
  return (
    <div className="h-full flex flex-col items-center justify-center text-center">
       <ShieldCheck className={`w-24 h-24 mb-6 transition-colors duration-1000 ${stat === 2 ? 'text-emerald-400' : 'text-slate-800'}`} />
       <h2 className="text-2xl font-bold text-white mb-2">Homologación Fiscal <span className="text-blue-400">AFIP</span></h2>
       <p className="text-slate-500 text-sm max-w-xs mb-8 italic">Certificación de facturación electrónica con respaldo legal criptográfico.</p>
       {stat === 0 && <button onClick={() => {setStat(1); setTimeout(()=>setStat(2), 2000)}} className="bg-blue-600 text-white px-10 py-5 rounded-[20px] font-black shadow-xl shadow-blue-500/20">VINCULAR CON SERVIDOR FISCAL</button>}
       {stat === 1 && <p className="text-blue-400 font-mono text-sm animate-pulse tracking-widest">SOLICITANDO TOKEN CAEA...</p>}
       {stat === 2 && (
         <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-[30px]">
            <p className="text-emerald-400 font-mono text-sm">HOMOLOGACIÓN EXITOSA</p>
            <p className="text-slate-500 text-[10px] mt-2">TOKEN: PHX-2026-X99-CERTIFIED</p>
         </motion.div>
       )}
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
        <div className="h-full flex flex-col items-center justify-center">
          <h2 className="text-white font-black text-2xl mb-12 tracking-tighter uppercase">Gestión de Salón</h2>
          <div className="grid grid-cols-3 gap-8">
             {[1,2,3,4,5,6].map(i => (
               <motion.div key={i} whileHover={{scale: 1.1}} onClick={() => setView(View.POS)} className="w-24 h-24 rounded-[30px] border-2 border-slate-700 bg-slate-900/50 flex flex-col items-center justify-center text-white font-bold cursor-pointer hover:border-orange-500 shadow-xl transition-colors group">
                  <span className="text-xs text-slate-500 group-hover:text-orange-400">Mesa</span>
                  <span className="text-2xl">{i}</span>
               </motion.div>
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
        <div className="flex flex-col items-center justify-center h-screen text-center px-6 relative overflow-hidden">
           <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
           <img src="/logo-phoenix.png" className="h-20 mb-10 drop-shadow-[0_0_15px_#22d3ee]" />
           <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-6xl md:text-8xl font-black tracking-tighter mb-6">EVOLUCIONAMOS <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">TU NEGOCIO.</span></motion.h1>
           <p className="max-w-xl text-slate-400 text-lg mb-12">Inteligencia Artificial aplicada para ahorrar tiempo y dinero en cualquier rubro.</p>
           <div className="flex gap-4">
              <button onClick={() => setIsDemo(true)} className="bg-cyan-500 text-slate-950 px-10 py-5 rounded-2xl font-black text-lg flex items-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-cyan-500/30"><LayoutDashboard className="w-6 h-6"/> PROBAR DEMO INTERACTIVA</button>
              <a href="https://wa.me/542255605257" className="bg-white/5 border border-white/10 px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-2 hover:bg-white/10 transition-all">WHATSAPP</a>
           </div>
        </div>
      ) : (
        <div className="flex h-screen bg-slate-950">
           <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 hidden md:flex flex-col justify-between">
              <div className="space-y-10">
                 <div className="flex items-center gap-2"><img src="/logo-phoenix.png" className="h-8" /><span className="font-black tracking-widest text-xs">SUITE PRO</span></div>
                 <nav className="space-y-1">
                    {[
                      { id: View.DASHBOARD, name: 'Dashboard Auditor', icon: Zap },
                      { id: View.POS, name: 'Punto de Venta', icon: ShoppingCart },
                      { id: View.TABLES, name: 'Mapa de Mesas', icon: Grid3x3 },
                      { id: View.RENTALS, name: 'Alquileres / Hotel', icon: Building },
                      { id: View.SCHOOL, name: 'Gestión Colegio', icon: GraduationCap },
                      { id: View.VISION, name: 'Cámaras (Vision)', icon: Eye },
                      { id: View.FISCAL, name: 'Módulo Fiscal', icon: ShieldCheck },
                    ].map(item => (
                      <button 
                        key={item.id} onClick={() => setView(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all text-sm font-medium ${view === item.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-500 hover:bg-slate-900 hover:text-white'}`}
                      >
                        <item.icon className="w-4 h-4" /> {item.name}
                      </button>
                    ))}
                 </nav>
              </div>
              <button onClick={() => setIsDemo(false)} className="text-red-400/60 hover:text-red-400 flex items-center gap-2 text-sm font-bold transition-colors"><LogOut className="w-4 h-4" /> SALIR DE DEMO</button>
           </aside>
           <main className="flex-1 p-4 md:p-10 overflow-y-auto bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
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
