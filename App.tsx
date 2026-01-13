import React, { FC, ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Server, BrainCircuit, ArrowRight, MapPin, Camera, 
  Cpu, Wifi, MessageCircle, TrendingUp, Clock, Bot,
  LayoutDashboard, ShoppingCart, Settings, LogOut, Search, 
  AlertTriangle, FileText, Zap, ChevronRight, BarChart3, Terminal, Menu, X,
  Users, Calendar, TrendingDown, Leaf, Layers, Plus, Trash2, CheckCircle2,
  Grid3x3, Building, Stethoscope, Scale, ShieldCheck, User, FileWarning
} from 'lucide-react';

// ==========================================
// 0. ESTILOS GLOBALES Y UTILIDADES
// ==========================================

const glassCard = "bg-slate-900/60 backdrop-blur-md border border-white/5 shadow-xl";

// Variantes de Animación
const fadeInScale = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
};

const useTypewriter = (text: string, speed: number = 20, start: boolean = false) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    if (!start) {
        setDisplayText('');
        return;
    }
    let i = 0;
    setDisplayText('');
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

enum View { DASHBOARD, POS, TABLES, RENTALS, DENTIST, LEGAL, CONFIG }

const themes = {
  [View.DASHBOARD]: { color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10' },
  [View.POS]: { color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
  [View.TABLES]: { color: 'text-orange-400', border: 'border-orange-500/30', bg: 'bg-orange-500/10' },
  [View.RENTALS]: { color: 'text-rose-400', border: 'border-rose-500/30', bg: 'bg-rose-500/10' },
  [View.DENTIST]: { color: 'text-blue-400', border: 'border-blue-500/30', bg: 'bg-blue-500/10' },
  [View.LEGAL]: { color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-500/10' },
  [View.CONFIG]: { color: 'text-violet-400', border: 'border-violet-500/30', bg: 'bg-violet-500/10' },
};

const Sidebar: FC<{ currentView: View; onNavigate: (v: View) => void; onExit: () => void; isOpen: boolean; onClose: () => void }> = ({ currentView, onNavigate, onExit, isOpen, onClose }) => {
  const t = themes[currentView] || themes[View.DASHBOARD];
  
  const menuItems = [
    { id: View.DASHBOARD, label: 'Dashboard General', icon: LayoutDashboard },
    { id: View.POS, label: 'POS Gastronomía', icon: ShoppingCart },
    { id: View.TABLES, label: 'Mapa de Mesas', icon: Grid3x3 },
    { id: View.RENTALS, label: 'Alquileres / Hotel', icon: Building },
    { id: View.DENTIST, label: 'Salud (Dentista)', icon: Stethoscope },
    { id: View.LEGAL, label: 'Legales (Abogados)', icon: Scale },
  ];

  const sidebarClasses = `
    fixed inset-y-0 left-0 z-50 w-64 bg-slate-950 border-r border-slate-800 p-4 flex flex-col justify-between transition-transform duration-300
    ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
    md:translate-x-0 overflow-y-auto
  `;

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/80 z-40 md:hidden backdrop-blur-sm" onClick={onClose} />}

      <aside className={sidebarClasses}>
        <div>
          <div className="flex items-center justify-between mb-8 px-2">
            <div className="flex items-center gap-2">
              <img src="/logo-phoenix.png" alt="Logo" className="h-8 w-auto" />
              <span className="font-bold text-white tracking-tight text-sm">PHOENIX <span className={`transition-colors duration-500 ${t.color}`}>SUITE</span></span>
            </div>
            <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { onNavigate(item.id); onClose(); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm ${
                  currentView === item.id 
                  ? `${t.bg} ${t.color} border ${t.border}` 
                  : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        <button onClick={onExit} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-950/30 rounded-xl transition-all border border-transparent hover:border-red-900/50 mt-4 text-sm">
          <LogOut className="w-4 h-4" />
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
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Tablero de <span className={t.color}>Control</span></h2>
        <span className="text-slate-500 text-sm font-mono">Estado: Online</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${glassCard} p-6 rounded-2xl border-l-4 border-cyan-500`}>
           <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">Ventas Totales</h3>
           <div className="text-3xl font-bold text-white">$ 1.2M</div>
           <div className="text-cyan-400 text-xs mt-2 font-bold">+15% vs mes anterior</div>
        </div>
        <div className={`${glassCard} p-6 rounded-2xl border-l-4 border-emerald-500`}>
           <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">Transacciones</h3>
           <div className="text-3xl font-bold text-white">450</div>
           <div className="text-emerald-400 text-xs mt-2 font-bold">98% Satisfacción</div>
        </div>
        <div className={`${glassCard} p-6 rounded-2xl border-l-4 border-amber-500`}>
           <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">Auditoría IA</h3>
           <div className="text-3xl font-bold text-white">3</div>
           <div className="text-amber-400 text-xs mt-2 font-bold">Alertas Activas</div>
        </div>
      </div>
      
      <div className={`${glassCard} p-8 rounded-2xl text-center`}>
         <Bot className="w-12 h-12 text-slate-600 mx-auto mb-4" />
         <h3 className="text-white text-lg font-bold">Selecciona un Módulo del Menú</h3>
         <p className="text-slate-400 text-sm mt-2">Explora las soluciones específicas para cada industria.</p>
      </div>
    </motion.div>
  );
};

// 1. POS FUNCTIONAL (Gastronomía)
interface CartItem { id: number; name: string; price: number; quantity: number; }
const POSView = () => {
  const t = themes[View.POS];
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const products = [
    { id: 1, name: "Café Espresso", price: 2800 },
    { id: 2, name: "Medialuna", price: 900 },
    { id: 3, name: "Tostado J&Q", price: 4500 },
    { id: 4, name: "Jugo Naranja", price: 3200 },
    { id: 5, name: "Licuado Fruta", price: 3800 },
    { id: 6, name: "Agua Mineral", price: 2000 },
  ];
  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      return existing ? prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...prev, { ...product, quantity: 1 }];
    });
  };
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => { setCart([]); setIsProcessing(false); }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col md:grid md:grid-cols-3 gap-6 h-auto md:h-[85vh]">
      <div className={`col-span-2 ${glassCard} rounded-2xl p-4 md:p-6 flex flex-col order-2 md:order-1`}>
         <h2 className="text-xl font-bold text-white mb-6">Punto de Venta <span className={t.color}>Rápido</span></h2>
         <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar">
            {products.map(product => (
              <motion.div key={product.id} whileTap={{ scale: 0.95 }} onClick={() => addToCart(product)} className={`bg-slate-950/80 p-4 rounded-xl border border-white/5 hover:${t.border} cursor-pointer transition-all group`}>
                <div className="h-12 bg-slate-900 rounded-lg mb-2 flex items-center justify-center group-hover:bg-emerald-500/10"><Camera className="text-slate-600 group-hover:text-emerald-400 w-5 h-5" /></div>
                <p className="text-white font-medium text-sm truncate">{product.name}</p>
                <p className={`${t.color} font-bold text-sm`}>$ {product.price}</p>
              </motion.div>
            ))}
         </div>
      </div>
      <div className={`col-span-1 ${glassCard} rounded-2xl p-4 md:p-6 flex flex-col border-t-4 ${t.border.replace('/30','')} order-1 md:order-2`}>
         <div className="flex-1 overflow-y-auto space-y-3 custom-scrollbar">
           {cart.length === 0 ? <div className="text-center text-slate-600 mt-10 text-sm">Carrito vacío.</div> : cart.map(item => (
             <div key={item.id} className="flex justify-between text-slate-300 text-sm p-2 bg-slate-900/50 rounded-lg"><span>{item.quantity}x {item.name}</span><span>$ {item.price * item.quantity}</span></div>
           ))}
         </div>
         <div className="mt-4 pt-4 border-t border-white/10">
           <div className="flex justify-between items-end mb-4"><span className="text-slate-400">Total</span><span className="text-2xl font-bold text-white">$ {total.toLocaleString()}</span></div>
           <motion.button onClick={handleCheckout} disabled={cart.length === 0 || isProcessing} whileTap={{ scale: 0.98 }} className={`w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2`}>
             {isProcessing ? <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> Cobrar</>}
           </motion.button>
         </div>
      </div>
    </motion.div>
  );
};

// 2. MAPA DE MESAS (Nuevo)
const TablesView = () => {
  const [tables, setTables] = useState(Array.from({ length: 9 }).map((_, i) => ({ id: i + 1, status: i % 3 === 0 ? 'occupied' : 'free' })));
  const toggleTable = (id: number) => {
    setTables(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'free' ? 'occupied' : 'free' } : t));
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Mapa de <span className="text-orange-400">Mesas</span></h2>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-700 border border-slate-500"></div> Libre</div>
          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-orange-500/20 border border-orange-500"></div> Ocupada</div>
        </div>
      </div>
      <div className={`${glassCard} p-8 rounded-2xl flex-1 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto relative z-10">
          {tables.map(table => (
            <motion.div
              key={table.id}
              onClick={() => toggleTable(table.id)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`aspect-square rounded-full flex items-center justify-center cursor-pointer border-2 transition-all shadow-lg ${
                table.status === 'free' 
                ? 'bg-slate-800 border-slate-600 text-slate-400 hover:border-white' 
                : 'bg-orange-500/20 border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
              }`}
            >
              <span className="font-bold text-lg">{table.id}</span>
            </motion.div>
          ))}
        </div>
        <p className="text-center text-slate-500 mt-10 text-sm">Click en una mesa para cambiar su estado.</p>
      </div>
    </div>
  );
};

// 3. ALQUILERES + CHATBOT (Nuevo)
const RentalsView = () => {
  const [messages, setMessages] = useState<{role: 'user'|'ai', text: string}[]>([
    { role: 'user', text: "Hola, tenés disponibilidad para 4 personas del 10 al 15 de enero?" }
  ]);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: "Hola! 👋 Revisé el calendario. Lamentablemente del 10 al 15 está todo ocupado. \n\nTengo disponibilidad a partir del 17 de enero. ¿Te sirve esa fecha?" 
      }]);
      setIsTyping(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[80vh]">
      <div className={`${glassCard} p-6 rounded-2xl flex flex-col`}>
         <h3 className="text-rose-400 font-bold mb-4 flex items-center gap-2"><Calendar className="w-5 h-5" /> Calendario Enero</h3>
         <div className="grid grid-cols-7 gap-2 text-center text-sm text-slate-400 mb-2">
            <div>D</div><div>L</div><div>M</div><div>M</div><div>J</div><div>V</div><div>S</div>
         </div>
         <div className="grid grid-cols-7 gap-2 flex-1">
            {Array.from({length: 31}).map((_, i) => {
               const day = i + 1;
               const isOccupied = (day >= 5 && day <= 15);
               return (
                 <div key={day} className={`aspect-square rounded-lg flex items-center justify-center text-sm border ${
                    isOccupied ? 'bg-rose-500/20 border-rose-500 text-rose-300' : 'bg-slate-900 border-slate-800 text-slate-500'
                 }`}>
                   {day}
                 </div>
               )
            })}
         </div>
      </div>
      
      <div className={`${glassCard} p-6 rounded-2xl flex flex-col relative overflow-hidden border-t-4 border-rose-500`}>
         <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
            <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center"><Bot className="w-6 h-6 text-rose-400" /></div>
            <div>
               <h4 className="text-white font-bold">Auto-Respuesta IA</h4>
               <p className="text-xs text-rose-400">Simulación WhatsApp Business</p>
            </div>
         </div>
         <div className="flex-1 space-y-4">
            {messages.map((m, i) => (
              <motion.div initial={{ opacity: 0, x: m.role==='ai'?-20:20 }} animate={{ opacity: 1, x: 0 }} key={i} className={`p-3 rounded-xl max-w-[80%] text-sm ${
                m.role === 'ai' ? 'bg-slate-800 text-slate-200 rounded-tl-none' : 'bg-rose-500 text-white ml-auto rounded-tr-none'
              }`}>
                {m.text}
              </motion.div>
            ))}
            {isTyping && <div className="text-xs text-slate-500 animate-pulse">Escribiendo...</div>}
         </div>
      </div>
    </div>
  );
};

// 4. DENTISTA (Cross-Check AI)
const DentistView = () => {
  const [checking, setChecking] = useState(false);
  
  return (
    <div className="h-full flex flex-col">
       <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Clínica <span className="text-blue-400">Dental</span></h2>
        <div className="bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full text-xs text-blue-300 flex items-center gap-2">
           <ShieldCheck className="w-4 h-4" /> IA Cruzada Activa
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Ficha Paciente */}
         <div className={`${glassCard} p-6 rounded-2xl`}>
            <div className="flex gap-4 items-center mb-6">
               <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center"><User className="w-8 h-8 text-slate-400" /></div>
               <div>
                  <h3 className="text-xl font-bold text-white">Juan Pérez</h3>
                  <p className="text-sm text-slate-400">ID: #8821 | Historial: Alergia Penicilina</p>
               </div>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
               <label className="text-xs text-slate-500 uppercase font-bold">Tratamiento Actual</label>
               <p className="text-white">Endodoncia Molar 38</p>
               <label className="text-xs text-slate-500 uppercase font-bold mt-4 block">Receta Propuesta</label>
               <div className="flex justify-between items-center">
                  <span className="text-white font-mono">Amoxicilina 500mg</span>
                  <button 
                    onClick={() => setChecking(prev => !prev)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Validar
                  </button>
               </div>
            </div>
         </div>

         {/* Panel Cross-Check */}
         <div className={`${glassCard} p-6 rounded-2xl border-l-4 border-blue-500 relative overflow-hidden`}>
            <h3 className="text-blue-400 font-bold mb-4 flex items-center gap-2"><BrainCircuit className="w-5 h-5" /> Verificación Cruzada</h3>
            
            {!checking ? (
               <div className="text-center text-slate-500 mt-10">Esperando validación...</div>
            ) : (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  <div className="flex justify-between items-center text-sm p-3 bg-slate-900 rounded-lg">
                     <span className="text-slate-400">Modelo 1 (Gemini Medical)</span>
                     <span className="text-red-400 font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> RIESGO ALTO</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 bg-slate-900 rounded-lg">
                     <span className="text-slate-400">Modelo 2 (BioBERT)</span>
                     <span className="text-red-400 font-bold flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> CONTRAINDICADO</span>
                  </div>
                  <div className="bg-red-500/10 border border-red-500 p-4 rounded-xl mt-4">
                     <p className="text-red-300 font-bold text-sm">¡ALERTA DE SEGURIDAD!</p>
                     <p className="text-white text-xs mt-1">El paciente es alérgico a la Penicilina (Amoxicilina). Ambas IAs bloquearon la receta.</p>
                  </div>
               </motion.div>
            )}
         </div>
      </div>
    </div>
  );
};

// 5. LEGAL (Abogados)
const LegalView = () => {
  return (
    <div className="h-full flex flex-col">
       <h2 className="text-2xl font-bold text-white mb-6">Estudio <span className="text-indigo-400">Legal</span></h2>
       <div className={`${glassCard} p-8 rounded-2xl flex-1`}>
          <div className="flex items-start gap-6">
             <div className="flex-1 bg-slate-950 p-6 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed">
                <p className="mb-4 text-indigo-400 font-bold">// CONTRATO DE ALQUILER COMERCIAL (Borrador)</p>
                <p>CLÁUSULA 4: ACTUALIZACIÓN</p>
                <p>El canon locativo se actualizará mensualmente basado en el valor del dólar blue venta...</p>
                <div className="my-2 h-px bg-slate-800"></div>
                <p className="text-white bg-red-500/20 p-1 border border-red-500 rounded">CLÁUSULA 5: RENOVACIÓN AUTOMÁTICA</p>
                <p className="bg-red-500/10">El contrato se renovará automáticamente por 5 años si el inquilino no avisa con 180 días de antelación.</p>
             </div>
             
             <div className="w-1/3 space-y-4">
                <div className="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-xl">
                   <h4 className="text-indigo-300 font-bold text-sm mb-2 flex items-center gap-2"><FileWarning className="w-4 h-4" /> Análisis de Riesgo</h4>
                   <p className="text-xs text-slate-300 mb-2">Se detectó una cláusula abusiva según el Código Civil y Comercial.</p>
                   <div className="flex gap-2">
                      <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-green-400">Verificado: LegalGPT</span>
                      <span className="text-[10px] bg-slate-800 px-2 py-1 rounded text-green-400">Verificado: Claude-Law</span>
                   </div>
                </div>
                <button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-bold text-sm transition-colors">Generar Redacción Alternativa</button>
             </div>
          </div>
       </div>
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
      case View.TABLES: return <TablesView />;
      case View.RENTALS: return <RentalsView />;
      case View.DENTIST: return <DentistView />;
      case View.LEGAL: return <LegalView />;
      default: return null;
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-slate-950 relative overflow-hidden">
      {/* Botón Menú Móvil */}
      <div className="fixed top-4 left-4 z-[60] md:hidden">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-slate-900 border border-slate-700 rounded-lg text-white shadow-lg backdrop-blur-md"
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
      
      <main className="flex-1 md:ml-64 p-4 md:p-8 relative z-10 pt-16 md:pt-8 overflow-y-auto h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
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
// 2. LANDING PAGE
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
      ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-105' 
      : 'bg-white/5 text-white border border-white/10 hover:bg-white/10'
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
            <button onClick={onEnterDemo} className="flex items-center gap-2 bg-cyan-500/10 text-cyan-400 px-3 py-2 rounded-lg border border-cyan-500/30 text-xs font-bold uppercase tracking-widest hover:bg-cyan-500/20 transition-colors">
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
              className={`${glassCard} p-6 rounded-2xl border-white/5 hover:border-cyan-500/30 transition-colors`}
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
