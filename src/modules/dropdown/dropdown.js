import './dropdown.scss';

let maxVal=7;
let minVal=0;
let droptownRoomsText=[];
let itemsRooms = [
      {
      item:'bedroom',
      words:['спальня','спальни','спален'],
      },
      {
        item:'bed',
        words:['кровать','кровати','кроватей'],
      }
      ,
      {
        item:'bathroom',
        words:['ванная комната','ванные комнаты','ванных комнат'],
      }
      ]


$('.dropdown__text').click(function (event) {
  const dropdown=$(this).parent('.dropdown');

  $(dropdown).toggleClass('dropdown_expanded');
  $(dropdown).find('.dropdown__menu').toggleClass('dropdown__menu_showed');
});

$('.dropdown__button').click(function (event) {

  const parent = $(this).parent('.dropdown__controls');
  const value = $(parent).find('.dropdown__quantity');
  const item = $(parent).parent('.dropdown__item').data('item')
  let val = $(value).text();
//const text= 
//const text = $(parent).parent('.dropdown__item').parent('.dropdown__menu').parent('.dropdown').find('.dropdown__text').text(message);
  if (this.textContent=='+'){
    val++;
    if (val==maxVal) {
      $(this).attr('disabled', 'true')
    } else if(val==minVal+1) {
      $(parent).find('#button-minus').removeAttr('disabled') 
    }
  }else{
    val--;
    if (val==minVal) {
      $(this).attr('disabled', 'true')
    } else if (val==maxVal-1) {
      $(parent).find('#button-plus').removeAttr('disabled') 
    }
  }

  $(value).text(val);//присвоение значения

  dropdownTextSemantica(val, item);

  const DropdownText= $(parent).parent('.dropdown__item').parent('.dropdown__menu').parent('.dropdown').find('.dropdown__text');
  setDropdownText(DropdownText)

});
function setDropdownText(elem){
  let text=''; let n = 0;
  for (let droptownRoomText of droptownRoomsText) {
    text+=droptownRoomText;
    if (n!=droptownRoomsText.length-1){
      text+=', ';
      n++;
    };
  }
  $(elem).text(text);
}
function dropdownTextSemantica(val, item){
  let n=0;
  for (let itemsRoom of itemsRooms) {
    if(itemsRoom.item==item){
      
      let message = val+' ';
      if (val==1){
        message+=itemsRoom.words[0];
      } else if (val<=4&&val>1){
        message+=itemsRoom.words[1];
      }else {
        message+=itemsRoom.words[2];
      };
      droptownRoomsText[n]= message;
      break;
    }
n++;
  }
}