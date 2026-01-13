import React, { FC, ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Server, BrainCircuit, ArrowRight, MapPin, Camera, 
  Cpu, Wifi, MessageCircle, TrendingUp, Clock, Bot,
  LayoutDashboard, ShoppingCart, Settings, LogOut, Search, 
  AlertTriangle, FileText, Zap, BarChart3, Terminal, Menu, X,
  Users, Calendar, TrendingDown, Leaf, Layers, Plus, Trash2, 
  CheckCircle2, Grid3x3, Building, GraduationCap, ShieldCheck, Eye
} from 'lucide-react';

// ==========================================
// 0. ESTILOS Y UTILIDADES
// ==========================================

const glassCard = "bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-2xl";

// Variantes de Animación
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// ==========================================
// 1. COMPONENTES DE LA SUITE (DEMO)
// ==========================================

enum View { DASHBOARD, POS, TABLES, RENTALS, SCHOOL, VISION, FISCAL }

const themes = {
  [View.DASHBOARD]: { color: 'text-cyan-400', border: 'border-cyan-500', bg: 'bg-cyan-500/10' },
  [View.POS]: { color: 'text-emerald-400', border: 'border-emerald-500', bg: 'bg-emerald-500/10' },
  [View.TABLES]: { color: 'text-orange-400', border: 'border-orange-500', bg: 'bg-orange-500/10' },
  [View.RENTALS]: { color: 'text-rose-400', border: 'border-rose-500', bg: 'bg-rose-500/10' },
  [View.SCHOOL]: { color: 'text-indigo-400', border: 'border-indigo-500', bg: 'bg-indigo-500/10' },
  [View.VISION]: { color: 'text-red-400', border: 'border-red-500', bg: 'bg-red-500/10' },
  [View.FISCAL]: { color: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-500/10' },
};

// --- SUB-MÓDULO: VISION (CÁMARAS PRO) ---
const VisionView = () => {
  const [cameras, setCameras] = useState<{x: number, y: number, angle: number}[]>([]);
  const addCamera = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCameras([...cameras, { x: e.clientX - rect.left, y: e.clientY - rect.top, angle: 45 }]);
  };

  return (
    <div className="h-full flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Neural <span className="text-red-500">Vision Planner</span></h2>
        <p className="text-xs text-slate-400">Click en el plano para ubicar cámaras IP y ver rango de cobertura.</p>
      </div>
      <div 
        className="relative flex-1 bg-slate-800 rounded-3xl border-2 border-dashed border-slate-700 overflow-hidden cursor-crosshair"
        onClick={addCamera}
      >
        {/* Simulación de Plano */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(to right, #444 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-10 left-10 w-40 h-60 border-2 border-slate-600 rounded flex items-center justify-center text-slate-600 font-bold uppercase tracking-widest text-xs">Cocina</div>
        <div className="absolute top-10 right-10 w-60 h-40 border-2 border-slate-600 rounded flex items-center justify-center text-slate-600 font-bold uppercase tracking-widest text-xs">Salón Principal</div>

        {cameras.map((cam, i) => (
          <motion.div 
            key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute" style={{ left: cam.x, top: cam.y }}
          >
            {/* Cono de Visión */}
            <div 
              className="absolute w-40 h-40 bg-red-500/20" 
              style={{ 
                clipPath: 'polygon(0 0, 100% 40%, 100% 60%)', 
                transform: `translate(-10px, -50%) rotate(${cam.angle}deg)`,
                transformOrigin: 'left center'
              }}
            />
            <div className="relative z-10 p-2 bg-red-500 rounded-full shadow-lg shadow-red-500/50">
               <Camera className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- SUB-MÓDULO: ALQUILERES (FLUJO CERRADO) ---
const RentalsView = () => {
  const [step, setStep] = useState(0); // 0: Inicial, 1: Pago Enviado, 2: Pagado
  const [blockedDays, setBlockedDays] = useState([5, 6, 7]);

  const handlePayment = () => {
    setStep(1);
    setTimeout(() => {
        setStep(2);
        setBlockedDays([...blockedDays, 15, 16, 17]);
    }, 3000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
      <div className={`${glassCard} p-6 rounded-3xl`}>
         <h3 className="text-rose-400 font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5" /> Gestión de Reservas</h3>
         <div className="grid grid-cols-7 gap-2">
            {Array.from({length: 31}).map((_, i) => {
               const day = i + 1;
               const isBlocked = blockedDays.includes(day);
               return (
                 <motion.div 
                    key={day} 
                    animate={isBlocked ? { backgroundColor: 'rgba(244, 63, 94, 0.2)', borderColor: '#f43f5e' } : {}}
                    className={`aspect-square rounded-lg flex items-center justify-center text-xs border ${isBlocked ? 'text-rose-400' : 'bg-slate-900 border-slate-800 text-slate-600'}`}
                 >
                   {day}
                 </motion.div>
               );
            })}
         </div>
      </div>

      <div className={`${glassCard} p-6 rounded-3xl flex flex-col border-t-4 border-rose-500`}>
         <div className="flex-1 space-y-4 overflow-y-auto pr-2">
            <div className="bg-slate-800 p-3 rounded-xl rounded-tr-none ml-auto text-sm w-4/5 text-white">Hola! Tienen disponible del 15 al 17?</div>
            <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl rounded-tl-none text-sm w-4/5 text-slate-300">
                <Bot className="w-4 h-4 text-rose-400 mb-1" />
                Si! Esas fechas están libres. El total es $45.000. ¿Querés reservar ahora?
            </div>
            {step >= 1 && (
               <div className="bg-slate-900 border border-rose-500/30 p-3 rounded-xl rounded-tl-none text-sm w-4/5 text-slate-300">
                  Perfecto. Te envío el link de pago seguro: <br/>
                  <button onClick={handlePayment} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-lg text-xs font-bold block">Pagar con Mercado Pago</button>
               </div>
            )}
            {step === 2 && (
               <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-emerald-500/20 border border-emerald-500 p-3 rounded-xl text-sm text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 mb-1" />
                  ¡Pago recibido! La reserva del 15 al 17 ha sido tomada. Calendario actualizado.
               </motion.div>
            )}
         </div>
         {step === 0 && <button onClick={() => setStep(1)} className="w-full bg-rose-500 text-white py-3 rounded-xl font-bold mt-4">Simular Cliente Acepta</button>}
      </div>
    </div>
  );
};

// --- SUB-MÓDULO: COLEGIO (Ahorro de Tiempo) ---
const SchoolView = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Dirección <span className="text-indigo-400">Escolar Inteligente</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className={`${glassCard} p-4 rounded-2xl`}>
            <div className="flex justify-between items-start">
               <Users className="text-indigo-400 w-8 h-8" />
               <span className="text-red-400 text-[10px] font-bold">12% MORA</span>
            </div>
            <h4 className="text-white font-bold mt-2">Cobranzas</h4>
            <p className="text-slate-400 text-xs mt-1 italic">IA envió recordatorios automáticos a 45 padres hoy.</p>
         </div>
         <div className={`${glassCard} p-4 rounded-2xl`}>
            <div className="flex justify-between items-start">
               <Clock className="text-indigo-400 w-8 h-8" />
               <span className="text-emerald-400 text-[10px] font-bold">ÓPTIMO</span>
            </div>
            <h4 className="text-white font-bold mt-2">Horarios</h4>
            <p className="text-slate-400 text-xs mt-1 italic">Grilla de profesores optimizada. Ahorro: 15hs de gestión mensual.</p>
         </div>
         <div className={`${glassCard} p-4 rounded-2xl`}>
            <div className="flex justify-between items-start">
               <AlertTriangle className="text-indigo-400 w-8 h-8" />
               <span className="text-amber-400 text-[10px] font-bold">ALERTA</span>
            </div>
            <h4 className="text-white font-bold mt-2">Inasistencias</h4>
            <p className="text-slate-400 text-xs mt-1 italic">Detectada anomalía en 3° Año B. Posible conflicto grupal.</p>
         </div>
      </div>
      <div className={`${glassCard} p-6 rounded-3xl`}>
         <h3 className="text-white font-bold mb-4">Optimización de Legajos</h3>
         <div className="space-y-2">
            {[1,2,3].map(i => (
              <div key={i} className="flex justify-between items-center p-3 bg-slate-950/50 border border-white/5 rounded-xl">
                 <span className="text-slate-300 text-sm">Legajo Estudiante #445{i} - Digitalizado por IA</span>
                 <span className="text-[10px] bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded">SIN ERRORES</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

// --- SUB-MÓDULO: FISCAL (Homologación AFIP) ---
const FiscalView = () => {
  const [status, setStatus] = useState<'idle'|'loading'|'success'>('idle');
  const startHomologation = () => {
    setStatus('loading');
    setTimeout(() => setStatus('success'), 3000);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Módulo <span className="text-blue-400">Fiscal Neural</span></h2>
        <p className="text-slate-400">Homologación directa con servidores AFIP y gestión de certificados.</p>
      </div>

      <div className={`${glassCard} p-10 rounded-[40px] w-full max-w-md text-center relative overflow-hidden`}>
        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div key="idle" exit={{ opacity: 0, y: -20 }}>
               <ShieldCheck className="w-20 h-20 text-slate-700 mx-auto mb-6" />
               <button onClick={startHomologation} className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-500/30">Vincular Punto de Venta</button>
            </motion.div>
          )}
          {status === 'loading' && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
               <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />
               <p className="text-blue-400 font-mono text-sm animate-pulse">Solicitando CAEA a servidores fiscales...</p>
            </motion.div>
          )}
          {status === 'success' && (
            <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
               <CheckCircle2 className="w-20 h-20 text-emerald-400 mx-auto mb-6" />
               <h4 className="text-white font-bold text-xl">Homologación Exitosa</h4>
               <p className="text-slate-400 text-sm mt-2">Punto de Venta 0004 habilitado para Factura Electrónica.</p>
               <div className="mt-6 p-3 bg-slate-950 rounded-xl font-mono text-[10px] text-emerald-500 border border-emerald-500/20 text-left">
                  TOKEN: 449x-Z01-PHOENIX-IA <br/> STATUS: ACTIVE_CERT_VALID_2027
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ==========================================
// 2. APLICACIÓN PRINCIPAL
// ==========================================

export default function App() {
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- SUB-MÓDULO: AUDITOR (CONSULTOR ESTRATÉGICO) ---
  const AuditorSection = () => (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <div className={`${glassCard} p-6 rounded-3xl border-l-4 border-amber-500`}>
         <h3 className="text-amber-400 font-bold flex items-center gap-2 mb-4 font-mono text-sm"><Terminal className="w-4 h-4" /> AI_STRATEGY_REPORT_v4</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
                  <span className="text-red-400 text-[10px] font-bold">ALERTA RRHH</span>
                  <p className="text-slate-300 text-xs mt-1">El empleado "Marcos R." tiene turno mañana mañana, pero cierra hoy a las 02:00 AM. <strong>Alto riesgo de error por fatiga.</strong> Se sugiere re-asignar.</p>
               </div>
               <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
                  <span className="text-cyan-400 text-[10px] font-bold">OPTIMIZACIÓN MENÚ</span>
                  <p className="text-slate-300 text-xs mt-1">El producto "Risotto de Hongos" tiene 12% de merma. Eliminar de carta y potenciar "Pastas Caseras" que subió 20% en demanda.</p>
               </div>
            </div>
            <div className="space-y-4">
               <div className="p-4 bg-slate-950 rounded-2xl border border-white/5">
                  <span className="text-emerald-400 text-[10px] font-bold">ESTACIONALIDAD</span>
                  <p className="text-slate-300 text-xs mt-1">Transición a temporada alta detectada. Extender horario de atención los viernes mejora ingresos proyectados en 18%.</p>
               </div>
               <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center h-20">
                  <p className="text-amber-400 font-bold text-center text-xs">Estas mejoras se aplican a cualquier rubro: <br/>Salud, Legal, Educación, Comercio.</p>
               </div>
            </div>
         </div>
      </div>
    </motion.div>
  );

  const renderView = () => {
    switch (currentView) {
      case View.DASHBOARD: return (
        <div className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`${glassCard} p-6 rounded-3xl`}><h4 className="text-slate-500 text-xs font-bold uppercase mb-2">Ingresos</h4><div className="text-3xl font-bold text-white">$ 2.450.000</div><div className="h-1 w-full bg-cyan-500 mt-4 rounded-full" /></div>
              <div className={`${glassCard} p-6 rounded-3xl`}><h4 className="text-slate-500 text-xs font-bold uppercase mb-2">Eficiencia</h4><div className="text-3xl font-bold text-white">94.2%</div><div className="h-1 w-full bg-emerald-500 mt-4 rounded-full" /></div>
              <div className={`${glassCard} p-6 rounded-3xl`}><h4 className="text-slate-500 text-xs font-bold uppercase mb-2">Neural Load</h4><div className="text-3xl font-bold text-white">8ms</div><div className="h-1 w-full bg-amber-500 mt-4 rounded-full" /></div>
           </div>
           <AuditorSection />
        </div>
      );
      case View.POS: return <POSView />;
      case View.TABLES: return (
        <div className="h-full flex flex-col items-center justify-center">
           <h2 className="text-xl font-bold text-white mb-8">Mapa de Mesas (Click para facturar)</h2>
           <div className="grid grid-cols-3 gap-8">
              {[1,2,3,4,5,6,7,8,9].map(i => (
                <motion.div 
                  key={i} whileHover={{ scale: 1.1 }} onClick={() => setCurrentView(View.POS)}
                  className="w-20 h-20 bg-slate-800 rounded-full border-2 border-slate-600 flex items-center justify-center text-white font-bold cursor-pointer hover:border-orange-500"
                >
                  {i}
                </motion.div>
              ))}
           </div>
        </div>
      );
      case View.RENTALS: return <RentalsView />;
      case View.SCHOOL: return <SchoolView />;
      case View.VISION: return <VisionView />;
      case View.FISCAL: return <FiscalView />;
      default: return null;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isDemoMode ? (
        <motion.div key="demo" className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
          {/* Sidebar */}
          <aside className="w-64 bg-slate-950 border-r border-slate-800 p-6 hidden md:flex flex-col justify-between">
            <div className="space-y-8">
               <div className="flex items-center gap-2"><img src="/logo-phoenix.png" className="h-8" /><span className="font-bold">SUITE</span></div>
               <nav className="space-y-2">
                 {[
                   { id: View.DASHBOARD, name: 'Dashboard', icon: LayoutDashboard },
                   { id: View.POS, name: 'Punto de Venta', icon: ShoppingCart },
                   { id: View.TABLES, name: 'Mesas', icon: Grid3x3 },
                   { id: View.RENTALS, name: 'Alquileres', icon: Building },
                   { id: View.SCHOOL, name: 'Colegio', icon: GraduationCap },
                   { id: View.VISION, name: 'Vision IA', icon: Eye },
                   { id: View.FISCAL, name: 'Fis-cal', icon: ShieldCheck },
                 ].map(item => (
                   <button 
                    key={item.id} onClick={() => setCurrentView(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentView === item.id ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-400 hover:bg-slate-900'}`}
                   >
                     <item.icon className="w-4 h-4" /> <span className="text-sm font-medium">{item.name}</span>
                   </button>
                 ))}
               </nav>
            </div>
            <button onClick={() => setIsDemoMode(false)} className="text-red-400 flex items-center gap-2 text-sm"><LogOut className="w-4 h-4" /> Salir</button>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-8 overflow-y-auto">
             {renderView()}
          </main>
        </motion.div>
      ) : (
        <motion.div key="landing" className="bg-slate-950 text-white min-h-screen">
          {/* Hero Simplificado para Landing */}
          <nav className="fixed top-0 w-full h-20 flex items-center justify-between px-10 border-b border-white/5 backdrop-blur-md z-50">
             <div className="flex items-center gap-2"><img src="/logo-phoenix.png" className="h-8" /><span className="font-black uppercase tracking-tighter">Phoenix <span className="text-cyan-400">IA</span></span></div>
             <button onClick={() => setIsDemoMode(true)} className="bg-cyan-500/10 text-cyan-400 px-4 py-2 rounded-lg border border-cyan-500/30 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500/20 transition-all">Live Demo</button>
          </nav>
          
          <div className="flex flex-col items-center justify-center h-screen text-center px-6">
             <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-8xl font-black leading-tight tracking-tighter">
                EVOLUCIONAMOS <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">TU NEGOCIO.</span>
             </motion.h1>
             <p className="max-w-xl text-slate-400 mt-6 text-lg">Impulsamos la rentabilidad mediante Inteligencia Artificial aplicada a cualquier rubro en la costa.</p>
             <div className="mt-10 flex gap-4">
                <button onClick={() => setIsDemoMode(true)} className="bg-cyan-500 text-slate-950 px-8 py-4 rounded-xl font-bold flex items-center gap-2"><LayoutDashboard className="w-5 h-5" /> Probar Demo Interactiva</button>
                <a href="https://wa.me/542255605257" className="bg-white/5 border border-white/10 px-8 py-4 rounded-xl font-bold flex items-center gap-2"><MessageCircle className="w-5 h-5" /> Consultar</a>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
