# 📚 Documentación del Frontend - Vambe Dashboard

## 📋 **Resumen Ejecutivo**

**Vambe Frontend** es una aplicación web moderna construida con **Next.js 14** que proporciona un dashboard empresarial completo para la gestión de reuniones, análisis de clientes, y seguimiento de ventas. La aplicación está diseñada con una arquitectura modular, escalable y mantenible.

### **🎯 Objetivos Principales:**

- **Gestión integral** de reuniones con clasificación automática
- **Análisis profundo** de clientes y sectores de negocio
- **Seguimiento de ventas** y rendimiento de vendedores
- **Dashboard ejecutivo** con métricas en tiempo real
- **Experiencia de usuario** moderna y responsiva

### **🏆 Características Destacadas:**

- ✅ **Reclasificación en tiempo real** de reuniones con polling
- ✅ **Arquitectura modular** con componentes reutilizables
- ✅ **Autenticación robusta** con refresh automático de tokens
- ✅ **Diseño monocromático** elegante y profesional
- ✅ **Responsive design** para todos los dispositivos
- ✅ **TypeScript completo** para prevención de errores

### **📊 Métricas del Proyecto:**

- **~50 componentes** modulares y reutilizables
- **8 servicios API** organizados por dominio
- **6 módulos principales** (Auth, Dashboard, Clients, Meetings, Sales, Profile)
- **100% TypeScript** con interfaces completas
- **Arquitectura escalable** preparada para crecimiento

---

## 🏗️ Arquitectura General

El frontend de Vambe está construido con **Next.js 14** usando **App Router**, **TypeScript**, **Material-UI (MUI)**, y **React**. La aplicación está diseñada como un dashboard empresarial para la gestión de reuniones, clientes, ventas y análisis de datos.

### 📊 **Diagrama de Arquitectura**

```
┌─────────────────────────────────────────────────────────────┐
│                    VAMBE FRONTEND                           │
├─────────────────────────────────────────────────────────────┤
│  🎨 PRESENTATION LAYER (App Router)                        │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │   Authentication│ │    Dashboard    │ │     Profile     ││
│  │   - Login       │ │   - Overview    │ │   - User Info   ││
│  │   - Register    │ │   - KPIs        │ │   - Settings    ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │    Clients      │ │    Meetings     │ │     Sales       ││
│  │   - Analysis    │ │   - List        │ │   - Performance ││
│  │   - Sectors     │ │   - Detail      │ │   - Sellers     ││
│  │   - Metrics     │ │   - Reclassify  │ │   - CRUD        ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  🧩 COMPONENT LAYER                                         │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │   Shared        │ │   Modular       │ │   Forms         ││
│  │   - Cards       │ │   - Headers     │ │   - Validation  ││
│  │   - Layouts     │ │   - Modals      │ │   - Fields      ││
│  │   - Guards      │ │   - Tables      │ │   - Feedback    ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  🔄 STATE LAYER                                             │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │   Context       │ │   Hooks         │ │   Local Storage ││
│  │   - Auth        │ │   - Custom      │ │   - Tokens      ││
│  │   - User        │ │   - Reclassify  │ │   - Settings    ││
│  │   - Global      │ │   - API         │ │   - Cache       ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  🔌 API LAYER                                               │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │   HTTP Client   │ │   Services      │ │   Interceptors  ││
│  │   - Axios       │ │   - Auth        │ │   - Token Refresh││
│  │   - Base Config │ │   - Meetings    │ │   - Error Handle││
│  │   - Types       │ │   - Sales       │ │   - Logging     ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
├─────────────────────────────────────────────────────────────┤
│  🛠️ UTILITY LAYER                                           │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐│
│  │   Mappings      │ │   Theme         │ │   Helpers       ││
│  │   - Data Trans  │ │   - MUI Config  │ │   - Token Mgmt  ││
│  │   - Localization│ │   - Colors      │ │   - Cache       ││
│  │   - Validation  │ │   - Typography  │ │   - Utils       ││
│  └─────────────────┘ └─────────────────┘ └─────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

### 🔄 **Flujo de Datos**

```
User Interaction → Component → Hook/Context → API Service → HTTP Client → Backend
                     ↓              ↓            ↓           ↓
                 UI Update ← State Update ← Data Process ← Response
