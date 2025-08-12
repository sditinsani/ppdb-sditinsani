// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Update tahun di footer
document.querySelector('.copyright p').innerHTML = `&copy; ${new Date().getFullYear()} SDIT INSANI. All Rights Reserved.`;
