const STORAGE_KEY = 'cookies-admin-data';
const CURRENCY = '$';

const SEED_PRODUCTS = [
    { id: 1, title: 'Лучшие друзья', text: 'Фирменное печенье с шоколадной крошкой и грецкими орехами — хрустящее снаружи с толстой липкой серединкой.', price: 20, weight: '2 шт./ 200 гр.', image: '../images/1.png', sold: 120 },
    { id: 2, title: 'Шоколадный француз', text: 'Изготовлено из тёмного французского какао и полусладкой шоколадной стружки.', price: 24, weight: '2 шт./ 200 гр.', image: '../images/2.png', sold: 96 },
    { id: 3, title: 'Овсянка с изюмом, Сэр!', text: 'Сдобное маслянистое печенье, золотисто-коричневое снаружи, влажное внутри и с пухлым сладким изюмом.', price: 18, weight: '2 шт./ 200 гр.', image: '../images/3.png', sold: 88 },
    { id: 4, title: 'Шоколадное наслаждение', text: 'Идеально хрустящее снаружи и густое и липкое в центре печенье с тёмной шоколадной стружкой.', price: 24, weight: '2 шт./ 200 гр.', image: '../images/4.png', sold: 74 },
    { id: 5, title: 'Арахисовый рай', text: 'Сладкое, пикантное и идеально сбалансированное печенье для любителей арахисового масла.', price: 20, weight: '2 шт./ 200 гр.', image: '../images/5.png', sold: 65 },
    { id: 6, title: 'Шоколадный ореховый деликатес', text: 'Фирменная рецептура с шоколадными крошками и грецкими орехами: хруст снаружи, нежная сердцевина внутри.', price: 18, weight: '2 шт./ 200 гр.', image: '../images/6.png', sold: 60 },
    { id: 7, title: 'Ассорти фирменного печенья', text: 'Наш классический ассортимент включает по одному из четырёх оригинальных вкусов печенья.', price: 36, weight: '4 шт./ 400 гр.', image: '../images/7.png', sold: 52 },
    { id: 8, title: 'Лимонное печенье', text: 'Жевательное, лимонное, не слишком сладкое и даже немного освежающее лакомство.', price: 33, weight: '4 шт./ 400 гр.', image: '../images/8.png', sold: 48 },
    { id: 9, title: 'Любители шоколада', text: 'Набор для всех, кто действительно любит шоколад.', price: 38, weight: '4 шт./ 400 гр.', image: '../images/9.png', sold: 41 },
    { id: 10, title: 'Карамель и кокос', text: 'Кокосовое, маслянистое, карамельное печенье с невиданным вкусом и текстурой.', price: 33, weight: '4 шт./ 400 гр.', image: '../images/10.png', sold: 35 },
    { id: 11, title: 'Веганское с шоколадной крошкой', text: 'Веганское безглютеновое печенье с грецкими орехами и полусладкой шоколадной стружкой.', price: 39, weight: '4 шт./ 400 гр.', image: '../images/11.png', sold: 30 },
    { id: 12, title: 'Крем-брюле ореховое печенье', text: 'Уникальная смесь кусочков крем-брюле и миндальных орехов: хрустящая корочка и тает во рту.', price: 35, weight: '4 шт./ 400 гр.', image: '../images/12.png', sold: 27 }
];