```

## 📁 Estructura del Proyecto (`src/`)

### 🔌 **API Layer (`src/api/`)**

Capa centralizada para todas las comunicaciones con el backend.

```
src/api/
├── http.ts                    # Cliente HTTP centralizado con interceptores
├── index.ts                   # Exportaciones centralizadas de servicios
├── auth/
│   └── authService.ts         # Servicio de autenticación
├── clients/
│   └── clientsService.ts      # Servicio de gestión de clientes
├── meetings/
│   └── meetingsService.ts     # Servicio de reuniones y clasificaciones
├── sales/
│   └── salesService.ts        # Servicio de ventas y vendedores
├── kpis/
│   └── kpisService.ts         # Servicio de métricas y KPIs
└── workers/
    └── workersService.ts      # Servicio de workers para clasificación
```

#### **Características de la API Layer:**

- ✅ **Cliente HTTP centralizado** con interceptores
- ✅ **Refresh automático de tokens** en errores 401
- ✅ **Manejo centralizado de errores**
- ✅ **Tipos TypeScript** para todas las interfaces
- ✅ **Servicios organizados por dominio**

---

### 🎨 **App Layer (`src/app/`)**

Estructura de páginas y layouts usando Next.js App Router.

#### **🔐 Autenticación (`src/app/authentication/`)**

```
authentication/
├── auth/
│   ├── AuthLogin.tsx          # Componente de login
│   └── AuthRegister.tsx       # Componente de registro
├── login/
│   └── page.tsx              # Página de login
└── register/
    └── page.tsx              # Página de registro
```

#### **📊 Dashboard Principal (`src/app/dashboard/`)**

```
dashboard/
├── layout.tsx                # Layout principal del dashboard
├── loading.tsx               # Componente de carga
├── page.tsx                  # Página principal del dashboard
├── profile/
│   └── page.tsx              # Página de perfil de usuario
├── layout/                   # Componentes de layout
│   ├── header/
│   │   ├── Header.tsx        # Header principal
│   │   └── Profile.tsx       # Componente de perfil en header
│   ├── sidebar/
│   │   ├── Sidebar.tsx       # Sidebar principal
│   │   ├── SidebarItems.tsx  # Items del sidebar
│   │   └── MenuItems.tsx     # Configuración de menús
│   └── shared/
│       └── logo/
│           └── Logo.tsx      # Componente de logo
├── components/               # Componentes compartidos del dashboard
│   ├── KPIOverview.tsx       # Vista general de KPIs
│   └── MeetingTrends.tsx     # Tendencias de reuniones
├── clients/                  # Módulo de clientes
│   ├── page.tsx              # Página principal de clientes
│   ├── components/
│   │   ├── ClientAnalysis.tsx # Análisis de clientes
│   │   └── sections/         # Secciones de análisis
│   │       ├── AllSectors.tsx
│   │       ├── LeadSources.tsx
│   │       ├── PainPointsSection.tsx
│   │       ├── ProductsSection.tsx
│   │       ├── SectorsOverview.tsx
│   │       └── UseCasesSection.tsx
│   └── services/
│       └── clientApi.ts      # API específica de clientes
├── meetings/                 # Módulo de reuniones
│   ├── page.tsx              # Lista de reuniones
│   ├── [id]/
│   │   └── page.tsx          # Detalle de reunión específica
│   ├── components/           # Componentes modulares de reuniones
│   │   ├── MeetingsTable.tsx # Tabla de reuniones
│   │   ├── MeetingHeader.tsx # Header del detalle
│   │   ├── MeetingInfo.tsx   # Información básica
│   │   ├── MeetingClassification.tsx # Datos de clasificación
│   │   ├── MeetingContent.tsx # Contenido y transcripción
│   │   ├── MeetingTechnicalDetails.tsx # Detalles técnicos
│   │   └── ReclassificationModal.tsx # Modal de reclasificación
│   ├── hooks/
│   │   └── useMeetingReclassification.ts # Hook de reclasificación
│   └── services/
│       └── meetingsApi.ts    # API específica de reuniones
└── sales/                    # Módulo de ventas
    ├── page.tsx              # Página principal de ventas
    ├── components/
    │   ├── SalesPerformance.tsx # Rendimiento de ventas
    │   └── SellerModal.tsx   # Modal de gestión de vendedores
    └── services/
        └── salesApi.ts       # API específica de ventas
