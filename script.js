const btns = document.querySelectorAll('.thumbnail');

btns.forEach(el => el.addEventListener('mouseover', event => {
  var btn = el.querySelector("button");
  if (btn) {
    btn.style.display = "block";
  }
}));