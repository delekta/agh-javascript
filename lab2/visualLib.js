
// Line Chart
let canvas = document.getElementById("lineChart");
canvas.width = 850;
canvas.height = 450;

let cellSize = canvas.width / 85;
canvas.height = cellSize * 45

let xGrid = cellSize;
let yGrid = cellSize;


var ctx = canvas.getContext('2d');

title = "Earnings"
let data={
    1:1000,
    2:2700,
    3:500,
    4: 2100,
    5: 5000,
    6:1000,
    7:2700,
    8:500,
    9: 2100,
    10: 3000,
    11: 4000,
    12:1600,
    13:2000,
    14:500,
    15: 1100,
    16: 3000,
}

var entries = Object.entries(data);
    var maxValue = entries.reduce((a, b) => a[1] > b[1] ? a : b)[1];
    var divX = parseInt(75 / entries.length)
    var divY = parseInt(maxValue / 30)  * 5;

// line chart
function drawGrids(){
    ctx.beginPath();
    xGrid = blocks(5)
    while(xGrid < blocks(40)){
        ctx.moveTo(blocks(5), xGrid);
        ctx.lineTo(blocks(80), xGrid)
        xGrid += cellSize;
    }

    yGrid = blocks(5)
    while(yGrid < blocks(80)){
        ctx.moveTo(yGrid, blocks(5));
        ctx.lineTo(yGrid, blocks(40))
        yGrid += cellSize;
    }

    ctx.strokeStyle = "gray";
    ctx.lineWidth = 0.5;
    ctx.stroke();
}

function blocks(count){
    return count * cellSize;
}

function drawAxis(){
    ctx.lineWidth = 1;
    
    let yPlot = 40;
    let pop = 0;

    ctx.beginPath();
    ctx.strokeStyle = "black";
    // Creating Frame
    ctx.moveTo(blocks(5), blocks(5));
    ctx.lineTo(blocks(5), blocks(40));
    ctx.lineTo(blocks(80), blocks(40));
    ctx.lineTo(blocks(80), blocks(5));
    ctx.lineTo(blocks(5), blocks(5));
    ctx.stroke()

    // values
    ctx.moveTo(blocks(5), blocks(40))
    ctx.font = `12px Arial`;
    while(yPlot > 4){
        ctx.fillText(pop, blocks(1), blocks(yPlot));
        ctx.beginPath();
        ctx.moveTo(blocks(5) - cellSize/2, blocks(yPlot))
        ctx.lineTo(blocks(5) + cellSize/2, blocks(yPlot))
        ctx.stroke()
        yPlot -= 5;
        pop += divY;
    }

    ctx.stroke();
}

function drawChart(){
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(blocks(5), blocks(40));
    
    // value of one block
    let oneCellValue = parseInt(maxValue / 30)

    var xPlot = 5 + divX;

    ctx.font = `12px Arial`;
    for(const [point, value] of entries){
         var populationInBlocks = value / oneCellValue;
         ctx.lineWidth = 3
         ctx.lineTo(blocks(xPlot), blocks(40 - populationInBlocks));
         ctx.stroke()
         // drawing axis
         ctx.lineWidth = 1
         // draw x-axis legend
         ctx.fillText(point, blocks(xPlot - 0.5), blocks(40 + 3));
         ctx.beginPath();
         ctx.moveTo(blocks(xPlot), blocks(40) - cellSize/2)
         ctx.lineTo(blocks(xPlot), blocks(40) + cellSize/2)
         ctx.stroke()
         ctx.moveTo(blocks(xPlot), blocks(40 - populationInBlocks))
         xPlot += divX;
    }

    ctx.stroke();
}

function drawTitle(){
    let newCtx = canvas.getContext("2d");
    newCtx.beginPath();
    newCtx.lineWidth = 2;
    var fontSize = 30 / (850 / canvas.width);
    newCtx.font = `${fontSize}px Arial`;
    newCtx.textAlign = "center"
    newCtx.fillText(title, blocks(40), blocks(3))
    newCtx.textAlign = "start";
}

function drawLineChart(){
    entries = Object.entries(data);
    maxValue = entries.reduce((a, b) => a[1] > b[1] ? a : b)[1];
    divX = parseInt(75 / entries.length)
    divY = parseInt(maxValue / 30)  * 5;
    drawGrids();
    drawAxis();
    drawChart();
    drawTitle()
}

drawLineChart();

var addBtnLine = document.getElementById('addBtnLine')
var formsLine = document.forms.lineChart;
addBtnLine.onclick = function () {
    var legend = formsLine.elements.legend.value;
    var value = parseInt(formsLine.elements.value.value);
    data[legend] = value;
    entries.push([legend, value]);
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawLineChart();
}
// End Of Line Chart

// Pie Chart

let canvasPie = document.getElementById("pieChart");
let ctxPie = canvasPie.getContext("2d")
canvasPie.width = 800
canvasPie.height = canvasPie.width * 0.8;
let midX = canvasPie.width / 2;
let midY = canvasPie.height / 2;
titlePie = "Domination"
let dataPie = {
    "Bitcoin": 500,
    "Etherum": 240,
    "BNB": 68,
    "Cardano": 39,
    "XRP": 46,
    "Polkadot": 39,

}

let entriesPie = Object.entries(dataPie)

function drawTitlePie(){
    ctxPie.beginPath();
    ctxPie.lineWidth = 2;
    var fontSize = 40 / (600 / canvasPie.width);
    ctxPie.font = `${fontSize}px Arial`;
    ctxPie.textAlign = "center"
    ctxPie.fillText(titlePie, midX, blocks(6))
    ctxPie.textAlign = "start";
}

function drawChartPie(){
    var suma = Object.values(dataPie).reduce((a, b) => a +  b);
    console.log(suma);
    var startAngle = 0;
    var endAngle = 0;
    var radius = canvasPie.width/4;
    var centerX = midX - canvasPie.width/8;
    var centerY = midY;
    var legendY = centerY - radius + 50;
    var legendX = centerX + radius + 20;
    ctxPie.lineWidth = 1;
    ctxPie.font = `20px Arial`;
    for(let [legend, value] of entriesPie){
        startAngle = endAngle
        endAngle = startAngle + 2 * Math.PI * (value / suma);
        ctxPie.fillStyle = randomColor()
        ctxPie.beginPath()
        ctxPie.moveTo(centerX, centerY)
        ctxPie.arc(centerX, centerY, radius, startAngle, endAngle)
        ctxPie.closePath();
        ctxPie.fill()

        // Legend
        ctxPie.beginPath();
        ctxPie.rect(legendX, legendY - 10, 10, 10);
        ctxPie.fill();
        var percentValue = ` ${Math.floor((value / suma) * 1000) / 10}%`
        ctxPie.fillStyle = 'black'
        ctxPie.fillText(legend + percentValue, legendX + 20, legendY);
        legendY += 50;

    }
    
}

function randomColor(){
    var randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

function drawPieChart(){
    drawTitlePie();
    drawChartPie();
}

drawPieChart();

var addBtn = document.getElementById('addBtnPie')
var forms = document.forms.pieChart;
addBtn.onclick = function () {
    var legend = forms.elements.legend.value;
    var value = parseInt(forms.elements.value.value);
    dataPie[legend] = value;
    entriesPie.push([legend, value]);
    ctxPie.clearRect(0, 0, canvasPie.width, canvasPie.height)
    drawPieChart();
}