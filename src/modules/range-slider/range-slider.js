import '../../../node_modules/ion-rangeslider/css/ion.rangeSlider.css';
import './range-slider.scss'
import 'ion-rangeslider/js/ion.rangeSlider';


$('.range-slider__input').ionRangeSlider({
    type: "double",
    grid: true,
    min: 500,
    max: 15400,
    from: 5000,
    to: 10000,
    step: 100,
    hide_min_max: true,
    hide_from_to: true,
    grid: false,
    onChange: function (data) {
        $('.range-slider__value').text(data.from.toLocaleString('ru') + ' - ' + data.to.toLocaleString('ru') + '₽')
    }
});