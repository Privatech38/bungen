"use strict";
let genM;
let genF;
const gens = [
    ["A", "At", "a"],
    ["B", "b"],
    ["C", "chd", "chl", "ch", "c"],
    ["D", "d"],
    ["E", "Es", "ej", "e"],
    ["V", "v"],
    ["W", "w"]
];
function loadPage() {
    let box = document.getElementById("forms");
    if (box != null) {
        // MALE
        let divElementMale = document.createElement("div");
        divElementMale.setAttribute("id", "maleGens");
        // Add text
        let male = document.createElement("label");
        male.appendChild(document.createTextNode("MALE"));
        divElementMale.appendChild(male);
        divElementMale.appendChild(document.createElement("br"));
        // Generate selects
        generateSelects(divElementMale);
        // FEMALE
        let divElementFemale = document.createElement("div");
        divElementFemale.setAttribute("id", "femaleGens");
        // Add text
        let female = document.createElement("label");
        female.appendChild(document.createTextNode("FEMALE"));
        divElementFemale.appendChild(female);
        divElementFemale.appendChild(document.createElement("br"));
        // Generate selects
        generateSelects(divElementFemale);
        // Append to main div
        box.appendChild(divElementFemale);
        box.appendChild(divElementMale);
        // Modify button
        // const calculator = document.getElementById("calculator");
        // calculator?.lastChild;
    }
}
function generateSelects(divElement) {
    gens.forEach(group => {
        let usedGens = [];
        let selectObject = document.createElement("select");
        group.forEach(firstGen => {
            group.forEach(secondGen => {
                if (usedGens.includes(secondGen)) {
                    return;
                }
                let genCombo = firstGen + " " + secondGen;
                let optionObject = document.createElement("option");
                optionObject.setAttribute("value", genCombo);
                optionObject.appendChild(document.createTextNode(genCombo));
                selectObject.appendChild(optionObject);
            });
            usedGens.push(firstGen);
        });
        divElement.appendChild(selectObject);
        divElement.appendChild(document.createElement("br"));
    });
}
function generate() {
}
