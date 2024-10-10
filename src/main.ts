import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing BUtton!";
document.title = gameName;
const button = document.createElement("button");
button.textContent = "🎂";

document.body.appendChild(button);
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
