
import React, { FC, ReactNode, useRef, useState, useEffect } from 'react';
import { motion, useInView, Variants, useScroll, useSpring } from 'framer-motion';
import { 
  Server, BrainCircuit, ArrowRight, MapPin, Camera, 
  Cpu, Wifi, MessageCircle, TrendingUp, Clock, Bot
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.99] } 
  }
};

const serviceListVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const serviceItemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// --- DATA ---
const services = [
    { 
      id: 'ia-impulso', 
      icon: Bot, 
      name: "Paquete Impulso IA", 
      desc: "WhatsApp con el ADN de tu empresa: respuestas automáticas humanas, auditoría diaria de precios y automatización de gestión para ahorrar horas de trabajo." 
    },
    { 
      id: 'it-pro', 
      icon: Server, 
      name: "Infraestructura IT", 
      desc: "Servidores de alta disponibilidad y soporte preventivo. Soluciones robustas para que tu operativa no se detenga nunca." 
    },
    { 
      id: 'redes-wifi', 
      icon: Wifi, 
      name: "WiFi de Alta Densidad", 
      desc: "Diseño e instalación de redes para hoteles y complejos. Gestión de ancho de banda garantizada para todos tus huéspedes." 
    },
    { 
      id: 'seguridad-ia', 
      icon: Camera, 
      name: "Seguridad Inteligente", 
      desc: "Cámaras con analítica de video y alarmas Grado 2. Monitoreo avanzado que entiende lo que ve." 
    },
    { 
      id: 'workstations', 
      icon: Cpu, 
      name: "Workstations & Gaming", 
      desc: "Hardware de alto rendimiento para AutoCAD, Render 3D y Gaming extremo. Armado técnico certificado." 
    },
];

const navLinks = [
  { name: 'Servicios', href: '#servicios' },
  { name: 'Nosotros', href: '#nosotros' },
  { name: 'IA', href: '#ia' },
  { name: 'Contacto', href: '#contacto' }
];


// --- COMPONENTS ---

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

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const [whatsappUrl, setWhatsappUrl] = useState("https://wa.me/542255605257");

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const phone = "542255605257";
    const message = encodeURIComponent("Hola Phoenix IA, me interesa el Paquete de Impulso con IA para mi negocio.");
    
    if (isMobile) {
      setWhatsappUrl(`whatsapp://send?phone=${phone}&text=${message}`);
    } else {
      setWhatsappUrl(`https://web.whatsapp.com/send?phone=${phone}&text=${message}`);
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-cyan-500 z-[60] origin-left" style={{ scaleX }} />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/50">
        <div className="container mx-auto px-6 h-20 flex justify-between items-center">
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 cursor-pointer">
            <img src="/logo-phoenix.png" alt="Phoenix IA Logo" className="h-10 w-auto" />
            <span className="text-xl font-black tracking-tighter text-white uppercase">Phoenix <span className="text-cyan-400">IA</span></span>
          </a>
          <div className="hidden md:flex gap-10">
            {navLinks.map(item => (
              <a key={item.name} href={item.href} onClick={(e) => handleNavClick(e, item.href)} className="text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero: Enfoque en ahorro y eficiencia */}
      <section id="hero" className="min-h-screen flex items-center justify-center pt-20 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.05)_0%,transparent_70%)]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-5xl md:text-7xl font-black mb-6 leading-tight text-white tracking-tighter">
            MENOS GESTIÓN.<br/><span className="text-cyan-400">MÁS RENTABILIDAD.</span>
          </motion.h1>
          <p className="max-w-3xl mx-auto text-xl text-slate-400 mb-10 leading-relaxed">
            Evolucionamos negocios en la costa mediante <strong>Inteligencia Artificial aplicada</strong>. Ahorramos tiempo administrativo y optimizamos tus precios automáticamente mientras vos te enfocas en crecer.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <AnimatedCTA>
                <MessageCircle className="w-5 h-5" />
                <span>Consultar por WhatsApp</span>
              </AnimatedCTA>
            </a>
            <a href="#servicios" onClick={(e) => handleNavClick(e, '#servicios')} className="text-slate-500 hover:text-cyan-400 font-bold px-6 py-4 transition-all uppercase text-sm tracking-widest">Ver Soluciones</a>
          </div>
        </div>
      </section>

      {/* Servicios */}
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
            <motion.div 
              key={s.id} 
              className="group p-10 bg-slate-900/40 border border-slate-800 rounded-3xl hover:border-cyan-500/50 transition-all duration-500"
              variants={serviceItemVariants}
            >
              <s.icon className="w-12 h-12 text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-500" />
              <h3 className="text-2xl font-bold text-white mb-4">{s.name}</h3>
              <p className="text-slate-400 mb-6 text-sm leading-relaxed">{s.desc}</p>
              <div className="h-1 w-12 bg-slate-800 group-hover:w-full group-hover:bg-cyan-500 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </MotionSection>

      {/* Valor Agregado: Auditoría y Ahorro */}
      <MotionSection id="nosotros" className="bg-cyan-500/5">
        <div id="ia" className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">Tu Negocio en <span className="text-cyan-400">Piloto Automático</span></h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1 flex-shrink-0"><Clock className="text-cyan-400" /></div>
                <p className="text-slate-300"><strong>Ahorro de Tiempo masivo:</strong> Automatizamos la atención al cliente inicial y tareas administrativas repetitivas.</p>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 flex-shrink-0"><TrendingUp className="text-cyan-400" /></div>
                <p className="text-slate-300"><strong>Auditoría de Precios:</strong> Recomendaciones diarias de ajustes basadas en el mercado para proteger tu margen de ganancia.</p>
              </div>
              <div className="flex gap-4">
                <div className="mt-1 flex-shrink-0"><BrainCircuit className="text-cyan-400" /></div>
                <p className="text-slate-300"><strong>Google AI Leader:</strong> Implementamos modelos de lenguaje que hablan y actúan con el ADN de tu empresa.</p>
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

      {/* Footer / Contacto Directo */}
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
}
