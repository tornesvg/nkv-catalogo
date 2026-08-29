# NKV Boutique — Portal de Catálogos Digitales

Minipágina web responsiva y optimizada para móviles para visualizar los catálogos interactivos de **NKV Boutique** (*Bolsos SP* y *Calzado SP*) con visores embebidos de Heyzine Flipbooks, botones de contacto directo a WhatsApp e Instagram, y despliegue continuo automatizado en **Fly.io** mediante **GitHub Actions**.

---

## 📁 Estructura del Proyecto

```text
nkv-catalogo/
├── .github/
│   └── workflows/
│       └── deploy.yml        # Pipeline de despliegue automático a Fly.io
├── public/
│   ├── index.html            # Vista principal del sitio y estructura HTML
│   ├── css/
│   │   └── styles.css        # Estilos globales y responsive del catálogo
│   ├── js/
│   │   └── app.js            # Lógica del catálogo, tabs y WhatsApp
│   ├── assets/
│   │   └── images/           # Imágenes y activos del sitio
│   └── index.html            # Entrada principal del frontend
├── Dockerfile                # Imagen ligera basada en Nginx Alpine
├── nginx.conf                # Configuración de Nginx (puerto 8080, compresión gzip, headers)
├── fly.toml                  # Configuración de la aplicación en Fly.io
├── README.md                 # Documentación del proyecto
└── .gitignore                # Archivos ignorados por Git
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
Si creas un nuevo catálogo con un enlace diferente, solo debes editar el bloque `CONFIG` al inicio del script en `public/index.html`:

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
