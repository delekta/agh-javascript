// tryb scisly dla calego skryptu
"use strict";

var expect = chai.expect;

var global_sum = 0;
// while(true){
//     var napis = window.prompt("Podaj napis:");
//     if(napis == null){
//         break;
//     }
//     console.log(`\t${cyfry(napis)}\t${litery(napis)}\t${suma(napis)}`);
// }
// console.log("KONIEC!")


function cyfry(napis){
    var sum = 0;
    for(let i = 0; i < napis.length; i++){
        if(!isNaN(Number(napis[i]))){
            sum += Number(napis[i]);
        }
    }
    return sum;
}

function litery(napis){
    var count = 0;
    for(let i = 0; i < napis.length; i++){
        if(isNaN(Number(napis[i]))){
            count += 1;
        }
    }
    return count;
}

function suma(napis){
    var val = parseInt(napis)
    if(!isNaN(val)){
        global_sum += val
    }
    return global_sum;
}

describe("Test funkcji: cyfry(), litery(), suma()", function(){
    it("Same cyfry", function(){
        let onlyDigits = "111";
        expect(cyfry(onlyDigits)).to.equal(3);
        expect(litery(onlyDigits)).to.equal(0);
        expect(suma(onlyDigits)).to.equal(111)
    })
    it("Same litery", function(){
        let onlyLetters = "abc";
        expect(cyfry(onlyLetters)).to.equal(0);
        expect(litery(onlyLetters)).to.equal(3);
        expect(suma(onlyLetters)).to.equal(111)
    })
    it("Litery, a po nich cyfry", function(){
        let onlyLetters = "abc123";
        expect(cyfry(onlyLetters)).to.equal(6);
        expect(litery(onlyLetters)).to.equal(3);
        expect(suma(onlyLetters)).to.equal(111)
    })
    it("Cyfry, a po nich litery", function(){
        let onlyLetters = "456abcd";
        expect(cyfry(onlyLetters)).to.equal(15);
        expect(litery(onlyLetters)).to.equal(4);
        expect(suma(onlyLetters)).to.equal(567)
    })
    it("Pusty napis", function(){
        let onlyLetters = "";
        expect(cyfry(onlyLetters)).to.equal(0);
        expect(litery(onlyLetters)).to.equal(0);
        expect(suma(onlyLetters)).to.equal(567)
    })
})