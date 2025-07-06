"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
import { FaUser, FaStar, FaTimes } from "react-icons/fa";

function smoothScrollTo(targetY: number, duration = 600) {
  const startY = window.scrollY;
  const diff = targetY - startY;
  let start: number | null = null;
  function easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }
  function step(timestamp: number) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    window.scrollTo(0, startY + diff * ease);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }
  window.requestAnimationFrame(step);
}

function useSectionAnimation() {
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
          }
        });
      },
      { threshold: 0.18 }
    );
    refs.current.forEach((el) => {
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
  return refs;
}

const BENEFITS = [
  {
    icon: "🤖",
    title: "Automatización 24/7",
    desc: "Tus clientes reciben atención inmediata en cualquier momento."
  },
  {
    icon: "💬",
    title: "Respuestas Inteligentes",
    desc: "IA que entiende y responde como un humano experto."
  },
  {
    icon: "📈",
    title: "Aumenta Ventas",
    desc: "Convierte más leads con atención instantánea y personalizada."
  },
  {
    icon: "🌎",
    title: "Multi-idioma",
    desc: "Atiende clientes en español, inglés y más."
  },
  {
    icon: "⚡",
    title: "Integración Rápida",
    desc: "Activa tu agente en minutos, sin complicaciones."
  },
  {
    icon: "🔒",
    title: "Seguro y Privado",
    desc: "Protegemos la información de tus clientes."
  },
  {
    icon: "📊",
    title: "Estadísticas en Vivo",
    desc: "Monitorea el desempeño de tu agente en tiempo real."
  },
  {
    icon: "🛠️",
    title: "Personalizable",
    desc: "Adapta el agente a tu negocio y sector."
  },
  {
    icon: "🤝",
    title: "Soporte Humano",
    desc: "Siempre tendrás ayuda de nuestro equipo."
  }
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState('agents');
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const navbar = document.querySelector(`.${styles.navbar}`);
    const navHeight = navbar ? navbar.clientHeight : 64;
    const handleNavClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "A" && (target as HTMLAnchorElement).getAttribute("href")?.startsWith("#")) {
        setMenuOpen(false); // Cierra el menú en móvil al navegar
        const id = (target as HTMLAnchorElement).getAttribute("href")!.slice(1);
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault?.();
          const y = el.getBoundingClientRect().top + window.scrollY - navHeight - 8;
          smoothScrollTo(y, 700);
        }
      }
    };
    const nav = document.querySelector(`.${styles.navLinks}`);
    nav?.addEventListener("click", handleNavClick);
    return () => nav?.removeEventListener("click", handleNavClick);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  const sectionRefs = useSectionAnimation();

  return (
    <div className={styles.page}>
      <div className={styles.navbar} ref={navRef}>
        <div className={styles.logo}>
          <Image 
            src="/logo.jpg" 
            alt="Colnexa Logo" 
            width={120} 
            height={40} 
            priority
          />
        </div>
        <nav className={styles.navLinks}>
          <a href="#inicio">Inicio</a>
          <a href="#servicios">Servicios</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <div className={styles.navActions}>
          <a className={styles.loginBtn} href="/login"><FaUser style={{marginRight:8}}/>Iniciar sesión</a>
          <a className={styles.registerBtn} href="/register"><FaStar style={{marginRight:8}}/>Registrarse</a>
        </div>
        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span />
          <span />
          <span />
        </div>
        {menuOpen && (
          <div className={styles.mobileMenu}>
            <button className={styles.mobileMenuClose} onClick={() => setMenuOpen(false)} aria-label="Cerrar menú">
              <FaTimes size={22} />
            </button>
            <a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
            <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
            <a href="#contacto" onClick={() => setMenuOpen(false)}>Contacto</a>
            <a className={styles.mobileLoginBtn} href="/login" onClick={() => setMenuOpen(false)}><FaUser style={{marginRight:8}}/>Iniciar sesión</a>
            <a className={styles.mobileRegisterBtn} href="/register" onClick={() => setMenuOpen(false)}><FaStar style={{marginRight:8}}/>Registrarse</a>
          </div>
        )}
      </div>
      <div className={styles.bgShapes} aria-hidden />
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section
          id="inicio"
          className={styles.heroSection}
          ref={el => { sectionRefs.current[0] = el; }}
        >
          <div className={styles.heroBgWaves} aria-hidden>
            <svg width="100%" height="100%" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}}>
              <path d="M0,160L60,154.7C120,149,240,139,360,154.7C480,171,600,213,720,229.3C840,245,960,235,1080,208C1200,181,1320,139,1380,117.3L1440,96L1440,400L1380,400C1320,400,1200,400,1080,400C960,400,840,400,720,400C600,400,480,400,360,400C240,400,120,400,60,400L0,400Z" fill="#0471B6" fillOpacity="0.13"/>
              <path d="M0,256L60,229.3C120,203,240,149,360,154.7C480,160,600,224,720,229.3C840,235,960,181,1080,154.7C1200,128,1320,128,1380,128L1440,128L1440,400L1380,400C1320,400,1200,400,1080,400C960,400,840,400,720,400C600,400,480,400,360,400C240,400,120,400,60,400L0,400Z" fill="#25d366" fillOpacity="0.10"/>
              <path d="M0,320L60,293.3C120,267,240,213,360,197.3C480,181,600,203,720,208C840,213,960,203,1080,197.3C1200,192,1320,192,1380,192L1440,192L1440,400L1380,400C1320,400,1200,400,1080,400C960,400,840,400,720,400C600,400,480,400,360,400C240,400,120,400,60,400L0,400Z" fill="#0471B6" fillOpacity="0.10"/>
            </svg>
          </div>
          <div className={styles.heroContent}>
            <Image
              className={styles.heroImage}
              src="/globe.svg"
              alt="IA para WhatsApp"
              width={140}
              height={140}
              priority
            />
            <h1 className={styles.title}>
              <span className={styles.gradientText}>Impulsa tu negocio</span><br />
              con Agentes de IA en WhatsApp
            </h1>
            <p className={styles.description}>
              Automatiza ventas, soporte y atención al cliente 24/7 con agentes inteligentes. Fácil, rápido y personalizado para tu empresa.
            </p>
            <a
              className={styles.whatsappBtn}
              href="https://wa.me/5212345678901"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path fill="#fff" d="M12 2C6.477 2 2 6.477 2 12c0 1.85.504 3.58 1.38 5.07L2 22l5.13-1.36A9.953 9.953 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2Zm0 18a7.95 7.95 0 0 1-4.07-1.13l-.29-.17-3.04.8.81-2.97-.18-.3A7.95 7.95 0 0 1 4 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8Zm4.43-5.29c-.24-.12-1.41-.7-1.63-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.92-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.12-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32 1 2.48.14.16 1.7 2.7 4.13 3.68.58.24 1.03.38 1.38.48.58.18 1.1.16 1.52.1.46-.07 1.41-.58 1.61-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"/></svg>
              <span>¡Quiero mi agente IA!</span>
            </a>
          </div>
        </section>

        {/* Nuestros Servicios - Sección Unificada */}
        <section id="servicios" className={styles.servicesSection}>
          <h2 className={styles.sectionTitle}>Nuestros Servicios</h2>
          <p className={styles.sectionDescription}>
            Soluciones integrales de tecnología para hacer crecer tu negocio
          </p>

          {/* Navegación de Servicios */}
          <div className={styles.serviceNavigation}>
            <button 
              className={`${styles.serviceTab} ${activeService === 'agents' ? styles.serviceTabActive : ''}`}
              onClick={() => setActiveService('agents')}
            >
              🤖 Agentes IA
            </button>
            <button 
              className={`${styles.serviceTab} ${activeService === 'web' ? styles.serviceTabActive : ''}`}
              onClick={() => setActiveService('web')}
            >
              💻 Desarrollo de Software
            </button>
            <button 
              className={`${styles.serviceTab} ${activeService === 'infrastructure' ? styles.serviceTabActive : ''}`}
              onClick={() => setActiveService('infrastructure')}
            >
              🏢 Infraestructura IT
            </button>
          </div>

          {/* Contenido de Servicios */}
          <div className={styles.serviceContent}>
            {/* Agentes IA */}
            {activeService === 'agents' && (
              <div className={styles.servicePanel}>
                <h3 className={styles.servicePanelTitle}>Agentes de Inteligencia Artificial</h3>
                <p className={styles.servicePanelDescription}>
                  Automatiza tu atención al cliente con IA avanzada disponible 24/7
                </p>
                
                <div className={styles.benefitsRow}>
                  {BENEFITS.map((b, i) => (
                    <div className={styles.benefitCard} key={i}>
                      <span className={styles.benefitIcon}>{b.icon}</span>
                      <h3>{b.title}</h3>
                      <p>{b.desc}</p>
                    </div>
                  ))}
                </div>

                <div className={styles.serviceCTA}>
                  <button className={styles.whatsappBtn}>
                    💬 Consultar por WhatsApp
                  </button>
                </div>
              </div>
            )}

            {/* Desarrollo de Software */}
            {activeService === 'web' && (
              <div className={styles.servicePanel}>
                <h3 className={styles.servicePanelTitle}>Desarrollo de Software</h3>
                <p className={styles.servicePanelDescription}>
                  Creamos soluciones web y aplicaciones a medida para tu negocio
                </p>
                
                <div className={styles.webBenefitsRow}>
                  <div className={styles.webBenefitCard}>
                    <span className={styles.webBenefitIcon}>🎨</span>
                    <h3>Diseño Moderno</h3>
                    <p>Interfaces atractivas y responsivas que cautivan a tus usuarios</p>
                  </div>
                  <div className={styles.webBenefitCard}>
                    <span className={styles.webBenefitIcon}>⚡</span>
                    <h3>Rendimiento Optimizado</h3>
                    <p>Aplicaciones rápidas y eficientes para la mejor experiencia</p>
                  </div>
                  <div className={styles.webBenefitCard}>
                    <span className={styles.webBenefitIcon}>🔒</span>
                    <h3>Seguridad Avanzada</h3>
                    <p>Protección de datos y transacciones con estándares empresariales</p>
                  </div>
                </div>

                <div className={styles.webPlansRow}>
                  <div className={styles.webPlanCard}>
                    <h3>Landing Page</h3>
                    <p>Página web profesional para presentar tu negocio</p>
                    <ul>
                      <li>Diseño responsivo</li>
                      <li>SEO optimizado</li>
                      <li>Formulario de contacto</li>
                      <li>Integración redes sociales</li>
                    </ul>
                    <button className={styles.priceBtn}>Consultar</button>
                  </div>
                  
                  <div className={styles.webPlanCard}>
                    <h3>Web Corporativa</h3>
                    <p>Sitio web completo con múltiples secciones y funcionalidades</p>
                    <ul>
                      <li>Múltiples páginas</li>
                      <li>Panel de administración</li>
                      <li>Blog integrado</li>
                      <li>Analytics incluido</li>
                    </ul>
                    <button className={styles.priceBtn}>Consultar</button>
                  </div>
                  
                  <div className={styles.webPlanCard}>
                    <h3>Tienda Online</h3>
                    <p>E-commerce completo para vender tus productos en línea</p>
                    <ul>
                      <li>Catálogo de productos</li>
                      <li>Carrito de compras</li>
                      <li>Pasarela de pagos</li>
                      <li>Gestión de inventario</li>
                    </ul>
                    <button className={styles.priceBtn}>Consultar</button>
                  </div>
                </div>
              </div>
            )}

            {/* Infraestructura IT */}
            {activeService === 'infrastructure' && (
              <div className={styles.servicePanel}>
                <h3 className={styles.servicePanelTitle}>Infraestructura IT</h3>
                <p className={styles.servicePanelDescription}>
                  Soluciones integrales de cloud, datacenter y networking personalizadas para tu empresa
                </p>
                
                <div className={styles.infrastructureBenefitsRow}>
                  <div className={styles.infrastructureBenefitCard}>
                    <span className={styles.infrastructureBenefitIcon}>☁️</span>
                    <h3>Servicios Cloud</h3>
                    <p>Migración, configuración y gestión de infraestructura en la nube</p>
                  </div>
                  <div className={styles.infrastructureBenefitCard}>
                    <span className={styles.infrastructureBenefitIcon}>🌐</span>
                    <h3>Redes y Conectividad</h3>
                    <p>Configuración de redes empresariales, VPNs y conectividad segura</p>
                  </div>
                  <div className={styles.infrastructureBenefitCard}>
                    <span className={styles.infrastructureBenefitIcon}>🛡️</span>
                    <h3>Firewall y Seguridad</h3>
                    <p>Configuración avanzada de firewalls, VPNs y políticas de seguridad</p>
                  </div>
                  <div className={styles.infrastructureBenefitCard}>
                    <span className={styles.infrastructureBenefitIcon}>⚡</span>
                    <h3>Virtualización</h3>
                    <p>VMware, Hyper-V, contenedores Docker y gestión optimizada</p>
                  </div>
                  <div className={styles.infrastructureBenefitCard}>
                    <span className={styles.infrastructureBenefitIcon}>📊</span>
                    <h3>Monitoreo 24/7</h3>
                    <p>Sistemas de monitoreo, alertas y backup automático</p>
                  </div>
                  <div className={styles.infrastructureBenefitCard}>
                    <span className={styles.infrastructureBenefitIcon}>🔧</span>
                    <h3>Consultoría y Migración</h3>
                    <p>Asesoría especializada y migración segura de infraestructura</p>
                  </div>
                </div>

                <div className={styles.serviceCTA}>
                  <button className={styles.whatsappBtn}>
                    💬 Solicitar Cotización Personalizada
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Contacto */}
        <section id="contacto" className={styles.contactSection}>
          <h2>Contacto</h2>
          <p>¿Tienes dudas? Escríbenos por WhatsApp o envía un correo a <a href="mailto:info@colnexa.com">info@colnexa.com</a></p>
          <div className={styles.contactButtons}>
            <button className={styles.whatsappBtn}>
              💬 WhatsApp
            </button>
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <span>© {new Date().getFullYear()} Colnexa. Todos los derechos reservados.</span>
      </footer>
    </div>
  );
}
