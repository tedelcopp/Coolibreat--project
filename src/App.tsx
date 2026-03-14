
// ============================================================
// Coolibreat
// ============================================================

import { useState, useEffect, useRef, FC, ReactNode } from "react";

// ─── Types ───────────────────────────────────────────────────
interface ServiceItem {
  icon: string;
  name: string;
  description: string;
  cta: string;
}

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
}

interface ProcessStep {
  num: string;
  title: string;
  desc: string;
}

interface AmbCard {
  emoji: string;
  tag: string;
  title: string;
  span: string;
}

interface StatItem {
  value: string;
  label: string;
}

// ─── Data ────────────────────────────────────────────────────
const SERVICES: ServiceItem[] = [
  {
    icon: "✦",
    name: "Eventos Sociales",
    description:
      "Cumpleaños, casamientos, aniversarios y celebraciones especiales. Creamos atmósferas únicas que hacen que cada momento sea memorable para vos y tus invitados.",
    cta: "Consultar disponibilidad",
  },
  {
    icon: "◈",
    name: "Eventos Corporativos",
    description:
      "Lanzamientos de producto, galas empresariales, teambuildings y cócteles de networking. Proyectamos la imagen de tu empresa con clase y profesionalismo.",
    cta: "Armar propuesta",
  },
  {
    icon: "⋄",
    name: "Barras Móviles",
    description:
      "Bar premium itinerante con bartenders especializados, carta de tragos artesanales y presentación de primer nivel. El complemento perfecto para cualquier evento.",
    cta: "Ver carta de tragos",
  },
  {
    icon: "∿",
    name: "Sets Electrónicos",
    description:
      "DJ sets y producción de sonido electrónica para eventos privados. Selección musical curada, equipo de alta fidelidad y una experiencia sonora que mueve la noche.",
    cta: "Consultar artistas",
  },
  {
    icon: "❋",
    name: "Eventos Privados",
    description:
      "Veladas íntimas, fiestas exclusivas y reuniones de alto perfil. Máxima discreción, atención personalizada y producción boutique para los momentos más especiales.",
    cta: "Diseñar tu evento",
  },
  {
    icon: "◎",
    name: "Producción Integral",
    description:
      "Iluminación, decoración, ambientación y coordinación completa del evento. Un solo punto de contacto para que vos solo disfrutes sin preocuparte de nada.",
    cta: "Conocer el servicio",
  },
];

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "Contratamos a Coolibreat para el lanzamiento de nuestra línea premium y superaron todas nuestras expectativas. La barra móvil fue el hit de la noche.",
    author: "Valentina M.",
    role: "Directora de Marketing · Empresa de moda",
  },
  {
    quote:
      "La música, la ambientación, el servicio... todo fue impecable. Mi cumple de 30 fue exactamente lo que soñé. Los recomiendo con los ojos cerrados.",
    author: "Lucía P.",
    role: "Evento privado · Esquel, Chubut - Patagonia Argentina.",
  },
  {
    quote:
      "Profesionales, creativos y muy atentos a los detalles. El DJ set fue increíble y los tragos artesanales hicieron que todos se quedaran hasta el final.",
    author: "Martín G.",
    role: "Evento Privado · Esquel, Chubut",
  },
];

const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    title: "Primera consulta",
    desc: "Nos contás tu idea, fecha y expectativas. Sin costo, sin compromiso. Solo escuchamos.",
  },
  {
    num: "02",
    title: "Propuesta a medida",
    desc: "Diseñamos una propuesta personalizada con todos los servicios adaptados a tu visión y presupuesto.",
  },
  {
    num: "03",
    title: "Producción",
    desc: "Coordinamos cada aspecto del evento: logística, equipo, proveedores y ambientación.",
  },
  {
    num: "04",
    title: "El gran momento",
    desc: "Vos disfrutás. Nosotros nos encargamos de que todo funcione a la perfección.",
  },
];

const STATS: StatItem[] = [
  { value: "+200", label: "Eventos realizados" },
  { value: "5", label: "Años de experiencia" },
  { value: "100%", label: "Satisfacción" },
];

