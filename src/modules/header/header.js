import './header.scss'
import '../../modules/button-border/button-border'
import '../../modules/button-fill/button-fill'
import '../../modules/logo/logo'


$(document).ready(function () {
  $('.header__burger').click(function (event) {
    $('.header__nav').toggleClass('header__nav_active');
    $(this).toggleClass('header__burger_active');
    $('body').toggleClass('lock');
  });
});
