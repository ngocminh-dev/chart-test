const hex = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
const btn = document.getElementById('btn');
const color = document.querySelector(".color");
let hexColor;

btn.addEventListener("click", function() {
    hexColor = getRandomHexColor();
    document.body.style.backgroundColor = hexColor;
    color.textContent = hexColor;
    
})

function getRandomHexColor() {
    let hexColor = "#";
    for (let index = 0; index < 6; index++) {
        hexColor += hex[Math.floor(Math.random()*hex.length)];
    }
    return hexColor;
}