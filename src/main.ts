import "./style.css";

//---DEFINITIONS-------------------
const app: HTMLDivElement = document.querySelector("#app")!;
let count: number = 0;
let multiplier: number = 1;
let rateCost:number = 10;
let ratepurchases:number = 0;
let start = performance.now();
const gameName = "ALL CAKED UP";
document.title = gameName;
const button = document.createElement("button");
const upgrade1 = document.createElement("button");
const upgradeRate = document.createElement("button");
upgradeRate.textContent = "Upgrade rate of cakes to 1.1/sec - " +rateCost+" Coins" ;
upgrade1.textContent = "AUTO BAKE - 10 CAKES";
button.textContent = "🎂";
const counter = document.createElement("p");
const DisplayRate = document.createElement("p");
const ratepurText = document.createElement("p");
counter.textContent = "Cakes baked: " + count;
DisplayRate.textContent = "Baking "+multiplier+" cake per second";
ratepurText.textContent = "Cake Rate Purchases: "+ ratepurchases;
document.body.appendChild(button);
app.appendChild(upgrade1);
app.append(counter);
disabledButton();

//---------------------FUNCTIONS AND LISTENERS------------
function eatcake() {
  //count++;
  count+=multiplier;
  counter.textContent = "Cakes baked: " + count;
  disabledButton();
}
function disabledButton() {
  upgrade1.disabled = count < 10;
  upgradeRate.disabled = count < rateCost;
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
  if (count >= 10) {
    count -= 10;
    app.append(DisplayRate);
    app.appendChild(upgradeRate);
    app.appendChild(ratepurText);
    requestAnimationFrame(step);
    upgrade1.hidden = true;
  }
});
upgradeRate.addEventListener("click", () => {
  if (count >= rateCost) {
    count -= rateCost;
    rateCost*=10;
    multiplier+=0.1;
    ratepurchases++;
    ratepurText.textContent = "Cake Rate Purchases: "+ ratepurchases;
    DisplayRate.textContent = "Baking "+multiplier+" cake per second";
    if(multiplier >= 1.1){
      upgradeRate.textContent = "Upgrade rate of cakes to 1.2/sec - " +rateCost+" Coins" ;
    }
    else{
      upgradeRate.textContent = "Upgrade rate of cakes to 50/sec - " +rateCost+" Coins" ;
    }

    if(rateCost>1000){
      multiplier = 50;
      upgradeRate.hidden = true;
    }
  }
});
//-------------Code-----------------------
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
