import "./style.css";

//---DEFINITIONS-------------------
const app: HTMLDivElement = document.querySelector("#app")!;
let count: number = 0;
let start = performance.now();
const gameName = "My amazing BUtton!";
document.title = gameName;
const button = document.createElement("button");
button.textContent = "🎂";
const counter = document.createElement("p");
counter.textContent = "Cakes eaten: " + count;
document.body.appendChild(button);
app.append(counter);

//---------------------FUNCTIONS AND LISTENERS------------
function eatcake() {
  count++;
  counter.textContent = "Cakes eaten: " + count;
}
function step(timestamp: number){
    if (timestamp - start >= 1000){
      start = timestamp;
      eatcake();
    }
    requestAnimationFrame(step);
}
button.addEventListener("click", () => {
  console.log(count);
  eatcake();
});
//-------------Code-----------------------
//setInterval(eatcake, 1000);
requestAnimationFrame(step);
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
