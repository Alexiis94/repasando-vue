# Arquitectura Frontend — Screaming Architecture (Modular)

Resumen: Este es un patrón 'Screaming Architecture' orientado a features/modulos — el árbol de directorios debe hacer evidente el dominio/feature principal de la aplicación antes que la tecnología.

Principios clave:

- Nombre de carpetas por feature (no por tipo técnico). Por ejemplo: `modules/home/`, `modules/account/`.
- Cada feature contiene: `views`, `components`, `services`, `composables/hooks`, `types`, `index.ts` pequeño para exportar la API del módulo.
- Componentes reutilizables y UI primitives en `src/shared/`.
- Mantener `src/main.ts`, `src/App.vue` y config (Vite + tsconfig) como la infraestructura técnica.

Estructura mínima recomendada:

```
src/
  main.ts
  App.vue
  style.css
  modules/
    home/
      views/
        HomeView.vue
      components/
        HomeWelcomeCard.vue
      services/
        homeService.ts
      composables/
        useHome.ts
      types.ts
      index.ts
  shared/
    components/
      Button.vue
    ui/
    hooks/
  assets/
  router/  (si aplicas Vue Router)
  store/   (si aplicas Pinia/State)
  utils/
```

Notas por carpeta:

- `modules/<feature>/views`: Contiene vistas que se renderizan en rutas o layouts. Solo las vistas deben contener la lógica de enrutamiento y composición de módulos.
- `modules/<feature>/components`: Componentes privados del feature que no están expuestos fuera del módulo.
- `modules/<feature>/services`: Abstracciones de acceso a datos (API calls) específicas del dominio del feature.
- `modules/<feature>/composables`: Hooks/logic reuse local al módulo. Si se comparten, mover a `shared/hooks`.
- `modules/<feature>/types`: Interfaces y tipos TS del dominio del feature.
- `modules/<feature>/index.ts`: Exposición explícita del API del módulo, por ejemplo exportar `HomeView` o helpers de inicialización.
- `router/` (por ejemplo `src/router/index.ts`): Define rutas y lazy-loading por módulo; importa vistas de `modules/<feature>/views` para mantener el código por dominio.

Convenciones de nombre y código:

- SFC con TypeScript usan `<script setup lang="ts">` y `defineProps` para typed props (ver `src/modules/home/views/HomeView.vue`).
- Archivos `index.ts` exportan solo lo necesario; consumidores importan desde `modules/<feature>` para evitar paths profundos.
- Emplear servicios asincrónicos puramente para llamadas externas y side effects; composables hacen la composición con reactividad.
- Mantener prop drilling mínimo: usar composables y/o store solo cuando existan necesidades de estado global.

Workflows recomendados:

- Añadir un nuevo feature:
  1. Crea `src/modules/<feature>/views/` y `components`.
  2. Añade `types.ts`, `services/`, y `composables/` si aplica.
  3. Exporta el entry point en `src/modules/<feature>/index.ts`.
  4. Registra la ruta en `router/` si usa Vue Router.
- Revisiones/CI: Ejecutar `npm run build` (incluye `vue-tsc -b`), y añadir lints/tests si se integran.

Integración con Vite / TypeScript:

- `vite.config.ts` gestiona plugins (por ejemplo, `@vitejs/plugin-vue`). Añade analyse o plugin de recursos si necesitas optimizaciones.
- `tsconfig.app.json` aplica reglas estrictas; mantener para que los imports y tipos sean seguros.

Ejemplo mínimo de `index.ts` (módulo `home`):

```ts
export { default as HomeView } from "./views/HomeView.vue";
export * from "./composables/useHome";
```

Ejemplo mínimo de `homeService.ts`:

```ts
export async function fetchHomeData(): Promise<{ message: string }> {
  // Llamada fetch o axios
  return { message: "Hola desde home service" };
}
```

Ejemplo mínimo de `useHome.ts` (composable):

```ts
import { ref } from "vue";
import { fetchHomeData } from "../services/homeService";

export function useHome() {
  const data = ref<{ message?: string }>({});
  const load = async () => {
    data.value = await fetchHomeData();
  };
  return { data, load };
}
```

Con esto, el proyecto 'gritará' su dominio y facilitará a los desarrolladores llegar rápido al feature que deben tocar.

Si quieres, creo también un template `src/modules/shell` (o `home`) y `src/shared/components/Button.vue` para arrancar. ¿Quieres que lo haga ahora?
