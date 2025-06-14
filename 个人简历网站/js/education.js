
document.addEventListener('DOMContentLoaded', () => {
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.classList.add('fade-in-up');
        item.classList.add(`delay-${(index % 4) + 1}`);
    });

    
    function checkScroll() {
        const elements = document.querySelectorAll('.fade-in-up');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('active');
            }
        });
    }

    
    checkScroll();

    
    window.addEventListener('scroll', checkScroll);
}); 