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
const rateCost: number[] = [30,10, 100, 1000, 10000, 1000000];
//let ratepurchases: number = 0;
let start = performance.now();
const gameName = "ALL CAKED UP";
document.title = gameName;
const button = document.createElement("button"); //Main Clicker
//-autobake---
const upgrade1 = document.createElement("button"); //auto bake
const upgradeRate = document.createElement("button"); //add 1.1x auto
const upgradeRate1 = document.createElement("button"); //add 1.2x auto
const upgradeRate2 = document.createElement("button"); //add 50x auto
const upgradeRate3 = document.createElement("button");
const upgradeRate4 = document.createElement("button");
//---Button Descriptions-------------
const autodesc = document.createElement("p");
const upgradedesc = document.createElement("p");
const upgrade1desc = document.createElement("p");
const upgrade2desc = document.createElement("p");
const upgrade3desc = document.createElement("p");
const upgrade4desc = document.createElement("p");
//----
button.textContent = "🎂";
const counter = document.createElement("p");
const DisplayRate = document.createElement("p");
const ratepurText = document.createElement("p");
counter.textContent = "Cakes baked: " + count;
DisplayRate.textContent = "Baking " + multiplier + " cake per second";
ratepurText.textContent = "Cake Rate Purchases: ";
document.body.appendChild(button);
app.appendChild(upgrade1);
app.append(counter);
disabledButton();

//---------------------FUNCTIONS AND LISTENERS------------
function eatcake() {
  count += multiplier;
  counter.textContent = "Cakes baked: " + count.toFixed(1);
  disabledButton();
}
function disabledButton() {
  //disables unpurchasable items due to currency threshholds
  upgrade1.disabled = count < rateCost[0];
  upgradeRate.disabled = count < rateCost[1];
  upgradeRate1.disabled = count < rateCost[2];
  upgradeRate2.disabled = count < rateCost[3];
  upgradeRate3.disabled = count < rateCost[4];
  upgradeRate4.disabled = count < rateCost[5];
}
function step(timestamp: number) {
  if (timestamp - start >= 1000) {
    start = timestamp;
    eatcake();
  }
  requestAnimationFrame(step);
}
const availableItems: Item[] = [
  {
    name: "BUY AUTO BAKER 3000",
    cost: 30,
    rate: 1.0,
    description:
      "Homebaked? What is that?<br>Kick rocks grandpa, the furture is now",
    desVar: autodesc,
    buttonVar: upgrade1,
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
    buttonVar: upgradeRate1,
    numUp: 1,
  },
  {
    name: "AUTO BAKER B.O.U.N.C.E Module",
    cost: 1000,
    rate: 50.0,
    description:
      "This goes on the company Credit card<br>Increases baking output by 50/sec<br> Time for layoffs!",
    desVar: upgrade2desc,
    buttonVar: upgradeRate2,
    numUp: 1,
  },
  {
    name: "Hire overqualified Masters Student",
    cost: 10000,
    rate: 100.0,
    description:
      "Man he coulnd't get a job in their field,<br>guess we making cake now",
    desVar: upgrade3desc,
    buttonVar: upgradeRate3,
    numUp: 1,
  },
  {
    name: "PASTRY CTR-C/CTR-V Module",
    cost: 1000000,
    rate: multiplier,
    description:
      "Only real caked up hedge fund<br>babies can afford this Module",
    desVar: upgrade4desc,
    buttonVar: upgradeRate4,
    numUp: 1,
  },
];

//-------------Code-----------------------
button.addEventListener("click", () => {
  eatcake();
});
for (let i = 0; i < availableItems.length; i++) {
  availableItems[i].desVar.innerHTML =
    `${availableItems[i].description}`;
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
  if(i!=0){availableItems[i].buttonVar.hidden = true;}
  availableItems[i].buttonVar.disabled = true;
  availableItems[i].buttonVar.hidden = true;

  // Event Listeners
  if(i == 0){
    availableItems[i].buttonVar.addEventListener("click", function () {
      if (count >= availableItems[i].cost) {
        count-= availableItems[i].cost;
        app.append(DisplayRate);
        app.appendChild(availableItems[1].buttonVar);
        app.appendChild(availableItems[1].desVar);
        app.appendChild(availableItems[2].buttonVar);
        app.appendChild(availableItems[2].desVar);
        app.appendChild(availableItems[3].buttonVar);
        app.appendChild(availableItems[3].desVar);
        app.appendChild(availableItems[4].buttonVar);
        app.appendChild(availableItems[4].desVar);
        app.appendChild(availableItems[5].buttonVar);
        app.appendChild(availableItems[5].desVar);
        counter.textContent = "Cakes baked: " + count.toFixed(1);
        availableItems[i].cost = -1;
        rateCost[0] = availableItems[i].cost;
        DisplayRate.textContent = "Baking " + multiplier.toFixed(1) + " cake per second";
        requestAnimationFrame(step);
        }
    });
  }
  else{
    availableItems[i].buttonVar.addEventListener("click", function () {
      if (count >= availableItems[i].cost) {
        count-= availableItems[i].cost;
        multiplier += availableItems[i].rate;
        availableItems[i].cost*=1.15;
        rateCost[i] = availableItems[i].cost;
        DisplayRate.textContent = "Baking " + multiplier.toFixed(1) + " cake per second";
        availableItems[i].numUp += 1;
        DisplayRate.textContent = "Baking " + multiplier.toFixed(1) +  " cakes per second";
        availableItems[i].buttonVar.innerHTML =
          `${availableItems[i].name} <br>(Cost ${availableItems[i].cost.toFixed(1)} Cakes)<br>Tier ${availableItems[i].numUp}`;
      }
    });
  }
}
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
