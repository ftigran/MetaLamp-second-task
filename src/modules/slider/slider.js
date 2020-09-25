import './slider.scss'

import "slick-carousel";

$(document).ready(function () {
  $(".slider").slick({
    dots: true,
    waitForAnimate: false,
    nextArrow:
      '<button type="button" class="slick-next">keyboard_arrow_right</button>',
    prevArrow:
      '<button type="button" class="slick-prev">keyboard_arrow_left</button>',
  });
});