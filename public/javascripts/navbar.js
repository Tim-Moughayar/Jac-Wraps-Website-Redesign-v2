document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    
    // Get current path and handle both "/" and non-"/" cases
    let currentPath = window.location.pathname.replace(/^\/|\/$/g, "");
    // If we're on the home page, currentPath will be empty string
    currentPath = currentPath || "";
    
    navLinks.forEach(link => {
        // Get the href and remove any leading/trailing slashes
        const href = link.getAttribute("href").replace(/^\/|\/$/g, "");
        
        // Compare the cleaned paths
        if (href === currentPath) {
            link.classList.add("active");
        }
    });
});