import './date-dropdown.scss'

import '../calendar/calendar'

$.updateDate=(function(date){
    if (date==''){
        console.log('sss')
    }
    console.log(date)
})
// клик по полю - открытие календаря
$('.date-dropdown__input').click(function(){
    $(this).parent('.date-dropdown__controls').parent('.date-dropdown').find('.calendar').toggleClass('calendar_showed')
})

// клик по кнопке применить - ввод дат в поля
$('.calendar__button').click(function (){
    const inputs = $(this).parent('.calendar').parent('.date-dropdown__calendar').parent('.date-dropdown');
    $(inputs).find('#date-dropdown-in').val($.dates.slice(0, 10));
    $(inputs).find('#date-dropdown-out').val($.dates.slice(11, 21));
    $(inputs).find('.calendar').removeClass('calendar_showed');
})

//клик по кнопке очистить - сброс дат в полях
$(document).ready(function () {$('.datepicker--button').click(function (){
    //alert('adssad')

    const parent = $(this).parent('.datepicker--buttons').parent('.datepicker').parent('.datepicker-inline').parent('.calendar').parent('.date-dropdown__calendar').parent('.date-dropdown')
    $(parent).find('#date-dropdown-in').val('')
    $(parent).find('#date-dropdown-out').val('')
})})
