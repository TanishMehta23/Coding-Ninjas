var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,   /* Slides in container */
    spaceBetween: 25,
    loop: true,         /* Infinite loop */
    centerSlide:'true',
    fade:'true',
    dragCursor:'true',  /* move by cursor */
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets:true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints:{
        0:{
            sliderPerView:1,
        },
        520:{
            sliderPerView:2,
        },
        950:{
            sliderPerView:3,
        },
    },
  });