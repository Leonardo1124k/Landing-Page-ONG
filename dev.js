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