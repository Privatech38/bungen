var genM;
var genF;
var gens = [
    ["A", "At", "a"],
    ["B", "b"],
    ["C", "chd", "chl", "ch", "c"],
    ["D", "d"],
    ["E", "Es", "ej", "e"],
    ["V", "v"],
    ["W", "w"]
];
function loadPage() {
    var box = document.getElementById("forms");
    if (box != null) {
        // MALE
        var divElementMale = document.createElement("div");
        divElementMale.setAttribute("id", "maleGens");
        // Add text
        var male = document.createElement("label");
        male.appendChild(document.createTextNode("MALE"));
        divElementMale.appendChild(male);
        divElementMale.appendChild(document.createElement("br"));
        // Generate selects
        generateSelects(divElementMale);
        // FEMALE
        var divElementFemale = document.createElement("div");
        divElementFemale.setAttribute("id", "femaleGens");
        // Add text
        var female = document.createElement("label");
        female.appendChild(document.createTextNode("FEMALE"));
        divElementFemale.appendChild(female);
        divElementFemale.appendChild(document.createElement("br"));
        // Generate selects
        generateSelects(divElementFemale);
        // Append to main div
        box.appendChild(divElementFemale);
        box.appendChild(divElementMale);
    }
    else {
        console.log("box is null");
    }
}
function generateSelects(divElement) {
    gens.forEach(function (group) {
        var selectObject = document.createElement("select");
        group.forEach(function (firstGen) {
            group.forEach(function (secondGen) {
                var genCombo = firstGen + " " + secondGen;
                var optionObject = document.createElement("option");
                optionObject.setAttribute("value", genCombo);
                optionObject.appendChild(document.createTextNode(genCombo));
                selectObject.appendChild(optionObject);
            });
        });
        divElement.appendChild(selectObject);
        divElement.appendChild(document.createElement("br"));
    });
}
function generate() {
}
