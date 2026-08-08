// PS2 Retro Catalog Main JavaScript Application Logic (Password Protected Admin Mode: 040120)

const WHATSAPP_NUMBER = "5492964476309"; // Target WhatsApp (2964476309)
const ITEMS_PER_PAGE = 16; // 4 rows x 4 columns grid on desktop
const STORAGE_KEY = 'ps2_catalog_master_v3';
const ADMIN_PASSWORD = "040120"; // Required Password for Admin Mode

// App State
let catalogGames = [];
let currentCategory = "Todos los Juegos";
let searchQuery = "";
let currentPage = 1;
let cart = [];
let adminModeActive = localStorage.getItem('ps2_admin_mode_active') === 'true';

// Default PS2 Games Catalog Initial Database
const defaultGamesList = [
  {
    id: "g1",
    name: "Dragon Ball Z: Budokai Tenkaichi 3 [Latino MOD]",
    category: "MODS",
    price: 3500,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co204o.jpg",
    description: "Versión MOD definitiva en DVD con voces en Español Latino originales (Audio Latino), más de 160 personajes."
  },
  {
    id: "g2",
    name: "Grand Theft Auto: San Andreas",
    category: "Los más pedidos",
    price: 3000,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co294h.jpg",
    description: "El rey indiscutible de PS2. Explora todo el estado de San Andreas en la piel de CJ."
  },
  {
    id: "g3",
    name: "God of War II",
    category: "Los más pedidos",
    price: 3000,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xal.jpg",
    description: "Kratos desafía a los Dioses del Olimpo en una épica aventura de acción y combate sangriento."
  },
  {
    id: "g4",
    name: "Resident Evil 4",
    category: "Los más pedidos",
    price: 3000,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co249x.jpg",
    description: "Leon S. Kennedy debe rescatar a la hija del presidente en un pueblo hostil de Europa."
  },
  {
    id: "g5",
    name: "The Simpsons Hit & Run [Latino MOD]",
    category: "MODS",
    price: 3500,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co21z9.jpg",
    description: "La obra maestra de Los Simpson doblada al Español Latino por los actores de voz originales."
  },
  {
    id: "g6",
    name: "PES 2024 Liga Argentina & Sudamericana MOD",
    category: "MODS",
    price: 3500,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1vce.jpg",
    description: "Parche actualizado con los equipos de la Liga Argentina, camisetas 2024 y relatos sudamericanos."
  },
  {
    id: "g7",
    name: "Need for Speed: Most Wanted",
    category: "Los más pedidos",
    price: 3000,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2384.jpg",
    description: "Carreras callejeras ilegales, persecuciones policiales extremas y la codiciada Blacklist."
  },
  {
    id: "g8",
    name: "Shadow of the Colossus",
    category: "Los más pedidos",
    price: 3000,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v91.jpg",
    description: "Enfrenta a 16 gigantescos colosos en una tierra prohibida para devolver la vida a tu amada."
  },
  {
    id: "g9",
    name: "Guitar Hero II",
    category: "Todos los Juegos",
    price: 3000,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x4n.jpg",
    description: "Demuestra tus habilidades de rockstar con los mejores clásicos del rock y metal mundial."
  },
  {
    id: "g10",
    name: "Silent Hill 2",
    category: "Todos los Juegos",
    price: 3000,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1v69.jpg",
    description: "La máxima obra maestra del survival horror psicológico en una brumosa ciudad."
  },
  {
    id: "g11",
    name: "Crash Nitro Kart",
    category: "Los más pedidos",
    price: 3000,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2240.jpg",
    description: "Carreras alocadas con Crash Bandicoot y sus amigos para salvar la Tierra del emperador Velo."
  },
  {
    id: "g12",
    name: "Def Jam: Fight for NY",
    category: "Los más pedidos",
    price: 3500,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2529.jpg",
    description: "Peleas callejeras épicas entre raperos legendarios de Nueva York."
  },
  {
    id: "g13",
    name: "BLACK",
    category: "Todos los Juegos",
    price: 3000,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7h.jpg",
    description: "El shooter en primera persona con la mejor calidad gráfica y explosiones de la consola."
  },
  {
    id: "g14",
    name: "Metal Gear Solid 3: Snake Eater",
    category: "Todos los Juegos",
    price: 3000,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wfa.jpg",
    description: "Supervivencia y sigilo en la jungla soviética durante la Guerra Fría."
  },
  {
    id: "g15",
    name: "Mortal Kombat: Shaolin Monks",
    category: "Los más pedidos",
    price: 3000,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2562.jpg",
    description: "Aventura de acción cooperativa con Liu Kang y Kung Lao derrotando hordas de Outworld."
  },
  {
    id: "g16",
    name: "GTA Argentina MOD (Barrio Fino)",
    category: "MODS",
    price: 3500,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co294h.jpg",
    description: "MOD argentino de GTA con colectivos, autos locales, música cumbia y graffitis autóctonos."
  },
  {
    id: "g17",
    name: "Bully (Canis Canem Edit)",
    category: "Todos los Juegos",
    price: 3000,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcf.jpg",
    description: "Encarna a Jimmy Hopkins para sobrevivir a la escuela preparatoria Bullworth Academy."
  },
  {
    id: "g18",
    name: "FIFA Street 2",
    category: "Los más pedidos",
    price: 3000,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2044.jpg",
    description: "Fútbol callejero de estrellas con trucos, regates y jugadas espectaculares."
  },
  {
    id: "g19",
    name: "God of War I [Español Dub MOD]",
    category: "MODS",
    price: 3500,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1xa2.jpg",
    description: "El inicio de la leyenda de Kratos totalmente doblado al español castellano."
  },
  {
    id: "g20",
    name: "Need for Speed: Underground 2",
    category: "Los más pedidos",
    price: 3000,
    image: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2385.jpg",
    description: "Tuning extremo y libertad total para conducir por la ciudad nocturna de Bayview."
  }
];

