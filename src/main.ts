import "./style.css";

//---DEFINITIONS-------------------
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
  desVar: HTMLParagraphElement;
  buttonVar: HTMLButtonElement;
  numUp: number;
}
const app: HTMLDivElement = document.querySelector("#app")!;
let count: number = 0;
let multiplier: number = 1;
const rateCost: number[] = [30, 10, 100, 1000, 10000, 1000000];
//let ratepurchases: number = 0;
let start = performance.now();
const gameName = "ALL CAKED UP";
document.title = gameName;
const button = document.createElement("button"); //Main Clicker
//-autobake---
const autobakeUpgrade = document.createElement("button"); //auto bake
const upgradeRate = document.createElement("button"); //add 1.1x auto
const upgradeRatex1 = document.createElement("button"); //add 1.2x auto
const upgradeRatex2 = document.createElement("button"); //add 50x auto
const upgradeRatex100 = document.createElement("button");
const doubleRate = document.createElement("button");
//---Button Descriptions-------------
const autodesc = document.createElement("p");
const upgradedesc = document.createElement("p");
const upgrade1desc = document.createElement("p");
const upgrade2desc = document.createElement("p");
const upgrade3desc = document.createElement("p");
const upgrade4desc = document.createElement("p");
const counter = document.createElement("p");
const DisplayRate = document.createElement("p");
const ratepurText = document.createElement("p");

//----
button.textContent = "🎂";
counter.textContent = "Cakes baked: " + count;
DisplayRate.textContent = "Baking " + multiplier + " cake per second";
ratepurText.textContent = "Cake Rate Purchases: ";
document.body.appendChild(button);
app.appendChild(autobakeUpgrade);
app.append(counter);
disabledButton();
//-----------------------------------------Items-------------------------------
const availableItems: Item[] = [
  {
    name: "BUY AUTO BAKER 3000",
    cost: 30,
    rate: 1.0,
    description:
      "Homebaked? What is that?<br>Kick rocks grandpa, the furture is now",
    desVar: autodesc,
    buttonVar: autobakeUpgrade,
    numUp: 0,
  },
  {
    name: "Hire Caked up Baker",
    cost: 10,
    rate: 0.1,
    description:
      "HR Loves this guy!<br>But they will only increase baking output by 0.1/sec",
    desVar: upgradedesc,
    buttonVar: upgradeRate,
    numUp: 1,
  },
  {
    name: "Hire Double Cheeked up Baker",
    cost: 100,
    rate: 0.2,
    description:
      "Has quite the thicc resume<br>Increases baking output by 0.2/sec",
    desVar: upgrade1desc,
    buttonVar: upgradeRatex1,
    numUp: 1,
  },
  {
    name: "AUTO BAKER B.O.U.N.C.E Module",
    cost: 1000,
    rate: 50.0,
    description:
      "This goes on the company Credit card<br>Increases baking output by 50/sec<br> Time for layoffs!",
    desVar: upgrade2desc,
    buttonVar: upgradeRatex2,
    numUp: 1,
  },
  {
    name: "Hire overqualified Masters Student",
    cost: 10000,
    rate: 100.0,
    description:
      "Man he coulnd't get a job in their field,<br>guess we making cake now",
    desVar: upgrade3desc,
    buttonVar: upgradeRatex100,
    numUp: 1,
  },
  {
    name: "PASTRY CTR-C/CTR-V Module",
    cost: 1000000,
    rate: multiplier,
    description:
      "Only real caked up hedge fund<br>babies can afford this Module",
    desVar: upgrade4desc,
    buttonVar: doubleRate,
    numUp: 1,
  },
];
//---------------------FUNCTIONS AND LISTENERS------------
function eatcake() {
  count += multiplier;
  counter.textContent = "Cakes baked: " + count.toFixed(1);
  disabledButton();
}
function disabledButton() {
  //disables unpurchasable items due to currency threshholds
  autobakeUpgrade.disabled = count < rateCost[0];
  upgradeRate.disabled = count < rateCost[1];
  upgradeRatex1.disabled = count < rateCost[2];
  upgradeRatex2.disabled = count < rateCost[3];
  upgradeRatex100.disabled = count < rateCost[4];
  doubleRate.disabled = count < rateCost[5];
}
function step(timestamp: number) {
  if (timestamp - start >= 1000) {
    start = timestamp;
    eatcake();
  }
  requestAnimationFrame(step);
}

//-------------Code-----------------------
button.addEventListener("click", () => {
  eatcake();
});
for (let i = 0; i < availableItems.length; i++) {
  availableItems[i].desVar.innerHTML = `${availableItems[i].description}`;
  availableItems[i].desVar.setAttribute(
    "style",
    "width: 150px; display: inline-block; vertical-align: top; margin: 10px",
  );
  availableItems[i].buttonVar.innerHTML =
    `${availableItems[i].name} <br>(Cost ${availableItems[i].cost} Cakes)<br>Tier ${availableItems[i].numUp}`;
  availableItems[i].buttonVar.setAttribute(
    "style",
    "width: 150px; display: inline-block; verticalAlign: top; margin: 10px",
  );
  if (i != 0) {
    availableItems[i].buttonVar.hidden = true;
  }
  availableItems[i].buttonVar.disabled = true;
  availableItems[i].buttonVar.hidden = true;

  // Event Listeners
  if (i == 0) {
    availableItems[i].buttonVar.addEventListener("click", function () {
      if (count >= availableItems[i].cost) {
        count -= availableItems[i].cost;
        app.append(DisplayRate);
        for(let i = 1; i<6;i++){
          app.appendChild(availableItems[i].buttonVar);
          app.appendChild(availableItems[i].desVar);
        }
        counter.textContent = "Cakes baked: " + count.toFixed(1);
        availableItems[i].cost = -1;
        rateCost[0] = availableItems[i].cost;
        DisplayRate.textContent =
          "Baking " + multiplier.toFixed(1) + " cake per second";
        requestAnimationFrame(step);
      }
    });
  } else {
    availableItems[i].buttonVar.addEventListener("click", function () {
      if (count >= availableItems[i].cost) {
        count -= availableItems[i].cost;
        multiplier += availableItems[i].rate;
        availableItems[i].cost *= 1.15;
        rateCost[i] = availableItems[i].cost;
        DisplayRate.textContent =
          "Baking " + multiplier.toFixed(1) + " cake per second";
        availableItems[i].numUp += 1;
        DisplayRate.textContent =
          "Baking " + multiplier.toFixed(1) + " cakes per second";
        availableItems[i].buttonVar.innerHTML =
          `${availableItems[i].name} <br>(Cost ${availableItems[i].cost.toFixed(1)} Cakes)<br>Tier ${availableItems[i].numUp}`;
      }
    });
  }
}
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
