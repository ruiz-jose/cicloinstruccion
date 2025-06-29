// main.js - Diagrama Ciclo de Instrucción Profesional
// Sistema de interacciones avanzado y optimizado
import './style.css'

/**
 * Configuración global de la aplicación
 */
const CONFIG = {
    ANIMATION_DURATION: 300,
    SCROLL_OFFSET: 100,
    INTERSECTION_THRESHOLD: 0.2,
    DEBUG_MODE: false
};

/**
 * Estado global de la aplicación
 */
const AppState = {
    isLoaded: false,
    activePhase: null,
    interactions: {
        phaseClicks: 0,
        scrollEvents: 0,
        timeOnSite: Date.now(),
        sectionsViewed: new Set()
    }
};

/**
 * Utilidades generales
 */
const Utils = {
    // Debounce para optimizar rendimiento
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle para eventos frecuentes
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    // Smooth scroll personalizado
    smoothScrollTo(target, offset = 0) {
        const element = typeof target === 'string' ? document.querySelector(target) : target;
        if (!element) return;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    },

    // Detectar si está en viewport
    isInViewport(element, threshold = 0.5) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;

        const vertInView = (rect.top <= windowHeight * (1 - threshold)) && ((rect.top + rect.height) >= windowHeight * threshold);
        const horInView = (rect.left <= windowWidth * (1 - threshold)) && ((rect.left + rect.width) >= windowWidth * threshold);

        return (vertInView && horInView);
    },

    // Log solo en modo debug
    log(...args) {
        if (CONFIG.DEBUG_MODE) {
            console.log('🔄 [CPU Cycle]', ...args);
        }
    }
};

/**
 * Sistema de navegación mejorado
 */
class NavigationSystem {
    constructor() {
        this.activeSection = null;
        this.isScrolling = false;
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupMobileNavigation();
    }

    setupSmoothScrolling() {
        // Navegación suave para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    Utils.smoothScrollTo(targetElement, CONFIG.SCROLL_OFFSET);
                    
                    // Actualizar URL sin recargar
                    history.pushState(null, null, targetId);
                    
                    // Analytics
                    AppState.interactions.scrollEvents++;
                    Utils.log(`Navegación a ${targetId}`);
                }
            });
        });
    }

    setupActiveNavigation() {
        // Marcar sección activa en la navegación
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
                    const id = entry.target.getAttribute('id');
                    this.setActiveNavLink(id, navLinks);
                    this.activeSection = id;
                    
                    // Track para analytics
                    AppState.interactions.sectionsViewed.add(id);
                }
            });
        }, {
            threshold: [0.3, 0.7],
            rootMargin: '-10% 0px -10% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    setActiveNavLink(activeId, navLinks) {
        navLinks.forEach(link => {
            const href = link.getAttribute('href').substring(1);
            link.classList.toggle('active', href === activeId);
        });
    }

    setupMobileNavigation() {
        // TODO: Implementar navegación móvil si es necesario
        // Por ahora, ocultar enlaces en móvil
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            Utils.log('Modo móvil detectado');
        }
    }
}

/**
 * Sistema de animaciones avanzado
 */