// ADMIN MODE TOGGLE SYSTEM (Password Protected: 040120)
function toggleAdminMode() {
  try { playClickSound(); } catch(e){}
  
  if (!adminModeActive) {
    const inputPass = prompt("🔑 Ingrese la contraseña de Administrador:");
    if (inputPass === ADMIN_PASSWORD) {
      adminModeActive = true;
      localStorage.setItem('ps2_admin_mode_active', 'true');
      updateAdminUI();
      showToast("🔓 Modo Admin Activado con éxito.");
    } else if (inputPass !== null) {
      alert("❌ Contraseña incorrecta. Acceso denegado.");
    }
  } else {
    adminModeActive = false;
    localStorage.setItem('ps2_admin_mode_active', 'false');
    updateAdminUI();
    showToast("🔒 Vista de Cliente Activada.");
  }
}

function updateAdminUI() {
  const btn = document.getElementById('admin-toggle-btn');
  const status = document.getElementById('admin-status-indicator');

  if (adminModeActive) {
    document.body.classList.add('admin-mode');
    if (btn) {
      btn.innerHTML = '🔓 Modo Admin: ON';
      btn.classList.add('active');
    }
    if (status) {
      status.innerHTML = '🔓 Modo Admin Activo (Edición Habilitada)';
      status.style.color = 'var(--yellow-glow)';
    }
  } else {
    document.body.classList.remove('admin-mode');
    if (btn) {
      btn.innerHTML = '🔑 Modo Admin';
      btn.classList.remove('active');
    }
    if (status) {
      status.innerHTML = '📌 Vista de Cliente';
      status.style.color = 'var(--cyan-glow)';
    }
  }
}

// Toast Notifications
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Initialize Catalog Data
function initData() {
  const storedGames = localStorage.getItem(STORAGE_KEY);
  if (storedGames) {
    try {
      catalogGames = JSON.parse(storedGames);
    } catch (e) {
      catalogGames = [...defaultGamesList];
    }
  } else {
    const oldStored = localStorage.getItem('ps2_catalog_master');
    if (oldStored) {
      try { catalogGames = JSON.parse(oldStored); } catch(e) { catalogGames = [...defaultGamesList]; }
    } else {
      catalogGames = [...defaultGamesList];
    }
    saveCatalogToStorage();
  }

  const storedCart = localStorage.getItem('ps2_user_cart');
  if (storedCart) {
    try {
      cart = JSON.parse(storedCart);
    } catch (e) {
      cart = [];
    }
  }

  updateAdminUI();
  updateCartBadge();
  renderCatalog();
}

// Save catalog games to localStorage
function saveCatalogToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(catalogGames));
  } catch(e) {
    console.error("Error saving catalog:", e);
  }
}

// Save cart to local storage
function saveCartToStorage() {
  try {
    localStorage.setItem('ps2_user_cart', JSON.stringify(cart));
  } catch(e) {}
  updateCartBadge();
}

