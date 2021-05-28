import "air-datepicker/dist/css/datepicker.min.css";
import "./calendar.scss";
import "../../modules/button/button";
import "air-datepicker";

$(document).ready(function () {
  $(".calendar").datepicker({
    clearButton: true,
    multipleDates: "2",
    multipleDatesSeparator: " ",
    position: "bottom left",
    range: true,
    clearButton: true,
    prevHtml: "arrow_back",
    nextHtml: "arrow_forward",
    navTitles: {
      days: "<h2>MM yyyy</h2>",
    },
    onSelect: function (formattedDate, date, inst) {
      $.dates = formattedDate;
    },
  });
});
$.fn.datepicker.language["ru"] = {
  days: [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
  ],
  daysShort: ["Вос", "Пон", "Вто", "Сре", "Чет", "Пят", "Суб"],
  daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
  months: [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ],
  monthsShort: [
    "Янв",
    "Фев",
    "Мар",
    "Апр",
    "Май",
    "Июн",
    "Июл",
    "Авг",
    "Сен",
    "Окт",
    "Ноя",
    "Дек",
  ],
  today: "Применить",
  clear: "Очистить",
  dateFormat: "dd.mm.yyyy",
  timeFormat: "hh:ii",
  firstDay: 1,
};
