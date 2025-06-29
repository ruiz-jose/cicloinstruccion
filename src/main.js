// main.js - Diagrama Ciclo de Instrucción
// Archivo principal con animaciones e interacciones
import './style.css'

/**
 * Inicialización de la aplicación
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🔄 Diagrama Ciclo de Instrucción cargado');
    
    // Inicializar todas las funcionalidades
    initIntersectionObserver();
    initPhaseInteractions();
    initStepItemEffects();
    initKeyboardNavigation();
    initAnalytics();
});

/**
 * Observer para animaciones de entrada progresiva
 */
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.classList.add('animate-in');
                }, index * 200);
                
                // Desconectar después de animar para optimizar rendimiento
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
    });
    
    // Aplicar animaciones a elementos principales
    const animatedElements = document.querySelectorAll('.phase-container, .category-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(el);
    });
}

/**
 * Interacciones mejoradas para las fases
 */
function initPhaseInteractions() {
    const phases = document.querySelectorAll('.phase');
    
    phases.forEach(phase => {
        // Efecto hover mejorado
        phase.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.03)';
            this.style.zIndex = '10';
            
            // Agregar efecto de pulso sutil al número
            const phaseNumber = this.querySelector('.phase-number');
            if (phaseNumber) {
                phaseNumber.style.animation = 'pulse 1s ease-in-out';
            }
        });
        
        phase.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = 'auto';
            
            const phaseNumber = this.querySelector('.phase-number');
            if (phaseNumber) {
                phaseNumber.style.animation = '';
            }
        });
        
        // Click para expandir/colapsar detalles
        phase.addEventListener('click', function() {
            const details = this.parentElement.querySelector('.phase-details');
            if (details) {
                const isExpanded = details.style.maxHeight && details.style.maxHeight !== '0px';
                
                if (isExpanded) {
                    details.style.maxHeight = '0px';
                    details.style.opacity = '0';
                    details.style.marginTop = '0px';
                } else {
                    details.style.maxHeight = details.scrollHeight + 'px';
                    details.style.opacity = '1';
                    details.style.marginTop = '20px';
                }
                
                // Feedback haptico en dispositivos compatibles
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }
        });
        
        // Accesibilidad: navegación por teclado
        phase.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Añadir atributos de accesibilidad
        phase.setAttribute('tabindex', '0');
        phase.setAttribute('role', 'button');
        phase.setAttribute('aria-expanded', 'true');
    });
}

/**
 * Efectos mejorados para step-items
 */
function initStepItemEffects() {
    const stepItems = document.querySelectorAll('.step-item');
    
    stepItems.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            this.style.borderLeftColor = '#22d3ee';
            this.style.borderLeftWidth = '6px';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            
            // Efecto de onda
            createRippleEffect(this, event);
        });
        
        step.addEventListener('mouseleave', function() {
            this.style.borderLeftColor = '#fbbf24';
            this.style.borderLeftWidth = '4px';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
        
        // Animación de entrada secuencial
        setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateX(0)';
        }, index * 100);
        
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        step.style.transition = 'all 0.5s ease';
    });
}

/**
 * Crear efecto de onda al hacer hover
 */
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(34, 211, 238, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
        z-index: 1;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Navegación mejorada por teclado
 */
function initKeyboardNavigation() {
    const focusableElements = document.querySelectorAll('.phase, .category-card, .step-item');
    
    document.addEventListener('keydown', (e) => {
        // Navegación con flechas
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            
            const currentIndex = Array.from(focusableElements).indexOf(document.activeElement);
            if (currentIndex === -1) return;
            
            const nextIndex = e.key === 'ArrowDown' 
                ? Math.min(currentIndex + 1, focusableElements.length - 1)
                : Math.max(currentIndex - 1, 0);
            
            focusableElements[nextIndex].focus();
        }
        
        // Scroll suave al elemento enfocado
        if (document.activeElement && focusableElements.includes(document.activeElement)) {
            document.activeElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
}

/**
 * Analytics y métricas de uso (opcional)
 */
function initAnalytics() {
    // Tracking de interacciones del usuario
    let interactions = {
        phaseClicks: 0,
        timeOnSite: Date.now(),
        sectionsViewed: new Set()
    };
    
    // Track clicks en fases
    document.querySelectorAll('.phase').forEach(phase => {
        phase.addEventListener('click', () => {
            interactions.phaseClicks++;
            console.log(`📊 Interacción: Click en fase (Total: ${interactions.phaseClicks})`);
        });
    });
    
    // Track secciones vistas
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.className.split(' ')[0];
                interactions.sectionsViewed.add(sectionName);
                console.log(`📊 Sección vista: ${sectionName}`);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.phase-container, .execution-section').forEach(section => {
        sectionObserver.observe(section);
    });
    
    // Reporte al salir de la página
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - interactions.timeOnSite) / 1000);
        console.log(`📊 Métricas de sesión:`, {
            tiempoEnSitio: `${timeSpent}s`,
            clicksEnFases: interactions.phaseClicks,
            seccionesVistas: interactions.sectionsViewed.size,
            dispositivo: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'móvil' : 'escritorio'
        });
    });
}

/**
 * Detectar preferencias de usuario
 */
function respectUserPreferences() {
    // Respetar prefer-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.style.setProperty('--transition', 'none');
        console.log('♿ Movimiento reducido activado para accesibilidad');
    }
    
    // Detectar modo oscuro del sistema
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        console.log('☀️ Modo claro del sistema detectado');
    }
}

// Ejecutar detectores de preferencias
respectUserPreferences();

// CSS para animaciones dinámicas
const dynamicStyles = `
@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.animate-in {
    animation: slideInUp 0.8s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

// Inyectar estilos dinámicos
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);