// Fallback image SVG generator for broken external links
function getSVGPlaceholder(title) {
  const cleanTitle = (title || 'Juego PS2').replace(/'/g, "&apos;");
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="420" viewBox="0 0 300 420"><rect width="300" height="420" fill="%230b0f1a"/><rect x="10" y="10" width="280" height="400" fill="%23141a2e" stroke="%2300f0ff" stroke-width="2" rx="8"/><text x="150" y="50" fill="%2300f0ff" font-family="sans-serif" font-size="20" font-weight="bold" text-anchor="middle">PLAYSTATION 2</text><line x1="20" y1="70" x2="280" y2="70" stroke="%23ff007f" stroke-width="2"/><text x="150" y="210" fill="%23ffffff" font-family="sans-serif" font-size="16" font-weight="bold" text-anchor="middle">${cleanTitle}</text><text x="150" y="380" fill="%2300ff88" font-family="sans-serif" font-size="14" text-anchor="middle">DVD GAME DISC</text></svg>`;
}

// Filter games based on section tab & search query
function getFilteredGames() {
  return catalogGames.filter(game => {
    const matchCategory = (currentCategory === "Todos los Juegos") || (game.category === currentCategory);
    const matchSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (game.description && game.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });
}

// Render Catalog Grid
function renderCatalog() {
  const gridContainer = document.getElementById('catalog-grid');
  const paginationContainer = document.getElementById('pagination-wrapper');
  const countLabel = document.getElementById('catalog-count');

  if (!gridContainer) return;

  const filtered = getFilteredGames();
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (countLabel) {
    countLabel.textContent = `Mostrando ${filtered.length} juegos (Página ${currentPage} de ${totalPages})`;
  }

  if (pageItems.length === 0) {
    gridContainer.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 50px 20px; color: var(--text-muted);">
        <h3 style="font-family: var(--font-heading); color: var(--magenta-glow); font-size: 1.3rem;">¡No se encontraron juegos!</h3>
        <p style="margin-top: 8px;">Intenta cambiar la búsqueda o ingresa a Modo Admin para agregar juegos.</p>
      </div>
    `;
    paginationContainer.innerHTML = '';
    return;
  }

  // Render cards with quick action buttons (Visible in Admin Mode)
  gridContainer.innerHTML = pageItems.map(game => {
    let badgeClass = 'game-badge';
    if (game.category === 'MODS') badgeClass += ' badge-mods';
    if (game.category === 'Los más pedidos') badgeClass += ' badge-pedidos';

    return `
      <div class="game-card" onmouseenter="try{playHoverSound();}catch(e){}">
        <div class="card-image-wrapper">
          <img src="${game.image}" alt="${game.name}" onerror="this.onerror=null; this.src='${getSVGPlaceholder(game.name)}';">
          <div class="card-quick-actions">
            <button class="btn-card-action" onclick="openEditGameModal('${game.id}')" title="Editar juego">✏️</button>
            <button class="btn-card-action delete" onclick="deleteGame('${game.id}')" title="Eliminar juego">🗑️</button>
          </div>
          <span class="${badgeClass}">${game.category}</span>
        </div>
        <div class="card-content">
          <h3 class="game-title" title="${game.name}">${game.name}</h3>
          <p class="game-desc">${game.description || 'Juego en formato DVD para consola Playstation 2.'}</p>
          <div class="card-footer">
            <span class="game-price">$${(game.price || 3000).toLocaleString('es-AR')}</span>
            <button class="btn-add-quote" onclick="addToCart('${game.id}')">
               Cotizar
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  renderPagination(totalPages);
}

// Render Pagination Controls
function renderPagination(totalPages) {
  const container = document.getElementById('pagination-wrapper');
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let html = `
    <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">
      ◀ Anterior
    </button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    html += `
      <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
        ${i}
      </button>
    `;
  }

  html += `
    <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">
      Ver Siguiente Página ▶
    </button>
  `;

  container.innerHTML = html;
}

function goToPage(page) {
  try { playClickSound(); } catch(e){}
  currentPage = page;
  renderCatalog();
  const sec = document.getElementById('catalog-section');
  if (sec) {
    window.scrollTo({ top: sec.offsetTop - 90, behavior: 'smooth' });
  }
}

// Filter Tabs Handler
function selectTab(catName) {
  try { playClickSound(); } catch(e){}
  currentCategory = catName;
  currentPage = 1;

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === catName);
  });

  renderCatalog();
}

// Search Handler
function handleSearch(val) {
  searchQuery = val;
  currentPage = 1;
  renderCatalog();
}

// Add New Game Form Modal Functions
function openAddGameModal() {
  if (!adminModeActive) return;
  try { playModalSound(); } catch(e){}
  const modal = document.getElementById('add-game-modal');
  if (modal) modal.classList.add('active');
}