```

---

### 🧩 **Componentes Compartidos (`src/components/`)**

Componentes reutilizables en toda la aplicación.

```
components/
├── AuthGuard.tsx             # Guard de autenticación
├── forms/
│   └── theme-elements/
│       └── CustomTextField.tsx # Campo de texto personalizado
└── shared/
    ├── BlankCard.tsx         # Tarjeta en blanco
    ├── DashboardCard.tsx     # Tarjeta de dashboard
    └── PageContainer.tsx     # Contenedor de página
```

---

### 🔄 **Contextos (`src/contexts/`)**

Gestión de estado global de la aplicación.

```
contexts/
└── AuthContext.tsx           # Contexto de autenticación
```

#### **Características del AuthContext:**

- ✅ **Estado global** de usuario autenticado
- ✅ **Métodos de login/logout**
- ✅ **Persistencia** de sesión
- ✅ **Protección de rutas**

---

### 🛠️ **Utilidades (`src/utils/`)**

Funciones y configuraciones auxiliares.

```
utils/
├── createEmotionCache.ts     # Cache de Emotion para MUI
├── theme.ts                  # Configuración del tema MUI
├── token.ts                  # Utilidades de manejo de tokens
└── mappings/                 # Mapeos de datos
    ├── index.ts              # Exportaciones de mapeos
    ├── businessSectorMapping.ts
    ├── companySizeMapping.ts
    ├── leadSourceMapping.ts
    ├── painPointMapping.ts
    ├── productMapping.ts
    ├── purchaseStageMapping.ts
    ├── regionMapping.ts
    ├── roleMapping.ts
    └── useCaseMapping.ts
