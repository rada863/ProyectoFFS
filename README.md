# ProyectoFFS
# ProyectoFFS 🏠💻

Simulador de Seguros para Hogar desarrollado con **React + Vite + Chakra UI**.  
Permite al usuario ingresar datos de su vivienda, calcular diferentes opciones de cobertura, generar un resumen en PDF y mantener un historial de cotizaciones en `localStorage`.

---

## 🚀 Características principales

- **Formulario de usuario**: captura datos como nombre, edad, tipo de propiedad, ubicación, valor, etc.
- **Cálculo dinámico de coberturas**: opciones Básica, Estándar y Premium con precios ajustados según factores.
- **Resumen de cotización**:
  - Visualización clara de la cobertura seleccionada.
  - Exportación a PDF con `jsPDF`.
  - Opción de impresión directa.
- **Historial de cotizaciones**:
  - Guardado automático en `localStorage`.
  - Visualización en tabla con Chakra UI.
  - Botón para acceder al historial desde la página principal.
- **UI moderna y responsiva** gracias a Chakra UI.

---

## 📂 Estructura del proyecto



cotiazcion/
├── public/
├── src/
│   ├── components/
│   │   ├── UserForm.jsx
│   │   ├── CoverageOptions.jsx
│   │   ├── Summary.jsx
│   │   └── Layout.jsx
│   ├── context/
│   │   └── QuoteContext.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── QuoteForm.jsx
│   │   ├── CoverageSelection.jsx
│   │   └── QuoteSummary.jsx
│   ├── routes/
│   │   └── index.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
└── README.md

---

## 🛠️ Tecnologías utilizadas

- [React](https://react.dev/) – Librería principal para la UI.
- [Vite](https://vitejs.dev/) – Bundler rápido para desarrollo.
- [Chakra UI](https://chakra-ui.com/) – Componentes estilizados y responsivos.
- [React Router](https://reactrouter.com/) – Navegación entre páginas.
- [jsPDF](https://github.com/parallax/jsPDF) – Generación de PDFs.

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/rada863/ProyectoFFS.git
   cd ProyectoFFS
