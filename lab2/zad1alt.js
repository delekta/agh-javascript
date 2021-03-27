
var out = document.getElementById('output');
var btn = document.getElementById('btn')
var forms = document.forms.test;
btn.onclick = function () {
    var text = forms.elements.pole_tekstowe.value;
    var number = forms.elements.pole_liczbowe.value;
    out.innerHTML = `Tekst:  ${text} typ: ${typeof(text)}  <br>
    Liczba:  ${number}  typ: ${typeof(number)}`;
}
// enter or OK -> string
// cancel -> null
// var prompted = window.prompt("Tekst1");
// console.log(prompted, typeof(prompted));
        
// window.onload is fired when all is loaded and rendered
// when we run document.write after everything is rendered, it's overwrites entire document
// window.onload = function() {
//     console.log('Tekst 1');
//     window.alert('Tekst 2');
//     document.write('Tekst 3');
// };