var myspans = document.getElementsByTagName("my-span")
var btn = document.getElementById("licznikBtn")
var input = document.getElementById("licznik");
var _default = 10; 
input.value = _default;
var currValue = _default

btn.addEventListener('click', () => {
    currValue = input.value
    for(let i = 0; i < myspans.length; i++){
        updateMySpans()
    }
    setInterval(decrementSpans, 1000)
})

function decrementSpans(){
    currValue -= 1
    updateMySpans()
}

function updateMySpans(){
    for(let myspan of myspans){
        myspan.value = currValue;
    }
}

class MySpan extends HTMLElement {
    constructor() {
        super();
        // Attach a shadow root to the element.
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `<span>0</span>`;
    }
    get value(){
        return this.getAttribute("value");
    }
    set value(val){
        this.setAttribute("value", val);
    }

    static get observedAttributes(){
        return ["value"]
    }

    attributeChangedCallback(prop, oldVal, newVal){
        if(prop === "value" && this.value >= 0){
            this.render();
        }
    }

    connectedCallback(){
        this.render();
    }
    render(){
        this.shadowRoot.innerHTML=`${this.value}`;
    }
}
customElements.define('my-span', MySpan);
