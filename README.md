# 🎮 Angular con TanStack Query para una app de Pokemon

Una aplicación web moderna para explorar el mundo Pokémon, construida con **Angular** y **TanStack Query** para un manejo eficiente de datos y estado.

![PokéDex Preview](https://img.shields.io/badge/Angular-17-red?style=for-the-badge&logo=angular)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.0-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)
- [Arquitectura del Proyecto](#-arquitectura-del-proyecto)
- [TanStack Query en el Proyecto](#-tanstack-query-en-el-proyecto)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API y Servicios](#-api-y-servicios)
- [Componentes](#-componentes)


## ✨ Características

### 🎯 Funcionalidades Principales
- **Exploración de Pokémon**: Lista completa de personajes con búsqueda en tiempo real
- **Detalles Completos**: Información detallada de cada Pokémon con estadísticas
- **Diseño Responsivo**: Interfaz adaptada a todos los dispositivos
- **Búsqueda Inteligente**: Filtrado instantáneo de personajes
- **Navegación Fluida**: Transiciones suaves entre páginas

### 🎨 Diseño y UX
- **Interfaz Moderna**: Gradientes y efectos visuales atractivos
- **Paleta de Colores**: Azul/púrpura con acentos rosados
- **Animaciones Suaves**: Transiciones y efectos hover elegantes
- **Glassmorphism**: Efectos de cristal sin backdrop-filter para mejor compatibilidad
- **Tipografía Optimizada**: Fuentes legibles y jerarquía visual clara

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular**: Framework principal con signals y control flow moderno
- **TypeScript 5.0**: Tipado estático para mejor desarrollo
- **TanStack Query**: Manejo de estado del servidor y caché
- **CSS3**: Estilos modernos con gradientes y animaciones
- **HTML5**: Semántica moderna y accesible

### Herramientas de Desarrollo
- **Angular CLI**: Generación de componentes y servicios
- **ESLint**: Linting de código TypeScript
- **Prettier**: Formateo automático de código

## 🏗️ Arquitectura del Proyecto

### Patrón de Arquitectura
```
src/
├── app/
│   ├── actions/          # Acciones para TanStack Query
│   ├── components/       # Componentes reutilizables
│   ├── interfaces/       # Tipos TypeScript
│   ├── pages/           # Páginas principales
│   ├── services/        # Servicios de API
│   └── helpers/         # Utilidades y helpers
```

### Flujo de Datos
1. **Componente** → Solicita datos
2. **TanStack Query** → Verifica caché
3. **Servicio** → Hace petición HTTP
4. **API** → Retorna datos
5. **TanStack Query** → Actualiza caché y estado
6. **Componente** → Recibe datos actualizados

## 🔄 TanStack Query en el Proyecto

### ¿Por qué TanStack Query?

TanStack Query es una biblioteca moderna para el manejo de estado del servidor que proporciona:

- **Caché Inteligente**: Almacena datos automáticamente
- **Sincronización**: Mantiene datos actualizados
- **Optimistic Updates**: Actualizaciones optimistas
- **Background Refetching**: Recarga datos en segundo plano
- **Error Handling**: Manejo robusto de errores
- **Loading States**: Estados de carga automáticos

### Implementación en el Proyecto

#### 1. Configuración Principal
```typescript
// app.config.ts
import { provideQueryClient } from '@tanstack/angular-query-experimental'

export const appConfig: ApplicationConfig = {
  providers: [
    provideQueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 minutos
          gcTime: 1000 * 60 * 10,   // 10 minutos
        },
      },
    }),
  ],
}
```

#### 2. Acciones de Consulta
```typescript
// actions/getCharacters.ts
export const getCharacters = () => ({
  queryKey: ['characters'],
  queryFn: () => charactersService.getCharacters(),
})

export const getCharacter = (id: string) => ({
  queryKey: ['character', id],
  queryFn: () => characterService.getCharacter(id),
})
```

#### 3. Uso en Componentes
```typescript
// pages/characters/characters.ts
export class CharactersComponent {
  characters = injectQuery(getCharacters())
}
```

### Beneficios Aplicados

#### 🚀 Rendimiento
- **Caché Automático**: Los datos se almacenan y reutilizan
- **Deduplicación**: Evita peticiones duplicadas
- **Background Updates**: Actualiza datos sin interrumpir UX

#### 🎯 Experiencia de Usuario
- **Loading States**: Indicadores de carga automáticos
- **Error Handling**: Manejo elegante de errores
- **Optimistic Updates**: Respuesta inmediata del UI

#### 🔧 Mantenibilidad
- **Código Limpio**: Separación clara de responsabilidades
- **TypeScript**: Tipado completo para mejor desarrollo
- **Testing**: Fácil testing de queries

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd TanStackQuery
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm start
```

4. **Abrir en el navegador**
```
http://localhost:4200
```

### Scripts Disponibles

```bash
npm start          # Servidor de desarrollo
npm run build      # Build de producción
npm run test       # Ejecutar tests
npm run lint       # Linting del código
```

## 🎮 Uso

### Navegación
1. **Página Principal**: Lista de todos los Pokémon
2. **Búsqueda**: Filtra personajes por nombre
3. **Detalles**: Click en cualquier Pokémon para ver información completa
4. **Navegación**: Botón "Volver" para regresar a la lista

### Características de la Interfaz
- **Responsive**: Se adapta a móviles, tablets y desktop
- **Búsqueda en Tiempo Real**: Filtrado instantáneo
- **Animaciones**: Transiciones suaves entre páginas
- **Estados de Carga**: Indicadores visuales durante peticiones

## 📁 Estructura del Proyecto

```
TanStackQuery/
├── src/
│   ├── app/
│   │   ├── actions/              # Acciones TanStack Query
│   │   │   ├── getCharacter.ts   # Query para Pokémon individual
│   │   │   └── getCharacters.ts  # Query para lista de Pokémon
│   │   ├── components/           # Componentes reutilizables
│   │   │   └── character-datail/ # Componente de lista de Pokémon
│   │   ├── interfaces/           # Tipos TypeScript
│   │   │   ├── ICharacter.ts     # Interfaz de Pokémon individual
│   │   │   └── ICharacters.ts    # Interfaz de lista de Pokémon
│   │   ├── pages/               # Páginas principales
│   │   │   ├── character/        # Página de detalle
│   │   │   └── characters/       # Página de lista
│   │   ├── services/            # Servicios de API
│   │   │   ├── character.service.ts
│   │   │   └── characters.service.ts
│   │   └── helpers/             # Utilidades
│   │       └── sleep.ts         # Helper para delays
│   ├── environments/            # Configuración de entornos
│   └── styles.css              # Estilos globales
├── package.json
└── README.md
```

## 🌐 API y Servicios

### PokeAPI
El proyecto utiliza la [PokeAPI](https://pokeapi.co/) como fuente de datos:

- **Endpoint Base**: `https://pokeapi.co/api/v2`
- **Endpoints Utilizados**:
  - `/pokemon` - Lista de Pokémon
  - `/pokemon/{id}` - Detalles de Pokémon específico

### Servicios Implementados

#### CharactersService
```typescript
// Obtiene lista paginada de Pokémon
getCharacters(limit: number = 20, offset: number = 0)
```

#### CharacterService
```typescript
// Obtiene detalles completos de un Pokémon
getCharacter(id: string)
```

## 🧩 Componentes

### CharacterDetailComponent
- **Propósito**: Muestra lista de Pokémon con búsqueda
- **Funcionalidades**: 
  - Búsqueda en tiempo real
  - Grid responsivo
  - Estados de carga y error

### CharacterComponent
- **Propósito**: Muestra detalles completos de un Pokémon
- **Funcionalidades**:
  - Información detallada
  - Estadísticas en tarjetas
  - Imagen oficial del Pokémon

