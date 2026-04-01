
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
  popupInfo?: {
    image: string;
    desc: string;
  };
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
  image: string;
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
    cta: "Ver detalles",
    popupInfo: {
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
      desc: "Transformamos tus momentos más importantes en recuerdos imborrables. Nos encargamos de la selección musical, iluminación decorativa, gastronomía y cada aspecto creativo. Nuestro objetivo es que vos solo te dediques a disfrutar mientras nosotros creamos magia."
    }
  },
  {
    icon: "◈",
    name: "Eventos Corporativos",
    description:
      "Lanzamientos de producto, galas empresariales, teambuildings y cócteles de networking. Proyectamos la imagen de tu empresa con clase y profesionalismo.",
    cta: "Ver detalles",
    popupInfo: {
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800",
      desc: "Reflejamos la identidad de tu marca con una propuesta integral de alta gama:\n\n• CATERING A MEDIDA: Diseñamos un menú exclusivo adaptado a los objetivos de tu empresa.\n• CAFETERÍA DE ESPECIALIDAD: Servicio de baristas con blends seleccionados y pastelería premium.\n• OPCIONES DULCES Y SALADAS: Finger food gourmet ideal para jornadas de capacitación y networking.\n• BARRA SIN ALCOHOL: Amplia variedad de mocktails de autor y jugos naturales prensados.\n• BRINDIS DE HONOR: Cierre exclusivo con cristalería fina para agasajar a clientes y equipo."
    }
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
    cta: "Ver detalles",
    popupInfo: {
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
      desc: "Llevamos la cultura de la música electrónica a tu evento con equipos de sonido e iluminación de última tecnología y una curaduría de DJs que aseguran un nivel internacional para que la pista vibre toda la noche."
    }
  },
  {
    icon: "❋",
    name: "Eventos Privados",
    description:
      "Veladas íntimas, fiestas exclusivas y reuniones de alto perfil. Máxima discreción, atención personalizada y producción boutique para los momentos más especiales.",
    cta: "Ver detalles",
    popupInfo: {
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=800",
      desc: "Manejamos eventos privados donde la discreción es primordial. Brindamos una atención meticulosamente personalizada, garantizando una producción boutique sin igual."
    }
  },
  {
    icon: "◎",
    name: "Producción Integral",
    description:
      "Iluminación, decoración, ambientación y coordinación completa del evento. Un solo punto de contacto para que vos solo disfrutes sin preocuparte de nada.",
    cta: "Ver detalles",
    popupInfo: {
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=800",
      desc: "Nuestro equipo coordina íntegramente todo el evento: sonido, luces, escenarios, mobiliario, catering y personal, para que tengas la tranquilidad de dejar todo en manos de expertos desde la idea inicial hasta el aplauso final."
    }
  },
];

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "Contratamos a Coolibreat para el lanzamiento de nuestra línea premium y superaron todas nuestras expectativas. La barra móvil fue el hit de la noche.",
    author: "Valentina M.",
    role: "Evento corporativo · Esquel, Chubut",
  },
  {
    quote:
      "La música, la ambientación, el servicio... todo fue impecable. Mi cumple de 30 fue exactamente lo que soñé. Los recomiendo con los ojos cerrados.",
    author: "Lucía P.",
    role: "Evento privado · Esquel, Chubut",
  },
  {
    quote:
      "Profesionales, creativos y muy atentos a los detalles. El DJ set fue increíble y los tragos artesanales hicieron que todos se quedaran hasta el final.",
    author: "Martín G.",
    role: "Evento social · Trevelin, Chubut",
  },
  {
    quote:
      "Una experiencia sensorial de primer nivel. El trato es excelente y resolvieron todo sin que nosotros nos tuviéramos que preocupar por nada.",
    author: "Sofía R.",
    role: "Casamiento · Trevelin, Chubut",
  },
  {
    quote:
      "El nivel de detalle y la dedicación que le ponen marca la diferencia. Lograron captar la esencia de nuestra marca a la perfección en nuestro evento anual.",
    author: "Esteban L.",
    role: "Evento corporativo · Esquel, Chubut",
  },
  {
    quote:
      "Cada rincón estaba pensado. La iluminación, los tragos y la música crearon una atmósfera única. Realmente transformaron el espacio.",
    author: "Carla T.",
    role: "Evento social · Bariloche, Río Negro",
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
  { image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800", tag: "Ambientación", title: "Espacios que cuentan historias", span: "col-span-5" },
  { image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800", tag: "Barra Móvil", title: "Tragos de autor", span: "col-span-3" },
  { image: "/assets/electronic_dj.jpg", tag: "Electrónica", title: "Sets únicos", span: "col-span-4" },
  { image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800", tag: "Gastronomía", title: "Sabores inolvidables", span: "col-span-4" },
  { image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=800", tag: "Momentos", title: "Noches que no se olvidan", span: "col-span-8" },
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
    className={`flex items-center gap-4 text-[11px] tracking-[0.42em] uppercase font-normal mb-6 ${centered ? "justify-center" : ""
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
    { label: "Galería", id: "galeria" },
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

// ─── Drinks Popup ─────────────────────────────────────────────
const DRINKS_LIST = [
  { name: "Aperol Spritz", desc: "Aperol, Cinzano Pro-Spritz, soda, rodaja de naranja." },
  { name: "Gin Tonic de Autor", desc: "Gin premium, agua tónica, botánicos a elección (hibisco, pepino, cítricos)." },
  { name: "Negroni", desc: "Gin, Campari, Vermouth Rosso, piel de naranja." },
  { name: "Margarita", desc: "Tequila, Triple Sec, jugo de lima, borde con sal." },
  { name: "Mojito Clásico", desc: "Ron blanco, menta fresca, lima, azúcar, soda." },
  { name: "Old Fashioned", desc: "Whisky (Bourbon), bitter Angostura, azúcar, piel de naranja." },
  { name: "Caipirinha", desc: "Cachaça, lima fresca, azúcar, hielo triturado." },
  { name: "Moscow Mule", desc: "Vodka, jugo de lima, ginger beer, servido en taza de cobre." },
  { name: "Cynar Julep", desc: "Cynar, jugo de pomelo o tónica, azúcar, menta fresca y toque de limón." },
  { name: "Cosmopolitan", desc: "Vodka, Cointreau, jugo de lima y un toque de jugo de arándanos." },
  { name: "Penicillin", desc: "Whisky escocés, jugo fresco de limón, almíbar de jengibre y miel." },
  { name: "Negroni Ahumado con Eucalipto", desc: "Gin, Campari, Vermouth Rosso, ahumado en vivo con hojas de eucalipto." },
  { name: "Negroni Sbagliato", desc: "Campari, Vermouth Rosso y espumante (Prosecco), piel de naranja." },
  { name: "French 75", desc: "Gin, jugo de limón, almíbar simple, coronado con espumante." },
  { name: "El Presidente", desc: "Ron blanco, Vermouth Blanco (Dry), Curaçao de naranja, granadina." }
];

const VIP_LIST = [
  { name: "Smoked Old Fashioned", desc: "Bourbon añejo, bitter aromático, azúcar mascabado, ahumado con madera de roble." },
  { name: "Clarified Piña Colada", desc: "Ron añejo, mix de piña y coco, clarificado mediante filtrado de leche para un acabado 100% cristalino." },
  { name: "Espresso Martini de Especialidad", desc: "Vodka premium, licor artesanal de café, espresso recién extraído con notas a chocolate." },
  { name: "Gold Rush", desc: "Bourbon premium, jugo de limón recién exprimido, almíbar de miel silvestre." },
  { name: "New York Sour", desc: "Whisky (Rye o Bourbon), jugo de limón, almíbar simple, float de vino tinto Malbec." },
  { name: "Lynchburg Lemonade", desc: "Whisky Tennessee (Jack Daniel's), Triple Sec, jugo de limón, dash de lima-limón." },
  { name: "Rob Roy", desc: "Whisky escocés (Scotch), Vermouth Rosso, bitter aromático, cereza marrasquino." },
  { name: "Sazerac", desc: "Cognac o Rye Whisky, dash de absenta, azúcar, bitter Peychaud's, piel de limón." },
  { name: "Boulevardier", desc: "Bourbon o Rye Whisky, Campari, Vermouth Rosso, piel de naranja." },
  { name: "Perfect Martini", desc: "Gin London Dry, partes iguales de Vermouth Dry y Rosso, piel de limón." },
  { name: "Dirty Martini", desc: "Vodka o Gin premium, Vermouth Dry, salmuera de aceitunas, clásico decorado." },
  { name: "Vesper Martini", desc: "Gin, Vodka, Lillet Blanc (o vermouth francés), piel de limón." }
];

const CUBATAS_LIST = [
  { name: "Fernet Cola", desc: "El clásico argentino. Fernet Branca, bebida cola, hielo rolito." },
  { name: "Campari Orange", desc: "Campari, jugo de naranja dulce, rodaja de naranja." },
  { name: "Cuba Libre", desc: "Ron dorado, bebida cola, dash y twist de lima fresca." },
  { name: "Cynar Pomelo", desc: "Cynar, gaseosa o jugo de pomelo, rodaja de pomelo rosado." },
  { name: "Gancia Batido", desc: "Gancia, jugo de limón, azúcar, batido con abundante hielo." },
  { name: "Vodka Saborizado", desc: "Vodka premium acompañado de energizante o jugos naturales." },
  { name: "Vermuth", desc: "Vermuth Rosso o Bianco, soda, rodaja de limón o naranja." },
  { name: "Gin Tonic Clásico", desc: "Gin London Dry, agua tónica, rodaja de limón o pepino." },
  { name: "Negroni", desc: "Gin, Campari, Vermouth Rosso, piel de naranja." },
  { name: "Tom Collins", desc: "Gin, jugo de limón, almíbar simple, soda." }
];

const BAR_TIERS = [
  {
    name: "Starter",
    subtitle: "Para reuniones relajadas",
    features: [
      "Servicio por 4 horas",
      "Coctelería de método directo",
      "Incluye cerveza y bebidas s/alcohol",
      "10 opciones fijas de tragos en carta",
      "Cristalería estándar (trago corto y largo)",
      "Garnish clásico (Limón, Pepino, Romero)",
      "Hielo rolito tradicional"
    ]
  },
  {
    name: "Premium",
    subtitle: "La experiencia recomendada",
    features: [
      "Servicio extendido por 6 horas",
      "Marcas líderes y etiquetas importadas",
      "Incluye cervezas premium y espumantes",
      "15 opciones en carta (incluye Cubatas especiales)",
      "Cristalería fina de vidrio y copones",
      "Garnish botánico orgánico y deshidratados",
      "Hielo cristalino artesanal y en esferas"
    ]
  },
  {
    name: "VIP",
    subtitle: "Nivel boutique",
    features: [
      "Duración libre sin límite de horas",
      "100% de la barra con etiquetas Ultra Premium",
      "Carta de autor diseñada 100% a medida",
      "Bandejeo de bebibas y atención en mesa",
      "Cristalería de autor",
      "Garnish exótico y humos aromatizantes en vivo",
      "Incluye mocktails y/o bebidas sin alcohol"
    ]
  }
];

interface DrinksPopupProps {
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const DrinksPopup: FC<DrinksPopupProps> = ({ onClose, onNext, onPrev }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300"
      style={{ background: "rgba(13,13,15,0.85)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      {onPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-5xl p-4 transition-colors z-[110] font-light hidden sm:block"
          style={{ color: "rgba(245,240,232,0.5)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
        >
          ‹
        </button>
      )}
      {onNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-5xl p-4 transition-colors z-[110] font-light hidden sm:block"
          style={{ color: "rgba(245,240,232,0.5)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
        >
          ›
        </button>
      )}

      <div
        className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto p-10 rounded-sm"
        style={{ background: "#1a1a26", border: "1px solid rgba(201,168,76,0.3)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl transition-colors duration-300 z-10"
          style={{ color: "rgba(245,240,232,0.5)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
        >
          ✕
        </button>

        <SectionLabel text="Nuestros Planes" centered />
        <h2
          className="text-center font-light leading-[1.1] mb-10"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", color: "#f5f0e8" }}
        >
          Servicio de <em style={{ fontStyle: "italic", color: "#e8c97a" }}>Barras Móviles</em>
        </h2>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {BAR_TIERS.map(tier => (
            <div key={tier.name} className="p-7 rounded-sm flex flex-col h-full transition-transform duration-300 hover:-translate-y-1" style={{ background: "rgba(201,168,76,0.03)", border: "1px solid rgba(201,168,76,0.18)" }}>
              <h3 className="text-2xl mb-1 text-center font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c" }}>{tier.name}</h3>
              <p className="text-[10px] tracking-widest mb-7 text-center uppercase" style={{ color: "rgba(245,240,232,0.4)" }}>{tier.subtitle}</p>
              <ul className="text-[13px] leading-loose text-left flex-1" style={{ color: "rgba(245,240,232,0.7)" }}>
                {tier.features.map((f, i) => (
                  <li key={i} className="mb-3 flex items-start gap-4">
                    <span className="text-[9px] mt-[6px]" style={{ color: "#c9a84c" }}>◈</span>
                    <span className="flex-1">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <SectionLabel text="Nuestra Selección" centered />
        <h2
          className="text-center font-light leading-[1.1] mb-10"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", color: "#f5f0e8" }}
        >
          Cubatas<em style={{ fontStyle: "italic", color: "#e8c97a" }}> Clásicas</em>
        </h2>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          {CUBATAS_LIST.map((drink) => (
            <div key={drink.name} style={{ borderBottom: "1px solid rgba(201,168,76,0.1)", paddingBottom: "1rem" }}>
              <h4
                className="text-lg mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c" }}
              >
                {drink.name}
              </h4>
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(245,240,232,0.6)" }}>
                {drink.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 mb-10">
          <SectionLabel text="Tragos Elaborados" centered />
          <h2
            className="text-center font-light leading-[1.1] mt-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", color: "#f5f0e8" }}
          >
            Coctelería<em style={{ fontStyle: "italic", color: "#e8c97a" }}> Clásica</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          {DRINKS_LIST.map((drink) => (
            <div key={drink.name} style={{ borderBottom: "1px solid rgba(201,168,76,0.1)", paddingBottom: "1rem" }}>
              <h4
                className="text-lg mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c" }}
              >
                {drink.name}
              </h4>
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(245,240,232,0.6)" }}>
                {drink.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 mb-10">
          <SectionLabel text="Tragos de Autor" centered />
          <h2
            className="text-center font-light leading-[1.1] mt-6 mb-4"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", color: "#f5f0e8" }}
          >
            Coctelería<em style={{ fontStyle: "italic", color: "#e8c97a" }}> VIP</em>
          </h2>
          <p className="text-center max-w-lg mx-auto text-[13px] leading-relaxed" style={{ color: "rgba(245,240,232,0.6)" }}>
            Incluye todas las cubatas y coctelería clásica + los tragos seleccionados a continuación.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          {VIP_LIST.map((drink) => (
            <div key={drink.name} style={{ borderBottom: "1px solid rgba(201,168,76,0.1)", paddingBottom: "1rem" }}>
              <h4
                className="text-lg mb-1"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a84c" }}
              >
                {drink.name}
              </h4>
              <p className="text-[13px] leading-relaxed" style={{ color: "rgba(245,240,232,0.6)" }}>
                {drink.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile arrows inside the modal bottom */}
        <div className="flex justify-between mt-8 sm:hidden">
          {onPrev && (
            <button onClick={onPrev} className="text-[18px]" style={{ color: "#c9a84c" }}>‹ Anterior</button>
          )}
          {onNext && (
            <button onClick={onNext} className="text-[18px]" style={{ color: "#c9a84c" }}>Siguiente ›</button>
          )}
        </div>

        <div className="mt-8 text-center hidden sm:block">
          <PrimaryBtn onClick={onClose}>Cerrar Carta</PrimaryBtn>
        </div>
      </div>
    </div>
  );
};

// ─── Service Popup ───────────────────────────────────────────
interface ServicePopupProps {
  service: ServiceItem;
  onClose: () => void;
  onContact: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const ServicePopup: FC<ServicePopupProps> = ({ service, onClose, onContact, onNext, onPrev }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300"
      style={{ background: "rgba(13,13,15,0.85)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      {onPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 text-5xl p-4 transition-colors z-[110] font-light hidden sm:block"
          style={{ color: "rgba(245,240,232,0.5)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
        >
          ‹
        </button>
      )}
      {onNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 text-5xl p-4 transition-colors z-[110] font-light hidden sm:block"
          style={{ color: "rgba(245,240,232,0.5)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
        >
          ›
        </button>
      )}

      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto p-10 rounded-sm flex flex-col items-center"
        style={{ background: "#1a1a26", border: "1px solid rgba(201,168,76,0.3)", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-2xl transition-colors duration-300 z-10"
          style={{ color: "rgba(245,240,232,0.5)", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}
        >
          ✕
        </button>

        {service.popupInfo?.image && (
          <div className="w-full aspect-video mb-8 relative rounded-sm overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.2)" }}>
            <img
              src={service.popupInfo.image}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(26,26,38,1) 0%, transparent 40%)" }} />
          </div>
        )}

        <SectionLabel text="Detalles del Servicio" centered />
        <h2
          className="text-center font-light leading-[1.1] mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", color: "#f5f0e8" }}
        >
          {service.name}
        </h2>

        <p className="text-[14px] leading-relaxed text-center mb-8 max-w-lg" style={{ color: "rgba(245,240,232,0.7)" }}>
          {service.popupInfo?.desc || service.description}
        </p>

        {/* Mobile arrows inside the modal bottom */}
        <div className="flex justify-between w-full mb-8 sm:hidden px-4">
          {onPrev && (
            <button onClick={onPrev} className="text-[18px]" style={{ color: "#c9a84c" }}>‹ Anterior</button>
          )}
          {onNext && (
            <button onClick={onNext} className="text-[18px]" style={{ color: "#c9a84c" }}>Siguiente ›</button>
          )}
        </div>

        <div className="flex flex-wrap gap-4 justify-center w-full">
          <PrimaryBtn onClick={onContact}>Cotizá tu evento</PrimaryBtn>
        </div>
      </div>
    </div>
  );
};

// ─── Services ────────────────────────────────────────────────
const Services: FC = () => {
  const [activePopupIndex, setActivePopupIndex] = useState<number | null>(null);
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const closePopups = () => {
    setActivePopupIndex(null);
  };

  const handleContact = () => {
    closePopups();
    setTimeout(() => scrollTo("contacto"), 300);
  };

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
            <ServiceCard
              service={svc}
              onCta={() => {
                if (svc.cta === "Ver carta de tragos" || svc.popupInfo) {
                  setActivePopupIndex(i);
                } else {
                  scrollTo("contacto");
                }
              }}
            />
          </FadeIn>
        ))}
      </div>

      {activePopupIndex !== null && SERVICES[activePopupIndex].cta === "Ver carta de tragos" && (
        <DrinksPopup
          onClose={closePopups}
          onNext={() => setActivePopupIndex((activePopupIndex + 1) % SERVICES.length)}
          onPrev={() => setActivePopupIndex((activePopupIndex - 1 + SERVICES.length) % SERVICES.length)}
        />
      )}
      {activePopupIndex !== null && SERVICES[activePopupIndex].cta !== "Ver carta de tragos" && (
        <ServicePopup
          service={SERVICES[activePopupIndex]}
          onClose={closePopups}
          onContact={handleContact}
          onNext={() => setActivePopupIndex((activePopupIndex + 1) % SERVICES.length)}
          onPrev={() => setActivePopupIndex((activePopupIndex - 1 + SERVICES.length) % SERVICES.length)}
        />
      )}
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

const BRANDS: { name: string; logo: string; height?: number }[] = [
  { name: "Campari", logo: "/assets/brands/campari.svg" },
  { name: "Aperol", logo: "/assets/brands/aperol.svg" },
  { name: "Absolut Vodka", logo: "/assets/brands/absolut.svg" },
  { name: "Jose Cuervo", logo: "/assets/brands/jose-cuervo.svg" },
  { name: "Heineken", logo: "/assets/brands/heineken.png" },
];

const BrandCarousel: FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  const items = [...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS];
  const LOGO_H = 64;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let lastTime: number;

    if (el.scrollLeft === 0) {
      el.scrollLeft = el.scrollWidth / 4;
    }

    const scroll = (time: number) => {
      if (!lastTime) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      if (!isHovered && !isDragging.current) {
        el.scrollLeft += dt * 0.045;
      }

      if (!isDragging.current) {
        const singleCopyWidth = el.scrollWidth / 4;
        if (el.scrollLeft >= singleCopyWidth * 3) {
          el.scrollLeft -= singleCopyWidth;
        } else if (el.scrollLeft <= singleCopyWidth / 2) {
          el.scrollLeft += singleCopyWidth;
        }
      }

      animId = requestAnimationFrame(scroll);
    };
    animId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsHovered(true);
    if (!scrollRef.current) return;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2.2;
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    setIsHovered(true);
    if (!scrollRef.current) return;
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2.2;
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  return (
    <section className="py-20 px-8 md:px-16 overflow-hidden select-none">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="mb-10 text-center">
          <SectionTitle>
            Marcas con las que<br />
            <em style={{ fontStyle: "italic", color: "#e8c97a" }}>trabajamos</em>
          </SectionTitle>
        </FadeIn>

        <div
          className="mt-12 rounded-2xl overflow-hidden"
          style={{
            background: "rgba(207, 198, 198, 1)",
            border: "1px solid rgba(220,220,240,0.18)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            boxShadow: "0 4px 32px 0 rgba(220,220,240,0.06), inset 0 1px 0 rgba(255,255,255,0.12)",
          }}
        >
          <div
            className="w-full flex overflow-x-auto hide-scrollbar py-5"
            ref={scrollRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
            style={{ cursor: isDragging.current ? "grabbing" : isHovered ? "grab" : "default" }}
          >
            <div className="flex gap-14 items-center px-6" style={{ width: "max-content" }}>
              {items.map((brand, i) => (
                <div
                  key={`${brand.name}-${i}`}
                  className="flex items-center justify-center min-w-[180px]"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-auto object-contain pointer-events-none"
                    style={{ height: LOGO_H }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
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
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="w-full h-full object-cover transition-transform duration-700"
          style={{ opacity: 0.6, transform: hovered ? "scale(1.1)" : "scale(1)" }}
        />
      </div>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,13,15,0.95) 0%, rgba(13,13,15,0.1) 80%)" }} />
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

// ─── Gallery ──────────────────────────────────────────────────
const GALLERY_IMAGES = [
  "/assets/gallery/gallery_4.jpg",
  "/assets/gallery/gallery_3.jpg",
  "/assets/gallery/gallery_6.jpg",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=800",
  "/assets/gallery/gallery_7.jpg",
  "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800",
  "/assets/gallery/gallery_2.jpg",
  "/assets/gallery/gallery_1.jpg",
  "/assets/gallery/gallery_5.jpg"
];

const Gallery: FC = () => (
  <section id="galeria" className="py-28 px-8 md:px-16" style={{ background: "#0d0d0f" }}>
    <div className="max-w-6xl mx-auto">
      <FadeIn className="text-center mb-16">
        <SectionLabel text="Portfolio" centered />
        <SectionTitle>
          Nuestros<br />
          <em style={{ fontStyle: "italic", color: "#e8c97a" }}>momentos</em>
        </SectionTitle>
        <p className="mt-5 text-sm leading-loose max-w-xl mx-auto" style={{ color: "rgba(245,240,232,0.5)" }}>
          Un recorrido visual por algunos de los eventos que hemos diseñado y producido.
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GALLERY_IMAGES.map((src, i) => (
          <FadeIn key={i} delay={i * 0.1}>
            <div
              className="relative overflow-hidden group aspect-[4/5] sm:aspect-square lg:aspect-[4/5] w-full"
              style={{ background: "#1a1a26", border: "1px solid rgba(201,168,76,0.18)" }}
            >
              <img
                src={src}
                alt={`Evento de Coolibreat ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ opacity: 0.85 }}
              />
              <div
                className="absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                style={{ background: "linear-gradient(to top, rgba(13,13,15,0.9) 0%, transparent 50%)" }}
              />
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  </section>
);

// ─── Testimonials ─────────────────────────────────────────────
const Testimonials: FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let lastTime: number;

    if (el.scrollLeft === 0) {
      el.scrollLeft = el.scrollWidth / 4;
    }

    const scroll = (time: number) => {
      if (!lastTime) lastTime = time;
      const dt = time - lastTime;
      lastTime = time;

      if (!isHovered && !isDragging.current) {
        el.scrollLeft += dt * 0.05;
      }

      if (!isDragging.current) {
        const singleCopyWidth = el.scrollWidth / 4;
        if (el.scrollLeft >= singleCopyWidth * 3) {
          el.scrollLeft -= singleCopyWidth;
        } else if (el.scrollLeft <= singleCopyWidth / 2) {
          el.scrollLeft += singleCopyWidth;
        }
      }

      animId = requestAnimationFrame(scroll);
    };
    animId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    setIsHovered(true);
    if (!scrollRef.current) return;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    setIsHovered(true);
    if (!scrollRef.current) return;
    startX.current = e.touches[0].pageX - scrollRef.current.offsetLeft;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  return (
    <section className="pt-8 pb-28 md:pt-12 overflow-hidden select-none relative">
      <div className="max-w-6xl mx-auto px-8 md:px-16 mb-16 flex justify-between items-end flex-wrap gap-6">
        <FadeIn>
          <SectionLabel text="Lo que dicen" />
          <SectionTitle>
            Voces que<br />
            <em style={{ fontStyle: "italic", color: "#e8c97a" }}>nos inspiran</em>
          </SectionTitle>
        </FadeIn>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div
        className="w-full flex overflow-x-auto hide-scrollbar"
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleMouseUp}
        onTouchMove={handleTouchMove}
        style={{ cursor: isDragging.current ? "grabbing" : (isHovered ? "grab" : "default") }}
      >
        <div className="flex gap-5 px-5" style={{ width: "max-content" }}>
          {[...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <div key={`${t.author}-${i}`} className="w-[320px] md:w-[380px] shrink-0">
              <TestimonialCard item={t} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  item: TestimonialItem;
}

const TestimonialCard: FC<TestimonialCardProps> = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="relative p-10 transition-colors duration-300 h-full"
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
const EMAILJS_SERVICE_ID = "service_47x2vlk";
const EMAILJS_TEMPLATE_ID = "template_4fgtfgj";
const EMAILJS_PUBLIC_KEY = "LbUJ2NNvj98WobDek";

const Contact: FC = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", type: "", date: "", guests: "", message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      alert("Por favor completá al menos tu nombre, email y mensaje.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            name: form.name,
            email: form.email,
            phone: form.phone,
            type: form.type,
            date: form.date,
            guests: form.guests,
            message: form.message,
          },
        }),
      });
      if (!res.ok) throw new Error("Error al enviar");
      setStatus("success");
      setForm({ name: "", email: "", phone: "", type: "", date: "", guests: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

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
            { label: "WhatsApp", content: <a href="https://wa.me/5492945689890" target="_blank" rel="noreferrer" className="transition-colors duration-300" style={{ color: "rgba(245,240,232,0.5)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.5)")}>Escribinos por WhatsApp</a> },
          ].map((item) => (
            <div key={item.label} className="py-5 text-sm" style={{ borderBottom: "1px solid rgba(201,168,76,0.18)" }}>
              <h3 className="font-normal mb-1" style={{ color: "#f5f0e8", letterSpacing: "0.05em" }}>
                {item.label}
              </h3>
              {item.content}
            </div>
          ))}
        </FadeIn>

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
            {status === "loading" ? "Enviando..." : "Enviar consulta"}
          </PrimaryBtn>

          {status === "success" && (
            <p className="text-sm text-center mt-2" style={{ color: "#c9a84c", letterSpacing: "0.05em" }}>
              ✦ ¡Mensaje enviado! Te contactamos en menos de 24hs.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-center mt-2" style={{ color: "#e07070", letterSpacing: "0.05em" }}>
              Hubo un error al enviar. Intentá de nuevo o escribinos por WhatsApp.
            </p>
          )}
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
    { label: "Galería", id: "galeria" },
    { label: "Contacto", id: "contacto" },
  ];

  return (
    <footer className="py-10 px-8 md:px-16" style={{ background: "#13131a", borderTop: "1px solid rgba(201,168,76,0.18)" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start gap-2 justify-self-center md:justify-self-start">
          <button onClick={() => scrollTo("inicio")} className="flex items-center gap-3 w-max">
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
          <p className="text-[11px] tracking-wide" style={{ color: "rgba(245,240,232,0.22)" }}>
            © 2026 Coolibreat. Todos los derechos reservados.
          </p>
        </div>

        <ul className="flex flex-wrap md:flex-nowrap justify-center gap-5 md:gap-7 list-none justify-self-center">
          {links.map((l) => (
            <li key={l.id}>
              <button
                onClick={() => scrollTo(l.id)}
                className="text-[11px] tracking-[0.15em] uppercase transition-colors duration-300 whitespace-nowrap"
                style={{ color: "rgba(245,240,232,0.4)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.4)")}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="hidden md:block"></div>
      </div>
    </footer>
  );
};

// ─── Floating WhatsApp ─────────────────────────────────────────
const FloatingWhatsApp: FC = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://wa.me/5492945689890"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[999] flex items-center justify-center rounded-full transition-all duration-300"
      style={{
        width: "60px",
        height: "60px",
        background: hovered ? "#20b15a" : "#25d366",
        boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
        transform: hovered ? "scale(1.05)" : "scale(1)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Contactanos por WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="#ffffff" viewBox="0 0 16 16">
        <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
      </svg>
    </a>
  );
};

// ─── App ─────────────────────────────────────────────────────
export default function App() {
  const LOGO_PRIMARY_SRC = "/assets/logos/logo1.png";
  const LOGO_SECONDARY_SRC = "/assets/logos/logo2.png";

  return (
    <>
      {/* Global keyframes injected once */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes floatBird { 0%,100% { transform:translate(-50%,-50%) rotate(-2deg); } 50% { transform:translate(-50%,-54%) rotate(2deg); } }
        @keyframes rotateSlow { to { transform:rotate(360deg); } }
        @keyframes scrollPulse { 0% { transform:scaleY(0); transform-origin:top; opacity:0; } 50% { transform:scaleY(1); transform-origin:top; opacity:1; } 100% { transform:scaleY(1); transform-origin:bottom; opacity:0; } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(calc(-50% - 10px)); } }
        .animate-marquee-hover:hover { animation-play-state: paused !important; }
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
        <BrandCarousel />
        <ExperienceStrip />
        <Ambiance />
        <Process />
        <Gallery />
        <Testimonials />
        <CtaBanner logoPrimarySrc={LOGO_PRIMARY_SRC} logoSecondarySrc={LOGO_SECONDARY_SRC} />
        <Contact />
      </main>
      <FloatingWhatsApp />
      <Footer logoPrimarySrc={LOGO_PRIMARY_SRC} logoSecondarySrc={LOGO_SECONDARY_SRC} />
    </>
  );
}