class AnimationSystem {
    constructor() {
        this.observers = new Map();
        this.animatedElements = new Set();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupPhaseAnimations();
        this.setupHoverEffects();
        this.setupProgressiveLoading();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    // Animación escalonada
                    setTimeout(() => {
                        this.animateElement(entry.target);
                        this.animatedElements.add(entry.target);
                    }, index * 150);

                    // Desconectar para optimizar rendimiento
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: CONFIG.INTERSECTION_THRESHOLD,
            rootMargin: '50px 0px -50px 0px'
        });

        // Observar elementos animables
        const animatableElements = document.querySelectorAll(`
            .phase-container,
            .category-card,
            .instruction-type,
            .hero-visual,
            .stat-item
        `);

        animatableElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            observer.observe(el);
        });

        this.observers.set('intersection', observer);
    }

    animateElement(element) {
        element.style.transition = `all ${CONFIG.ANIMATION_DURATION * 2}ms cubic-bezier(0.25, 0.8, 0.25, 1)`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Añadir clase para efectos adicionales
        element.classList.add('animated-in');
    }

    setupPhaseAnimations() {
        const phases = document.querySelectorAll('.phase-container');
        
        phases.forEach((phase, index) => {
            const phaseType = phase.getAttribute('data-phase');
            
            // Hover effects mejorados
            phase.addEventListener('mouseenter', () => {
                this.activatePhase(phase, phaseType);
            });
            
            phase.addEventListener('mouseleave', () => {
                this.deactivatePhase(phase);
            });
            
            // Click effects
            phase.addEventListener('click', () => {
                this.togglePhaseDetails(phase);
                AppState.interactions.phaseClicks++;
                
                // Feedback haptico si está disponible
                this.triggerHapticFeedback();
            });

            // Accesibilidad
            phase.setAttribute('tabindex', '0');
            phase.setAttribute('role', 'button');
            phase.setAttribute('aria-expanded', 'false');
            
            phase.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    phase.click();
                }
            });
        });
    }

    activatePhase(phase, phaseType) {
        phase.style.transform = 'translateY(-12px) scale(1.02)';
        phase.style.zIndex = '10';
        
        // Efecto de brillo en el número
        const phaseNumber = phase.querySelector('.phase-number');
        if (phaseNumber) {
            phaseNumber.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.6)';
            phaseNumber.style.animation = 'pulse 1.5s ease-in-out infinite';
        }

        // Efecto en el icono
        const phaseIcon = phase.querySelector('.phase-icon');
        if (phaseIcon) {
            phaseIcon.style.transform = 'scale(1.2) rotate(10deg)';
        }

        AppState.activePhase = phaseType;
    }

    deactivatePhase(phase) {
        phase.style.transform = 'translateY(0) scale(1)';
        phase.style.zIndex = 'auto';
        
        const phaseNumber = phase.querySelector('.phase-number');
        if (phaseNumber) {
            phaseNumber.style.boxShadow = '';
            phaseNumber.style.animation = '';
        }

        const phaseIcon = phase.querySelector('.phase-icon');
        if (phaseIcon) {
            phaseIcon.style.transform = 'scale(1) rotate(0deg)';
        }

        AppState.activePhase = null;
    }

    togglePhaseDetails(phase) {
        const details = phase.querySelector('.phase-details');
        if (!details) return;

        const isExpanded = phase.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            details.style.maxHeight = '0px';
            details.style.opacity = '0';
            details.style.marginTop = '0px';
            phase.setAttribute('aria-expanded', 'false');
        } else {
            details.style.maxHeight = details.scrollHeight + 'px';
            details.style.opacity = '1';
            details.style.marginTop = 'var(--space-6)';
            phase.setAttribute('aria-expanded', 'true');
        }
    }

    setupHoverEffects() {
        // Efectos para step-items
        const stepItems = document.querySelectorAll('.step-item');
        stepItems.forEach(step => {
            step.addEventListener('mouseenter', (e) => {
                this.createRippleEffect(step, e);
                step.style.borderColor = 'var(--primary-500)';
            });
            
            step.addEventListener('mouseleave', () => {
                step.style.borderColor = 'var(--glass-border)';
            });
        });

        // Efectos para categorías de instrucciones
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.boxShadow = 'var(--shadow-2xl)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = '';
            });
        });
    }

    createRippleEffect(element, event) {
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
            background: rgba(59, 130, 246, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    setupProgressiveLoading() {
        // Carga progresiva de elementos pesados
        const heavyElements = document.querySelectorAll('.floating-card, .mini-cpu');
        
        setTimeout(() => {
            heavyElements.forEach(el => {
                el.classList.add('loaded');
            });
        }, 500);
    }

    triggerHapticFeedback() {
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
}

/**
 * Sistema de performance y analytics
 */
class PerformanceSystem {
    constructor() {
        this.metrics = {
            loadTime: 0,
            interactionCount: 0,
            scrollDepth: 0,
            sessionDuration: 0
        };
        this.init();
    }

    init() {
        this.trackLoadTime();
        this.trackScrollDepth();
        this.trackSessionDuration();
        this.setupBeforeUnload();
    }

    trackLoadTime() {
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            Utils.log(`Página cargada en ${this.metrics.loadTime.toFixed(2)}ms`);
        });
    }

    trackScrollDepth() {
        const throttledScroll = Utils.throttle(() => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight - windowHeight;
            const scrollTop = window.pageYOffset;
            const scrollPercentage = (scrollTop / documentHeight) * 100;
            
            this.metrics.scrollDepth = Math.max(this.metrics.scrollDepth, scrollPercentage);
        }, 250);

        window.addEventListener('scroll', throttledScroll);
    }

    trackSessionDuration() {
        setInterval(() => {
            this.metrics.sessionDuration = Date.now() - AppState.interactions.timeOnSite;
        }, 1000);
    }

    setupBeforeUnload() {
        window.addEventListener('beforeunload', () => {
            const sessionData = {
                loadTime: this.metrics.loadTime,
                sessionDuration: this.metrics.sessionDuration,
                phaseClicks: AppState.interactions.phaseClicks,
                sectionsViewed: AppState.interactions.sectionsViewed.size,
                scrollDepth: this.metrics.scrollDepth,
                device: this.getDeviceType(),
                timestamp: new Date().toISOString()
            };

            Utils.log('Métricas de sesión:', sessionData);
            
            // Enviar analytics si tienes un endpoint
            // this.sendAnalytics(sessionData);
        });
    }

    getDeviceType() {
        const userAgent = navigator.userAgent;
        if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
            return 'tablet';
        }
        if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
            return 'mobile';
        }
        return 'desktop';
    }

    // sendAnalytics(data) {
    //     // Implementar envío a tu servicio de analytics
    //     if (navigator.sendBeacon) {
    //         navigator.sendBeacon('/analytics', JSON.stringify(data));
    //     }
    // }
}

