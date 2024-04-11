document.addEventListener('DOMContentLoaded', function() {
    const mainSlider = new Swiper('.main-swiper', {
        loop: false,
        autoplay: false,
        allowTouchMove: false,
        swipe: true,
        scrollbar: {
            el: '.swiper-scrollbar',        
            hide: false,
        },
    });

    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const slideIndex = parseInt(link.getAttribute('data-slide-index'));
            mainSlider.slideTo(slideIndex);
        });
    });

    const gallerySwiper = new Swiper('.gallery-swiper', {
        spaceBetween: 10,
        thumbs: {
            swiper: new Swiper('.thumbnail-swiper', {
                spaceBetween: 6,
                slidesPerView: 4,
                slidesPerGroup: 1,
                freeMode: true,
                watchSlidesProgress: true,
            }),
        },
        navigation: {
            nextEl: '.slider__arrow--next',
            prevEl: '.slider__arrow--prev',
        },
    });

    // Отслеживание изменения слайда
    mainSlider.on('slideChange', function () {
        const activeSlideIndex = mainSlider.activeIndex;
        const navLinks = document.querySelectorAll('.nav__link');

        navLinks.forEach(function(link, index) {
            if (index === activeSlideIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    });
    
    // Отслеживание изменения слайда галереи
    gallerySwiper.on('slideChange', function () {
        const activeSlideIndex = mainSlider.activeIndex;
        const activePhotoIndex = gallerySwiper.activeIndex;
        const thumbnail = document.querySelectorAll('.slider__item');
    
        if (activeSlideIndex === 0 && activePhotoIndex !== (thumbnail.length - 1)) {
            mainSlider.allowTouchMove = false;
        } else {
            mainSlider.allowTouchMove = true;
        }
    });
});