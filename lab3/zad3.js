var spans = document.getElementsByTagName("span")
var btn = document.getElementById("licznikBtn")
var input = document.getElementById("licznik");
var wrapper = document.getElementById("wrapper");
var _default = 10; 
input.value = _default;
var currValue = _default

btn.addEventListener('click', () => {
    currValue = input.value
    for(let i = 0; i < spans.length; i++){
        var newElement = document.createElement("span");
        newElement.textContent = String(currValue)
        wrapper.replaceChild(newElement, spans[i])
    }
    setInterval(decrementSpans, 1000)
})

function decrementSpans(){
    currValue -= 1
    for(let i = 0; i < spans.length; i++){
        if(currValue >= 0){
            var newElement = document.createElement("span");
            newElement.textContent = String(currValue)
            wrapper.replaceChild(newElement, spans[i])
            if(currValue == 0){
                input.value = 0
            } 
        }
    }
}