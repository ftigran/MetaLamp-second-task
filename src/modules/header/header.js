import './header.scss'


$(document).ready(function () {
  $('.header__burger').click(function (event) {
    $('.header__nav').toggleClass('header__nav_active');
    $(this).toggleClass('header__burger_active');
    $('body').toggleClass('lock');
  });
});
