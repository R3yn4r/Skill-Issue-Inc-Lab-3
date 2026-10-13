const orderStorageKey = "purpleBuffBrewsOrder";
let orderItems = JSON.parse(localStorage.getItem(orderStorageKey) || "[]");

function toggleMobileMenu() {
    const navigation = document.getElementById("main-nav");
    const toggleButton = document.getElementById("nav-toggle");
    const isOpen = navigation.classList.toggle("nav-open");

    toggleButton.setAttribute("aria-expanded", isOpen);
    toggleButton.classList.toggle("toggle-active", isOpen);
}

function addToOrder(itemId) {
    const menuCard = document.getElementById(itemId);
    const orderFeedback = document.getElementById("order-feedback");
    const item = { name: menuCard.dataset.name, price: Number(menuCard.dataset.price) };

    orderItems.push(item);
    localStorage.setItem(orderStorageKey, JSON.stringify(orderItems));
    menuCard.classList.add("item-added");
    orderFeedback.innerHTML = `${item.name} added to your order.`;
    orderFeedback.classList.add("feedback-visible");
    updateOrderSummary();
}

function showItemDetails(itemId) {
    const menuCard = document.getElementById(itemId);
    const itemDescription = document.getElementById(`${itemId}-description`);
    itemDescription.classList.add("description-visible");
    menuCard.classList.add("card-hovered");
}

function hideItemDetails(itemId, pointerEvent) {
    const menuCard = document.getElementById(itemId);
    const itemDescription = document.getElementById(`${itemId}-description`);

    if (menuCard.contains(pointerEvent.relatedTarget)) {
        return;
    }

    itemDescription.classList.remove("description-visible");
    menuCard.classList.remove("card-hovered");
}

function filterMenu() {
    const categorySelect = document.getElementById("category-filter");
    const menuGrid = document.getElementById("menu-grid");
    const filterStatus = document.getElementById("filter-status");
    const selectedCategory = categorySelect.value;
    let visibleCount = 0;

    menuGrid.querySelectorAll(".menu-card").forEach((menuCard) => {
        const matchesCategory = selectedCategory === "all" || menuCard.dataset.category === selectedCategory;
        menuCard.hidden = !matchesCategory;
        visibleCount += matchesCategory ? 1 : 0;
    });

    filterStatus.innerHTML = `${visibleCount} ${visibleCount === 1 ? "item" : "items"} in this loadout`;
    menuGrid.classList.toggle("filtered-grid", selectedCategory !== "all");
}

function searchMenu() {
    const searchInput = document.getElementById("menu-search");
    const menuGrid = document.getElementById("menu-grid");
    const filterStatus = document.getElementById("filter-status");
    const searchTerm = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    menuGrid.querySelectorAll(".menu-card").forEach((menuCard) => {
        const matchesSearch = menuCard.dataset.search.includes(searchTerm);
        menuCard.hidden = !matchesSearch;
        visibleCount += matchesSearch ? 1 : 0;
    });

    filterStatus.innerHTML = searchTerm ? `${visibleCount} ${visibleCount === 1 ? "match" : "matches"} found` : `${visibleCount} items in this loadout`;
    searchInput.classList.toggle("search-active", searchTerm.length > 0);
}

function updateOrderSummary() {
    const orderCount = document.getElementById("order-count");
    const orderItemCount = document.getElementById("order-item-count");
    const orderTotal = document.getElementById("order-total");
    const itemCount = orderItems.length;
    const total = orderItems.reduce((sum, item) => sum + item.price, 0);

    orderCount.innerHTML = itemCount;
    if (orderItemCount) {
        orderItemCount.innerHTML = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
    }
    if (orderTotal) {
        orderTotal.innerHTML = `₱${total.toLocaleString("en-PH")}`;
    }
}

function clearOrder() {
    const orderFeedback = document.getElementById("order-feedback");
    const orderPanel = document.getElementById("order-panel");
    orderItems = [];
    localStorage.removeItem(orderStorageKey);
    orderFeedback.innerHTML = "Your order has been cleared.";
    orderFeedback.classList.add("feedback-visible");
    orderPanel.classList.add("order-cleared");
    updateOrderSummary();
}

function checkoutOrder() {
    const orderFeedback = document.getElementById("order-feedback");
    const orderPanel = document.getElementById("order-panel");
    orderFeedback.innerHTML = "Checkout is a demo only — no backend connected yet.";
    orderFeedback.classList.add("feedback-visible");
    orderPanel.classList.add("order-cleared");
}

const menuGrid = document.getElementById("menu-grid");
if (menuGrid) {
    menuGrid.querySelectorAll(".menu-card").forEach((menuCard) => {
        menuCard.onmouseover = () => showItemDetails(menuCard.id);
        menuCard.onmouseout = (pointerEvent) => hideItemDetails(menuCard.id, pointerEvent);
    });
}

updateOrderSummary();