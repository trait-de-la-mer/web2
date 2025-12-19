const scale = 200,
    sixCanv = 6,
    twoCanv = 2,
    zeroCanv = 0,
    canvases = document.getElementsByTagName('canvas'),
    canvas = canvases[zeroCanv],
    ctx = canvas.getContext('2d'),
    { height, width } = canvas,
    centerX = width / twoCanv,
    centerY = height / twoCanv;

canva = function canva(){
    ctx.fillStyle = 'rgba(51, 153, 255, 0.2)';
    ctx.beginPath();
    ctx.rect(centerX - scale / twoCanv, centerY - scale, scale / twoCanv, scale);
    ctx.fill();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, scale, Math.PI/twoCanv, Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(centerX + scale, centerY);
    ctx.lineTo(centerX, centerY + scale / twoCanv);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(centerX, zeroCanv);
    ctx.lineTo(centerX, height);
    ctx.moveTo(zeroCanv, centerY);  
    ctx.lineTo(width, centerY);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.font = "12px monospace";
    ctx.strokeText("0", centerX + sixCanv, centerY - sixCanv);
    ctx.strokeText("R/2", centerX + scale / twoCanv, centerY - sixCanv);
    ctx.strokeText("R", centerX + scale, centerY - sixCanv);
    ctx.strokeText("-R/2", centerX - scale / twoCanv, centerY - sixCanv);
    ctx.strokeText("-R", centerX - scale, centerY - sixCanv);
    ctx.strokeText("R/2", centerX + sixCanv, centerY - scale / twoCanv);
    ctx.strokeText("R", centerX + sixCanv, centerY - scale);
    ctx.strokeText("-R/2", centerX + sixCanv, centerY + scale / twoCanv);
    ctx.strokeText("-R", centerX + sixCanv, centerY + scale);
}
const checkPoint = async function checkPoint(){
    const form = new FormData();
    form.append("X", state.siteX);
    form.append("Y", state.siteY);
    form.append("R", state.siteR);
    form.append("action", "checkPoint")

    const url = "controller?" + new URLSearchParams(form).toString();
    const response = await fetch(url, { method: "get" });

  const data = await response.json();
  const newRow = table.insertRow(CELL_INDEX.APPEND),
        rowX = newRow.insertCell(CELL_INDEX.XIndex),
        rowY = newRow.insertCell(CELL_INDEX.YIndex),
        rowR = newRow.insertCell(CELL_INDEX.RIndex),
        rowResult = newRow.insertCell(CELL_INDEX.RESULT),
    results = { 
            resX: state.siteX,
            resY: state.siteY,
            resR: state.siteR,   
            result: data.result,  
        };
        try{
        if (response.ok){
            const result = results.result.toString();
            console.log(result);
            printPoint(state.siteX, state.siteY, state.siteR, result);
        } else {
            results.result = "error";
            printPoint(state.siteX, state.siteY, state.siteR, false);
        }
        rowX.innerText = results.resX.toString();
        rowY.innerText = results.resY.toString();
        rowR.innerText = results.resR.toString();
        rowResult.innerText = results.result;
        } catch{
            console.log("=------=")
            rowX.innerText = results.resX.toString();
            rowY.innerText = results.resY.toString();
            rowR.innerText = results.resR.toString();
            rowResult.innerText = "N/A";
            printPoint(state.siteX, state.siteY, state.siteR, false);
        }
}
const printPoint = function printPoint(x, y, r, color){
    if (color === true.toString()){ color = "green"}
    else {color = "red"}
    ctx.beginPath();
    ctx.arc(centerX + x / r * scale, centerY  - y / r * scale, 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.stroke();
},
 resetXCheckboxes = function resetXCheckboxes() {
    const xCheckboxes = document.querySelectorAll('.x');
    xCheckboxes.forEach(checkbox => {
        checkbox.checked = checkbox.value === '0';
    });
},
showError = function showError(messege){
    const time = 3000;
            document.getElementById("error").textContent = messege;
            error.hidden = false;
            setTimeout(() => {
                error.hidden = true;
            }, time);
},
state = {
    siteX: 0,
    siteY: "0",
    siteR: 0,
},
input = document.getElementsByClassName("param"),
table = document.getElementById("result"),
goodYPlus = 3,
goodYMinus = -5,
zero = 0,
bedIndex = 400,
CELL_INDEX = {
    APPEND: -1,
    XIndex: 0,
    YIndex: 1,
    RIndex: 2,
    RESULT: 3
},
error = document.getElementById("error");
window.addEventListener('DOMContentLoaded', resetXCheckboxes());
let alternY = 0;

for (const element of input){
    element.addEventListener("input", () =>{
        if (element.value === "-."){element.value = element.value.replace(".", '')}
        if (!/^-?\d*\.?\d+$/u.test(element.value)){
            element.value = element.value.replace(/[^0-9.-]/gu, '').replace(/(?!^)-/gu, '').replace(/(?<decimalPart>\..*)\./gu, '$<decimalPart>');
        }
    })
}
document.getElementById("y").addEventListener("change", (ev) => {
    alternY= parseFloat(ev.target.value);
    state.siteY = ev.target.value;
});



Array.from(document.getElementById("xs").children)
    .filter(inp => inp.tagName === "INPUT")
    .forEach(btn => {
        btn.addEventListener("change", () => {
            if (btn.checked) {
                state.siteX = btn.value;
                document.querySelectorAll('.x').forEach(cb => {
                if (cb !== btn) {cb.checked = false;}
            }); 
            }
            if (!btn.checked){
                btn.checked = true;
            }
    })});

document.querySelectorAll('#r').forEach(button => {
  button.addEventListener('click', (ev) => {

    document.querySelectorAll('#r').forEach(b => {
      b.classList.remove('active');
    });

    ev.target.classList.add('active');

    state.siteR = parseFloat(ev.target.value);
    console.log("R выбран:", state.siteR);
  });
});
canvas.addEventListener("click", (e) => {
    if (state.siteR === 0){
        showError("Выберете R");
        return
    }
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    state.siteX = (clickX - centerY)/(scale/state.siteR);
    state.siteY = -(clickY - centerX)/(scale/state.siteR);
    if (state.siteY > 3){
        showError("Y должен быть числом от -5 до 3");
        return;
    }
    checkPoint();
})

document.getElementById("dataForm").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const checkedX = document.querySelectorAll('.x:checked');
    if (checkedX.length === zero) {
        resetXCheckboxes();
        state.siteX = '0';
    }  
    try{  
        if ((alternY) > goodYPlus || alternY < goodYMinus){
            throw new Error("bad y");
        }
        if (state.siteR === 0){
            throw new Error("bad r");
        }

        checkPoint();
    } catch(ex){
        if (ex.message.includes("y")){
            showError("Y должен быть числом от -5 до 3");
        }
        if (ex.message.includes("r")){
            showError("выберете R");
        }
    }
})
canva();
