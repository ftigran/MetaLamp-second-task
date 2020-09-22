import './dropdown.scss';
import { each } from 'jquery';

let maxVal=6;
let minVal=0;
let droptownRoomsText=[];
let droptownRoomsDefaultText='Удобства номера'
let totalGuests=0;
let guests= [{
  item:'guest',
  words:['Сколько гостей','гость','гостя','гостей'],
}];
let itemsRooms = [
      {
      item:'bedroom',
      words:['','спальня','спальни','спален'],
      },
      {
        item:'bed',
        words:['','кровать','кровати','кроватей'],
      }
      ,
      {
        item:'bathroom',
        words:['','ванная комната','ванные комнаты','ванных комнат'],
      },
      ]

let type;
let item;
let val;
let DropdownText;

//Задаёт текст в дропдауне, согласно его типу и значениям его параметров
function dropdownInitialize(dropdown){
  type = $(dropdown).find('.dropdown__item').data('type');
  DropdownText=$(dropdown).find('.dropdown__text');
let sum=0;
  if  (type=='room'){
    $(dropdown).find('.dropdown__item').each(function(i,elem){
      item = $(this).data('item');
      val=$(this).find('.dropdown__quantity').text();
      sum+=val;
      dropdownMinusButtonDisable(this);
    dropdownTextSemantica(val, itemsRooms, droptownRoomsText);
    calcDropdownText(DropdownText)
    })
  } else if (type=='guest'){
    item = $(dropdown).find('.dropdown__item').data('item');
    $(dropdown).find('.dropdown__item').each(function(i,elem){
      val=$(this).find('.dropdown__quantity').text();
      sum+=val;
      totalGuests+=+$(this).find('.dropdown__quantity').text();
      dropdownMinusButtonDisable(this);
    })
    if (sum==0){
      $(dropdown).find('.dropdown__clear').addClass('dropdown__clear_disabled')
    }
    let arr=[];

    dropdownTextSemantica(totalGuests, guests, arr);
    setDropdownText(DropdownText, arr)
  }
}

function dropdownMinusButtonDisable(elem){
  if (val==minVal) {
    $(elem).find('#button-minus').attr('disabled', true)
  }
  if (val!=maxVal) {
    $(elem).find('#button-plus').removeAttr('disabled');
  }
}
//Присвоение значений текста в дропдаунах прии загрузке страницы
$('.dropdown').each(function(i,elem){
  dropdownInitialize(this)
});

//обработка клика по дропдауну
$('.dropdown__text').click(function (event) {
  const dropdown=$(this).parent('.dropdown');

  $(dropdown).toggleClass('dropdown_expanded');
  $(dropdown).find('.dropdown__menu').toggleClass('dropdown__menu_showed');
});

//обработка клика по кнопкам плюс и минус
$('.dropdown__button').click(function (event) {

  const parent = $(this).parent('.dropdown__controls');
  const value = $(parent).find('.dropdown__quantity');
  item = $(parent).parent('.dropdown__item').data('item');
  type = $(parent).parent('.dropdown__item').data('type')
  val = $(value).text();
  let isCalc=false;
  
  if (this.textContent=='+'){
    val++;
    isCalc=true;
    $(parent).parent('.dropdown__item').parent('.dropdown__menu').find('.dropdown__clear').removeClass('dropdown__clear_disabled')
    if (val==maxVal) {
      $(this).attr('disabled', true)
    } else if(val==minVal+1) {
      $(parent).find('#button-minus').removeAttr('disabled') 
    }
  }else{
    val--;
    if (val==minVal) {
      $(this).attr('disabled', true)
    } else if (val==maxVal-1) {
      $(parent).find('#button-plus').removeAttr('disabled') 
    }
  }

  $(value).text(val);//присвоение значения параметру
  
  DropdownText= $(parent).parent('.dropdown__item').parent('.dropdown__menu').parent('.dropdown').find('.dropdown__text');

  dropdownTypeDistribution(DropdownText,isCalc);
});

//
function dropdownTypeDistribution(text,isCalc){
  if  (type=='room'){
    dropdownTextSemantica(val, itemsRooms, droptownRoomsText);
    calcDropdownText(text)
  } else if (type=='guest'){
    isCalc ? totalGuests++:totalGuests--;
    let arr=[];
    dropdownTextSemantica(totalGuests, guests, arr);
    setDropdownText(text, arr)
  }
}

//задать текст дропдауну
function setDropdownText(elem, text){
  $(elem).text(text);
}

//сбор слов с разных параметров о один текст
function calcDropdownText (elem){
  let text=''; 
  for (let droptownRoomText of droptownRoomsText) {
    if (droptownRoomText!='' && droptownRoomText!=droptownRoomsText[0]){
      text+=', ';
    };
    text+=droptownRoomText;
  }
  if (text=='') text=droptownRoomsDefaultText;
  setDropdownText(elem, text)
}

//Определение необходимого окончания
function dropdownTextSemantica(val, array, outputArray){
  let n=0;
  for (let arr of array) {
    if(arr.item==item){
      let message;
      if (val==0){
        message=arr.words[0];
      } else if (val==1){
        message= val+' '+arr.words[1];
      } else if (val<=4){
        message=val+' '+arr.words[2];
      }else {
        message=val+' '+arr.words[3];
      };
      outputArray[n]= message;
      break;
    }
n++;
  }
}

//Клик по кнопке "Применить"
$('.button_purple').click(function (event) {
  const dropdown=$(this).parent('.dropdown__aplpy').parent('.dropdown__buttons').parent('.dropdown__menu').parent('.dropdown')
  
  $(dropdown).find('.dropdown__menu').toggleClass('dropdown__menu_showed');
  $(dropdown).toggleClass('dropdown_expanded');
}) 

//клик по кнопке "Очистить"
$('.button_gray').click(function (event) {
  const dropdown=$(this).parent('.dropdown__clear').parent('.dropdown__buttons').parent('.dropdown__menu').parent('.dropdown')
  const dropdownItem = $(dropdown).find('.dropdown__item');
    let isGuest = $(dropdownItem).data('type')=='guest';
    if (isGuest)  totalGuests=0;
    $(dropdownItem).find('.dropdown__quantity').each(function(){
      $(this).text(minVal);
          })
  dropdownInitialize(dropdown);
}) 