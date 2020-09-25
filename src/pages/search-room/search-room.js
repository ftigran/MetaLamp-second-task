import './search-room.scss'
import '../../modules/header/header'
import '../../modules/dropdown/dropdown'
import '../../modules/filter-date-dropdown/filter-date-dropdown'
import '../../modules/range-slider/range-slider'
import '../../modules/expandable-checkbox-list/expandable-checkbox-list'
import '../../modules/room-card/room-card'
import '../../modules/checkbox-buttons/checkbox-buttons'
import '../../modules/rich-checkbox-buttons/rich-checkbox-buttons'
import '../../modules/pagination/pagination'
import '../../modules/footer/footer'


$(document).ready(function () {
    $('.search-room__filters-ico').click(function (event) {
      $('.search-room__filters').toggleClass('search-room__filters_active');
      $(this).find('.search-room__filters-ico-line').toggleClass('search-room__filters-ico-line_active');
      $('body').toggleClass('lock');
    });
})
