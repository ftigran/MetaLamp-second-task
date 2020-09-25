import './filter-date-dropdown.scss'
import '../calendar/calendar'

$('.filter-date-dropdown__input').click(function(){
    $(this).parent('.filter-date-dropdown__label').parent('.filter-date-dropdown').find('.calendar').toggleClass('calendar_showed')
})