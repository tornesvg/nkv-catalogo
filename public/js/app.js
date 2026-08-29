const CONFIG = {
  catalogs: {
    calzado: {
      title: "Catálogo Calzado NKV",
      icon: "👠",
      url: "https://heyzine.com/flip-book/74216951e6.html",
      waMessage: "Hola NKV Boutique, estoy viendo el catálogo de Calzado y me gustaría consultar disponibilidad y precios de una referencia."
    },
    bolsos: {
      title: "Catálogo Bolsos NKV",
      icon: "👜",
      url: "https://heyzine.com/flip-book/4b5d8dc45b.html",
      waMessage: "Hola NKV Boutique, estoy viendo el catálogo de Bolsos y me gustaría consultar disponibilidad y precios de una referencia."
    }
  },
  whatsappNumber: "573183931763",
  instagramUrl: "https://www.instagram.com/nkv_boutique/"
};

let activeCatalog = "calzado";

function handleLogoFallback(imgEl) {
  if (imgEl.src.includes('logo.png')) {
    imgEl.src = 'assets/images/Logo_NKV_B.png';
  } else {
    imgEl.style.display = 'none';
    const logoFallback = document.getElementById('brand-text-fallback');
    if (logoFallback) logoFallback.style.display = 'flex';
  }
}

function updateWhatsAppLinks() {
  const current = CONFIG.catalogs[activeCatalog];
  const encodedMsg = encodeURIComponent(current.waMessage);
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodedMsg}`;

  const btnMain = document.getElementById('btn-whatsapp-main');
  const btnFloat = document.getElementById('btn-whatsapp-floating');

  if (btnMain) {
    btnMain.href = waUrl;
    btnMain.removeAttribute('onclick');
  }

  if (btnFloat) {
    btnFloat.href = waUrl;
    btnFloat.removeAttribute('onclick');
  }
}

function switchCatalog(type) {
  if (!CONFIG.catalogs[type]) return;

  activeCatalog = type;
  const target = CONFIG.catalogs[type];

  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.classList.remove('active');
    btn.setAttribute('aria-selected', 'false');
  });

  const currentTab = document.getElementById(`tab-${type}`);
  if (currentTab) {
    currentTab.classList.add('active');
    currentTab.setAttribute('aria-selected', 'true');
  }

  const titleEl = document.getElementById('current-title');
  if (titleEl) {
    titleEl.innerHTML = `<span>${target.icon}</span> ${target.title}`;
  }

  const fsBtn = document.getElementById('btn-fullscreen');
  if (fsBtn) fsBtn.href = target.url;

  const iframe = document.getElementById('flipbook-frame');
  if (iframe && iframe.src !== target.url) {
    iframe.src = target.url;
  }

  updateWhatsAppLinks();
}

document.addEventListener('DOMContentLoaded', () => {
  switchCatalog('calzado');
});
