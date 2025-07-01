
document.addEventListener('DOMContentLoaded', () => {
    
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        const items = carousel.querySelectorAll('.carousel-item');
        const indicators = carousel.querySelectorAll('.indicator');
        const prevBtn = carousel.querySelector('.carousel-control.prev');
        const nextBtn = carousel.querySelector('.carousel-control.next');
        let current = 0;
        let timer = null;
        const INTERVAL = 4000; 

        function showSlide(index) {
            items[current].classList.remove('active');
            indicators[current].classList.remove('active');
            current = (index + items.length) % items.length;
            items[current].classList.add('active');
            indicators[current].classList.add('active');
        }

        function nextSlide() { showSlide(current + 1); }
        function prevSlide() { showSlide(current - 1); }

        function startAuto() {
            if (timer) return; 
            timer = setInterval(nextSlide, INTERVAL);
        }

        function stopAuto() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAuto();
            } else {
                startAuto();
            }
        });

        
        window.addEventListener('beforeunload', () => {
            stopAuto();
        });

        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAuto();
            startAuto();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAuto();
            startAuto();
        });

        indicators.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showSlide(i);
                stopAuto();
                startAuto();
            });
        });

        carousel.addEventListener('mouseenter', stopAuto);
        carousel.addEventListener('mouseleave', startAuto);

        
        startAuto();
    }

    
    document.querySelector('.banner')?.classList.add('fade-in-up', 'delay-1');
    document.querySelector('.about-section')?.classList.add('fade-in-up', 'delay-2');
    document.querySelector('.info-section')?.classList.add('fade-in-up', 'delay-3');

    
    const hobbyCards = document.querySelectorAll('.hobby-card');
    hobbyCards.forEach((card, index) => {
        card.classList.add('fade-in-up');
        card.classList.add(`delay-${(index % 4) + 1}`);
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