var randNum1 = Math.floor(Math.random() * 6) + 1;
document
  .querySelector(".img1")
  .setAttribute("src", "images/dice" + randNum1 + ".png");

var randNum2 = Math.floor(Math.random() * 6) + 1;
document
  .querySelector(".img2")
  .setAttribute("src", "images/dice" + randNum2 + ".png");

if (randNum1 > randNum2) {
  document.querySelector("h1").innerHTML = "🚩Player 1 Wins!";
} else if (randNum1 < randNum2) {
  document.querySelector("h1").innerHTML = "Player 2 Wins!🚩";
} else {
  document.querySelector("h1").innerHTML = "Draw!";
}