const SEED_ORDERS = [
    { id: 1001, name: 'Анна Смирнова', phone: '+7 999 111-22-33', product: 'Лучшие друзья', amount: 20, status: 'done', at: Date.now() - 1000 * 60 * 60 * 26 },
    { id: 1002, name: 'Игорь Петров', phone: '+7 911 555-66-77', product: 'Шоколадный француз', amount: 48, status: 'done', at: Date.now() - 1000 * 60 * 60 * 20 },
    { id: 1003, name: 'Мария Иванова', phone: '+7 921 888-99-00', product: 'Ассорти фирменного печенья', amount: 36, status: 'cancel', at: Date.now() - 1000 * 60 * 60 * 12 },
    { id: 1004, name: 'Дмитрий Козлов', phone: '+7 903 222-33-44', product: 'Лимонное печенье', amount: 33, status: 'new', at: Date.now() - 1000 * 60 * 60 * 3 },
    { id: 1005, name: 'Ольга Соколова', phone: '+7 916 444-55-66', product: 'Арахисовый рай', amount: 40, status: 'new', at: Date.now() - 1000 * 60 * 30 },
    { id: 1006, name: 'Павел Орлов', phone: '+7 905 777-88-99', product: 'Крем-брюле ореховое печенье', amount: 35, status: 'new', at: Date.now() - 1000 * 60 * 10 }
];

const STATUS_LABELS = { new: 'Новый', done: 'Выполнен', cancel: 'Отменён' };

const state = {
    products: [],
    orders: [],
    query: ''
};

function initData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const data = JSON.parse(saved);
            state.products = data.products || [];
            state.orders = data.orders || [];
        } catch (e) {
            state.products = [];
            state.orders = [];
        }
    } else {
        state.products = clone(SEED_PRODUCTS);
        state.orders = clone(SEED_ORDERS);
        saveData();
    }
}

function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ products: state.products, orders: state.orders }));
}

function clone(arr) {
    return JSON.parse(JSON.stringify(arr));
}

function nextId(list) {
    return list.reduce((m, i) => Math.max(m, i.id), 0) + 1;
}

/* ============ Navigation ============ */
function setupNav() {
    document.querySelectorAll('.sidebar-item[data-page]').forEach(btn => {
        btn.addEventListener('click', e => {
            if (e.target.closest('.link-btn')) return;
            switchPage(btn.dataset.page);
        });
    });

    document.querySelector('#burger').addEventListener('click', () => {
        document.querySelector('#sidebar').classList.toggle('open');
    });
}

function switchPage(name) {
    document.querySelectorAll('.sidebar-item[data-page]').forEach(b => {
        b.classList.toggle('active', b.dataset.page === name);
    });
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelector('#page-' + name).classList.add('active');
    document.querySelector('#sidebar').classList.remove('open');
    renderPage(name);
}

function renderPage(name) {
    if (name === 'dashboard') renderDashboard();
    if (name === 'products') renderProducts();
    if (name === 'orders') renderOrders();
}

/* ============ Dashboard ============ */
function renderDashboard() {
    const totalProducts = state.products.length;
    const orders = state.orders;
    const dayMs = 1000 * 60 * 60 * 24;
    const today = orders.filter(o => Date.now() - o.at < dayMs).length;
    const revenue = orders.filter(o => o.status !== 'cancel').reduce((s, o) => s + o.amount, 0);

    document.querySelector('#stat-products').textContent = totalProducts;
    document.querySelector('#stat-orders').textContent = orders.length;
    document.querySelector('#stat-revenue').textContent = revenue + ' ' + CURRENCY;
    document.querySelector('#stat-today').textContent = today;

    renderChart();
    renderRecentOrders();

    const d = new Date();
    const chip = document.querySelector('#date-chip');
    chip.textContent = d.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' });
}

function renderChart() {
    const top = state.products
        .slice()
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5);
    const max = top.length ? top[0].sold : 1;
    const chart = document.querySelector('#chart');

    if (!top.length) {
        chart.innerHTML = '<div class="empty-state">Нет данных о продажах</div>';
        return;
    }

    chart.innerHTML = top.map(p => `
        <div class="chart-row">
            <div class="chart-label" title="${escapeHtml(p.title)}">${escapeHtml(p.title)}</div>
            <div class="chart-bar">
                <div class="chart-fill" style="width:${Math.round(p.sold / max * 100)}%"></div>
            </div>
            <div class="chart-value">${p.sold}</div>
        </div>
    `).join('');
}

