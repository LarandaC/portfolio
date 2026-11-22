# Portafolio Personal – Leticia

Mi portafolio como un **valle japonés en 3D** que se puede recorrer. **Amaru**, un gato somalí naranja, guía la visita: cada casa del valle es una sección del portafolio. Para quien prefiera leer de corrido, también hay una **versión clásica** con scroll.

Desarrollado con **React**, **TypeScript**, **Tailwind CSS** y **three.js**.

## 🗺️ Dos formas de verlo

| Ruta | Qué es |
| --- | --- |
| `/inicio` | El mapa 3D explorable (página de inicio; `/` redirige aquí). |
| `/simple` | La versión clásica con scroll: las mismas secciones, sin 3D. |

En los equipos sin WebGL, o si el usuario tiene activado *reducir movimiento*, `/inicio` muestra directamente la versión clásica. Las dos versiones tienen un botón para pasar a la otra.

## 🧩 Características

### Mapa 3D
- **Recorrido libre**: clic o toque para caminar, flechas o WASD, y rueda o pellizco para el zoom. También se puede elegir un lugar y Amaru va hasta allí por los caminos.
- **Edificios = secciones**: Inicio (torii), Sobre mí, Experiencia, Habilidades, Proyectos y Contacto (muelle del lago). Al llegar a cada uno se abre su contenido en un panel, o en una hoja inferior en el celular.
- **Estética anime en acuarela**: sombreado *toon*, un post-proceso de acuarela, pétalos de cerezo, agua con reflejos pintados, carteles de madera en cada camino.
- **Día y noche**: el tema claro es la tarde y el oscuro la noche, con faroles encendidos, estrellas y luciérnagas.
- **URLs con hash**: `#projects`, `#contact`… abren ese lugar, así que los enlaces compartidos y el botón *Atrás* funcionan.
- **Calidad automática**: si el equipo no rinde, se baja la resolución y se quitan los efectos pesados. Si aun así va lento, se ofrece la versión simple. Si el 3D falla, la visita sigue en `/simple`.
- **Carga liviana**: el 3D se carga por separado y la pantalla de carga muestra el progreso.
- **Accesible**: el mapa tiene un menú de lugares que aparece al navegar con teclado y que también usan los lectores de pantalla.

### Versión clásica
- Secciones **Hero, Sobre mí, Experiencia, Habilidades, Proyectos y Contacto**, con animaciones de scroll (GSAP + Lenis) y pétalos 3D en el Hero y en Contacto.
- Diseño *cherry blossom* con efecto de vidrio esmerilado, totalmente responsivo.

### En todo el sitio
- **Español e inglés**, con detección del idioma del navegador.
- **Tema claro y oscuro**, que recuerda la elección del usuario o sigue la del sistema.
- **Créditos** de los modelos 3D dentro del propio sitio (requisito de la licencia CC BY).

## 🛠️ Tecnologías

- **Base**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/), [React Router](https://reactrouter.com/)
- **Estilos**: [Tailwind CSS v4](https://tailwindcss.com/) (tokens en `@theme`, *container queries*), [class-variance-authority](https://cva.style/)
- **3D**: [three.js](https://threejs.org/), [React Three Fiber](https://r3f.docs.pmnd.rs/), [drei](https://drei.docs.pmnd.rs/), shaders GLSL propios
- **Animación**: [GSAP](https://gsap.com/) + ScrollTrigger, [Lenis](https://lenis.darkroom.engineering/)
- **UI**: [Radix Dialog](https://www.radix-ui.com/) (vía shadcn/ui), [Lucide](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Idiomas**: [i18next](https://www.i18next.com/) + react-i18next
- **Modelos 3D**: [glTF Transform](https://gltf-transform.dev/) (compresión Meshopt + texturas WebP)
- **Despliegue**: [Vercel](https://vercel.com/)

## 📁 Estructura del Proyecto

```text
src/
├── components/
│   ├── common/    # Componentes reutilizables (Button, Card, Pill, PetalLayer, ProjectModal…)
│   ├── layout/    # NavBar y Footer de la versión clásica
│   ├── sections/  # Secciones (Hero, About, Experience, Skills, Projects, Contact)
│   ├── map/       # Interfaz del mapa sobre el 3D (HUD, paneles, carga, avisos)
│   ├── world/     # Escena 3D del valle (Amaru, edificios, terreno, cámara, efectos)
│   ├── lab/       # Laboratorio de modelos (/lab, solo en desarrollo)
│   └── ui/        # Primitivas de shadcn/ui (dialog, sheet)
├── data/          # Contenido: experiencia, proyectos, habilidades, redes, créditos
├── hooks/         # Hooks propios (tema, idioma, animaciones, WebGL…)
├── i18n/          # Traducciones (es, en)
├── lib/           # Utilidades (tema, animaciones, helpers de three.js)
└── pages/         # Páginas (Home, Index, Lab, NotFound)

public/models/     # Modelos 3D optimizados que usa el sitio
assets-src/        # Originales de los modelos (fuera de git) y CREDITS.md
scripts/           # optimize-models.mjs
```

## 🚀 Instalación y Desarrollo

1. Clonar el repositorio.
2. Instalar las dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Construir para producción:
   ```bash
   npm run build
   ```

Otros comandos:

| Comando | Para qué |
| --- | --- |
| `npm run preview` | Ver el build de producción en local. |
| `npm run lint` | Revisar el código con ESLint. |
| `npm run models` | Optimizar los modelos de `assets-src/` hacia `public/models/` (solo los que cambiaron; `-- --force` para todos). |

En desarrollo también está disponible **`/lab`**, un laboratorio para revisar modelos 3D con la luz del valle, probar sus animaciones y compararlos.

## 🎨 Créditos

Los modelos 3D son de sus autores y se usan bajo licencia CC BY. La lista completa está en el sitio (botón **Créditos**) y en [`assets-src/CREDITS.md`](assets-src/CREDITS.md).

## 📬 Contacto

Este portafolio refleja mi enfoque colaborativo y mi pasión por crear experiencias digitales claras, diferenciadas y funcionales.

Si quieres conectar o colaborar, puedes escribirme a [leticiaranda78@gmail.com](mailto:leticiaranda78@gmail.com).
