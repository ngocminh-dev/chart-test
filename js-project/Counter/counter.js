const btn_increase = document.getElementById("btn-increase");
const btn_decrease = document.getElementById("btn-decrease");
const btn_reset = document.getElementById("btn-reset")
const number = document.getElementById("number");

btn_increase.addEventListener("click", ()=>{
    number.textContent = (parseInt(number.textContent) + 1)
})

btn_decrease.addEventListener("click", ()=>{
    number.textContent = (parseInt(number.textContent) - 1)
})

btn_reset.addEventListener("click", ()=>{
    number.textContent = 0
})