function renderRecentOrders() {
    const list = state.orders
        .slice()
        .sort((a, b) => b.at - a.at)
        .slice(0, 5);
    const wrap = document.querySelector('#recent-orders');

    if (!list.length) {
        wrap.innerHTML = '<div class="empty-state">Заказов пока нет</div>';
        return;
    }

    wrap.innerHTML = list.map(o => `
        <div class="order-row">
            <div class="order-row-name">${escapeHtml(o.name)}</div>
            <div class="order-row-info">${escapeHtml(o.product)}</div>
            <span class="order-row-status status-${o.status}">${STATUS_LABELS[o.status]}</span>
            <div class="order-row-amount">${o.amount} ${CURRENCY}</div>
        </div>
    `).join('');
}

/* ============ Products ============ */
function renderProducts() {
    const q = state.query.trim().toLowerCase();
    const filtered = q
        ? state.products.filter(p => p.title.toLowerCase().includes(q))
        : state.products;

    document.querySelector('#products-badge').textContent = state.products.length;
    const grid = document.querySelector('#products-grid');

    if (!filtered.length) {
        grid.innerHTML = '<div class="empty-state">Ничего не найдено</div>';
        return;
    }

    grid.innerHTML = filtered.map(p => `
        <div class="product-card">
            <div class="product-card-image"><img src="${escapeAttr(p.image)}" alt="${escapeAttr(p.title)}"></div>
            <div class="product-card-body">
                <div class="product-card-title">${escapeHtml(p.title)}</div>
                <div class="product-card-text">${escapeHtml(p.text)}</div>
                <div style="font-size:13px;color:var(--muted)">${escapeHtml(p.weight)}</div>
            </div>
            <div class="product-card-footer">
                <div class="product-card-price">${p.price} ${CURRENCY}</div>
                <div class="product-card-actions">
                    <button class="icon-button" onclick="editProduct(${p.id})" title="Редактировать">✎</button>
                    <button class="icon-button danger" onclick="deleteProduct(${p.id})" title="Удалить">✕</button>
                </div>
            </div>
        </div>
    `).join('');
}

function editProduct(id) {
    const p = state.products.find(x => x.id === id);
    if (!p) return;

    document.querySelector('#modal-title').textContent = 'Редактировать товар';
    document.querySelector('#pf-id').value = p.id;
    document.querySelector('#pf-title').value = p.title;
    document.querySelector('#pf-text').value = p.text;
    document.querySelector('#pf-price').value = p.price;
    document.querySelector('#pf-weight').value = p.weight;
    document.querySelector('#pf-image').value = p.image;
    openModal();
}

function deleteProduct(id) {
    if (!confirm('Удалить товар?')) return;
    state.products = state.products.filter(p => p.id !== id);
    saveData();
    renderProducts();
    showToast('Товар удалён');
}

function submitProduct(e) {
    e.preventDefault();

    const id = document.querySelector('#pf-id').value;
    const data = {
        title: document.querySelector('#pf-title').value.trim(),
        text: document.querySelector('#pf-text').value.trim(),
        price: Number(document.querySelector('#pf-price').value),
        weight: document.querySelector('#pf-weight').value.trim(),
        image: document.querySelector('#pf-image').value.trim(),
        sold: 0
    };

    if (id) {
        const p = state.products.find(x => x.id === Number(id));
        if (p) Object.assign(p, data);
        showToast('Товар обновлён');
    } else {
        data.id = nextId(state.products);
        state.products.push(data);
        showToast('Товар добавлен');
    }

    saveData();
    closeModal();
    document.querySelector('#product-form').reset();
    renderProducts();
    renderDashboard();
}

