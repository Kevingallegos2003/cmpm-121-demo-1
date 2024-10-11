import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
let count: number = 0;
const gameName = "My amazing BUtton!";
document.title = gameName;
const button = document.createElement("button");
button.textContent = "🎂";
const counter = document.createElement("p");
counter.textContent ="Cakes eaten: " + count;
document.body.appendChild(button);
app.append(counter);
button.addEventListener('click',()=>{ 
    count++; 
    console.log(count);
    counter.textContent = "Cakes eaten: " + count;
    
});
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
