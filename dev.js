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