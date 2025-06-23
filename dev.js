//Isso serve para a header aparecer e desaparecer conforme mexo o mouse pra cima e baixo
document.addEventListener("DOMContentLoaded", function() {
  let lastScrollTop = 0;
  const header = document.querySelector("header");

  window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // Rolando para baixo: esconde o header
      header.style.top = "-100px"; // Ajuste o valor conforme a altura real do seu cabeçalho
    } else {
      // Rolando para cima: mostra o header
      header.style.top = "0";
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });
});

//Isso serve para o quadrado de missao visao e valores ter efeito carrosel
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel-container');
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dots = document.querySelectorAll('.dot');
  
  let currentIndex = 0;
  let interval;

  function updateSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev', 'next');
      
      if (i === index) {
        slide.classList.add('active');
      } else if (i < index) {
        slide.classList.add('prev');
      } else {
        slide.classList.add('next');
      }
    });
    
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    currentIndex = index;
  }

  function nextSlide() {
    const newIndex = (currentIndex + 1) % slides.length;
    updateSlide(newIndex);
  }

  function prevSlide() {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide(newIndex);
  }

  function startAutoRotate() {
    interval = setInterval(nextSlide, 5000);
  }

  // Event Listeners
  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoRotate();
  });
  
  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoRotate();
  });
  
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateSlide(index);
      resetAutoRotate();
    });
  });

  function resetAutoRotate() {
    clearInterval(interval);
    startAutoRotate();
  }

  // Controles de hover
  carousel.addEventListener('mouseenter', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', startAutoRotate);
  
  // Inicialização
  updateSlide(0);
  startAutoRotate();
});

///SEÇÃO NOSSAS REALIZAÇÕES
document.addEventListener('DOMContentLoaded', function() {
    const realizacoesCarousel = document.querySelector('.realizacoes-carousel');
    const items = document.querySelectorAll('.realizacao-item');
    const dots = document.querySelectorAll('.realizacoes-dot');
    const prevBtn = document.querySelector('.realizacoes-prev');
    const nextBtn = document.querySelector('.realizacoes-next');
    
    let currentIndex = 0;
    let interval;

    // Função para mostrar item
    function showItem(index) {
        // Remove classe ativa de todos
        items.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Atualiza índice
        currentIndex = (index + items.length) % items.length;
        
        // Adiciona classe ativa
        items[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        clearInterval(interval);
        showItem(currentIndex + 1);
        startAutoRotate();
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(interval);
        showItem(currentIndex - 1);
        startAutoRotate();
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(interval);
            showItem(index);
            startAutoRotate();
        });
    });
    
    function startAutoRotate() {
        clearInterval(interval);
        interval = setInterval(() => showItem(currentIndex + 1), 8000);
    }
    
    // Controles de hover
    realizacoesCarousel.addEventListener('mouseenter', () => clearInterval(interval));
    realizacoesCarousel.addEventListener('mouseleave', startAutoRotate);
    
    // Inicialização
    showItem(0);
    startAutoRotate();
});

function initPartnersCarousel() {
    const carousel = document.querySelector('.partners-carousel');
    if (!carousel) return;
    
    const grid = carousel.querySelector('.partners-grid');
    const items = grid.querySelectorAll('.partner-logo-box');
    const prevBtn = document.querySelector('.partners-prev');
    const nextBtn = document.querySelector('.partners-next');
    
    if (items.length < 3) {
        console.warn('Carrossel precisa de pelo menos 3 itens');
        return;
    }

    // Clona os itens (para efeito infinito)
    items.forEach(item => {
        const clone = item.cloneNode(true);
        clone.classList.add('clone');
        grid.appendChild(clone);
    });

    // Configurações ajustáveis
    const config = {
        itemWidth: items[0].offsetWidth + 30, // Largura + gap
        animationDuration: 600, // Duração mais suave (em ms)
        autoPlayDelay: 5000, // Tempo entre transições (5 segundos)
        easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)' // Curva de animação suave
    };

    let currentIndex = 0;
    let isAnimating = false;
    let autoPlayInterval;

    // Função para mover o carrossel
    function moveCarousel(direction) {
        if (isAnimating) return;
        
        isAnimating = true;
        grid.style.transition = `transform ${config.animationDuration}ms ${config.easing}`;
        
        if (direction === 'next') {
            currentIndex++;
        } else {
            currentIndex--;
        }
        
        grid.style.transform = `translateX(-${currentIndex * config.itemWidth}px)`;
    }

    // Tratamento do fim da animação
    function handleTransitionEnd() {
        isAnimating = false;
        
        // Reset suave quando chega ao final
        if (currentIndex >= items.length) {
            grid.style.transition = 'none';
            currentIndex = 0;
            grid.style.transform = `translateX(0)`;
            void grid.offsetWidth; // Força reflow
        }
        
        // Reset suave quando volta antes do primeiro
        if (currentIndex < 0) {
            grid.style.transition = 'none';
            currentIndex = items.length - 1;
            grid.style.transform = `translateX(-${currentIndex * config.itemWidth}px)`;
            void grid.offsetWidth;
        }
    }

    // Controles
    grid.addEventListener('transitionend', handleTransitionEnd);
    nextBtn?.addEventListener('click', () => {
        stopAutoPlay();
        moveCarousel('next');
        startAutoPlay();
    });
    
    prevBtn?.addEventListener('click', () => {
        stopAutoPlay();
        moveCarousel('prev');
        startAutoPlay();
    });

    // Auto-play melhorado
    function startAutoPlay() {
        stopAutoPlay(); // Limpa qualquer intervalo existente
        autoPlayInterval = setInterval(() => moveCarousel('next'), config.autoPlayDelay);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Inicia com delay para evitar conflito com a inicialização
    setTimeout(startAutoPlay, 1000);
    
    // Pausa ao interagir
    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);
    carousel.addEventListener('touchstart', stopAutoPlay);
    carousel.addEventListener('touchend', startAutoPlay);

    // Redimensionamento responsivo
    function handleResize() {
        config.itemWidth = items[0].offsetWidth + 30;
        grid.style.transform = `translateX(-${currentIndex * config.itemWidth}px)`;
    }
    
    window.addEventListener('resize', handleResize);
}

// Inicialização segura
function initCarouselWhenReady() {
    if (document.readyState === 'complete') {
        initPartnersCarousel();
    } else {
        document.addEventListener('DOMContentLoaded', initPartnersCarousel);
    }
}

initCarouselWhenReady();