var SetIntervalTime = []
var SetTimeoutTime = []
var N = 20
var intervalID;
var timeoutID;
var animationFrameID;
var chart = null;
var delay;
var intervalUpdated = false;
var timeoutUpdated = false;
var diffsTimeout = []
var diffsInterval = []
var xAxis = []
var num = 0
createChart()

var startBtn = document.getElementById("start")
var stopBtn = document.getElementById("stop")


startBtn.addEventListener('click', () => {
    let delayField = document.getElementById("delay")
    delay = parseInt(delayField.value);
    console.log(delay);
    delayField.value = "";
    if(!isNaN(delay)){
        intervalID = window.setInterval(doTimeConsumingCallculationsWithSetInterval, delay);
        timeoutID = window.setTimeout(doTimeConsumingCallculationsWithSetTimeout, delay);
        animationFrameID = window.requestAnimationFrame(drawChart)
    }else{
        console.log("Delay is not a number!");
    }

})

stopBtn.addEventListener('click', () =>{
    console.log("IntervalID: " + intervalID);
    console.log("TimeoutID: " + timeoutID);
    console.log("AnimationFrameID: " + animationFrameID);
    clearInterval(intervalID)
    clearTimeout(timeoutID)
    cancelAnimationFrame(animationFrameID)
})

function doTimeConsumingCallculationsWithSetInterval(){
    let len = SetIntervalTime.push(performance.now())
    if(len > N){
        SetIntervalTime.shift()
    }
    var n = calculatePrimes(1000, 1000000)
    intervalUpdated = true;
}

function doTimeConsumingCallculationsWithSetTimeout(){
    let len = SetTimeoutTime.push(performance.now())
    if(len > N){
        SetTimeoutTime.shift()
    }
    var n = calculatePrimes(1000, 1000000)
    timeoutID = window.setTimeout(doTimeConsumingCallculationsWithSetTimeout, delay);
    timeoutUpdated = true;
}

function updateChart(){
    chart.data.datasets[0].data = diffsTimeout;
    chart.data.datasets[1].data = diffsInterval;
    chart.data.labels = xAxis;
    chart.update();
}

function createChart(){
    // Drawing Chart using Chart.js
    var canvas = document.getElementById("lineChart").getContext('2d');

    var dataTimeout = {
        label: "SetTimeout Diffs",
        data: diffsTimeout,
        lineTension: 0,
        fill: false,
        borderColor: 'red'
    };

    var dataInterval = {
        label: "SetInterval Diffs",
        data: diffsInterval,
        lineTension: 0,
        fill: false,
        borderColor: 'blue'
    };

    var datasets = {
    labels: xAxis,
    datasets: [dataTimeout, dataInterval]
    };

    var chartOptions = {
    legend: {
        display: true,
        position: 'top',
        labels: {
        boxWidth: 80,
        fontColor: 'black'
        }
    },
    responsive: false,
    animation: {
        duration: 0
    }
    };

    chart = new Chart(canvas, {
    type: 'line',
    data: datasets,
    options: chartOptions
    });
}

function drawChart(){
    if(timeoutUpdated && intervalUpdated){
        if(SetTimeoutTime.length > 1){
            let len  = SetTimeoutTime.length
            if(len > N){
                diffsTimeout.shift()
                diffsInterval.shift()
            }
            xAxis.push(++num)
            diffsTimeout.push(SetTimeoutTime[len - 1] - SetTimeoutTime[len - 2])
            diffsInterval.push(SetIntervalTime[len - 1] - SetIntervalTime[len - 2])
        }
        updateChart()
        timeoutUpdated = false;
        intervalUpdated = false;
    }
    animationFrameID = window.requestAnimationFrame(drawChart);
}

function calculatePrimes(iterations, multiplier) {
    var primes = [];
    for (var i = 0; i < iterations; i++) {
      var candidate = i * (multiplier * Math.random());
      var isPrime = true;
      for (var c = 2; c <= Math.sqrt(candidate); ++c) {
        if (candidate % c === 0) {
            // not prime
            isPrime = false;
            break;
         }
      }
      if (isPrime) {
        primes.push(candidate);
      }
    }
    return primes;
  }