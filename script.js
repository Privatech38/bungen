"use strict";
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
        // Append to main div
        box.appendChild(divElementFemale);
        box.appendChild(divElementMale);
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
class FullGen {
    constructor(gen, amount = 0) {
        this.gen = gen;
        this.amount = amount;
    }
    get getAmount() {
        return this.amount;
    }
}
function generate() {
    let genM = [];
    let genF = [];
    let maleGens = document.getElementById("maleGens");
    let femaleGens = document.getElementById("femaleGens");
    if (maleGens == null || femaleGens == null) {
        console.log("Male Gens or Female Gens are null");
        return;
    }
    // Create arrays for 
    maleGens.childNodes.forEach(selectNode => {
        if (selectNode instanceof HTMLSelectElement) {
            genM.push(selectNode.value);
        }
    });
    femaleGens.childNodes.forEach(selectNode => {
        if (selectNode instanceof HTMLSelectElement) {
            genF.push(selectNode.value);
        }
    });
    // Create individual combos
    let combinedGens = [];
    for (let i = 0; i < genM.length; i++) {
        const splitMGens = genM[i].split(" ");
        const splitFGens = genF[i].split(" ");
        let combinedIndyGens = [];
        splitMGens.forEach(maleGen => {
            splitFGens.forEach(femaleGen => {
                combinedIndyGens.push(maleGen + femaleGen);
            });
        });
        combinedGens.push(combinedIndyGens);
    }
    // Create individual chances
    if (combinedGens.length == 0) {
        console.log("combinedGens are null");
        return;
    }
    console.log("Starting value thing");
    let output = [];
    createPairs("", combinedGens, 0, output);
}
function createPairs(inputString, allGens, i, output) {
    console.log("i is: " + i);
    for (let j = 0; j < allGens[i].length; j++) {
        if (i == allGens.length - 1) {
            output.push(inputString + allGens[i][j]);
            console.log("Pushed: " + inputString + allGens[i][j]);
            continue;
        }
        createPairs(inputString + allGens[i][j], allGens, i + 1, output);
    }
}
