import "./index.scss";
window.onload = function () {
  const e = document.getElementById("preloader");
  e.classList.add("anim_fade_out"),
    setTimeout(function () {
      e.remove();
    }, 300);
};