/* ============ Orders ============ */
function renderOrders() {
    const q = (state.ordersQuery || '').trim().toLowerCase();
    const filtered = q
        ? state.orders.filter(o =>
            o.name.toLowerCase().includes(q) ||
            o.phone.toLowerCase().includes(q) ||
            o.product.toLowerCase().includes(q))
        : state.orders;

    const sorted = filtered.slice().sort((a, b) => b.at - a.at);
    document.querySelector('#orders-badge').textContent = state.orders.length;
    document.querySelector('#orders-total').textContent = 'Всего: ' + filtered.length;

    const wrap = document.querySelector('#orders-table-wrap');
    if (!sorted.length) {
        wrap.innerHTML = '<div class="empty-state">Заказов не найдено</div>';
        return;
    }

    const rows = sorted.map(o => `
        <tr>
            <td>#${o.id}</td>
            <td>${escapeHtml(o.name)}</td>
            <td>${escapeHtml(o.phone)}</td>
            <td>${escapeHtml(o.product)}</td>
            <td>${o.amount} ${CURRENCY}</td>
            <td><span class="order-row-status status-${o.status}">${STATUS_LABELS[o.status]}</span></td>
            <td>
                <select class="status-select" onchange="changeStatus(${o.id}, this.value)">
                    <option value="new" ${o.status === 'new' ? 'selected' : ''}>Новый</option>
                    <option value="done" ${o.status === 'done' ? 'selected' : ''}>Выполнен</option>
                    <option value="cancel" ${o.status === 'cancel' ? 'selected' : ''}>Отменён</option>
                </select>
            </td>
        </tr>
    `).join('');

    wrap.innerHTML = `
        <table class="orders-table">
            <thead>
                <tr>
                    <th>№</th><th>Имя</th><th>Телефон</th><th>Товар</th><th>Сумма</th><th>Статус</th><th>Изменить</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

function changeStatus(id, status) {
    const o = state.orders.find(x => x.id === id);
    if (!o) return;
    o.status = status;
    saveData();
    renderOrders();
    const d = document.querySelector('#page-dashboard');
    if (d.classList.contains('active')) renderDashboard();
    showToast('Статус обновлён: ' + STATUS_LABELS[status]);
}

/* ============ Modal ============ */
function openModal() {
    document.querySelector('#modal-overlay').classList.add('open');
}

function closeModal() {
    document.querySelector('#modal-overlay').classList.remove('open');
}

/* ============ Utilities ============ */
let toastTimer;

function showToast(msg) {
    const t = document.querySelector('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2200);
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
}

function escapeAttr(s) {
    return escapeHtml(s);
}

/* ============ Init ============ */
function bindEvents() {
    document.querySelectorAll('.link-btn').forEach(b => {
        b.addEventListener('click', e => {
            e.preventDefault();
            switchPage(b.dataset.page);
        });
    });

    document.querySelector('#add-product-btn').addEventListener('click', () => {
        document.querySelector('#modal-title').textContent = 'Добавить товар';
        document.querySelector('#product-form').reset();
        document.querySelector('#pf-id').value = '';
        openModal();
    });

    document.querySelector('#product-form').addEventListener('submit', submitProduct);
    document.querySelector('#modal-close').addEventListener('click', closeModal);
    document.querySelector('#modal-cancel').addEventListener('click', closeModal);
    document.querySelector('#modal-overlay').addEventListener('click', e => {
        if (e.target === e.currentTarget) closeModal();
    });

    document.querySelector('#product-search').addEventListener('input', e => {
        state.query = e.target.value;
        renderProducts();
    });

    document.querySelector('#order-search').addEventListener('input', e => {
        state.ordersQuery = e.target.value;
        renderOrders();
    });

    document.querySelector('#logout-btn').addEventListener('click', () => {
        if (confirm('Выйти из админ-панели?')) location.href = '../index.html';
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    });

    document.querySelectorAll('.sidebar-item[data-page]').forEach(b => {
        if (b.classList.contains('active')) {
            renderPage(b.dataset.page);
        }
    });
}

initData();
setupNav();
bindEvents();
renderDashboard();
renderProducts();
renderOrders();