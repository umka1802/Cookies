const STORAGE_KEY = "cookies-admin-data";

const FALLBACK_PRODUCTS = [
    { id: 1, title: "Лучшие друзья", text: "Фирменное печенье с шоколадной крошкой и грецкими орехами.", price: 20, weight: "2 шт./ 200 гр.", image: "images/1.png" },
    { id: 2, title: "Шоколадный француз", text: "Изготовлено из тёмного французского какао и шоколадной стружки.", price: 24, weight: "2 шт./ 200 гр.", image: "images/2.png" },
    { id: 3, title: "Овсянка с изюмом, Сэр!", text: "Сдобное маслянистое печенье с пухлым сладким изюмом.", price: 18, weight: "2 шт./ 200 гр.", image: "images/3.png" },
    { id: 4, title: "Шоколадное наслаждение", text: "Хрустящее снаружи и липкое в центре печенье с шоколадной стружкой.", price: 24, weight: "2 шт./ 200 гр.", image: "images/4.png" },
    { id: 5, title: "Арахисовый рай", text: "Сладкое и пикантное печенье для любителей арахисового масла.", price: 20, weight: "2 шт./ 200 гр.", image: "images/5.png" },
    { id: 6, title: "Шоколадный ореховый деликатес", text: "Фирменная рецептура с шоколадными крошками и грецкими орехами.", price: 18, weight: "2 шт./ 200 гр.", image: "images/6.png" },
    { id: 7, title: "Ассорти фирменного печенья", text: "Классический ассортимент из четырёх оригинальных вкусов.", price: 36, weight: "4 шт./ 400 гр.", image: "images/7.png" },
    { id: 8, title: "Лимонное печенье", text: "Жевательное, лимонное, не слишком сладкое лакомство.", price: 33, weight: "4 шт./ 400 гр.", image: "images/8.png" },
    { id: 9, title: "Любители шоколада", text: "Набор для всех, кто действительно любит шоколад.", price: 38, weight: "4 шт./ 400 гр.", image: "images/9.png" },
    { id: 10, title: "Карамель и кокос", text: "Кокосовое, маслянистое, карамельное печенье.", price: 33, weight: "4 шт./ 400 гр.", image: "images/10.png" },
    { id: 11, title: "Веганское с шоколадной крошкой", text: "Веганское безглютеновое печенье с грецкими орехами.", price: 39, weight: "4 шт./ 400 гр.", image: "images/11.png" },
    { id: 12, title: "Крем-брюле ореховое печенье", text: "Уникальная смесь крем-брюле и миндальных орехов.", price: 35, weight: "4 шт./ 400 гр.", image: "images/12.png" }
];

function getStoredData() {
    try {
        const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
        return data && typeof data === "object" ? data : null;
    } catch (e) {
        return null;
    }
}

function getCatalog() {
    const data = getStoredData();
    if (data && Array.isArray(data.products) && data.products.length) {
        return data.products;
    }
    return FALLBACK_PRODUCTS;
}

document.getElementById("main-action-button").onclick = function () {
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
};

const links = document.querySelectorAll(".menu-item > a");
for (let i = 0; i < links.length; i++) {
    links[i].onclick = function () {
        document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({ behavior: "smooth" });
    };
}

/* кнопки "Заказать" у карточек товаров: прокрутка + подстановка в форму */
const productSelect = document.getElementById("product");

const buttons = document.querySelectorAll(".product-item .button");
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        const titleEl = buttons[i].closest(".product-item").querySelector(".products-item-title");
        if (titleEl) {
            productSelect.value = titleEl.textContent.trim();
        }
        document.getElementById("order").scrollIntoView({ behavior: "smooth" });
    };
}

/* загрузка товаров в select */
(function () {
    const catalog = getCatalog();
    const fragment = document.createDocumentFragment();
    catalog.forEach((p) => {
        const option = document.createElement("option");
        option.value = p.title;
        option.textContent = p.title + " — " + p.price + " $";
        fragment.appendChild(option);
    });
    productSelect.appendChild(fragment);
})();

const prices = document.getElementsByClassName("products-item-price");
document.getElementById("change-currency").onclick = function (e) {
    const currency = e.target.innerText;

    let newCurrency = "$";
    let coefficient = "1";
    if (currency === "$") {
        newCurrency = "₽";
        coefficient = 90;
    } else if (currency === "₽") {
        newCurrency = "BYN";
        coefficient = 3;
    } else if (currency === "BYN") {
        newCurrency = "€";
        coefficient = 0.9;
    } else if (currency === "€") {
        newCurrency = "¥";
        coefficient = 6.9;
    }
    e.target.innerText = newCurrency;

    for (let i = 0; i < prices.length; i++) {
        prices[i].innerText = +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) + " " + newCurrency;
    }
};

const product = document.getElementById("product");
const name = document.getElementById("name");
const phone = document.getElementById("phone");

function saveOrder(order) {
    const data = getStoredData();
    if (data && Array.isArray(data.orders)) {
        data.orders.push(order);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            products: getCatalog(),
            orders: [order]
        }));
    }
}

function getProductAmount(title) {
    const catalog = getCatalog();
    const match = catalog.find((p) => p.title === title);
    return match ? Number(match.price) : 0;
}

document.getElementById("order-action").onclick = function () {
    let hasError = false;

    [product, name, phone].forEach((item) => {
        if (!item.value) {
            item.style.borderColor = "red";
            hasError = true;
        } else {
            item.style.borderColor = "";
        }
    });

    if (!hasError) {
        const data = getStoredData();
        const orders = data && Array.isArray(data.orders) ? data.orders : [];
        const maxId = orders.reduce((m, o) => Math.max(m, o.id || 0), 0);
        const order = {
            id: maxId + 1,
            name: name.value.trim(),
            phone: phone.value.trim(),
            product: product.value,
            amount: getProductAmount(product.value),
            status: "new",
            at: Date.now()
        };

        saveOrder(order);
        product.value = "";
        name.value = "";
        phone.value = "";

        const notify = document.createElement("div");
        notify.className = "order-success";
        notify.textContent = "Спасибо за заказ! Мы скоро свяжемся с вами!";
        const inputs = document.querySelector(".order-form-inputs");
        inputs.appendChild(notify);
        setTimeout(() => notify.remove(), 4000);
    }
};