const swiperServices = new Swiper('.swiper-services', {
    loop: true,

    slidesPerView: 3,
    spaceBetween: 30,
 
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        575: {
            slidesPerView: 1.2,
            spaceBetween: 20
        },
        600: {
            slidesPerView: 1.5,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        960: {
            slidesPerView: 2.5,
            spaceBetween: 25
        },
        1200: {
            slidesPerView: 3,
            spaceBetween: 25
        }
    },

    pagination: {
        el: '.swiper-pagination',
    },
  
    navigation: {
      nextEl: '.button-services-next',
      prevEl: '.button-services-prev',
    },
});
const swiperReviews = new Swiper('.swiper-reviews', {
    loop: true,

    slidesPerView: 3,
    spaceBetween: 30,

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },
        480: {
            slidesPerView: 1.5,
            spaceBetween: 20
        },
        600: {
            slidesPerView: 1.8,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 2.2,
            spaceBetween: 20
        },
        960: {
            slidesPerView: 2.5,
            spaceBetween: 30
        },
        1440: {
            slidesPerView: 3,
            spaceBetween: 25
        }
    },

    pagination: {
        el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.button-reviews-next',
      prevEl: '.button-reviews-prev',
    },
});
const swiperGallery = new Swiper('.swiper-gallery', {
    loop: true,

    breakpoints: {
        320: {
            slidesPerView: 1.1,
            spaceBetween: 20
        },
        480: {
            slidesPerView: 1.3,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 1.8,
            spaceBetween: 20
        },
        960: {
            slidesPerView: 2.2,
            spaceBetween: 30
        },
        1440: {
            slidesPerView: 2.7,
            spaceBetween: 30
        },
    },

    pagination: {
        el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.button-gallery-next',
      prevEl: '.button-gallery-prev',
    },
});
const swiperHero = new Swiper('.swiper-hero', {
    loop: true,

    slidesPerView: 1,
    spaceBetween: 20,

    pagination: {
        el: '.swiper-pagination',
    },
  
    navigation: {
      nextEl: '.button-hero-next',
      prevEl: '.button-hero-prev',
    },
});