import React, { useState, useEffect, useRef, FC } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  LayoutDashboard,
  Store,
  Map as MapIcon,
  Hotel,
  GraduationCap,
  FileBadge,
  Menu,
  X,
  Zap,
  TrendingUp,
  AlertTriangle,
  Utensils,
  DollarSign,
  Trash2,
  CheckCircle,
  Send,
  Calendar,
  ShieldAlert,
  Users,
  Clock,
  RotateCw,
  Bot,
  LogOut,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  Layers,
  Search,
  Cpu,
  Globe,
  BarChart3,
  Server,
  Wifi,
  Camera,
  MessageCircle,
  MapPin
} from 'lucide-react';

// --- STYLES & UTILS ---

const glassCard = "bg-slate-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-[24px]";
const glassBtn = "bg-white/5 hover:bg-white/10 border border-white/10 transition-all active:scale-95";

const TechBackground = () => (
  <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-slate-950" />
    
    {/* Subtle Grid */}
    <div 
      className="absolute inset-0 opacity-[0.03]" 
      style={{ 
        backgroundImage: 'linear-gradient(#22d3ee 1px, transparent 1px), linear-gradient(to right, #22d3ee 1px, transparent 1px)', 
        backgroundSize: '60px 60px',
        transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)',
        transformOrigin: 'top center'
      }} 
    />
    
    {/* Glows */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />
  </div>
);

const Shimmer = () => (
  <motion.div
    className="absolute inset-0 z-0 pointer-events-none"
    style={{ background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.1) 25%, transparent 30%)" }}
    animate={{ x: ["-100%", "200%"] }}
    transition={{ repeat: Infinity, duration: 3, ease: "linear", repeatDelay: 1 }}
  />
);

// --- TYPES ---

type TabId = 'dashboard' | 'pos' | 'tables' | 'hotel' | 'school' | 'afip';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface CartItem extends Product {
  qty: number;
}

interface Table {
  id: number;
  label: string;
  status: 'free' | 'occupied' | 'reserved';
  x: number;
  y: number;
}

// --- MOCK DATA ---

const PRODUCTS: Product[] = [
  { id: 1, name: 'Neural Latte', price: 4500, category: 'Cafetería' },
  { id: 2, name: 'Cyber Croissant', price: 3200, category: 'Bakery' },
  { id: 3, name: 'Quantum Toast', price: 5500, category: 'Brunch' },
  { id: 4, name: 'Data Smoothie', price: 6000, category: 'Bebidas' },
  { id: 5, name: 'Matrix Burger', price: 12000, category: 'Almuerzo' },
  { id: 6, name: 'Glitch Salad', price: 9500, category: 'Almuerzo' },
];

const TABLES_DATA: Table[] = [
  { id: 1, label: 'T1', status: 'free', x: 20, y: 20 },
  { id: 2, label: 'T2', status: 'occupied', x: 50, y: 20 },
  { id: 3, label: 'T3', status: 'free', x: 80, y: 20 },
  { id: 4, label: 'VIP', status: 'reserved', x: 50, y: 60 },
  { id: 5, label: 'T4', status: 'free', x: 20, y: 60 },
  { id: 6, label: 'T5', status: 'free', x: 80, y: 60 },
];

const SERVICES = [
  { id: 'ia-impulso', icon: Bot, name: "Paquete Impulso IA", desc: "Respuestas automáticas humanas, auditoría diaria de precios y automatización de gestión." },
  { id: 'it-pro', icon: Server, name: "Infraestructura IT", desc: "Servidores de alta disponibilidad y soporte preventivo para operativa continua." },
  { id: 'redes-wifi', icon: Wifi, name: "WiFi Alta Densidad", desc: "Diseño e instalación de redes para hoteles y complejos. Gestión de ancho de banda." },
  { id: 'seguridad-ia', icon: Camera, name: "Seguridad Inteligente", desc: "Cámaras con analítica de video y alarmas Grado 2. Monitoreo avanzado." },
  { id: 'workstations', icon: Cpu, name: "Workstations", desc: "Hardware de alto rendimiento para AutoCAD, Render 3D y Gaming extremo." },
];

// --- MODULE COMPONENTS ---

