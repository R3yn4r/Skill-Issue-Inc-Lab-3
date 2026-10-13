// Function 1: Toggle Dark Mode (Triggered by onclick)
function toggleDarkMode() {
    const pageBody = document.body;
    if (pageBody.style.backgroundColor === "rgb(21, 21, 21)") {
        pageBody.style.backgroundColor = "#f4f4f4";
        pageBody.style.color = "#222222";
    } else {
        pageBody.style.backgroundColor = "#151515";
        pageBody.style.color = "#ffffff";
    }
}

// Function 2: Change Menu Category (Triggered by onchange)
function changeMenuCategory() {
    let selectedCategory = document.getElementById("menuSelect").value;
    
    if (selectedCategory === "Meals") {
        document.getElementById("categoryTitle").innerHTML = "Tech Meals";
        document.getElementById("menuItems").innerHTML = "Byte-sized Burger, Debugger Fries, Syntax Salad";
        document.getElementById("menuDisplay").style.backgroundColor = "lightyellow";
    } else {
        document.getElementById("categoryTitle").innerHTML = "Beverages";
        document.getElementById("menuItems").innerHTML = "Java Coffee, Python Punch, Git Tea";
        document.getElementById("menuDisplay").style.backgroundColor = "lightblue";
    }
}

// Function 3: Show Secret Item (Triggered by onmouseover)
function showSecret() {
    document.getElementById("secretText").style.display = "block";
}

// Function 4: Hide Secret Item (Triggered by onmouseout)
function hideSecret() {
    document.getElementById("secretText").style.display = "none";
}