const AMB_CARDS: AmbCard[] = [
  { emoji: "🌿", tag: "Ambientación", title: "Espacios que cuentan historias", span: "col-span-5" },
  { emoji: "🍸", tag: "Barra Móvil", title: "Tragos de autor", span: "col-span-3" },
  { emoji: "🎵", tag: "Electrónica", title: "Sets únicos", span: "col-span-4" },
  { emoji: "✨", tag: "Corporativo", title: "Imagen impecable", span: "col-span-4" },
  { emoji: "🌙", tag: "Eventos Privados", title: "Noches que no se olvidan", span: "col-span-8" },
];

// ─── Hooks ───────────────────────────────────────────────────
function useScrolled(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);
  return scrolled;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Sub-components ──────────────────────────────────────────

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn: FC<FadeInProps> = ({ children, delay = 0, className = "" }) => {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

interface SectionLabelProps {
  text: string;
  centered?: boolean;
}

const SectionLabel: FC<SectionLabelProps> = ({ text, centered }) => (
  <div
    className={`flex items-center gap-4 text-[11px] tracking-[0.42em] uppercase font-normal mb-6 ${
      centered ? "justify-center" : ""
    }`}
    style={{ color: "#c9a84c" }}
  >
    {!centered && <span className="block w-8 h-px" style={{ background: "#c9a84c" }} />}
    {text}
  </div>
);

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
}

const SectionTitle: FC<SectionTitleProps> = ({ children, className = "" }) => (
  <h2
    className={`font-light leading-[1.1] ${className}`}
    style={{
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
      color: "#f5f0e8",
    }}
  >
    {children}
  </h2>
);

// ─── Nav ─────────────────────────────────────────────────────
interface NavProps {
  logoPrimarySrc: string;
  logoSecondarySrc: string;
}