function closeAddGameModal() {
  try { playClickSound(); } catch(e){}
  const modal = document.getElementById('add-game-modal');
  if (modal) modal.classList.remove('active');
}

function saveNewGame(event) {
  if (event) event.preventDefault();

  const nameInput = document.getElementById('game-name');
  const imageInput = document.getElementById('game-image');
  const categorySelect = document.getElementById('game-category');
  const priceInput = document.getElementById('game-price');
  const descInput = document.getElementById('game-desc');

  if (!nameInput || !nameInput.value.trim()) return false;

  const newGame = {
    id: "g_" + Date.now(),
    name: nameInput.value.trim(),
    image: imageInput && imageInput.value.trim() ? imageInput.value.trim() : getSVGPlaceholder(nameInput.value.trim()),
    category: categorySelect ? categorySelect.value : "Todos los Juegos",
    price: priceInput ? (parseInt(priceInput.value) || 3000) : 3000,
    description: descInput ? (descInput.value.trim() || 'Juego en DVD para PS2.') : 'Juego en DVD para PS2.'
  };

  catalogGames.unshift(newGame);
  saveCatalogToStorage();

  closeAddGameModal();

  const form = document.getElementById('add-game-form');
  if (form) form.reset();

  currentCategory = "Todos los Juegos";
  currentPage = 1;
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === "Todos los Juegos");
  });

  renderCatalog();
  showToast(`✨ Juego "${newGame.name}" agregado con éxito`);
  try { playAddCartSound(); } catch(e){}
  return false;
}

// EDIT GAME MODAL FUNCTIONS (UPDATE)
function openEditGameModal(gameId) {
  if (!adminModeActive) return;
  try { playModalSound(); } catch(e){}
  const game = catalogGames.find(g => g.id === gameId);
  if (!game) return;

  document.getElementById('edit-game-id').value = game.id;
  document.getElementById('edit-game-name').value = game.name;
  document.getElementById('edit-game-image').value = game.image.startsWith('data:image/svg+xml') ? '' : game.image;
  document.getElementById('edit-game-category').value = game.category;
  document.getElementById('edit-game-price').value = game.price;
  document.getElementById('edit-game-desc').value = game.description || '';

  const modal = document.getElementById('edit-game-modal');
  if (modal) modal.classList.add('active');
}

function closeEditGameModal() {
  try { playClickSound(); } catch(e){}
  const modal = document.getElementById('edit-game-modal');
  if (modal) modal.classList.remove('active');
}

function clearEditImage() {
  document.getElementById('edit-game-image').value = '';
}

function saveEditedGame(event) {
  if (event) event.preventDefault();

  const gameId = document.getElementById('edit-game-id').value;
  const game = catalogGames.find(g => g.id === gameId);
  if (!game) return false;

  const newName = document.getElementById('edit-game-name').value.trim();
  const newImage = document.getElementById('edit-game-image').value.trim();
  const newCat = document.getElementById('edit-game-category').value;
  const newPrice = parseInt(document.getElementById('edit-game-price').value) || 3000;
  const newDesc = document.getElementById('edit-game-desc').value.trim();

  game.name = newName || game.name;
  game.image = newImage || getSVGPlaceholder(game.name);
  game.category = newCat;
  game.price = newPrice;
  game.description = newDesc;

  saveCatalogToStorage();
  closeEditGameModal();
  renderCatalog();
  showToast(`✏️ Juego "${game.name}" actualizado`);
  try { playAddCartSound(); } catch(e){}
  return false;
}

// DELETE GAME FUNCTION (DELETE)
function deleteGame(gameId) {
  if (!adminModeActive) return;
  const game = catalogGames.find(g => g.id === gameId);
  if (!game) return;

  if (confirm(`¿Estás seguro de que deseas eliminar "${game.name}" del catálogo?`)) {
    try { playClickSound(); } catch(e){}
    catalogGames = catalogGames.filter(g => g.id !== gameId);

    // Remove from cart if present
    cart = cart.filter(i => i.id !== gameId);
    saveCartToStorage();

    saveCatalogToStorage();
    renderCatalog();
    showToast(`🗑️ Juego "${game.name}" eliminado del catálogo`);
  }
}

