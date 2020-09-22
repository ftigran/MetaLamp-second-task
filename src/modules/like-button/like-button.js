$('.like-button').click(function(){
    const like = $(this).find('.like-button__text')
    let likes = $(like).text();
    console.log($(this).hasClass('like-button_liked'))

    if ($(this).hasClass('like-button_liked')){
        $(like).text(+likes-1)
        $(this).removeClass('like-button_liked');
    } else {
        $(like).text(+likes+1)
        $(this).addClass('like-button_liked');
    }

})