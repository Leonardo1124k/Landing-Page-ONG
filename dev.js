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
    const carousel = document.querySelector('.realizacoes-carousel');
    const items = document.querySelectorAll('.realizacao-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    let currentIndex = 0;
    let interval;
    let isAnimating = false;

    // Adiciona transição CSS dinamicamente
    const style = document.createElement('style');
    style.textContent = `
        .realizacao-item {
            transition: opacity 0.5s ease, visibility 0.5s ease;
            opacity: 0;
            visibility: hidden;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
        }
        .realizacao-item.active {
            opacity: 1;
            visibility: visible;
            position: relative;
        }
    `;
    document.head.appendChild(style);

    function showItem(index) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;
        
        const newIndex = (index + items.length) % items.length;
        
        // Esconde o item atual
        items[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        // Mostra o novo item
        setTimeout(() => {
            items[newIndex].classList.add('active');
            dots[newIndex].classList.add('active');
            currentIndex = newIndex;
            isAnimating = false;
        }, 50); // Pequeno delay para garantir a transição
    }
    
    function nextItem() {
        showItem(currentIndex + 1);
    }
    
    function prevItem() {
        showItem(currentIndex - 1);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        clearInterval(interval);
        nextItem();
        startAutoRotate();
    });
    
    prevBtn.addEventListener('click', () => {
        clearInterval(interval);
        prevItem();
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
        interval = setInterval(nextItem, 8000);
    }
    
    carousel.addEventListener('mouseenter', () => clearInterval(interval));
    carousel.addEventListener('mouseleave', startAutoRotate);
    
    // Inicialização correta
    items.forEach((item, index) => {
        if (index !== 0) {
            item.style.opacity = '0';
            item.style.visibility = 'hidden';
        }
    });
    showItem(0);
    startAutoRotate();
});