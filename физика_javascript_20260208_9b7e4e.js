// Инициализация MathJax
MathJax = {
    tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']]
    },
    svg: {
        fontCache: 'global'
    }
};

// DOM готов
document.addEventListener('DOMContentLoaded', function() {
    // Мобильное меню
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Закрыть меню при клике на ссылку
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Информация о гравитации на планетах
    const planets = document.querySelectorAll('.planet');
    const planetInfo = document.getElementById('planet-info');
    
    if (planets.length > 0 && planetInfo) {
        const planetDetails = {
            'Меркурий': 'Меркурий имеет ускорение свободного падения 3.7 м/с² (0.38g). Из-за малой массы планеты сила притяжения здесь значительно слабее, чем на Земле.',
            'Венера': 'Венера имеет ускорение свободного падения 8.87 м/с² (0.91g). Несмотря на схожий с Землей размер, гравитация здесь немного слабее из-за меньшей плотности планеты.',
            'Земля': 'Земля имеет ускорение свободного падения 9.81 м/с² (1g). Это значение немного варьируется в зависимости от широты и высоты над уровнем моря.',
            'Марс': 'Марс имеет ускорение свободного падения 3.71 м/с² (0.38g). Из-за меньшей массы планеты гравитация здесь значительно слабее земной.',
            'Юпитер': 'Юпитер имеет ускорение свободного падения 24.79 м/с² (2.53g). Несмотря на огромную массу, низкая плотность и быстрый вращение уменьшают гравитацию на экваторе.'
        };
        
        planets.forEach(planet => {
            planet.addEventListener('click', function() {
                const planetName = this.querySelector('div').textContent.split('\n')[0];
                planetInfo.innerHTML = `<strong>${planetName}:</strong> ${planetDetails[planetName]}`;
                
                // Подсветка выбранной планеты
                planets.forEach(p => p.style.boxShadow = 'none');
                this.style.boxShadow = '0 0 0 3px #3b82f6';
            });
        });
        
        // Автоматический выбор Земли при загрузке
        const earthPlanet = Array.from(planets).find(p => p.textContent.includes('Земля'));
        if (earthPlanet) {
            earthPlanet.click();
        }
    }
    
    // Плавная прокрутка для якорей
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Анимация при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками
    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
});
