var spans = document.getElementsByTagName("span")
var btn = document.getElementById("licznikBtn")
var input = document.getElementById("licznik");
var _default = 10; 
input.value = _default;

btn.addEventListener('click', () => {
    for(let i = 0; i < spans.length; i++){
        spans[i].textContent = String(input.value); 
    }
    input.value = _default;
    setInterval(decrementSpans, 1000)
})



function decrementSpans(){
    for(let i = 0; i < spans.length; i++){
        if(parseInt(spans[i].textContent) > 0){
            spans[i].textContent = String(parseInt(spans[i].textContent) - 1); 
        }
    }
}