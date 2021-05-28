import "./expandable-checkbox-list.scss";

$(".expandable-checkbox-list__title").click(function (event) {
  const parent = $(this).parent(".expandable-checkbox-list");
  $(this).toggleClass("expandable-checkbox-list__title_expanded");
  console.log($(this).text());
  //$(parent).toggleClass('.expandable-checkbox-list_expanded')
  $(parent)
    .find(".expandable-checkbox-list__list")
    .toggleClass("expandable-checkbox-list__list_show");
});
