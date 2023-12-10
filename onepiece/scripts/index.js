let swiper = new Swiper(".slide-personagens", {
  slidesPerView: 4,
  spaceBetween: 30,
});

document.querySelectorAll(".flip-button").forEach(function (button) {
  button.addEventListener("click", function () {
    this.parentNode.parentNode.classList.toggle("flipped");
  });
});