const Nav: FC<NavProps> = ({ logoPrimarySrc }) => {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const links = [
    { label: "Servicios", id: "servicios" },
    { label: "Nosotros", id: "nosotros" },
    { label: "Proceso", id: "proceso" },
    { label: "Contacto", id: "contacto" },
  ];

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500"
        style={{
          padding: "1.3rem 4rem",
          background: scrolled
            ? "rgba(13,13,15,0.97)"
            : "linear-gradient(180deg,rgba(13,13,15,0.92) 0%,transparent 100%)",
          backdropFilter: "blur(14px)",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.18)" : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <button onClick={() => scrollTo("inicio")} className="flex items-center gap-3">
          <div className="relative h-10 w-10">
            <img
              src={logoPrimarySrc}
              alt="Coolibreat"
              className="absolute inset-0 h-full w-full object-contain"
            />
        
          </div>
          <span
            className="font-light tracking-[0.2em] uppercase"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.55rem", color: "#f5f0e8" }}
          >
            Coolibreat
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                className="relative text-[11px] tracking-[0.22em] uppercase font-normal transition-colors duration-300 group"
                style={{ color: "rgba(245,240,232,0.6)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e8c97a")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.6)")}
              >
                {l.label}
                <span
                  className="absolute bottom-[-3px] left-0 right-0 h-px origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  style={{ background: "#c9a84c" }}
                />
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          className="hidden md:block text-[11px] tracking-[0.2em] uppercase font-normal px-6 py-2 transition-all duration-300"
          style={{ border: "1px solid #c9a84c", color: "#c9a84c" }}
          onClick={() => scrollTo("contacto")}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "#c9a84c";
            (e.currentTarget as HTMLButtonElement).style.color = "#0d0d0f";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#c9a84c";
          }}
        >
          Cotizá tu evento
        </button>

        {/* Hamburger */}
        <button className="md:hidden flex flex-col gap-[5px] p-1" onClick={() => setOpen(true)}>
          {[0, 1, 2].map((i) => (
            <span key={i} className="block w-6 h-px" style={{ background: "#f5f0e8" }} />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-10"
          style={{ background: "rgba(13,13,15,0.97)", backdropFilter: "blur(20px)" }}
        >
          <button
            className="absolute top-6 right-8 text-2xl font-thin"
            style={{ color: "#f5f0e8" }}
            onClick={() => setOpen(false)}
          >
            ✕
          </button>
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="font-light tracking-wide transition-colors duration-300"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.4rem", color: "#f5f0e8" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e8c97a")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#f5f0e8")}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

// ─── Hero ────────────────────────────────────────────────────
interface HeroProps {
  logoPrimarySrc: string;
  logoSecondarySrc: string;
}

const Hero: FC<HeroProps> = ({ logoPrimarySrc }) => {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
      style={{ padding: "8rem 2rem 4rem" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 65%), linear-gradient(180deg,#0d0d0f 0%,#13131a 50%,#0d0d0f 100%)",
        }}
      />

      {/* Ghost logos */}
      <img
        src={logoPrimarySrc}
        alt=""
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: "min(500px,75vw)", opacity: 0.06, filter: "grayscale(1)", animation: "floatBird 8s ease-in-out infinite" }}
      />
      <p
        className="relative z-10 text-[11px] tracking-[0.44em] uppercase font-normal mb-7"
        style={{ color: "#c9a84c", opacity: 0, animation: "fadeUp 1s ease 0.3s forwards" }}
      >
        Eventos · Experiencias · Momentos
      </p>

      <h1
        className="relative z-10 font-light leading-[0.93]"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(3.4rem, 10vw, 8rem)",
          color: "#f5f0e8",
          opacity: 0,
          animation: "fadeUp 1s ease 0.55s forwards",
        }}
      >
        Donde cada evento
        <br />
        <em style={{ fontStyle: "italic", color: "#e8c97a", display: "block" }}>
          se convierte en arte
        </em>
      </h1>

      <p
        className="relative z-10 max-w-md mx-auto mt-8 text-[14px] leading-loose tracking-wide"
        style={{ color: "rgba(245,240,232,0.5)", opacity: 0, animation: "fadeUp 1s ease 0.8s forwards" }}
      >
        Creamos experiencias únicas para eventos sociales, corporativos y privados. Barras
        móviles, ambientación electrónica y producción de alto nivel.
      </p>

      <div
        className="relative z-10 flex flex-wrap gap-4 justify-center mt-12"
        style={{ opacity: 0, animation: "fadeUp 1s ease 1s forwards" }}
      >
        <PrimaryBtn onClick={() => scrollTo("servicios")}>Ver Servicios</PrimaryBtn>
        <OutlineBtn onClick={() => scrollTo("contacto")}>Cotizá tu evento</OutlineBtn>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0, animation: "fadeUp 1s ease 1.4s forwards" }}
      >
      </div>
    </section>
  );
};

// ─── Button components ───────────────────────────────────────
interface BtnProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  fullWidth?: boolean;
}

