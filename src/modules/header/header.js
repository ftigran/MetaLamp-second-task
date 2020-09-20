$(document).ready(function () {
  $('.header__burger').click(function (event) {
    $('.header__nav').toggleClass('header__nav_active');
    $('.header__burger').toggleClass('header__burger_active');
    $('body').toggleClass('lock');
  });
  /*$('.header__guest').click(function (event) {
    $('.header__nav').toggleClass('header__nav_active');
    $('.header__burger').toggleClass('header__burger_active');
    $('body').toggleClass('lock');
  });*/
});