```

---

## 🚀 Funcionalidades Principales

### 🔐 **Sistema de Autenticación**

- **Login/Registro** con validación
- **Protección de rutas** con AuthGuard
- **Refresh automático** de tokens
- **Gestión de sesión** persistente
- **Logout automático** en errores de autenticación

### 📊 **Dashboard Principal**

- **Vista general** de métricas clave
- **KPIs en tiempo real** (KPIOverview)
- **Tendencias de reuniones** (MeetingTrends)
- **Navegación intuitiva** con sidebar

### 👥 **Gestión de Clientes**

- **Análisis completo** de clientes
- **Visualizaciones por sectores**
- **Análisis de fuentes de leads**
- **Identificación de puntos de dolor**
- **Análisis de casos de uso**
- **Métricas de productos**

### 🤝 **Gestión de Reuniones**

- **Lista completa** de reuniones
- **Detalle individual** con información completa
- **Reclasificación automática** con polling
- **Transcripciones** de reuniones
- **Métricas técnicas** (confianza, sentimiento)
- **Análisis de temas clave** y elementos de acción

#### **Características Avanzadas de Reuniones:**

- ✅ **Reclasificación en tiempo real** con feedback visual
- ✅ **Simulación de progreso** para mejor UX
- ✅ **Polling automático** cada 2 segundos
- ✅ **Modal de progreso** con estados detallados
- ✅ **Componentes modulares** para fácil mantenimiento

### 💰 **Gestión de Ventas**

- **Rendimiento de vendedores**
- **CRUD completo** de vendedores
- **Métricas de ventas**
- **Análisis de performance**
- **Gestión de prompts** y configuraciones

### 👤 **Perfil de Usuario**

- **Vista moderna** y monocromática
- **Información personal** editable
- **Estadísticas de usuario**
- **Configuración de cuenta**
- **Gestión de sesión**

---

## 🎨 **Diseño y UX**

### **Tema y Estilo:**

- **Material-UI (MUI)** como sistema de diseño
- **Tema monocromático** elegante y profesional
- **Responsive design** para todos los dispositivos
- **Iconografía consistente** con Tabler Icons
- **Animaciones suaves** y transiciones

### **Componentes de UI:**

- **Tarjetas modulares** para organización
- **Tablas interactivas** con paginación
- **Modales informativos** con progreso
- **Formularios validados** con feedback
- **Indicadores de estado** visuales

---

## 🔧 **Tecnologías Utilizadas**

### **Core:**

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **React 18** - Biblioteca de UI

### **UI/UX:**

- **Material-UI (MUI)** - Sistema de componentes
- **Emotion** - CSS-in-JS para estilos
- **Tabler Icons** - Iconografía

### **Estado y Datos:**

- **React Context** - Estado global
- **Axios** - Cliente HTTP
- **Local Storage** - Persistencia local

### **Utilidades:**

- **Date-fns** - Manipulación de fechas
- **Lodash** - Utilidades de JavaScript

---

## 📱 **Responsive Design**

La aplicación está completamente optimizada para:

- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

### **Características Responsive:**

- ✅ **Sidebar colapsable** en móviles
- ✅ **Tablas con scroll horizontal** en pantallas pequeñas
- ✅ **Modales adaptativos** según el tamaño de pantalla
- ✅ **Grid system** flexible de MUI
- ✅ **Tipografía escalable** según dispositivo

---

## 🔒 **Seguridad**

### **Medidas Implementadas:**

- ✅ **Autenticación JWT** con refresh tokens
- ✅ **Protección de rutas** con AuthGuard
- ✅ **Interceptores HTTP** para manejo de tokens
- ✅ **Logout automático** en errores de autenticación
- ✅ **Validación de formularios** en frontend
- ✅ **Sanitización de datos** en inputs

---

## 🚀 **Performance**

### **Optimizaciones:**

- ✅ **Lazy loading** de componentes
- ✅ **Code splitting** automático de Next.js
- ✅ **Memoización** de componentes pesados
- ✅ **Debouncing** en búsquedas
- ✅ **Caching** de datos de API
- ✅ **Optimización de imágenes** con Next.js

---

## 🧪 **Testing y Calidad**

### **Estructura Preparada para:**

- **Unit Tests** con Jest/React Testing Library
- **Integration Tests** para flujos completos
- **E2E Tests** con Playwright/Cypress
- **TypeScript** para prevención de errores
- **ESLint** para calidad de código

---

## 📈 **Escalabilidad**

### **Arquitectura Escalable:**

- ✅ **Componentes modulares** reutilizables
- ✅ **Servicios organizados** por dominio
- ✅ **Hooks personalizados** para lógica compleja
- ✅ **Separación clara** de responsabilidades
- ✅ **Estructura de carpetas** lógica y mantenible
- ✅ **Tipos TypeScript** para documentación implícita

---

## 🔄 **Flujos Principales**

### **1. Autenticación:**

```
Login → Validación → Token Storage → Dashboard
```

### **2. Reclasificación de Reunión:**

```
Click Reclasificar → API Call → Polling → Progress → Reload Data
```

### **3. Gestión de Vendedores:**

```
Lista → Crear/Editar → Validación → API → Refresh Lista
```

### **4. Análisis de Clientes:**

```
Carga Datos → Procesamiento → Visualizaciones → Interactividad
```

---

## 📋 **Posibles Mejoras:**

- [ ] **Dashboard de administradores** con gestión de usuarios
- [ ] **Exportación de datos** en múltiples formatos
- [ ] **Notificaciones en tiempo real** con WebSockets
- [ ] **Filtros avanzados** en todas las tablas
- [ ] **Búsqueda global** en toda la aplicación
- [ ] **Temas personalizables** por usuario
- [ ] **Analytics avanzados** con gráficos interactivos

---

## 🛠️ **Comandos de Desarrollo**

```bash
# Instalación
npm install

# Desarrollo
npm run dev

# Build
npm run build

# Producción
npm start

# Linting
npm run lint

# Type checking
npm run type-check
```