// Reset Catalog to initial default games (Password protected in Admin Mode)
function resetCatalogToDefault() {
  if (!adminModeActive) {
    const inputPass = prompt("🔑 Ingrese la contraseña de Administrador para restablecer:");
    if (inputPass !== ADMIN_PASSWORD) {
      alert("❌ Acceso denegado.");
      return;
    }
  }

  if (confirm("¿Deseas restablecer el catálogo a los juegos por defecto? (Se borrarán las modificaciones)")) {
    catalogGames = [...defaultGamesList];
    saveCatalogToStorage();
    currentPage = 1;
    renderCatalog();
    showToast("🔄 Catálogo restablecido a valores iniciales");
  }
}

// Cart & Quotation Functions
function addToCart(gameId) {
  try { playAddCartSound(); } catch(e){}
  const game = catalogGames.find(g => g.id === gameId);
  if (!game) return;

  const existing = cart.find(item => item.id === gameId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: game.id,
      name: game.name,
      price: game.price,
      image: game.image,
      quantity: 1
    });
  }

  saveCartToStorage();
  showToast(`🛒 "${game.name}" agregado a la lista`);
}

function updateCartBadge() {
  const badge = document.getElementById('cart-count-badge');
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  if (badge) {
    badge.textContent = totalItems;
  }
}

function openCartModal() {
  try { playModalSound(); } catch(e){}
  renderCartModalContent();
  const modal = document.getElementById('cart-modal');
  if (modal) modal.classList.add('active');
}

function closeCartModal() {
  try { playClickSound(); } catch(e){}
  const modal = document.getElementById('cart-modal');
  if (modal) modal.classList.remove('active');
}

function updateQuantity(gameId, change) {
  try { playClickSound(); } catch(e){}
  const item = cart.find(i => i.id === gameId);
  if (!item) return;

  item.quantity += change;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== gameId);
  }
  saveCartToStorage();
  renderCartModalContent();
}

function removeFromCart(gameId) {
  try { playClickSound(); } catch(e){}
  cart = cart.filter(i => i.id !== gameId);
  saveCartToStorage();
  renderCartModalContent();
}

function renderCartModalContent() {
  const listContainer = document.getElementById('cart-items-list');
  const totalLabel = document.getElementById('cart-total-price');

  if (!listContainer) return;

  if (cart.length === 0) {
    listContainer.innerHTML = `
      <div style="text-align: center; padding: 30px; color: var(--text-muted);">
        <p>Tu cotizador está vacío.</p>
        <p style="font-size: 0.85rem; margin-top: 6px;">Selecciona juegos del catálogo presionando " Cotizar".</p>
      </div>
    `;
    if (totalLabel) totalLabel.textContent = "$0";
    return;
  }

  let totalSum = 0;

  listContainer.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    totalSum += itemTotal;

    return `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.image}" alt="${item.name}" onerror="this.onerror=null; this.src='${getSVGPlaceholder(item.name)}';">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${item.price.toLocaleString('es-AR')} x ${item.quantity} = $${itemTotal.toLocaleString('es-AR')}</div>
        </div>
        <div class="cart-qty-controls">
          <button class="btn-qty" onclick="updateQuantity('${item.id}', -1)">-</button>
          <span>${item.quantity}</span>
          <button class="btn-qty" onclick="updateQuantity('${item.id}', 1)">+</button>
          <button class="btn-qty" style="background: rgba(255, 0, 127, 0.2); border-color: var(--magenta-glow); margin-left: 6px;" onclick="removeFromCart('${item.id}')">🗑️</button>
        </div>
      </div>
    `;
  }).join('');

  if (totalLabel) {
    totalLabel.textContent = `$${totalSum.toLocaleString('es-AR')}`;
  }
}

// Send Order directly via WhatsApp to number 2964476309
function sendWhatsAppOrder() {
  if (cart.length === 0) {
    alert("Tu cotizador está vacío. Agrega al menos un juego para enviar el pedido.");
    return;
  }

  try { playAddCartSound(); } catch(e){}

  let message = "🎮 *PEDIDO DE JUEGOS DE PS2 EN DVD*\n\n";
  message += "Hola, quisiera realizar el pedido de la siguiente cotización:\n\n";

  let totalSum = 0;
  cart.forEach((item, index) => {
    const itemSubtotal = item.price * item.quantity;
    totalSum += itemSubtotal;
    message += `${index + 1}. *${item.name}* (x${item.quantity}) - $${itemSubtotal.toLocaleString('es-AR')}\n`;
  });

  message += `\n💰 *TOTAL A PAGAR:* $${totalSum.toLocaleString('es-AR')}\n\n`;
  message += "📌 Por favor confírmame disponibilidad para coordinar la entrega o envío. ¡Muchas gracias!";

  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappURL, '_blank');
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initData();

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
  }
});
