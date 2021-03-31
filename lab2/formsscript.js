var cars = new Map();

var out = document.getElementById('output');
var addBtn = document.getElementById('addBtn')
var writeBtn = document.getElementById('writeBtn')
var forms = document.forms.test;
addBtn.onclick = function () {
    var checkbox = forms.elements.session.checked
    var textarea = forms.elements.pole_tekstowe.value;
    var textarray = textarea.split(",")
    var car = textarray[0];
    var owner = textarray[1];
    var reg = textarray[2].trim();
    // console.log(car, owner, reg);
    if(checkbox){
        window.localStorage.setItem(reg, `Car: ${car}, Owner: ${owner}`);
    }else{
        cars.set(reg, `Car: ${car}, Owner: ${owner}`)
    }
}

writeBtn.onclick = function (){
    var checkbox = forms.elements.session.checked
    var reg = forms.elements.pole_tekstowe.value.trim();
    if(checkbox){
        finded = window.localStorage.getItem(reg);
        if(finded != undefined){
            out.textContent = finded;
        }
        else{
            out.textContent = `Auto o rejestracji ${reg} nie istnieje w Web Storage!`;
        }
    }else{
        var finded = cars.get(reg)
        if(finded != undefined){
            out.textContent = finded;
        }
        else{
            out.textContent = `Auto o rejestracji ${reg} nie istnieje w Mapie!`;
        }
    }
}


// tests