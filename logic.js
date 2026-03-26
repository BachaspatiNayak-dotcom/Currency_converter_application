
for(code in countryList){
    console.log(code,countryList[code])
}

let dropdowns=document.querySelectorAll(".form-select")

for(let select of dropdowns){
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected=true;
        }
        else if(select.name==="to" && currcode==="INR"){
            newOption.selected=true;
        }
        select.append(newOption);
}
}
//const dropdowns = document.querySelectorAll(".form-select")

dropdowns.forEach((select) => {
    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
});

function updateFlag(selectElement) {
    let currCode = selectElement.value;
    let countryCode = countryList[currCode];

    let img;
    if (selectElement.name === "from") {
        img = document.getElementById("fromFlag");
    } else {
        img = document.getElementById("toFlag");
    }

    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

let button=document.querySelector(".btn-primary")

button.addEventListener("click", async (event) => {
    event.preventDefault();
    let amount = document.querySelector("input").value;
    let from = document.querySelector("select[name='from']").value;
    let to = document.querySelector("select[name='to']").value;
    let URL = `https://api.frankfurter.app/latest?from=${from}&to=${to}`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.rates[to];
    let finalAmount = amount * rate;
    document.querySelector("h5").innerText =
    `${amount} ${from} = ${finalAmount.toFixed(2)} ${to}`;
})