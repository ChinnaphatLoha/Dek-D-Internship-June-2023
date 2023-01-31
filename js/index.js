const SWIPER_WRAPPER = document.querySelector(".swiper-wrapper");
const SWIPER_BUTTON_PREV = document.querySelector(".swiper-button-prev");
const SWIPER_BUTTON_NEXT = document.querySelector(".swiper-button-next");
const SWIPER_PAGINATION = document.querySelector(".swiper-pagination");
const AMOUNT_OF_SLIDES = 5;

let currentSlide = 1; // init
let leftSlide = currentSlide;
let rightSlide = AMOUNT_OF_SLIDES;

const createSwiperSlide = (src, alt) => {
  const LI = document.createElement("li");
  const IMG = document.createElement("img");

  LI.classList.add("swiper-slide");
  IMG.setAttribute("src", `${src}`);
  IMG.setAttribute("alt", `${alt}`);

  LI.appendChild(IMG);

  return LI;
};

const generateImagePath = (order, extension) => {
  return `./images/image${order}.${extension}`;
};

function appendSwiperPaginationBullet(quantity_of_bullet) {
  for (let i = 1; i <= quantity_of_bullet; i++) {
    const BULLET = document.createElement("li");
    BULLET.classList.add("swiper-pagination-bullet");
    if (i === currentSlide) {
      BULLET.classList.add("swiper-pagination-bullet-active");
    }
    SWIPER_PAGINATION.appendChild(BULLET);
  }
}

function appendSetOfSwiperSlide(quantity_of_set) {
  for (let i = 1; i <= quantity_of_set; i++) {
    for (let j = 1; j <= AMOUNT_OF_SLIDES; j++) {
      SWIPER_WRAPPER.appendChild(
        createSwiperSlide(generateImagePath(j, "png"), `Image ${j}`)
      );
    }
  }
}

function shiftSlide(direction) {
  total_length_of_shift += SLIDE_WIDTH * direction;
  if (total_length_of_shift < 0) {
    total_length_of_shift = init_length_of_shift;
  } else if (total_length_of_shift > SLIDE_WIDTH * (AMOUNT_OF_SLIDES * 3 - 3)) {
    total_length_of_shift = init_length_of_shift - SLIDE_WIDTH;
  }
  document.documentElement.style.setProperty(
    "--length-of-shift",
    `-${total_length_of_shift}px`
  );
  updatePagination(direction);
}

function updatePagination(direction) {
  SWIPER_PAGINATION.children[currentSlide - 1].classList.remove(
    "swiper-pagination-bullet-active"
  );
  currentSlide += direction;
  if (currentSlide < 1) {
    currentSlide = AMOUNT_OF_SLIDES;
  } else if (currentSlide > AMOUNT_OF_SLIDES) {
    currentSlide = 1;
  }
  SWIPER_PAGINATION.children[currentSlide - 1].classList.add(
    "swiper-pagination-bullet-active"
  );
}

// init
appendSetOfSwiperSlide(3);
appendSwiperPaginationBullet(AMOUNT_OF_SLIDES);

const SWIPER_SLIDE = document.querySelector(".swiper-slide");
const IMAGE = document.querySelector(".swiper-slide img");
let swiper_slide_margin_right = Number(
  window
    .getComputedStyle(SWIPER_SLIDE)
    .getPropertyValue("margin-right")
    .replace("px", "")
);
let image_width = Number(
  window.getComputedStyle(IMAGE).getPropertyValue("width").replace("px", "")
);
const SLIDE_WIDTH = swiper_slide_margin_right + image_width;

// init
const init_length_of_shift =
  SLIDE_WIDTH * (AMOUNT_OF_SLIDES + currentSlide - 2);
let total_length_of_shift = init_length_of_shift;
document.documentElement.style.setProperty(
  "--length-of-shift",
  `-${total_length_of_shift}px`
);

SWIPER_BUTTON_PREV.addEventListener("click", function () {
  shiftSlide(-1);
});
SWIPER_BUTTON_NEXT.addEventListener("click", function () {
  shiftSlide(1);
});

const SWIPER_PAGINATION_BULLETS = [].slice.call(
  SWIPER_PAGINATION.querySelectorAll(".swiper-pagination-bullet", 0)
);

SWIPER_PAGINATION.addEventListener("click", function (e) {
  let index = SWIPER_PAGINATION_BULLETS.indexOf(e.target);
  let direction = 0;
  if (index < 0) {
    return;
  } else {
    index += 1;
    if (currentSlide >= index) {
      direction = Math.abs(currentSlide - index) * -1;
    } else {
      direction = Math.abs(currentSlide - index);
    }
    shiftSlide(direction);
  }
});