const PrimaryBtn: FC<BtnProps> = ({ children, onClick, type = "button", fullWidth }) => (
  <button
    type={type}
    onClick={onClick}
    className={`relative overflow-hidden text-[11px] tracking-[0.22em] uppercase font-medium px-8 py-4 transition-all duration-300 ${fullWidth ? "w-full" : ""}`}
    style={{ background: "#c9a84c", color: "#0d0d0f", border: "none" }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 30px rgba(201,168,76,0.3)"; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = ""; (e.currentTarget as HTMLButtonElement).style.boxShadow = ""; }}
  >
    {children}
  </button>
);

const OutlineBtn: FC<BtnProps> = ({ children, onClick, fullWidth }) => (
  <button
    onClick={onClick}
    className={`text-[11px] tracking-[0.22em] uppercase font-light px-8 py-4 transition-all duration-300 ${fullWidth ? "w-full" : ""}`}
    style={{ border: "1px solid rgba(245,240,232,0.3)", color: "#f5f0e8", background: "transparent" }}
    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "#c9a84c"; (e.currentTarget as HTMLButtonElement).style.color = "#c9a84c"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(245,240,232,0.3)"; (e.currentTarget as HTMLButtonElement).style.color = "#f5f0e8"; (e.currentTarget as HTMLButtonElement).style.transform = ""; }}
  >
    {children}
  </button>
);

// ─── About ───────────────────────────────────────────────────
interface AboutProps {
  logoPrimarySrc: string;
  logoSecondarySrc: string;
}

const About: FC<AboutProps> = ({ logoPrimarySrc }) => (
  <section id="nosotros" className="py-28 px-8 md:px-16">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
      <FadeIn className="flex justify-center order-first">
        <div className="relative flex items-center justify-center" style={{ width: "min(360px,42vw)", height: "min(360px,42vw)" }}>
          <div
            className="w-full h-full rounded-full flex items-center justify-center relative"
            style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.22)" }}
          >
            <div
              className="absolute inset-[-20px] rounded-full"
              style={{ border: "1px dashed rgba(201,168,76,0.2)", animation: "rotateSlow 20s linear infinite" }}
            />
            <div className="relative" style={{ width: "64%", height: "64%" }}>
              <img
                src={logoPrimarySrc}
                alt="Coolibreat"
                className="absolute inset-0 w-full h-full object-contain"
                style={{ opacity: 0.9 }}
              />
            </div>
          </div>
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <SectionLabel text="Quiénes somos" />
        <SectionTitle>
          Una propuesta<br />
          <em style={{ fontStyle: "italic", color: "#e8c97a" }}>diferente</em>
        </SectionTitle>
        <p className="mt-7 text-sm leading-loose" style={{ color: "rgba(245,240,232,0.55)" }}>
          En Coolibreat creemos que cada evento es una oportunidad para crear algo extraordinario.
          Combinamos el arte, la música electrónica y la hospitalidad para diseñar experiencias que
          quedan en la memoria de quienes las viven.
        </p>
        <p className="mt-4 text-sm leading-loose" style={{ color: "rgba(245,240,232,0.55)" }}>
          Desde eventos sociales íntimos hasta grandes producciones corporativas, nuestro equipo
          cuida cada detalle para que el resultado supere siempre las expectativas.
        </p>
        <div
          className="mt-10 pt-8 grid grid-cols-3 gap-4"
          style={{ borderTop: "1px solid rgba(201,168,76,0.22)" }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <span
                className="font-light leading-none block"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.6rem", color: "#c9a84c" }}
              >
                {s.value}
              </span>
              <span
                className="block mt-1 text-[10px] tracking-widest uppercase"
                style={{ color: "rgba(245,240,232,0.4)" }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  </section>
);

// ─── Services ────────────────────────────────────────────────
const Services: FC = () => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="servicios" className="py-28 px-8 md:px-16" style={{ background: "#13131a" }}>
      <FadeIn className="text-center max-w-xl mx-auto mb-20">
        <SectionLabel text="Lo que hacemos" centered />
        <SectionTitle>
          Nuestros<br />
          <em style={{ fontStyle: "italic", color: "#e8c97a" }}>servicios</em>
        </SectionTitle>
        <p className="mt-5 text-sm leading-loose" style={{ color: "rgba(245,240,232,0.5)" }}>
          Diseñamos propuestas a medida para cada tipo de evento y ocasión.
        </p>
      </FadeIn>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(201,168,76,0.08)" }}>
        {SERVICES.map((svc, i) => (
          <FadeIn key={svc.name} delay={i * 0.08}>
            <ServiceCard service={svc} onCta={() => scrollTo("contacto")} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

interface ServiceCardProps {
  service: ServiceItem;
  onCta: () => void;
}

const ServiceCard: FC<ServiceCardProps> = ({ service, onCta }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex flex-col p-10 h-full cursor-default transition-all duration-400"
      style={{
        background: "#1a1a26",
        border: `1px solid ${hovered ? "rgba(201,168,76,0.35)" : "transparent"}`,
        transform: hovered ? "translateY(-4px)" : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px origin-left transition-transform duration-400"
        style={{
          background: "linear-gradient(90deg,transparent,#c9a84c,transparent)",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
        }}
      />
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-7 text-lg transition-all duration-300"
        style={{
          border: `1px solid ${hovered ? "#c9a84c" : "rgba(201,168,76,0.22)"}`,
          background: hovered ? "rgba(201,168,76,0.12)" : "transparent",
          color: "#c9a84c",
        }}
      >
        {service.icon}
      </div>

      <h3
        className="font-normal leading-tight mb-4"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", color: "#f5f0e8" }}
      >
        {service.name}
      </h3>
      <p className="text-sm leading-loose mb-7 flex-1" style={{ color: "rgba(245,240,232,0.5)" }}>
        {service.description}
      </p>
      <button
        onClick={onCta}
        className="text-[11px] tracking-[0.22em] uppercase font-normal flex items-center gap-2 transition-all duration-300"
        style={{ color: "#c9a84c" }}
        onMouseEnter={(e) => (e.currentTarget.style.gap = "1rem")}
        onMouseLeave={(e) => (e.currentTarget.style.gap = "0.5rem")}
      >
        {service.cta} →
      </button>
    </div>
  );
};

// ─── Experience Strip ─────────────────────────────────────────
const ExperienceStrip: FC = () => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <div
      className="py-20 px-8 md:px-16"
      style={{ background: "linear-gradient(135deg,rgba(201,168,76,0.1),transparent 60%)", borderTop: "1px solid rgba(201,168,76,0.2)", borderBottom: "1px solid rgba(201,168,76,0.2)" }}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1px_1fr] gap-12 items-center">
        <FadeIn>
          <p
            className="font-light leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.6rem,3vw,2.6rem)", color: "#f5f0e8" }}
          >
            ¿Tenés un evento<br />en mente?{" "}
            <em style={{ fontStyle: "italic", color: "#e8c97a" }}>Hablemos.</em>
          </p>
        </FadeIn>
        <div className="hidden md:block h-20 w-px" style={{ background: "rgba(201,168,76,0.22)" }} />
        <FadeIn delay={0.15} className="md:text-right">
          <p className="text-sm leading-loose mb-6" style={{ color: "rgba(245,240,232,0.5)" }}>
            Contanos tu idea y te armamos una propuesta personalizada sin costo ni compromiso.
          </p>
          <PrimaryBtn onClick={() => scrollTo("contacto")}>Empezar a planificar</PrimaryBtn>
        </FadeIn>
      </div>
    </div>
  );
};

// ─── Ambiance ────────────────────────────────────────────────
const Ambiance: FC = () => (
  <section className="py-28 px-8 md:px-16">
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-14 flex-wrap gap-6">
        <FadeIn>
          <SectionLabel text="Nuestra estética" />
          <SectionTitle>
            Cada detalle<br />
            <em style={{ fontStyle: "italic", color: "#e8c97a" }}>cuenta</em>
          </SectionTitle>
        </FadeIn>
        <FadeIn delay={0.1}>
          <OutlineBtn onClick={() => window.open("https://instagram.com/coolibreat", "_blank")}>
            Ver Instagram
          </OutlineBtn>
        </FadeIn>
      </div>

      <div className="grid grid-cols-12 gap-3">
        {AMB_CARDS.map((card, i) => (
          <FadeIn key={card.title} delay={i * 0.07} className={`${card.span} max-sm:col-span-12`}>
            <AmbianceCard card={card} />
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

interface AmbianceCardProps {
  card: AmbCard;
}

const AmbianceCard: FC<AmbianceCardProps> = ({ card }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative flex flex-col justify-end p-7 overflow-hidden transition-transform duration-400"
      style={{
        minHeight: 220,
        border: "1px solid rgba(201,168,76,0.18)",
        background: "#1a1a26",
        transform: hovered ? "scale(1.02)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 flex items-center justify-center text-[5.5rem] opacity-20 pointer-events-none select-none">
        {card.emoji}
      </div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(13,13,15,0.95) 0%,transparent 55%)" }} />
      <p className="relative z-10 text-[10px] tracking-[0.32em] uppercase mb-1" style={{ color: "#c9a84c" }}>
        {card.tag}
      </p>
      <h3
        className="relative z-10 font-light leading-tight"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.25rem", color: "#f5f0e8" }}
      >
        {card.title}
      </h3>
    </div>
  );
};

// ─── Process ─────────────────────────────────────────────────
const Process: FC = () => (
  <section id="proceso" className="py-28 px-8 md:px-16" style={{ background: "#13131a" }}>
    <div className="max-w-6xl mx-auto">
      <FadeIn className="mb-20">
        <SectionLabel text="Cómo trabajamos" />
        <SectionTitle>
          Tu evento en<br />
          <em style={{ fontStyle: "italic", color: "#e8c97a" }}>4 pasos simples</em>
        </SectionTitle>
      </FadeIn>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 relative">
        <div
          className="absolute top-6 left-[12%] right-[12%] h-px hidden lg:block"
          style={{ background: "rgba(201,168,76,0.2)" }}
        />

        {PROCESS_STEPS.map((step, i) => (
          <FadeIn key={step.num} delay={i * 0.1} className="text-center relative z-10">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-7"
              style={{
                border: "1px solid #c9a84c",
                background: "#13131a",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.05rem",
                color: "#c9a84c",
              }}
            >
              {step.num}
            </div>
            <h3
              className="font-normal mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", color: "#f5f0e8" }}
            >
              {step.title}
            </h3>
            <p className="text-sm leading-loose" style={{ color: "rgba(245,240,232,0.45)" }}>
              {step.desc}
            </p>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

// ─── Testimonials ─────────────────────────────────────────────
const Testimonials: FC = () => (
  <section className="py-28 px-8 md:px-16">
    <div className="max-w-6xl mx-auto">
      <FadeIn className="mb-16">
        <SectionLabel text="Lo que dicen" />
        <SectionTitle>
          Voces que<br />
          <em style={{ fontStyle: "italic", color: "#e8c97a" }}>nos inspiran</em>
        </SectionTitle>
      </FadeIn>
      <div className="grid md:grid-cols-3 gap-5">
        {TESTIMONIALS.map((t, i) => (
          <FadeIn key={t.author} delay={i * 0.1}>
            <TestimonialCard item={t} />
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

interface TestimonialCardProps {
  item: TestimonialItem;
}

const TestimonialCard: FC<TestimonialCardProps> = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative p-10 transition-colors duration-300"
      style={{
        border: `1px solid ${hovered ? "#c9a84c" : "rgba(201,168,76,0.22)"}`,
        background: "#1a1a26",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="absolute top-4 right-5 font-light leading-none pointer-events-none"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "5rem", color: "rgba(201,168,76,0.2)" }}
      >
        "
      </span>
      <p
        className="font-light italic leading-relaxed mb-7 relative z-10"
        style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.08rem", color: "rgba(245,240,232,0.8)" }}
      >
        {item.quote}
      </p>
      <p className="text-[11px] tracking-[0.2em] uppercase font-normal" style={{ color: "#c9a84c" }}>
        {item.author}
      </p>
      <p className="text-[11px] mt-1" style={{ color: "rgba(245,240,232,0.35)" }}>
        {item.role}
      </p>
    </div>
  );
};

// ─── CTA Banner ───────────────────────────────────────────────
interface CtaBannerProps {
  logoPrimarySrc: string;
  logoSecondarySrc: string;
}

const CtaBanner: FC<CtaBannerProps> = ({ logoPrimarySrc }) => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <div
      className="relative py-32 px-8 text-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg,#1a1a26 0%,#13131a 100%)",
        borderTop: "1px solid rgba(201,168,76,0.2)",
      }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 50%,rgba(201,168,76,0.07) 0%,transparent 70%)" }}
      />
      <img
        src={logoPrimarySrc}
        alt=""
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: 600, opacity: 0.05, filter: "grayscale(1)" }}
      />
      <FadeIn className="relative z-10">
        <h2
          className="font-light leading-[1.1] mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.4rem,6vw,5rem)", color: "#f5f0e8" }}
        >
          Hacé que tu próximo<br />
          evento sea{" "}
          <em style={{ fontStyle: "italic", color: "#e8c97a" }}>inolvidable</em>
        </h2>
        <p className="max-w-md mx-auto text-sm leading-loose mb-10" style={{ color: "rgba(245,240,232,0.5)" }}>
          No importa la escala ni la ocasión. Coolibreat transforma cada momento en una experiencia que perdura.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <PrimaryBtn onClick={() => scrollTo("contacto")}>Contactanos ahora</PrimaryBtn>
          <OutlineBtn onClick={() => window.open("https://instagram.com/coolibreat", "_blank")}>
            @coolibreat
          </OutlineBtn>
        </div>
      </FadeIn>
    </div>
  );
};

// ─── Contact ──────────────────────────────────────────────────
const Contact: FC = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", type: "", date: "", guests: "", message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = () => alert("¡Mensaje enviado! Te contactaremos en menos de 24hs.");

  const inputStyle: React.CSSProperties = {
    background: "#1a1a26",
    border: "1px solid rgba(201,168,76,0.22)",
    color: "#f5f0e8",
    padding: "0.82rem 1rem",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.88rem",
    fontWeight: 300,
    outline: "none",
    width: "100%",
  };

  const Label: FC<{ children: ReactNode }> = ({ children }) => (
    <label className="block text-[10px] tracking-[0.25em] uppercase mb-2" style={{ color: "rgba(245,240,232,0.4)" }}>
      {children}
    </label>
  );

  return (
    <section id="contacto" className="py-28 px-8 md:px-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-start">
        <FadeIn>
          <SectionLabel text="Contacto" />
          <SectionTitle>
            Contanos<br />tu <em style={{ fontStyle: "italic", color: "#e8c97a" }}>idea</em>
          </SectionTitle>
          <p className="mt-6 text-sm leading-loose mb-10" style={{ color: "rgba(245,240,232,0.5)" }}>
            Completá el formulario o escribinos directamente. Respondemos en menos de 24hs.
          </p>

          {[
            { label: "Instagram", content: <a href="https://instagram.com/coolibreat" target="_blank" rel="noreferrer" className="transition-colors duration-300" style={{ color: "rgba(245,240,232,0.5)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}>@coolibreat</a> },
            { label: "Email", content: <a href="mailto:hola@coolibreat.com" className="transition-colors duration-300" style={{ color: "rgba(245,240,232,0.5)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}>hola@coolibreat.com</a> },
            { label: "Zona de cobertura", content: <span style={{ color: "rgba(245,240,232,0.5)" }}>Chubut - Patagonia Argentina</span> },
            { label: "WhatsApp", content: <a href="https://wa.me/5491100000000" target="_blank" rel="noreferrer" className="transition-colors duration-300" style={{ color: "rgba(245,240,232,0.5)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}>Escribinos por WhatsApp</a> },
          ].map((item) => (
            <div key={item.label} className="py-5 text-sm" style={{ borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
              <h3 className="font-normal mb-1" style={{ color: "#f5f0e8", letterSpacing: "0.05em" }}>
                {item.label}
              </h3>
              {item.content}
            </div>
          ))}
        </FadeIn>

        {/* Form */}
        <FadeIn delay={0.15} className="flex flex-col gap-5">
          <div>
            <Label>Nombre completo</Label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="Tu nombre" style={inputStyle} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" style={inputStyle} />
            </div>
            <div>
              <Label>Teléfono</Label>
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+54 9 11..." style={inputStyle} />
            </div>
          </div>

          <div>
            <Label>Tipo de evento</Label>
            <select name="type" value={form.type} onChange={handleChange} style={{ ...inputStyle, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23c9a84c' stroke-width='1.5' fill='none'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 1rem center", appearance: "none", cursor: "pointer" }}>
              <option value="" disabled>Seleccioná el tipo</option>
              {["Evento Social", "Evento Corporativo", "Barra Móvil", "Set Electrónico / DJ", "Evento Privado", "Producción Integral", "Combinación de servicios"].map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Fecha del evento</Label>
              <input name="date" type="date" value={form.date} onChange={handleChange} style={inputStyle} />
            </div>
            <div>
              <Label>Cantidad de personas</Label>
              <input name="guests" type="number" value={form.guests} onChange={handleChange} placeholder="Estimado" style={inputStyle} />
            </div>
          </div>

          <div>
            <Label>Contanos tu idea</Label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Describí lo que tenés en mente, el estilo que buscás, el lugar si ya lo tenés..."
              rows={5}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          <PrimaryBtn onClick={handleSubmit} fullWidth>
            Enviar consulta
          </PrimaryBtn>
        </FadeIn>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────
interface FooterProps {
  logoPrimarySrc: string;
  logoSecondarySrc: string;
}

const Footer: FC<FooterProps> = ({ logoPrimarySrc }) => {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const links = [
    { label: "Servicios", id: "servicios" },
    { label: "Nosotros", id: "nosotros" },
    { label: "Proceso", id: "proceso" },
    { label: "Contacto", id: "contacto" },
  ];

  return (
    <footer className="py-10 px-8 md:px-16" style={{ background: "#13131a", borderTop: "1px solid rgba(201,168,76,0.18)" }}>
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-6">
        <button onClick={() => scrollTo("inicio")} className="flex items-center gap-3">
          <div className="relative h-8 w-8">
            <img
              src={logoPrimarySrc}
              alt="Coolibreat"
              className="absolute inset-0 h-full w-full object-contain opacity-70"
            />
          </div>
          <span className="font-light tracking-[0.2em] uppercase" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem", color: "rgba(245,240,232,0.55)" }}>
            Coolibreat
          </span>
        </button>

        <ul className="flex flex-wrap gap-8 list-none">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                className="text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
                style={{ color: "rgba(245,240,232,0.4)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.4)")}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <a
          href="https://instagram.com/coolibreat"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
          style={{ color: "rgba(245,240,232,0.45)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.45)")}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
          </svg>
          @coolibreat
        </a>

        <p className="text-[11px] tracking-wide w-full md:w-auto text-center md:text-left" style={{ color: "rgba(245,240,232,0.22)" }}>
          © 2025 Coolibreat. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

// ─── App ─────────────────────────────────────────────────────
export default function App() {
  const LOGO_PRIMARY_SRC = "/assets/logo1.png";
  const LOGO_SECONDARY_SRC = "/assets/logo2.png";

  return (
    <>
      {/* Global keyframes injected once */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes floatBird { 0%,100% { transform:translate(-50%,-50%) rotate(-2deg); } 50% { transform:translate(-50%,-54%) rotate(2deg); } }
        @keyframes rotateSlow { to { transform:rotate(360deg); } }
        @keyframes scrollPulse { 0% { transform:scaleY(0); transform-origin:top; opacity:0; } 50% { transform:scaleY(1); transform-origin:top; opacity:1; } 100% { transform:scaleY(1); transform-origin:bottom; opacity:0; } }
        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }
        body { background:#0d0d0f; color:#f5f0e8; font-family:'Jost',sans-serif; font-weight:300; overflow-x:hidden; }
        body::before { content:''; position:fixed; inset:0; background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E"); opacity:0.03; pointer-events:none; z-index:9999; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:#0d0d0f; }
        ::-webkit-scrollbar-thumb { background:#c9a84c; }
        input:focus, textarea:focus, select:focus { outline:none; border-color:#c9a84c !important; }
        select option { background:#1a1a26; }
      `}</style>

      <Nav logoPrimarySrc={LOGO_PRIMARY_SRC} logoSecondarySrc={LOGO_SECONDARY_SRC} />
      <main>
        <Hero logoPrimarySrc={LOGO_PRIMARY_SRC} logoSecondarySrc={LOGO_SECONDARY_SRC} />
        <About logoPrimarySrc={LOGO_PRIMARY_SRC} logoSecondarySrc={LOGO_SECONDARY_SRC} />
        <Services />
        <ExperienceStrip />
        <Ambiance />
        <Process />
        <Testimonials />
        <CtaBanner logoPrimarySrc={LOGO_PRIMARY_SRC} logoSecondarySrc={LOGO_SECONDARY_SRC} />
        <Contact />
      </main>
      <Footer logoPrimarySrc={LOGO_PRIMARY_SRC} logoSecondarySrc={LOGO_SECONDARY_SRC} />
    </>
  );
}
