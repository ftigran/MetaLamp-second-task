import './date-dropdown.scss'

import '../calendar/calendar'

$('.date-dropdown__input').click(function(){
    $(this).parent('.date-dropdown__controls').parent('.date-dropdown').find('.calendar').toggleClass('calendar_showed')
})