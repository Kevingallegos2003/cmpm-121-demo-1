import "./style.css";

//---DEFINITIONS-------------------
const app: HTMLDivElement = document.querySelector("#app")!;
let count: number = 0;
let start = performance.now();
const gameName = "ALL CAKED UP";
document.title = gameName;
const button = document.createElement("button");
const upgrade1 = document.createElement("button");
upgrade1.textContent = "AUTO BAKE - 10 CAKES";
button.textContent = "🎂";
const counter = document.createElement("p");
counter.textContent = "Cakes baked: " + count;
document.body.appendChild(button);
app.appendChild(upgrade1);
app.append(counter);
disabledButton();

//---------------------FUNCTIONS AND LISTENERS------------
function eatcake() {
  count++;
  counter.textContent = "Cakes baked: " + count;
  disabledButton();
}
function disabledButton(){
  upgrade1.disabled = count < 10;
}
function step(timestamp: number) {
  if (timestamp - start >= 1000) {
    start = timestamp;
    eatcake();
  }
  requestAnimationFrame(step);
}
button.addEventListener("click", () => {
  console.log(count);
  eatcake();
});
upgrade1.addEventListener("click", () => {
  if(count >= 10){
    count-= 10;
    requestAnimationFrame(step);
  }
});
//-------------Code-----------------------
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
