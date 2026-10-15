const orderStorageKey = "purpleBuffBrewsOrder";
let orderItems = JSON.parse(localStorage.getItem(orderStorageKey) || "[]");

const menuImages = {
    "spanish-latte": "images/drinks/spanish latte.jpg",
    "cold-brew": "images/drinks/Cold brew.jpg",
    "sea-salt-caramel-latte": "images/drinks/sea salt caramel.jpg",
    "iced-americano": "images/drinks/ice americano.jpg",
    "vanilla-macchiato": "images/drinks/Vanilla Macchiato.jpg",
    "cafe-mocha": "images/drinks/cafe mocha.jpg",
    "white-chocolate-mocha": "images/drinks/White Chocolate Mocha.jpg",
    "dark-chocolate-latte": "images/drinks/Dark Chocolate Latte.jpg",
    "iced-matcha-latte": "images/drinks/Iced Matcha Latte.jpg",
    "belgian-dark-chocolate": "images/drinks/Belgian Dark Chocolate.jpg",
    "taro-milk-tea-with-pearls": "images/drinks/taro milk tea.jpg",
    "strawberry-milk": "images/drinks/strawberry milk.jpg",
    "wintermelon-milk-tea": "images/drinks/Wintermelon Milk Tea.jpg",
    "classic-milk-tea-with-pudding": "images/drinks/Classic Milk Tea with Pudding.jpg",
    "fresh-lemon-honey-tea": "images/drinks/Fresh Lemon Honey Tea.jpg",
    "butter-croissant": "images/Snacks/Butter Croissant.jpg",
    "cheese-ensaymada": "images/Snacks/Cheese Ensaymada.jpg",
    "cinnamon-roll": "images/Snacks/Cinnamon Roll.jpg",
    "fudgy-dark-chocolate-brownie": "images/Snacks/Fudgy Dark Chocolate Brownie.jpg",
    "classic-cheese-roll": "images/Snacks/Classic Cheese Roll.jpg",
    "blueberry-cheesecake-slice": "images/Snacks/Blueberry Cheesecake Slice.jpg",
    "chocolate-fudge-cake-slice": "images/Snacks/Chocolate Fudge Cake Slice.jpg",
    "banana-bread-slice": "images/Snacks/Banana Bread Slice.jpg",
    "loaded-nacho-supreme": "images/Snacks/Loaded Nacho Supreme.jpg",
    "flavored-french-fries": "images/Snacks/Flavored French Fries.jpg",
    "mozzarella-cheese-sticks": "images/Snacks/Mozzarella Cheese Sticks.jpg",
    "club-sandwich-bites": "images/Snacks/Club Sandwich Bites.jpg",
    "beef-tapa-rice-bowl": "images/Meals/Beef Tapa Rice Bowl.jpg",
    "sweet-pork-tocino": "images/Meals/Sweet Pork Tocino.jpg",
    "crispy-chicken-popcorn-rice": "images/Meals/Crispy Chicken Popcorn Rice.jpg",
    "pork-bbq-rice-plate": "images/Meals/Pork BBQ Rice Plate.jpg",
    "longganisa-rice-meal": "images/Meals/Longganisa Rice Meal.jpg",
    "bangus-sisig-rice-bowl": "images/Meals/Bangus Sisig Rice Bowl.jpg",
    "creamy-carbonara": "images/Meals/Creamy Carbonara.jpg",
    "chicken-alfredo-pasta": "images/Meals/Chicken Alfredo Pasta.jpg",
    "crispy-chicken-burger": "images/Meals/Crispy Chicken Burger.jpg"
};

