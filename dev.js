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

// Carrossel de Parceiros - Versão Deslizante
function initPartnersCarousel() {
    const carousel = document.querySelector('.partners-carousel');
    const grid = document.querySelector('.partners-grid');
    const items = document.querySelectorAll('.partner-logo-box');
    const prevBtn = document.querySelector('.partners-prev');
    const nextBtn = document.querySelector('.partners-next');
    
    if (!grid || items.length < 3) return; // Precisa de pelo menos 3 itens
    
    const itemWidth = items[0].offsetWidth + 30; // Largura + gap
    let currentIndex = 0;
    const visibleItems = Math.floor(carousel.offsetWidth / itemWidth);
    
    // Clona os primeiros itens e adiciona no final para efeito contínuo
    items.forEach((item, index) => {
        if (index < visibleItems) {
            const clone = item.cloneNode(true);
            grid.appendChild(clone);
        }
    });

    // Atualiza o carrossel
    function updateCarousel() {
        grid.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
        grid.style.transition = 'transform 0.5s ease';
        
        // Quando chegar no final, volta sem animação
        if (currentIndex >= items.length) {
            setTimeout(() => {
                grid.style.transition = 'none';
                currentIndex = 0;
                grid.style.transform = `translateX(0)`;
            }, 500);
        }
        
        // Quando voltar ao início, ajusta sem animação
        if (currentIndex < 0) {
            setTimeout(() => {
                grid.style.transition = 'none';
                currentIndex = items.length - 1;
                grid.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
            }, 500);
        }
    }

    // Próximo item
    nextBtn.addEventListener('click', () => {
        currentIndex++;
        updateCarousel();
    });

    // Item anterior
    prevBtn.addEventListener('click', () => {
        currentIndex--;
        updateCarousel();
    });

    // Inicializa
    updateCarousel();

    // Redimensionamento
    window.addEventListener('resize', () => {
        const newItemWidth = items[0].offsetWidth + 30;
        currentIndex = Math.round(currentIndex * itemWidth / newItemWidth);
        itemWidth = newItemWidth;
        updateCarousel();
    });
}

// Inicia quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', initPartnersCarousel);