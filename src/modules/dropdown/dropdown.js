import './dropdown.scss';
import { each } from 'jquery';

const maxVal=7;
const minVal=0;
let droptownRoomsText=[];
let droptownGuestsText=[];
const droptownRoomsDefaultText='Удобства номера'
let droptownGuestsDefaultText='Сколько гостей'
let  totalNotbaby=0;
const itemsGuests=[
  {
    item:'notbaby',
    words:['','гость','гостя','гостей'],
  },
  {
    item:'baby',
    words:['','младенец','младенца','младенцев'],
  }];
const itemsRooms = [
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
      dropdownButtonDisable(this);
    dropdownTextSemantica(val, itemsRooms, droptownRoomsText);
  })
    calcDropdownText(DropdownText, droptownRoomsText, droptownGuestsDefaultText)
    
  } else if (type=='guest'){
    $(dropdown).find('.dropdown__item').each(function(i,elem){
      item = $(this).data('item');
      val=$(this).find('.dropdown__quantity').text();
      sum+=val;
      dropdownButtonDisable(this);
      if ($(this).data('item')=='notbaby'){
        totalNotbaby+=+val;
        dropdownTextSemantica(totalNotbaby, itemsGuests, droptownGuestsText);
      }else {
        dropdownTextSemantica(val, itemsGuests, droptownGuestsText);
      }
      calcDropdownText(DropdownText, droptownGuestsText, droptownGuestsDefaultText)

    })
    if (sum==0){
      $(dropdown).find('.dropdown__clear').addClass('dropdown__clear_disabled')
    }
  }
}

function dropdownButtonDisable(elem){
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
  const menu= $(parent).parent('.dropdown__item').parent('.dropdown__menu')
  const clearButton = $(menu).find('.dropdown__clear')
  item = $(parent).parent('.dropdown__item').data('item');
  type = $(parent).parent('.dropdown__item').data('type')
  val = $(value).text();
  let isCalc=false;
  if (this.textContent=='+'){
    val++;
    isCalc=true;
    $(value).text(val);//присвоение значения параметру
    $(clearButton).removeClass('dropdown__clear_disabled')//включение кнопки "очистить"
    if (val==maxVal) {
      $(this).attr('disabled', true)
    } else if(val==minVal+1) {
      $(parent).find('#button-minus').removeAttr('disabled') 
    }
  }else{
    val--;
    $(value).text(val);
    if (val==minVal) {
      $(this).attr('disabled', true)
      let sum=0;
      $(menu).find('.dropdown__quantity').each(function(){
        sum+=+$(this).text();
      });
      if (sum==0) $(clearButton).addClass('dropdown__clear_disabled');//отключение кнопки "очистить"
    } else if (val==maxVal-1) {
      $(parent).find('#button-plus').removeAttr('disabled') 
    }
  }

  
  
  DropdownText= $(parent).parent('.dropdown__item').parent('.dropdown__menu').parent('.dropdown').find('.dropdown__text');

  dropdownTypeDistribution(DropdownText,isCalc);
});

//
function dropdownTypeDistribution(text,isCalc){
  if  (type=='room'){
    dropdownTextSemantica(val, itemsRooms, droptownRoomsText);
    calcDropdownText(text, droptownRoomsText, droptownRoomsDefaultText)
  } else if (type=='guest'){
    if (type=='guest'){
      if (item=='notbaby'){
        isCalc ? totalNotbaby++:totalNotbaby--;
        dropdownTextSemantica(totalNotbaby, itemsGuests, droptownGuestsText);
      } else{
        dropdownTextSemantica(val, itemsGuests, droptownGuestsText);
      }
      calcDropdownText(text, droptownGuestsText, droptownGuestsDefaultText)
    }
  }
}

//задать текст дропдауну
function setDropdownText(elem, text){
  $(elem).text(text);
}

//сбор слов с разных параметров о один текст
function calcDropdownText (elem, arr, def){
  let text=''; 
  for (let i=0; i<arr.length; i++) {
    if (text.length+arr[i].length>25){
      text+='...'
      break
    }
    if (i!=0&&text!=''&&arr[i]!=''){
      text+=', ';
    };
    
    text+=arr[i];
  }
  if (text=='') text=def; 
  setDropdownText(elem, text)
}



//Определение необходимого окончания
function dropdownTextSemantica(val, array, outputArray){
  for (let n=0; n< array.length;n++) {
    if(array[n].item==item){
      let message;
      if (val==0){
        message=array[n].words[0];
      } else if (val==1){
        message= val+' '+array[n].words[1];
      } else if (val<=4){
        message=val+' '+array[n].words[2];
      }else {
        message=val+' '+array[n].words[3];
      };
      outputArray[n]= message;
      break;
    }
  }
}

//Клик по кнопке "Применить"
$('.button_purple').click(function (event) {
  const dropdown=$(this).parent('.dropdown__apply').parent('.dropdown__buttons').parent('.dropdown__menu').parent('.dropdown')
  
  $(dropdown).find('.dropdown__menu').toggleClass('dropdown__menu_showed');
  $(dropdown).toggleClass('dropdown_expanded');
}) 

//клик по кнопке "Очистить"
$('.button_gray').click(function (event) {
  const dropdown=$(this).parent('.dropdown__clear').parent('.dropdown__buttons').parent('.dropdown__menu').parent('.dropdown')
  const dropdownItem = $(dropdown).find('.dropdown__item');
    let isGuest = $(dropdownItem).data('type')=='guest';
    if (isGuest)  totalNotbaby=0;
    $(dropdownItem).find('.dropdown__quantity').each(function(){
      $(this).text(minVal);
          })
  dropdownInitialize(dropdown);
}) 