const carouselSlides = [
    { src: "images/drinks/spanish latte.jpg", alt: "Spanish latte with a smooth espresso and milk finish", title: "01 / SPANISH LATTE" },
    { src: "images/Meals/Bangus Sisig Rice Bowl.jpg", alt: "Bangus sisig rice bowl served with garlic rice", title: "02 / BANGUS SISIG" },
    { src: "images/Snacks/Butter Croissant.jpg", alt: "Golden butter croissant baked fresh", title: "03 / BUTTER CROISSANT" },
    { src: "images/drinks/taro milk tea.jpg", alt: "Taro milk tea with chewy pearls", title: "04 / TARO MILK TEA" }
];
let carouselIndex = 0;
const heroSlideCount = 4;
let heroSlideIndex = 0;
let heroSliderTimer = null;

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
    orderFeedback.textContent = `${item.name} added to your order.`;
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
    const activeCategoryButton = document.querySelector(".category-filter-button[aria-pressed='true']");
    const searchInput = document.getElementById("menu-search");
    const menuGrid = document.getElementById("menu-grid");
    const filterStatus = document.getElementById("filter-status");
    const selectedCategory = activeCategoryButton.dataset.categoryFilter;
    const searchTerm = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    menuGrid.querySelectorAll(".menu-card").forEach((menuCard) => {
        const matchesCategory = selectedCategory === "all" || menuCard.dataset.category === selectedCategory;
        const matchesSearch = menuCard.dataset.search.includes(searchTerm);
        menuCard.hidden = !(matchesCategory && matchesSearch);
        visibleCount += menuCard.hidden ? 0 : 1;
    });

    menuGrid.querySelectorAll(".category-divider").forEach((heading) => {
        heading.hidden = ![...menuGrid.querySelectorAll(".menu-card")].some((menuCard) =>
            menuCard.dataset.category === heading.dataset.menuCategory && !menuCard.hidden
        );
    });

    filterStatus.textContent = searchTerm
        ? `${visibleCount} ${visibleCount === 1 ? "match" : "matches"} found`
        : `${visibleCount} ${visibleCount === 1 ? "item" : "items"} in this loadout`;
    menuGrid.classList.toggle("filtered-grid", selectedCategory !== "all");
}

function setCategoryFilter(category) {
    document.querySelectorAll(".category-filter-button").forEach((button) => {
        button.setAttribute("aria-pressed", button.dataset.categoryFilter === category);
    });
    filterMenu();
}

function searchMenu() {
    const searchInput = document.getElementById("menu-search");

    searchInput.classList.toggle("search-active", searchInput.value.trim().length > 0);
    filterMenu();
}

