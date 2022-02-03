const toggleSwitch = document.querySelector("input[type='checkbox']");
const nav = document.getElementById("nav");
const toggleIcon = document.getElementById("toggle-icon");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");
const textBox = document.getElementById("text-box");

const currentTheme = localStorage.getItem("theme");

if (currentTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
  toggleSwitch.checked = true;
  toggleDarkLightMode(true);
} else {
  document.documentElement.setAttribute("data-theme", "light");
  toggleDarkLightMode(false);
}

function setImageSrc(theme) {
  image1.src = `./img/undraw_proud_coder_${theme}.svg`;
  image2.src = `./img/undraw_feeling_proud_${theme}.svg`;
  image3.src = `./img/undraw_conceptual_idea_${theme}.svg`;
}

function toggleDarkLightMode(themeStatus) {
  nav.style.backgroundColor = themeStatus
    ? "rgb(0 0 0/50%)"
    : "rgb(255 255 255/50%)";

  textBox.style.backgroundColor = themeStatus
    ? "rgb(255 255 255/50%)"
    : "rgb(0 0 0/50%)";

  toggleIcon.children[0].textContent = themeStatus ? "Dark Mode" : "Light Mode";

  themeStatus
    ? toggleIcon.children[1].classList.remove("fa-sun")
    : toggleIcon.children[1].classList.remove("fa-moon");

  themeStatus
    ? toggleIcon.children[1].classList.add("fa-moon")
    : toggleIcon.children[1].classList.add("fa-sun");

  themeStatus ? setImageSrc("dark") : setImageSrc("light");
}

function toggleStatus(e) {
  let themeStatus = e.target.checked;
  if (themeStatus) {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  }
  toggleDarkLightMode(themeStatus);
}

toggleSwitch.addEventListener("change", toggleStatus);