// 1. DASHBOARD / BRAIN
const DashboardModule = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [showData, setShowData] = useState(false);
  const [progress, setProgress] = useState(0);

  const startAnalysis = () => {
    setAnalyzing(true);
    setShowData(false);
    let curr = 0;
    const interval = setInterval(() => {
      curr += 2;
      setProgress(curr);
      if (curr >= 100) {
        clearInterval(interval);
        setAnalyzing(false);
        setShowData(true);
      }
    }, 30); // Faster analysis
  };

  return (
    <div className="h-full flex flex-col items-center justify-center relative">
      {!showData && !analyzing && (
        <div className="text-center space-y-8 animate-in fade-in zoom-in duration-300">
          <div className="p-8 bg-amber-500/10 rounded-full border border-amber-500/20 w-fit mx-auto shadow-[0_0_30px_rgba(245,158,11,0.15)]">
            <Bot className="w-20 h-20 text-amber-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase tech-font">Auditoría Neural</h2>
            <p className="text-slate-400 text-lg max-w-md mx-auto">Inteligencia Artificial aplicada para la optimización de recursos y detección de anomalías.</p>
          </div>
          <button 
            onClick={startAnalysis} 
            className="group relative bg-amber-500 hover:bg-amber-400 text-slate-950 px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-amber-500/20 transition-all active:scale-95 flex items-center gap-3 mx-auto overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="relative flex items-center gap-2"><Zap size={20} className="fill-slate-950" /> INICIAR ESCANEO</span>
          </button>
        </div>
      )}

      {analyzing && (
        <div className="w-full max-w-md space-y-6 text-center">
          <p className="text-amber-400 font-mono text-xl animate-pulse tracking-widest uppercase">Analizando Datos...</p>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden border border-white/5">
            <motion.div 
              className="h-full bg-amber-500 rounded-full shadow-[0_0_20px_#f59e0b]" 
              initial={{ width: 0 }} 
              animate={{ width: `${progress}%` }} 
            />
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-500 uppercase px-1">
             <span>Ventas</span><span>RRHH</span><span>Inventario</span><span>Precios</span>
          </div>
        </div>
      )}

      {showData && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl"
        >
          {/* CARD 1 */}
          <div className={`${glassCard} p-6 border-l-4 border-l-red-500 group hover:bg-slate-800/80 transition-colors`}>
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-red-500/20 rounded-lg text-red-400"><ShieldAlert size={24} /></div>
                <span className="text-[10px] font-bold text-red-500 border border-red-500/30 px-2 py-1 rounded bg-red-500/10">CRÍTICO</span>
             </div>
             <h3 className="text-xl font-bold text-white mb-2 tech-font">FATIGA RRHH</h3>
             <p className="text-slate-400 text-sm leading-relaxed mb-4">
               <strong>Marcos R.</strong> excede horas seguras. Turno noche + mañana consecutivos.
             </p>
             <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mb-2">
               <div className="bg-red-500 w-[92%] h-full"></div>
             </div>
             <p className="text-xs text-red-400 font-mono">RIESGO ERROR: 92%</p>
          </div>

          {/* CARD 2 */}
          <div className={`${glassCard} p-6 border-l-4 border-l-orange-500 group hover:bg-slate-800/80 transition-colors`}>
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400"><Utensils size={24} /></div>
                <span className="text-[10px] font-bold text-orange-500 border border-orange-500/30 px-2 py-1 rounded bg-orange-500/10">MERMA</span>
             </div>
             <h3 className="text-xl font-bold text-white mb-2 tech-font">OPTIMIZACIÓN MENÚ</h3>
             <p className="text-slate-400 text-sm leading-relaxed">
               <strong>Risotto de Hongos</strong> tiene 15% de desperdicio. Se sugiere eliminar del menú.
             </p>
             <button className="mt-4 w-full py-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold hover:bg-orange-500 hover:text-white transition-colors">
               APLICAR DESCUENTO
             </button>
          </div>

          {/* CARD 3 */}
          <div className={`${glassCard} p-6 border-l-4 border-l-cyan-500 group hover:bg-slate-800/80 transition-colors`}>
             <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400"><TrendingUp size={24} /></div>
                <span className="text-[10px] font-bold text-cyan-500 border border-cyan-500/30 px-2 py-1 rounded bg-cyan-500/10">MACRO</span>
             </div>
             <h3 className="text-xl font-bold text-white mb-2 tech-font">AJUSTE PRECIOS</h3>
             <p className="text-slate-400 text-sm leading-relaxed">
               Inflación detectada en proveedores (+12%).
             </p>
             <div className="mt-4 flex items-center gap-3">
                <div className="text-2xl font-black text-cyan-400 tech-font">+10%</div>
                <div className="text-[10px] text-slate-500 uppercase font-bold leading-tight">Sugerido Global</div>
             </div>
          </div>

          <button 
            onClick={() => setShowData(false)} 
            className="col-span-1 md:col-span-3 mx-auto mt-4 text-slate-500 hover:text-white flex items-center gap-2 text-xs uppercase tracking-widest font-bold transition-colors"
          >
            <RotateCw size={14} /> Reiniciar Simulación
          </button>
        </motion.div>
      )}
    </div>
  );
};