function updateOrderSummary() {
    const orderCount = document.getElementById("order-count");
    const orderItemCount = document.getElementById("order-item-count");
    const orderTotal = document.getElementById("order-total");
    const itemCount = orderItems.length;
    const total = orderItems.reduce((sum, item) => sum + item.price, 0);

    if (orderCount) {
        orderCount.textContent = itemCount;
    }
    if (orderItemCount) {
        orderItemCount.textContent = `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
    }
    if (orderTotal) {
        orderTotal.textContent = `₱${total.toLocaleString("en-PH")}`;
    }
}

function clearOrder() {
    const orderFeedback = document.getElementById("order-feedback");
    const orderPanel = document.getElementById("order-panel");

    orderItems = [];
    localStorage.removeItem(orderStorageKey);
    orderFeedback.textContent = "Your order has been cleared.";
    orderFeedback.classList.add("feedback-visible");
    orderPanel.classList.add("order-cleared");
    document.querySelectorAll(".menu-card.item-added").forEach((menuCard) => menuCard.classList.remove("item-added"));
    updateOrderSummary();
}

function checkoutOrder() {
    const orderFeedback = document.getElementById("order-feedback");
    const orderPanel = document.getElementById("order-panel");

    orderFeedback.textContent = "Checkout is a demo only — no backend connected yet.";
    orderFeedback.classList.add("feedback-visible");
    orderPanel.classList.add("order-cleared");
}

function moveCarousel(direction) {
    const carouselImage = document.getElementById("carousel-image");
    const carouselCaption = document.getElementById("carousel-caption");
    if (!carouselImage || !carouselCaption) {
        return;
    }

    carouselIndex = (carouselIndex + direction + carouselSlides.length) % carouselSlides.length;
    const nextSlide = carouselSlides[carouselIndex];
    carouselImage.classList.add("carousel-changing");
    window.setTimeout(() => {
        carouselImage.src = nextSlide.src;
        carouselImage.alt = nextSlide.alt;
        carouselCaption.textContent = nextSlide.title;
        carouselImage.classList.remove("carousel-changing");
    }, 130);
}

function showHeroSlide(index) {
    const slideIndex = (index + heroSlideCount) % heroSlideCount;
    const activeSlide = document.getElementById(`hero-slide-${slideIndex}`);

    if (!activeSlide) {
        return;
    }

    heroSlideIndex = slideIndex;
    for (let currentIndex = 0; currentIndex < heroSlideCount; currentIndex += 1) {
        const slide = document.getElementById(`hero-slide-${currentIndex}`);
        if (slide) {
            slide.classList.toggle("is-active", currentIndex === heroSlideIndex);
        }
    }
}

function pauseHeroSlider(pointerEvent) {
    const heroSlider = document.getElementById("hero-slider");
    if (!heroSlider || (pointerEvent && heroSlider.contains(pointerEvent.relatedTarget))) {
        return;
    }

    window.clearInterval(heroSliderTimer);
    heroSliderTimer = null;
}

function resumeHeroSlider(pointerEvent) {
    const heroSlider = document.getElementById("hero-slider");
    if (!heroSlider || (pointerEvent && heroSlider.contains(pointerEvent.relatedTarget)) || window.matchMedia("(prefers-reduced-motion: reduce)").matches || heroSliderTimer !== null) {
        return;
    }

    heroSliderTimer = window.setInterval(() => showHeroSlide(heroSlideIndex + 1), 5000);
}

function setupHeroSlider() {
    const heroSlider = document.getElementById("hero-slider");
    const firstSlide = document.getElementById("hero-slide-0");

    if (!heroSlider || !firstSlide) {
        return;
    }

    showHeroSlide(heroSlideIndex);
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        heroSliderTimer = window.setInterval(() => showHeroSlide(heroSlideIndex + 1), 5000);
    }
}

function addMenuImages() {
    const menuGrid = document.getElementById("menu-grid");
    if (!menuGrid) {
        return;
    }

    menuGrid.querySelectorAll(".menu-card").forEach((menuCard) => {
        const imagePath = menuImages[menuCard.id];
        if (!imagePath) {
            return;
        }

        const art = menuCard.querySelector(".menu-card-art");
        const image = document.createElement("img");
        image.className = "menu-food-image";
        image.src = imagePath;
        image.alt = `${menuCard.dataset.name}, served at Purple Buff Brews`;
        image.loading = "lazy";
        image.addEventListener("error", () => image.remove(), { once: true });
        art.prepend(image);
        art.classList.add("has-photo");
    });
}

function setupScrollReveals() {
    const homeSection = document.getElementById("home");
    const revealItems = [homeSection, ...document.querySelectorAll(".story-section, .featured-section, .photo-strip, .visit-section, .menu-intro, .category-divider, .menu-card, .order-panel")].filter(Boolean);
    if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    // Reveal each section once as it enters the viewport.
    document.documentElement.classList.add("motion-enabled");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: "0px 0px -35px 0px" });

    revealItems.forEach((item) => revealObserver.observe(item));
}

document.getElementById("carousel-previous")?.addEventListener("click", () => moveCarousel(-1));
document.getElementById("carousel-next")?.addEventListener("click", () => moveCarousel(1));

const menuGrid = document.getElementById("menu-grid");
if (menuGrid) {
    menuGrid.querySelectorAll(".menu-card").forEach((menuCard) => {
        menuCard.onmouseover = () => showItemDetails(menuCard.id);
        menuCard.onmouseout = (pointerEvent) => hideItemDetails(menuCard.id, pointerEvent);
    });
}

addMenuImages();
setupHeroSlider();
setupScrollReveals();
updateOrderSummary();