import "./style.css";

//---DEFINITIONS-------------------
const app: HTMLDivElement = document.querySelector("#app")!;
let count: number = 0;
let multiplier: number = 1;
const rateCost: number[] = [10, 100, 1000];
let ratepurchases: number = 0;
let start = performance.now();
const gameName = "ALL CAKED UP";
document.title = gameName;
const button = document.createElement("button"); //Main Clicker
//-autobake---
const upgrade1 = document.createElement("button"); //auto bake
const upgradeRate = document.createElement("button"); //add 1.1x auto
const upgradeRate1 = document.createElement("button"); //add 1.2x auto
const upgradeRate2 = document.createElement("button"); //add 50x auto
upgradeRate.textContent =
  "Hire Caked up baker (+1.1/sec) - " + rateCost[0] + " Cakes";
upgradeRate1.textContent =
  "Hire Double Cheeked Up Baker (+1.2/sec) - " + rateCost[1] + " Cakes";
upgradeRate2.textContent =
  "AUTO BAKER B.O.U.N.C.E. Module (+50/sec) - " + rateCost[2] + " Cakes";
upgrade1.textContent = "AUTO BAKER 3000 - 10 CAKES";
//----
button.textContent = "🎂";
const counter = document.createElement("p");
const DisplayRate = document.createElement("p");
const ratepurText = document.createElement("p");
counter.textContent = "Cakes baked: " + count;
DisplayRate.textContent = "Baking " + multiplier + " cake per second";
ratepurText.textContent = "Cake Rate Purchases: " + ratepurchases;
document.body.appendChild(button);
app.appendChild(upgrade1);
app.append(counter);
disabledButton();

//---------------------FUNCTIONS AND LISTENERS------------
function eatcake() {
  //count++;
  count += multiplier;
  //count.toPrecision(2);
  counter.textContent = "Cakes baked: " + count.toFixed(1);
  disabledButton();
}
function disabledButton() {
  //disables unpurchasable items due to currency threashholds
  upgrade1.disabled = count < 10;
  upgradeRate.disabled = count < rateCost[0];
  upgradeRate1.disabled = count < rateCost[1];
  upgradeRate2.disabled = count < rateCost[2];
}
function step(timestamp: number) {
  if (timestamp - start >= 1000) {
    start = timestamp;
    eatcake();
  }
  requestAnimationFrame(step);
}
button.addEventListener("click", () => {
  //console.log(count);
  eatcake();
});
upgrade1.addEventListener("click", () => {
  if (count >= 10) {
    count -= 10;
    //display data and buttons upon auto clicker purchase
    app.append(DisplayRate);
    app.appendChild(upgradeRate);
    app.appendChild(upgradeRate1);
    app.appendChild(upgradeRate2);
    app.appendChild(ratepurText);
    requestAnimationFrame(step);
    upgrade1.hidden = true;
  }
});
upgradeRate.addEventListener("click", () => {
  if (count >= rateCost[0]) {
    count -= rateCost[0];
    rateCost[0] *= 1.15;
    multiplier += 0.1;
    //multiplier.toPrecision(2);
    //rateCost[0].toFixed(1);
    //(Math.round(rateCost[0] * 100) / 100).toFixed(2);
    ratepurchases++;
    ratepurText.textContent = "Cake Rate Purchases: " + ratepurchases;
    DisplayRate.textContent =
      "Baking " + multiplier.toFixed(1) + " cake per second";
    upgradeRate.textContent =
      "Hire Caked up baker (+1.1/sec) -" +
      rateCost[0].toFixed(1) +
      " Cakes";
  }
});
upgradeRate1.addEventListener("click", () => {
  if (count >= rateCost[1]) {
    count -= rateCost[1];
    rateCost[1] *= 1.15;
    multiplier += 0.2;
    ratepurchases++;
    ratepurText.textContent = "Cake Rate Purchases: " + ratepurchases;
    DisplayRate.textContent =
      "Baking " + multiplier.toFixed(1) + " cake per second";
    upgradeRate1.textContent =
      "Hire Double Cheeked Up Baker (+1.2/sec) - " +
      rateCost[1].toFixed(1) +
      " Cakes";
  }
});
upgradeRate2.addEventListener("click", () => {
  if (count >= rateCost[2]) {
    count -= rateCost[2];
    rateCost[2] *= 1.15;
    multiplier += 50.0;
    ratepurchases++;
    ratepurText.textContent = "Cake Rate Purchases: " + ratepurchases;
    DisplayRate.textContent =
      "Baking " + multiplier.toFixed(1) + " cake per second";
    upgradeRate2.textContent =
      "AUTO BAKER B.O.U.N.C.E. Module (+50/sec) - " + rateCost[2].toFixed(1) + " Cakes";
  }
});
/*
upgradeRate.addEventListener("click", () => { //same button, changes for each new upgrade level
  if (count >= rateCost) {
    count -= rateCost;
    rateCost *= 10;
    multiplier += 0.1;
    ratepurchases++;
    ratepurText.textContent = "Cake Rate Purchases: " + ratepurchases;
    DisplayRate.textContent = "Baking " + multiplier + " cake per second";
    if (multiplier >= 1.1) {
      upgradeRate.textContent =
        "Upgrade rate of cakes to 1.2/sec - " + rateCost + " Coins";
    } else {
      upgradeRate.textContent =
        "Upgrade rate of cakes to 50/sec - " + rateCost + " Coins";
    }

    if (rateCost > 1000) {
      multiplier = 50;
      upgradeRate.hidden = true;
    }
  }
});
*/
//-------------Code-----------------------
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