// 2. POS FUNCTIONAL
const PosModule = ({ preSelectedTable, setTab }: { preSelectedTable?: number | null, setTab: (t: TabId) => void }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [success, setSuccess] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart(prev => prev.filter(item => item.id !== id));
  const total = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const handlePay = () => {
    setSuccess(true);
    setTimeout(() => {
      setCart([]);
      setSuccess(false);
      setTab('tables');
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-6">
      {/* Product Grid */}
      <div className={`${glassCard} flex-1 p-6 overflow-hidden flex flex-col`}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold tech-font text-white flex items-center gap-3">
            <Store className="text-emerald-400" size={20} />
            CATÁLOGO {preSelectedTable && <span className="text-emerald-400">/ MESA {preSelectedTable}</span>}
          </h3>
          <div className="relative hidden md:block">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
             <input type="text" placeholder="Buscar..." className="bg-slate-950/50 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500 transition-colors w-40 focus:w-60" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-2 lg:grid-cols-3 gap-3 pb-20 md:pb-0">
          {PRODUCTS.map(product => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="bg-slate-950/40 border border-white/5 p-4 rounded-xl flex flex-col items-start gap-2 hover:border-emerald-500/50 hover:bg-slate-900 transition-all group text-left active:scale-[0.98]"
            >
              <div className="w-full flex justify-between items-start">
                 <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest bg-slate-900 px-2 py-1 rounded">{product.category}</span>
                 <div className="w-5 h-5 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors">
                    <Layers size={10} className="text-slate-400 group-hover:text-slate-950" />
                 </div>
              </div>
              <div className="font-bold text-white text-sm mt-1">{product.name}</div>
              <div className="text-emerald-400 font-mono font-bold text-base">${product.price.toLocaleString()}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className={`${glassCard} w-full md:w-80 p-0 flex flex-col overflow-hidden border-t-4 border-t-emerald-500`}>
        <div className="p-5 bg-slate-900/50 border-b border-white/5">
          <h3 className="font-bold text-white flex items-center gap-2 uppercase tracking-widest text-xs">
            <DollarSign size={14} className="text-emerald-500" /> Ticket Actual
          </h3>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2 opacity-50">
              <Store size={32} strokeWidth={1} />
              <p className="text-sm">Seleccione productos</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <div className="text-white font-medium text-sm">{item.name}</div>
                  <div className="text-emerald-400/80 text-xs font-mono">${item.price} x {item.qty}</div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-slate-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-5 bg-slate-900/80 border-t border-white/5 backdrop-blur-xl">
          <div className="flex justify-between items-end mb-4">
            <span className="text-slate-400 text-xs font-bold uppercase">Total</span>
            <span className="text-3xl font-black text-white tech-font tracking-tight">${total.toLocaleString()}</span>
          </div>
          
          <button
            onClick={handlePay}
            disabled={cart.length === 0}
            className={`w-full py-3 rounded-xl font-bold text-sm flex justify-center items-center gap-2 transition-all shadow-lg ${
              success 
                ? 'bg-emerald-500 text-slate-900' 
                : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 hover:shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed'
            }`}
          >
            {success ? <><CheckCircle size={18} /> PROCESADO</> : 'FACTURAR'}
          </button>
        </div>
      </div>
    </div>
  );
};

// 3. TABLE MAP
const TableMapModule = ({ onTableSelect }: { onTableSelect: (id: number) => void }) => {
  return (
    <div className={`${glassCard} h-full relative overflow-hidden flex flex-col items-center justify-center group`}>
       {/* Blueprint Grid */}
       <div className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ 
               backgroundImage: 'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(to right, #64748b 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
            }} 
       />
       
       <div className="relative w-full max-w-3xl h-[450px] bg-slate-950/40 rounded-[32px] border-2 border-slate-800 shadow-2xl overflow-hidden backdrop-blur-sm">
          <div className="absolute top-0 left-0 bg-slate-800 px-4 py-1.5 rounded-br-2xl text-[10px] font-bold text-slate-400 uppercase tracking-widest z-10">Plano Salón</div>
          
          {TABLES_DATA.map(table => (
            <button
              key={table.id}
              onClick={() => onTableSelect(table.id)}
              style={{ left: `${table.x}%`, top: `${table.y}%` }}
              className={`absolute w-20 h-20 -ml-10 -mt-10 rounded-2xl flex flex-col items-center justify-center border-2 shadow-xl backdrop-blur-md transition-all z-20 hover:scale-110 active:scale-95
                ${table.status === 'free' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 hover:bg-emerald-500/20' : ''}
                ${table.status === 'occupied' ? 'bg-rose-500/10 border-rose-500 text-rose-400 hover:bg-rose-500/20' : ''}
                ${table.status === 'reserved' ? 'bg-amber-500/10 border-amber-500 text-amber-400 hover:bg-amber-500/20' : ''}
              `}
            >
              <span className="text-2xl font-black tech-font">{table.label}</span>
              <span className="text-[9px] font-bold uppercase tracking-wider mt-1 px-1.5 py-0.5 rounded bg-slate-950/50">
                {table.status === 'free' ? 'Libre' : table.status === 'occupied' ? 'Ocupado' : 'Rsv'}
              </span>
            </button>
          ))}

          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-3 bg-slate-700/50 rounded-t-full border-t border-white/10 flex items-center justify-center">
             <span className="text-[8px] text-slate-400 uppercase tracking-[0.3em]">Entrada</span>
          </div>
       </div>

       <div className="absolute bottom-6 flex gap-4">
          {['Libre', 'Ocupado', 'Reservado'].map((status, i) => (
             <div key={status} className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-full border border-white/5">
                <div className={`w-2 h-2 rounded-full ${i===0?'bg-emerald-500':i===1?'bg-rose-500':'bg-amber-500'}`} />
                <span className="text-[10px] font-bold text-slate-400 uppercase">{status}</span>
             </div>
          ))}
       </div>
    </div>
  );
};

// 4. HOTEL / RENTALS
const HotelModule = () => {
  const [messages, setMessages] = useState<{sender: 'bot'|'user', text: string, type?: 'link'}[]>([
    { sender: 'bot', text: '¡Hola! Soy Phoenix Concierge. ¿En qué fecha buscas reservar?' }
  ]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (step === 0) {
        setMessages(prev => [...prev, { sender: 'bot', text: `Verificando disponibilidad para "${userMsg}"...` }]);
        setTimeout(() => {
          setMessages(prev => [...prev, { sender: 'bot', text: '¡Buenas noticias! Tenemos disponibilidad en la Suite Ejecutiva.' }]);
          setStep(1);
        }, 1000);
      } else if (step === 1) {
        setMessages(prev => [...prev, { sender: 'bot', text: 'Aquí tienes el link de pago seguro:', type: 'link' }]);
        setStep(2);
      }
    }, 800);
  };

  const simulatePayment = () => {
    setStep(3);
    setMessages(prev => [...prev, { sender: 'bot', text: '¡Pago recibido! Reserva #PHX-9988 confirmada.' }]);
  };

  return (
    <div className="flex flex-col md:flex-row h-full gap-6">
      {/* Calendar Side */}
      <div className={`${glassCard} w-full md:w-80 p-6 flex flex-col border-t-4 border-t-blue-500`}>
        <h3 className="text-lg font-bold tech-font mb-4 flex items-center gap-2 text-white">
          <Calendar size={18} className="text-blue-400" /> DISPONIBILIDAD
        </h3>
        <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[10px] font-bold text-slate-500 uppercase">
          <span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 30 }).map((_, i) => (
             <div 
               key={i} 
               className={`aspect-square rounded flex items-center justify-center text-xs font-bold transition-all duration-300
                 ${step === 3 && (i >= 15 && i <= 18) 
                    ? 'bg-blue-500 text-white shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                    : 'bg-slate-800/50 text-slate-500'
                 }`}
             >
               {i + 1}
             </div>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-white/5">
           <div className="flex items-center gap-2 text-[10px] text-slate-400">
              <div className="w-2 h-2 bg-blue-500 rounded-sm"></div>
              <span>Días Reservados</span>
           </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className={`${glassCard} flex-1 flex flex-col overflow-hidden relative`}>
        <div className="p-4 bg-slate-900/80 flex items-center gap-3 border-b border-white/5 backdrop-blur-xl z-10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-500 to-cyan-400 p-[1px]">
             <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                <Bot size={20} className="text-cyan-400" />
             </div>
          </div>
          <div>
            <div className="font-bold text-white text-sm">Phoenix Concierge</div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono uppercase tracking-wider">
               <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> Online
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
               <div className={`max-w-[85%] p-3 px-4 rounded-2xl text-sm leading-relaxed shadow-lg ${
                 msg.sender === 'user' 
                   ? 'bg-blue-600 text-white rounded-br-none' 
                   : 'bg-slate-800 border border-white/5 text-slate-200 rounded-bl-none'
               }`}>
                 {msg.text}
                 {msg.type === 'link' && (
                   <button 
                     onClick={simulatePayment}
                     className="mt-3 w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 py-2 px-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all text-xs"
                   >
                     <CreditCard size={14} /> Pagar $84.000
                   </button>
                 )}
               </div>
            </motion.div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none flex gap-1">
                 <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                 <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75"></span>
                 <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150"></span>
               </div>
