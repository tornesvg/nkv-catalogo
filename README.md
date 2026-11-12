# NKV Boutique — Portal de Catálogos Digitales

Minipágina web responsiva y optimizada para móviles para visualizar los catálogos interactivos de **NKV Boutique** (*Bolsos SP* y *Calzado SP*) con visores embebidos de Heyzine Flipbooks, botones de contacto directo a WhatsApp e Instagram, y despliegue continuo automatizado en **Fly.io** mediante **GitHub Actions**.

---

## 📁 Estructura del Proyecto

```text
nkv-catalogo/
├── .github/workflows/deploy.yml   # Despliegue automático a Fly.io al hacer push a main
├── public/
│   ├── index.html                 # Estructura de la página + metadatos para compartir (Open Graph)
│   ├── css/styles.css             # Estilos globales y responsive
│   ├── js/app.js                  # CONFIG (catálogos, WhatsApp, Instagram), tabs y enlaces
│   └── assets/images/
│       ├── logo.webp              # Logo del footer (optimizado)
│       ├── promotional-banner.webp
│       ├── icon-32/180/512.png    # Favicon y apple-touch-icon
│       ├── og-image.jpg           # Vista previa al compartir el link
│       ├── Logo_NKV_B.png         # Respaldo si falla logo.webp
│       └── qr_code.*              # QR del catálogo
├── Dockerfile                     # Nginx Alpine
├── nginx.conf                     # Puerto 8080, gzip, headers y caché
├── fly.toml                       # Configuración de Fly.io
└── README.md
```

---

## 🚀 Paso a Paso: Subir a GitHub y Activar Despliegue Automático

### 1. Inicializar y subir el repositorio a GitHub
En tu terminal local dentro de la carpeta del proyecto:

```bash
git init
git add .
git commit -m "feat: portal de catálogos digitales NKV Boutique"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/nkv-catalogo.git
git push -u origin main
```

*(Reemplaza `TU_USUARIO` por tu usuario de GitHub)*.

---

### 2. Configurar la App en Fly.io
Si deseas crear la aplicación por primera vez en Fly.io o enlazarla:

```bash
fly launch --no-deploy
```

O si ya tienes el nombre de tu app definido en Fly.io, verifica que el campo `app` en `fly.toml` coincida con el nombre de tu app en Fly.io.

---

### 3. Obtener el Token de Fly.io
Genera un token de autenticación para que GitHub Actions pueda desplegar sin pedir contraseña:

```bash
fly auth token
```

Copia el token generado.

---

### 4. Configurar el Secret en GitHub
1. Ingresa a tu repositorio en **GitHub**.
2. Ve a **Settings** > **Secrets and variables** > **Actions**.
3. Haz clic en **New repository secret**.
4. En **Name**, escribe: `FLY_API_TOKEN`.
5. En **Secret**, pega el token generado en el paso anterior.
6. Haz clic en **Add secret**.

---

### 5. ¡Listo! Despliegue Automático en Producción
A partir de este momento, cada vez que hagas un cambio y ejecutes:

```bash
git add .
git commit -m "Actualización"
git push origin main
```

GitHub Actions compilará y desplegará automáticamente la nueva versión en Fly.io en segundos.

---

## 🔄 ¿Cómo actualizar los catálogos en el futuro?

### Opción 1: Reemplazar el PDF en Heyzine (Sin tocar código)
1. Ingresa a tu cuenta en [Heyzine.com](https://heyzine.com).
2. Selecciona el catálogo (*Bolsos* o *Calzado*) y haz clic en **Replace PDF**.
3. Carga el nuevo archivo PDF.
4. **Resultado:** El enlace y el código QR se mantienen idénticos, y los clientes verán los nuevos productos al instante.

### Opción 2: Cambiar la URL en el código
Si creas un nuevo catálogo con un enlace diferente, solo debes editar el bloque `CONFIG` al inicio de `public/js/app.js`:

```javascript
const CONFIG = {
  catalogs: {
    bolsos: {
      title: "Catálogo Bolsos SP",
      icon: "👜",
      url: "https://heyzine.com/flip-book/TU_NUEVO_ENLACE.html",
      waMessage: "Hola NKV Boutique, estoy viendo el catálogo digital de Bolsos..."
    },
    ...
  }
};
```
Guardas, haces `git push origin main` y se publicará automáticamente.

---

## 🖼️ Imágenes y caché

- **HTML:** nunca se cachea (`no-cache`), los cambios se ven al instante.
- **CSS/JS:** caché de 1 hora con revalidación.
- **Imágenes:** caché de 7 días. **Si reemplazas una imagen, súbela con un nombre nuevo** (ej. `promotional-banner-2.webp`) y actualiza `index.html`; si no, los clientes que ya visitaron verán la anterior hasta una semana.
- Usa **WebP** y tamaños razonables (banner ≤ 1600 px de ancho, logo ≤ 1000 px). Los originales pesados viven fuera del repo, en `../originales-pesados/`.
