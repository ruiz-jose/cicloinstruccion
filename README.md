# 🔄 Diagrama Ciclo de Instrucción

Un diagrama interactivo y educativo del ciclo de instrucción de CPU, diseñado para estudiantes de arquitectura de computadores.

## ✨ Características

- **Interactivo**: Animaciones suaves y efectos hover
- **Educativo**: Información detallada de cada fase del ciclo
- **Responsivo**: Optimizado para escritorio y móvil
- **Accesible**: Navegación por teclado y soporte para screen readers
- **Moderno**: Diseño glassmorphism con gradientes y efectos visuales

## 🚀 Demo en Vivo

👉 **[Ver Demo](https://tu-usuario.github.io/cicloinstruccion/)**

## 🛠️ Tecnologías Utilizadas

- **Vite** - Build tool rápido y moderno
- **Vanilla JavaScript** - Sin frameworks, código optimizado
- **CSS3** - Variables, Grid, Flexbox, animaciones
- **GitHub Pages** - Hosting gratuito
- **GitHub Actions** - Despliegue automático

## 📖 Contenido Educativo

### Fases del Ciclo
1. **🎯 Captación (Fetch)**: Obtener instrucción de memoria
2. **🔍 Decodificar**: Analizar la instrucción
3. **⚡ Ejecución**: Ejecutar la operación

### Tipos de Instrucciones
- **📋 Transferencias (MOV)**: Entre registros, memoria, inmediatos
- **🧮 Aritmética (ADD/SUB)**: Operaciones de la ALU
- **🎮 Control (JMP/CALL/RET)**: Saltos y subrutinas

## 🏗️ Instalación y Desarrollo

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Clonar y ejecutar localmente

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/cicloinstruccion.git
cd cicloinstruccion

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa del build
npm run preview
```

## 🚀 Despliegue en GitHub Pages

### Método Automático (Recomendado)

1. **Fork del repositorio** o crear nuevo repo
2. **Subir tu código** a la rama `main`
3. **Configurar GitHub Pages**:
   - Ve a Settings → Pages
   - Source: GitHub Actions
4. **El despliegue es automático** con cada push

### Configuración Manual

1. **Actualizar vite.config.js**:
```javascript
export default defineConfig({
  base: '/tu-repositorio/', // Cambiar por tu repo
  // ...resto de configuración
})
```

2. **Actualizar package.json**:
```json
{
  "homepage": "https://tu-usuario.github.io/tu-repositorio"
}
```

## 📁 Estructura del Proyecto

```
cicloinstruccion/
├── 📁 .github/
│   ├── 📁 workflows/
│   │   └── deploy.yml          # CI/CD para GitHub Pages
│   └── copilot-instructions.md # Instrucciones para Copilot
├── 📁 public/
│   └── vite.svg               # Favicon
├── 📁 src/
│   ├── main.js               # JavaScript principal
│   └── style.css             # Estilos CSS
├── index.html                # HTML principal
├── package.json              # Dependencias y scripts
├── vite.config.js           # Configuración de Vite
└── README.md                # Este archivo
```

## 🎨 Personalización

### Colores y Temas
Los colores se pueden personalizar en `src/style.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
  --accent-color: #fbbf24;
  --success-color: #10b981;
  /* ...más variables */
}
```

### Contenido Educativo
El contenido se puede modificar directamente en `index.html` en las secciones correspondientes.

## 📱 Responsive Design

- **Desktop**: Layout completo con 3 columnas
- **Tablet**: Layout adaptado con 2 columnas  
- **Mobile**: Layout de 1 columna, navegación simplificada

## ♿ Accesibilidad

- Navegación por teclado (Tab, Arrow keys)
- Etiquetas semánticas HTML5
- Contraste de colores WCAG 2.1 AA
- Soporte para `prefers-reduced-motion`

## 🔧 Scripts Disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Vista previa del build
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🎓 Uso Educativo

Este proyecto está diseñado específicamente para:
- Cursos de arquitectura de computadores
- Material didáctico interactivo
- Estudiantes de ingeniería en sistemas
- Profesores que buscan recursos visuales

## 📞 Contacto

- **Proyecto**: Arquitectura de Computadores
- **Repositorio**: [GitHub](https://github.com/tu-usuario/cicloinstruccion)
- **Issues**: [Reportar problemas](https://github.com/tu-usuario/cicloinstruccion/issues)

---

Hecho con ❤️ para la educación en arquitectura de computadores