/**
 * Sistema de accesibilidad
 */
class AccessibilitySystem {
    constructor() {
        this.init();
    }

    init() {
        this.respectUserPreferences();
        this.setupKeyboardNavigation();
        this.setupAriaLabels();
        this.setupFocusManagement();
    }

    respectUserPreferences() {
        // Respetar prefer-reduced-motion
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-fast', '0.01ms');
            document.documentElement.style.setProperty('--transition-normal', '0.01ms');
            document.documentElement.style.setProperty('--transition-slow', '0.01ms');
            Utils.log('Movimiento reducido activado para accesibilidad');
        }

        // Detectar preferencia de color
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            Utils.log('Preferencia de modo claro detectada');
        }

        // Alto contraste
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.body.classList.add('high-contrast');
            Utils.log('Alto contraste activado');
        }
    }

    setupKeyboardNavigation() {
        const focusableElements = document.querySelectorAll(`
            .phase-container,
            .category-card,
            .nav-link,
            .instruction-type,
            button,
            a
        `);

        document.addEventListener('keydown', (e) => {
            // Navegación con Tab mejorada
            if (e.key === 'Tab') {
                this.handleTabNavigation(e, focusableElements);
            }
            
            // Navegación con flechas
            if (['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                this.handleArrowNavigation(e, focusableElements);
            }
            
            // Escape para cerrar elementos expandidos
            if (e.key === 'Escape') {
                this.closeExpandedElements();
            }
        });
    }

    handleTabNavigation(event, elements) {
        // Mejoras futuras para navegación con Tab
        // Por ahora, usar comportamiento por defecto
    }

    handleArrowNavigation(event, elements) {
        const currentIndex = Array.from(elements).indexOf(document.activeElement);
        if (currentIndex === -1) return;

        event.preventDefault();
        let nextIndex;

        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowRight':
                nextIndex = Math.min(currentIndex + 1, elements.length - 1);
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
                nextIndex = Math.max(currentIndex - 1, 0);
                break;
        }

        elements[nextIndex].focus();
        elements[nextIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }

    closeExpandedElements() {
        const expandedPhases = document.querySelectorAll('.phase-container[aria-expanded="true"]');
        expandedPhases.forEach(phase => {
            const details = phase.querySelector('.phase-details');
            if (details) {
                details.style.maxHeight = '0px';
                details.style.opacity = '0';
                phase.setAttribute('aria-expanded', 'false');
            }
        });
    }

    setupAriaLabels() {
        // Mejorar etiquetas ARIA
        const phases = document.querySelectorAll('.phase-container');
        phases.forEach((phase, index) => {
            const phaseType = phase.getAttribute('data-phase');
            phase.setAttribute('aria-label', `Fase ${index + 1}: ${phaseType}`);
        });

        const categories = document.querySelectorAll('.category-card');
        categories.forEach(category => {
            const title = category.querySelector('.category-title');
            if (title) {
                category.setAttribute('aria-labelledby', title.textContent);
            }
        });
    }

    setupFocusManagement() {
        // Gestión de foco mejorada
        let focusVisible = false;

        document.addEventListener('keydown', () => {
            focusVisible = true;
        });

        document.addEventListener('mousedown', () => {
            focusVisible = false;
        });

        document.addEventListener('focusin', (e) => {
            if (focusVisible) {
                e.target.setAttribute('data-focus-visible', '');
            }
        });

        document.addEventListener('focusout', (e) => {
            e.target.removeAttribute('data-focus-visible');
        });
    }
}

/**
 * Inicialización principal de la aplicación
 */
class CycleInstructionApp {
    constructor() {
        this.navigation = null;
        this.animations = null;
        this.performance = null;
        this.accessibility = null;
        this.init();
    }

    async init() {
        Utils.log('Inicializando aplicación...');
        
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.startApp());
        } else {
            this.startApp();
        }
    }

    startApp() {
        try {
            // Inicializar sistemas en orden
            this.accessibility = new AccessibilitySystem();
            this.performance = new PerformanceSystem();
            this.navigation = new NavigationSystem();
            this.animations = new AnimationSystem();
            
            // Marcar como cargado
            AppState.isLoaded = true;
            document.body.classList.add('app-loaded');
            
            // Inyectar estilos dinámicos
            this.injectDynamicStyles();
            
            Utils.log('Aplicación inicializada correctamente');
            
        } catch (error) {
            console.error('Error al inicializar la aplicación:', error);
        }
    }

    injectDynamicStyles() {
        const dynamicStyles = `
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.05); }
            }
            
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .app-loaded .phase-container {
                transition: all var(--transition-normal);
            }
            
            [data-focus-visible] {
                outline: 2px solid var(--primary-500) !important;
                outline-offset: 2px !important;
            }
            
            .high-contrast {
                --glass-bg: rgba(255, 255, 255, 0.15);
                --glass-border: rgba(255, 255, 255, 0.3);
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = dynamicStyles;
        document.head.appendChild(styleSheet);
    }
}

// Inicializar la aplicación
const app = new CycleInstructionApp();

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
